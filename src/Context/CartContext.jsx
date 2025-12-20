import { createContext, useEffect, useState } from "react";
import { CounterContext } from './CounterContext';
import axios from "axios";



export let CartContext =createContext()
  let headers={token:localStorage.getItem('userToken')}



export function addProductsToCart(productId)
{
      return   axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId:productId},
        {headers}).then((response)=> response)
    .catch((error)=> error)

}

export function updateCartItemCount(productId,count)
{
      return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count:count},
        {headers}).then((response)=> response)
    .catch((error)=> error)

}

export function deleteProductItem(productId)
{
      return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers}).then((response)=> response)
    .catch((error)=> error)

}

export function onlinePayment(CartId,url,values)
{
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${url}`,
        {shippingAddress:values},{headers})
        

}

export function CashPaymentfn(CartId,values)
{
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
        {shippingAddress:values},{headers})
        

}

export function clearCart() {
  return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
    .then(response => response)
    .catch(error => error);
}

 


async function getLoggedUserCart()
   {

    return await  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((response)=> response  )
    .catch((error)=> error)


   } 






export default function CartContextProvider(props)
{

    return <CartContext.Provider value={{   CashPaymentfn,clearCart,  onlinePayment,  getLoggedUserCart,headers,addProductsToCart,updateCartItemCount,deleteProductItem}}>

     {props.children}

    </CartContext.Provider>
}