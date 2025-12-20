import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './CategoriesSlider.module.css'
import axios from 'axios';
import SliderModule from "react-slick";
const Slider = SliderModule.default;

export default function CategoriesSlider() {
    useEffect(()=>{
      getCategories();
    },[])

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow:8,
    slidesToScroll: 3,
    autoplay:true
  }
  const [categories, setCategories] = useState([]);
 function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(({data})=>{setCategories(data.data);
  })
  .catch((error)=>{setCategories(error)})
 }


  return (
    <>
    <div className='py-5  slider-container'>
      <h2 className='py-4  text-gray-800  text-xl font-medium'>Shop popular Categories</h2>
        <Slider {...settings}>
                     {categories?.map((category)=><div  key={category?._id}>
                      <img className='category-img  w-full'  src={category.image} alt={category.name}  />
                      <h3 className='mt-2 font-light' >{category.name}</h3>
                     </div>
                    )}
       </Slider>
    </div>
               


    </>
  )
}
