import React, { useContext, useEffect, useState } from 'react'
import Style from './AllOrders.module.css'
import { CartContext } from '../../Context/CartContext'
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import {ClimbingBoxLoader} from 'react-spinners';

export default function AllOrders() {
  const { getLoggedUserCart } = useContext(CartContext)

  const [cartId, setCartId] = useState(null)
  const [order, setOrders] = useState(null)
    const [isLoading, setisLoadings] = useState(null)

let token= localStorage.getItem('userToken')
  
useEffect(() => {
  if (token) {
    getUserOrder()
  }
}, [])

  async function getUserOrder() {
    setisLoadings(true)
   const {id} = jwtDecode(token)
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setOrders(data)
    setisLoadings(false)
  }




  return (
    <>
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className='py-8 flex justify-center w-full  '>
              <ClimbingBoxLoader color='green'/>
            </div>
        ) : (
          order?.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md border border-gray-200 my-6 p-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-medium text-gray-700">{order.paymentMethodType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-semibold text-main">{order.totalOrderPrice} EGP</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow transition">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-full h-36 object-contain mb-3" />
                    <h3 className="text-sm font-medium text-gray-800 mb-1">{item.product.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <p className="text-xs text-gray-500 mb-1">Quantity: {item.count}</p>
                    <p className="font-semibold text-main">{item.price} EGP</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}







//   return (
//     <>
//    <div className="container mx-auto px-4">
//   {order?.map((order) => (
//     <div
//       key={order._id}
//       className="bg-white rounded-xl shadow-md border border-gray-200 my-6 p-6"
//     >
//       {/* Order Info */}
//       <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
//         {/* <div>
//           <p className="text-sm text-gray-500">Order ID</p>
//           <p className="font-semibold text-gray-800">#{order._id}</p>
//         </div> */}

//         <div>
//           <p className="text-sm text-gray-500">Payment</p>
//           <p className="font-medium text-gray-700">
//             {order.paymentMethodType}
//           </p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">Status</p>
//           <span
//             className={`px-3 py-1 rounded-full text-sm font-medium
//               ${
//                 order.isDelivered
//                   ? "bg-green-100 text-green-700"
//                   : "bg-yellow-100 text-yellow-700"
//               }`}
//           >
//             {order.isDelivered ? "Delivered" : "Pending"}
//           </span>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">Total</p>
//           <p className="font-semibold text-main">
//             {order.totalOrderPrice} EGP
//           </p>
//         </div>
//       </div>

//       {/* Products */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {order.cartItems.map((item) => (
//           <div
//             key={item._id}
//             className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow transition"
//           >
//             <img
//               src={item.product.imageCover}
//               alt={item.product.title}
//               className="w-full h-36 object-contain mb-3"
//             />

//             <h3 className="text-sm font-medium text-gray-800 mb-1">
//               {item.product.title.split(" ").slice(0, 2).join(" ")}
//             </h3>

//             <p className="text-xs text-gray-500 mb-1">
//               Quantity: {item.count}
//             </p>

//             <p className="font-semibold text-main">
//               {item.price} EGP
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   ))}
// </div>

//     </>
//   )
// }
