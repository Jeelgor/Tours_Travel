import { useState } from "react";
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
    const [Password, SetPassword] = useState("");
    const [ConfirmPassword, SetConfirmPassword] = useState("");
    const [Address, SetAddress] = useState("");
    const [MobileNumber, SetMobileNumber] = useState("");
    const [Pincode, SetPincode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (Password !== ConfirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/Auth/users/register`, {
                FirstName,
                LastName,
                Email,
                Password,
                Address,
                MobileNumber,
                Pincode
            });

            if (response.data) {
                toast.success("Registration successful! Please check your email for OTP");
                setTimeout(() => navigate("/otp-verification"), 1500);
            }
        } catch (err) {
            console.error("Registration error:", err);
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

            {/* Main content container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl relative"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                />

                <motion.h1 
                    className="text-3xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Create Account
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="First Name"
                                    value={FirstName}
                                    onChange={(e) => SetFirstName(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Last Name"
                                    value={LastName}
                                    onChange={(e) => SetLastName(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Email"
                                    value={Email}
                                    onChange={(e) => SetEmail(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Password"
                                    value={Password}
                                    onChange={(e) => SetPassword(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Confirm Password"
                                    value={ConfirmPassword}
                                    onChange={(e) => SetConfirmPassword(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="group col-span-2"
                        >
                            <div className="relative">
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Address"
                                    value={Address}
                                    onChange={(e) => SetAddress(e.target.value)}
                                    rows="3"
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Mobile Number"
                                    value={MobileNumber}
                                    onChange={(e) => SetMobileNumber(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="group"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                                    placeholder="Pincode"
                                    value={Pincode}
                                    onChange={(e) => SetPincode(e.target.value)}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    initial={false}
                                    animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group"
                    >
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <motion.div
                                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span className="ml-2">Signing up...</span>
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-center"
                    >
                        <Link 
                            to="/login" 
                            className="text-white/80 hover:text-white transition-colors duration-300 group relative inline-block"
                        >
                            Already have an account? 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 ml-1 group-hover:from-white group-hover:to-white transition-all duration-300">
                                Login
                            </span>
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                initial={false}
                            />
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