import { useEffect } from "react";
import { viewVisitor } from "../utils/api/visitor";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QRcodeGenerator from "../components/QRcodeGenerator";
import { useState } from "react";
import { DateTime } from "luxon";

const Venue = () => {
  const { venueId } = useParams();
  const [data, setData] = useState([]);
  const [logCount, setLogCount] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const fetchVisitors = async () => {
    console.log(search);
    try {
      const venueData = await viewVisitor(venueId, page, search);
      setLogCount(venueData.data.list.length);
      setData(venueData.data.list);
      setMaxPage(venueData.data.pagination.maxPage);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.list);
    }
  };

  const loadMore = () => {
    // Increment the page number when the "Load More" button is clicked
    setPage(page + 1);
    // Then send a request to your backend with the new page number
    fetchVisitors();
  };

  const loadPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchVisitors();
    }
  };
  const humanisedDateTime = (dateTime) => {
    // 1 step - convert string to dateTime data type
    const newDateTime = DateTime.fromISO(dateTime);
    // 2. - Format to the designated format
    return newDateTime.toLocaleString(DateTime.DATETIME_MED);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchVisitors();
    }, 700);
    return () => clearTimeout(getData);
  }, [page, search]);

  return (
    <>
      <QRcodeGenerator />
      <div className="flex flex-col justify-center items-center mt-3">
        <input
          type="text"
          className="w-80 h-10 p-1 border rounded-lg"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <main className=" md:m-4 md:mr-2 pr-6 w-full lg:w-5/6">
          <div className="m-1 p-1">
            <div className="grid grid-cols-2 md:grid-cols-3 py-3 mx-2">
              <h1 className=" col-start-1 p-2 text-xl font-bold">
                Visitor Logs
              </h1>
              <h3 className=" col-start-1 md:col-start-2 p-2 text-md font-normal">
                Total visits: {logCount}
              </h3>
              <button
                className=" py-2 col-start-2 md:col-start-3 bg-indigo-700 hover:bg-indigo-800 rounded-md text-white"
                onClick={() => navigate(`/add/${venueId}`)}
              >
                Add New Visitor
              </button>
            </div>
            <div className="shadow-md rounded-lg hidden md:block">
              <table className="w-full">
                <thead className="bg-indigo-100 border-b-2 border-indigo-300">
                  <tr>
                    <th className="w-56 p-5 text-sm  font-semibold tracking-wide text-left">
                      Visitor Name
                    </th>
                    <th className=" p-5 text-sm font-semibold tracking-wide text-left ">
                      Reason of Visit
                    </th>
                    <th className=" w-32 p-5 text-sm font-semibold  tracking-wide text-left ">
                      Email
                    </th>
                    <th className=" w-64 p-5 text-sm font-semibold tracking-wide text-left ">
                      Visit Date
                    </th>
                    <th className=" w-32 p-5 text-sm font-semibold tracking-wide text-left ">
                      Contact No.
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-indigo-300">
                  {data.map((visitor, index) => (
                    <tr key={index} className="bg-indigo-50">
                      <td className=" p-5 text-sm text-gray-800 ">
                        {visitor.visitorName}
                      </td>
                      <td className=" p-5 text-sm text-gray-800 ">
                        <span className="p-1.5 text-md font-bold tracking-wide text-purple-900  ">
                          {visitor.visitorReason}
                        </span>
                      </td>
                      <td className=" p-5 text-sm text-gray-800 ">
                        {visitor.visitorEmail}
                      </td>
                      <td className=" p-5 text-sm text-gray-800 ">
                        {humanisedDateTime(visitor.createdAt)}
                      </td>
                      <td className=" p-5 text-sm text-gray-800 ">
                        {visitor.visitorContactNo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 gap- md:hidden mx-1">
              {data.map((visitor, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 p-2 space-y-1 rounded-lg shadow m-2"
                >
                  <div className="flex flex-col gap-2 justify-between space-x-1">
                    <div className="flex items-start justify-start ">
                      <div className="p-3 text-md capitalize font-semibold text-gray-800 ">
                        {visitor.visitorName}
                      </div>
                      <div className=" flex p-3 text-md font-medium tracking-wide text-purple-900">
                        <p className="text-grey-800 pr-2">Reason: </p>
                        {visitor.visitorReason}
                      </div>
                    </div>
                    <div className="flex items-center justify-start space-x-2 text-sm">
                      <div className="p-2 text-xs text-gray-800 ">
                        {humanisedDateTime(visitor.createdAt)}
                      </div>
                      <div className="p-2 text-sm text-gray-800 ">
                        {visitor.visitorEmail}
                      </div>
                      <div className="p-2 text-sm text-gray-800 ">
                        {visitor.visitorContactNo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>{page}</div>
            <button
              className={`p-3 col-start-3 bg-indigo-700 hover:bg-indigo-800 rounded-md py-1 text-white ${
                page === 1 ? "hidden" : "visible"
              } `}
              onClick={loadPrevious}
              disabled={page === 1}
            >
              Load Previous
            </button>
            <button
              className={`p-3 col-start-3 bg-indigo-700 hover:bg-indigo-800 rounded-md py-1 text-white ${
                page === maxPage ? "hidden" : "visible"
              } `}
              onClick={loadMore}
            >
              Load More
            </button>{" "}
          </div>
        </main>
      </div>
    </>
  );
};

export default Venue;
