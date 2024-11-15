import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const form = useRef();
  const [mess,setMess]=useState("");
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "",type:"" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Pending");

    
    if (credentials.password !== credentials.confirmPassword) {
      setStatus("Passwords do not match");
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/register`, {
        method: 'POST',
        credentials:"include",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.name,
          email: credentials.email,
          password: credentials.password,
          type:credentials.type
        })
      });

      const json = await response.json();
      setMess(json.message)
     
      if (json.success) {
        setStatus("Success");
        setTimeout(() => setStatus(null), 1000);
        setTimeout(() => navigate('/'), 1100);
        setCredentials({ name: "", email: "", password: "", confirmPassword: "",type:"" });
      } else {
        setStatus("Failed");
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setStatus("Failed");
      setTimeout(() => setStatus(null), 3000);
    }
  };
 
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center" style={{ display: status === "Pending" ? "" : "none" }}>
        <div className="loader"></div>
        <p>Please wait..</p>
      </div>

      
        <div className="text-center alert bg-rose-300 w-1/2 mx-auto text-white rounded-md" role="alert"  style={{display:status==="Passwords do not match"?"":"none"}}>
          <h1 className="font-bold">Passwords do not match</h1>
        </div>
      

    
        <div className="text-center alert bg-rose-300 w-1/2 mx-auto text-white rounded-md" role="alert" style={{display:status==="Success"?"":"none"}}>
          <h1 className="font-bold">Congratulations</h1>
          <p>You are signed up</p>
        </div>
    

      
      <div
        className="text-center alert bg-neutral-200 w-1/2 mx-auto text-black rounded-md"
        role="alert"
        style={{display:status==="Failed"?"":"none"}}
      >
        <h1 className="font-bold">Oops, signup failed</h1>
        {mess}
      </div>

      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-neutral-100 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            name="name"
            onChange={onChange}
            placeholder="Enter name"
            type="text"
            value={credentials.name}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
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
        <div className="mb-4">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
             
            >
              <option value="">Select type </option>
              <option value="Client" >Client </option>
              <option value="Renter" >Renter </option>
            </select>
          </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            type="password"
            value={credentials.password}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            onChange={onChange}
            placeholder="Confirm your password"
            type="password"
            value={credentials.confirmPassword}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col items-center justify-between">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <p>Already a user? <Link to={'/login'} className="text-blue-500">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
