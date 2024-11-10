import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthToken = () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate('/'); // Redirect to login/register if token is missing
            }
        };

        // Initial check on component mount
        checkAuthToken();

        // Listen for changes in localStorage across the site
        window.addEventListener("storage", checkAuthToken);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("storage", checkAuthToken);
        };
    }, [navigate]);

    return children;
};

export default ProtectedRoute;
