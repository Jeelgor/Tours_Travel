import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
const MyPackage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    try {
      const response = axios.get("http://localhost:3000/api/bookings", {

      });
      console.log(response.data);
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
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

}

export default MyPackage