import React from 'react';
import { assets } from '../assets/asset';

const SubscribeBanner = () => {
  return (
    <div className="container mx-auto px-4 py-8 my-16">

      {/* Adjust max-w class to control the width */}
      <div className="bg-white flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg max-w-6xl mx-auto">

        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={assets.singapore.singapore5}
            alt="Luxury Villa"
            className="w-full h-60 object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-8 bg-gray-100">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
            Get special offers, <br />
            and more from travelworld
          </h2>

          {/* Input & Button */}
          <div className="md:flex w-full justify-center items-center text-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="mt-5 md:mt-0 bg-teal-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-teal-600 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeBanner;
