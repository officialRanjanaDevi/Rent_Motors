import React from "react";
import Carousel from "../../components/user/Carousel/Carousel";
import { images } from "../../assets/images";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Home = () => {
  return (
    <div className=" mt-12">
      <div className=" py-4">
        <Carousel />
      </div>

      
     

      <section className=" h-[75vh] my-2 bg-neutral-200 rounded-[40px] w-[90%] mx-auto shadow-md shadow-neutral-500">
        <h1 className="font-bold text-2xl text-center mb-8">Why choose us?</h1>
        <div className="grid grid-cols-3 gap-y-6">
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src={images.widerange} className="h-40 w-44"></img>
            <h1>Wide Range</h1>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src={images.customerservice} className="h-40 w-44"></img>
            <h1>24*7 Service</h1>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src={images.instantrefund} className="h-40 w-44"></img>
            <h1>Instant Refund</h1>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src={images.bestprice} className="h-40 w-44"></img>
            <h1>Reasonable Price</h1>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src={images.fleet} className="h-40 w-44"></img>
            <h1>Highly Maintained Fleet</h1>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src={images.trust} className="h-40 w-44"></img>
            <h1>Trustworthy Renter</h1>
          </div>
        </div>
      </section>

      <section className="h-[60vh] flex flex-col justify-center bg-white w-[90%] mx-auto">
        <h1 className="text-center font-bold text-xl mb-8">
          Simple steps to book your bike.
        </h1>
        <Stepper className="flex justify-evenly px-8 font-bold">
          <Step className="text-center">
            <img src={images.login} className="h-36 w-40"></img>
            <p>login as client</p>
          </Step>
          <Step className="text-center">
            <img src={images.bike} className="h-36 w-40"></img>
            <p>select your fav bike</p>
          </Step>
          <Step className="text-center">
            <img src={images.cart} className="h-36 w-40"></img>
            <p>add to cart</p>
          </Step>
          <Step className="text-center">
            <img src={images.update} className="h-36 w-40"></img>
            <p>update address and dates</p>
          </Step>
          <Step className="text-center">
            <img src={images.payment} className="h-36 w-40"></img>
            <p>proceed to payment</p>
          </Step>
        </Stepper>
      </section>

      <section className="bg-neutral-200 p-4 rounded-[40px] w-[90%] mx-auto shadow-md shadow-neutral-500">
        <h1 className="font-bold text-xl text-center mb-8">
          Have question? We got you
        </h1>
        <div className=" mx-auto ">
          <Accordion  className="p-2 ">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h2 className="font-semibold">Can I book a bike for multiple days?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Yes, you can rent a bike for multiple days. The total rental
                cost will be calculated based on the number of days you plan to
                rent the bike.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion  className="p-2">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <h2 className="font-semibold">Is there a security deposit required?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Yes, a security deposit is required at the time of booking. The
                deposit amount varies based on the bike model and will be
                refunded after the bike is returned in good condition.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion  className="p-2">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <h2 className="font-semibold">What is the cancellation policy?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Cancellations made 24 hours before the rental start time are
                fully refundable. If the cancellation is made less than 24 hours
                in advance, a cancellation fee may apply.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion  className="p-2">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel5-content"
              id="panel5-header"
            >
              <h2 className="font-semibold">Are helmets and other safety gear provided?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Yes, helmets are provided with each bike rental. Additional
                safety gear, such as gloves or jackets, may be available upon
                request.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion  className="p-2">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h2 className="font-semibold">What is the minimum age to rent a bike?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                The minimum age to rent a bike is typically 18 years old.
                However, this may vary depending on the location and local
                regulations.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion  className="p-2">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <h2 className="font-semibold">Are there any mileage limits on rentals?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Some rentals may have a daily mileage limit, while others offer
                unlimited mileage. Please check with the rental provider for
                specific details regarding mileage limits.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion  className="p-2">
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <h2 className="font-semibold">What happens if I return the bike late?</h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Late returns may incur additional charges. It is advisable to
                inform the rental service if you anticipate a delay to avoid any
                penalties.
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Home;
