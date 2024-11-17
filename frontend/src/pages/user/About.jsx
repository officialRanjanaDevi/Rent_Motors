import React, { useState } from "react";
import { useEffect } from "react";
import "./About.css";
import "../../assets/images";
import { images } from "../../assets/images";

const About = () => {
  const [review, setReview] = useState([]);
  const loadReview = async () => {
    const response = await fetch(`http://localhost:4000/api/client/review`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    console.log("hello");
    const res = await response.json();
    const reviews = res.data;
    setReview(reviews);
  };
 
  useEffect(() => {
    loadReview();
  });
  return (
    <div className="h-screen mt-16">
      <div className="md:flex justify-around items-center">
        <div className="md:w-1/3 w-full">
          <h1 className="font-bold text-4xl">Our happy customers</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
            aperiam accusantium non quasi ducimus laudantium perferendis natus
            nulla reiciendis deleniti sit perspiciatis, animi soluta vero quo
            corporis ad? Tempora, impedit
          </p>
        </div>
        <div className="card md:w-[50%] w-full border-0">
          <div className="mt-3">
             <img src={images.review1} className="rounded-md h-full w-full"></img>
          </div>
          <div className="mt-10">
          <img src={images.review2}  className=" rounded-md h-full w-full"></img>
          </div>
          <div className="mb-1">
          <img src={images.review3}  className="rounded-md h-full w-full"></img>
          </div>
          <div className="mt-8">
          <img src={images.review4}  className="rounded-md h-full w-full"></img>
          </div>
          <div className="mt-3">
          <img src={images.review5}  className="rounded-md h-full w-full"></img>
          </div>
        </div>
      </div>

      <div className="mt-12 p-4 ">
        <h1 className="font-bold text-3xl text-center">
          What our customers say
        </h1>
        <div className="grid grid-cols-4 gap-4 ">
    
        <div className="h-full p-4 border-2 rounded-md text-justify h-52 flex flex-col justify-between">
          <h1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
            inventore illo doloribus ab voluptas,
          </h1>
          <div className="flex">
            <img
              src={images.skincare}
              className="h-16 w-16 rounded-full cover"
            ></img>
            <div className="p-2">
              <h1 className="font-bold">name</h1>
              <p>since</p>
            </div>
          </div>
        </div>
        <div className="h-full p-4 border-2 rounded-md text-justify h-52 flex flex-col justify-between">
          <h1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
            inventore illo doloribus ab voluptas,
          </h1>
          <div className="flex">
            <img
              src={images.skincare}
              className="h-16 w-16 rounded-full cover"
            ></img>
            <div className="p-2">
              <h1 className="font-bold">name</h1>
              <p>since</p>
            </div>
          </div>
        </div>
        <div className="h-full p-4 border-2 rounded-md text-justify h-52 flex flex-col justify-between">
          <h1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
            inventore illo doloribus ab voluptas,
          </h1>
          <div className="flex">
            <img
              src={images.skincare}
              className="h-16 w-16 rounded-full cover"
            ></img>
            <div className="p-2">
              <h1 className="font-bold">name</h1>
              <p>since</p>
            </div>
          </div>
        </div>
        <div className="h-full p-4 border-2 rounded-md text-justify h-52 flex flex-col justify-between">
          <h1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
            inventore illo doloribus ab voluptas,
          </h1>
          <div className="flex">
            <img
              src={images.skincare}
              className="h-16 w-16 rounded-full cover"
            ></img>
            <div className="p-2">
              <h1 className="font-bold">name</h1>
              <p>since</p>
            </div>
          </div>
        </div>

        </div>

      </div>
    </div>
  );
};

export default About;
