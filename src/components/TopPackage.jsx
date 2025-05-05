import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopPackage = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/Auth/users/getTourPackages`)
      .then((result) => setPackages(result.data))
      .catch(err => console.error("Error fetching packages:", err));
  }, []);
  return (
    <>
      <div className='mt-32 text-center'>
        <h2 className={`text-xl lg:text-2xl md:text-2xl font-bold text-gray-800 mb-4`}>TOP PACKAGES</h2>
        <hr className='border-none outline-none w-28 h-0.5 mx-auto bg-gray-500' />
      </div>
      <div className="container mx-auto px-4 mt-14">
        {/* Conditional Rendering: If topPackages exists and has items, show the grid, otherwise show centered text */}
        {packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {packages.slice(0, 10).map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(`/package-detail/${item._id}`, { state: { price: item.price } }); // Correctly passing the state
                }}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.imageurl ? `${item.imageurl.replace(/\\/g, '/')}` : "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  {/* Title and Location */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">{item.location}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="text-sm text-gray-600 mb-4">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="mr-2">•</span> {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Rating and Price */}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-lg">
                      {item.rating}
                    </span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        {item.currency} {item.price}
                      </p>
                      <p className="text-sm text-gray-500">{item.priceType}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Centered text when no packages are available
          <div className="flex justify-center items-center w-full h-32">
            <p className="text-center w-full text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
              There Is Not Top Package Available Right Now
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TopPackage;
