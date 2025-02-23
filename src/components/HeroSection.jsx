import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/asset';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setSearchTriggered } = useContext(AppContext);

  const today = new Date();
  const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));
  const formattedToday = new Date().toISOString().split('T')[0];
  const formattedNextMonth = oneMonthLater.toISOString().split('T')[0];

  const [formState, setFormState] = useState({
    fromCity: formData.fromCity || '',
    toCity: formData.toCity || '',
    departureDate: formData.departureDate || '',
    guests: formData.guests || 1,
  });

  useEffect(() => {
    setFormState(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'guests') {
      const guestsValue = value.trim();
      if (guestsValue === '' || (guestsValue >= 1 && guestsValue <= 10)) {
        setFormState({
          ...formState,
          [name]: guestsValue === '' ? '' : parseInt(guestsValue),
        });
      }
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guests = formState.guests;
    const validatedGuests = guests === '' || guests < 1 || guests > 10 ? 1 : guests;
    setFormData({ ...formState, guests: validatedGuests });
    setSearchTriggered(true);
    navigate('/TourPackages');
  };

  return (
    <section className="relative w-full rounded-xl overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={assets.singapore.singapore4}
          alt="Beautiful destination"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[600px] p-6">
        <div className="p-8 max-w-4xl w-full bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30">
          <form onSubmit={handleSubmit} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* From City */}
            <div className="relative">
              <label className="block text-white text-sm font-semibold mb-2">From City</label>
              <div className="flex items-center bg-white/20 p-3 rounded-lg">
                <FaPlane className="text-white mr-2" />
                <input
                  type="text"
                  name="fromCity"
                  value={formState.fromCity}
                  onChange={handleChange}
                  placeholder="Add destination"
                  className="w-full bg-transparent text-white focus:outline-none placeholder-gray-200"
                />
              </div>
            </div>

            {/* To City / Country */}
            <div className="relative">
              <label className="block text-white text-sm font-semibold mb-2">To City / Country</label>
              <div className="flex items-center bg-white/20 p-3 rounded-lg">
                <FaPlane className="text-white mr-2" />
                <input
                  type="text"
                  name="toCity"
                  value={formState.toCity}
                  onChange={handleChange}
                  placeholder="Add destination"
                  className="w-full bg-transparent text-white focus:outline-none placeholder-gray-200"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="relative">
              <label className="block text-white text-sm font-semibold mb-2">Departure Date</label>
              <div className="flex items-center bg-white/20 p-3 rounded-lg">
                <FaCalendarAlt className="text-white mr-2" />
                <input
                  type="date"
                  name="departureDate"
                  min={formattedToday}
                  max={formattedNextMonth}
                  value={formState.departureDate}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Rooms & Guests */}
            <div className="relative">
              <label className="block text-white text-sm font-semibold mb-2">Rooms & Guests</label>
              <div className="flex items-center bg-white/20 p-3 rounded-lg">
                <FaUserFriends className="text-white mr-2" />
                <input
                  type="text"
                  name="guests"
                  value={formState.guests}
                  onChange={handleChange}
                  placeholder="Add guests"
                  className="w-full bg-transparent text-white focus:outline-none placeholder-gray-200"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
