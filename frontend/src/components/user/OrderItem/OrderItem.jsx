import React, { useState, useEffect } from "react";

const OrderItem = ({ data, orderStatus, date, expected }) => {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const loadData = async () => {
    const id = data.product;
    try {
      const res = await fetch(`http://localhost:3000/product/show/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Network response was not ok");

      const response = await res.json();
      setProductData(response);
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load product data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-neutral-200 my-2 rounded-md p-2 flex justify-between items-center relative w-full lg:w-5/6 mx-auto flex-col md:flex-row">
      <img
        src={productData.image || "https://via.placeholder.com/150"} 
        alt={productData.name || "Product image"} 
        className="rounded-md"
      />
      <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 w-full md:basis-4/6 px-2">
        <div className="flex flex-col items-center">
          <h2 className="font-bold">{productData.name || "Product Name"}</h2>
          <p>{productData.description || "No description available."}</p>
        </div>
        <div className="flex flex-col items-center me-2">
          <p className="text-md font-bold">Total: {productData.price || "N/A"}rs</p>
          <p className="text-green-700">Discount {productData.discount || 0}%</p>
        </div>
        <div className="text-center">
          <h2 className="font-bold text-md">Expected Delivery</h2>
          <p className="p-1 bg-neutral-300 rounded-md text-center mt-1 w-1/2 mx-auto">
            {expected || "N/A"}
          </p>
        </div>
        <div className="text-center">
          <h2 className="font-bold text-md">Delivery Status</h2>
          <p className="p-1 bg-neutral-300 rounded-md text-center mt-1 w-1/2 mx-auto">
            {orderStatus || "Pending"}
          </p>
        </div>
        <button className="bg-black text-white mt-2 rounded-md max-h-8 hover:bg-neutral-700" >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
