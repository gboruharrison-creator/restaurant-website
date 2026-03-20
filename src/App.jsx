import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import ReservationModal from "./components/ReservationModal";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/index";
import Menu from "./pages/Menu/index";
import About from "./pages/About/index";
import Contact from "./pages/Contact/index";

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ backgroundColor: "#1a1a1a", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar onReservation={() => setReservationOpen(true)} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onReservation={() => setReservationOpen(true)} />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About onReservation={() => setReservationOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <CartSidebar />
        <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
      </div>
    </BrowserRouter>
  );
}