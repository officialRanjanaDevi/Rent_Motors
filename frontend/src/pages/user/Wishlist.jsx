import React, { useState, useEffect } from 'react';
import WishlistItem from '../../components/user/WishlistItem/WishlistItem';

import { jwtDecode } from 'jwt-decode';

const Wishlist = () => {
  const [productData, setProductData] = useState([]);

  const loadData = async () => {
    try {

      const res = await fetch(`http://localhost:3000/wishlist/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const response = await res.json();
    
      setProductData(response[0].items);
     
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='mt-20 p-4'>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {productData.length > 0 ? (
          productData.map((data, index) => <WishlistItem key={index} data={data} />)
        ) : (
          <h1 className='font-bold text-xl text-center '> Your wishlist is Empty</h1>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
