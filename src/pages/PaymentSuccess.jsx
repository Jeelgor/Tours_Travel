import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (sessionId) {
            axios.post(`${apiUrl}/api/stripe/verify-checkout-session`, { sessionId })
                .then(res => {
                    toast.success('Payment confirmed and booking created!');
                })
                .catch(err => {
                    toast.error('Something went wrong while confirming booking');
                    console.error(err);
                });
        }
    }, [sessionId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/userbookingstatus');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center">
                <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-6 animate-bounce" />
                <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
                <p className="mt-4 text-gray-600">
                    Your booking has been successfully confirmed.
                </p>
                <p className="mt-6 text-gray-500">
                    Redirecting to your bookings in {countdown} second{countdown > 1 ? 's' : ''}...
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
