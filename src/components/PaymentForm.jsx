import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaCreditCard, FaLock, FaCalendarAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useUser } from '../context/UserContext';
import { useBooking } from '../context/BookingContext';

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { userId, setUserId } = useUser();
    const [userEmail, SetEmail] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const { bookingId } = useBooking();
    const bookingDetails = location.state || {};
    console.log(bookingDetails, 88888)
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await axios.get(`${apiUrl}/Auth/users/userProfile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserId(response.data._id);
                SetEmail(response.data.Email);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (bookingDetails.price) {
            const fetchClientSecret = async () => {
                try {
                    const response = await axios.post(`${apiUrl}/api/payment/create-payment-intent`, {
                        price: bookingDetails.price,
                    });
                    setClientSecret(response.data.clientSecret);
                } catch (error) {
                    console.error("Error fetching client secret:", error);
                }
            };
            fetchClientSecret();
        }

        fetchUserDetails();
    }, [bookingDetails.price, setUserId]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (error) {
                toast.error(error.message);
            } else if (paymentIntent.status === "succeeded") {
                try {
                    await axios.post(`${apiUrl}/api/payment/save-payment`, {
                        userId,
                        userEmail,
                        paymentIntentId: paymentIntent.id,
                        amount: bookingDetails.price,
                        packageName: bookingDetails.packageName,
                        status: paymentIntent.status,
                        paymentMethod: paymentIntent.payment_method_types[0],
                        bookingId,
                    });

                    toast.success("Payment Successful!");
                    navigate("/userbookingstatus");
                } catch (error) {
                    console.error("Error saving payment:", error);
                    toast.error("Payment recorded but there was an error saving details");
                }
            }
        } catch (error) {
            toast.error("Payment failed. Please try again.");
            console.error("Payment error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const cardStyle = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding: '10px 0',
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 px-4 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                {/* Package Summary Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden mb-6 backdrop-blur-lg border border-gray-100"
                >
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 md:px-8 py-6 md:py-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/10 opacity-10"></div>
                        <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{bookingDetails.packageName}</h2>
                        <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base">Complete your booking by making a secure payment</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4">
                                <FaUsers className="text-white mb-2 text-lg md:text-xl" />
                                <p className="text-blue-100 text-sm">Package Type</p>
                                <p className="text-base md:text-xl font-semibold text-white truncate">{bookingDetails.packageType}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4">
                                <FaCalendarAlt className="text-white mb-2 text-lg md:text-xl" />
                                <p className="text-blue-100 text-sm">Number of Travelers</p>
                                <p className="text-base md:text-xl font-semibold text-white">{bookingDetails.numberOfTravelers}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4">
                                <FaCreditCard className="text-white mb-2 text-lg md:text-xl" />
                                <p className="text-blue-100 text-sm">Total Amount</p>
                                <p className="text-lg md:text-2xl font-semibold text-white">₹{bookingDetails.price * bookingDetails.numberOfTravelers}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Payment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-lg border border-gray-100"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Payment Details</h3>
                        <form onSubmit={handlePayment} className="space-y-4 md:space-y-6">
                            <div className="space-y-4 md:space-y-6">
                                <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                                    <CardElement
                                        options={{
                                            ...cardStyle,
                                            style: {
                                                ...cardStyle.style,
                                                base: {
                                                    ...cardStyle.style.base,
                                                    fontSize: window.innerWidth < 768 ? '14px' : '16px',
                                                }
                                            }
                                        }}
                                        className="py-2 md:py-4"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={!stripe || !clientSecret || isProcessing}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full py-3 md:py-4 rounded-xl text-white font-semibold text-sm md:text-lg 
                                    ${(!stripe || !clientSecret || isProcessing)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700'
                                    } transition-all duration-200 shadow-lg hover:shadow-xl`}
                            >
                                {isProcessing ? (
                                    <div className="flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-3 border-white border-t-transparent rounded-full mr-2"
                                        />
                                        <span className="text-sm md:text-base">Processing...</span>
                                    </div>
                                ) : (
                                    `Pay ₹${bookingDetails.price * bookingDetails.numberOfTravelers}`
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Payment Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 h-fit backdrop-blur-lg border border-gray-100"
                    >
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Payment Security</h3>
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-start space-x-3 md:space-x-4">
                                <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                                    <FaShieldAlt className="text-green-600 text-base md:text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">Secure Payment</h4>
                                    <p className="text-xs md:text-sm text-gray-600">Your payment is processed securely with Stripe</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 md:space-x-4">
                                <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                                    <FaLock className="text-blue-600 text-base md:text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">Privacy Protected</h4>
                                    <p className="text-xs md:text-sm text-gray-600">Your data is encrypted and never stored</p>
                                </div>
                            </div>
                            <hr className="my-4 md:my-6" />
                            <div className="text-xs md:text-sm text-gray-600">
                                <p className="mb-2">By proceeding with the payment, you agree to our:</p>
                                <ul className="list-disc list-inside space-y-1 text-gray-500">
                                    <li>Terms of Service</li>
                                    <li>Privacy Policy</li>
                                    <li>Refund Policy</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentPage; 