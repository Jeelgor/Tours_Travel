import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [errorType, setErrorType] = useState(null);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (sessionId) {
            axios.post(`${apiUrl}/api/stripe/verify-checkout-session`, { sessionId })
                .then(res => {
                    setStatus('success');
                    toast.success('Payment confirmed and booking created!');
                })
                .catch(err => {
                    console.error(err);
                    const serverError = err.response?.data?.error;
                    if (serverError === 'NOT_ENOUGH_SEATS') {
                        setStatus('error');
                        setErrorType('no_seats');
                        toast.error('Seats filled up! Refund initiated.');
                    } else {
                        setStatus('error');
                        setErrorType('general');
                        toast.error('Something went wrong while confirming booking');
                    }
                });
        }
    }, [sessionId]);

    useEffect(() => {
        if (status === 'verifying') return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (status === 'success') {
                        navigate('/userbookingstatus');
                    } else {
                        navigate('/TourPackages');
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, status]);

    if (status === 'verifying') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-semibold text-gray-800">Verifying your booking...</h2>
                    <p className="text-gray-500 mt-2">Please do not refresh the page.</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center border-t-8 border-red-500">
                    {errorType === 'no_seats' ? (
                        <>
                            <FaExclamationTriangle className="mx-auto text-orange-500 text-6xl mb-6" />
                            <h1 className="text-3xl font-bold text-gray-800">Booking Failed!</h1>
                            <p className="mt-4 text-gray-600 font-medium">
                                We're sorry, but the remaining seats were booked by someone else just before your payment was completed.
                            </p>
                            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                                <p className="text-orange-800 text-sm font-bold uppercase tracking-wider mb-1">Automatic Refund Initiated</p>
                                <p className="text-orange-700 text-sm">
                                    Your payment will be refunded to your original payment method within 2-7 business days.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <FaTimesCircle className="mx-auto text-red-500 text-6xl mb-6" />
                            <h1 className="text-3xl font-bold text-gray-800">Something went wrong</h1>
                            <p className="mt-4 text-gray-600">
                                There was an error verifying your payment. Our team has been notified.
                            </p>
                        </>
                    )}
                    <p className="mt-8 text-gray-500 text-sm">
                        Redirecting to tours in {countdown} seconds...
                    </p>
                    <button 
                        onClick={() => navigate('/TourPackages')}
                        className="mt-6 w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-colors"
                    >
                        Browse Other Tours
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center border-t-8 border-green-500">
                <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-6 animate-bounce" />
                <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
                <p className="mt-4 text-gray-600">
                    Your booking for has been successfully confirmed.
                </p>
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-green-800 text-sm font-semibold">
                        A confirmation email has been sent to your registered address.
                    </p>
                </div>
                <p className="mt-8 text-gray-500 text-sm">
                    Redirecting to your bookings in {countdown} seconds...
                </p>
                <button 
                    onClick={() => navigate('/userbookingstatus')}
                    className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    View My Bookings
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
