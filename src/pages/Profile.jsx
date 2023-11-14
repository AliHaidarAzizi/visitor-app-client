import React from 'react'
import SidebarComponent from '../components/Sidebar'

const Profile = ({userId}) => {
  return (
    <div className='flex'>
      <SidebarComponent />
      <div>
        profile {userId}
      </div>
    </div>
  )
}

export default Profile