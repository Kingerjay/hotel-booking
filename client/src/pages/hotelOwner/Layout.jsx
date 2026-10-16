import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../conext/AppContext'
import { useEffect } from 'react'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  useEffect(()=> {
    if(!isOwner) {
      navigate('/')
    }
  }, [isOwner])

  return (
    <div className='flex flex-col h-full'>
        <Navbar />
        <div className='flex h-screen'>
            <Sidebar />
            <div className='flex-1 p-4 pt-10 md:px-10 h-screen'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Layout