import axios from 'axios';
import React, { useState } from 'react'

const AddTourDetail = () => {
    const [packages, setPackages] = useState([]);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');

    const handlePackagesChange = (e) => {
        const value = e.target.value;
        try {
            const parsedPackages = JSON.parse(value);
            setPackages(parsedPackages);
        } catch (error) {
            console.log(error);
            setMessage("Invalid JSON format.");
        }
    };

    const handleImagesChange = (e) => {
        setImages(Array.from(e.target.files)); // Convert FileList to Array
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('packages', JSON.stringify(packages));

        images.forEach((image) => {
            formData.append('gallery', image);
        });

        try {
            const response = await axios.post('http://localhost:3000/Auth/users/AddpackagesDetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.msg);
        } catch (error) {
            setMessage("Failed to upload packages.");
            console.error(error);
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Tour Packages</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="packages" className="block text-gray-700 font-bold mb-2">
                        Packages (JSON format):
                    </label>
                    <textarea
                        id="packages"
                        rows="4"
                        onChange={handlePackagesChange}
                        placeholder='Enter package details in JSON format: [{"title": "Tour 1", "location": "Paris"}, {"title": "Tour 2", "location": "London"}]'
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
                        Upload Images:
                    </label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImagesChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
                >
                    Submit
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    )
}

export default AddTourDetail

