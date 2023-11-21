import {  useParams } from "react-router-dom"
import  QRCode  from "qrcode"
import { useEffect, useState } from "react"
import { apiViewVenue } from "../../utils/api/venue"
import { toast } from "react-toastify"



const QRcodeGenerator = () => {
    const [qrcode, setQrCode] = useState('')
    const siteURL = import.meta.env.VITE_UI_BASE_URL
   
    const {venueId} = useParams()
    console.log(venueId)

    const url = `${siteURL}/add/${venueId}`
    
    

    const confirmVenue = async () => {
            try {
              const venueData = await apiViewVenue(venueId)
              const dbVenueId = venueData.data.data.id
              console.log(dbVenueId)
              return dbVenueId == venueId
              
            } catch (error) {
              console.error(error);
              toast.error(error.response.data.message)
              return false
            }
          
    }


    const generateQRCode = async () => {
        if (await confirmVenue()) {
            QRCode.toDataURL(url, {
                color: {
                    dark: "#c7d2fe",
                    light: "#312e81"
                }
                
            }, (error, url) => {
                if (error) {
                    return console.error(error)
                } 
                
                setQrCode(url)
                
            })
        }
    }
    useEffect(() => {
        generateQRCode()
    }, [])


  return (

    <div>
        <div className="flex flex-col justify-center items-center">
            <h1 className=" text-xl font-semibold">Welcome!</h1>
            <h3 className=" text-sm font-normal">Please Scan QRcode below to check in!</h3>
        </div>
        {qrcode && <>
            <div className="flex justify-center items-center p-4">
                <img src={qrcode}  alt="QR Code" className="w-full h-auto max-w-xs object-cover rounded-lg shadow-md" />
            </div>
        </>}
    </div>
  )
}

export default QRcodeGenerator