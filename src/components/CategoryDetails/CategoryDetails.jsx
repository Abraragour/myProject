import React, { useState, useEffect } from 'react';
import Style from './CategoryDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

export default function CategoryDetails() {
  const { id } = useParams();

  const [categoryDetails, setCategoryDetails] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    getCategoryDetails(id);
    getSubCategories();
  }, [id]);

  async function getCategoryDetails(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setCategoryDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSubCategories() {
    try {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/subcategories'
      );

      const filtered = data.data.filter(
        (sub) => sub.category === id
      );

      setSubCategories(filtered);
    } catch (error) {
      console.log(error);
    }
  }






  return (
 
  <div className={Style.container}>
    {categoryDetails ? (
      <>
        {/* Category Card */}
        <div className={Style.card}>
          <img
            src={categoryDetails.image}
            alt={categoryDetails.name}
            className={Style.image}
          />

          <div className={Style.overlay}>
            <h2 className={Style.title}>{categoryDetails.name}</h2>
          </div>
        </div>

        {/* Sub Categories */}
        {subCategories && subCategories.length > 0 ? (
          <>
            <p className={Style.subTitle}>Sub Categories</p>

            <div className={Style.subGrid}>
              {subCategories.map((sub) => (
                <Link
                  to={`/SubCategoryDetails/${sub._id}`}
                  key={sub._id}
                  className={Style.subCard}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className={Style.noSub}>No Subcategories Available</p>
        )}
      </>
    ) : (
      <div className={Style.loader}>
        <ClimbingBoxLoader color="green" />
      </div>
    )}
  </div>
);


}
