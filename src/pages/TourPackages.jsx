import { React, Image } from 'react';
import Navbar from '../components/NavBar';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import bannerimg from "../assets/banner.png";

const TourPackages = () => {
    return (
        <>
            <Navbar />
            <div className='h-[87px] bg-Darkblue flex justify-center items-center'>
                <div className='flex space-x-4'>

                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <CiLocationOn className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="text"
                            placeholder="From City"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>

                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <CiLocationOn className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="text"
                            placeholder="To City"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>

                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <SlCalender className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="date"
                            placeholder="Select Date"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>

                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <GoPeople className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="number"
                            placeholder="People"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>
                    <div className='w-[200px] h-[41px]'>
                        <button className='w-full h-full rounded-lg border-2 border-Skyblue bg-Skyblue text-white text-2xl text-center transform transition duration-150 ease-out hover:scale-105 hover:shadow-lg'>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* section 2 banner */}
            <section className='relative'>
                <div>
                    <img src={bannerimg} alt="Banner" className="w-full h-auto" />
                </div>
                <div className='top-[70px] left-[100px] absolute'>
                    <h2 className='text-white text-3xl font-bold'>Singapore Packages</h2>
                </div>

                {/* Container for Filters and Packages */}
                <div className='flex flex-col md:flex-row md:space-x-4 mt-[240px]'>
                    {/* Filter Sidebar */}
                    <div className='w-full md:w-[277px] h-auto rounded-lg border-2 border-black bg-white p-4'>
                        <p className='text-lg font-semibold'>Filters</p>
                        <hr />
                        <h2 className='text-2xl font-bold pt-5'>Duration (in Nights)</h2>

                        <div className='mt-5'>
                            <div className='flex items-center'>
                                <input type="checkbox" id="4N" />
                                <label htmlFor="4N" className='pl-2'>4N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="5N" />
                                <label htmlFor="5N" className='pl-2'>5N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="6N" />
                                <label htmlFor="6N" className='pl-2'>6N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="7N" />
                                <label htmlFor="7N" className='pl-2'>7N</label>
                            </div>
                        </div>
                    </div>

                    {/* Packages Section */}
                    <div className='mt-4 md:mt-0 w-full rounded-lg border-2 border-black bg-white p-4'>
                        <div className='flex space-x-7 justify-center items-center'>
                            <p>ALL PACKAGES (66)</p>
                            <p>ALL PACKAGES (66)</p>
                            <p>ALL PACKAGES (66)</p>
                            <p>ALL PACKAGES (66)</p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};

export default TourPackages;
