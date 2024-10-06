import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [Email, SetEmail] = useState("");
    const [Password, SetuPassword] = useState("");
    const navigate = useNavigate();


    const RegisterUser = (event) => {
        event.preventDefault();

        // Check if passwords match

        axios.post('http://localhost:3000/Auth/users/loginuser', {
            Email,
            Password,
        })
            .then(result => {
                console.log(result);
                navigate('/OtpVerification')

            })
            .catch(err => {
                console.error(err);
                toast("Login failed. Please try again.");
            });
    }

    return (
        <div className="bg-lightblue h-screen w-screen flex items-center justify-center">
            <div className="w-[290px] h-[500px] md:w-[528px] md:h-[478px] bg-white rounded-lg">
                <h1 className="text-center p-4 text-2xl">CREATE ACCOUNT</h1>

                <form onSubmit={RegisterUser}>
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
                                onChange={(e) => SetuPassword(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="flex justify-center mt-10">

                        <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200px] md:w-[400px] h-[40px] text-xl text-white">
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
    )
}

export default Login