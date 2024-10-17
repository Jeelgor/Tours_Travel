import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import SignUpUser from "./Authentication/SignUpUser";
import OtpVerification from "./Authentication/OtpVerification";
import Homepage from "./pages/Homepage";
import HomPageData from "./Admin/HomePageData";
import TourPackages from "./pages/TourPackages";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/OtpVerification" element={<OtpVerification />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Homepagedata" element={<HomPageData />} />
        <Route path="/TourPackages" element={<TourPackages />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;
