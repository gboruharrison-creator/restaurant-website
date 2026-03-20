import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ onReservation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { t } = useTranslation();

  const links = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.menu"), to: "/menu" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      transition: "all 0.3s",
      backgroundColor: scrolled ? "rgba(26,26,26,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
    }}>
      <div className="container-max" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 1rem" }}>

        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#C0392B", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
            🍝
          </div>
          <div>
            <span className="font-serif" style={{ color: "white", fontWeight: 700, fontSize: "1.2rem", lineHeight: 1, display: "block" }}>Gusto</span>
            <span style={{ color: "#d4af37", fontSize: "0.7rem", lineHeight: 1 }}>Ristorante Italiano</span>
          </div>
        </Link>

        <nav style={{ display: "none", alignItems: "center", gap: "32px" }} className="md-nav">
          {links.map((link) => (
            <Link key={link.to} to={link.to} style={{
              color: pathname === link.to ? "#d4af37" : "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: pathname === link.to ? 600 : 400,
              transition: "color 0.2s",
              borderBottom: pathname === link.to ? "1px solid #d4af37" : "none",
              paddingBottom: "2px",
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: "1.3rem",
              padding: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#d4af37"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
          >
            🛒
            {totalItems > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "18px",
                height: "18px",
                backgroundColor: "#C0392B",
                color: "white",
                fontSize: "10px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}>
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={onReservation}
            className="btn-gold"
            style={{ borderRadius: "100px", padding: "10px 20px", fontSize: "0.875rem", display: "none" }}
            id="reserve-btn"
          >
            {t("nav.reserve")}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "white", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "white", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "white", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          backgroundColor: "#2a2a2a",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 1rem",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
            {links.map((link) => (
              <Link key={link.to} to={link.to} style={{
                color: pathname === link.to ? "#d4af37" : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: pathname === link.to ? 600 : 400,
                padding: "4px 0",
              }}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => { onReservation(); setMenuOpen(false); }}
            className="btn-gold"
            style={{ width: "100%", borderRadius: "12px", padding: "14px", fontSize: "0.95rem" }}
          >
            {t("nav.reserve")}
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          #reserve-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}