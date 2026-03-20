import { useState } from "react";

const team = [
  {
    name: "Chef Marco Rossi",
    role: "Head Chef & Co-Founder",
    bio: "Trained at Osteria Francescana in Modena under Massimo Bottura, Marco brought his passion for authentic Italian cuisine to London in 2010. His philosophy is simple: the best ingredients, treated with respect.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&crop=face",
    specialty: "Handmade Pasta & Grills",
  },
  {
    name: "Sofia Ricci",
    role: "Pastry Chef",
    bio: "Sofia grew up in Bologna making tiramisù with her grandmother. After training at Le Cordon Bleu Paris, she returned to her Italian roots, creating desserts that are both technically brilliant and deeply nostalgic.",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=400&fit=crop&crop=face",
    specialty: "Desserts & Pastry",
  },
  {
    name: "Luca Ferrari",
    role: "Sommelier & Bar Manager",
    bio: "Luca spent a decade travelling Italian wine regions before joining Gusto. His curated wine list features over 80 Italian labels, from everyday Montepulciano to rare Barolo. His Aperol Spritz is legendary.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    specialty: "Wine & Cocktails",
  },
];

const awards = [
  { year: "2024", title: "Best Italian Restaurant", body: "London Restaurant Awards" },
  { year: "2023", title: "AA Rosette Award", body: "AA Restaurant Guide" },
  { year: "2022", title: "Top 50 London Restaurants", body: "Time Out London" },
  { year: "2019", title: "Best New Restaurant", body: "Evening Standard" },
];

const values = [
  { icon: "🌿", title: "Seasonal Ingredients", desc: "Our menu changes with the seasons. We source fresh produce weekly from Italian suppliers and local British farms." },
  { icon: "🍝", title: "Handmade Daily", desc: "Every pasta is rolled by hand every morning. No shortcuts, no shortcuts — just tradition and technique." },
  { icon: "🇮🇹", title: "Authentic Recipes", desc: "Our recipes come from Italian grandmothers and Michelin-trained chefs. We never compromise on authenticity." },
  { icon: "♻️", title: "Sustainability", desc: "Zero food waste policy. We compost, recycle, and work only with sustainable, ethical suppliers." },
];

export default function About({ onReservation }) {
  const [activeChef, setActiveChef] = useState(0);

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)",
        padding: "100px 1rem 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }} />
        <div className="container-max" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "700px" }}>
            <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
              Our Story
            </p>
            <h1 className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "white", lineHeight: 1.1, marginBottom: "24px" }}>
              Born in Bologna,<br />
              <span style={{ background: "linear-gradient(135deg, #d4af37, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Made in London
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "32px" }}>
              Gusto was founded in 2010 with a single mission — to serve the most authentic Italian food London had ever tasted. Fourteen years later, we are still rolling pasta by hand every morning and sourcing our ingredients directly from Italy.
            </p>
            <button
              onClick={onReservation}
              className="btn-gold"
              style={{ borderRadius: "100px", padding: "16px 36px", fontSize: "1rem" }}
            >
              Reserve a Table →
            </button>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-padding" style={{ backgroundColor: "#111" }}>
        <div className="container-max">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
              What We Believe
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
              Our Philosophy
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {values.map((v) => (
              <div key={v.title} style={{
                backgroundColor: "#2a2a2a",
                borderRadius: "20px",
                padding: "32px 24px",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  marginBottom: "20px",
                }}>
                  {v.icon}
                </div>
                <h3 className="font-serif" style={{ color: "white", fontSize: "1.1rem", marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section-padding" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container-max">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
              The People
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
              Meet the Team
            </h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            {team.map((member, i) => (
              <button
                key={member.name}
                onClick={() => setActiveChef(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  border: activeChef === i ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: activeChef === i ? "rgba(212,175,55,0.15)" : "transparent",
                  color: activeChef === i ? "#d4af37" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: activeChef === i ? 600 : 400,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                />
                <span style={{ fontSize: "0.9rem" }}>{member.name.split(" ")[1]}</span>
              </button>
            ))}
          </div>

          <div style={{
            backgroundColor: "#2a2a2a",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}>
            <div style={{ position: "relative" }}>
              <img
                src={team[activeChef].image}
                alt={team[activeChef].name}
                style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                backgroundColor: "rgba(26,26,26,0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "16px 20px",
                border: "1px solid rgba(212,175,55,0.2)",
              }}>
                <p className="font-serif" style={{ color: "white", fontWeight: 600 }}>{team[activeChef].name}</p>
                <p style={{ color: "#d4af37", fontSize: "0.85rem", marginTop: "2px" }}>{team[activeChef].role}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "2px" }}>Speciality: {team[activeChef].specialty}</p>
              </div>
            </div>
            <div style={{ padding: "48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p className="font-serif" style={{ color: "rgba(212,175,55,0.5)", fontSize: "3rem", lineHeight: 1, marginBottom: "16px" }}>"</p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "32px" }}>
                {team[activeChef].bio}
              </p>
              <button
                onClick={onReservation}
                className="btn-outline"
                style={{ borderRadius: "100px", padding: "12px 28px", alignSelf: "flex-start" }}
              >
                Book a Table →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="section-padding" style={{ backgroundColor: "#111" }}>
        <div className="container-max">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
              Recognition
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
              Awards & Press
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {awards.map((award) => (
              <div key={award.title} style={{
                backgroundColor: "#2a2a2a",
                borderRadius: "20px",
                padding: "28px 24px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "all 0.3s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🏆</div>
                <p style={{ color: "#d4af37", fontWeight: 700, fontSize: "1.1rem", marginBottom: "6px" }}>{award.year}</p>
                <h3 className="font-serif" style={{ color: "white", fontSize: "1rem", marginBottom: "6px" }}>{award.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{award.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section-padding" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container-max">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
              Behind the Scenes
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
              Life at Gusto
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop",
            ].map((url, i) => (
              <div key={i} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src={url}
                  alt={"Gusto " + (i + 1)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: "linear-gradient(135deg, #2a1500, #1a0d00)" }}>
        <div className="container-max" style={{ textAlign: "center" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "white", marginBottom: "16px" }}>
            Come and Taste the Difference
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            We would love to welcome you to Gusto. Book a table and let us take care of the rest.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={onReservation}
              className="btn-gold"
              style={{ borderRadius: "100px", padding: "16px 40px", fontSize: "1rem" }}
            >
              Reserve a Table →
            </button>
            <a
              href="tel:02079460000"
              style={{
                border: "2px solid rgba(212,175,55,0.4)",
                color: "#d4af37",
                padding: "14px 40px",
                borderRadius: "100px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "1rem",
                transition: "all 0.2s",
                display: "inline-block",
              }}
            >
              📞 020 7946 0000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}