import React,{useState,useEffect} from 'react'
import VehicleCard from '../../components/user/VehicleCard/VehicleCard'
import LoadingCard from '../../components/user/LoadingCard/LoadingCard'
const Vehicle = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const loadData = async () => {
    try {
        let res = await fetch(`${import.meta.env.VITE_SERVER}/client/viewListing`, {
        method: "GET",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      let response = await res.json();
     
       setVehicleData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className='mt-20 p-4'>
     <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 mx-autoClass justify-items-center ">
     {vehicleData.length > 0 ? (
          vehicleData.map((data, index) => <VehicleCard key={index} data={data} />)
        ) :(
          Array.from({ length: 8 }).map((_, index) => <LoadingCard key={index} />)
        )}
      </div>
    </div>
  )
}

export default Vehicle
