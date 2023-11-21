import { useNavigate } from "react-router-dom"
import { apiDeleteVenue, listAllVenue } from "../../utils/api/venue"
import { useEffect, useState } from "react"
import { viewUser } from "../../utils/api/user"
import { DateTime } from 'luxon'
import { toast } from 'react-toastify'
import SidebarComponent from "../components/Sidebar"





const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const fetchVenues = async () => {
    try {
      const userData = await viewUser()
      setUser(userData.data.data.username)
      
    

      const response = await listAllVenue()
      setData(response.data.data)
      console.log(response.data.data)
      return
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const humanisedDateTime = (dateTime) => {
    // 1 step - convert string to dateTime data type
    const newDateTime = DateTime.fromISO(dateTime)
    // 2. - Format to the designated format
    return newDateTime.toLocaleString()

  }
  const deleteVenue = async (venueId) => {
    try {
       const res = await apiDeleteVenue(venueId);
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
        icon: "📤",   
        autoClose: 3000
      })
      await fetchVenues()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    fetchVenues()
  },[])


  return (
    <>
    <div className='flex'>
      <SidebarComponent />
      <main className='m-4 mr-8 w-full lg:w-2/3'>
        <div >
          
          <h2 className=' capitalize text-2xl font-bold '>{`Welcome ${user}!`}</h2>
          <div className='grid grid-cols-3 pb-3'>
              <button className=' col-start-3 bg-indigo-300 hover:bg-indigo-500 rounded-md py-1 text-white' onClick={() => navigate("/secured/add")}>Add New Venue</button>
          </div>
          <div className='shadow-md rounded-lg hidden md:block'>
            <table className='w-full'>
              <thead className='bg-indigo-100 border-b-2 border-indigo-300'>
                <tr >
                  <th className=' p-5 text-sm  font-semibold tracking-wide text-left'>Venue/Event Name</th>
                  <th className=' w-48 p-5 text-sm font-semibold  tracking-wide text-left '>Current Capacity</th>
                  <th className=' w-32 p-5 text-sm font-semibold tracking-wide text-left '>Visit Count</th>
                  <th className=' w-32 p-5 text-sm font-semibold tracking-wide text-left '>Created At</th>
                  <th className=' w-32 p-5 text-sm font-semibold tracking-wide text-left '>Action</th>
                </tr>
              </thead>
              <tbody className=' divide-y divide-indigo-300'>
                {data.map((venue, index) =>(

                  <tr key={index} className='bg-indigo-50'>
                  <td className=' p-5 text-sm text-gray-800 '>{venue.venueName}</td>
                  <td className=' p-5 text-sm text-gray-800 '><span className='p-1.5 text-md font-bold tracking-wide text-purple-900  '>{venue.venueCapacity-venue.visitLogsCount}</span></td><td className=' p-5 text-sm text-gray-800 '><span className='p-1.5 text-md font-bold tracking-wide text-purple-900  '>{venue.visitLogsCount}</span></td>
                  <td className=' p-5 text-sm text-gray-800 '>{humanisedDateTime(venue.createdAt)}</td>
                  <td  className=' p-5 text-sm font-bold text-blue-800' 
                  >
                    <p className="hover:underline cursor-pointer" onClick={()=> navigate(`/secured/${venue.id}`)}>View More</p>
                   <p className="hover:underline cursor-pointer" onClick={() => deleteVenue(venue.id)}>Delete</p></td>

                </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='grid grid-cols-1 gap-4 md:hidden'>
            {data.map((venue, index) =>(
              <div key={index} className='bg-indigo-50 p-2 space-y-1 rounded-lg  shadow-md'>
                <div className='flex gap-2 justify-between space-x-4' >
                  <div>
                    <div className='flex items-center space-x-3 text-sm'>
                      <div className='p-3 text-sm text-gray-800 '>{humanisedDateTime(venue.createdAt)}
                      </div>
                    </div>
                    <div className='py-1 px-3 text-lg capitalize font-semibold text-gray-800 '>{venue.venueName}
                    </div>
                    <div className=' flex flex-col px-3 text-md font-medium tracking-wide text-purple-900'>
                      <span className="pr-4">
                      Visit Total Count: {venue.visitLogsCount}
                      </span>
                      <span className="text-sm font-light">
                      Venue Remaining Capacity:  {venue.venueCapacity-venue.visitLogsCount}
                      </span>
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                      <button onClick={()=> navigate(`/secured/${venue.id}`)} className=' text-white bg-indigo-600 py-4 px-3 rounded-lg hover:bg-indigo-800' >View More</button>
                  </div>
              </div> 
            </div>
                ))}
               
          </div>
          
        </div>
      </main>
    </div>
    </>
  )
}

export default Dashboard