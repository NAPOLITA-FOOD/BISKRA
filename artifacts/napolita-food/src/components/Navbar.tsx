import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, openCart } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'MENU', id: 'menu' },
    { name: 'ABOUT', id: 'story' },
    { name: 'PIZZA BUILDER', id: 'builder' },
    { name: 'GALLERY', id: 'gallery' },
    { name: 'CONTACT', id: 'footer' }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-panel h-16 border-b border-white/5' : 'bg-[#0B0B0B] h-16'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div 
          className="cursor-pointer flex items-center gap-3" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={`${import.meta.env.BASE_URL}logo-round-new.png`}
            alt="NAPOLITA FOOD Logo" 
            className="h-14 w-14 object-contain"
          />
          <span className="font-sans font-bold text-white tracking-wide">NAPOLITA FOOD</span>
        </div>
        
        {/* Center: Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollTo(item.id)}
              className="text-[11px] font-sans uppercase tracking-[0.15em] text-white hover:text-[var(--red)] transition-colors duration-300"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Right: Cart & CTA */}
        <div className="flex items-center gap-6">
          <button 
            onClick={openCart}
            className="relative text-white hover:text-[var(--red)] transition-colors"
          >
            <img src="https://res.cloudinary.com/lprhfwpu/image/upload/v1783498074/cart-icon.png" alt="Cart" className="w-7 h-7 object-contain" />
            {itemCount > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={itemCount}
                className="absolute -top-2 -right-2 bg-[var(--red)] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
              >
                {itemCount}
              </motion.div>
            )}
          </button>
          <button 
            onClick={() => scrollTo('reserve')}
            className="hidden sm:block px-6 h-10 bg-[var(--red)] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
          >
            ORDER NOW
          </button>
        </div>

      </div>
    </motion.nav>
  );
}