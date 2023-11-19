import React, { useEffect, useState } from 'react'
import SidebarComponent from '../components/Sidebar'
import { listAllVenue } from '../../utils/api/venue'
import { toast } from 'react-toastify'
import { viewUser } from '../../utils/api/user'
import { viewVisitor } from '../../utils/api/visitor'
import { useNavigate } from 'react-router-dom'



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
  
  // const fetchVisitors = async () => {
  //   try {
      
  //     const venueData = data.map((venue) => {
  //       return venue.id
  //     });
  //     console.log(venueData)
  //     await viewVisitor(venueData)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
                  <th className=' w-48 p-5 text-sm font-semibold  tracking-wide text-left '>Capacity</th>
                  <th className=' w-32 p-5 text-sm font-semibold tracking-wide text-left '>Created At</th>
                  <th className=' w-32 p-5 text-sm font-semibold tracking-wide text-left '>Action</th>
                </tr>
              </thead>
              <tbody className=' divide-y divide-indigo-300'>
                {data.map((venue, index) =>(

                  <tr key={index} className='bg-indigo-50'>
                  <td className=' p-5 text-sm text-gray-800 '>{venue.venueName}</td>
                  <td className=' p-5 text-sm text-gray-800 '><span className='p-1.5 text-md font-bold tracking-wide text-purple-900  '>{venue.venueCapacity}</span></td>
                  <td className=' p-5 text-sm text-gray-800 '>{venue.createdAt}</td>
                  <td  className=' p-5 text-sm font-bold text-blue-800 hover:underline cursor-pointer' onClick={()=> navigate(`/secured/${venue.id}`)}
                  >View more</td>

                </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='grid grid-cols-1 gap-4 md:hidden'>
            {data.map((venue, index) =>(
              <div key={index} className='bg-indigo-50 p-2 space-y-1 rounded-lg shadow'>
                <div className='flex gap-2 justify-between space-x-4' >
                  <div>
                    <div className='flex items-center space-x-3 text-sm'>
                      <div className='p-3 text-sm text-gray-800 '>{venue.createdAt}
                      </div>
                    </div>
                    <div className='p-3 text-lg capitalize font-semibold text-gray-800 '>{venue.venueName}
                    </div>
                    <div className='p-3 text-md font-medium tracking-wide text-purple-900'>{venue.venueCapacity}
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                      <button onClick={()=> navigate(`/secured/${venue.id}`)} className=' text-white bg-indigo-600 py-4 px-3 rounded-lg' >View More</button>
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