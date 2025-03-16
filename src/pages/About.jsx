import React from 'react'
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaHandshake } from 'react-icons/fa';

const About = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
          About Our Journey
        </h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          We're passionate about creating unforgettable travel experiences that transform lives and create lasting memories.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg shadow-lg bg-white"
            >
              <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">1000+</h3>
              <p className="text-gray-600">Happy Travelers</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg shadow-lg bg-white"
            >
              <FaAward className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">50+</h3>
              <p className="text-gray-600">Destinations</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg shadow-lg bg-white"
            >
              <FaHandshake className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80"
  },
  {
    name: "Jane Smith",
    role: "Travel Expert",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80"
  },
  {
    name: "Mike Johnson",
    role: "Customer Relations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80"
  }
];
export default About
