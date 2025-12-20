import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import React, {  useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';



export default function Login() {
  let {setuserLogin}=useContext(UserContext)

const [apiError,setapiError]=useState('');


const [isLoading,setIsLoading]=useState(false);

  let navigate =useNavigate();

function handleLogin(formValues){  {/* el parameter da shayel el obj bel values elly hattba3at lel DB */}
setIsLoading(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formValues)
 .then((apiResponse)=>{
  if(apiResponse.data.message==='success')
    {
      setuserLogin(apiResponse.data.token)
      localStorage.setItem('userToken',apiResponse.data.token)
      navigate('/')

    }
  setIsLoading(false)
  console.log(apiResponse)}) 
.catch ((apiResponse)=>{
  setIsLoading(false)
  setapiError(apiResponse.response.data.message)

})  
  }
                              
  let validationSchema=Yup.object().shape({
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(/^[A-Z][a-z]{5,10}$/,'Password Must start with UpperCase').required('password is required'),
  
  }) 

let formik=useFormik({
  initialValues:{
    email:'',
    password:'',
  },validationSchema,
  onSubmit:handleLogin
})



  return (
    <>


<div className="py-6 max-w-xl mx-auto">

{apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div>:null}
  
  <h2 className='text-3xl font-bold text-green-700  mb-4'>Login Now</h2>
<form onSubmit={formik.handleSubmit}>{/* event onSubmit byshta3'al lmma el form yt3ammalha submit + handleSubmit btmna3 el refresh w btnady 3la el function handle register elly ana 3amlaha w bteb3at lelfunction de params shayel el obj belvalues (formik da) */}
  
  


{/* hagarrab hena */}
  <div className="relative z-0 w-full mb-5 group">
      <input id='email'  onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-leftt peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address: </label>
  </div>
  {formik.errors.email&&formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div>:null}
  



  <div className="relative z-0 w-full mb-5 group">
      <input id='password'  onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password: </label>
  </div>
  {formik.errors.password&&formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>:null}
  
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <button
    type="submit"
    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-center"
  >
    {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Login'}
  </button>

  <p className="text-sm sm:text-base">
    Didn't have an account yet?{' '}
    <span className="font-semibold text-green-700 hover:underline">
      <Link to={'/register'}>Register Now</Link>
    </span>
  </p>

  <span className="text-sm font-semibold text-green-700 hover:underline">
    <Link to={'/forgetPassword'}>Forget Password</Link>
  </span>
</div>

 
  

</form>


</div>
    </>
  )
}

