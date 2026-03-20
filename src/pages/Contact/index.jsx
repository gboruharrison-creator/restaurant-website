import { useState } from "react";
import toast from "react-hot-toast";

const hours = [
  { day: "Monday – Thursday", time: "12:00 – 22:00", open: true },
  { day: "Friday – Saturday", time: "12:00 – 23:00", open: true },
  { day: "Sunday", time: "12:00 – 21:00", open: true },
];

const times = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", party: "", requests: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [activeTab, setActiveTab] = useState("reservation");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    toast.success(activeTab === "reservation" ? "Reservation confirmed! See you soon." : "Message sent! We will reply within 2 hours.");
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)",
        padding: "100px 1rem 80px",
        textAlign: "center",
      }}>
        <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
          Visit Us
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "white", marginBottom: "16px" }}>
          Reserve Your Table
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
          Book online, call us, or just walk in. We always have a table ready for you.
        </p>
      </section>

      {/* ── MAIN ── */}
      <section className="section-padding">
        <div className="container-max">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "48px", alignItems: "start" }}>

            {/* FORM */}
            <div style={{
              backgroundColor: "#2a2a2a",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              {/* Tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  { key: "reservation", label: "🍽️ Reserve a Table" },
                  { key: "message", label: "✉️ Send a Message" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setDone(false); }}
                    style={{
                      padding: "18px",
                      border: "none",
                      backgroundColor: activeTab === tab.key ? "rgba(212,175,55,0.1)" : "transparent",
                      color: activeTab === tab.key ? "#d4af37" : "rgba(255,255,255,0.4)",
                      fontWeight: activeTab === tab.key ? 600 : 400,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      borderBottom: activeTab === tab.key ? "2px solid #d4af37" : "2px solid transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {done ? (
                <div style={{ padding: "60px 40px", textAlign: "center" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(212,175,55,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    margin: "0 auto 24px",
                  }}>🥂</div>
                  <h3 className="font-serif" style={{ color: "white", fontSize: "1.8rem", marginBottom: "12px" }}>
                    {activeTab === "reservation" ? "See you soon!" : "Message received!"}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "8px" }}>
                    {activeTab === "reservation"
                      ? "Your table for " + form.party + " on " + form.date + " at " + form.time + " is confirmed."
                      : "We will reply to " + form.email + " within 2 hours."}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", marginBottom: "32px" }}>
                    A confirmation has been sent to {form.email}
                  </p>
                  <button
                    onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", date: "", time: "", party: "", requests: "" }); }}
                    style={{
                      border: "1px solid rgba(212,175,55,0.4)",
                      color: "#d4af37",
                      background: "transparent",
                      padding: "12px 28px",
                      borderRadius: "100px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Make another {activeTab === "reservation" ? "reservation" : "enquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: "32px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Full Name *
                      </label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                    </div>
                    <div>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Phone
                      </label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="07700 000000" style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Email *
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>

                  {activeTab === "reservation" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Date *
                        </label>
                        <input name="date" type="date" value={form.date} onChange={handleChange} required
                          min={new Date().toISOString().split("T")[0]}
                          style={{ ...inputStyle, colorScheme: "dark" }}
                          onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      </div>
                      <div>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Time *
                        </label>
                        <select name="time" value={form.time} onChange={handleChange} required
                          style={{ ...inputStyle, appearance: "none" }}
                          onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}>
                          <option value="">Select</option>
                          {times.map((t) => <option key={t} style={{ backgroundColor: "#2a2a2a" }}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Guests *
                        </label>
                        <select name="party" value={form.party} onChange={handleChange} required
                          style={{ ...inputStyle, appearance: "none" }}
                          onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}>
                          <option value="">Size</option>
                          {partySizes.map((s) => <option key={s} style={{ backgroundColor: "#2a2a2a" }}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {activeTab === "reservation" ? "Special Requests" : "Message *"}
                    </label>
                    <textarea
                      name="requests"
                      value={form.requests}
                      onChange={handleChange}
                      required={activeTab === "message"}
                      rows={4}
                      placeholder={activeTab === "reservation" ? "Allergies, celebrations, dietary requirements..." : "How can we help you?"}
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => e.target.style.borderColor = "#d4af37"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold"
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", fontSize: "0.95rem", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <span style={{ width: "16px", height: "16px", border: "2px solid rgba(26,26,26,0.3)", borderTopColor: "#1a1a1a", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                        {activeTab === "reservation" ? "Confirming..." : "Sending..."}
                      </span>
                    ) : activeTab === "reservation" ? "Confirm Reservation →" : "Send Message →"}
                  </button>

                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", marginTop: "16px" }}>
                    Or call us: <a href="tel:02079460000" style={{ color: "#d4af37", textDecoration: "none" }}>020 7946 0000</a>
                  </p>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <div style={{
                backgroundColor: "#2a2a2a",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <h3 className="font-serif" style={{ color: "white", fontSize: "1.2rem", marginBottom: "20px" }}>Find Us</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { icon: "📍", label: "Address", value: "14 Soho Square\nLondon, W1D 3QG" },
                    { icon: "📞", label: "Phone", value: "020 7946 0000", href: "tel:02079460000" },
                    { icon: "✉️", label: "Email", value: "ciao@gusto-london.co.uk", href: "mailto:ciao@gusto-london.co.uk" },
                  ].map((item) => (
                    <li key={item.label} style={{ display: "flex", gap: "14px" }}>
                      <span style={{ fontSize: "1.2rem", marginTop: "2px" }}>{item.icon}</span>
                      <div>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} style={{ color: "#d4af37", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}>{item.value}</a>
                        ) : (
                          <p style={{ color: "white", fontSize: "0.9rem", whiteSpace: "pre-line" }}>{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                backgroundColor: "#2a2a2a",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <h3 className="font-serif" style={{ color: "white", fontSize: "1.2rem", marginBottom: "20px" }}>Opening Hours</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {hours.map((h) => (
                    <li key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{h.day}</span>
                      <span style={{ color: "#d4af37", fontWeight: 600, fontSize: "0.9rem" }}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                backgroundColor: "#2a2a2a",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <h3 className="font-serif" style={{ color: "white", fontSize: "1.2rem", marginBottom: "20px" }}>Getting Here</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { icon: "🚇", label: "Tube", desc: "Tottenham Court Road (2 min walk)" },
                    { icon: "🚌", label: "Bus", desc: "Routes 14, 19, 38 stop nearby" },
                    { icon: "🚗", label: "Car", desc: "Q-Park Soho (5 min walk)" },
                  ].map((item) => (
                    <li key={item.label} style={{ display: "flex", gap: "12px" }}>
                      <span>{item.icon}</span>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                        <strong style={{ color: "white" }}>{item.label}:</strong> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #2a1500, #1a0d00)",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid rgba(212,175,55,0.2)",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "2rem", marginBottom: "12px" }}>🎉</p>
                <h3 className="font-serif" style={{ color: "white", fontSize: "1.1rem", marginBottom: "8px" }}>Private Dining</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                  Hosting a special event? Our private dining room seats up to 20 guests.
                </p>
                <a href="mailto:events@gusto-london.co.uk" style={{ color: "#d4af37", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
                  events@gusto-london.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section style={{ backgroundColor: "#1a1a1a", paddingBottom: "4rem" }}>
        <div className="container-max" style={{ padding: "0 1rem" }}>
          <div style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <iframe
              title="Gusto Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9!2d-0.1305!3d51.5154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d4e4b4b4b4%3A0x4b4b4b4b4b4b4b4b!2sSoho%20Square%2C%20London!5e0!3m2!1sen!2suk!4v1699999999999"
              width="100%"
              height="380"
              style={{ border: 0, display: "block", filter: "grayscale(30%) invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}