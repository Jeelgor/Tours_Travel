import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/tours/admin/tours")
            .then((res) => {
                setTours(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tours:", err);
                setError("Failed to fetch tours. Please try again.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Loading State */}
            {loading && <p className="text-lg text-gray-600">Loading tours...</p>}

            {/* Error State */}
            {error && <p className="text-lg text-red-500">{error}</p>}

            {/* Tour Summary */}
            {!loading && !error && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Total Tours: <span className="text-blue-600">{tours.length}</span>
                    </h2>
                </div>
            )}

            {/* Tour Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                    <div
                        key={tour._id}
                        className="bg-white p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300 cursor-pointer"
                        onClick={() => navigate(`/UpdateTour?pkgId=${tour._id}`, { state: { price: tour.price, SeatLeft: tour.SeatLeft } })}
                    >
                        <img
                            src={tour.imageurl ? `${apiUrl}/${tour.imageurl.replace(/\\/g, '/')}` : ''}
                            alt={tour.title}
                            className="h-40 w-full object-cover rounded-md"
                        />
                        <h2 className="mt-3 text-xl font-semibold text-gray-800">{tour.title}</h2>
                        <p className="text-gray-600">{tour.location}</p>
                        <p className="text-blue-600 font-semibold mt-2">${tour.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
