import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_API_URL

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [shake, setShake] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]{0,1}$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-tab forward
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Auto-tab backward on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const otpString = otp.join('');

        try {
            const result = await axios.post(`${apiUrl}/Auth/users/verify-Otp`, { otp: otpString });
            toast.success("OTP verified successfully!");
            navigate('/homepage');
        } catch (err) {
            console.error(err);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            toast.error("Verification failed. Please check your OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden flex items-center justify-center">
            {/* Background animation */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/5 rounded-full"
                        style={{
                            width: Math.random() * 80 + 40,
                            height: Math.random() * 80 + 40,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 25,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl relative"
            >
                <motion.h1 
                    className="text-3xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    OTP Verification
                </motion.h1>

                <motion.p
                    className="text-white/80 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Please enter the verification code sent to your email
                </motion.p>

                <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex justify-center gap-2 md:gap-4">
                        {otp.map((digit, index) => (
                            <motion.input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                id={`otp-input-${index}`}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-14 md:w-14 md:h-16 rounded-lg bg-white/20 border-2 border-white/30 text-white text-2xl text-center focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-300"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                                />
                            ) : "Verify OTP"}
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default OtpVerification;
