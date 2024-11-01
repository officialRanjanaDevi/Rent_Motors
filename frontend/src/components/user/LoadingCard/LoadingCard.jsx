import * as React from "react";
import Card from "@mui/material/Card";

export default function LoadingCard() {
  return (
    <Card
      sx={{
        minHeight:"400px",
        maxWidth: "550px",
        width:"96%",
        margin: "1rem",
        borderRadius: "15px",
        boxShadow: "inset 0px 1px 6px 1px rgb(220 220 220)",
      }}
      className=" relative z-10 group "
    >
      <div className="h-full flex flex-col w-full border border-gray-500 rounded shadow animate-pulse  dark:border-gray-500">
        <div className="h-3/4  flex items-center justify-center  mb-4 bg-gray-500 rounded dark:bg-gray-500 ">
          <svg
            viewBox="0 0 16 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-10 h-10 text-gray-400 dark:text-gray-600"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
          </svg>
        </div>
        <div className="p-1 mx-3 h-2.5 bg-gray-400 rounded-full dark:bg-gray-400 w-36 mb-2"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-400 rounded-full dark:bg-gray-400 w-36 mb-4"></div>
        <div className="p-1 mx-3 h-2 bg-gray-400 rounded-full dark:bg-gray-400 mb-2.5"></div>
       
        <span className="sr-only ">Loading...</span>
      </div>
    </Card>
  );
}
