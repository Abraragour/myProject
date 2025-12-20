import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './Categories.module.css'
import { ClimbingBoxLoader } from 'react-spinners';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Categories() {
    const [categories, setcategories] = useState(0);
    useEffect(()=>{},[])

    let {data,isError,error,isFetching,isLoading}=useQuery(
      {
        queryKey:['categories'],
        queryFn:getCategories
      }
    )
    // console.log(data?.data?.data)
    if(isLoading){
  return <div className='py-8 flex justify-center w-full  '>
    <ClimbingBoxLoader color='green'/>
  </div>
}

if(isError){
  return <div className='py-8 flex justify-center w-full  '>
    <h3>{error}</h3>
  </div>
}
  function getCategories ()
    {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        //  console.log(data?.data?.data)

   }


  return (
   <>
  <div className="flex flex-wrap gap-y-8">
  {data?.data?.data.map((item) => (
    <div key={item._id} className="w-1/3 px-4">

      <div className="rounded-xl overflow-hidden shadow-lg bg-white">

        <div className="h-[300px] bg-white flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="py-4">
          <h2 className="text-center text-xl font-semibold">
            {item.name}
          </h2>
        </div>

      </div>
    </div>
  ))}
</div>


  
</>

  )
}
