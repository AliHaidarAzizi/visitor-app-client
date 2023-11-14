import React from 'react'
import SidebarComponent from '../components/Sidebar'



const Dashboard = ({userId}) => {
  return (
    <>
    <div className='flex'>
      <SidebarComponent />
      <main>

      <h2>
        Dashboard</h2>
        <h4>user Id: {userId}</h4>
      </main>
    </div>
    </>
  )
}

export default Dashboard