import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import Style from './Brands.module.css'; // لو حابة تضيفي أي ستايل إضافي

export default function Brands() {
  const [Brands, setBrands] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBrands();
  }, []);

  function getBrands() {
    setLoading(true);

    axios
      .get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => {
        setBrands(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function openBrandModal(brand) {
    setSelectedBrand(brand);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedBrand(null);
  }

  return (
    <>
      {Loading ? (
        <div className="py-16 flex justify-center items-center w-full">
          <ClimbingBoxLoader color="green" />
        </div>
      ) : (
        <div className="grid grid-cols-1  cursor-pointer sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => openBrandModal(brand)}
              className="flex flex-col items-center shadow-md h-full cursor-pointer py-5 transition transform hover:scale-105 hover:shadow-xl rounded-md bg-white"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-24 mb-2 object-contain"
              />
              <h2 className="text-lg font-medium">{brand.name}</h2>
            </div>
          ))}
        </div>
      )}
{/* Modal */}
{showModal && selectedBrand && (
  <div
    className="fixed inset-0 flex justify-center items-center z-50 bg-black/20 backdrop-blur-[2px] cursor-pointer"
    onClick={closeModal} // الضغط على الخلفية يقفل المودال
  >
    <div
      className="relative bg-white rounded-lg shadow-lg p-6 w-1/3 pointer-events-auto cursor-auto"
      onClick={(e) => e.stopPropagation()} // الضغط جوه المودال ما يقفلش
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{selectedBrand.name}</h2>
        <button
          onClick={closeModal}
          className="text-gray-700 text-3xl font-bold cursor-pointer hover:text-red-500 transition"
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div className="flex justify-center cursor-pointer"> "
        <img
          src={selectedBrand.image}
          alt={selectedBrand.name}
          className="max-h-72 object-contain"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}




    </>
  );
}
