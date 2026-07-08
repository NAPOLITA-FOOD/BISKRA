import { MapPin, Phone, Clock } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-[60px]">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">

          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={`${import.meta.env.BASE_URL}logo-round-new.png`}
              alt="Napolita Food"
              className="w-[68px] h-[68px] object-contain mb-6"
            />
            <h3 className="font-serif text-[20px] font-bold text-white leading-tight mb-1">
              NAPOLITA
            </h3>
            <span className="font-sans text-[14px] text-[var(--gray)] font-light mb-4">
              FOOD
            </span>
            <p className="font-sans text-[12px] text-[var(--gray)] max-w-[200px] leading-relaxed">
              Authentic Italian cuisine — Biskra, Algérie
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[12px] text-white uppercase tracking-widest mb-2">QUICK LINKS</h4>
            <div className="w-8 h-[2px] bg-[var(--gold)] mb-6" />
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Menu', href: '#menu' },
                { label: 'About', href: '#story' },
                { label: 'Pizza Builder', href: '#builder' },
                { label: 'Reserve', href: '#reserve' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="font-sans text-[13px] text-white hover:text-[var(--red)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[12px] text-white uppercase tracking-widest mb-2">CONTACT US</h4>
            <div className="w-8 h-[2px] bg-[var(--gold)] mb-6" />
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-white text-[13px] font-sans">
                <MapPin size={16} className="text-[var(--gray)] shrink-0" />
                <span>Biskra, Algérie</span>
              </li>
              <li className="flex items-center gap-3 text-white text-[13px] font-sans">
                <Phone size={16} className="text-[var(--gray)] shrink-0" />
                <a href="tel:0540455527" className="hover:text-[var(--red)] transition-colors">
                  0540 45 55 27
                </a>
              </li>
              <li className="flex items-center gap-3 text-white text-[13px] font-sans">
                <Clock size={16} className="text-[var(--gray)] shrink-0" />
                <span>Tous les jours: 10h – 23h</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans text-[12px] text-white uppercase tracking-widest mb-2">FOLLOW US</h4>
            <div className="w-8 h-[2px] bg-[var(--gold)] mb-6" />
            <div className="flex flex-col gap-4">
              <a
                href="https://web.facebook.com/pizza.napolita.officiel07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white text-[13px] font-sans hover:text-[#1877F2] transition-colors"
              >
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] hover:bg-[#1877F2] hover:border-[#1877F2] transition-all shrink-0">
                  <FaFacebookF size={14} />
                </div>
                Pizza Napolita Officiel
              </a>
              <a
                href="https://www.instagram.com/pizza_napolita_officiel/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white text-[13px] font-sans hover:text-[#E1306C] transition-colors"
              >
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] hover:bg-[#E1306C] hover:border-[#E1306C] transition-all shrink-0">
                  <FaInstagram size={14} />
                </div>
                pizza_napolita_officiel
              </a>
              <a
                href="https://wa.me/213540455527"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white text-[13px] font-sans hover:text-[#25D366] transition-colors"
              >
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] hover:bg-[#25D366] hover:border-[#25D366] transition-all shrink-0">
                  <FaWhatsapp size={14} />
                </div>
                0540 45 55 27
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.1)] py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[10px] text-[var(--gray)] uppercase tracking-widest">
            © 2025 NAPOLITA FOOD — BISKRA. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>

      {/* Italian flag stripe */}
      <div className="flex h-[3px] w-full">
        <div className="flex-1 bg-[var(--green)]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[var(--red)]" />
      </div>
    </footer>
  );
}
