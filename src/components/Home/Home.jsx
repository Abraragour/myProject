import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './Home.module.css'
import RecentProduct from '../RecentProduct/RecentProduct';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from './../MainSlider/MainSlider';

export default function Home() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProduct/>
    </>
  )
}
