import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookingStatus = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const result = await axios.get("http://localhost:3000/api/bookings");
                // const result2 = await axios.get("http://localhost:3000/api/");

                // Log the API response to verify the data structure
                console.log("API Response:", result.data);

                // Set the bookings state to the 'data' property from the response
                setBookings(result.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings", error);
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">User Booking Status</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="p-4 border rounded-md shadow">
                            <p><strong>User Name:</strong> {booking.name}</p>
                            <p><strong>Email:</strong> {booking.email}</p>
                            <p><strong>Number of Travelers:</strong> {booking.numberOfTravelers}</p>
                            <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                            <p><strong>From Date:</strong> {new Date(booking.fromDate).toLocaleDateString()}</p>
                            <p><strong>To Date:</strong> {new Date(booking.toDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserBookingStatus;
