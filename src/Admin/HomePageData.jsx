import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [tourName, setTourName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("img", image);  // "img" should match the Multer field name
        formData.append("tourName", tourName);
        formData.append("Description", description);
        

        try {
            const response = await axios.post('http://localhost:3000/Auth/users/popularDestination', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Tour added successfully!'); // Success toast
            // Reset form fields
            setTourName('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error(error);
            toast.error('Failed to add tour. Please try again.'); // Error toast
        }
    };

    return (
        <div className="bg-lightblue h-screen w-screen flex items-center justify-center">
            <div className="w-[290px] h-[500px] md:w-[528px] md:h-[478px] bg-white rounded-lg">
                <h1 className="text-center p-4 text-2xl">Add New Tour</h1>
                <form onSubmit={handleSubmit} className="px-8">
                    <div className="mt-4">
                        <input
                            type="text"
                            className="border-b border-gray-500 focus:outline-none p-2 w-full"
                            placeholder="Tour Name"
                            value={tourName}
                            onChange={(e) => setTourName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <textarea
                            className="border-b border-gray-500 focus:outline-none p-2 w-full"
                            placeholder="Tour Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="file"
                            className="border-b border-gray-500 focus:outline-none p-2 w-full"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-10">
                        <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[200px] md:w-[400px] h-[40px] text-xl text-white">
                            Add Tour
                        </button>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default Admin;
