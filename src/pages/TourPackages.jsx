import { useContext, useState, useEffect, useMemo } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import bannerimg from "../assets/banner.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

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
    const formattedToday = today.toISOString().split('T')[0];
    const formattedNextMonth = oneMonthLater.toISOString().split('T')[0];
    const indexOfLastPackage = currentPage * packagesPerPage;
    const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;

    useEffect(() => {
        setSelectedPackageType(packageType);
    }, [packageType]);

    useEffect(() => {
        axios.get(`${apiUrl}/Auth/users/getTourPackages`)
            .then((result) => setPackages(result.data))
            .catch(err => console.error("Error fetching packages:", err));
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

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Search Bar - Non-Sticky */}
            <div className="bg-blue-900 p-4 md:p-6 shadow-md mt-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-4 items-center">
                    {[
                        { icon: <CiLocationOn className="w-6 h-6 text-white" />, name: "toCity", placeholder: "To City" },
                    ].map((field, idx) => (
                        <div key={idx} className="flex items-center bg-white rounded-md p-2 w-full md:flex-1">
                            {field.icon}
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={localFormData[field.name]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                min={field.min}
                                max={field.max}
                                className="ml-2 w-full outline-none text-sm bg-transparent text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSearchClick}
                        className="w-full md:w-40 h-12 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-transform transform hover:scale-105"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Banner Section */}
            <section className="relative">
                <img src={bannerimg} alt="Banner" className="w-full h-64 md:h-80 object-cover" />
                <div className="absolute top-8 left-4 md:left-12 text-white">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        {formData.toCity ? `${formData.toCity} Packages` : 'All Packages'}
                    </h2>
                </div>
            </section>

            {/* Filters and Tabs */}
            <section className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
                {/* Filters (Collapsible on Mobile) */}
                <div className="md:w-1/4">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="md:hidden w-full bg-sky-500 text-white p-2 rounded-md mb-4"
                    >
                        {isFilterOpen ? "Hide Filters" : "Show Filters"}
                    </button>
                    <div className={`${isFilterOpen ? "block bg-white" : "hidden"
                        } md:block bg-white p-4 rounded-md shadow-md`}>
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <hr className="my-4" />
                        <h4 className="text-md font-bold">Duration (in Nights)</h4>
                        {['4N', '5N', '6N', '7N', '8N'].map(duration => (
                            <div key={duration} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={duration}
                                    checked={selectedDurations.includes(duration)}
                                    onChange={() => handleDurationChange(duration)}
                                    className="mr-2"
                                />
                                <label htmlFor={duration}>{duration}</label>
                            </div>
                        ))}
                        <hr className="my-4" />
                        <h4 className="text-md font-bold">Rating</h4>
                        {[[9, 10, '9+'], [8, 9], [7, 8], [6, 7]].map(([min, max, label]) => (
                            <div key={label || `${min}-${max}`} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={label || `${min}-${max}`}
                                    checked={selectedRatings.includes(label || `${min}-${max}`)}
                                    onChange={() => handleRatingChange([min, max])}
                                    className="mr-2"
                                />
                                <label htmlFor={label || `${min}-${max}`}>{label || `${min} to ${max} Stars`}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs and Packages */}
                <div className="md:w-3/4">
                    <ul className="flex flex-wrap justify-around bg-white p-4 rounded-md shadow-md mb-6">
                        {["Group Tour", "Cruise Packages", "Family Specials"].map(type => (
                            <li
                                key={type}
                                className={`text-sm md:text-lg font-semibold cursor-pointer p-2 ${selectedPackageType === type ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-700"}`}
                            >
                                {type.toUpperCase()}
                            </li>
                        ))}
                    </ul>

                    {/* Packages Grid */}
                    {currentPackages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentPackages.map(item => (
                                <div
                                    key={item._id}
                                    onClick={() => navigate(`/package-detail/${item._id}`, { state: { price: item.price, Seatleft: item.Seatleft } })}
                                    className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={item.imageurl ? `${item.imageurl.replace(/\\/g, '/')}` : "https://via.placeholder.com/150"}
                                        alt={item.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.location}</p>
                                        <ul className="text-sm text-gray-600 my-2 list-disc pl-5 space-y-1">
                                            {item.highlights.flatMap((highlight) =>
                                                highlight.split(',').map((point) => point.trim())
                                            ).map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-between items-center">
                                            <span className="bg-green-500 text-white text-xs py-1 px-2 rounded">{item.rating}</span>
                                            <div className="text-right">
                                                <p className="text-md font-bold">{item.currency} {item.price}</p>
                                                {item.Seatleft && (
                                                    <span className={`text-xs ${item.Seatleft > 10 ? 'text-green-600' : item.Seatleft > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                        {item.Seatleft} seats left
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-600 py-10">No Packages Available</p>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TourPackages;