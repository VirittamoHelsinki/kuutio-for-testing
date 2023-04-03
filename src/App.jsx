import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import ManageBookingPage from "./pages/ManageBookingPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="manage-booking" element={<ManageBookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
