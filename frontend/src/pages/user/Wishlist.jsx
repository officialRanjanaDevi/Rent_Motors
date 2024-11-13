import React, { useState, useEffect } from 'react';
import WishlistItem from '../../components/user/WishlistItem/WishlistItem';
import LoadingCard from '../../components/user/LoadingCard/LoadingCard'
import { images } from '../../assets/images';
const Wishlist = () => {
  const [productData, setProductData] = useState([]);
  const [loading,setLoading]=useState(true);
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
   
      setLoading(false);
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
     

        {productData.length > 0 ? (
           <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-items-center">{
          productData.map((data, index) => <WishlistItem key={index} data={data} />)}
          </div>
        ) :loading? (
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-items-center">{
          Array.from({ length: 4 }).map((_, index) => <LoadingCard key={index} />)
}</div>
        ):(<div className='font-semibold text-sm text-neutral-400 mt-4 flex flex-col items-center w-full'>
          
          <img src={images.emptywish} className='h-[30vh]'></img>
          <p>
          Your wishlist is empty
          </p>
        
          </div>)}
    
    </div>
  );
}

export default Wishlist;
