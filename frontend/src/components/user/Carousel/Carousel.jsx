import React from 'react';
import { images } from '../../../assets/images'; // Ensure this path is correct

const Carousel = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide mt-12" data-ride="carousel" style={{ maxHeight: "700px" }}>
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" style={{ maxHeight: "700px" }}>
        <div className="carousel-item">
            <img src={images.skincare} className="d-block w-100" alt="Other services" /> {/* Replace with the actual image */}
            <div className="carousel-caption mb-6 sm:mb-16 md:mb-40 lg:mb-64 xl:mb-96">
              <h5 className='text-3xl sm:text-4xl  md:text-5xl lg:text-7xl font-black tracking-wider'>Skin Care</h5>
              <p>Buy one get one free</p>
            </div>
          </div>
          <div className="carousel-item active">
            <img src={images.hair} className="d-block w-100" alt="Hair styling" />
            <div className="carousel-caption mb-6 sm:mb-16 md:mb-40 lg:mb-64 xl:mb-96">
              <h5 className='text-3xl sm:text-4xl  md:text-5xl lg:text-7xl font-black tracking-wider'>Hair Products</h5>
              <p>10% discount on haircare</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={images.makeup} className="d-block w-100" alt="Makeup" />
            <div className="carousel-caption mb-6 sm:mb-16 md:mb-40 lg:mb-64 xl:mb-96">
              <h5 className='text-3xl sm:text-4xl  md:text-5xl lg:text-7xl font-black tracking-wider'>Make up</h5>
              <p>Transform your look, elevate your confidence </p>
            </div>
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
    </>
  );
};

export default Carousel;
