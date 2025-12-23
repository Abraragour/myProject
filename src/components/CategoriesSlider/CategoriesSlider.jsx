import React, { useState, useEffect } from 'react';
import Style from './CategoriesSlider.module.css';
import axios from 'axios';
import SliderModule from "react-slick";
import { ClimbingBoxLoader } from 'react-spinners';

const Slider = SliderModule.default;

export default function CategoriesSlider() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
  };

  return (
    <>
      <div className="py-5 slider-container">
        <h2 className="py-4 text-gray-800 text-xl font-medium">
          Shop popular Categories
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <ClimbingBoxLoader color="#0aad0a" />
          </div>
        ) : (
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id}>
                <img
                  className="category-img w-full"
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="mt-2 font-light">{category.name}</h3>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
