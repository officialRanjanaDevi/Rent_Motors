import React from "react";
import { Link } from "react-router-dom";
// import MailBox from "./MailBox";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import './Footer.css'
const Footer = () => {
  return (
    <div className="bg-black text-white mt-4 text-sm md:text-md">
      {/* Social media bar */}
      <div className="flex md:justify-between px-6 py-4 bg-rose-300 flex-wrap items-center justify-center">
        <p className="">Get connected with us on Social Media Networks: </p>
        <ul className="flex justify-evenly ">
          <li>
            <a href="">
              <i className="mx-2 text-2xl text-white  fa-brands fa-square-instagram"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="mx-2 text-2xl text-white  fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="mx-2 text-2xl text-white  fa-brands fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="mx-2 text-2xl text-white  fa-brands fa-square-github"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="mx-2 text-2xl text-white  fa-brands fa-square-facebook"></i>
            </a>
          </li>
        </ul>
      </div>

      {/* middle bar for links and contact */}
      <div
        className="flex p-6 justify-between flex-col md:flex-row"
        style={{ borderBottom: "1px solid rgb(50 50 50)" }}
      >
        {/* footer text */}
        <div className="mt-4 md:w-1/3 w-full text-justify md:pr-4">
          <p className="font-bold text-md md:text-lg">BeBold</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores
            non nulla repellendus debitis velit modi
          </p>
        </div>

        <div className=" mt-4 flex justify-between sm:justify-around md:justify-evenly basis-2/5 ">
          {/* useful links */}
          <div>
            <p className="font-bold text-md md:text-lg">Useful Links</p>
            <ul>
              <li>
                <Link to="/" className="usefull-link">Home</Link>
              </li>
              <li>
                <Link to="/contact" className="usefull-link">Contact</Link>
              </li>
              <li>
                <Link to="/about" className="usefull-link">About us</Link>
              </li>
              <li>
                <Link to="/help" className="usefull-link">Help</Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div >
            <p className="font-bold text-md md:text-lg">Contact us</p>
            <ul>
              <li>
                <HomeRoundedIcon></HomeRoundedIcon> address lorem ispum
              </li>
              <li>
                <EmailRoundedIcon></EmailRoundedIcon> abc@gmail.com
              </li>
              <li>
                <LocalPhoneRoundedIcon></LocalPhoneRoundedIcon>98xxxxxx96
              </li>
              <li>
                <LocalPrintshopOutlinedIcon></LocalPrintshopOutlinedIcon> +01
                234 xxx 00
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* copyright bar */}
      <div>
        <p className="text-center py-4">
          <CopyrightOutlinedIcon></CopyrightOutlinedIcon>2024 Copyright:
          Be Bold
        </p>
      </div>
    </div>
  );
};

export default Footer;
