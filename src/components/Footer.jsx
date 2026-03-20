import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeveloperCard from "./DeveloperCard";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-black/40 border-t border-white/10 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🍝</span>
              </div>
              <div>
                <span className="font-serif font-bold text-xl leading-none block">Gusto</span>
                <span className="text-xs text-gold">Ristorante Italiano</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3 mt-4">
              {["F", "I", "X"].map((s) => (
                <a key={s} href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center text-xs">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">{t("footer.menu")}</h4>
            <ul className="space-y-2">
              {["Starters", "Pasta", "Mains", "Desserts", "Drinks"].map((s) => (
                <li key={s}>
                  <Link to="/menu" className="text-white/50 hover:text-gold text-sm transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">Visit Us</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex gap-2"><span>📍</span><span>14 Soho Square, London W1D 3QG</span></li>
              <li className="flex gap-2"><span>📞</span><a href="tel:02079460000" className="hover:text-gold transition-colors">020 7946 0000</a></li>
              <li className="flex gap-2"><span>✉️</span><a href="mailto:ciao@gusto-london.co.uk" className="hover:text-gold transition-colors">ciao@gusto-london.co.uk</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { day: "Mon – Thu", time: "12:00 – 22:00" },
                { day: "Fri – Sat", time: "12:00 – 23:00" },
                { day: "Sunday", time: "12:00 – 21:00" },
              ].map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span className="text-gold">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">{t("footer.copyright")}</p>
          <DeveloperCard />
          <div className="flex gap-4 text-xs text-white/30">
            <a href="#" className="hover:text-white/60">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white/60">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}