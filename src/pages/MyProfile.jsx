import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL;

const MyProfile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        address: '',
        pincode: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
            toast.error("Please login to view profile");
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/Auth/user/userProfile`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                setUserInfo(response.data);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile information");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Please login to update profile");
            navigate('/login');
            return;
        }

        try {
            await axios.put(
                `${apiUrl}/Auth/user/updateProfile`,
                userInfo,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"
                        >
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </motion.button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userInfo.firstName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-white/80 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userInfo.lastName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                disabled
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 opacity-50"
                            />
                            <p className="text-white/60 text-sm mt-1">Email cannot be changed</p>
                        </div>

                        <div>
                            <label className="block text-white/80 mb-2">Mobile Number</label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={userInfo.mobileNumber}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                maxLength={10}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-white/80 mb-2">Address</label>
                            <textarea
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-white/80 mb-2">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={userInfo.pincode}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                maxLength={6}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-all"
                            />
                        </div>

                        {isEditing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-end"
                            >
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {isSaving ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                                        />
                                    ) : "Save Changes"}
                                </button>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
            <ToastContainer position="top-right" theme="colored" />
        </div>
    );
};

export default MyProfile;
