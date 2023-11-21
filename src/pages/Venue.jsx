import React, { useEffect } from 'react'
import { viewVisitor } from '../../utils/api/visitor'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import QRcodeGenerator from '../components/QRcodeGenerator'

const Venue = () => {
  const {venueId} = useParams()

  const fetchVisitors = async () => {
    try {
      const venueData = await viewVisitor(venueId)
      console.log(venueData)
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
    }
  }
  useEffect(() => {
    fetchVisitors()
  }, [venueId])

  return (
    <>
    <div> 
        <h1>
        Venue {venueId}
        </h1>
        <QRcodeGenerator />
    </div>
    </>
  )
}

export default Venue