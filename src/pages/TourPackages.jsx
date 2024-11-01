import { React, useContext, useState, useEffect, useMemo } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import bannerimg from "../assets/banner.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const TourPackages = () => {
    const [getData, setGetData] = useState([]);
    const navigate = useNavigate();
    const { formData, setFormData, packageDetails, allPackages } = useContext(AppContext);

    // Local state for form data (separate from context data)
    const [localFormData, setLocalFormData] = useState({
        fromCity: '',
        toCity: '',
        departureDate: '',
        guests: 1
    });

    const { packageType } = useParams()
    const [selectedPackageType, setSelectedPackageType] = useState(packageType);
    useEffect(() => {
        setSelectedPackageType(packageType);
    }, [packageType]);

    const applyFilter = () => {
        if (selectedPackageType) {
            const filteredIds = packageDetails
                .filter(detail => detail.packageType === selectedPackageType)
                .map(detail => detail._id);

            return allPackages.filter(pkg => filteredIds.includes(pkg._id));
        } else {
            return allPackages;
        }
    };

    const filteredPackages = useMemo(applyFilter, [selectedPackageType, allPackages, packageDetails]);

    const handleTabClick = (newPackageType) => {
        if (newPackageType === selectedPackageType) {
            setSelectedPackageType(null);
            navigate("/TourPackages");
        } else {
            setSelectedPackageType(newPackageType);
            navigate(`/TourPackages/${newPackageType}`);
        }
    };

    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);
    const formattedToday = today.toISOString().split('T')[0];
    const formattedNextMonth = oneMonthLater.toISOString().split('T')[0];

    useEffect(() => {
        setLocalFormData({
            fromCity: formData.fromCity || '',
            toCity: formData.toCity || '',
            departureDate: formData.departureDate || '',
            guests: formData.guests || 1,
        });

        axios.get("http://localhost:3000/Auth/users/getTourPackages")
            .then((result) => {
                setGetData(result.data);
            });
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "guests") {
            const guestsValue = value.trim();
            // Allow guests input to be blank or within 1-10 range while typing
            if (guestsValue === "" || (guestsValue >= 1 && guestsValue <= 10)) {
                setLocalFormData((prevData) => ({
                    ...prevData,
                    guests: guestsValue === "" ? "" : parseInt(guestsValue),
                }));
            }
        } else {
            setLocalFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSearchClick = () => {
        // Validate guests field on search click, set to 1 if out of range or blank
        const guests = localFormData.guests;
        const validatedGuests = guests === "" || guests < 1 || guests > 10 ? 1 : guests;

        // Update context with validated form data
        setFormData({ ...localFormData, guests: validatedGuests });
    };

    return (
        <>
            {/* Search Section */}
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
                        <button onClick={handleSearchClick} className='w-full h-full rounded-lg border-2 border-Skyblue bg-Skyblue text-white text-2xl text-center transform transition duration-150 ease-out hover:scale-105 hover:shadow-lg'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/* Packages Section */}
            <section className='relative'>
                <div>
                    <img src={bannerimg} alt="Banner" className="w-full h-auto" />
                </div>

                <div className='top-[70px] left-[100px] absolute'>
                    <h2 className='text-white text-3xl font-bold'>{formData.toCity && `${formData.toCity} Packages`}</h2>
                </div>

                <div className='absolute top-[240px] left-0 right-0 flex flex-col md:flex-row md:space-x-4 items-start z-10 px-4'>
                    <div className='w-full md:w-[277px] bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 p-4 rounded-lg shadow-lg'>
                        <p className='text-lg font-semibold'>Filters</p>
                        <hr className='my-4' />
                        <h2 className='text-xl font-bold'>Duration (in Nights)</h2>

                        <div className='mt-5 space-y-3'>
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
                        <div className='mt-5 space-y-3'>
                            <div className='flex items-center'>

                                <h2 className='font-bold text-2xl'>Popular Filter</h2>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="5N" />
                                <label htmlFor="5N" className='pl-2'>Pool</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="6N" />
                                <label htmlFor="6N" className='pl-2'>Breakfast Included</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="7N" />
                                <label htmlFor="7N" className='pl-2'>Hotel</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="7N" />
                                <label htmlFor="7N" className='pl-2'>Wi-Fi included</label>
                            </div>
                            <div className='flex items-center'>
                                <input type="checkbox" id="7N" />
                                <label htmlFor="7N" className='pl-2'>Resort</label>
                            </div>
                        </div>
                    </div>

                    {/* Packages Section */}
                    <div className='w-full mt-4 md:mt-0 bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 p-4 rounded-lg shadow-lg'>
                        <ul className='flex justify-around items-center'>
                            <li onClick={() => { handleTabClick("Group Tour") }} className={`text-lg font-semibold cursor-pointer ${
          selectedPackageType === "Group Tour" ? "text-blue-700" : "text-black"
        }`}>GROUP TOURS</li>
                            <li onClick={() => { handleTabClick("Cruise Packages") }} className={`text-lg font-semibold cursor-pointer ${
          selectedPackageType === "Cruise Packages" ? "text-blue-700" : "text-black"
        }`}>CRUISE PACKAGES</li>
                            <li onClick={() => { handleTabClick("Family Specials") }} className={`text-lg font-semibold cursor-pointer ${
          selectedPackageType === "Family Specials" ? "text-blue-700" : "text-black"
        }`}>FAMILY SPECIALS</li>
                        </ul>
                    </div>
                </div>
                <div className='ml-72 relative z-10 mb-8'>
                    <div className="container mx-auto px-4 mt-14">
                        {/* Conditional Rendering: If topPackages exists and has items, show the grid, otherwise show centered text */}
                        {filteredPackages && filteredPackages.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {filteredPackages.map((item) => (
                                    <div
                                        key={item._id}
                                        onClick={() => navigate(`/TourPackages-detail/${item._id}`)}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
                                    >
                                        {/* Image */}
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                // src={`http://localhost:3000/${item.imageurl.replace(/\\/g, "/")}`}
                                                alt={item.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200"></div>
                                        )}


                                        {/* Card Content */}
                                        <div className="p-4 flex flex-col justify-between flex-grow">
                                            {/* Title and Location */}
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {item.title}
                                                </h2>
                                                <p className="text-sm text-gray-600 mb-6">{item.location}</p>
                                            </div>

                                            {/* Highlights */}
                                            <ul className="text-sm text-gray-600 mb-4">
                                                {item.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="flex items-center">
                                                        <span className="mr-2">•</span> {highlight}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Rating and Price */}
                                            <div className="flex justify-between items-center mt-auto">
                                                <span className="bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-lg">
                                                    {item.rating}
                                                </span>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-gray-800">
                                                        {item.currency} {item.price}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{item.priceType}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Centered text when no packages are available
                            <div className="flex justify-center items-center w-full h-32">
                                <p className="text-center w-full text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                                    There Is Not Top Package Available Right Now
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