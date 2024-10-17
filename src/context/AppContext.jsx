import React, { createContext, useState } from 'react';
import { _PackageDetails, _topPackages, AllPackages } from '../assets/asset';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fromCity: '',
    toCity: '',
    departureDate: '',
    guests: ''
  });

  const [topPackages, setTopPackages] = useState(_topPackages);
  const [allPackages, setAllPackages] = useState(AllPackages);
  const [packageDetails, setPackageDetails] = useState(_PackageDetails);
  return (
    <AppContext.Provider value={{ formData, setFormData ,topPackages,packageDetails,allPackages}}>
      {children}
    </AppContext.Provider>
  );
};
