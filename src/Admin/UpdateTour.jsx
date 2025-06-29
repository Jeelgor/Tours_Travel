import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    Save,
    ArrowLeft,
    Upload,
    X,
    Plus,
    Minus,
    Eye,
    EyeOff,
    MapPin,
    Star,
    Award,
    Shield,
    Camera,
    FileText,
    Settings,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Globe,
    Users,
    Clock,
    Loader2,
    Image as ImageIcon,
    Edit3,
    Trash2
} from "lucide-react";

const initialState = {
    _id: "",
    packageType: "Luxury",
    accessibility: "",
    gallery: [],
    overview: ["", "", ""],
    amenities: [""],
    aboutProperty: {
        title: "",
        subtitle: "",
        description: "",
        perks: [""],
    },
    commonAreas: [""],
};

const UpdateTourDetail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pkgId = searchParams.get("pkgId");
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const [previewImages, setPreviewImages] = useState([]);
    const [activeSection, setActiveSection] = useState("basic");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (pkgId) {
            fetchTourDetails();
        }
    }, [pkgId, apiUrl]);

    const fetchTourDetails = async () => {
        try {
            setInitialLoading(true);
            const response = await axios.get(`${apiUrl}/Auth/users/getTourDetailPackages/${pkgId}`);
            const data = response.data;
            setFormData({
                ...initialState,
                ...data,
            });

            // Set preview images for existing gallery
            if (data.gallery && data.gallery.length > 0) {
                setPreviewImages(data.gallery.map(url => ({ url, isExisting: true })));
            }
        } catch (error) {
            console.error("Error fetching tour details:", error);
            toast.error("Failed to fetch tour details");
            navigate("/admin");
        } finally {
            setInitialLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.overview[0]) newErrors.title = "Title is required";
        if (!formData.overview[1]) newErrors.description = "Description is required";
        if (!formData.accessibility) newErrors.accessibility = "Accessibility information is required";
        if (formData.amenities.filter(a => a.trim()).length === 0) newErrors.amenities = "At least one amenity is required";

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
        const files = Array.from(e.target.files);

        // Create preview URLs for new files
        const newPreviews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            isExisting: false
        }));

        setPreviewImages(prev => [...prev, ...newPreviews]);
        setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, ...files],
        }));
    };

    const removeImage = (index) => {
        setPreviewImages(prev => {
            const newPreviews = [...prev];
            const removed = newPreviews.splice(index, 1)[0];

            // Revoke object URL if it's a new file
            if (!removed.isExisting && removed.url) {
                URL.revokeObjectURL(removed.url);
            }

            return newPreviews;
        });

        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    const handleOverviewChange = (index, value) => {
        const newOverview = [...formData.overview];
        newOverview[index] = value;
        setFormData((prev) => ({
            ...prev,
            overview: newOverview,
        }));

        // Clear specific overview errors
        if (index === 0 && errors.title) {
            setErrors(prev => ({ ...prev, title: null }));
        }
        if (index === 1 && errors.description) {
            setErrors(prev => ({ ...prev, description: null }));
        }
    };

    const handleArrayFieldChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData((prev) => ({
            ...prev,
            [field]: newArray,
        }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handlePerksChange = (index, value) => {
        const newPerks = [...formData.aboutProperty.perks];
        newPerks[index] = value;
        setFormData((prev) => ({
            ...prev,
            aboutProperty: {
                ...prev.aboutProperty,
                perks: newPerks,
            },
        }));
    };

    const handleAddField = (field) => {
        if (field === "aboutProperty.perks") {
            setFormData((prev) => ({
                ...prev,
                aboutProperty: {
                    ...prev.aboutProperty,
                    perks: [...prev.aboutProperty.perks, ""],
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: [...prev[field], ""],
            }));
        }
    };

    const handleRemoveField = (field, index) => {
        if (field === "aboutProperty.perks") {
            setFormData((prev) => ({
                ...prev,
                aboutProperty: {
                    ...prev.aboutProperty,
                    perks: prev.aboutProperty.perks.filter((_, i) => i !== index),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: prev[field].filter((_, i) => i !== index),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);
        try {
            const submitFormData = new FormData();

            submitFormData.append("_id", formData._id);
            submitFormData.append("packageType", formData.packageType);
            submitFormData.append("accessibility", formData.accessibility);
            submitFormData.append("overview", JSON.stringify(formData.overview));
            submitFormData.append("amenities", JSON.stringify(formData.amenities.filter(a => a.trim())));
            submitFormData.append("aboutProperty", JSON.stringify(formData.aboutProperty));
            submitFormData.append("commonAreas", JSON.stringify(formData.commonAreas.filter(a => a.trim())));

            // Only append new files to FormData
            formData.gallery.forEach((image) => {
                if (image instanceof File) {
                    submitFormData.append("gallery", image);
                }
            });

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
            setTimeout(() => navigate("/admin"), 2000);
        } catch (error) {
            console.error("Error updating tour package:", error);
            toast.error(error.response?.data?.message || "Error updating tour package");
        } finally {
            setLoading(false);
        }
    };

    const sectionItems = [
        { id: "basic", label: "Basic Info", icon: FileText },
        { id: "gallery", label: "Gallery", icon: Camera },
        { id: "overview", label: "Overview", icon: Eye },
        { id: "amenities", label: "Amenities", icon: Star },
        { id: "property", label: "Property", icon: Award },
        { id: "accessibility", label: "Accessibility", icon: Shield }
    ];

    const packageTypes = [
        "Adventure", "Romantic", "Family Specials", "Luxury",
        "Budget", "Group Tour", "Cruise Packages"
    ];

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center">
                    <Loader2 size={48} className="text-blue-600 mx-auto mb-4 animate-spin" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Tour Details</h2>
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
                                onClick={() => navigate("/admin")}
                                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-110"
                            >
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                                    Update Tour Package
                                </h1>
                                <p className="text-gray-600 mt-1">Modify your tour package details and settings</p>
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 sticky top-32">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Settings size={20} className="text-blue-600" />
                                Sections
                            </h3>
                            <nav className="space-y-2">
                                {sectionItems.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => setActiveSection(id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${activeSection === id
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            {activeSection === "basic" && (
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                                            <FileText size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                                            <p className="text-gray-600">Configure the fundamental details of your tour</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
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

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Package Type
                                            </label>
                                            <select
                                                name="packageType"
                                                value={formData.packageType}
                                                onChange={handleInputChange}
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            >
                                                {packageTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Gallery Section */}
                            {activeSection === "gallery" && (
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Gallery Images</h2>
                                            <p className="text-gray-600">Upload stunning images to showcase your tour</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Upload Area */}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                id="gallery-upload"
                                            />
                                            <label
                                                htmlFor="gallery-upload"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer group"
                                            >
                                                <Upload size={32} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="text-blue-700 font-semibold">Click to upload images</span>
                                                <span className="text-blue-500 text-sm">or drag and drop</span>
                                            </label>
                                        </div>

                                        {/* Image Previews */}
                                        {previewImages.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {previewImages.map((preview, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={preview.url}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                        {preview.isExisting && (
                                                            <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                                Existing
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Overview Section */}
                            {activeSection === "overview" && (
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                            <Eye size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                                            <p className="text-gray-600">Provide key information about your tour package</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tour Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.overview[0]}
                                                onChange={(e) => handleOverviewChange(0, e.target.value)}
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

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Description *
                                            </label>
                                            <textarea
                                                value={formData.overview[1]}
                                                onChange={(e) => handleOverviewChange(1, e.target.value)}
                                                rows={4}
                                                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${errors.description
                                                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                    : 'border-gray-200 focus:ring-blue-500 bg-white'
                                                    }`}
                                                placeholder="Describe what makes this tour special..."
                                            />
                                            {errors.description && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.description}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Rating
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.overview[2]}
                                                onChange={(e) => handleOverviewChange(2, e.target.value)}
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                                placeholder="e.g., 4.5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Amenities Section */}
                            {activeSection === "amenities" && (
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                                            <Star size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Amenities</h2>
                                            <p className="text-gray-600">List the features and services included</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {formData.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-3 group">
                                                <input
                                                    type="text"
                                                    value={amenity}
                                                    onChange={(e) => handleArrayFieldChange("amenities", index, e.target.value)}
                                                    className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                                    placeholder="Enter amenity (e.g., Free WiFi, Pool Access)"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveField("amenities", index)}
                                                    className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}

                                        {errors.amenities && (
                                            <p className="text-red-500 text-sm flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.amenities}
                                            </p>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleAddField("amenities")}
                                            className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all duration-300 font-semibold"
                                        >
                                            <Plus size={16} />
                                            Add Amenity
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* About Property Section */}
                            {activeSection === "property" && (
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                                            <Award size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">About Property</h2>
                                            <p className="text-gray-600">Detailed information about the tour experience</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Property Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.aboutProperty.title}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            aboutProperty: { ...prev.aboutProperty, title: e.target.value },
                                                        }))
                                                    }
                                                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                                    placeholder="Property or location name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Subtitle
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.aboutProperty.subtitle}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            aboutProperty: { ...prev.aboutProperty, subtitle: e.target.value },
                                                        }))
                                                    }
                                                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                                    placeholder="Brief tagline or subtitle"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.aboutProperty.description}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        aboutProperty: { ...prev.aboutProperty, description: e.target.value },
                                                    }))
                                                }
                                                rows={4}
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                                                placeholder="Detailed description of the property or experience..."
                                            />
                                        </div>

                                        {/* Perks */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Sparkles size={20} className="text-yellow-500" />
                                                Perks & Benefits
                                            </h3>
                                            <div className="space-y-3">
                                                {formData.aboutProperty.perks.map((perk, index) => (
                                                    <div key={index} className="flex items-center gap-3 group">
                                                        <input
                                                            type="text"
                                                            value={perk}
                                                            onChange={(e) => handlePerksChange(index, e.target.value)}
                                                            className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                                            placeholder="Enter a perk or benefit"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveField("aboutProperty.perks", index)}
                                                            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddField("aboutProperty.perks")}
                                                    className="flex items-center gap-2 px-4 py-3 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 transition-all duration-300 font-semibold"
                                                >
                                                    <Plus size={16} />
                                                    Add Perk
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Accessibility Section */}
                            {activeSection === "accessibility" && (
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 animate-fade-in-up">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl">
                                            <Shield size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Accessibility & Common Areas</h2>
                                            <p className="text-gray-600">Information about accessibility and shared spaces</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Accessibility */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Accessibility Information *
                                            </label>
                                            <textarea
                                                name="accessibility"
                                                value={formData.accessibility}
                                                onChange={handleInputChange}
                                                rows={6}
                                                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${errors.accessibility
                                                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                    : 'border-gray-200 focus:ring-blue-500 bg-white'
                                                    }`}
                                                placeholder="Describe accessibility features, wheelchair access, etc."
                                            />
                                            {errors.accessibility && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.accessibility}
                                                </p>
                                            )}
                                        </div>

                                        {/* Common Areas */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                                <MapPin size={16} className="text-teal-600" />
                                                Common Areas
                                            </h3>
                                            <div className="space-y-3">
                                                {formData.commonAreas.map((area, index) => (
                                                    <div key={index} className="flex items-center gap-3 group">
                                                        <input
                                                            type="text"
                                                            value={area}
                                                            onChange={(e) => handleArrayFieldChange("commonAreas", index, e.target.value)}
                                                            className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                                                            placeholder="Enter common area (e.g., Lobby, Restaurant)"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveField("commonAreas", index)}
                                                            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddField("commonAreas")}
                                                    className="flex items-center gap-2 px-4 py-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-all duration-300 font-semibold"
                                                >
                                                    <Plus size={16} />
                                                    Add Common Area
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
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
                                                Update Tour Package
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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

export default UpdateTourDetail;