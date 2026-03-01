import React from 'react';
import { MapPin, Star } from 'lucide-react';

const TourPackageCard = ({ item, onClick }) => {
    return (
        <div
            className="group cursor-pointer h-full"
            onClick={onClick}
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
    );
};

export default TourPackageCard;
