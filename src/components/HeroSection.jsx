import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/asset';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {

  const navigate = useNavigate();
  // Access AppContext
  const {formData, setFormData ,setSearchTriggered} = useContext(AppContext);

  const today = new Date();
  const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));
  
  const formattedToday = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const formattedNextMonth = oneMonthLater.toISOString().split('T')[0]; 
    

  const [formState, setFormState] = useState({
    fromCity: formData.fromCity || '',
    toCity: formData.toCity || '',
    departureDate: formData.departureDate || '',
    guests: formData.guests || 1,  // Default to 1 guest
  });

  useEffect(() => {
    setFormState(formData);  // Load formData from context on mount
  }, [formData]);

// Handle form input changes
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'guests') {
    const guestsValue = value.trim();

    // Allow guests input to be blank or within 1-10 range while typing
    if (guestsValue === "" || (guestsValue >= 1 && guestsValue <= 10)) {
      setFormState({
        ...formState,
        [name]: guestsValue === "" ? "" : parseInt(guestsValue),
      });
    }
  } else {
    setFormState({
      ...formState,
      [name]: value,
    });
  }
};

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Set guests to 1 if it’s blank or out of the 1-10 range on submission
  const guests = formState.guests;
  const validatedGuests = guests === "" || guests < 1 || guests > 10 ? 1 : guests;

  // Update the context with validated form data
  setFormData({ ...formState, guests: validatedGuests });
  setSearchTriggered(true);
  navigate('/TourPackages');
};

  return (
    <section className="relative w-full rounded-xl overflow-hidden">
      {/* Background Image - Visible only on screens 640px and above */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block ">
        <img
          src={assets.singapore.singapore4}
          alt="Beautiful destination"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Search Form */}
      <div className="relative z-10 flex flex-col items-center justify-end h-auto  sm:h-[450px] lg:h-[550px] ">
        <div className="p-6 max-w-4xl w-full mx-auto">
          <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:grid-rows-1">
            {/* From City */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-white">
                From City
              </label>
              <input
                type="text"
                name="fromCity"
                value={formState.fromCity}
                onChange={handleChange}
                placeholder="Add destination"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* To City / Country */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-white">
                To City / Country
              </label>
              <input
                type="text"
                name="toCity"
                value={formState.toCity}
                onChange={handleChange}
                placeholder="Add destination"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Departure Date */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-white">
                Departure Date
              </label>
              <input
                type="date"
                name="departureDate"
                min={formattedToday} // Minimum date set to today
                max={formattedNextMonth} // Maximum date set to one month from today
                value={formState.departureDate}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Rooms & Guests */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-white">
                Rooms & Guests
              </label>
              <input
                type="text"
                name="guests"
                value={formState.guests}
                onChange={handleChange}
                min="1"
                placeholder="Add guests"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Search Button */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 xl:col-span-1 self-end">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md shadow hover:bg-blue-700 transition-colors"
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
