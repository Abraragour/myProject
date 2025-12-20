import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from './../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
   const [TotalPrice, setTotalPrice] = useState(null);
    useEffect(()=>{getCartItems()},[])

     let {getLoggedUserCart}=   useContext(CartContext)

      async function getCartItems(){

     let response=await getLoggedUserCart()

      setTotalPrice(response?.data?.numOfCartItems)
    }


   let {counter}= useContext(CounterContext)
       let navigate=useNavigate()

  //  console.log(x)
  let {userLogin,setuserLogin}=useContext(UserContext)
  function logout()
  {
    localStorage.removeItem('userToken')
    setuserLogin(null)
    navigate('/login')
  }



  return (
  <>
 
      <nav className=' bg-gray-100 text-center static lg:fixed z-50 top-0 left-0 right-0'>   {/* ha3mel 2 divs wahda logo w ul right w wahda left */}
        <div className="container justify-between mx-auto px-5 py-2 flex flex-col  lg:flex-row">
              <div className='flex flex-col lg:flex-row items-center'>
                
                 <img width={110} src={logo} alt="fersh cart logo" />

                <ul className=' flex flex-col lg:flex-row'>
                  {userLogin!==null?<>
                  < li className='py-2'><NavLink className='  mx-2 text-lg text-slate-900 font-light' to={''}>Home</NavLink> </li>
                  < li className='py-2'><NavLink className='mx-2 text-lg text-slate-900 font-light' to={'cart'}>Cart</NavLink> </li>
                  < li className='py-2'><NavLink className='mx-2 text-lg text-slate-900 font-light' to={'products'}>Products</NavLink> </li>
                  < li className='py-2'><NavLink className='mx-2 text-lg text-slate-900 font-light' to={'brands'}>Brands</NavLink> </li>
                 < li className='py-2'><NavLink className='mx-2 text-lg text-slate-900 font-light' to={'categories'}>Categories</NavLink> </li>
                  
                  

                  </>:null}
                  
                </ul>

              </div>
            <div> 
              </div>
              <ul className=' flex flex-col lg:flex-row items-center '>
                {userLogin===null?<>
                
                < li className='py-2'><NavLink className=' mx-2 text-lg text-slate-900 font-light' to={'login'}>Login</NavLink> </li>
                  < li className='py-2'><NavLink className='mx-2 text-lg text-slate-900 font-light' to={'register'}>Register</NavLink> </li>
                
                </>: < li onClick={logout} className='py-2'><span className='mx-2 text-lg cursor-pointer text-slate-900 font-light' >Logout</span> </li>

                
                }
     
                  <li className='flex items-center cursor-pointer'>
                      <i className='fab mx-2 fa-facebook'></i>
                      <i className='fab mx-2 fa-twitter'></i>
                      <i className='fab mx-2 fa-youtube'></i>
                      <i className='fab mx-2 fa-tiktok'></i>
                        <div className="relative">
        <Link to={'/Cart'}><i className="fa-solid  fa-cart-shopping cursor-pointer   text-lg"></i></Link>
        {<span className="absolute start-3 -top-2 min-w-[15px] text-sm text-center rounded-full text-white bg-green-600">{TotalPrice}</span>}
        </div>
                      
                  </li>
              </ul>
            </div> 

      </nav>

  </>
  )
}
