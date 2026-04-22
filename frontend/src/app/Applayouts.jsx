import React from 'react'
import Nav from '../features/shared/components/Nav'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'

const Applayouts = () => {
  return (
    <>
       <Nav />
       <Outlet />
       <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  )
}

export default Applayouts