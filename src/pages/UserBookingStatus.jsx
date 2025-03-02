import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane, FaCreditCard, FaSpinner, FaCheck, FaTimes, FaPrint } from "react-icons/fa";
import { format } from "date-fns";
import PrintableBill from '../components/PrintableBill';
import { useUser } from '../context/UserContext';


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

                console.log('User ID:', userRes.data._id);
                console.log('Bookings:', bookingsRes.data.data);
                console.log('Payments:', paymentsRes.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [setUserId]);

    const userBookings = bookings.filter(booking => booking.userId === userId);
    const userPayments = payments.filter(payment => payment.userId === userId);

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

    console.log('Current userId:', userId);
    console.log('All bookings:', bookings);
    console.log('Filtered bookings:', userBookings);
    console.log('All payments:', payments);
    console.log('Filtered payments:', userPayments);

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
