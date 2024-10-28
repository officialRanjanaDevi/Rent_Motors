import React, { useState, useEffect } from 'react';
import Product from './Product';
import LoadingCard from '../../user/LoadingCard/LoadingCard';

const UpdateProduct = () => {
  
  const [skincare, setSkincare] = useState([]);
  const [haircare, setHaircare] = useState([]);
  const [makeup, setMakeup] = useState([]);

  const loadData = async () => {
    try {
      let category = "Skincare";
      let skincare = await fetch(`http://localhost:3000/product/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resOne = await skincare.json();
      setSkincare(resOne);

      category = "Haircare";
      let haircare = await fetch(`http://localhost:3000/product/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resTwo = await haircare.json();
      setHaircare(resTwo); // Fixed: Using setHaircare here

      category = "Makeup";
      let makeup = await fetch(`http://localhost:3000/product/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resThree = await makeup.json();
      setMakeup(resThree); // Fixed: Using setMakeup here
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-full sm:overflow-auto ">
      <h2 className="text-xl font-bold text-center ">Product List</h2>

      <h1 className="text-center text-lg font-bold">Skincare Products</h1>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {skincare.length > 0 ? (
          skincare.map((data, index) => <Product key={index} data={data} />)
        ) : (
          Array.from({ length: 8 }).map((_, index) => <LoadingCard key={index} />)
        )}
      </div>

      <h1 className="text-center text-lg font-bold">Haircare Products</h1>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {haircare.length > 0 ? (
          haircare.map((data, index) => <Product key={index} data={data} />)
        ) : (
          Array.from({ length: 8 }).map((_, index) => <LoadingCard key={index} />)
        )}
      </div>

      <h1 className="text-center text-lg font-bold">Makeup Products</h1>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {makeup.length > 0 ? (
          makeup.map((data, index) => <Product key={index} data={data} />)
        ) : (
          Array.from({ length: 8 }).map((_, index) => <LoadingCard key={index} />)
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
