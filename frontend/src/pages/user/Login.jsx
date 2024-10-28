import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Pending");
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      
      if (json.success) {
        // Handle the user type if it exists in the response
        const userType = json.userData.type;
        localStorage.setItem("userType",userType);
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("authToken",json.authToken);
        setStatus("Success");
        setTimeout(() => setStatus(null), 1000);
        if(userType==="admin"){
          setTimeout(() => navigate('/admin'), 1200);
        }else{
          setTimeout(() => navigate('/'), 1200);
        }
      
      } else {
        alert("Invalid credentials");
        setStatus("Failed");
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setStatus("Failed");
      setTimeout(() => setStatus(null), 3000);
      setCredentials({ email: "", password: "" });
    } 
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-20">
      {/* Loader for Pending Status */}
      <div className="mx-auto flex flex-col items-center" style={{ display: status === "Pending" ? "" : "none" }}>
        <div className="loader"></div>
        <p>Please wait..</p>
      </div>
      
      {/* Success Alert */}
      <div
        className="text-center alert bg-rose-300 w-1/2 mx-auto text-white rounded-md"
        role="alert"
        style={{ display: status === "Success" ? "" : "none" }}
      >
        <h1 className="font-bold">Login Success</h1>
      </div>

      {/* Failed Alert */}
      <div
        className="text-center alert bg-neutral-200 w-1/2 mx-auto text-black rounded-md"
        role="alert"
        style={{ display: status === "Failed" ? "" : "none" }}
      >
        <h1 className="font-bold">Oops, login failed</h1>
        Please try again.
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-200 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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

        <div className="flex flex-col items-center justify-between">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <p>Create an account: <Link to={'/signup'} className="text-blue-500">Signup here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
