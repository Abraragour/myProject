import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Style from './RecentProduct.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {ClimbingBoxLoader} from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function RecentProduct() {
  const [Loading, setLoading] = useState(false);
  const [CurrentProductId, setCurrentProductId] = useState(0);

  let {addProductsToCart}=useContext(CartContext);

 async function addProduct(productId)
  {
    setCurrentProductId(productId)
    setLoading(true)
    let response= await addProductsToCart(productId);
    
    if(response.data.status==='success')
    {
          setLoading(false)

      toast.success(response?.data?.message,{

        duration:1000,
        position:"bottom-left"

      })
    }
    else{
                  setLoading(false)

            toast.error(response?.data?.message,{
              duration:1000,
            position:"bottom-left"
            }
  
            )
             
    }
  }

function getRecent(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

}

let {data,isError,error,isFetching,isLoading} =useQuery({
  queryKey:['recentProducts'],
  queryFn:getRecent,
  select:(data)=>data.data.data
})



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
       {data.map((product)=>
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
            <button onClick={()=>addProduct(product.id)}  className='btn'> 
              
              {CurrentProductId==product.id&&Loading?<i className='fas fa-spinner fa-spin' ></i>:'add To Cart'}
              </button>

     </div>
  </div>
)}

      </div>
    </>
  )
}
