import React, { useEffect, useState } from 'react'
import { assets } from '../assets/asset'
import { NavLink, useNavigate } from 'react-router-dom'
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const NavBar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [userEmail, SetEmail] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state to control dropdown

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
                    const response = await axios.get('http://localhost:3000/Auth/users/userProfile', {
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
        <nav className='px-4 py-2 mx-4 sm:mx-[4%]'>
            <section className='flex justify-between items-center relative z-30'>
                {/* logo */}
                <div className={`w-[9vmin] sm:w-[8vmin] cursor-pointer`}>
                    <img onClick={() => navigate(`/homepage`)} src="icon.jpg" alt="" />
                </div>

                {/* menu */}
                <ul className={`hidden sm:flex justify-between gap-6`}>
                    <NavLink to="/homepage">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/TourPackages">
                        <li>All Packages</li>
                    </NavLink>
                    <NavLink to="/userbookingstatus">
                        <li>Your Bookings</li>
                    </NavLink>
                </ul>

                {/* profile */}
                <div className={`flex`}>
                    {
                        token
                            ? <div className="relative flex items-center gap-2">
                                <img 
                                    className="w-8 sm:w-[4vmin] cursor-pointer" 
                                    src={assets.avatar} 
                                    alt="Profile" 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                                />

                                {/* Dropdown menu */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white p-4 rounded-md shadow-lg">
                                        {userEmail ? (
                                            <div>
                                                <p className="text-lg font-semibold">Logged in as: {userEmail.Email}</p>
                                                {/* Logout button inside the dropdown */}
                                                <button
                                                    className="bg-red-500 px-4 py-2 mt-2 rounded text-white"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-lg">Please log in to see your profile.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            : <div>
                                <button onClick={() => navigate('/')} className='bg-blue-400 px-6 py-2 rounded-full text-sm text-white font-semibold '>Create Account</button>
                            </div>
                    }
                    <FontAwesomeIcon className='w-8 h-8 ml-4 sm:hidden' icon={isNavOpen ? faXmark : faBars} onClick={navBarToggle} />
                </div>
            </section>

            <div className={`fixed top-0 right-0 h-full bg-navbar_color w-[100%] z-20 transform ${isNavOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden flex justify-center py-28`}>
                <ul className='flex flex-col gap-8 items-center text-white font-bold text-2xl'>
                    <NavLink to="/homepage" onClick={navBarToggle}>
                        <li className='hover:text-black'>Home</li>
                    </NavLink>
                    <NavLink to="/TourPackages" onClick={navBarToggle}>
                        <li className='hover:text-black'>All Packages</li>
                    </NavLink>
                    <NavLink to="/about" onClick={navBarToggle}>
                        <li className='hover:text-black'>About Us</li>
                    </NavLink>
                    <NavLink to="/contact" onClick={navBarToggle}>
                        <li className='hover:text-black'>Contact Us</li>
                    </NavLink>

                    <NavLink to="/my-profile" onClick={navBarToggle}>
                        <li className='hover:text-black'>Profile</li>
                    </NavLink>
                    <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
