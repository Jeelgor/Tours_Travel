import React from 'react';
import { assets } from '../assets/asset'
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 md:px-10 sm:px-[4%]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between space-y-6 sm:space-y-0">
          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Safety Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cancellation Options</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Community Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Get in Touch</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Partnerships</a></li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={assets.FaceBook} className='w-6' alt="" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
              <img src={assets.Twitter} className='w-6' alt="" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
              <img src={assets.YouTube} className='w-6' alt="" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-8">
          &copy; Copyright YourCompany 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;