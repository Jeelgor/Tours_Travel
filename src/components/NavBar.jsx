import React, { useEffect, useState } from 'react'
import { assets } from '../assets/asset'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { faXmark, faBars, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

const NavBar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [userEmail, SetEmail] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navBarToggle = () => {
        setIsNavOpen(!isNavOpen);
    }

    const handleLogout = () => {
        // Clear user token and email
        localStorage.removeItem("authToken");
        setToken(null);
        SetEmail(null);

        // Redirect to login page
        navigate('/login');
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await axios.get(`${apiUrl}/Auth/users/userProfile`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    SetEmail(response.data);
                    setToken(token);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    localStorage.removeItem("authToken");
                    navigate('/login');
                }
            }
        };
        fetchUser();
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
            }`}
        >
            <div className='px-4 py-4 mx-auto max-w-7xl'>
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='w-[40px] h-[40px] cursor-pointer'
                    >
                        <img
                            onClick={() => navigate('/homepage')}
                            src="icon.jpg"
                            alt="Logo"
                            className='w-full h-full object-contain rounded-full'
                        />
                    </motion.div>

                    {/* Desktop Menu */}
                    <motion.ul className='hidden md:flex space-x-8'>
                        {['Home', 'All Packages', 'Your Bookings'].map((item, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <NavLink
                                    to={item === 'Home' ? '/homepage' : 
                                        item === 'All Packages' ? '/TourPackages' : '/userbookingstatus'}
                                    className={({ isActive }) => 
                                        `text-lg font-medium transition-colors duration-200 ${
                                            isActive ? 'text-purple-600' : 
                                            isScrolled ? 'text-gray-800' : 'text-gray-100'
                                        } hover:text-purple-500`
                                    }
                                >
                                    {item}
                                </NavLink>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Profile Section */}
                    <div className='flex items-center space-x-4'>
                        {token ? (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                            >
                                <Link to="/profile" className="flex items-center space-x-2">
                                    <img
                                        src={assets.avatar}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                                    />
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/')}
                                className='bg-purple-600 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:bg-purple-700 transition-colors duration-200'
                            >
                                Create Account
                            </motion.button>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={navBarToggle}
                            className="md:hidden"
                        >
                            <FontAwesomeIcon 
                                icon={isNavOpen ? faXmark : faBars}
                                className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                            />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 w-full h-full bg-purple-600 z-40"
                    >
                        <div className="flex flex-col items-center pt-20 px-4">
                            <motion.ul className="flex flex-col items-center space-y-6 text-white">
                                {['Home', 'All Packages', 'Your Bookings', 'About Us', 'Contact Us', 'Profile'].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-xl font-medium"
                                    >
                                        <NavLink
                                            to={item === 'Home' ? '/homepage' : 
                                                item === 'All Packages' ? '/TourPackages' :
                                                item === 'Your Bookings' ? '/userbookingstatus' :
                                                `/${item.toLowerCase().replace(' ', '-')}`}
                                            onClick={navBarToggle}
                                            className="hover:text-purple-200 transition-colors"
                                        >
                                            {item}
                                        </NavLink>
                                    </motion.li>
                                ))}
                                <motion.li
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            navBarToggle();
                                        }}
                                        className="text-xl font-medium text-white hover:text-purple-200 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </motion.li>
                            </motion.ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default NavBar;
