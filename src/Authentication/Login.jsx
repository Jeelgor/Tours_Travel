import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const LoginUser = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const loginResponse = await axios.post(`${apiUrl}/Auth/users/loginuser`, {
                Email,
                Password
            });

            const { token } = loginResponse.data;
            if (token) {
                localStorage.setItem("authToken", token);
                navigate('/OtpVerification');
                accessProtectedRoute();
            } else {
                toast("Token missing. Please try again.");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            toast(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const accessProtectedRoute = async () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const response = await axios.get(`${apiUrl}Auth/users/protected-route`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Access error:", error);
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden flex items-center justify-center">
            {/* Animated background particles - same as SignUpUser */}
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
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl"
            >
                <motion.h1 
                    className="text-3xl font-bold text-center text-white mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Welcome Back
                </motion.h1>

                <form onSubmit={LoginUser} className="space-y-6">
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
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            placeholder="Password"
                            value={Password}
                            onChange={(e) => SetPassword(e.target.value)}
                        />
                    </motion.div>

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
                            ) : "Login"}
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center"
                    >
                        <Link 
                            to="/" 
                            className="text-white hover:text-purple-200 transition-colors duration-300"
                        >
                            Not a user? Register
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

export default Login;
