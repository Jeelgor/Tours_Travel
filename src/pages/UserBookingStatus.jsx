import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookingStatus = () => {
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch bookings data
    useEffect(() => {
        async function fetchBookings() {
            try {
                const result = await axios.get("http://localhost:3000/api/bookings");
                console.log("Bookings API Response:", result.data.data);
                setBookings(result.data.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching bookings", error);
            }
        }

        fetchBookings();
    }, []);

    // Fetch payments data
    useEffect(() => {
        async function fetchPayments() {
            try {
                const result = await axios.get("http://localhost:3000/api/payment/getpayment");
                console.log("Payments API Response:", result.data.data);
                setPayments(result.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching payments", error);
            }
        }

        fetchPayments();
    }, []);

    // Fetch user profile
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:3000/Auth/users/userProfile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("User Profile API Response:", response.data);
                    setUserEmail(response.data.Email);
                    setLoading(false);

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser();
    }, []);

    // Filter bookings and payments for the current user
    const userBookings = bookings.filter(booking => booking.email === userEmail);
    const userPayments = payments.filter(payment => payment.userEmail === userEmail);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">User Booking Status</h1>

            {/* Bookings Section */}
            <h2 className="text-xl font-semibold mt-6">Bookings</h2>
            {userBookings.length === 0 ? (
                <p>No bookings found for this user.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">User Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Number of Travelers</th>
                                <th className="py-2 px-4 border-b">Special Requests</th>
                                <th className="py-2 px-4 border-b">From Date</th>
                                <th className="py-2 px-4 border-b">To Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userBookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{booking.name}</td>
                                    <td className="py-2 px-4 border-b">{booking.email}</td>
                                    <td className="py-2 px-4 border-b">{booking.numberOfTravelers}</td>
                                    <td className="py-2 px-4 border-b">{booking.specialRequests}</td>
                                    <td className="py-2 px-4 border-b">{new Date(booking.fromDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b">{new Date(booking.toDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Payments Section */}
            <h2 className="text-xl font-semibold mt-6">Payments</h2>
            {userPayments.length === 0 ? (
                <p>No payments found for this user.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">Package Name</th>
                                <th className="py-2 px-4 border-b">Payment Intent ID</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Payment Method</th>
                                <th className="py-2 px-4 border-b">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPayments.map(payment => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{payment.packageName}</td>
                                    <td className="py-2 px-4 border-b">{payment.paymentIntentId}</td>
                                    <td className="py-2 px-4 border-b">${payment.amount}</td>
                                    <td className="py-2 px-4 border-b">{payment.status}</td>
                                    <td className="py-2 px-4 border-b">{payment.paymentMethod}</td>
                                    <td className="py-2 px-4 border-b">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserBookingStatus;
