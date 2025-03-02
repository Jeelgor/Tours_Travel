import React from 'react';

const SeatAvailability = ({ seats, showHurryUp = true, className = '' }) => {
    const getStatusColor = (seats) => {
        if (seats > 10) return 'bg-green-100 text-green-800';
        if (seats > 5) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(seats)}`}>
                {seats} seats left
            </span>
            {showHurryUp && seats <= 5 && (
                <span className="text-xs text-red-500 font-medium ml-2">
                    Hurry up!
                </span>
            )}
        </div>
    );
};

export default SeatAvailability; 