import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './ForgetPassword.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
     const [isSubmited, setIsSubmitted] = useState(false);
  const [isVerfied,setIsverfied] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false);
const [codeLoading, setCodeLoading] = useState(false);
const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(()=>{},[])
     let navigate=useNavigate();

//  -------------- Email Formik -------------

    let formik = useFormik({
      initialValues:{email:''},
      onSubmit:handleEmail,
      validationSchema: yup.object({
      email: yup.string().email().required('email is required')})

    })
 
function handleEmail(values) {
  setEmailLoading(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
    email: values.email
  })
  .then((response) => {
    toast.success(response.data.message);
    setIsSubmitted(true)
      setEmailLoading(false)

  })
  .catch((error) => {
    toast.error(error.response?.data?.message || 'Something went wrong');
            setIsSubmitted(false);
      setEmailLoading(false)

  });
}





// ------- Code Formik ------------
const codeFormik = useFormik({
  initialValues: {
    code: '',
  },
  validationSchema: yup.object({
    code: yup.string().required('code is required')
  }),
  onSubmit: (values) => {
    setCodeLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
      resetCode: values.code
    })
    .then((response) => {
      toast.success(`${response.data.status}`);
      setIsverfied(true);
      setCodeLoading(false)
    })
    .catch((error) => {
      console.log(error.response?.data?.message);
      toast.error(`${error.response?.data?.message || 'Something went wrong'}`);
      setIsverfied(false);
      setCodeLoading(false)
    });
  }
});



// ------------- Change Password Formik ---------------

const formikVerfication = useFormik({
  initialValues: {
    email: '',
    newPassword: ''
  },
  validationSchema: yup.object({
    email: yup.string().email().required('email is required'),
    newPassword: yup.string().required('password is required').min(8, 'password must be at least 8 characters'),
  }),
  onSubmit: (values) => {
  setUpdateLoading(true);
  axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
    email: values.email,
    newPassword: values.newPassword
  })
  .then((response) => {
    toast.success(response.statusText);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  })
  .catch((error) => {
    console.log(error.response?.data?.message);
    toast.error(`${error.response?.data?.message || 'Something went wrong'}`);
  })
  .finally(() => {
    setUpdateLoading(false); 
  });
}

});




  return (
    <>
<div className="py-10 max-w-md mx-auto flex flex-col justify-center">
  <h2 className="text-3xl font-bold text-green-700 mb-6">
    Forget Password
  </h2>

    
       {!isSubmited && (
  <form onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        placeholder=" "
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
        border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
        focus:ring-0 focus:border-green-600 peer"
      />
      <label
        htmlFor="email"
        className="peer-focus:font-medium absolute text-sm text-gray-500 
        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
        peer-focus:text-green-600 peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
        peer-focus:-translate-y-6"
      >
        Enter your email
      </label>
    </div>

    {formik.errors.email && formik.touched.email && (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
        {formik.errors.email}
      </div>
    )}

   <button
  type="submit"
  className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
  disabled={emailLoading}
>
  {emailLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Send Code'}
</button>

  </form>
)}


      {isSubmited && !isVerfied && (
  <form onSubmit={codeFormik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
      <input
        id="code"
        name="code"
        type="text"
        onChange={codeFormik.handleChange}
        onBlur={codeFormik.handleBlur}
        value={codeFormik.values.code}
        placeholder=" "
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
        border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
        focus:ring-0 focus:border-green-600 peer"
      />
      <label
        htmlFor="code"
        className="peer-focus:font-medium absolute text-sm text-gray-500 
        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
        peer-focus:text-green-600 peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
        peer-focus:-translate-y-6"
      >
        Verification Code
      </label>
    </div>

    {codeFormik.errors.code && codeFormik.touched.code && (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
        {codeFormik.errors.code}
      </div>
    )}

    <button
  type="submit"
  className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
  disabled={codeLoading}
>
  {codeLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Verify Code'}
</button>

  </form>
)}


       {isVerfied && (
  <form onSubmit={formikVerfication.handleSubmit}>
    {/* Email */}
    <div className="relative z-0 w-full mb-5 group">
      <input
        id="email"
        name="email"
        type="email"
        onChange={formikVerfication.handleChange}
        onBlur={formikVerfication.handleBlur}
        value={formikVerfication.values.email}
        placeholder=" "
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
        border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
        focus:ring-0 focus:border-green-600 peer"
      />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 
      duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
      peer-focus:text-green-600 peer-placeholder-shown:scale-100 
      peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6">
        Email
      </label>
    </div>

    {/* Password */}
    <div className="relative z-0 w-full mb-5 group">
      <input
        id="newPassword"
        name="newPassword"
        type="password"
        onChange={formikVerfication.handleChange}
        onBlur={formikVerfication.handleBlur}
        value={formikVerfication.values.newPassword}
        placeholder=" "
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
        border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
        focus:ring-0 focus:border-green-600 peer"
      />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 
      duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left 
      peer-focus:text-green-600 peer-placeholder-shown:scale-100 
      peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-6">
        New Password
      </label>
    </div>

   <button
  type="submit"
  className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
  disabled={updateLoading}
>
  {updateLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Update Password'}
</button>

  </form>
)}

      </div>


    </>
  )
}
