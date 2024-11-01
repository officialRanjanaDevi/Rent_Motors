import React from "react";

const LoadingCard = () => {
  
  return (
 

    <div className="mt-12 h-[90vh] p-3 flex md:flex-row flex-col">
       
        
      <div
        id="carouselExampleIndicators"
        className="carousel slide h-full md:w-2/3 w-full my-1"
        data-ride="carousel"
        style={{ maxHeight: "800px" }}
      >
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner rounded-md h-full">
         
            <div className="active carousel-item h-full flex items-center justify-center  bg-gray-800 border border-gray-500 rounded shadow animate-pulse  dark:border-gray-500">
            <svg
            viewBox="0 0 16 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-10  text-gray-400 dark:text-gray-600"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
          </svg>
            </div>
            <div className="carousel-item h-full flex items-center justify-center  bg-gray-800 border border-gray-500 rounded shadow animate-pulse  dark:border-gray-500">
            <svg
            viewBox="0 0 16 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-10  text-gray-400 dark:text-gray-600"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
          </svg>
            </div>
            <div className="carousel-item h-full flex items-center justify-center  bg-gray-800 border border-gray-500 rounded shadow animate-pulse  dark:border-gray-500">
            <svg
            viewBox="0 0 16 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-10  text-gray-400 dark:text-gray-600"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
          </svg>
            </div>
            
          
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="md:w-1/3 my-1 pt-4  w-full rounded-md bg-black ml-2 p-2 text-white relative flex flex-col justify-between">
        <div className="text-justify text-md">
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[40%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[40%] mb-4"></div>
        </div>
        <div className="text-justify text-md">
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        <div className="p-1 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[60%] mb-4"></div>
        </div>
        <div className="text-justify text-md">
        <div className="p-3 mx-3 h-2.5 bg-gray-100 animate-pulse   rounded-full  w-[90%] mb-4"></div>
       
        </div>
      </div>
    </div>
    
  );
};

export default LoadingCard;
