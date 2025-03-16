import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaEnvelope, FaUser, FaComments } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';

const apiUrl = import.meta.env.VITE_API_URL;

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { price, packageName, packageType, packageId } = location.state;
    const { userId } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { setBookingId } = useBooking();

    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        numberOfTravelers: 1,
        specialRequests: '',
        fromDate: '',
        toDate: '',
        address: '',
        mobileNumber: '',
        pincode: '',
        status: "pending"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const bookingDetails = {
            ...bookingData,
            userId,
            packageName,
            packageType,
            packageId,
            price,
        };

        try {
            // Get the auth token from localStorage
            const token = localStorage.getItem('authToken');

            // Add token to request headers
            const response = await axios.post(
                `${apiUrl}/api/book`,
                bookingDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data, "booking")
            if (response.status === 201) {
                toast.success('Booking successful! Redirecting to payment...');
                setBookingData({
                    name: '',
                    email: '',
                    numberOfTravelers: 1,
                    specialRequests: '',
                    fromDate: '',
                    toDate: '',
                    address: '',
                    mobileNumber: '',
                    pincode: '',
                    status: ''
                });
                console.log(response.data, 228888)
                console.log(response.data.bookingId)
                setBookingId(response.data.bookingId);
                navigate('/payment', { state: bookingDetails });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
            toast.error(errorMessage);
            console.error('Booking error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Package Info Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                        <h2 className="text-3xl font-bold">{packageName}</h2>
                        <p className="text-blue-100 mt-2">Type: {packageType}</p>
                        <div className="mt-4 inline-block px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <span className="text-2xl font-semibold">${price}</span>
                            <span className="text-sm ml-1">per person</span>
                        </div>
                    </div>
                </motion.div>

                {/* Booking Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={bookingData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your full name"
                                />
                            </motion.div>

                            {/* Email Input */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaEnvelope className="mr-2 text-blue-500" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={bookingData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </motion.div>

                            {/* Mobile Number Input */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={bookingData.mobileNumber}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{10}"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your mobile number"
                                />
                            </motion.div>

                            {/* Address Input */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group md:col-span-2"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={bookingData.address}
                                    onChange={handleChange}
                                    required
                                    rows="2"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your full address"
                                />
                            </motion.div>

                            {/* Pincode Input */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={bookingData.pincode}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{6}"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your pincode"
                                />
                            </motion.div>

                            {/* Date Inputs */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaCalendarAlt className="mr-2 text-blue-500" />
                                    Departure Date
                                </label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={bookingData.fromDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaCalendarAlt className="mr-2 text-blue-500" />
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    name="toDate"
                                    value={bookingData.toDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </motion.div>

                            {/* Number of Travelers */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaUsers className="mr-2 text-blue-500" />
                                    Number of Travelers
                                </label>
                                <input
                                    type="number"
                                    name="numberOfTravelers"
                                    min="1"
                                    value={bookingData.numberOfTravelers}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </motion.div>

                            {/* Special Requests */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group md:col-span-2"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FaComments className="mr-2 text-blue-500" />
                                    Special Requests
                                </label>
                                <textarea
                                    name="specialRequests"
                                    value={bookingData.specialRequests}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Any special requirements or requests..."
                                />
                            </motion.div>
                        </div>

                        {/* Price Summary */}
                        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                            <h4 className="text-lg font-semibold mb-4">Price Summary</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Base Price</span>
                                    <span>₹{price} × {bookingData.numberOfTravelers}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                    <span>Total Amount</span>
                                    <span className="text-blue-600">₹{price * bookingData.numberOfTravelers}</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-4 rounded-xl text-white font-semibold text-lg 
                                ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                } transition-all duration-200 shadow-lg hover:shadow-xl`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mr-2"
                                    />
                                    Processing...
                                </div>
                            ) : (
                                'Confirm Booking'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BookingForm;
