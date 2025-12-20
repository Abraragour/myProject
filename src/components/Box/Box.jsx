import React, { useState } from 'react'
import { useEffect } from 'react';
import Style from './Box.module.css'

export default function Box() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
  return (
    <>
      <h2>Box</h2>
    </>
  )
}
