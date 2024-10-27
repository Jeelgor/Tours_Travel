import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpUser = () => {
    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Password, SetuPassword] = useState("");
    const [SetPassword, SetSetPassword] = useState("");

    const RegisterUser = (event) => {
        event.preventDefault();

        // Check if passwords match
        if (Password !== SetPassword) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post('http://localhost:3000/Auth/users/register', {
            FirstName,
            LastName,
            Email,
            Password,
            SetPassword

        })
            .then(result => {
                console.log(result);
                localStorage.setItem("authToken", result.data.token);
                toast.success("Thank you for registering!"); // Show success toast after registration
            })
            .catch(err => {
                console.error(err);
                toast.error("Registration failed. Please try again."); // Notify user of the error
            });
    }

    return (
        <div className="bg-lightblue h-screen w-screen flex items-center justify-center">
            <div className="w-[290px] h-[500px] md:w-[528px] md:h-[478px] bg-white rounded-lg">
                <h1 className="text-center p-4 text-2xl">CREATE ACCOUNT</h1>

                <form onSubmit={RegisterUser}>
                    <div className="md:flex">
                        <div className="px-8 mt-7">
                            <input
                                type="text"
                                className="border-b border-gray-500 focus:outline-none p-2"
                                placeholder="First Name"
                                value={FirstName}
                                onChange={(e) => SetFirstName(e.target.value)}
                            />
                        </div>
                        <div className="px-8 mt-7">
                            <input
                                type="text"
                                className="border-b border-gray-500 focus:outline-none p-2"
                                placeholder="Last Name"
                                value={LastName}
                                onChange={(e) => SetLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="px-8 mt-7">
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
                        <div className="mt-7">
                            <input
                                type="password"
                                className="border-b border-gray-500 focus:outline-none p-2"
                                placeholder="Confirm Password"
                                value={SetPassword}
                                onChange={(e) => SetSetPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200px] md:w-[400px] h-[40px] text-xl text-white">
                            Register
                        </button>
                    </div>
                    <Link to="/login" className="flex justify-center mt-4">
                        <p>Already a user? Login</p>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignUpUser;
