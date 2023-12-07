import { DateTime } from "luxon";
import React, { useState } from "react";
import { Modal } from "../../../components/modal";
import { useNavigate } from "react-router-dom";

const VenueRow = ({ venue }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalVenueId, setModalVenueId] = useState(null);

  const humanisedDateTime = (dateTime) => {
    // 1 step - convert string to dateTime data type
    const newDateTime = DateTime.fromISO(dateTime);
    // 2. - Format to the designated format
    return newDateTime.toLocaleString();
  };
  const handleDeleteClick = (venueId) => {
    setModalVenueId(venueId);
    setOpenModal(true);
  };
  const handleDelete = () => console.log("DELETE");
  return (
    <tr className="bg-indigo-50">
      <td className=" p-5 text-sm text-gray-800 ">{venue.venueName}</td>
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
          onClick={() => handleDeleteClick(venue.id)}
        >
          Delete
        </p>
        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            venueId={modalVenueId}
            onDelete={handleDelete}
          />
        )}
      </td>
    </tr>
  );
};

export default VenueRow;
