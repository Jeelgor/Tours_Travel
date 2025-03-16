import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL;

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [shake, setShake] = useState(false);
    const [activeInput, setActiveInput] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Handle OTP input change
    const handleChange = (e, index) => {
        const value = e.target.value;
        const newOtp = [...otp];

        // Allow only numbers and limit input length to 1
        if (/^[0-9]{0,1}$/.test(value)) {
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
                setActiveInput(index + 1);
            }
        }
    };

    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Focus previous input on backspace
            document.getElementById(`otp-input-${index - 1}`).focus();
            setActiveInput(index - 1);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setShake(true);
            toast.error("Please enter all 6 digits");
            setTimeout(() => setShake(false), 500);
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(`${apiUrl}/Auth/users/verify-Otp`, { otp: otpString });
            toast.success("OTP verified successfully!");
            setTimeout(() => navigate('/homepage'), 1500);
        } catch (err) {
            console.error(err);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setOtp(Array(6).fill(""));
            setActiveInput(0);
            document.getElementById('otp-input-0').focus();
            toast.error("Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
            <AnimatePresence>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white mb-3">
                            OTP Verification
                        </h1>
                        <p className="text-white/80">
                            Enter the verification code we sent to your email
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className={`flex justify-center gap-3 ${shake ? 'animate-shake' : ''}`}
                    >
                        {otp.map((digit, index) => (
                            <motion.input
                                key={index}
                                type="text"
                                id={`otp-input-${index}`}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={() => setActiveInput(index)}
                                className={`w-12 h-14 rounded-lg text-center text-xl font-semibold 
                                    bg-white/20 text-white border-2 
                                    ${activeInput === index ? 'border-white' : 'border-transparent'}
                                    focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50
                                    transition-all duration-200 ease-in-out
                                    placeholder-white/50`}
                                autoFocus={index === 0}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        ))}
                    </motion.form>

                    <motion.div 
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full py-3 px-6 rounded-lg bg-white/20 text-white font-semibold
                                hover:bg-white/30 transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-white/50
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <motion.div
                                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span className="ml-2">Verifying...</span>
                                </div>
                            ) : (
                                "Verify OTP"
                            )}
                        </motion.button>
                    </motion.div>

                    <ToastContainer 
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default OtpVerification;