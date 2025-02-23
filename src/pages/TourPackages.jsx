import { useContext, useState, useEffect, useMemo } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FiFilter } from "react-icons/fi";
import bannerimg from "../assets/banner.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 10;

const TourPackages = () => {
    const navigate = useNavigate();
    const { packageType } = useParams();
    const { formData, setFormData } = useContext(AppContext);

    // State management
    const [packages, setPackages] = useState([]);
    const [selectedPackageType, setSelectedPackageType] = useState(packageType);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false); // New state for mobile search
    const [localFormData, setLocalFormData] = useState({
        fromCity: '',
        toCity: '',
        departureDate: '',
        guests: 1
    });

    // Date calculations
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);
    const formattedToday = today.toISOString().split('T')[0];
    const formattedNextMonth = oneMonthLater.toISOString().split('T')[0];

    // Effects
    useEffect(() => {
        setSelectedPackageType(packageType);
    }, [packageType]);

    useEffect(() => {
        axios.get(`${apiUrl}/Auth/users/getTourPackages`)
            .then((result) => {
                setPackages(result.data);
            })
            .catch(err => {
                console.error("Error fetching packages:", err);
            });
    }, []);

    useEffect(() => {
        setLocalFormData({
            fromCity: formData.fromCity || '',
            toCity: formData.toCity || '',
            departureDate: formData.departureDate || '',
            guests: formData.guests || 1,
        });
    }, [formData]);

    // Filter logic
    const applyFilter = () => {
        let filtered = packages;

        if (selectedPackageType) {
            filtered = filtered.filter(pkg => pkg.packageType === selectedPackageType);
        }

        if (selectedDurations.length > 0) {
            filtered = filtered.filter(pkg => {
                const pkgDuration = pkg.duration ? pkg.duration.replace('N','') : '';
                return selectedDurations.some(duration => 
                    duration.replace('N','') === pkgDuration
                );
            });
        }

        if (selectedRatings.length > 0) {
            filtered = filtered.filter(pkg => {
                return selectedRatings.some(ratingRange => {
                    if (ratingRange === '9+') {
                        return pkg.rating >= 9;
                    } else {
                        const [min, max] = ratingRange.split('-').map(Number);
                        return pkg.rating >= min && pkg.rating < max;
                    }
                });
            });
        }

        if (searchTriggered && localFormData.toCity.trim() !== "") {
            filtered = filtered.filter(pkg =>
                pkg.title.toLowerCase().includes(localFormData.toCity.toLowerCase()) ||
                pkg.location.toLowerCase().includes(localFormData.toCity.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredPackages = useMemo(applyFilter, [
        selectedPackageType,
        packages,
        selectedDurations,
        selectedRatings,
        searchTriggered,
        localFormData.toCity
    ]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
    const paginatedPackages = filteredPackages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Event handlers
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const handleTabClick = (newPackageType) => {
        if (newPackageType === selectedPackageType) {
            setSelectedPackageType(null);
            navigate("/TourPackages");
        } else {
            setSelectedPackageType(newPackageType);
            navigate(`/TourPackages/${newPackageType}`);
        }
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "guests") {
            const guestsValue = value.trim();
            if (guestsValue === "" || (guestsValue >= 1 && guestsValue <= 10)) {
                setLocalFormData(prev => ({
                    ...prev,
                    guests: guestsValue === "" ? "" : parseInt(guestsValue),
                }));
            }
        } else {
            setLocalFormData(prev => ({
                ...prev,
                [name]: value,
            }));
            if (name === "toCity") {
                setSearchTriggered(false);
            }
        }
    };

    const handleSearchClick = () => {
        const guests = localFormData.guests;
        const validatedGuests = guests === "" || guests < 1 || guests > 10 ? 1 : guests;

        setFormData({ ...localFormData, guests: validatedGuests });
        setSearchTriggered(true);
        setCurrentPage(1);
        setShowSearchBar(false); // Close mobile search after searching
    };

    const handleDurationChange = (duration) => {
        setSelectedDurations(prev => 
            prev.includes(duration) 
                ? prev.filter(d => d !== duration)
                : [...prev, duration]
        );
        setCurrentPage(1);
    };

    const handleRatingChange = (range) => {
        const rangeKey = range[0] === 9 && range[1] === 10 ? '9+' : `${range[0]}-${range[1]}`;
        
        setSelectedRatings(prev => 
            prev.includes(rangeKey)
                ? prev.filter(r => r !== rangeKey)
                : [...prev, rangeKey]
        );
        setCurrentPage(1);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    return (
        <>
            {/* Search Bar - Desktop */}
            <div className='hidden md:flex h-[87px] bg-gradient-to-r from-Darkblue to-blue-700 justify-center items-center shadow-xl'>
                <div className='flex flex-wrap gap-4 transform hover:scale-[1.02] transition-transform duration-300 px-4'>
                    <div className='flex items-center bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                        <CiLocationOn className='text-blue-600 w-[24px] h-[24px]' />
                        <input
                            type="text"
                            name="fromCity"
                            value={localFormData.fromCity}
                            onChange={handleInputChange}
                            placeholder="From City"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-32'
                        />
                    </div>
                    <div className='flex items-center bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                        <CiLocationOn className='text-blue-600 w-[24px] h-[24px]' />
                        <input
                            type="text"
                            name="toCity"
                            value={localFormData.toCity}
                            onChange={handleInputChange}
                            placeholder="To City"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-32'
                        />
                    </div>
                    <div className='flex items-center bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                        <SlCalender className='text-blue-600 w-[24px] h-[24px]' />
                        <input
                            type="date"
                            name="departureDate"
                            min={formattedToday}
                            max={formattedNextMonth}
                            value={localFormData.departureDate}
                            onChange={handleInputChange}
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>
                    <div className='flex items-center bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                        <GoPeople className='text-blue-600 w-[24px] h-[24px]' />
                        <input
                            type="number"
                            name="guests"
                            value={localFormData.guests}
                            onChange={handleInputChange}
                            placeholder="People"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-20'
                        />
                    </div>
                    <button 
                        onClick={handleSearchClick} 
                        className='w-[200px] h-[48px] rounded-lg bg-gradient-to-r from-Skyblue to-blue-500 text-white text-xl font-semibold shadow-lg transform transition duration-300 ease-out hover:scale-105 hover:shadow-xl hover:from-blue-500 hover:to-Skyblue'
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Search Bar - Mobile */}
            <div className='md:hidden'>
                <button
                    onClick={toggleSearchBar}
                    className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg"
                >
                    <CiLocationOn size={24} />
                </button>

                {showSearchBar && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
                        <div className='bg-white p-4 mx-4 mt-16 rounded-xl'>
                            <div className='space-y-4'>
                                <div className='flex items-center bg-gray-100 px-4 py-3 rounded-lg'>
                                    <CiLocationOn className='text-blue-600 w-[24px] h-[24px]' />
                                    <input
                                        type="text"
                                        name="fromCity"
                                        value={localFormData.fromCity}
                                        onChange={handleInputChange}
                                        placeholder="From City"
                                        className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-full'
                                    />
                                </div>
                                <div className='flex items-center bg-gray-100 px-4 py-3 rounded-lg'>
                                    <CiLocationOn className='text-blue-600 w-[24px] h-[24px]' />
                                    <input
                                        type="text"
                                        name="toCity"
                                        value={localFormData.toCity}
                                        onChange={handleInputChange}
                                        placeholder="To City"
                                        className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-full'
                                    />
                                </div>
                                <div className='flex items-center bg-gray-100 px-4 py-3 rounded-lg'>
                                    <SlCalender className='text-blue-600 w-[24px] h-[24px]' />
                                    <input
                                        type="date"
                                        name="departureDate"
                                        min={formattedToday}
                                        max={formattedNextMonth}
                                        value={localFormData.departureDate}
                                        onChange={handleInputChange}
                                        className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-full'
                                    />
                                </div>
                                <div className='flex items-center bg-gray-100 px-4 py-3 rounded-lg'>
                                    <GoPeople className='text-blue-600 w-[24px] h-[24px]' />
                                    <input
                                        type="number"
                                        name="guests"
                                        value={localFormData.guests}
                                        onChange={handleInputChange}
                                        placeholder="People"
                                        className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400 w-full'
                                    />
                                </div>
                                <div className='flex justify-between gap-4'>
                                    <button
                                        onClick={() => setShowSearchBar(false)}
                                        className='flex-1 py-3 rounded-lg bg-gray-200 text-gray-700'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSearchClick}
                                        className='flex-1 py-3 rounded-lg bg-blue-600 text-white'
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <section className='relative'>
                <div className='h-[250px] md:h-[400px] overflow-hidden'>
                    <img src={bannerimg} alt="Banner" className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700" />
                </div>
                <div className='absolute top-[40px] md:top-[70px] left-[20px] md:left-[100px] z-10'>
                    <h2 className='text-white text-2xl md:text-4xl font-bold drop-shadow-lg'>
                        {formData.toCity ? `${formData.toCity} Packages` : 'All Packages'}
                    </h2>
                </div>

                {/* Mobile Filter Toggle Button */}
                <button 
                    onClick={toggleFilters}
                    className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg"
                >
                    <FiFilter size={24} />
                </button>

                <div className='absolute top-[180px] md:top-[240px] left-0 right-0 flex flex-col md:flex-row md:space-x-6 items-start z-10 px-4 md:px-6'>
                    {/* Filter Section */}
                    <div className={`${showFilters ? 'fixed inset-0 bg-black bg-opacity-50 z-50 md:relative md:bg-transparent' : 'hidden'} md:block`}>
                        <div className={`w-[300px] bg-white bg-opacity-95 backdrop-blur-xl border border-gray-200 p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:translate-y-[-5px] ${showFilters ? 'h-screen md:h-auto overflow-y-auto' : ''}`}>
                            <div className="flex justify-between items-center md:hidden">
                                <p className='text-xl font-bold text-gray-800'>Filters</p>
                                <button onClick={toggleFilters} className="text-gray-600">
                                    ✕
                                </button>
                            </div>
                            <p className='hidden md:block text-xl font-bold text-gray-800 mb-4'>Filters</p>
                            <hr className='my-4 border-gray-300' />
                            <h2 className='text-xl font-bold text-gray-800'>Duration (in Nights)</h2>
                            <div className='mt-5 space-y-4'>
                                {['4N', '5N', '6N', '7N', '8N'].map(duration => (
                                    <div key={duration} className='flex items-center'>
                                        <input 
                                            type="checkbox" 
                                            id={duration} 
                                            checked={selectedDurations.includes(duration)}
                                            onChange={() => handleDurationChange(duration)}
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor={duration} className='pl-3 text-gray-700 hover:text-gray-900 cursor-pointer'>{duration}</label>
                                    </div>
                                ))}
                            </div>

                            <hr className='my-6 border-gray-300' />
                            <h2 className='text-xl font-bold text-gray-800'>Rating</h2>
                            <div className='mt-5 space-y-4'>
                                {[
                                    { id: '9+', label: '9+ Rating', range: [9, 10] },
                                    { id: '8-9', label: '8 to 9 Stars', range: [8, 9] },
                                    { id: '7-8', label: '7 to 8 Stars', range: [7, 8] },
                                    { id: '6-7', label: '6 to 7 Stars', range: [6, 7] }
                                ].map(rating => (
                                    <div key={rating.id} className='flex items-center'>
                                        <input
                                            type="checkbox"
                                            id={rating.id}
                                            checked={selectedRatings.includes(rating.id)}
                                            onChange={() => handleRatingChange(rating.range)}
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor={rating.id} className='pl-3 text-gray-700 hover:text-gray-900 cursor-pointer'>{rating.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-4 md:mt-0 bg-white bg-opacity-95 backdrop-blur-xl border border-gray-200 p-4 md:p-6 rounded-xl shadow-2xl'>
                        <ul className='flex flex-wrap justify-around items-center gap-2 md:gap-4'>
                            {[
                                { type: "Group Tour", label: "GROUP TOURS" },
                                { type: "Cruise Package", label: "CRUISE PACKAGES" }, 
                                { type: "Family Special", label: "FAMILY SPECIALS" }
                            ].map(item => (
                                <li 
                                    key={item.type}
                                    onClick={() => handleTabClick(item.type)} 
                                    className={`text-sm md:text-lg font-bold cursor-pointer transition-all duration-300 px-3 md:px-6 py-2 md:py-3 rounded-lg ${
                                        selectedPackageType === item.type 
                                        ? "bg-blue-600 text-white shadow-lg transform -translate-y-1" 
                                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <div className='md:ml-72 relative z-10 mb-12'>
                    <div className="container mx-auto px-4 mt-14">
                        {filteredPackages && filteredPackages.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                                    {paginatedPackages.map((item) => (
                                        <div
                                            key={item._id}
                                            onClick={() => {
                                                navigate(`/package-detail/${item._id}`, { 
                                                    state: { 
                                                        price: item.price, 
                                                        Seatleft: item.Seatleft 
                                                    } 
                                                });
                                            }}
                                            className="bg-white rounded-xl overflow-hidden flex flex-col h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
                                        >
                                            {item.imageurl ? (
                                                <div className="relative overflow-hidden h-48">
                                                    <img
                                                        src={`${apiUrl}/${item.imageurl.replace(/\\/g, '/')}`}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                                            )}

                                            <div className="p-4 md:p-5 flex flex-col justify-between flex-grow">
                                                <div>
                                                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                                        {item.title}
                                                    </h2>
                                                    <p className="text-sm text-blue-600 font-medium mb-4">{item.location}</p>
                                                </div>

                                                <ul className="text-sm text-gray-600 mb-4 space-y-2">
                                                    {item.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="flex items-center">
                                                            <span className="mr-2 text-blue-500">•</span> 
                                                            <span className="line-clamp-1">{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                                                    <span className={`text-white text-sm font-medium py-1.5 px-3 rounded-lg ${
                                                        item.rating >= 9 ? 'bg-green-500' :
                                                        item.rating >= 8 ? 'bg-blue-500' :
                                                        item.rating >= 7 ? 'bg-yellow-500' : 'bg-orange-500'
                                                    }`}>
                                                        {item.rating}
                                                    </span>
                                                    <div className="text-right">
                                                        <p className="text-base md:text-lg font-bold text-gray-800">
                                                            {item.currency} {item.price}
                                                        </p>
                                                        {item.Seatleft && (
                                                            <p className="text-xs md:text-sm font-medium text-red-500">
                                                                Only {item.Seatleft} seats left!
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center mt-8 space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                                            currentPage === 1
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <button
                                            key={idx + 1}
                                            onClick={() => handlePageChange(idx + 1)}
                                            className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                                                currentPage === idx + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base ${
                                            currentPage === totalPages
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center w-full h-96 mb-28">
                                <p className="text-center w-full text-xl md:text-2xl font-bold text-gray-800 animate-pulse">
                                    No Packages Available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TourPackages;