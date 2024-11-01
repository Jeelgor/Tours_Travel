import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Authentication/Login";
import SignUpUser from "./Authentication/SignUpUser";
import OtpVerification from "./Authentication/OtpVerification";
import Homepage from "./pages/Homepage";
import HomPageData from "./Admin/HomePageData";
import TourPackages from "./pages/TourPackages";
// import HomPageData from "./Admin/HomePageData";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PackageDetail from "./pages/PackageDetail";
import MyProfile from "./pages/MyProfile";
import MyPackage from "./pages/MyPackage";
import AddPackages from "./Admin/AddTourpackages";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Define routes where the NavBar should not be shown
  const hideNavBarRoutes = ["/", "/login", "/OtpVerification"];

  return (
    <AppProvider>

      <div>
        {/* Conditionally render the NavBar only if the current route is not in hideNavBarRoutes */}
        {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<SignUpUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/OtpVerification" element={<OtpVerification />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/Homepagedata" element={<HomPageData />} />
          <Route path="/TourPackages" element={<TourPackages />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-package" element={<MyPackage />} />
          <Route path="/Homepagedata" element={<HomPageData />} />
          <Route path="/TourPackages/:packageType" element={<TourPackages />} />
          <Route path="/TourPackages-detail/:pkgId" element={<PackageDetail />} />
          <Route path="/AddPackages" element={<AddPackages />} />
        </Routes>
        {/* Conditionally render the NavBar only if the current route is not in hideNavBarRoutes */}
        {!hideNavBarRoutes.includes(location.pathname) && <Footer />}
      </div>
    </AppProvider>
  );
}


export default App;
