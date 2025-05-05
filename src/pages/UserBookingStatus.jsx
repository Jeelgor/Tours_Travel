import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane, FaCreditCard, FaSpinner, FaCheck, FaTimes, FaPrint } from "react-icons/fa";
import { format } from "date-fns";
import PrintableBill from '../components/PrintableBill';
import { useUser } from '../context/UserContext';
import toast from "react-hot-toast";


const UserBookingStatus = () => {
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("bookings");
    const { userId, setUserId } = useUser();
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("authToken");
                const [bookingsRes, paymentsRes, userRes] = await Promise.all([
                    axios.get(`${apiUrl}/api/bookings`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${apiUrl}/api/payment/getpayment`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${apiUrl}/Auth/users/userProfile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setUserId(userRes.data._id);
                setBookings(bookingsRes.data.data);
                setPayments(paymentsRes.data.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [setUserId]);

    const bookingIds = bookings.map(booking => booking._id);
    const handleCancelBooking = async (bookingId) => {
        // if (!window.confirm("Are you sure you want to cancel this booking?")) {
        //     return;
        // }

        try {
            const response = await axios.post(`${apiUrl}/api/payment/cancel-booking`, {
                bookingId,
            });

            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <FaTimes className="h-10 w-10 text-red-500" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Booking Cancelled
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {response.data.message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), {
                duration: 4000,
                position: 'top-right',
            });

            setBookings(prev => prev.map(booking =>
                booking._id === bookingId ? { ...booking, status: "cancelled" } : booking
            ));
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <FaTimes className="h-10 w-10 text-red-500" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Error
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Failed to cancel booking
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), {
                duration: 4000,
                position: 'top-right',
            });
        }
    };

    const userBookings = bookings.filter(booking => booking.userId === userId);
    const userPayments = payments.filter(payment => payment.userId === userId);
    const aggregatedBookings = userBookings.reduce((acc, booking) => {
        const key = booking.tourId || booking.tourName;
        if (!acc[key]) {
            acc[key] = { ...booking };
        } else {
            acc[key].numberOfTravelers += booking.numberOfTravelers;
        }
        return acc;
    }, {});
    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'success':
            case 'succeeded':
                return <FaCheck className="text-green-500" />;
            case 'pending':
                return <FaSpinner className="text-yellow-500 animate-spin" />;
            case 'failed':
            case 'cancelled':
                return <FaTimes className="text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'success':
            case 'succeeded':
                return 'text-green-500';
            case 'pending':
                return 'text-yellow-500';
            case 'failed':
            case 'cancelled':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const handlePrintBill = (payment) => {
        // Create a temporary div for the bill
        const printWindow = window.open('', '_blank');

        // Add necessary styles
        const styles = `
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .bill-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .bill-details {
                    margin-bottom: 20px;
                }
                .amount {
                    font-size: 24px;
                    color: #2563eb;
                    font-weight: bold;
                }
                .divider {
                    border-top: 1px solid #e5e7eb;
                    margin: 20px 0;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    color: #6b7280;
                    font-size: 14px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #e5e7eb;
                }
            </style>
        `;

        // Create bill content
        const content = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Travel Booking Receipt</title>
                ${styles}
            </head>
            <body>
                <div class="bill-header">
                    <h1>Travel Booking Receipt</h1>
                    <p>Invoice #${payment._id.slice(-6)}</p>
                </div>

                <div class="bill-details">
                    <h2>${payment.packageName}</h2>
                    <p>Transaction Date: ${format(new Date(payment.paymentDate), 'MMM dd, yyyy')}</p>
                </div>

                <div class="divider"></div>

                <table>
                    <tr>
                        <td><strong>Customer Email:</strong></td>
                        <td>${payment.userEmail}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Method:</strong></td>
                        <td>${payment.paymentMethod}</td>
                    </tr>
                    <tr>
                        <td><strong>Status:</strong></td>
                        <td>${payment.status}</td>
                    </tr>
                    <tr>
                        <td><strong>Transaction ID:</strong></td>
                        <td>${payment.paymentIntentId}</td>
                    </tr>
                </table>

                <div class="divider"></div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Travel Package Booking</td>
                            <td style="text-align: right;">₹${payment.amount}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Amount</th>
                            <th style="text-align: right;">₹${payment.amount}</th>
                        </tr>
                    </tfoot>
                </table>

                <div class="footer">
                    <p>Thank you for choosing our services!</p>
                    <p>For any queries, please contact support@travel.com</p>
                </div>
            </body>
            </html>
        `;

        // Write content to the new window
        printWindow.document.write(content);
        printWindow.document.close();

        // Print after the content is loaded
        printWindow.onload = function () {
            printWindow.print();
            printWindow.onafterprint = function () {
                printWindow.close();
            };
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-4xl text-blue-500"
                >
                    <FaSpinner />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                        <h1 className="text-3xl font-bold">Your Travel Dashboard</h1>
                        <p className="text-blue-100 mt-2">Track your bookings and payments</p>
                    </div>

                    {/* Tabs */}
                    <div className="border-b">
                        <div className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab("bookings")}
                                className={`py-4 px-2 flex items-center space-x-2 border-b-2 transition-colors duration-200 ${activeTab === "bookings"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <FaPlane />
                                <span>Bookings ({userBookings.length})</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("payments")}
                                className={`py-4 px-2 flex items-center space-x-2 border-b-2 transition-colors duration-200 ${activeTab === "payments"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <FaCreditCard />
                                <span>Payments ({userPayments.length})</span>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {activeTab === "bookings" ? (
                                <motion.div
                                    key="bookings"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    {userBookings.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            No bookings found
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {userBookings.map(booking => (
                                                <motion.div
                                                    key={booking._id}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{booking.name}</h3>
                                                            <p className="text-gray-500 text-sm">{booking.email}</p>
                                                        </div>
                                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            {booking.numberOfTravelers} Travelers
                                                        </span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">From:</span>
                                                            <span className="font-medium">
                                                                {format(new Date(booking.fromDate), 'MMM dd, yyyy')}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">To:</span>
                                                            <span className="font-medium">
                                                                {format(new Date(booking.toDate), 'MMM dd, yyyy')}
                                                            </span>
                                                        </div>
                                                        {booking.specialRequests && (
                                                            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                                                {booking.specialRequests}
                                                            </div>
                                                        )}
                                                        <div className="flex items-center space-x-2 mt-4 p-3 rounded-lg" style={{
                                                            backgroundColor: booking.status === 'completed' ? '#dcfce7' :
                                                                booking.status === 'pending' ? '#fef9c3' :
                                                                    booking.status === 'cancelled' ? '#fee2e2' : '#f3f4f6'
                                                        }}>
                                                            <span className={`flex-shrink-0 ${booking.status === 'completed' ? 'text-green-600' :
                                                                booking.status === 'pending' ? 'text-yellow-600' :
                                                                    booking.status === 'cancelled' ? 'text-red-600' : 'text-gray-600'
                                                                }`}>
                                                                {getStatusIcon(booking.status)}
                                                            </span>
                                                            <p className={`font-medium ${booking.status === 'confirmed' ? 'text-green-800' :
                                                                booking.status === 'pending' ? 'text-yellow-800' :
                                                                    booking.status === 'cancelled' ? 'text-red-800' : 'text-gray-800'
                                                                }`}>
                                                                Status: {booking.status === 'confirmed' ? 'Confirmed' :
                                                                    booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                            </p>
                                                        </div>
                                                        {Object.values(aggregatedBookings).map((booking) => (
                                                            <div key={booking._id} className="booking-card">
                                                                <h3>{booking.tourName}</h3>
                                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg>
                                                                    <span className="font-medium">{booking.numberOfTravelers}</span>
                                                                    <span>Seats Reserved</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleCancelBooking(booking._id)}
                                                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent 
                                                                    text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 
                                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                                                                    transition-colors duration-200 ease-in-out shadow-sm"
                                                                >
                                                                    <FaTimes className="mr-2 h-4 w-4" />
                                                                    Cancel Booking
                                                                </button>
                                                            </div>
                                                        ))}

                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="payments"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    {userPayments.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            No payments found
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {userPayments.map(payment => (
                                                <motion.div
                                                    key={payment._id}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h3 className="font-semibold text-lg">{payment.packageName}</h3>
                                                        <span className={`flex items-center space-x-1 ${getStatusColor(payment.status)}`}>
                                                            {getStatusIcon(payment.status)}
                                                            <span className="ml-1">{payment.status}</span>
                                                        </span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Amount:</span>
                                                            <span className="font-medium">₹{payment.amount}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Payment Method:</span>
                                                            <span className="font-medium">{payment.paymentMethod}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-500">Date:</span>
                                                            <span className="font-medium">
                                                                {format(new Date(payment.paymentDate), 'MMM dd, yyyy')}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center pt-4 mt-4 border-t">
                                                            <div className="text-xs text-gray-500">
                                                                ID: {payment.paymentIntentId}
                                                            </div>
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handlePrintBill(payment)}
                                                                className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                                            >
                                                                <FaPrint />
                                                                <span>Print Bill</span>
                                                            </motion.button>
                                                        </div>
                                                    </div>

                                                    {/* Hidden Printable Bill Component */}
                                                    <div style={{ display: 'none' }}>
                                                        <PrintableBill payment={payment} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserBookingStatus;
