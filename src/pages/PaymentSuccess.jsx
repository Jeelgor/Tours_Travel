import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            // Call your backend to verify the session & create booking
            axios.post(`${apiUrl}/api/verify-checkout-session`, { sessionId })
                .then(res => {
                    toast.success('Payment confirmed and booking created!');
                })
                .catch(err => {
                    toast.error('Something went wrong while confirming booking');
                    console.error(err);
                });
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="mt-4">Your booking has been confirmed.</p>
        </div>
    );
};

export default PaymentSuccess;
