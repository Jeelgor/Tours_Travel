import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    const [formData, setFormData] = useState(initialState);
    const [imageFile, setImageFile] = useState(null);

    // Fetch existing package details
    useEffect(() => {
        if (pkgId) {
            axios
                .get(`${apiUrl}/api/tours/admin/gettourpackages?pkgId=${pkgId}`)
                .then((response) => {
                    const data = response.data;
                    setFormData({
                        ...initialState,
                        ...data,
                        // Convert highlights array into a comma-separated string for the form
                        highlights: Array.isArray(data.highlights)
                            ? data.highlights.join(", ")
                            : data.highlights,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching tour details:", error);
                    toast.error("Failed to fetch tour details");
                    navigate("/AddTourDetail");
                });
        }
    }, [pkgId, apiUrl, navigate]);

    // Handlers for basic text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle file input for updating imageurl via file upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };
    const normalizedImageUrl = formData.imageurl?.replace(/\\/g, '/');

    // Function to upload new image and get URL
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitFormData = new FormData();

            // Add all form fields
            Object.keys(formData).forEach((key) => {
                if (Array.isArray(formData[key])) {
                    submitFormData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitFormData.append(key, formData[key]);
                }
            });

            // If new image is selected, add it to FormData
            if (imageFile) {
                submitFormData.append("imageurl", imageFile);
            }
            // Send API request in one go
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

            toast("Tour package updated successfully!");
        } catch (error) {
            console.error("Error updating tour package:", error);
            toast(error.response?.data?.message || "Error updating tour package");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Update Tour Package</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="border p-4 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4">Basic Information</h3>
                    <div className="mb-4">
                        <label className="block mb-2">Package ID</label>
                        <input
                            type="text"
                            name="_id"
                            value={formData._id}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Highlights (comma-separated)</label>
                        <input
                            type="text"
                            name="highlights"
                            value={formData.highlights}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g. Scenic, Fun, Relaxing"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Seats Left</label>
                        <input
                            type="number"
                            name="Seatleft"
                            value={formData.Seatleft}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {formData.imageurl && !imageFile && (
                            <div className="mt-2">
                                <img
                                    src={`${normalizedImageUrl}`}
                                    alt="Current"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                >
                    {loading ? "Updating..." : "Update Tour Package"}
                </button>
            </form>
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
            />
        </div>
    );
};

export default UpdateTourPackages;
