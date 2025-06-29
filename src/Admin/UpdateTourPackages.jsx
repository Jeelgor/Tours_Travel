import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    Save,
    ArrowLeft,
    Upload,
    X,
    Eye,
    MapPin,
    Star,
    DollarSign,
    Users,
    Camera,
    FileText,
    Settings,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Globe,
    Clock,
    Loader2,
    Image as ImageIcon,
    Edit3,
    Award,
    TrendingUp
} from "lucide-react";

const initialState = {
    _id: "",
    title: "",
    location: "",
    imageurl: "",
    highlights: "",
    rating: "",
    price: "",
    currency: "INR",
    Seatleft: 10,
};

const UpdateTourPackages = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pkgId = searchParams.get("pkgId");
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch existing package details
    useEffect(() => {
        if (pkgId) {
            setInitialLoading(true);
            axios
                .get(`${apiUrl}/api/tours/admin/gettourpackages?pkgId=${pkgId}`)
                .then((response) => {
                    const data = response.data;
                    setFormData({
                        ...initialState,
                        ...data,
                        highlights: Array.isArray(data.highlights)
                            ? data.highlights.join(", ")
                            : data.highlights,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching tour details:", error);
                    toast.error("Failed to fetch tour details");
                    navigate("/admin-dashboard");
                })
                .finally(() => {
                    setInitialLoading(false);
                });
        }
    }, [pkgId, apiUrl, navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.highlights.trim()) newErrors.highlights = "Highlights are required";
        if (!formData.rating || formData.rating < 1 || formData.rating > 10) {
            newErrors.rating = "Rating must be between 1 and 10";
        }
        if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0";
        if (formData.Seatleft < 0) newErrors.Seatleft = "Seats cannot be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        document.getElementById('image-upload').value = '';
    };

    const normalizedImageUrl = formData.imageurl?.replace(/\\/g, '/');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);

        try {
            const submitFormData = new FormData();

            Object.keys(formData).forEach((key) => {
                if (Array.isArray(formData[key])) {
                    submitFormData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitFormData.append(key, formData[key]);
                }
            });

            if (imageFile) {
                submitFormData.append("imageurl", imageFile);
            }

            await axios.put(
                `${apiUrl}/Auth/users/admin/updatetourdetails/?pkgId=${pkgId}`,
                submitFormData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Tour package updated successfully!");
            setTimeout(() => navigate("/admin-dashboard"), 2000);
        } catch (error) {
            console.error("Error updating tour package:", error);
            toast.error(error.response?.data?.message || "Error updating tour package");
        } finally {
            setLoading(false);
        }
    };

    const currencyOptions = [
        { value: "USD", label: "USD ($)", icon: "💵" },
        { value: "EUR", label: "EUR (€)", icon: "💶" },
        { value: "INR", label: "INR (₹)", icon: "💰" }
    ];

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center">
                    <Loader2 size={48} className="text-blue-600 mx-auto mb-4 animate-spin" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Package Details</h2>
                    <p className="text-gray-600">Please wait while we fetch the information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden mt-16">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-xl border-b border-white/20 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/admin-dashboard")}
                                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-110"
                            >
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                                    Update Tour Package
                                </h1>
                                <p className="text-gray-600 mt-1">Modify your tour package information and pricing</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                                <Globe size={16} className="text-blue-600" />
                                <span className="text-sm font-semibold text-blue-800">ID: {pkgId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                                <FileText size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                                <p className="text-gray-600">Configure the fundamental details of your tour package</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Package ID */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Package ID
                                </label>
                                <input
                                    type="text"
                                    name="_id"
                                    value={formData._id}
                                    onChange={handleInputChange}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    disabled
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tour Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.title
                                            ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                            : 'border-gray-200 focus:ring-blue-500 bg-white'
                                        }`}
                                    placeholder="Enter an attractive tour title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location *
                                </label>
                                <div className="relative">
                                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.location
                                                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                : 'border-gray-200 focus:ring-blue-500 bg-white'
                                            }`}
                                        placeholder="Tour destination"
                                    />
                                </div>
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.location}
                                    </p>
                                )}
                            </div>

                            {/* Highlights */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Highlights (comma-separated) *
                                </label>
                                <input
                                    type="text"
                                    name="highlights"
                                    value={formData.highlights}
                                    onChange={handleInputChange}
                                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.highlights
                                            ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                            : 'border-gray-200 focus:ring-blue-500 bg-white'
                                        }`}
                                    placeholder="e.g. Scenic views, Adventure activities, Cultural experiences"
                                />
                                {errors.highlights && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.highlights}
                                    </p>
                                )}
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Rating (1-10) *
                                </label>
                                <div className="relative">
                                    <Star size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="10"
                                        step="0.1"
                                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.rating
                                                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                : 'border-gray-200 focus:ring-blue-500 bg-white'
                                            }`}
                                        placeholder="4.5"
                                    />
                                </div>
                                {errors.rating && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.rating}
                                    </p>
                                )}
                            </div>

                            {/* Seats Left */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Available Seats *
                                </label>
                                <div className="relative">
                                    <Users size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                    <input
                                        type="number"
                                        name="Seatleft"
                                        value={formData.Seatleft}
                                        onChange={handleInputChange}
                                        min="0"
                                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.Seatleft
                                                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                : 'border-gray-200 focus:ring-blue-500 bg-white'
                                            }`}
                                        placeholder="10"
                                    />
                                </div>
                                {errors.Seatleft && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.Seatleft}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                <DollarSign size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Pricing Information</h2>
                                <p className="text-gray-600">Set competitive pricing for your tour package</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price *
                                </label>
                                <div className="relative">
                                    <TrendingUp size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${errors.price
                                                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                : 'border-gray-200 focus:ring-blue-500 bg-white'
                                            }`}
                                        placeholder="Enter price"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            {/* Currency */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Currency
                                </label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                >
                                    {currencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.icon} {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Price Preview */}
                        {formData.price && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-green-700 font-semibold">Price Preview:</span>
                                    <span className="text-2xl font-bold text-green-800">
                                        {formData.currency === 'USD' && '$'}
                                        {formData.currency === 'EUR' && '€'}
                                        {formData.currency === 'INR' && '₹'}
                                        {formData.price}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image Upload Section */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                                <Camera size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Tour Image</h2>
                                <p className="text-gray-600">Upload a stunning image to showcase your tour</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Current Image Display */}
                            {(normalizedImageUrl && !imagePreview) && (
                                <div className="relative group">
                                    <img
                                        src={normalizedImageUrl}
                                        alt="Current tour image"
                                        className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-semibold bg-black/50 px-4 py-2 rounded-lg">
                                            Current Image
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* New Image Preview */}
                            {imagePreview && (
                                <div className="relative group">
                                    <img
                                        src={imagePreview}
                                        alt="New tour image preview"
                                        className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        New Image
                                    </div>
                                </div>
                            )}

                            {/* Upload Area */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer group"
                                >
                                    <Upload size={32} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-blue-700 font-semibold">
                                        {imagePreview ? 'Change Image' : 'Upload New Image'}
                                    </span>
                                    <span className="text-blue-500 text-sm">or drag and drop</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-600" />
                                <span className="text-gray-700">Ready to update your tour package?</span>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Update Package
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastClassName="backdrop-blur-sm"
            />
        </div>
    );
};

export default UpdateTourPackages;