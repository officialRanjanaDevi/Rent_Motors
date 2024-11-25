import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from "react-router-dom";
import Calender from "./Calender.jsx";
import { Bar, Pie, Line } from "react-chartjs-2";

import "./Analysis.css";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Analysis = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [orderDate, setOrderDate] = useState();
  const [rating, setRating] = useState([]);
  const [neworder, setNeworder] = useState(0);
  const [newcancelreq, setNewcancelreq] = useState(0);
  const [brandOrder, setBrandOrder] = useState([]);
  const [chartData, setChartData] = useState({
    labels: "",
    datasets: [
      {
        label: "Number of Bikes per Brand",
        data: "",
        backgroundColor: ["rgb(101,163,13)"],
      },
    ],
  });
  const [pichartData, setPichartData] = useState({
    labels: "",
    datasets: [
      {
        label: "Number of Orders per Brand",
        data: "",
        backgroundColor: [
          "rgb(101,163,13)",
          "rgb(52,152,219)",
          "rgb(231,76,60)",
        ],
      },
    ],
  });
  const [lineChart, setLineChart] = useState({
    labels: "",
    datasets: [
      {
        label: "Vehicle ratings",
        data: "",
        backgroundColor: [
          "rgb(101,163,13)",
          "rgb(52,152,219)",
          "rgb(231,76,60)",
        ],
      },
    ],
  });
  const userid=localStorage.getItem("userid");
  const loadVehicleData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/renter/vehicle/${userid}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const response = await res.json();
        setVehicles(response.data);

        // code for bar graph
        const brandCounts = response.data.reduce((acc, vehicle) => {
          const found = acc.find((item) => item.brand === vehicle.brand);
          if (found) {
            found.count += 1;
          } else {
            acc.push({ brand: vehicle.brand, count: 1 });
          }
          return acc;
        }, []);
        setBrandData(brandCounts);

        // code for line chart
        const rating = response.data.map((data) => ({
          title: data.title,
          rating: data.averageRating || 0,
        }));
        setRating(rating);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    }
  };

  const loadOrderData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/renter/order/${userid}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const response = await res.json();
        setOrders(response.data);
        response.data.map((order) => {
          order.status === "Placed"
            ? setNeworder(neworder + 1)
            : setNeworder(neworder);
        });
        response.data.map((order) => {
          order.status === "CancelReq"
            ? setNewcancelreq(newcancelreq + 1)
            : setNewcancelreq(newcancelreq);
        });

        const orderDates = response.data.map((order) => order.createdAt);
        setOrderDate(orderDates);
        //  code for pi chart
        let brandorders = response.data.reduce((acc, order) => {
          const found = acc.find(
            (item) => item.brand === order.vehicleData.brand
          );
          if (found) {
            found.count += 1;
          } else {
            acc.push({ brand: order.vehicleData.brand, count: 1 });
          }
          return acc;
        }, []);

        brandData.forEach((data) => {
          const found = brandorders.find((item) => item.brand === data.brand);
          if (!found) {
            brandorders.push({ brand: data.brand, count: 0 });
          }
        });

        setBrandOrder(brandorders);
        setPichartData({
          labels: brandorders.map((data) => data.brand),
          datasets: [
            {
              label: "Number of Orders",
              data: brandorders.map((data) => data.count),
              backgroundColor: [
                "rgb(101,163,13)",
                "rgb(54 83 20)",
                "rgb(163 163 163)",
                "rgb(26 46 5)",
                "rgb(132 204 22)",
                "rgb(9 9 11)",
                "rgb(229 229 229)"
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    loadVehicleData();
    loadOrderData();
  }, []);

  useEffect(() => {
    if (brandData.length > 0) {
      setChartData({
        labels: brandData.map((data) => data.brand),
        datasets: [
          {
            label: "Number of Bikes: ",
            data: brandData.map((data) => data.count),
            backgroundColor: ["rgb(101,163,13)"],
            borderRadius: 6,
            maxBarThickness: 30,
            hoverBackgroundColor: ["rgb(0,0,0)"],
          },
        ],
      });
    }

    if (rating.length > 0) {
      setLineChart({
        labels: rating.map((data) => data.title),
        datasets: [
          {
            label: "Current rating ",
            data: rating.map((data) => data.rating),
            backgroundColor: ["rgb(101,163,13)"],
            borderRadius: 10,
            maxBarThickness: 60,
            hoverBackgroundColor: ["rgb(121,183,33)"],
          },
        ],
      });
    }
  }, [brandData, rating]);

  const username = localStorage.getItem("username");

  return (
    <div className="bg-neutral-200 h-full rounded-md p-2  z-50 overflow-y-scroll">
      <div className="relative h-[10%] bg-lime-600 rounded-md px-3 py-1 z-50 shadow-md shadow-neutral-500 border-2 border-lime-600 w-full flex justify-between items-center">
        <div>
        <h1 className="font-bold text-xl">
          Welcome back <span className="capitalize">{username}</span>
        </h1>
        <p className="text-xs ml-1 font-semibold">
          This is your today's analysis
        </p>
        </div>
       <button className="px-2 bg-black text-white rounded-md h-[80%] hover:scale-105 duration-300 shadow-md shadow-neutral-600" onClick={()=>navigate("/addVehicle")}>Add New Vehicle</button>
      </div>

      <div className="flex justify-between md:flex-row flex-col h-fit  md:h-[54%] my-3">
      <div className="flex flex-col w-full md:w-[70%] h-full">
          <h1 className="text-md font-bold mx-4 mb-2"><BarChartIcon   sx={{ color: "rgb(103,163,13)", fontSize: "2 rem" }}/> Vehicle chart</h1>
           <div className="h-[90%] shadow-md shadow-neutral-500 rounded-md mx-1 p-1 bg-[#ebeaeab8]">
          

         
          <Bar
            data={chartData}
            
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                },
              },
             
           
            }}
          />
          </div>
       
        </div>

        <div className=" h-fit shadow-md shadow-neutral-500 border-neutral-300 rounded-md flex items-center justify-center">
        <Calender orderDate={orderDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-fit md:h-[30%] ">
        <div className="h-[90%] mx-1 ">
          <h1 className="font-bold mb-2">
            <Diversity1Icon
              sx={{ color: "rgb(103,163,13)", fontSize: "2 rem",marginRight:"8px" }}
             
            />
            Brand popularity
          </h1>
          <div className=" bg-[#ebeaeab8] border-2 border-neutral-200 rounded-md shadow-md shadow-neutral-500 rounded-md p-1 ">
            <Pie data={pichartData} />
          </div>
        </div>
        <div className="h-[90%] mx-1 col-span-2 ">
          <h1 className="font-bold ">
            <TrendingUpRoundedIcon
              sx={{ color: "rgb(103,163,13)", fontSize: "2rem" }}
            />{" "}
            Rating of bikes
          </h1>

          <div className=" border-2 border-neutral-200 bg-[#ebeaeab8] rounded-md shadow-md shadow-neutral-500 rounded-md p-1">
            <Line
              data={lineChart}
              
              options={{
                responsive: true,
            
                plugins: {
                  legend: {
                    display: true,
                  },
                },
                
             
              }}
            />
          </div>
        </div>
        <div className="h-[90%]   mx-1 p-1 ">
          <h1 className="font-bold">
            <NotificationsIcon sx={{ color: "rgb(103,163,13)" }} /> New
            notifications
          </h1>
          {neworder > 0 && (
            <div
              className="bg-lime-600 shadow-md shadow-neutral-500  text-white rounded-md px-2 h-10 my-2 cursor-pointer text-sm hover:scale-105 duration-700 flex items-center"
              onClick={() => navigate("/newOrder")}
            >
              <NotificationsNoneRoundedIcon
                sx={{ fontSize: "1.8rem", color: "rgb(0,0,0)" }}
                className="bg-lime-700 rounded-sm mr-2 p-1"
              />
              You got {neworder} new orders
            </div>
          )}
          {newcancelreq > 0 && (
            <div
              className="bg-lime-600 shadow-md shadow-neutral-500  text-white rounded-md px-2 h-10 my-2 cursor-pointer text-sm hover:scale-105 duration-700 flex items-center"
              onClick={() => navigate("/cancelReq")}
            >
              <NotificationsNoneRoundedIcon
                sx={{ fontSize: "1.8rem", color: "rgb(0,0,0)" }}
                className="bg-lime-700 rounded-sm mr-2 p-1"
              />
              {newcancelreq} new cancel requests
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
