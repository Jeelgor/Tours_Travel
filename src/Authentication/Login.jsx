import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const LoginUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const loginResponse = await axios.post(`${apiUrl}/Auth/users/loginuser`, {
        Email,
        Password
      });

      const { token } = loginResponse.data;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate('/OtpVerification');
        accessProtectedRoute();
      } else {
        toast("Token missing. Please try again.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const accessProtectedRoute = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.get(`${apiUrl}Auth/users/protected-route`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error("Access error:", error);
      }
    } else {
      console.log("No token found. Please log in.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden flex items-center justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 15 + 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
        />

        <motion.h1 
          className="text-3xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sign In
        </motion.h1>

        <form onSubmit={LoginUser} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group"
          >
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                placeholder="Email"
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
              />
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
                animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group"
          >
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all group-hover:bg-white/30"
                placeholder="Password"
                value={Password}
                onChange={(e) => SetPassword(e.target.value)}
              />
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
                animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Link 
              to="/" 
              className="text-white/80 hover:text-white transition-colors duration-300 group relative inline-block"
            >
              Not a user? 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 ml-1 group-hover:from-white group-hover:to-white transition-all duration-300">
                Register
              </span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                initial={false}
              />
            </Link>
          </motion.div>
        </form>
      </motion.div>

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
}

export default Login;
