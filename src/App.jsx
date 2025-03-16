import React, { useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Authentication/Login";
import SignUpUser from "./Authentication/SignUpUser";
import OtpVerification from "./Authentication/OtpVerification";
import Homepage from "./pages/Homepage";
import HomPageData from "./Admin/HomePageData";
import TourPackages from "./pages/TourPackages";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PackageDetail from "./pages/PackageDetail";
import MyProfile from "./pages/MyProfile";
import MyPackage from "./pages/MyPackage";
import AddPackages from "./Admin/AddTourpackages";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTourDetail from "./Admin/AddTourDetail";
import BookingForm from "./pages/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import AdminDashboard from "./Admin/AdminDashboard";
import TourDetailsForm from "./Admin/AddTourDetail";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm";
import UserBookingStatus from "./pages/UserBookingStatus";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Analytics />
        <MainContent />
      </Elements>
      <SpeedInsights/>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavBarRoutes = ["/", "/login", "/OtpVerification","/admin"];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/homepage");
    }
  }, [location, navigate]);

  return (
    <>
      <div>
        {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<SignUpUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/OtpVerification" element={<OtpVerification />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/Homepagedata" element={<HomPageData />} />
          <Route path="/TourPackages" element={<ProtectedRoute><TourPackages /></ProtectedRoute>} />
          <Route path="/TourPackages/:packageType" element={<ProtectedRoute><TourPackages /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-package" element={<MyPackage />} />
          <Route path="/AddTourDetail" element={<AddTourDetail />} />
          <Route path="/BookingForm" element={<BookingForm />} />
          <Route path="/userbookingstatus" element={<ProtectedRoute><UserBookingStatus /></ProtectedRoute>} />
          <Route path="/package-detail/:pkgId" element={<PackageDetail />} />
          <Route path="/AddPackages" element={<AddPackages />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tour/:pkgId" element={<TourDetailsForm />} />
        </Routes>
        {!hideNavBarRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
}

export default App;