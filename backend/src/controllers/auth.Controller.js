import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/User.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token")
  }
}


const registerUser = asyncHandler(async (req, res) => {

  // get user details from frontend
  // check if email is unique or not means duplicate user
  // create a new user object and post it on db
  // check if user is created or not by seraching it through id 
  // remove the password and refresh token before sending userdata in response
  // if user created then return success

  const { username, email, password, type } = req.body

  const existedUser = await User.findOne({ email })
  if (existedUser) {
    throw new ApiError(409, "User already exists with same email")
  }

  const user = await User.create({ username: username.toLowerCase(), email, password, type })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user ,Please try again")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

})


const loginUser = asyncHandler(async (req, res) => {

  // access login details from req.body
  // check if email and password match with any of the details in db
  // if user found then generate access token and refresh token
  // find user by user id becoz we have updated refresh token in db
  // send accesstoken and refresh token  in form of cookies 
  // return response sccess

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in sccessfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
  // get user id from request which we added in verifyjwt middleware
  // remove cookies from the  server
  // send response

  const id = req.user._id
  await User.findByIdAndUpdate(id, { $set: { refreshToken: undefined } }, { new: true })

  const options = {
    httpOnly: true,
    secure: true
  }
  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  // after expiry of access token user has to login again so to avoid user login 
  // we are hitting this end point to refersh access token through refresh token which is saved in database and cookies

  // access refersh token from cookies
  // decode id from refersh token  using refersh secret 
  // find user in db by id 
  // if user found then match the incoming refersh token with db refersh token 
  // if matched then regenerate access token and refersh token and send it in cookies

  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request")
  }

  try{

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
  
    const options = {
      httpOnly: true,
      secure: true
    }
    const { accessToken, newRefreshToken }= await generateAccessAndRefreshTokens(user._id)
    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, { accessToken, newRefreshToken }, "Access token refreshed"))

  }catch(error){
     throw new ApiError(400, error?.message||"Invalid refresh token")
  }
})

const changePassword = asyncHandler(async (req, res) => {
  // fetch user password from req.body
  // check if user exists or not
  // check if oldpassword is valid or not
  // update password
  // return response

  const { oldPassword, newPassword } = req.body;
  
  
  const user = await User.findById(req.user?.id);
  
  if (!user) {
      throw new ApiError(404, "User not found");
  }


  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password");
  }


  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, "Password changed successfully"));
});


const getCurrentUser =asyncHandler(async(req,res)=>{
  console.log("success")
  return res.status(200).json(new ApiResponse(200,req.user,"Current user fetched successfully"))
})


export { registerUser, loginUser, logoutUser, refreshAccessToken,changePassword,getCurrentUser  }