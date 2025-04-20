import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/tours/admin/tours")
            .then((res) => {
                setTours(res.data);
                setFilteredTours(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tours:", err);
                setError("Failed to fetch tours. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = tours.filter((tour) =>
            tour.title.toLowerCase().includes(query) ||
            tour.location.toLowerCase().includes(query)
        );
        setFilteredTours(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* --- NAVBAR --- */}
            <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>
                <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
                    {/* <Link to="/admin-dashboard" className="hover:text-blue-600">Dashboard</Link> */}
                    <Link to="/usersbookings" className="hover:text-blue-600">Bookings</Link>
                    {/* <Link to="/" className="hover:text-blue-600">Home</Link> */}
                </div>
            </nav>

            {/* --- CONTENT AREA --- */}
            <div className="p-8">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search tours by title or location..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Loading / Error */}
                {loading && <p className="text-lg text-gray-600">Loading tours...</p>}
                {error && <p className="text-lg text-red-500">{error}</p>}

                {/* Tour Summary */}
                {!loading && !error && (
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Total Tours: <span className="text-blue-600">{filteredTours.length}</span>
                        </h2>
                    </div>
                )}

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTours.length > 0 ? (
                        filteredTours.map((tour) => (
                            <div
                                key={tour._id}
                                className="bg-white p-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300 cursor-pointer"
                            >
                                <img
                                    src={tour.imageurl ? `${apiUrl}/${tour.imageurl.replace(/\\/g, "/")}` : ""}
                                    alt={tour.title}
                                    className="h-40 w-full object-cover rounded-md"
                                />
                                <h2 className="mt-3 text-xl font-semibold text-gray-800">{tour.title}</h2>
                                <p className="text-gray-600">{tour.location}</p>
                                <p className="text-blue-600 font-semibold mt-2">${tour.price}</p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => navigate(`/updateTourpkg?pkgId=${tour._id}`)}
                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white"
                                    >
                                        Edit Tour Details
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate(`/UpdateTour?pkgId=${tour._id}`, {
                                                state: { price: tour.price, SeatLeft: tour.SeatLeft },
                                            })
                                        }
                                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
                                    >
                                        Edit Tour Package
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg text-gray-500 col-span-3">No tours found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
