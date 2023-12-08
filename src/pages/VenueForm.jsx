import { useState } from "react";
import { apiAddVenue } from "../utils/api/venue";
import { toast } from "react-toastify";
import SidebarComponent from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const VenueForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const venueName = e.target[0].value;
    const venueCapacity = e.target[1].value;
    const data = { venueName, venueCapacity };

    try {
      setIsLoading(true);
      const res = await apiAddVenue(data);
      // console.log(res);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
        icon: "🚀",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/secured");
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex">
        <SidebarComponent />
        <main className="m-4 mr-8 w-full lg:w-2/3">
          <div className=" p-4 flex flex-col justify-center items-center gap-2">
            <h4 className=" text-2xl font-bold">New Venue/Event</h4>
            <p>Please add details of the new venue/event</p>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="lg:w-1/3 md:w-1/3 mt-2"
            >
              <div className="mb-6">
                <label
                  htmlFor="venueName"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Venue/Event Name
                </label>
                <input
                  type="venueName"
                  id="venueName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Airport Parking"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="venueCapacity"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Venue Capacity{" "}
                  <span className=" text-sm font-light">(optional)</span>
                </label>
                <input
                  type="number"
                  id="venueCapacity"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="100"
                />
              </div>

              <button
                type="submit"
                className="flex justify-center items-center text-white bg-indigo-700 w-full hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
              >
                {isLoading ? (
                  <Oval
                    className=""
                    height={30}
                    width={30}
                    color="#ffffff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#808080"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                  />
                ) : (
                  "Add Venue/Event"
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default VenueForm;
