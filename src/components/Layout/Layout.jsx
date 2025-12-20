import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';

export default function Layout() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
  return (
    <>
    <Navbar/>
    
    <div className="container  py-14 px-4 mx-auto my-6">
    <Outlet></Outlet>

    </div>
    <Footer/>
    </>
  )
}
