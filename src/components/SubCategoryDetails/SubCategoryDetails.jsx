import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import Style from './SubCategoryDetails.module.css';

export default function SubCategoryDetails() {
  const { id } = useParams();
  const [subDetails, setSubDetails] = useState(null);

  useEffect(() => {
    getSubCategoryDetails(id);
  }, [id]);

  async function getSubCategoryDetails(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
      );
      setSubDetails(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!subDetails) {
    return (
      <div className={Style.loader}>
        <ClimbingBoxLoader color="green" />
      </div>
    );
  }

  return (
    <div className={Style.page}>
  <div className={Style.card}>
    <div className={Style.details}>
      <h2 className={Style.title}>{subDetails.name}</h2>
    </div>
  </div>
</div>


  );
}
