import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_API_URL

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill(""));

    // Handle OTP input change
    const handleChange = (e, index) => {
        const value = e.target.value;

        // Allow only numbers and limit input length to 1
        if (/^[0-9]{0,1}$/.test(value)) {
            setOtp((prev) => {
                const newOtp = [...prev];
                newOtp[index] = value;
                return newOtp;
            });

            // Focus on the next input field
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const otpString = otp.join('');

        // API call for OTP verification
        axios.post(`${apiUrl}/Auth/users/verify-Otp`, { otp: otpString })
            .then(result => {
                console.log(result); // Verify this log appears
                toast("OTP verified successfully!");
                navigate('/homepage');
            })
            .catch(err => {
                console.error(err);
                toast.error("Verification failed. Please check your OTP."); // Change to toast.error
            });
    };

    return (
        <div className="bg-lightblue h-screen w-screen flex items-center justify-center">
            <div className="w-[290px] h-[500px] md:w-[528px] md:h-[478px] bg-white rounded-lg">
                <h1 className="text-center p-4 text-2xl">Please Complete OTP Verification</h1>
                <form onSubmit={handleSubmit} className="flex justify-center">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="number"
                            id={`otp-input-${index}`}
                            className='w-12 h-12 mx-1 border-b-2 border-b-lime-600 text-center'
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </form>
                <div className="flex justify-center mt-10">
                    <button onClick={handleSubmit} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200px] md:w-[400px] h-[40px] text-xl text-white">
                        Verify OTP
                    </button>
                </div>
                <ToastContainer position="top-center" />
            </div>
        </div>
    );
}

export default OtpVerification;