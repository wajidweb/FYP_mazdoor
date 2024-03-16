import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
export default function Layout() {
  return (
    <div>
        <Header />
        <div className='container mx-auto'>
            <Outlet />
        </div>
       <Footer />
    </div>
  )
}
