import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentPage = () => {
    const location = useLocation();
    const bookingDetails = location.state || {};
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // Fetch user details from the session
        const fetchUserId = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const response = await axios.get("http://localhost:3000/Auth/users/userProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { _id } = response.data;
                setUserId(_id);
            } catch (error) {
                console.error("Error fetching user session:", error);
            }
        };

        fetchUserId(); // Fetch the userId from the session

        // Fetch client secret if booking details are available
        if (bookingDetails.price) {
            const fetchClientSecret = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/payment/create-payment-intent', {
                        price: bookingDetails.price,
                    });
                    setClientSecret(response.data.clientSecret);
                } catch (error) {
                    console.error("Error fetching client secret:", error);
                }
            };
            fetchClientSecret();
        }
    }, [bookingDetails]);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            console.error("Payment failed:", error);
        } else {
            if (paymentIntent.status === "succeeded") {
                toast("Payment Successful!");
                navigate("/status");

                try {
                    const response = await axios.post('http://localhost:3000/api/payment/save-payment', {
                        userId,
                        paymentIntentId: paymentIntent.id,
                        amount: bookingDetails.price,
                        packageName: bookingDetails.packageName,
                        status: paymentIntent.status,
                        paymentMethod: paymentIntent.payment_method_types[0],
                    });

                    console.log("Payment saved successfully:", response.data);
                } catch (error) {
                    console.error("Error saving payment:", error);
                }
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-1">Booking Summary:</h3>
                <p className="text-lg text-gray-800">{bookingDetails.packageName}</p>
                <p className="text-sm text-gray-500">Package Type: <span className="font-medium">{bookingDetails.packageType}</span></p>
                <p className="text-sm text-gray-500">Travel Dates: <span className="font-medium">{bookingDetails.fromDate} to {bookingDetails.toDate}</span></p>
                <p className="text-lg text-gray-800">Price: <span className="font-medium">{bookingDetails.price}</span></p>
            </div>
            {clientSecret && (
                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card Details:</label>
                        <CardElement />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition duration-200"
                        disabled={!stripe || !clientSecret}
                    >
                        Proceed to Payment
                    </button>
                </form>
            )}
        </div>
    );
};

export default PaymentPage;
