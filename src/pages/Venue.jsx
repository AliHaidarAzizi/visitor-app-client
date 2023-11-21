import React, { useEffect } from 'react'
import { viewVisitor } from '../../utils/api/visitor'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import QRcodeGenerator from '../components/QRcodeGenerator'
import { useState } from 'react'
import { DateTime } from 'luxon'
import { apiViewVenue } from '../../utils/api/venue'


const Venue = () => {
  const {venueId} = useParams()
  const [data, setData] = useState([])

  const fetchVisitors = async () => {
    try {
      const venueData = await viewVisitor(venueId)
      setData(venueData.data.data)
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
    }
  }
  const fetchVenue = async () => {
    await apiViewVenue(venueId)

  }

  const humanisedDateTime = (dateTime) => {
    // 1 step - convert string to dateTime data type
    const newDateTime = DateTime.fromISO(dateTime)
    // 2. - Format to the designated format
    return newDateTime.toLocaleString(DateTime.DATETIME_MED)

  }

  useEffect(() => {
    fetchVisitors()
  }, [venueId])



  return (
    <>
        <h1>
        Venue {venueId}
        </h1>
        <QRcodeGenerator />
        <main className='m-4 mr-8 w-full lg:w-5/6'>
        <div >
          
          <h2 className=' capitalize text-2xl font-bold '></h2>
          <div className='grid grid-cols-3 pb-3'>
              <button className=' col-start-3 bg-indigo-300 hover:bg-indigo-500 rounded-md py-1 text-white'>Add New Visitor</button>
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
          <div className='grid grid-cols-1 gap-4 md:hidden'>
            {data.map((visitor, index) =>(
              <div 
              key={index} 
              className='bg-indigo-50 p-2 space-y-1 rounded-lg shadow'>
                <div className='flex gap-2 justify-between space-x-4' >
                  <div>
                    <div className='flex items-center space-x-3 text-sm'>
                      <div className='p-3 text-sm text-gray-800 '>
                        {humanisedDateTime(visitor.createdAt)}
                      </div>
                      <div className='p-3 text-sm text-gray-800 '>
                      {visitor.visitorEmail}
                      </div>
                      <div className='p-3 text-sm text-gray-800 '>
                      {visitor.visitorContactNo}
                      </div>
                    </div>
                    <div className='p-3 text-lg capitalize font-semibold text-gray-800 '>
                      {visitor.visitorName}
                    </div>
                    <div className='p-3 text-md font-medium tracking-wide text-purple-900'>
                      {visitor.visitorReason}
                      
                    </div>
                  </div>
              </div> 
            </div>
                 ))} 
               
          </div>
          
        </div>
      </main>
    
    </>
  )
}

export default Venue