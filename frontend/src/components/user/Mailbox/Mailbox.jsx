import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import './Mailbox.css'
const Mailbox = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const Service_ID = import.meta.env.VITE_SERVICE_ID;
  const Template_ID = import.meta.env.VITE_TEMPLATE_ID;
  const Public_Key = import.meta.env.VITE_PUBLIC_KEY;

  const handleSubmit = (e) => {
    setStatus("PENDING");
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: mail,
      message: message,
      to_name: "Ranjana",
    };

    emailjs.send(Service_ID, Template_ID, templateParams, Public_Key).then(
      () => {
        setName("");
        setMail("");
        setMessage("");
        setStatus("SUCCESS");

        setTimeout(() => setStatus(null), 3000); // Clear after 3 seconds
      },
      (error) => {
        setStatus("FAILED");

        console.log("FAILED...", error.text);
      }
    );

    {
      status && (
        <div
          className={`mt-4 ${
            status === "SUCCESS" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status === "SUCCESS"
            ? "Message sent successfully!"
            : "Failed to send message. Try again."}
        </div>
      );
    }
  };

  return (
    <div className="mt-20">
      <div  className="flex flex-col items-center" style={{ display: status === "PENDING" ? "flex" : "none" }}>
      <div className="loader" ></div>
      <p>Please wait..</p>
      </div>
     
      <div
        className="text-center alert bg-rose-300 w-1/2 mx-auto text-white rounded-md"
        role="alert"
        style={{ display: status === "SUCCESS" ? "block" : "none" }}
      >
        <h1 className=" font-bold">Message sent successfully</h1>
        Thank you for reaching out to us. We've received your message and will
        get back to you shortly.
      </div>

      <div
        className="text-center alert bg-neutral-200 w-1/2 mx-auto text-black rounded-md"
        role="alert"
        style={{ display: status === "FAILED" ? "block" : "none" }}
      >
        <h1 className=" font-bold">Oops, message failed</h1>
        Please try again.
      </div>

      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-neutral-200 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            type="text"
            required
            value={name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            value={mail}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            value={message}
            placeholder="Enter your message"
            id="message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default Mailbox;
