import React from 'react';
import { Filter, X, Clock, Award, Star } from 'lucide-react';

const TourFilterSidebar = ({
    isFilterOpen,
    setIsFilterOpen,
    selectedDurations,
    handleDurationChange,
    selectedRatings,
    handleRatingChange
}) => {
    return (
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
    );
};

export default TourFilterSidebar;
