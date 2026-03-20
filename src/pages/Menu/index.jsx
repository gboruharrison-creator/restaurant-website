import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { menuItems, categories } from "../../data/menuItems";
import { useCart } from "../../context/CartContext";
import { getAIRecommendation } from "../../utils/anthropic";

function AIRecommender() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: t("ai.greeting"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = updated
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await getAIRecommendation(apiMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t("ai.error") }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "360px",
            height: "480px",
            backgroundColor: "#2a2a2a",
            borderRadius: "24px",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <div style={{
            background: "linear-gradient(135deg, #2a1500, #1a0d00)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(212,175,55,0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}>🍝</div>
              <div>
                <p style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{t("ai.title")}</p>
                <p style={{ color: "#d4af37", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block" }} />
                  {t("ai.online")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
            >×</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  backgroundColor: msg.role === "user" ? "#C0392B" : "rgba(255,255,255,0.07)",
                  color: "white",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                  border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#d4af37",
                      display: "inline-block",
                      animation: "bounce 1s infinite",
                      animationDelay: i * 0.15 + "s",
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            gap: "8px",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t("ai.placeholder")}
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "white",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                backgroundColor: input.trim() && !loading ? "#d4af37" : "rgba(255,255,255,0.1)",
                color: input.trim() && !loading ? "#1a1a1a" : "rgba(255,255,255,0.3)",
                border: "none",
                borderRadius: "12px",
                padding: "10px 14px",
                fontWeight: 700,
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                fontSize: "1rem",
              }}
            >→</button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d4af37, #ff8c00)",
          border: "none",
          cursor: "pointer",
          fontSize: "1.6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(212,175,55,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
          zIndex: 99,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,175,55,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,175,55,0.4)";
        }}
        aria-label="AI Food Advisor"
      >
        {open ? "×" : "🤖"}
      </button>
    </>
  );
}

export default function Menu() {
  const { t } = useTranslation();
  const { addItem, setIsOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDietary, setActiveDietary] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  const dietaryFilters = [
    { key: "vegetarian", label: t("menu.dietVeg") },
    { key: "vegan", label: t("menu.dietVegan") },
    { key: "spicy", label: t("menu.dietSpicy") },
  ];

  const filtered = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesDietary = activeDietary.every((diet) =>
      diet === "spicy" ? item.spicy : item.dietary.includes(diet)
    );
    return matchesCategory && matchesDietary;
  });

  const toggleDietary = (key) => {
    setActiveDietary((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  const handleAddItem = (item) => {
    addItem(item);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)",
        padding: "80px 1rem 60px",
        textAlign: "center",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
      }}>
        <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
          {t("menu.badge")}
        </p>
        <h1 className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "white", marginBottom: "16px" }}>
          {t("menu.title")}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          {t("menu.desc")}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ fontSize: "1.2rem" }}>🤖</span>
          <p style={{ color: "rgba(212,175,55,0.8)", fontSize: "0.9rem" }}>
            {t("menu.aiHint")} <strong style={{ color: "#d4af37" }}>{t("menu.aiName")}</strong> {t("menu.aiHint2")}
          </p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div style={{
        position: "sticky",
        top: "72px",
        zIndex: 40,
        backgroundColor: "rgba(26,26,26,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 1rem",
      }}>
        <div className="container-max">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "100px",
                    border: activeCategory === cat.key ? "none" : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: activeCategory === cat.key ? "#d4af37" : "transparent",
                    color: activeCategory === cat.key ? "#1a1a1a" : "rgba(255,255,255,0.6)",
                    fontWeight: activeCategory === cat.key ? 700 : 400,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {dietaryFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => toggleDietary(filter.key)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "100px",
                    border: activeDietary.includes(filter.key)
                      ? "1px solid #d4af37"
                      : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: activeDietary.includes(filter.key)
                      ? "rgba(212,175,55,0.15)"
                      : "transparent",
                    color: activeDietary.includes(filter.key) ? "#d4af37" : "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontWeight: activeDietary.includes(filter.key) ? 600 : 400,
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MENU GRID ── */}
      <section className="section-padding">
        <div className="container-max">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: "3rem", marginBottom: "16px" }}>🍽️</p>
              <h3 className="font-serif" style={{ color: "white", fontSize: "1.5rem", marginBottom: "8px" }}>
                {t("menu.noResults")}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "24px" }}>
                {t("menu.noResultsSub")}
              </p>
              <button
                onClick={() => { setActiveCategory("all"); setActiveDietary([]); }}
                style={{
                  border: "1px solid #d4af37",
                  color: "#d4af37",
                  background: "transparent",
                  padding: "10px 24px",
                  borderRadius: "100px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {t("menu.clearFilters")}
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#2a2a2a",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    animation: "fadeUp 0.5s ease both",
                    animationDelay: (i % 6) * 0.07 + "s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        display: "block",
                      }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {item.popular && (
                        <span style={{
                          backgroundColor: "#d4af37",
                          color: "#1a1a1a",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "100px",
                          textTransform: "uppercase",
                        }}>{t("menu.popular")}</span>
                      )}
                      {item.spicy && (
                        <span style={{
                          backgroundColor: "#C0392B",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "100px",
                        }}>🌶 Spicy</span>
                      )}
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      backgroundColor: "rgba(26,26,26,0.9)",
                      backdropFilter: "blur(4px)",
                      borderRadius: "100px",
                      padding: "4px 12px",
                      border: "1px solid rgba(212,175,55,0.3)",
                    }}>
                      <span style={{ color: "#d4af37", fontWeight: 700, fontSize: "0.95rem" }}>
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: "20px" }}>
                    <h3 className="font-serif" style={{ color: "white", fontSize: "1.05rem", fontWeight: 600, marginBottom: "8px" }}>
                      {item.name}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                      {item.description}
                    </p>

                    {item.dietary.length > 0 && (
                      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                        {item.dietary.map((tag) => (
                          <span key={tag} style={{
                            border: "1px solid rgba(212,175,55,0.25)",
                            color: "rgba(212,175,55,0.8)",
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
                    )}

                    <button
                      onClick={() => handleAddItem(item)}
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: addedItems[item.id] ? "#22c55e" : "#d4af37",
                        color: "#1a1a1a",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        transform: addedItems[item.id] ? "scale(0.98)" : "scale(1)",
                      }}
                    >
                      {addedItems[item.id] ? t("menu.added") : t("menu.addToOrder")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AIRecommender />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
