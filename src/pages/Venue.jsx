import React, { useEffect } from 'react'
import { viewVisitor } from '../../utils/api/visitor'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Venue = () => {
  const {venueId} = useParams()

  const fetchVisitors = async () => {
    try {
      const venueData = await viewVisitor(venueId)
      return venueData
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
    <div>Venue {venueId}</div>
    </>
  )
}

export default Venue