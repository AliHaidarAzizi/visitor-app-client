import React, { useEffect } from 'react'
import { viewVisitor } from '../../utils/api/visitor'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import QRcodeGenerator from '../components/QRcodeGenerator'
import { useState } from 'react'
import { DateTime } from 'luxon'
import { apiViewVenue } from '../../utils/api/venue'


const Venue = () => {
  const {venueId} = useParams()
  const [data, setData] = useState([])
  const [logCount, setLogCount] = useState([])
  const navigate = useNavigate()

  const fetchVisitors = async () => {
    try {
      const venueData = await viewVisitor(venueId)
      setLogCount(venueData.data.data.length)
      setData(venueData.data.data)
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
    }
  }
 
  const humanisedDateTime = (dateTime) => {
    // 1 step - convert string to dateTime data type
    const newDateTime = DateTime.fromISO(dateTime)
    // 2. - Format to the designated format
    return newDateTime.toLocaleString(DateTime.DATETIME_MED)

  }

  useEffect(() => {
    fetchVisitors()
    const intervalId = setInterval(fetchVisitors, 10000)
    return () => clearInterval(intervalId)
  }, [])



  return (
    <>
      <div className='mt-3'>

        <QRcodeGenerator />
        <main className='md:m-4 md:mr-2 pr-6 w-full lg:w-5/6'>
        <div className='m-1 p-1' >
             
          <div className='grid grid-cols-2 md:grid-cols-3 py-3 mx-2'>
            
              <h1 className=' col-start-1 p-2 text-xl font-bold'>
                Visitor Logs 
              </h1>
              <h3 className=' col-start-1 md:col-start-2 p-2 text-md font-normal'>
               Total visits:  {logCount} 
              </h3>
              <button className=' py-2 col-start-2 md:col-start-3 bg-indigo-300 hover:bg-indigo-500 rounded-md text-white' onClick={() => navigate(`/add/${venueId}`) } >Add New Visitor</button>
          </div>
          <div className='shadow-md rounded-lg hidden md:block'>
            <table className='w-full'>
              <thead className='bg-indigo-100 border-b-2 border-indigo-300'>
                <tr >
                  <th className='w-56 p-5 text-sm  font-semibold tracking-wide text-left'>Visitor Name</th>
                  <th className=' p-5 text-sm font-semibold tracking-wide text-left '>Reason of Visit</th>
                  <th className=' w-32 p-5 text-sm font-semibold  tracking-wide text-left '>Email</th>
                  <th className=' w-64 p-5 text-sm font-semibold tracking-wide text-left '>Visit Date</th>
                  <th className=' w-32 p-5 text-sm font-semibold tracking-wide text-left '>Contact No.</th>
                </tr>
              </thead>
              <tbody className=' divide-y divide-indigo-300'>
                {data.map((visitor, index) =>(

                  <tr 
                  key={index} 
                  className='bg-indigo-50'>
                  <td className=' p-5 text-sm text-gray-800 '>
                    {visitor.visitorName}
                    </td>
                  <td className=' p-5 text-sm text-gray-800 '><span className='p-1.5 text-md font-bold tracking-wide text-purple-900  '>
                    {visitor.visitorReason}
                    </span></td>
                  <td className=' p-5 text-sm text-gray-800 '>
                    {visitor.visitorEmail}
                    </td>
                  <td className=' p-5 text-sm text-gray-800 '>
                    {humanisedDateTime(visitor.createdAt)}
                    </td>
                    <td className=' p-5 text-sm text-gray-800 '>
                    {visitor.visitorContactNo}
                    </td>
                </tr>
                   ))}
              </tbody>
            </table>
          </div>
          <div className='grid grid-cols-1 gap- md:hidden mx-1'>
            {data.map((visitor, index) =>(
              <div 
              key={index} 
              className='bg-indigo-50 p-2 space-y-1 rounded-lg shadow m-2'>
                <div className='flex flex-col gap-2 justify-between space-x-1' >
                  <div className='flex items-start justify-start '>

                        <div className='p-3 text-md capitalize font-semibold text-gray-800 '>
                          {visitor.visitorName}
                        </div>
                        <div className=' flex p-3 text-md font-medium tracking-wide text-purple-900'>
                          <p className='text-grey-800 pr-2'>
                            Reason: </p>
                           {visitor.visitorReason}
                        </div>
                  </div>
                    <div className='flex items-center justify-start space-x-2 text-sm'>
                      <div className='p-2 text-xs text-gray-800 '>
                        {humanisedDateTime(visitor.createdAt)}
                      </div>
                      <div className='p-2 text-sm text-gray-800 '>
                      {visitor.visitorEmail}
                      </div>
                      <div className='p-2 text-sm text-gray-800 '>
                      {visitor.visitorContactNo}
                      </div>
                      
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

export default Venue