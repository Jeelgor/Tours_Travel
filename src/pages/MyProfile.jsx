import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL;

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    MobileNumber: '',
    Address: '',
    Pincode: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${apiUrl}/Auth/users/userProfile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${apiUrl}/Auth/users/updateProfile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
                <span className="text-3xl text-white font-bold">
                  {userData.FirstName?.[0]}{userData.LastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {userData.FirstName} {userData.LastName}
                </h1>
                <p className="text-white/80">{userData.Email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  value={userData.FirstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200'
                  } transition-colors duration-200`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  value={userData.LastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200'
                  } transition-colors duration-200`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={userData.Email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="MobileNumber"
                  value={userData.MobileNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200'
                  } transition-colors duration-200`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="Address"
                  value={userData.Address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200'
                  } transition-colors duration-200`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="Pincode"
                  value={userData.Pincode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isEditing 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200'
                  } transition-colors duration-200`}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      fetchUserData();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 
                      transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </motion.button>
                </>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default MyProfile;