import { useContext, useState, useEffect, useMemo } from 'react';
import { MapPin, Calendar, Users, Star, Filter, X, ChevronLeft, ChevronRight, Search, Clock, Award, Sparkles } from 'lucide-react';
import bannerimg from "../assets/banner.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;

const TourPackages = () => {
    const navigate = useNavigate();
    const { packageType } = useParams();
    const { formData, setFormData } = useContext(AppContext);

    const [packages, setPackages] = useState([]);
    const [selectedPackageType, setSelectedPackageType] = useState(packageType);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const packagesPerPage = 6;

    const [localFormData, setLocalFormData] = useState({
        fromCity: '',
        toCity: '',
        departureDate: '',
        guests: 1
    });

    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);
    const indexOfLastPackage = currentPage * packagesPerPage;
    const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    });

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket connected, id:', socket.id);
        });
        console.log("I am here in TourPackages.jsx");
        socket.on("bookingConfirmed", (booking) => {
            console.log("Booking confirmed received:", booking);
        });
        console.log("bookingConfirmed event listener set up");
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.off("bookingConfirmed");
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    useEffect(() => {
        setSelectedPackageType(packageType);
    }, [packageType]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/Auth/users/getTourPackages`)
            .then((result) => {
                setPackages(result.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching packages:", err);
                setLoading(false);
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

    const applyFilter = () => {
        let filtered = packages;
        if (selectedPackageType) filtered = filtered.filter(pkg => pkg.packageType === selectedPackageType);
        if (selectedDurations.length > 0) filtered = filtered.filter(pkg => selectedDurations.some(duration => pkg.location.includes(duration)));
        if (selectedRatings.length > 0) filtered = filtered.filter(pkg => selectedRatings.some(range => {
            const [min, max] = range.includes('+') ? [9, null] : range.split('-').map(Number);
            return pkg.rating >= min && (max === null ? pkg.rating >= min : pkg.rating < max);
        }));
        if (searchTriggered && localFormData.toCity.trim() !== "") filtered = filtered.filter(pkg => pkg.title.toLowerCase().includes(localFormData.toCity.toLowerCase()));
        return filtered;
    };

    const filteredPackages = useMemo(applyFilter, [selectedPackageType, packages, selectedDurations, selectedRatings, searchTriggered, localFormData.toCity]);
    const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);
    const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

    const handleTabClick = (newPackageType) => {
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
                setLocalFormData(prev => ({ ...prev, guests: guestsValue === "" ? "" : parseInt(guestsValue) }));
            }
        } else {
            setLocalFormData(prev => ({ ...prev, [name]: value }));
            if (name === "toCity") setSearchTriggered(false);
        }
    };

    const handleSearchClick = () => {
        const guests = localFormData.guests;
        const validatedGuests = guests === "" || guests < 1 || guests > 10 ? 1 : guests;
        setFormData({ ...localFormData, guests: validatedGuests });
        setSearchTriggered(true);
    };

    const handleDurationChange = (duration) => {
        setSelectedDurations(prev => prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]);
    };

    const handleRatingChange = (range) => {
        const rangeKey = range[0] === 9 && range[1] === 10 ? '9+' : `${range[0]}-${range[1]}`;
        setSelectedRatings(prev => prev.includes(rangeKey) ? prev.filter(r => r !== rangeKey) : [...prev, rangeKey]);
    };

    const SkeletonCard = () => (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-300 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
            </div>

            {/* Search Bar */}
            <div className="relative z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 md:p-8 shadow-2xl mt-12 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                        <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl p-4 w-full md:flex-1 shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <MapPin className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                            <input
                                type="text"
                                name="toCity"
                                value={localFormData.toCity}
                                onChange={handleInputChange}
                                placeholder="Where do you want to go?"
                                className="ml-3 w-full outline-none text-sm bg-transparent text-gray-700 placeholder-gray-500 font-medium"
                            />
                        </div>
                        <button
                            onClick={handleSearchClick}
                            className="w-full md:w-48 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                            <Search size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span>Search Tours</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <section className="relative z-10 overflow-hidden">
                <div className="relative">
                    <img
                        src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"
                        alt="Banner"
                        className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="absolute top-1/2 left-4 md:left-12 transform -translate-y-1/2 text-white animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        <span className="text-sm md:text-base font-medium text-yellow-400 uppercase tracking-wider">Premium Tours</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">
                        {formData.toCity ? `${formData.toCity} Packages` : 'Discover Amazing Tours'}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                        Explore breathtaking destinations with our curated travel experiences
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl mb-6 font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                        >
                            <Filter size={20} />
                            {isFilterOpen ? "Hide Filters" : "Show Filters"}
                        </button>

                        {/* Filter Panel */}
                        <div className={`${isFilterOpen ? "block" : "hidden"} lg:block bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 sticky top-6`}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Filter size={20} className="text-blue-600" />
                                    Filters
                                </h3>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Duration Filter */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-indigo-600" />
                                    Duration (Nights)
                                </h4>
                                <div className="space-y-3">
                                    {['4N', '5N', '6N', '7N', '8N'].map(duration => (
                                        <label key={duration} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedDurations.includes(duration)}
                                                onChange={() => handleDurationChange(duration)}
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                                            />
                                            <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 font-medium">
                                                {duration}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Award size={18} className="text-yellow-600" />
                                    Rating
                                </h4>
                                <div className="space-y-3">
                                    {[[9, 10, '9+'], [8, 9], [7, 8], [6, 7]].map(([min, max, label]) => (
                                        <label key={label || `${min}-${max}`} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedRatings.includes(label || `${min}-${max}`)}
                                                onChange={() => handleRatingChange([min, max])}
                                                className="w-5 h-5 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 transition-all duration-200"
                                            />
                                            <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 font-medium flex items-center gap-1">
                                                <Star size={14} className="text-yellow-500 fill-current" />
                                                {label || `${min} to ${max} Stars`}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">
                        {/* Package Type Tabs */}
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-8 border border-white/20">
                            <div className="flex flex-wrap justify-center lg:justify-around gap-4">
                                {["Group Tour", "Cruise Packages", "Family Specials"].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleTabClick(type)}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedPackageType === type
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {type.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Summary */}
                        <div className="mb-8 animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {filteredPackages.length} Tours Found
                            </h3>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                        </div>

                        {/* Packages Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                                        <SkeletonCard />
                                    </div>
                                ))}
                            </div>
                        ) : currentPackages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {currentPackages.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className="group animate-fade-in-up cursor-pointer"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                        onClick={() => navigate(`/package-detail/${item._id}`, { state: { price: item.price, Seatleft: item.Seatleft } })}
                                    >
                                        <div className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full flex flex-col border border-white/20">
                                            {/* Image Container */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={item.imageurl}
                                                    alt={item.title}
                                                    className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Rating Badge */}
                                                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold py-2 px-3 rounded-full shadow-lg flex items-center gap-1">
                                                    <Star size={12} className="fill-white" />
                                                    {item.rating}
                                                </div>

                                                {/* Seats Left Badge */}
                                                {item.Seatleft && (
                                                    <div className={`absolute bottom-4 left-4 text-white text-xs font-semibold py-1.5 px-3 rounded-full shadow-lg ${item.Seatleft > 10
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                                        : item.Seatleft > 5
                                                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                                            : 'bg-gradient-to-r from-red-500 to-pink-600'
                                                        }`}>
                                                        {item.Seatleft} seats left
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6 flex flex-col justify-between flex-grow">
                                                {/* Title and Location */}
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center text-gray-600 mb-4">
                                                        <MapPin size={14} className="mr-2 text-blue-500" />
                                                        <span className="text-sm font-medium">{item.location}</span>
                                                    </div>
                                                </div>

                                                {/* Highlights */}
                                                <div className="mb-6">
                                                    <ul className="space-y-2">
                                                        {item.highlights.flatMap((highlight) =>
                                                            highlight.split(',').map((point) => point.trim())
                                                        ).slice(0, 3).map((point, idx) => (
                                                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                                <span className="line-clamp-1">{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Price */}
                                                <div className="mt-auto">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-2xl font-bold text-gray-800">
                                                                    {item.currency} {item.price}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-500">{item.priceType}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center py-24 animate-fade-in">
                                <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-8">
                                    <Search size={80} className="text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Tours Found</h3>
                                <p className="text-lg text-gray-600 text-center max-w-md">
                                    Try adjusting your filters or search criteria to find the perfect tour for you.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 gap-2 animate-fade-in">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                                >
                                    <ChevronLeft size={20} className="text-gray-600" />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${currentPage === i + 1
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg hover:shadow-xl'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                                >
                                    <ChevronRight size={20} className="text-gray-600" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TourPackages;