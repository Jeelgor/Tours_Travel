import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import SignUpUser from "./Authentication/SignUpUser";
import OtpVerification from "./Authentication/OtpVerification";
import Homepage from "./homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/OtpVerification" element={<OtpVerification />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
