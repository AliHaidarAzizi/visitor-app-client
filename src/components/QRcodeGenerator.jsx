import { useParams } from "react-router-dom";
import QRCode from "qrcode";
import { useEffect, useState, useRef } from "react";
import { apiViewVenue } from "../utils/api/venue";
import { toast } from "react-toastify";
import * as htmlToImage from "html-to-image";

const QRcodeGenerator = () => {
  const [qrcode, setQrCode] = useState("");
  const [venue, setVenue] = useState([]);
  const qrDoc = useRef(null);

  const siteURL = import.meta.env.VITE_UI_BASE_URL;

  const { venueId } = useParams();
  //   console.log(venueId);

  const url = `${siteURL}/add/${venueId}`;

  const confirmVenue = async () => {
    try {
      const venueData = await apiViewVenue(venueId);
      setVenue(venueData.data.data.venueName);
      const dbVenueId = venueData.data.data.id;
      // console.log(dbVenueId);
      return dbVenueId == venueId;
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      return false;
    }
  };

  const generateQRCode = async () => {
    if (await confirmVenue()) {
      QRCode.toDataURL(
        url,
        {
          color: {
            dark: "#c7d2fe",
            light: "#312e81",
          },
        },
        (error, url) => {
          if (error) {
            return console.error(error);
          }

          setQrCode(url);
        }
      );
    }
  };
  const handleDownload = async () => {
    const image = await htmlToImage.toPng(qrDoc.current);
    const link = document.createElement("a");
    link.download = `${venue}.png`;
    link.href = image;
    link.click();
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <>
      <div ref={qrDoc} className=" bg-white ">
        <div className="flex flex-col justify-center items-center">
          <h1 className=" text-xl font-semibold">Welcome to {venue}!</h1>
          <h3 className=" text-sm font-normal">
            Please Scan QRcode below to check in!
          </h3>
        </div>
        {qrcode && (
          <>
            <div className="flex flex-col gap-2 justify-center items-center p-4">
              <img
                src={qrcode}
                alt="QR Code"
                className="w-full h-auto max-w-xs object-cover rounded-lg shadow-md"
              />
            </div>
          </>
        )}
      </div>
      <button
        onClick={handleDownload}
        className=" py-2 col-start-2 md:col-start-3 bg-indigo-300 hover:bg-indigo-500 rounded-md text-white px-10 mx-4"
      >
        Download
      </button>
    </>
  );
};

export default QRcodeGenerator;
