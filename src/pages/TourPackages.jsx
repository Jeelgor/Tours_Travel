import { useContext, useState, useEffect, useMemo } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { FiFilter } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const apiUrl = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 8;

const TourPackages = () => {
    const navigate = useNavigate();
    const { packageType } = useParams();
    const { setFormData } = useContext(AppContext);

    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);
    const formattedToday = today.toISOString().split('T')[0];
    const formattedNextMonth = oneMonthLater.toISOString().split('T')[0];

    // State management
    const [packages, setPackages] = useState([]);
    const [selectedPackageType, setSelectedPackageType] = useState(packageType);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [localFormData, setLocalFormData] = useState({
        fromCity: '',
        toCity: '',
        departureDate: '',
        guests: 1
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Theme toggle effect
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    // Fetch packages with loading state
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${apiUrl}/Auth/users/getTourPackages`)
            .then((result) => {
                setPackages(result.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching packages:", err);
                setIsLoading(false);
            });
    }, []);

    // Filter logic with memoization
    const filteredPackages = useMemo(() => {
        let filtered = packages;

        if (selectedPackageType) {
            filtered = filtered.filter(pkg => pkg.packageType === selectedPackageType);
        }

        if (selectedDurations.length > 0) {
            filtered = filtered.filter(pkg => 
                selectedDurations.some(duration => pkg.location.includes(duration))
            );
        }

        if (selectedRatings.length > 0) {
            filtered = filtered.filter(pkg => 
                selectedRatings.some(range => {
                    const [min, max] = range.includes('+') ? [9, null] : range.split('-').map(Number);
                    return pkg.rating >= min && (max === null ? pkg.rating >= min : pkg.rating < max);
                })
            );
        }

        if (searchTriggered && localFormData.toCity.trim() !== "") {
            filtered = filtered.filter(pkg =>
                pkg.title.toLowerCase().includes(localFormData.toCity.toLowerCase())
            );
        }

        return filtered;
    }, [selectedPackageType, packages, selectedDurations, selectedRatings, searchTriggered, localFormData.toCity]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
    const paginatedPackages = filteredPackages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Pagination component
    const Pagination = () => (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                    currentPage === 1 
                        ? 'bg-gray-200 text-gray-500' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
            >
                Previous
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-10 h-10 rounded-lg ${
                        currentPage === idx + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    } transition-colors`}
                >
                    {idx + 1}
                </button>
            ))}
            
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-500' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}
            >
                Next
            </button>
        </div>
    );

    // Event handlers
    const handlePackageTypeChange = (newPackageType) => {
        if (newPackageType === selectedPackageType) {
            setSelectedPackageType(null);
            navigate("/TourPackages");
        } else {
            setSelectedPackageType(newPackageType);
            navigate(`/TourPackages/${newPackageType}`);
        }
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
    };

    const handleDurationChange = (duration) => {
        setSelectedDurations(prev => 
            prev.includes(duration) 
                ? prev.filter(d => d !== duration)
                : [...prev, duration]
        );
    };

    const handleRatingChange = (range) => {
        const rangeKey = range[0] === 9 && range[1] === 10 ? '9+' : `${range[0]}-${range[1]}`;
        
        setSelectedRatings(prev => 
            prev.includes(rangeKey)
                ? prev.filter(r => r !== rangeKey)
                : [...prev, rangeKey]
        );
    };

    // Filter section component
    const FilterSection = () => (
        <div className="space-y-6">
            {/* Search Section */}
            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        name="fromCity"
                        value={localFormData.fromCity}
                        onChange={handleInputChange}
                        placeholder="From City"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    />
                    <CiLocationOn className="absolute right-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                    <input
                        type="text"
                        name="toCity"
                        value={localFormData.toCity}
                        onChange={handleInputChange}
                        placeholder="To City"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    />
                    <CiLocationOn className="absolute right-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                    <input
                        type="date"
                        name="departureDate"
                        value={localFormData.departureDate}
                        onChange={handleInputChange}
                        min={formattedToday}
                        max={formattedNextMonth}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    />
                    <SlCalender className="absolute right-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                    <input
                        type="number"
                        name="guests"
                        value={localFormData.guests}
                        onChange={handleInputChange}
                        placeholder="Number of Guests"
                        min="1"
                        max="10"
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    />
                    <GoPeople className="absolute right-3 top-3 text-gray-400" />
                </div>

                <button
                    onClick={handleSearchClick}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Duration Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Duration</h3>
                <div className="space-y-2">
                    {['1-3 Days', '4-6 Days', '7-9 Days', '10+ Days'].map((duration) => (
                        <label key={duration} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedDurations.includes(duration)}
                                onChange={() => handleDurationChange(duration)}
                                className="rounded text-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{duration}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Rating</h3>
                <div className="space-y-2">
                    {[
                        { label: '9+ Exceptional', range: [9, 10] },
                        { label: '8-9 Excellent', range: [8, 9] },
                        { label: '7-8 Very Good', range: [7, 8] },
                        { label: '6-7 Good', range: [6, 7] }
                    ].map((rating) => (
                        <label key={rating.label} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedRatings.includes(
                                    rating.range[0] === 9 ? '9+' : `${rating.range[0]}-${rating.range[1]}`
                                )}
                                onChange={() => handleRatingChange(rating.range)}
                                className="rounded text-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{rating.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    // Add package type tabs to the main content area
    const PackageTypeTabs = () => (
        <div className="mb-6">
            <div className="flex space-x-4">
                {['Group Tour', 'Cruise Packages', 'Family Specials'].map((type) => (
                    <button
                        key={type}
                        onClick={() => handlePackageTypeChange(type)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedPackageType === type
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
                >
                    <FiFilter size={24} />
                </button>
            </div>

            {/* Sidebar - Hidden on mobile unless opened */}
            <div className={`fixed inset-y-0 left-0 transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 bg-white dark:bg-gray-800 shadow-lg`}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold dark:text-white">Filters</h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                            >
                                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                            </button>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                            >
                                <IoMdClose className="text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>
                    <FilterSection />
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64 p-4 lg:p-6">
                {/* Add Package Type Tabs */}
                <PackageTypeTabs />

                {/* Overlay for mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Package grid with loading state and animations */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center h-64"
                        >
                            <div className="loader">Loading...</div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {paginatedPackages.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                >
                                    {item.imageurl ? (
                                        <img
                                            src={`${apiUrl}/${item.imageurl.replace(/\\/g, '/')}`}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200"></div>
                                    )}

                                    <div className="p-4 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-6">{item.location}</p>
                                        </div>

                                        <ul className="text-sm text-gray-600 mb-4">
                                            {item.highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <span className="mr-2">•</span> {highlight}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-lg">
                                                {item.rating}
                                            </span>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-800">
                                                    {item.currency} {item.price}
                                                </p>
                                                {item.SeatLeft !== undefined && (
                                                    <div className="flex items-center justify-end mt-2">
                                                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                                            item.SeatLeft > 10 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : item.SeatLeft > 5 
                                                                    ? 'bg-yellow-100 text-yellow-800' 
                                                                    : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {item.SeatLeft} seats left
                                                        </span>
                                                        {item.SeatLeft <= 5 && (
                                                            <span className="text-xs text-red-500 font-medium ml-2">
                                                                Hurry up!
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {!isLoading && filteredPackages.length > 0 && <Pagination />}
            </div>
        </div>
    );
};

export default TourPackages;