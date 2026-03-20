import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.15)",
          backgroundColor: "transparent",
          color: "rgba(255,255,255,0.8)",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontWeight: 500,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "#d4af37"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
      >
        <span style={{ fontSize: "16px" }}>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <span style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.4)",
          display: "inline-block",
          transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          marginTop: "8px",
          backgroundColor: "#2a2a2a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          zIndex: 100,
          minWidth: "140px",
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "12px 16px",
                border: "none",
                backgroundColor: lang.code === i18n.language ? "rgba(212,175,55,0.1)" : "transparent",
                color: lang.code === i18n.language ? "#d4af37" : "rgba(255,255,255,0.7)",
                fontWeight: lang.code === i18n.language ? 600 : 400,
                cursor: "pointer",
                fontSize: "0.875rem",
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (lang.code !== i18n.language) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (lang.code !== i18n.language) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ fontSize: "16px" }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}