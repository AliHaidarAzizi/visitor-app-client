import React from "react";
import Header from "../components/Header.jsx";
import Lottie from "lottie-react";
import Animation from "../lottie/HomepageAnimation.json";
import AnimationQR from "../lottie/qrcodeAnimation.json";
import AnimationForm from "../lottie/formAnimation.json";
import AnimationWelcome from "../lottie/WavingFriends.json";

function Home() {
  return (
    <>
      <Header />
      <div className="m-4 p-4 mt-15 flex flex-col gap-10">
        <div className=" flex flex-col gap-5 lg:flex-row items-center md:justify-center justify-center px-5">
          <div className=" space-y-5 flex flex-col items-center">
            <h1 className="text-3xl md:text-6xl font-semibold">
              No More <span className=" text-indigo-700">“Who Are You?”</span>
            </h1>
            <h3 className="text-2xl font-light">
              Collect your visitor information with Vislog today!
            </h3>
          </div>
          <div className="">
            <Lottie className="lg:scale-[1.2]" animationData={Animation} />
          </div>
        </div>
        <div className="m-4 md:mt-10 lg:mt-20 p-4  flex flex-col items-center justify-center ">
          <h2 className="text-4xl font-medium">
            3 <span className="text-indigo-700">Simple</span> Steps
          </h2>
        </div>
        <div className=" px-20 mt-1 grid lg:grid-flow-col gap-4 justify-center">
          <div className=" p-3 flex flex-col items-center justify-center shadow-md  w-96 h-96 rounded-xl">
            <h4 className=" text-3xl font-medium">Scan</h4>
            <Lottie animationData={AnimationQR} />
          </div>
          <div className="md:mx-10 p-3 flex flex-col items-center justify-center shadow-md  w-96 h-96 rounded-xl">
            <h4 className="mt-10 text-3xl font-medium">Fill</h4>
            <Lottie
              className="mt-[-2px] scale-[0.6]"
              animationData={AnimationForm}
            />
          </div>
          <div className=" p-3 flex flex-col items-center justify-center shadow-md  w-96 h-96 rounded-xl">
            <h4 className=" text-3xl font-medium">Enter</h4>
            <Lottie className="scale-[0.6]" animationData={AnimationWelcome} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
