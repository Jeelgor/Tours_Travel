import React, { useState } from 'react';
import axios from 'axios';

const AddTourPackages = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        location: '',
        imageurl: '',
        highlights: '',
        rating: '',
        price: '',
        currency: 'INR',
        Seatleft: 10,
    });

    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHighlightsChange = (e) => {
        setFormData({ ...formData, highlights: e.target.value.split(',') });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const uploadImage = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            const response = await axios.post(`${apiUrl}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.imageUrl; // Assuming backend returns the image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        const uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl) {
            console.error('Image upload failed');
            return;
        }

        const finalData = { ...formData, imageurl: uploadedImageUrl };

        try {
            const response = await axios.post(`${apiUrl}/api/tours/admin/tourpackagesadd`, finalData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Tour Package</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Package ID</label>
                    <input type="text" name="_id" value={formData._id} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Highlights (comma-separated)</label>
                    <input type="text" name="highlights" value={formData.highlights} onChange={handleHighlightsChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Rating</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Currency</label>
                    <select name="currency" value={formData.currency} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="INR">INR</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Seats Left</label>
                    <input type="number" name="Seatleft" value={formData.Seatleft} min="0" onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTourPackages;
