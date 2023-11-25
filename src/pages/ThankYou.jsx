import React from "react";
import Lottie from "lottie-react";
import tickAnimation from "../lottie/tickAnimation.json";
import { useNavigate } from "react-router-dom";
import { viewUser } from "../utils/api/user";
import { useEffect } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const handleTimeOut = async () => {
    try {
      const user = await viewUser();
      if (user) {
        setTimeout(() => {
          navigate("/secured");
        }, 10000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 10000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleTimeOut();
  }, []);

  return (
    <div className="m-5 p-5">
      <div className="flex flex-col justify-center items-center gap-6">
        <div>
          <Lottie
            className="w-[20rem]"
            loop="false"
            animationData={tickAnimation}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-4xl font-bold">Thank You</h1>
          <h1 className="text-3xl font-light">
            Your Information has been recorded
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
