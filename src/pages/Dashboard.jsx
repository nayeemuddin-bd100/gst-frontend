import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DashMain from '../components/dashboard/DashMain'
import "../styles/dashboard.css"

const Dashboard = () => {
  return (
    <div className='dash-wrapper'>
      <Sidebar />
      <DashMain />
    </div>
  )
}

export default Dashboard