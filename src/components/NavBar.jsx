import React, { useState } from 'react'
import { assets } from '../assets/asset'
import { NavLink, useNavigate } from 'react-router-dom'
import { faXmark, faBars, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false)

    const navBarToggle = () => {
        setIsNavOpen(!isNavOpen);
    }
    return (
        <>
            <nav className='px-4 py-2'>
                <section className='flex justify-between items-center relative z-30'>

                    {/* logo */}
                    <div className={`w-[9vmin] sm:w-[8vmin]`}>
                        <img src="icon.jpg" alt="" />
                    </div>

                    {/* menu */}
                    <ul className={`hidden sm:flex justify-between gap-6`}>
                        <NavLink to="/homepage">
                            <li>Home</li>
                            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 mx-auto mt-1 hidden' />
                        </NavLink>
                        <NavLink to="/package">
                            <li>All Packages</li>
                            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 mx-auto mt-1 hidden' />
                        </NavLink>
                        <NavLink to="/about">
                            <li>About Us</li>
                            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 mx-auto mt-1 hidden' />
                        </NavLink>
                        <NavLink to="/contact">
                            <li>Contact Us</li>
                            <hr className='border-none outline-none h-0.5 bg-blue-600 w-3/5 mx-auto mt-1 hidden' />
                        </NavLink>
                    </ul>

                    {/* profile */}
                    <div className={`flex`}>

                        {
                            token
                                ?
                                <div className="hidden sm:flex items-center gap-2 group relative cursor-pointer">
                                    <img className="w-8 sm:w-[4vmin] cursor-pointer" src={assets.avatar} alt="Profile" />
                                    <img className="w-8 sm:w-[4vmin] cursor-pointer" src={assets.arrows} alt="Dropdown" />

                                    {/* Dropdown menu */}
                                    <div className='absolute top-0 right-0 pt-14 hidden group-hover:block'>
                                        <div className="min-w-[150px] max-h-[200px] bg-stone-50 ">
                                            <p onClick={() => navigate('/my-profile')} className=" px-4 py-2 cursor-pointer font-semibold hover:text-black text-gray-400 ">My Profile</p>
                                            <p onClick={() => navigate('/my-package')} className=" px-4 py-2 cursor-pointer font-semibold hover:text-black text-gray-400 ">My Packages</p>
                                            <p onClick={() => setToken(false)} className=" px-4 py-2 cursor-pointer font-semibold hover:text-black text-gray-400 ">Logout</p>
                                        </div>
                                    </div>
                                </div>
                                : <div>
                                    <button onClick={() => navigate('/')} className='bg-blue-400 px-6 py-2 rounded-full text-sm text-white font-semibold '>Create Account</button>
                                </div>
                        }
                        <FontAwesomeIcon className='w-8 h-8 ml-4 sm:hidden' icon={isNavOpen ? faXmark : faBars} onClick={navBarToggle} />
                    </div>
                </section>

                <div
                    className={`fixed top-0 right-0 h-full bg-navbar_color w-[100%] z-20 transform ${isNavOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out sm:hidden flex justify-center py-28`}
                >
                    <ul className='flex flex-col gap-8 items-center text-white font-bold text-2xl'>
                        <NavLink to="/homepage" onClick={navBarToggle}>
                            <li className='hover:text-black'>Home</li>
                        </NavLink>
                        <NavLink to="/package" onClick={navBarToggle}>
                            <li className='hover:text-black'>All Packages</li>
                        </NavLink>
                        <NavLink to="/about" onClick={navBarToggle}>
                            <li className='hover:text-black'>About Us</li>
                        </NavLink>
                        <NavLink to="/contact" onClick={navBarToggle}>
                            <li className='hover:text-black'>Contact Us</li>
                        </NavLink>
                        {
                            token ?
                                <>
                                    <NavLink to="/my-profile" onClick={navBarToggle}>
                                        <li className='hover:text-black'>Profile</li>
                                    </NavLink>
                                    <p onClick={()=>{setToken(false); navBarToggle()}} className='hover:text-black'>Logout</p>
                                </>
                            : ''
                        }
                    </ul>
                </div>

            </nav>
        </>
    )
}

export default NavBar;