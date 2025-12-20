import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Cart() {
   
 let { clearCart, getLoggedUserCart, headers ,updateCartItemCount,deleteProductItem} = useContext(CartContext);
 let [cartDetails,setCartDetails]=useState(null)
 let [UPdateCartCOUNT,setUPdateCartCOUNT]=useState(null)

    useEffect(()=>{
     getCartItems ()
    },[])
let { data, isError, error, isFetching, isLoading } = useQuery({
  queryKey: ['cart'],
  queryFn: getCartItems,

});

    
    // console.log(data?.data?.data)
    if(isLoading){
  return <div className='py-8 flex justify-center w-full  '>
    <ClimbingBoxLoader color='green'/>
  </div>
}

if(isError){
  return <div className='py-8 flex justify-center w-full  '>
    <h3>{error.message}</h3>
  </div>
}

 async function getCartItems(){

     let response=await getLoggedUserCart()

      setCartDetails(response?.data?.data)
      return response.data?.data
}




 async function updateCartCount(producId,count){

  if (count < 1) return;

     let response=await updateCartItemCount(producId,count)
    setCartDetails(response?.data?.data)

}


 async function deleteProduct(producId){

     let response=await deleteProductItem(producId)
      setCartDetails(response?.data?.data)

}

async function handleClearCart() {
       let response=await clearCart()
  .then((response) => {
    console.log(response.data.message); // رسالة النجاح
    setCartDetails(null); // مسح محتويات الكارت من الواجهة
  });
}

 
  




  return (
  <>
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center my-8">
        <h2 className="text-3xl font-extrabold text-green-600 mb-2">
          Fresh Cart
        </h2>
        {cartDetails?.totalCartPrice > 0 && cartDetails && (
  <span className="px-8 mt-3 py-4 bg-green-100 text-green-700 text-xl font-semibold rounded-2xl shadow-lg">
    Total Cart Price: {cartDetails.totalCartPrice} EGP
  </span>
)}

        {cartDetails?.totalCartPrice === 0 || !cartDetails ? (

<p className="text-center text-gray-500 text-lg mt-6 font-medium">
  Your cart is empty. Add some items to get started!
</p>


          
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-3/4 mx-auto text-sm text-left text-gray-600 border-separate border-spacing-y-4">
              <thead className="text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3 text-center">Qty</th>
                  <th className="px-6 py-3 text-center">Price</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products?.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white shadow-sm rounded-lg"
                  >
                    <td className="px-6 py-4 flex items-center gap-6">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <span className="font-medium text-gray-800">
                        {product.product.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center border rounded-full hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="font-medium">{product.count}</span>
                        <button
                          onClick={() =>
                            updateCartCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center border rounded-full hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">
                      {product.count * product.price} EGP
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteProduct(product.product.id)}
                        className="text-red-500 hover:underline text-sm font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={() => {
                  handleClearCart();
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                Clear Cart
              </button>
              <Link
                to={"/address"}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                Online Payment
              </Link>
              <Link
                to={"/CashPayment"}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                Cash on Delivery
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);

  
}
