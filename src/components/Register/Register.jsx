import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import styles from "./Register.module.css";  // 👈 أهم جزء
import {useFormik} from 'formik';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
let {setUserLogin} =useContext(UserContext)

 let validationSchema =yup.object().shape({
  name:yup.string().min(3,'name min Length is 3').max(10,'name maxLength is 10').required('name is required'),
  email:yup.string().email("email is invalid").required('email is required'),
  phone:yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'phone must be valid egyption number').required('phone is required'),
  password:yup.string().matches(/^[A-Z][a-z]{5,10}$/, 'password must start with upperCase').required('password is required'),
  rePassword:yup.string().oneOf([yup.ref('password')],'password must be same') .required('repassword is required'),
 })


    let navigate=useNavigate()
const [apiError, setapiError] = useState('');
const [isLoading, setisLoading] = useState(false);

     function handleRegister(formValues){

          setisLoading(true);
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues)
      .then( (apiResponse)=>{
          if(apiResponse.data.message==='success')
          {
        navigate('/login')

          }
          localStorage.setItem('userToken',apiResponse.data.token)
        setUserLogin(apiResponse.data.token)
        setisLoading(false)
       })
      .catch((apiResponse)=>{
         setisLoading(false)
        setapiError(apiResponse?.response?.data?.message)
      })
        
  }
 
  let formik=useFormik({
    initialValues:{
      name:'',
      phone: '',
      email:'',
      password:'',
      rePassword:''
    },
    validationSchema,
    onSubmit:handleRegister
  })

    useEffect(()=>{},[])

  return (
    <>
    <div className="py-6 max-w-xl mx-auto">
      {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {apiError}
       </div>:null}

      <h2 className='text-3xl font-bold text-green-700  mb-4'>Register Now</h2>
<form onSubmit={formik.handleSubmit}>{/* event onSubmit byshta3'al lmma el form yt3ammalha submit + handleSubmit btmna3 el refresh w btnady 3la el function handle register elly ana 3amlaha w bteb3at lelfunction de params shayel el obj belvalues (formik da) */}

  
  
  <div className="relative z-0 w-full mb-5 group">
     {/* rabtt kol input bel proprty bta3to fo2 */}
      <input id='name'  onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name:  </label>
  </div>
{formik.errors.name&&formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.name}
</div>:null}

  <div className="relative z-0 w-full mb-5 group">
      <input  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your email:  </label>
  </div>
 {formik.errors.email&&formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div>:null}




 <div className="relative z-0 w-full mb-5 group">
      <input  value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone:  </label>
  </div>

{formik.errors.phone&&formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.phone}
</div>:null}



  <div className="relative z-0 w-full mb-5 group">
      <input  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password:  </label>
  </div>

  {formik.errors.password&&formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>:null}


   <div className="relative z-0 w-full mb-5 group">
      <input  value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword:  </label>
  </div>
{formik.errors.rePassword&&formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div>:null}


    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Submit'}
      
       </button>

  </form>
    </div>
    </>
  )
}
