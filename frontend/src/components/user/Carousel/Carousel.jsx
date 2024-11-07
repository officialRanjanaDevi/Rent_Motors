import React from 'react';
import { images } from '../../../assets/images'; // Ensure this path is correct

const Carousel = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="rounded-[40px] carousel slide  mx-auto w-[90%]" data-ride="carousel" style={{ maxHeight: "700px" }}>
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner rounded-[40px]" style={{ maxHeight: "700px" }}>
        <div className="carousel-item rounded-[40px]">
            <img src={images.home2} className="d-block w-100 rounded-[40px]" alt="Other services" />
            <div className="carousel-caption mb-6 sm:mb-16 md:mb-32 lg:mb-40 xl:mb-52">
              <h5 className='text-3xl sm:text-4xl  md:text-5xl lg:text-7xl font-black tracking-wider'>RENT MOTORS</h5>
              <p>Book your first bike and build memories</p>
            </div>
          </div>
          <div className="carousel-item rounded-[40px] active">
            <img src={images.home1} className="d-block w-100 rounded-[40px]" alt="Hair styling" />
            <div className="carousel-caption mb-6 sm:mb-16 md:mb-32 lg:mb-40 xl:mb-52">
              <h5 className='text-3xl sm:text-4xl  md:text-5xl lg:text-7xl font-black tracking-wider'>RENT MOTORS</h5>
              <p>Book your first bike and build memories</p>
            </div>
          </div>
          <div className="carousel-item rounded-[40px]">
            <img src={images.home3} className="d-block w-100 rounded-[40px]" alt="Makeup" />
            <div className="carousel-caption mb-6 sm:mb-16 md:mb-32 lg:mb-40 xl:mb-52">
              <h5 className='text-3xl sm:text-4xl  md:text-5xl lg:text-7xl font-black tracking-wider'>RENT MOTORS</h5>
              <p>Book your first bike and build memories</p>
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
