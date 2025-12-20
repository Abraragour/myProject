import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CartContext } from '../../Context/CartContext';

export default function Address() {
let {onlinePayment,getLoggedUserCart}=useContext(CartContext)
const [CartId, setCartId] = useState(null);

async function getCart()
   {
     let response= await getLoggedUserCart()

       setCartId(response?.data?.cartId)
   }


async function handleAddressSubmit(values) {
  try {
    const res = await onlinePayment(
      CartId,
      'http://localhost:5173',
      values
    );

    window.location.href = res.data.session.url;

  } catch (error) {
    console.error("Payment Error:", error.response?.data || error);
  }
}


  let formik=useFormik({
    initialValues:{
      details: '',
      phone:'',
      city:''
    },onSubmit:handleAddressSubmit
    ,validationSchema: yup.object({
      details: yup.string().required('details is required').min(10, 'details must be at least 10 characters'),
      phone: yup
        .string()
        .required('phone is required')
        .matches(
          /^(011|010|015)\d{8}$/,
          'phone must start with 011,010,015 and be 11 digits'
        ),
      city: yup.string().required('city is required'),
    })

  })


    const [counter, setCounter] = useState(0);
    useEffect(()=>{getCart()},[])
  return (
    <>
<div className="min-h-[70vh] flex items-center justify-center">
  <div className="w-full max-w-md py-10">
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Submit Your Details</h2>

      {/* Details */}
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          id="details"
          name="details"
          rows="3"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer resize-none"
          placeholder=" "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
        ></textarea>
        <label
          htmlFor="details"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600 peer-focus:dark:text-green-500"
        >
          Details
        </label>
        {formik.touched.details && formik.errors.details && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.details}
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="phone"
          name="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        <label
          htmlFor="phone"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600 peer-focus:dark:text-green-500"
        >
          Phone
        </label>
        {formik.touched.phone && formik.errors.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
          </div>
        )}
      </div>

      {/* City */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="city"
          name="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        <label
          htmlFor="city"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600 peer-focus:dark:text-green-500"
        >
          City
        </label>
        {formik.touched.city && formik.errors.city && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.city}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Submit
      </button>
    </form>
  </div>
</div>


    </>
  )
}
