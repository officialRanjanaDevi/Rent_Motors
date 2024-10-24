import pkg from 'cloudinary';
const {v2:cloudinary}=pkg;
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

const uploadOnCloudinary =async (localFilePath)=>{
    try{
        if(!localFilePath){
            return null
        }

        //upload file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // if file uploaded successfully
        fs.unlinkSync(localFilePath)
        return response; 

    }catch(error){
        // remove the locally saved temp file in case of error
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}