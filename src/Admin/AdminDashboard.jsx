import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Plus,
    Edit3,
    Settings,
    BarChart3,
    Users,
    MapPin,
    Star,
    Calendar,
    TrendingUp,
    Eye,
    Filter,
    Grid3X3,
    List,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    Globe,
    Award,
    Sparkles,
    ArrowRight,
    MoreVertical
} from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [sortBy, setSortBy] = useState("title");
    const [filterStatus, setFilterStatus] = useState("all");
    const [stats, setStats] = useState({
        totalTours: 0,
        activeTours: 0,
        totalBookings: 0,
        revenue: 0
    });

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/tours/admin/tours");
            setTours(response.data);
            setFilteredTours(response.data);

            // Calculate stats
            setStats({
                totalTours: response.data.length,
                activeTours: response.data.filter(tour => tour.status !== 'inactive').length,
                totalBookings: response.data.reduce((sum, tour) => sum + (tour.bookings || 0), 0),
                revenue: response.data.reduce((sum, tour) => sum + (tour.price * (tour.bookings || 0)), 0)
            });

            setLoading(false);
        } catch (err) {
            console.error("Error fetching tours:", err);
            setError("Failed to fetch tours. Please try again.");
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterTours(query, filterStatus, sortBy);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        filterTours(searchQuery, status, sortBy);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
        filterTours(searchQuery, filterStatus, sort);
    };

    const filterTours = (query, status, sort) => {
        let filtered = tours.filter((tour) => {
            const matchesSearch = tour.title.toLowerCase().includes(query) ||
                tour.location.toLowerCase().includes(query);
            const matchesStatus = status === "all" || tour.status === status;
            return matchesSearch && matchesStatus;
        });

        // Sort tours
        filtered.sort((a, b) => {
            switch (sort) {
                case "price":
                    return b.price - a.price;
                case "rating":
                    return b.rating - a.rating;
                case "date":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return a.title.localeCompare(b.title);
            }
        });

        setFilteredTours(filtered);
    };

    const StatCard = ({ icon: Icon, title, value, change, color }) => (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                </div>
                {change && (
                    <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp size={16} />
                        <span className="text-sm font-semibold">+{change}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
            <p className="text-gray-600 font-medium">{title}</p>
        </div>
    );

    const TourCard = ({ tour }) => (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
            <div className="relative overflow-hidden">
                <img
                    src={tour.imageurl ? `${tour.imageurl.replace(/\\/g, "/")}` : "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
                    alt={tour.title}
                    className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${tour.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                    {tour.status || 'Active'}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold py-1.5 px-3 rounded-full shadow-lg flex items-center gap-1">
                    <Star size={12} className="fill-white" />
                    {tour.rating || '4.5'}
                </div>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {tour.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={14} className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">{tour.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Users size={14} />
                            {tour.bookings || 0} bookings
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(tour.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <span className="text-2xl font-bold text-gray-800">${tour.price}</span>
                        <span className="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                            <Eye size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                            <MoreVertical size={16} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/updateTourpkg?pkgId=${tour._id}`)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                        <Edit3 size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span>Edit Details</span>
                    </button>
                    <button
                        onClick={() =>
                            navigate(`/UpdateTour?pkgId=${tour._id}`, {
                                state: { price: tour.price, SeatLeft: tour.SeatLeft },
                            })
                        }
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                        <Settings size={16} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                        <span>Edit Package</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const TourListItem = ({ tour }) => (
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-6">
                <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                    <img
                        src={tour.imageurl ? `${tour.imageurl.replace(/\\/g, "/")}` : "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
                        alt={tour.title}
                        className="w-24 h-24 object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                            {tour.title}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${tour.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                            {tour.status || 'Active'}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-blue-500" />
                            {tour.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500" />
                            {tour.rating || '4.5'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={14} className="text-green-500" />
                            {tour.bookings || 0} bookings
                        </span>
                        <span className="flex items-center gap-1">
                            <DollarSign size={14} className="text-purple-500" />
                            ${tour.price}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => navigate(`/updateTourpkg?pkgId=${tour._id}`)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                        <Edit3 size={16} />
                        Edit Details
                    </button>
                    <button
                        onClick={() =>
                            navigate(`/UpdateTour?pkgId=${tour._id}`, {
                                state: { price: tour.price, SeatLeft: tour.SeatLeft },
                            })
                        }
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                        <Settings size={16} />
                        Edit Package
                    </button>
                </div>
            </div>
        </div>
    );

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white/80 p-6 rounded-2xl">
                        <div className="h-12 bg-gray-300 rounded-xl mb-4"></div>
                        <div className="h-8 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white/80 rounded-2xl overflow-hidden">
                        <div className="h-48 bg-gray-300"></div>
                        <div className="p-6">
                            <div className="h-6 bg-gray-300 rounded mb-3"></div>
                            <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                            <div className="flex gap-2">
                                <div className="h-10 bg-gray-300 rounded-xl flex-1"></div>
                                <div className="h-10 bg-gray-300 rounded-xl flex-1"></div>
                            </div>
                        </div>
                    </div>
                ))}
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

            {/* Navigation Header */}
            <nav className="relative z-10 bg-white/80 backdrop-blur-md shadow-xl border-b border-white/20 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                                <BarChart3 size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-600">Manage your tours and bookings</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/usersbookings"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Users size={16} />
                                View Bookings
                            </Link>
                            <button
                                onClick={fetchTours}
                                className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            >
                                <RefreshCw size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Globe}
                        title="Total Tours"
                        value={stats.totalTours}
                        change="12"
                        color="from-blue-500 to-indigo-600"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Active Tours"
                        value={stats.activeTours}
                        change="8"
                        color="from-green-500 to-emerald-600"
                    />
                    <StatCard
                        icon={Users}
                        title="Total Bookings"
                        value={stats.totalBookings}
                        change="25"
                        color="from-purple-500 to-pink-600"
                    />
                    <StatCard
                        icon={DollarSign}
                        title="Revenue"
                        value={`$${stats.revenue.toLocaleString()}`}
                        change="18"
                        color="from-yellow-500 to-orange-600"
                    />
                </div>

                {/* Controls Section */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search tours by title or location..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Filters and Controls */}
                        <div className="flex items-center gap-4">
                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            {/* Sort By */}
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                <option value="title">Sort by Title</option>
                                <option value="price">Sort by Price</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="date">Sort by Date</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid"
                                            ? "bg-white shadow-md text-blue-600"
                                            : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <Grid3X3 size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "list"
                                            ? "bg-white shadow-md text-blue-600"
                                            : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {filteredTours.length} Tours Found
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2"></div>
                    </div>

                    {!loading && !error && (
                        <div className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl">
                            Showing {filteredTours.length} of {tours.length} tours
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && <LoadingSkeleton />}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Tours</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchTours}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Tours Display */}
                {!loading && !error && (
                    <>
                        {filteredTours.length > 0 ? (
                            <div className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    : "space-y-6"
                            }>
                                {filteredTours.map((tour, index) => (
                                    <div
                                        key={tour._id}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {viewMode === "grid" ? (
                                            <TourCard tour={tour} />
                                        ) : (
                                            <TourListItem tour={tour} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-8 mx-auto">
                                    <Globe size={80} className="text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Tours Found</h3>
                                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                    {searchQuery || filterStatus !== "all"
                                        ? "Try adjusting your search or filter criteria."
                                        : "Get started by creating your first tour package."}
                                </p>
                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto group">
                                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                    <span>Create New Tour</span>
                                    <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;