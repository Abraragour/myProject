import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './Notfound.module.css'
import errorimage from '../../assets/images/error.svg'
export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
  return (
    <>
      <div className='flex justify-center items-center min-h-screen '>
            <img src={errorimage}/>

      </div>

    </>
  )
}
