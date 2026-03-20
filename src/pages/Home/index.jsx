import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { menuItems } from "../../data/menuItems";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease " + delay + "s, transform 0.7s ease " + delay + "s",
      }}
    >
      {children}
    </div>
  );
}

const specials = menuItems.filter((item) => item.popular).slice(0, 4);

const testimonials = [
  {
    name: "Isabella M.",
    text: "The best Italian food outside of Rome. The truffle pasta is absolutely divine. We come every anniversary.",
    rating: 5,
    location: "London, UK",
  },
  {
    name: "James W.",
    text: "Gusto is our go-to for special occasions. The Bistecca alla Fiorentina is a masterpiece. Impeccable service.",
    rating: 5,
    location: "Chelsea, London",
  },
  {
    name: "Sofia R.",
    text: "The tiramisù della casa is the best I have ever tasted outside of Italy. Authentic, beautiful, unforgettable.",
    rating: 5,
    location: "Kensington, London",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
];

export default function Home({ onReservation }) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "2010", label: t("hero.stat1") },
    { value: "4.9★", label: t("hero.stat2") },
    { value: "18", label: t("hero.stat3") },
    { value: "Soho", label: t("hero.stat4") },
  ];

  const steps = [
    { num: "01", icon: "🍽️", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
    { num: "02", icon: "🛒", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
    { num: "03", icon: "✅", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
  ];

  return (
    <div style={{ backgroundColor: "#1a1a1a" }}>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 50%, #1a1a1a 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.7) 100%)" }} />

        <div className="container-max section-padding" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: "800px" }}>
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(212,175,55,0.3)",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#d4af37", display: "inline-block" }} />
                <span style={{ color: "#d4af37", fontSize: "13px", fontWeight: 500 }}>{t("hero.badge")}</span>
              </div>

              <h1 className="font-serif" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "24px" }}>
                <span style={{
                  background: "linear-gradient(135deg, #d4af37 0%, #ff8c00 50%, #b87333 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}>
                  {t("hero.title")}
                </span>
                <span style={{ color: "white", display: "block" }}>{t("hero.subtitle1")}</span>
                <span style={{ color: "rgba(255,255,255,0.6)", display: "block", fontSize: "0.6em", fontWeight: 400 }}>{t("hero.subtitle2")}</span>
              </h1>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "540px", marginBottom: "40px" }}>
                {t("hero.desc")}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <button
                  onClick={onReservation}
                  className="btn-gold"
                  style={{ fontSize: "1rem", padding: "16px 32px", borderRadius: "100px" }}
                >
                  {t("hero.cta1")}
                </button>
                <Link
                  to="/menu"
                  style={{
                    border: "2px solid rgba(255,255,255,0.3)",
                    color: "white",
                    fontSize: "1rem",
                    padding: "14px 32px",
                    borderRadius: "100px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  {t("hero.cta2")}
                </Link>
              </div>

              <div style={{ display: "flex", gap: "40px", marginTop: "56px", flexWrap: "wrap" }}>
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif" style={{ color: "#d4af37", fontSize: "1.5rem", fontWeight: 700 }}>{stat.value}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "2px" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.1em" }}>{t("hero.scroll")}</span>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(212,175,55,0.8), transparent)",
            animation: "pulse 2s infinite",
          }} />
        </div>
      </section>

      {/* ── TONIGHT'S SPECIALS ── */}
      <section className="section-padding" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container-max">
          <FadeIn className="text-center" style={{ marginBottom: "48px" }}>
            <div style={{ marginBottom: "48px" }}>
              <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {t("specials.badge")}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white", marginBottom: "16px" }}>
                {t("specials.title")}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                {t("specials.desc")}
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {specials.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.1}>
                <div style={{
                  backgroundColor: "#2a2a2a",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ overflow: "hidden", height: "200px", position: "relative" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      backgroundColor: "#d4af37",
                      color: "#1a1a1a",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {t("specials.popular")}
                    </div>
                    {item.spicy && (
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: "#C0392B",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "100px",
                      }}>
                        🌶 Spicy
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <h3 className="font-serif" style={{ color: "white", fontSize: "1.05rem", fontWeight: 600, flex: 1, paddingRight: "8px" }}>
                        {item.name}
                      </h3>
                      <span style={{ color: "#d4af37", fontWeight: 700, fontSize: "1.05rem", whiteSpace: "nowrap" }}>
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                      {item.description}
                    </p>
                    <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                      {item.dietary.map((tag) => (
                        <span key={tag} style={{
                          border: "1px solid rgba(212,175,55,0.3)",
                          color: "#d4af37",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "100px",
                          textTransform: "capitalize",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => addItem(item)}
                      className="btn-gold"
                      style={{ width: "100%", padding: "10px", borderRadius: "12px", fontSize: "0.875rem" }}
                    >
                      {t("specials.addToOrder")}
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center" style={{ marginTop: "40px", textAlign: "center" }}>
            <Link
              to="/menu"
              className="btn-outline"
              style={{ borderRadius: "100px", padding: "14px 40px", textDecoration: "none" }}
            >
              {t("specials.viewAll")}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding" style={{ backgroundColor: "#111" }}>
        <div className="container-max">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {t("howItWorks.badge")}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
                {t("howItWorks.title")}
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,140,0,0.1))",
                    border: "1px solid rgba(212,175,55,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    margin: "0 auto 20px",
                  }}>
                    {step.icon}
                  </div>
                  <p style={{ color: "rgba(212,175,55,0.5)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "8px" }}>
                    {step.num}
                  </p>
                  <h3 className="font-serif" style={{ color: "white", fontSize: "1.2rem", marginBottom: "12px" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section-padding" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container-max">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {t("gallery.badge")}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
                {t("gallery.title")}
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {galleryImages.map((url, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: i === 0 || i === 5 ? "1/1" : "4/3",
                }}>
                  <img
                    src={url}
                    alt={"Gallery " + (i + 1)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      display: "block",
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHEF SECTION ── */}
      <section className="section-padding" style={{ backgroundColor: "#111" }}>
        <div className="container-max">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <FadeIn>
              <div style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=700&fit=crop"
                  alt="Head Chef"
                  style={{ width: "100%", borderRadius: "24px", objectFit: "cover", height: "500px" }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  right: "24px",
                  backgroundColor: "rgba(26,26,26,0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}>
                  <p className="font-serif" style={{ color: "white", fontWeight: 600, fontSize: "1.1rem" }}>{t("chef.name")}</p>
                  <p style={{ color: "#d4af37", fontSize: "0.85rem", marginTop: "4px" }}>{t("chef.role")}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "4px" }}>{t("chef.formerly")}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                  {t("chef.badge")}
                </p>
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", color: "white", lineHeight: 1.2, marginBottom: "24px" }}>
                  {t("chef.title")}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "20px" }}>
                  Chef Marco Rossi left his home in Bologna with a suitcase full of family recipes and a dream — to bring the true taste of Italy to London. What started as a 20-cover restaurant in Soho has grown into one of the city's most beloved dining destinations.
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "32px" }}>
                  Every dish on our menu is a tribute to Italian tradition. We make our pasta by hand every morning, source our ingredients directly from Italian producers, and never compromise on quality.
                </p>
                <Link to="/about" className="btn-outline" style={{ borderRadius: "100px", padding: "14px 32px", textDecoration: "none" }}>
                  {t("chef.cta")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding" style={{ background: "linear-gradient(135deg, #2a1a0a 0%, #1a1a1a 100%)" }}>
        <div className="container-max">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {t("testimonials.badge")}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "white" }}>
                {t("testimonials.title")}
              </h2>
            </div>
          </FadeIn>

          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "24px",
              padding: "48px",
              border: "1px solid rgba(212,175,55,0.15)",
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#d4af37" }}>
                {"★".repeat(testimonials[activeTestimonial].rating)}
              </div>
              <p className="font-serif" style={{ color: "white", fontSize: "1.2rem", lineHeight: 1.7, marginBottom: "32px", fontStyle: "italic" }}>
                "{testimonials[activeTestimonial].text}"
              </p>
              <div>
                <p style={{ color: "white", fontWeight: 600 }}>{testimonials[activeTestimonial].name}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>{testimonials[activeTestimonial].location}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    height: "8px",
                    width: i === activeTestimonial ? "24px" : "8px",
                    borderRadius: "100px",
                    backgroundColor: i === activeTestimonial ? "#d4af37" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section-padding" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container-max">
          <FadeIn>
            <div style={{
              background: "linear-gradient(135deg, #2a1500 0%, #1a0d00 100%)",
              borderRadius: "32px",
              padding: "clamp(2rem, 5vw, 4rem)",
              border: "1px solid rgba(212,175,55,0.2)",
              textAlign: "center",
            }}>
              <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                {t("cta.badge")}
              </p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "white", marginBottom: "16px" }}>
                {t("cta.title")}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.7 }}>
                Book your table online or call us. Walk-ins welcome, reservations recommended on weekends.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={onReservation}
                  className="btn-gold"
                  style={{ borderRadius: "100px", padding: "16px 40px", fontSize: "1rem" }}
                >
                  {t("cta.btn1")}
                </button>
                <Link
                  to="/menu"
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
                  {t("cta.btn2")}
                </Link>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", marginTop: "24px" }}>
                📞 020 7946 0000 · Open daily 12:00 – 23:00
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
