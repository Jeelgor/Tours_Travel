import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_API_URL
const Login = () => {
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const navigate = useNavigate();

    const LoginUser = async (event) => {
        event.preventDefault();

        console.log("Attempting login with:", { Email, Password });

        try {
            // Login request to verify credentials
            const loginResponse = await axios.post(`${apiUrl}/Auth/users/loginuser`, {
                Email,
                Password
            });

            console.log("Login Response Data:", loginResponse.data);

            const { token } = loginResponse.data;
            console.log("Token:", token)
            if (token) {
                // Save token in localStorage
                localStorage.setItem("authToken", token);

                // Optionally navigate to OTP page
                navigate('/OtpVerification'); // Uncomment if you want redirection

                // Check protected route as a test
                accessProtectedRoute();
            } else {
                toast("Token missing. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            toast(errorMessage);
        }
    }

    const accessProtectedRoute = async () => {
        const token = localStorage.getItem("authToken");

        if (token) {
            try {
                const response = await axios.get('http://localhost:3000/Auth/users/protected-route', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Protected route response:", response.data);
            } catch (error) {
                console.error("Access error:", error);
            }
        } else {
            console.log("No token found. Please log in.");
        }
    };

    return (
        <div className="bg-lightblue h-screen w-screen flex items-center justify-center">
            <div className="w-[290px] h-[500px] md:w-[528px] md:h-[478px] bg-white rounded-lg">
                <h1 className="text-center p-4 text-2xl">SIGN IN</h1>

                <form onSubmit={LoginUser}>
                    <div className="px-8 mt-7 text-center ">
                        <div>
                            <input
                                type="email"
                                className="border-b border-gray-500 focus:outline-none p-2"
                                placeholder="Email"
                                value={Email}
                                onChange={(e) => SetEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-7">
                            <input
                                type="password"
                                className="border-b border-gray-500 focus:outline-none p-2"
                                placeholder="Password"
                                value={Password}
                                onChange={(e) => SetPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200px] md:w-[400px] h-[40px] text-xl text-white">
                            Login
                        </button>
                    </div>
                    <Link to="/" className="flex justify-center mt-4">
                        <p>Not a user? Register</p>
                    </Link>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default Login;
