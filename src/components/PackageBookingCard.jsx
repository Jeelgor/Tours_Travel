import React from 'react';
import { Minus, Plus, AlertCircle, ArrowRight, Shield, CheckCircle, Award } from 'lucide-react';

const PackageBookingCard = ({
    price,
    totalPrice,
    numTravellers,
    setNumTravellers,
    seatLeft,
    handleBooking
}) => {
    return (
        <div className="sticky top-32">
            <section id="price-details" className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in-up">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Your Adventure</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-6">
                    {/* Price Display */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-700">Price per person</span>
                            <span className="text-2xl font-bold text-blue-600">₹{price || '0'}</span>
                        </div>

                        {/* Travellers Counter */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-700">Travellers</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setNumTravellers(Math.max(1, numTravellers - 1))}
                                    className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <Minus size={16} className="text-gray-600" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{numTravellers}</span>
                                <button
                                    onClick={() => setNumTravellers(numTravellers + 1)}
                                    className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <Plus size={16} className="text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="border-t border-blue-200 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-800">Total Price</span>
                                <span className="text-3xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Button */}
                    {seatLeft <= 0 ? (
                        <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-red-800 mb-2">Fully Booked</h3>
                            <p className="text-red-600">
                                Sorry, this package is currently full. We'll notify you when seats become available.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <button
                                onClick={handleBooking}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
                            >
                                <span>Book Now</span>
                                <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                            {seatLeft <= 10 && (
                                <div className="flex items-center justify-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg">
                                    <AlertCircle size={16} />
                                    <span className="font-semibold text-sm">
                                        Hurry! Only {seatLeft} seats left
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <Shield size={24} className="text-green-600 mx-auto mb-2" />
                            <span className="text-xs text-gray-600 font-medium">Secure Booking</span>
                        </div>
                        <div className="text-center">
                            <CheckCircle size={24} className="text-blue-600 mx-auto mb-2" />
                            <span className="text-xs text-gray-600 font-medium">Instant Confirmation</span>
                        </div>
                        <div className="text-center">
                            <Award size={24} className="text-purple-600 mx-auto mb-2" />
                            <span className="text-xs text-gray-600 font-medium">Best Price</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PackageBookingCard;
