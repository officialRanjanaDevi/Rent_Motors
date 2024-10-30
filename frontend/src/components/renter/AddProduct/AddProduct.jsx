import React, { useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const AddProduct = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  const handleClick = (newState, msg) => () => {
    setState({ ...newState, open: true, message: msg });
    setTimeout(() => setState({ ...state, open: false }), 1500);
  };

  const form = useRef();
  const [credentials, setCredentials] = useState({
    name: "",
    price: "",
    discount: "",
    description: "",
    skintype: "",
    category: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          skintype: credentials.skintype,
          category: credentials.category,
          description: credentials.description,
          price: credentials.price,
          discount: credentials.discount
        })
      });

      const json = await response.json();

      if (json.success) {

        setCredentials({
          name: "",
          price: "",
          discount: "",
          description: "",
          skintype: "",
          category: ""
        });
      }
    } catch (error) {
      console.error("Error during adding new product:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full rounded-md bg-neutral-100 shadow-md">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-neutral-100 mx-auto w-[90vw] md:w-[70vw] p-6 rounded-lg"
      >
        <h1 className="text-center font-bold text-lg">Add New Product</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            onChange={onChange}
            placeholder="Enter name of Product"
            type="text"
            name="name"
            value={credentials.name}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              onChange={onChange}
              placeholder="Enter price in Rupees"
              type="number"
              name="price"
              value={credentials.price}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Choose a category:
            </label>
            <select
              name="category"
              onChange={onChange}
              value={credentials.category}

              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option  >select category</option>
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
              <option value="Makeup">Makeup</option>
            </select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <div>
            <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2">
              Discount
            </label>
            <input
              onChange={onChange}
              placeholder="Enter discount in percentage"
              type="number"
              name="discount"
              value={credentials.discount}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="skintype" className="block text-gray-700 text-sm font-bold mb-2">
              Best for skin type:
            </label>
            <select
              name="skintype"
              id="skintype"
              onChange={onChange}  // Ensure onChange is correctly added
              value={credentials.skintype}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a skin type</option>  {/* Added default empty option */}
              <option value="Dry">Dry</option>
              <option value="Normal">Normal</option>
              <option value="Oily">Oily</option>
              <option value="Sensitive">Sensitive</option>
              <option value="Combination">Combination</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            onChange={onChange}
            placeholder="Enter description for Product"
            type="text"
            name="description"
            rows={4}
            value={credentials.description}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 grid-cols-3 grid gap-4">
          {["image1", "image2", "image3"].map((image, index) => (
            <div key={index}>
              <label htmlFor={image} className="block text-gray-700 text-sm font-bold mb-2">
                Upload image
              </label>
              <input
                type="file"
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleClick(
            { vertical: "top", horizontal: "center" },
            "Product added"
          )}
          type="submit"
          className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}

          sx={{ width: "10rem" }}
          key={vertical + horizontal}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default AddProduct;
