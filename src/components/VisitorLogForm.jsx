import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header.jsx";
import { addVisitor } from "../utils/api/addVisitor";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const VisitorLogForm = () => {
  let { venueId } = useParams();
  const [visitorData, setVisitorData] = useLocalStorage(
    "VISITOR_DATA",
    {},
    venueId
  );
  const [isLoading, setIsLoading] = useState(false);
  //  console.log(venueId)
  venueId = parseInt(venueId);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitorName = e.target[0].value;
    const visitorEmail = e.target[1].value;
    const visitorContactNo = e.target[2].value;
    const visitorReason = e.target[3].value;
    const data = {
      visitorName,
      visitorEmail,
      visitorContactNo,
      visitorReason,
      venueId,
    };

    try {
      setIsLoading(true);
      const res = await addVisitor(data);
      // setVisitorData(res.data.data);
      console.log(res);
      toast.success(res.data.message, {
        icon: "🚀",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/thankyou");
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      }
      toast.error(error.response.data.errors[0].message);

      // alert(error.response.data.message);response.data.message
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(visitorData);
  // }, [visitorData]);
  // {
  //     "visitorName": "Hazim",
  //     "visitorEmail": "hazim@mail.com",
  //     "visitorContactNo": "0123456798",
  //     "visitorReason": "Hantar Barang",
  //     "venueId": 3
  // }

  return (
    <>
      <Header />
      <div>
        <main className="m-4 w-screen">
          <div className="py-4 pr-4 pl-0 flex flex-col justify-center items-center gap-1">
            <h4 className=" text-2xl font-bold">Visitor Form</h4>
            <p>Please fill in the form</p>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="w-5/6 lg:w-2/3 md:w-5/6 mt-2"
            >
              <div className="mb-6">
                <label
                  htmlFor="visitorName"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="visitorName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                  value={visitorData.visitorName || ""}
                  onChange={(e) => {
                    setVisitorData({
                      ...visitorData,
                      visitorName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="visitorEmail"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="visitorEmail"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Johndoe@email.com"
                  required
                  value={visitorData.visitorEmail || ""}
                  onChange={(e) => {
                    setVisitorData({
                      ...visitorData,
                      visitorEmail: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="visitorContactNo"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Contact No
                </label>
                <input
                  type="tel"
                  id="visitorContactNo"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="0123456789"
                  required
                  minLength="8"
                  maxLength="15"
                  value={visitorData.visitorContactNo || ""}
                  onChange={(e) => {
                    setVisitorData({
                      ...visitorData,
                      visitorContactNo: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="visitorReason"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Reason of Visiting
                </label>
                <textarea
                  name="visitorReason"
                  id="visitorReason"
                  cols="15"
                  rows="5"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Pick up guest"
                  required
                  value={visitorData.visitorReason || ""}
                  onChange={(e) => {
                    setVisitorData({
                      ...visitorData,
                      visitorReason: e.target.value,
                    });
                  }}
                ></textarea>
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
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default VisitorLogForm;
