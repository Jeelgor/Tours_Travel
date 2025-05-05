import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Helper: Fetch bookings from API
    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/bookings");
            const fetchedBookings =
                response.data && Array.isArray(response.data.data)
                    ? response.data.data
                    : [];
            setBookings(fetchedBookings);
            setError("");
        } catch (err) {
            console.error("❌ Error fetching bookings:", err);
            setError("Failed to fetch bookings. Please try again.");
            setBookings([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch bookings once when component mounts
    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    // Check and cancel expired bookings
    useEffect(() => {
        const checkAndCancelExpiredBookings = async () => {
            if (!bookings || bookings.length === 0) return;

            // Find any booking that is still pending and older than 2 minutes
            const expiredBooking = bookings.find(
                (booking) =>
                    ["pending", "cancelled"].includes(booking.status) &&
                    new Date(booking.createdAt) <= new Date(Date.now() - 2 * 60 * 1000)
            );


            if (expiredBooking) {
                try {
                    await axios.post("http://localhost:3000/api/api/cancel-expired-bookings", {
                        bookingId: expiredBooking._id,
                    });
                    await fetchBookings();
                } catch (err) {
                    console.error("❌ Error canceling expired booking:", err);
                }
            }
        };

        checkAndCancelExpiredBookings();
    }, [bookings, fetchBookings]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Bookings</h2>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-xl text-gray-600">Loading bookings...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-xl text-red-500">{error}</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Package</th>
                                <th className="py-3 px-6 text-left">Customer</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm font-light">
                            {Array.isArray(bookings) && bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr
                                        key={booking._id}
                                        className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span className="font-medium">{booking.packageId}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">{booking.name}</td>
                                        <td className="py-3 px-6 text-center">
                                            <span
                                                className={`${booking.status === "pending"
                                                    ? "bg-yellow-200 text-yellow-600"
                                                    : booking.status === "confirmed"
                                                        ? "bg-green-200 text-green-600"
                                                        : "bg-red-200 text-red-600"
                                                    } py-1 px-3 rounded-full text-xs`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {new Date(booking.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-gray-500">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminBookings;