import React, { createContext, useEffect, useState } from 'react';
import { _AllPackages, _PackageDetails, _TopPackages } from '../assets/asset';

// Create the context
export const AppContext = createContext();

// Helper function to load data from localStorage
const loadFromLocalStorage = (key, fallbackValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : fallbackValue;
};

// Helper function to save data to localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Create a provider component
export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or fallback to default values
  const [formData, setFormData] = useState(() =>
    loadFromLocalStorage('formData', {
      fromCity: '',
      toCity: '',
      departureDate: '',
      guests: 1
    })
  );
  const [topPackages, setTopPackages] = useState(_TopPackages);
  const [allPackages, setAllPackages] = useState(_AllPackages);
  const [packageDetails, setPackageDetails] = useState(_PackageDetails);

  // Sync formData with localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('formData', formData);
  }, [formData]);

  return (
    <AppContext.Provider value={{ formData, setFormData ,topPackages,packageDetails,allPackages}}>
      {children}
    </AppContext.Provider>
  );
};
