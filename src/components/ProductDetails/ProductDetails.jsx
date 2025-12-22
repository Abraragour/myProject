import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SliderModule from "react-slick";
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';

import toast from 'react-hot-toast';

const Slider = SliderModule.default;

export default function ProductDetails() {
  let {id,category}= useParams();
    let {addProductsToCart}=useContext(CartContext);
    const [btnLoading, setBtnLoading] = useState(false);
const [btn1Loading, setBtn1Loading] = useState(false);

  
    const [productDetails, setproductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
    const [CurrentProductId, setCurrentProductId] = useState(0);
  

 var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

async function addProduct(productId) {
  setCurrentProductId(productId);
  setBtnLoading(true);

  try {
    let response = await addProductsToCart(productId);

    if (response.data.status === "success") {
      toast.success(response.data.message, {
        duration: 1000,
        position: "bottom-left",
      });
    }
  } catch (error) {
    toast.error("Something went wrong", {
      duration: 1000,
      position: "bottom-left",
    });
  } finally {
    setBtnLoading(false);
  }
}

  


    useEffect(()=>{
      getProductDetails(id)
      getRelatedProducts(category)
    },[id,category]);


    function getProductDetails(id)
    {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      
      .then(({data})=>{setproductDetails(data.data)})
      .catch(()=>{

      })
    }


      function getRelatedProducts(category)
    {
      setLoading(true);
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      
      .then(({data})=>{
      let allProducts=data.data;
        let related= allProducts.filter((product)=>product.category.name==category )
        setRelatedProducts(related)
        setLoading(false);
      
      })
      .catch(()=>{
        setLoading(false);

      })
    }
 return (
  <>
    {Loading ? (
      <div className="py-16 flex justify-center items-center w-full">
        <ClimbingBoxLoader color="green" />
      </div>
    ) : (
      <>
        <div className="row">
          <div className="w-1/4 box-border">
            <Slider {...settings} className="relative z-10">
              {productDetails?.images?.map((src, index) => (
                <img
                  key={index}
                  className="w-full"
                  src={src}
                  alt={productDetails?.title}
                />
              ))}
            </Slider>
          </div>

          <div className="w-3/4 p-6">
            <h1 className="text-lg font-normal text-gray-950">
              {productDetails?.title}
            </h1>

            <p className="text-gray-600 mt-4 font-light text-base">
              {productDetails?.description}
            </p>

            <div className="flex my-4 justify-between items-center">
              <span>{productDetails?.price} EGP</span>
              <span>
                {productDetails?.ratingsAverage}
                <i className="fas fa-star text-yellow-400"></i>
              </span>
            </div>

<button
  onClick={() => addProduct(productDetails.id)}
  className="btn"
  disabled={btnLoading && CurrentProductId === productDetails.id}
>
  {btnLoading && CurrentProductId === productDetails.id ? (
    <i className="fas fa-spinner fa-spin"></i>
  ) : (
    "Add To Cart"
  )}
</button>
          </div>
        </div>

        <div className="row">
          {relatedProducts?.map((product) => (
            <div key={product.id} className="w-1/6 px-4 box-border">
              <div className="product py-4">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    className="w-full"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="font-light mt-2 text-green-600 block">
                    {product.category.name}
                  </span>
                  <h3 className="text-lg font-normal text-gray-800 mb-4">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </Link>
                    <button
            onClick={() => addProduct(product.id)}
            className="btn"
            disabled={btnLoading && CurrentProductId === product.id}
          >
            {btnLoading && CurrentProductId === product.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>


              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </>
);

}
