import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Hook to programmatically navigate
    const { price, packageName, packageType, packageId } = location.state;

    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        travelDate: '',
        numberOfTravelers: 1,
        specialRequests: '',
        fromDate: '',  // New From Date
        toDate: '',    // New To Date
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare booking data for initial submission
        const bookingDetails = {
            ...bookingData,
            packageName,  // Include the package name if needed
            packageType,  // Include the package type if needed
            packageId,
            price,        // Include price if you need it for payment
        };

        // Sending booking data to backend with Axios
        try {
            const response = await axios.post(`${apiUrl}/api/book`, bookingDetails);

            if (response.status === 200) {
                toast.success('Booking successful! Redirecting to payment...');

                // Clear the form after successful booking
                setBookingData({
                    name: '',
                    email: '',
                    travelDate: '',
                    numberOfTravelers: 1,
                    specialRequests: '',
                    fromDate: '',
                    toDate: '',
                });

                // Redirect to payment page, passing the booking details as state
                navigate('/payment', { state: bookingDetails });
            } else {
                toast.error('Booking failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            console.error('Booking error:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

            {/* Package Info Section */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-1">Selected Package:</h3>
                <p className="text-lg text-gray-800">{packageName}</p>
                <p className="text-sm text-gray-500">Type: <span className="font-medium">{packageType}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={bookingData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">From Date (Departure):</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={bookingData.fromDate}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">To Date (Return):</label>
                    <input
                        type="date"
                        name="toDate"
                        value={bookingData.toDate}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Travelers:</label>
                    <input
                        type="number"
                        name="numberOfTravelers"
                        min="1"
                        value={bookingData.numberOfTravelers}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Special Requests:</label>
                    <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
