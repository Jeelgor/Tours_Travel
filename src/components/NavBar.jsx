import { useEffect, useState } from 'react';
import { assets } from '../assets/asset';
import { NavLink, useNavigate } from 'react-router-dom';
import { faXmark, faBars, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const NavBar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [userEmail, SetEmail] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navBarToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        SetEmail(null);
        navigate('/login');
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const response = await axios.get(`${apiUrl}/Auth/users/userProfile`, {
                        headers: { Authorization: `Bearer ${token}` }
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

    const navItems = [
        { path: "/homepage", label: "Home" },
        { path: "/TourPackages", label: "All Packages" },
        { path: "/userbookingstatus", label: "Your Bookings" },
        { path: "/about", label: "About Us" },
        { path: "/contact", label: "Contact Us" }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-white/95 backdrop-blur-md'
                }`}
        >
            <div className='px-4 py-2 mx-4 sm:mx-[4%]'>
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='w-[7vmin] sm:w-[6vmin] cursor-pointer'
                    >
                        <img
                            onClick={() => navigate('/homepage')}
                            src="icon.jpg"
                            alt="Logo"
                            className='rounded-full'
                        />
                    </motion.div>

                    {/* Desktop Menu */}
                    <motion.ul className='hidden sm:flex space-x-6'>
                        {navItems.slice(0, 3).map((item) => (
                            <motion.li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `
                                        relative text-base font-medium 
                                        ${isActive ? 'text-blue-600' : 'text-gray-700'}
                                        hover:text-blue-600 transition-colors duration-300
                                    `}
                                >
                                    {item.label}
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </NavLink>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Profile Section */}
                    <div className='flex items-center space-x-3'>
                        {token ? (
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <img
                                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                                        src={assets.avatar}
                                        alt="Profile"
                                    />
                                </motion.div>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                                        >
                                            {userEmail && (
                                                <div className="p-4">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <img
                                                            src={assets.avatar}
                                                            alt="Profile"
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {userEmail.Email}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Logged in
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => navigate('/my-profile')}
                                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                                                        >
                                                            <FontAwesomeIcon icon={faUser} />
                                                            <span>My Profile</span>
                                                        </motion.button>

                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleLogout}
                                                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
                                                        >
                                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                                            <span>Logout</span>
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/')}
                                className='bg-blue-500 px-4 py-1.5 rounded-full text-white text-sm font-medium shadow-lg hover:bg-blue-600 transition-colors duration-300'
                            >
                                Create Account
                            </motion.button>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={navBarToggle}
                            className="sm:hidden"
                        >
                            <FontAwesomeIcon
                                icon={isNavOpen ? faXmark : faBars}
                                className="w-5 h-5 text-gray-700"
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
                        className="fixed top-0 right-0 h-full w-full bg-white shadow-2xl sm:hidden"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex justify-end p-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={navBarToggle}
                                >
                                    <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
                                </motion.button>
                            </div>

                            <motion.div
                                className="flex flex-col space-y-4 p-4"
                                initial="closed"
                                animate="open"
                                variants={{
                                    open: {
                                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                    },
                                    closed: {
                                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                    }
                                }}
                            >
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.path}
                                        variants={{
                                            open: { y: 0, opacity: 1 },
                                            closed: { y: 20, opacity: 0 }
                                        }}
                                    >
                                        <NavLink
                                            to={item.path}
                                            onClick={navBarToggle}
                                            className={({ isActive }) =>
                                                `block py-2 text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default NavBar;