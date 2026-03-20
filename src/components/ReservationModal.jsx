import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const times = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export default function ReservationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", party: "", requests: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    toast.success("Reservation confirmed! See you soon.");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setDone(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-card-dark text-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto">

        <div className="bg-primary px-6 py-5 rounded-t-3xl sm:rounded-t-3xl flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold">Reserve a Table</h2>
            <p className="text-red-200 text-sm mt-0.5">We will confirm within 1 hour</p>
          </div>
          <button onClick={handleClose} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
        </div>

        {done ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🥂</div>
            <h3 className="font-serif text-2xl text-white mb-3">See you soon, {form.name.split(" ")[0]}!</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Your table for {form.party} on {form.date} at {form.time} is confirmed. A reminder will be sent to {form.email}.
            </p>
            <button onClick={handleClose} className="btn-gold py-2.5 px-8 text-sm">Perfect →</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Full Name *</label>
                <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  placeholder="Jane Smith"
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Phone</label>
                <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="07700 000000"
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Email *</label>
              <input name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                placeholder="jane@example.com"
                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Date *</label>
                <input name="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Time *</label>
                <select name="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors">
                  <option value="">Select</option>
                  {times.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Guests *</label>
                <select name="party" value={form.party} onChange={(e) => setForm({ ...form, party: e.target.value })} required
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors">
                  <option value="">Size</option>
                  {partySizes.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Special Requests</label>
              <textarea name="requests" value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })} rows={3}
                placeholder="Allergies, dietary requirements, celebrations..."
                className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors resize-none" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full btn-gold py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                  Confirming...
                </span>
              ) : "Confirm Reservation →"}
            </button>

            <p className="text-xs text-white/30 text-center">
              Or call us: <a href="tel:02079460000" className="text-gold hover:underline">020 7946 0000</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}