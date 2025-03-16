import { createContext, useState, useContext } from "react";

// Create context
const BookingContext = createContext();

// Provider component
export const BookingProvider = ({ children }) => {
  const [bookingId, setBookingId] = useState(null);

  return (
    <BookingContext.Provider value={{ bookingId, setBookingId }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook for using context
export const useBooking = () => {
  return useContext(BookingContext);
};
