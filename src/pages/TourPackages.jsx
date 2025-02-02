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

    // State management
    const [packages, setPackages] = useState([]);
    const [selectedPackageType, setSelectedPackageType] = useState(packageType);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);
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
    };

    const filteredPackages = useMemo(applyFilter, [
        selectedPackageType, 
        packages, 
        selectedDurations, 
        selectedRatings, 
        searchTriggered, 
        localFormData.toCity
    ]);

    // Event handlers
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

    return (
        <>
            <div className='h-[87px] bg-Darkblue flex justify-center items-center'>
                <div className='flex space-x-4'>
                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <CiLocationOn className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="text"
                            name="fromCity"
                            value={localFormData.fromCity}
                            onChange={handleInputChange}
                            placeholder="From City"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>
                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <CiLocationOn className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="text"
                            name="toCity"
                            value={localFormData.toCity}
                            onChange={handleInputChange}
                            placeholder="To City"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>
                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <SlCalender className='text-Darkblue w-[24px] h-[24px]' />
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
                    <div className='flex items-center bg-white px-3 py-2 rounded-md'>
                        <GoPeople className='text-Darkblue w-[24px] h-[24px]' />
                        <input
                            type="number"
                            name="guests"
                            value={localFormData.guests}
                            onChange={handleInputChange}
                            placeholder="People"
                            className='ml-2 outline-none border-none text-sm bg-transparent placeholder-gray-400'
                        />
                    </div>
                    <div className='w-[200px] h-[41px]'>
                        <button 
                            onClick={handleSearchClick} 
                            className='w-full h-full rounded-lg border-2 border-Skyblue bg-Skyblue text-white text-2xl text-center transform transition duration-150 ease-out hover:scale-105 hover:shadow-lg'
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <section className='relative'>
                <div>
                    <img src={bannerimg} alt="Banner" className="w-full h-auto" />
                </div>
                <div className='top-[70px] left-[100px] absolute'>
                    <h2 className='text-white text-3xl font-bold'>
                        {formData.toCity ? `${formData.toCity} Packages` : 'All Packages'}
                    </h2>
                </div>

                <div className='absolute top-[240px] left-0 right-0 flex flex-col md:flex-row md:space-x-4 items-start z-10 px-4'>
                    <div className='w-full md:w-[277px] bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 p-4 rounded-lg shadow-lg'>
                        <p className='text-lg font-semibold'>Filters</p>
                        <hr className='my-4' />
                        <h2 className='text-xl font-bold'>Duration (in Nights)</h2>
                        <div className='mt-5 space-y-3'>
                            <div className='flex items-center'>
                                <input type="checkbox" id="4N" checked={selectedDurations.includes('4N')} onChange={() => handleDurationChange('4N')} />
                                <label htmlFor="4N" className='pl-2'>4N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="5N" checked={selectedDurations.includes('5N')} onChange={() => handleDurationChange('5N')} />
                                <label htmlFor="5N" className='pl-2'>5N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="6N" checked={selectedDurations.includes('6N')} onChange={() => handleDurationChange('6N')} />
                                <label htmlFor="6N" className='pl-2'>6N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="7N" checked={selectedDurations.includes('7N')} onChange={() => handleDurationChange('7N')} />
                                <label htmlFor="7N" className='pl-2'>7N</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="8N" checked={selectedDurations.includes('8N')} onChange={() => handleDurationChange('8N')} />
                                <label htmlFor="8N" className='pl-2'>8N</label>
                            </div>
                        </div>

                        <hr className='my-4' />
                        <h2 className='text-xl font-bold'>Rating</h2>
                        <div className='mt-5 space-y-3'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id="9+"
                                    checked={selectedRatings.includes('9+')}
                                    onChange={() => handleRatingChange([9, 10])}
                                />
                                <label htmlFor="9+" className='pl-2'>9+ Rating</label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id="8-9"
                                    checked={selectedRatings.includes('8-9')}
                                    onChange={() => handleRatingChange([8, 9])}
                                />
                                <label htmlFor="8-9" className='pl-2'>8 to 9 Stars</label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id="7-8"
                                    checked={selectedRatings.includes('7-8')}
                                    onChange={() => handleRatingChange([7, 8])}
                                />
                                <label htmlFor="7-8" className='pl-2'>7 to 8 Stars</label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id="6-7"
                                    checked={selectedRatings.includes('6-7')}
                                    onChange={() => handleRatingChange([6, 7])}
                                />
                                <label htmlFor="6-7" className='pl-2'>6 to 7 Stars</label>
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-4 md:mt-0 bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 p-4 rounded-lg shadow-lg'>
                        <ul className='flex justify-around items-center'>
                            <li 
                                onClick={() => handleTabClick("Group Tour")} 
                                className={`text-lg font-semibold cursor-pointer ${selectedPackageType === "Group Tour" ? "text-blue-700" : "text-black"}`}
                            >
                                GROUP TOURS
                            </li>
                            <li 
                                onClick={() => handleTabClick("Cruise Packages")} 
                                className={`text-lg font-semibold cursor-pointer ${selectedPackageType === "Cruise Packages" ? "text-blue-700" : "text-black"}`}
                            >
                                CRUISE PACKAGES
                            </li>
                            <li 
                                onClick={() => handleTabClick("Family Specials")} 
                                className={`text-lg font-semibold cursor-pointer ${selectedPackageType === "Family Specials" ? "text-blue-700" : "text-black"}`}
                            >
                                FAMILY SPECIALS
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <div className='ml-72 relative z-10 mb-12'>
                    <div className="container mx-auto px-4 mt-14">
                        {filteredPackages && filteredPackages.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {filteredPackages.map((item) => (
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
                                        className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
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
                                                    {item.Seatleft && (
                                                        <p className="text-sm text-gray-500">
                                                            {item.Seatleft} seats left
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center w-full h-96 mb-28">
                                <p className="text-center w-full text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
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