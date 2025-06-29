import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, Heart, ArrowRight } from 'lucide-react';

const TopPackage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${apiUrl}/Auth/users/getTourPackages`);
        setPackages(result.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [apiUrl]);

  const toggleFavorite = (e, packageId) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(packageId)) {
      newFavorites.delete(packageId);
    } else {
      newFavorites.add(packageId);
    }
    setFavorites(newFavorites);
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

      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Discover Amazing Tours
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore breathtaking destinations and create unforgettable memories with our handpicked tour packages
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {[...Array(10)].map((_, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {packages.slice(0, 10).map((item, index) => (
              <div
                key={item._id}
                className="group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  navigate(`/package-detail/${item._id}`, { state: { price: item.price } });
                }}
              >
                <div className="bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full flex flex-col border border-gray-100">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageurl ? `${item.imageurl.replace(/\\/g, '/')}` : "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
                      alt={item.title}
                      className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, item._id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        size={16}
                        className={`transition-colors duration-300 ${favorites.has(item._id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600 hover:text-red-500'
                          }`}
                      />
                    </button>

                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white text-sm font-semibold py-1.5 px-3 rounded-full shadow-lg flex items-center gap-1">
                      <Star size={12} className="fill-white" />
                      {item.rating}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    {/* Title and Location */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin size={14} className="mr-1 text-blue-500" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <ul className="space-y-1.5">
                        {item.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                        {item.highlights.length > 3 && (
                          <li className="text-sm text-blue-500 font-medium">
                            +{item.highlights.length - 3} more highlights
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-800">
                              {item.currency} {item.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{item.priceType}</p>
                        </div>
                      </div>

                      {/* Book Now Button */}
                      <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl font-semibold transform transition-all duration-300 hover:from-blue-700 hover:to-teal-700 hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                        <span>Book Now</span>
                        <ArrowRight size={16} className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-24 animate-fade-in">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-8">
              <Calendar size={80} className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Tours Available</h3>
            <p className="text-lg text-gray-600 text-center max-w-md">
              We're currently updating our tour packages. Please check back soon for amazing travel opportunities!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPackage;