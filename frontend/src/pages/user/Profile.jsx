import React, { useRef, useState ,useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { images } from "../../assets/images";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,

};

const Profile = () => {
    const form = useRef();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openPassword, setOpenPassword] = React.useState(false);
    const [pass,setPass]=React.useState({oldPassword:"",newPassword:""})
    const handleOpenPassword = () => setOpenPassword(true);
    const handleClosePassword = () => setOpenPassword(false);
    const [openImage, setOpenImage] = React.useState(false);
    const [image,setImage]=React.useState({})
    const handleOpenImage = () => setOpenImage(true);
    const handleCloseImage = () => setOpenImage(false);
    const [user,setUser]=useState({});
    const [credentials,setCredentials]=React.useState({user});
    const navigate=useNavigate();
    const loadData=async()=>{
        try{
            const response=await fetch (`${import.meta.env.VITE_SERVER}/auth/getCurrentUser`,{
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            console.log("response",response)
            const res=await response.json();
            
            if(res.success){
                setUser(res.data);
            }
        }catch(error){
             console.error("error in get current user",error);
        }
    }
    useEffect(()=>{
        loadData();
       
    },[])
   
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setPass({ ...pass, [e.target.name]: e.target.value });
      };
      const updatePassword = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/changePassword`, {
            method: 'PATCH',
            credentials:"include",
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             
              oldPassword: credentials.oldPassword,
              newPassword:credentials.newPassword,
            
            })
          });
    
          const json = await response.json();
                   
          if (json.success) {
           
            handleClosePassword();
            navigate('/profile')
          } 
        } catch (error) {
          console.error("Error during updation:", error);
      
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/updateProfile`, {
            method: 'PATCH',
            credentials:"include",
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: credentials.name,
              email: credentials.email,
              type:credentials.type,
              state:credentials.state,
              address:credentials.address,
              city:credentials.city,
              pincode:credentials.pincode,
              contact:credentials.contact
            })
          });
    
          const json = await response.json();
     
         
          if (json.success) {
            setTimeout(() => navigate('/profile'), 1100);
            loadData();
            setCredentials(user);
          } else {
            setStatus("Failed");
            setTimeout(() => setStatus(null), 3000);
          }
        } catch (error) {
          console.error("Error during updation:", error);
      
        }
      };
      const updateImage = async (e) => {
        e.preventDefault();
        
      const formData = new FormData();
     
        formData.append("image", image); 
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/updateImage`, {
            method: 'PATCH',
            credentials:"include",
       
            body: formData
          });
    
          const json = await response.json();
     
         
          if (json.success) {
            setTimeout(() => navigate('/profile'), 1100);
            loadData();
            handleCloseImage();
            setCredentials(user);
          } else {
            setStatus("Failed");
            setTimeout(() => setStatus(null), 3000);
          }
        } catch (error) {
          console.error("Error during updation:", error);
      
        }
      };
  return (
    <div className="mt-20 w-[70vw] h-[80vh] border-2 shadow-md shadow-neutral-500 bg-neutral-200 rounded-md mx-auto flex flex-col justify-between items-center ">
      <img src={user.profile||images.home1} className="h-40 w-40 rounded-full mx-auto my-4 hover:scale-110 duration-700" onClick={handleOpenImage}></img>
      <Modal
        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg w-[40vw]">
        <form
        ref={form}
        onSubmit={updateImage}
        className=" rounded-md bg-neutral-200 mx-auto w-full p-6 rounded-lg shadow-md"
      >
        <h2 className="font-bold text-center">Change profile</h2>
        <input
            type="file"
            multiple
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        
        </div>
      </form>
        </Box>
      </Modal>
      <div className="grid grid-cols-2 mx-2 rounded-md basis-2/5 w-full justify-items-center">
        <div className="grid gap-1 items-center" >
            <div className="flex items-center">
            <BadgeOutlinedIcon sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
            <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>Username :</b><span className="text-neutral-700 font-semibold "> &nbsp;{user.username||NaN}</span></p>
            </div>
            <div className="flex items-center">
            <MailOutlineOutlinedIcon sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
            <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>Email :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.email||NaN}</span></p>
            </div>
            <div className="flex items-center">
            <AccountBoxOutlinedIcon  sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
            <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>Account-type :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.type||NaN}</span></p>
            </div>
            <div className="flex items-center">
            < DialpadOutlinedIcon sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
            <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>Contact No :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.contact||NaN}</span></p>
                
            </div>
        </div>
        <div className="grid gap-1 items-center">
        <div className="flex items-center">
        <HomeOutlinedIcon sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
        <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>Address :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.address||NaN}</span></p>
        </div>
        <div className="flex items-center">
        <LocationCityOutlinedIcon  sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
        <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>City :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.city||NaN}</span></p>
        </div>
        <div className="flex items-center">
        <PersonPinCircleOutlinedIcon sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
        <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>Pincode :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.pincode||NaN}</span></p>
        </div>
        <div className="flex items-center">
        < LanguageOutlinedIcon  sx={{fontSize:"2.4rem" ,marginRight:"10px"}} className="p-2 rounded-md bg-lime-600 shadow-md shadow-black"/>
        <p className="flex-grow rounded-md bg-lime-600 shadow-md shadow-black p-2"><b>State :</b><span  className="text-neutral-700 font-semibold "> &nbsp;{user.state||NaN}</span></p>
        </div>
        </div>
      </div>
      <button className="bg-lime-600 shadow-md shadow-black rounded-md w-40 py-1 my-3 hover:scale-105 duration-500 hover:bg-lime-500 hover:font-bold" onClick={handleOpenPassword}>
        Change Password
      </button>
      <Modal
        open={openPassword}
        onClose={handleClosePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg w-[40vw]">
        <form
        ref={form}
        onSubmit={updatePassword}
        className=" rounded-md bg-neutral-200 mx-auto w-full p-6 rounded-lg shadow-md"
      >
        <div className="mb-3">
          <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Old Password
          </label>
          <input
            name="oldPassword"
            onChange={onChange}
            placeholder="Enter old oldPassword"
            type="password"
            value={pass.oldPassword}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            name="newPassword"
            onChange={onChange}
            placeholder="Enter your new Password"
            type="password"
            value={pass.newPassword}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        
        </div>
      </form>
        </Box>
      </Modal>
      
      <button className="bg-lime-600 shadow-md shadow-black rounded-md w-40 py-1 mb-3 hover:scale-105 duration-500 hover:bg-lime-500 hover:font-bold" onClick={handleOpen}>
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg w-[60vw]">
        <form
        ref={form}
        onSubmit={handleSubmit}
        className=" rounded-md bg-neutral-200 mx-auto w-full p-6 rounded-lg shadow-md"
      >
        <div className="mb-3">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            name="username"
            onChange={onChange}
            placeholder="Enter username"
            type="text"
            value={credentials.username}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            type="email"
            value={credentials.email}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
            <label
              htmlFor="type"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Register as:
            </label>
            <select
              name="type"
              required
              onChange={onChange}
              value={credentials.type}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select type </option>
              <option value="Client">Client </option>
              <option value="Renter">Renter </option>
            </select>
          </div>
          <div className="mb-3">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            name="address"
            onChange={onChange}
            placeholder="Enter your address"
            type="text"
            value={credentials.address}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2">
            <div>
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            name="city"
            onChange={onChange}
            placeholder="Enter your city"
            type="text"
            value={credentials.city}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
            </div>
         <div>
         <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
            Pincode
          </label>
          <input
            name="pincode"
            onChange={onChange}
            placeholder="Enter your pincode"
            type="text"
            value={credentials.pincode}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
         </div>
        </div>
      
        <div className="mb-3 grid grid-cols-2 gap-2">
            <div>
            <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
            Contact
          </label>
          <input
            name="contact"
            onChange={onChange}
            placeholder="Enter your contact"
            type="number"
            value={credentials.contact}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
            </div>
  <div>
  <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <input
            name="state"
            onChange={onChange}
            placeholder="Enter your state"
            type="text"
            value={credentials.state}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
  </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        
        </div>
      </form>
        </Box>
      </Modal>
      
    </div>
  );
};

export default Profile;
