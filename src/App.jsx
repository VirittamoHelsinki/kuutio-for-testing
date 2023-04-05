import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import Header from "./components/Header";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import ManagePage from "./pages/ManagePage";
import UserRoute from "./components/UserRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<UserRoute><FrontPage /></UserRoute>} />
          <Route path="login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="booking" element={<UserRoute><BookingPage /></UserRoute>} />
          <Route path="manage-booking" element={<UserRoute><ManagePage /></UserRoute>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
