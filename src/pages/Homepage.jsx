import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import TopPackage from '../components/TopPackage'
import FeaturesSection from '../components/FeaturesSection'
import SubscribeBanner from '../components/SubscribeBanner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthToken = () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate('/');
            }
        };

        checkAuthToken();

        window.addEventListener("storage", checkAuthToken);

        return () => {
            window.removeEventListener("storage", checkAuthToken);
        };
    }, [navigate]);
    return (
        <>
            <div className='mx-4 sm:mx-[4%]'>
                <HeroSection />
                <FeaturesSection />
                <TopPackage />
                <SubscribeBanner />
            </div>
        </>
    )
}

export default Homepage