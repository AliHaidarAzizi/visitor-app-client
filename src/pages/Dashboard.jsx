import { useNavigate } from "react-router-dom";
import { apiDeleteVenue, listAllVenue } from "../utils/api/venue";
import { useEffect, useState } from "react";
import { viewUser } from "../utils/api/user";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import SidebarComponent from "../components/Sidebar.jsx";
import { Oval } from "react-loader-spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  const fetchVenues = async () => {
    try {
      setIsLoading(true);
      const userData = await viewUser();
      setUser(userData.data.data.username);

      const response = await listAllVenue(page);
      setData(response.data.list);
      // console.log(response.data.list);
      setMaxPage(response.data.pagination.maxPage);

      return;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    // Increment the page number when the "Load More" button is clicked
    setPage(page + 1);
    // Then send a request to your backend with the new page number
    fetchVenues();
  };
  const loadPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchVenues();
    }
  };

  const humanisedDateTime = (dateTime) => {
    // 1 step - convert string to dateTime data type
    const newDateTime = DateTime.fromISO(dateTime);
    // 2. - Format to the designated format
    return newDateTime.toLocaleString();
  };
  const deleteVenue = async (venueId) => {
    try {
      const res = await apiDeleteVenue(venueId);
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
        icon: "📤",
        autoClose: 3000,
      });
      await fetchVenues();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [page]);

  return (
    <>
      <div className="flex">
        <SidebarComponent />
        <main className="m-4 mr-8 w-full lg:w-2/3 flex">
          {" "}
          {isLoading ? (
            <div className=" absolute top-1/2 left-1/2 mx-auto my-auto">
              <Oval
                className=""
                height={50}
                width={50}
                color="#4338ca"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#a5b4fc"
                strokeWidth={5}
                strokeWidthSecondary={5}
              />
            </div>
          ) : (
            <div>
              <h2 className=" capitalize text-2xl font-bold ">{`Welcome ${user}!`}</h2>
              <div className="grid grid-cols-3 pb-3">
                <button
                  className=" p-3 col-start-3 bg-indigo-700 hover:bg-indigo-800 rounded-md py-1 text-white"
                  onClick={() => navigate("/secured/add")}
                >
                  Add New Venue
                </button>
              </div>
              <div className="shadow-md rounded-lg hidden md:block">
                <table className="w-full">
                  <thead className="bg-indigo-100 border-b-2 border-indigo-300">
                    <tr>
                      <th className=" p-5 text-sm  font-semibold tracking-wide text-left">
                        Venue/Event Name
                      </th>
                      <th className=" w-48 p-5 text-sm font-semibold  tracking-wide text-left ">
                        Current Capacity
                      </th>
                      <th className=" w-32 p-5 text-sm font-semibold tracking-wide text-left ">
                        Visit Count
                      </th>
                      <th className=" w-32 p-5 text-sm font-semibold tracking-wide text-left ">
                        Created At
                      </th>
                      <th className=" w-32 p-5 text-sm font-semibold tracking-wide text-left ">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" divide-y divide-indigo-300">
                    {data.map((venue, index) => (
                      <tr key={index} className="bg-indigo-50">
                        <td className=" p-5 text-sm text-gray-800 ">
                          {venue.venueName}
                        </td>
                        <td className=" p-5 text-sm text-gray-800 ">
                          <span className="p-1.5 text-md font-bold tracking-wide text-purple-900  ">
                            {venue.venueCapacity === null
                              ? null
                              : venue.venueCapacity - venue.visitLogsCount}
                          </span>
                        </td>
                        <td className=" p-5 text-sm text-gray-800 ">
                          <span className="p-1.5 text-md font-bold tracking-wide text-purple-900  ">
                            {venue.visitLogsCount}
                          </span>
                        </td>
                        <td className=" p-5 text-sm text-gray-800 ">
                          {humanisedDateTime(venue.createdAt)}
                        </td>
                        <td className=" p-5 text-sm font-bold text-blue-800">
                          <p
                            className="hover:underline cursor-pointer"
                            onClick={() => navigate(`/secured/${venue.id}`)}
                          >
                            View More
                          </p>
                          <p
                            className="hover:underline cursor-pointer"
                            onClick={() => deleteVenue(venue.id)}
                          >
                            Delete
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {data.map((venue, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50 p-2 space-y-1 rounded-lg  shadow-md"
                  >
                    <div className="flex gap-2 justify-between space-x-4">
                      <div>
                        <div className="flex items-center space-x-3 text-sm">
                          <div className="p-3 text-sm text-gray-800 ">
                            {humanisedDateTime(venue.createdAt)}
                          </div>
                        </div>
                        <div className="py-1 px-3 text-lg capitalize font-semibold text-gray-800 ">
                          {venue.venueName}
                        </div>
                        <div className=" flex flex-col px-3 text-md font-medium tracking-wide text-purple-900">
                          <span className="pr-4">
                            Visit Total Count: {venue.visitLogsCount}
                          </span>
                          <span className="text-sm font-light">
                            Remaining Capacity:{" "}
                            {venue.venueCapacity === null
                              ? null
                              : venue.venueCapacity - venue.visitLogsCount}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => navigate(`/secured/${venue.id}`)}
                          className=" text-white bg-indigo-600 py-4 px-3 rounded-lg hover:bg-indigo-800"
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 gap-2">
                {" "}
                <span>{`${page} of ${maxPage}`}</span>
                <div className="flex gap-3">
                  <button
                    className={` text-sm p-3 col-start-3 bg-indigo-700 hover:bg-indigo-800 rounded-md py-1 text-white ${
                      page === 1 ? "hidden" : "visible"
                    } `}
                    onClick={loadPrevious}
                    disabled={page === 1}
                  >
                    Load Previous
                  </button>
                  <button
                    className={`text-sm p-3 col-start-3 bg-indigo-700 hover:bg-indigo-800 rounded-md py-1 text-white ${
                      page === maxPage ? "hidden" : "visible"
                    } `}
                    onClick={loadMore}
                  >
                    Load More
                  </button>{" "}
                </div>
                {/* Add a "Load More" button */}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
