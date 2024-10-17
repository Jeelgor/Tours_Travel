import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const Package = () => {
  const { formData } = useContext(AppContext);
  return (
    <div>
      <p>Package</p>
      <div>
      <h2>Form Data:</h2>
      <p>From City: {formData.fromCity}</p>
      <p>To City: {formData.toCity}</p>
      <p>Departure Date: {formData.departureDate}</p>
      <p>Guests: {formData.guests}</p>
    </div>
    </div>
  )
}

export default Package
