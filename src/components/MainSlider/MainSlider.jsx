import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './MainSlider.module.css'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'

import scrollimage1 from '../../assets/images/grocery-banner-2.jpeg'
import scrollimage2 from '../../assets/images/slider-image-2.jpeg'

import SliderModule from "react-slick";
const Slider = SliderModule.default;




export default function MainSlider() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
    var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow:1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  }
  return (
    <>
    <div className="row">
      <div className="w-3/4">      
          <Slider {...settings} >
      <img   src={slider1} className='w-full h-[400px]'  />
      <img   src={scrollimage1} className='w-full h-[400px]'  />
      <img   src={scrollimage2} className='w-full h-[400px]'  />
            
          </Slider>



      </div>
      <div className="w-1/4">
            <img  src={slider2} className='w-full h-[200px]'  />
            <img  src={slider3} className='w-full h-[200px]'  />

      
      </div>
    </div>


    </>
  )
}
