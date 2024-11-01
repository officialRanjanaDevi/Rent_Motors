import React, { useState, useEffect } from 'react';
import WishlistItem from '../../components/user/WishlistItem/WishlistItem';
import LoadingCard from '../../components/user/LoadingCard/LoadingCard'
const Wishlist = () => {
  const [productData, setProductData] = useState([]);

  const loadData = async () => {
    try {

      const res = await fetch(`http://localhost:4000/api/client/wishlist`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const response = await res.json();
      
       setProductData(response.data);
    
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='mt-20 p-4'>
             <h1 className='font-bold text-xl text-center '> Your wishlist </h1>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {productData.length > 0 ? (
          productData.map((data, index) => <WishlistItem key={index} data={data} />)
        ) : (
          Array.from({ length: 4 }).map((_, index) => <LoadingCard key={index} />)
       
        )}
      </div>
    </div>
  );
}

export default Wishlist;
