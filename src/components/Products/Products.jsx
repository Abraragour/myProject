import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import {ClimbingBoxLoader} from 'react-spinners';

export default function Products() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
  
let {data,isError,error,isFetching,isLoading}=useProducts()
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
  return (
    <>
    <div className="row">
       {data?.data?.data.map((product)=>
  <div className="w-1/6 px-4 box-border" key={product.id}>
    <div className="product py-4">
      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
      <img className="w-full" src={product.imageCover} alt={product.title}/>
      <span className='font-light mt-2 text-green-600   block'>{product.category.name}</span>
      <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
      <div className='flex justify-between items-center'>
             <span>{product.price} EGP </span>
             <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i>  </span>

      </div>
      </Link>
            <button className='btn'> add to cart</button>

     </div>
  </div>
)}

      </div>
    </>
  )
}
