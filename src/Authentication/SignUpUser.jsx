import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL

const SignUpUser = () => {
    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Password, SetuPassword] = useState("");
    const [SetPassword, SetSetPassword] = useState("");
    const [MobileNumber, SetMobileNumber] = useState("");
    const [Address, SetAddress] = useState("");
    const [Pincode, SetPincode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateFields = () => {
        // Check for empty fields
        if (!FirstName.trim() || !LastName.trim() || !Email.trim() || !Password.trim() || !SetPassword.trim() || !MobileNumber.trim() || !Address.trim() || !Pincode.trim()) {
            toast.error("All fields are required");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            toast.error("Invalid email format");
            return false;
        }

        // Mobile number validation (10 digits)
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(MobileNumber)) {
            toast.error("Mobile number must be 10 digits");
            return false;
        }

        // Pincode validation (6 digits)
        const pincodeRegex = /^[0-9]{6}$/;
        if (!pincodeRegex.test(Pincode)) {
            toast.error("Pincode must be 6 digits");
            return false;
        }

        // Address minimum length
        if (Address.length < 10) {
            toast.error("Please enter a complete address");
            return false;
        }

        // Password strength validation
        if (Password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return false;
        }
        if (!/[A-Z]/.test(Password)) {
            toast.error("Password must contain at least one uppercase letter");
            return false;
        }
        if (!/[a-z]/.test(Password)) {
            toast.error("Password must contain at least one lowercase letter");
            return false;
        }
        if (!/[0-9]/.test(Password)) {
            toast.error("Password must contain at least one number");
            return false;
        }

        // Check if passwords match
        if (Password !== SetPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    };

    const RegisterUser = async (event) => {
        event.preventDefault();
        
        if (!validateFields()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/Auth/users/register`, {
                FirstName,
                LastName,
                Email,
                Password,
                SetPassword,
                MobileNumber,
                Address,
                Pincode
            });
            
            if (response.data) {
                toast.success("Thank you for registering!");
                navigate("/login");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden flex items-center justify-center">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/10 rounded-full"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                        }}
                        animate={{
                            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl"
            >
                <motion.h1 
                    className="text-3xl font-bold text-center text-white mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Create Account
                </motion.h1>

                <form onSubmit={RegisterUser} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="First Name"
                                value={FirstName}
                                onChange={(e) => SetFirstName(e.target.value)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                placeholder="Last Name"
                                value={LastName}
                                onChange={(e) => SetLastName(e.target.value)}
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            placeholder="Email"
                            value={Email}
                            onChange={(e) => SetEmail(e.target.value)}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <input
                            type="tel"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            placeholder="Mobile Number"
                            value={MobileNumber}
                            onChange={(e) => SetMobileNumber(e.target.value)}
                            maxLength={10}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <textarea
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                            placeholder="Address"
                            value={Address}
                            onChange={(e) => SetAddress(e.target.value)}
                            rows={3}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            placeholder="Pincode"
                            value={Pincode}
                            onChange={(e) => SetPincode(e.target.value)}
                            maxLength={6}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            placeholder="Password"
                            value={Password}
                            onChange={(e) => SetuPassword(e.target.value)}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            placeholder="Confirm Password"
                            value={SetPassword}
                            onChange={(e) => SetSetPassword(e.target.value)}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
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
                            ) : "Register"}
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-center"
                    >
                        <Link 
                            to="/login" 
                            className="text-white hover:text-purple-200 transition-colors duration-300"
                        >
                            Already a user? Login
                        </Link>
                    </motion.div>
                </form>
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

export default SignUpUser;
