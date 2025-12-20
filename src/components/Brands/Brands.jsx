import React, { useState, useEffect } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { ClimbingBoxLoader } from 'react-spinners'

export default function Brands() {
  const [Brands, setBrands] = useState([])
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    getBrands()
  }, [])

  function getBrands() {
    setLoading(true)

    axios
      .get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => {
        setBrands(response.data.data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <>
      {Loading ? (
        <div className="py-8 flex justify-center w-full">
          <ClimbingBoxLoader color="green" />
        </div>
      ) : (
        <div className="row">
          {Brands.map((brand) => (
            <div
              key={brand._id}
              className="w-1/4 flex flex-col items-center shadow-md h-full cursor-pointer py-5"
            >
              <img src={brand.image} alt={brand.name} />
              <h2>{brand.name}</h2>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
