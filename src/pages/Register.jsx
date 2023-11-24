import React from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRegister } from "../utils/api";

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.dir(e.target[2].value)

    // Method 1
    const email = e.target[0].value;
    const username = e.target[1].value;
    const password = e.target[2].value;
    const data = { email, username, password };

    // Method 2
    // const form = e.target;
    // console.log(form)
    // const formData = new FormData(form);
    // const data = Object.fromEntries(formData);

    try {
      const res = await apiRegister(data);
      console.log(res);
      toast.success(res.data.message, {
        icon: "🚀",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error(error.response.data.errors[0].message);

      // alert(error.response.data.message);
    }
  };
  return (
    <>
      <Header />
      <div className=" p-4 flex flex-col justify-center items-center gap-2">
        <h4 className=" text-2xl font-bold">Registration</h4>
        <p>Please register to use Vislog features</p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="lg:w-1/3 md:w-1/3 mt-2"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-md font-medium text-gray-900 "
            >
              Your username
            </label>
            <input
              type="username"
              id="username"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="JohnDoe"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900 "
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-700 w-full hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            Register new account
          </button>
        </form>
        <p className="p-3 text-md font-medium text-gray-900">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign In
          </a>
        </p>
      </div>
    </>
  );
};
