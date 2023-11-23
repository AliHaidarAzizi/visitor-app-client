import React, { useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { apiLogin } from "../../utils/api";
export const Login = () => {
  const navigate = useNavigate();
  // const cookies = new Cookies(null, {path : "/"})
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.dir(e.target[2].value)

    const email = e.target[0].value;
    const password = e.target[1].value;
    const data = { email, password };

    // Method 2

    try {
      // start loading here
      setIsLoading(true);
      const res = await apiLogin(data);
      console.log(res);
      toast.success(res.data.message, {
        icon: "🔓",
        autoClose: 3000,
      });

      // cookies.set("token", res.data.token)

      setTimeout(() => {
        navigate("/secured");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);

      // alert(error.response.data.message);
    } finally {
      // loading end here
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className=" p-4 flex flex-col justify-center items-center">
        <h4 className=" text-2xl font-bold">Login</h4>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="lg:w-1/3 md:w-1/3 mt-6"
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
            disabled={isLoading}
            className="text-white bg-indigo-700  w-full hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            {isLoading ? "Loading" : "Login Now"}
          </button>
        </form>
        <p className="p-3 text-md font-medium text-gray-900">
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Register Now
          </a>
        </p>
      </div>
    </>
  );
};
