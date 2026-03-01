import React, { useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { UserProvider } from "./context/UserContext";
import { BookingProvider } from "./context/BookingContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentForm from "./components/PaymentForm";
import ChatBox from "./components/ChatBox";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy Loaded Pages
const Login = React.lazy(() => import("./Authentication/Login"));
const SignUpUser = React.lazy(() => import("./Authentication/SignUpUser"));
const OtpVerification = React.lazy(() => import("./Authentication/OtpVerification"));
const Homepage = React.lazy(() => import("./pages/Homepage"));
const HomPageData = React.lazy(() => import("./Admin/HomePageData"));
const TourPackages = React.lazy(() => import("./pages/TourPackages"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const PackageDetail = React.lazy(() => import("./pages/PackageDetail"));
const MyProfile = React.lazy(() => import("./pages/MyProfile"));
const MyPackage = React.lazy(() => import("./pages/MyPackage"));
const AddPackages = React.lazy(() => import("./Admin/AddTourpackages"));
const BookingForm = React.lazy(() => import("./pages/BookingForm"));
const AdminDashboard = React.lazy(() => import("./Admin/AdminDashboard"));
const UserBookingStatus = React.lazy(() => import("./pages/UserBookingStatus"));
const AddTourDetail = React.lazy(() => import("./Admin/AddTourDetail"));
const UpdateTourDetail = React.lazy(() => import("./Admin/UpdateTour"));
const AdminBookings = React.lazy(() => import("./Admin/AdminBookings"));
const UpdateTourPackages = React.lazy(() => import("./Admin/UpdateTourPackages"));
const AdminSignUpUser = React.lazy(() => import("./Admin/Adminauth"));
const PaymentSuccess = React.lazy(() => import("./pages/PaymentSuccess"));

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Elements stripe={stripePromise}>
          <Analytics />
          <UserProvider>
            <BookingProvider>
              <MainContent />
            </BookingProvider>
          </UserProvider>
        </Elements>
      </ErrorBoundary>
      <SpeedInsights />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavBarRoutes = ["/", "/login", "/OtpVerification", "/admin", "/usersbookings"];

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
        <ChatBox />
        <React.Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lightblue"></div></div>}>
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
            <Route path="/UpdateTour" element={<UpdateTourDetail />} />
            {/* other routes */}
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/BookingForm" element={<BookingForm />} />
            <Route path="/userbookingstatus" element={<ProtectedRoute><UserBookingStatus /></ProtectedRoute>} />
            <Route path="/package-detail/:pkgId" element={<PackageDetail />} />
            <Route path="/AddPackages" element={<AddPackages />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/usersbookings" element={<AdminBookings />} />
            <Route path="/updateTourpkg" element={<UpdateTourPackages />} />
            <Route path="/adminauth" element={<AdminSignUpUser />} />
          </Routes>
        </React.Suspense>
        {!hideNavBarRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
}

export default App;