import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { menuCategories, menuItems, MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import SizePicker from './SizePicker';

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  const [addedPulseId, setAddedPulseId] = useState<string | null>(null);
  const { addItem } = useCart();

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const handleGoToCategory = (e: Event) => {
      const category = (e as CustomEvent<string>).detail;
      if (category) setActiveCategory(category);
    };
    window.addEventListener('go-to-menu-category', handleGoToCategory);
    return () => window.removeEventListener('go-to-menu-category', handleGoToCategory);
  }, []);

  const handleAddClick = (item: MenuItem) => {
    if (item.hasSizes) {
      setSelectedPizza(item);
    } else {
      addItem({
        id: item.id,
        name: item.name,
        nameAr: item.nameAr,
        category: item.category,
        price: item.price,
        image: item.image
      });
      
      setAddedPulseId(item.id);
      setTimeout(() => setAddedPulseId(null), 1000);
    }
  };

  const handleSizeAdd = (size: string, price: number) => {
    if (selectedPizza) {
      addItem({
        id: `${selectedPizza.id}-${size}`,
        name: selectedPizza.name,
        nameAr: selectedPizza.nameAr,
        category: selectedPizza.category,
        price: price,
        size: size,
        image: selectedPizza.image
      });
      setSelectedPizza(null);
    }
  };

  return (
    <section id="menu" className="bg-[#161616] py-[100px]" ref={ref}>
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-12">
          <motion.h2 
            className="font-serif text-[42px] md:text-[56px] font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            OUR MENU
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-[var(--red)] mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Categories Scrollable Row */}
        <motion.div 
          className="flex overflow-x-auto pb-6 mb-8 gap-3 no-scrollbar scroll-smooth snap-x"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-center shrink-0 px-6 py-2 border font-sans text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-[var(--red)] border-[var(--red)] text-white' 
                  : 'bg-transparent border-[#444] text-[#888] hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu List */}
        <div className="flex flex-col divide-y divide-[#222]">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="group flex items-center justify-between gap-4 py-5 hover:bg-[#1a1a1a] transition-colors duration-200 px-3 -mx-3 relative"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              {/* Left: name + description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-serif text-[18px] text-white leading-tight">
                    {item.name}
                  </h3>
                  {item.nameAr && (
                    <span className="text-[#666] text-[13px] font-sans">/ {item.nameAr}</span>
                  )}
                  {item.popular && (
                    <span className="bg-[var(--red)] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider shrink-0">
                      Popular
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="font-sans text-[12px] text-[#666] leading-relaxed line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Right: price + button */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-serif text-[17px] text-[var(--gold)] whitespace-nowrap">
                  {item.price.toLocaleString()} DA
                  {item.hasSizes && <span className="text-xs text-[#888] ml-0.5 font-sans">+</span>}
                </span>
                <button
                  onClick={() => handleAddClick(item)}
                  className={`w-8 h-8 flex items-center justify-center text-[13px] font-bold transition-colors shrink-0 ${
                    addedPulseId === item.id
                      ? 'bg-[var(--green)] text-white'
                      : 'bg-[var(--red)] text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {addedPulseId === item.id ? '✓' : '+'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <SizePicker 
        item={selectedPizza} 
        isOpen={!!selectedPizza} 
        onClose={() => setSelectedPizza(null)} 
        onAdd={handleSizeAdd} 
      />
    </section>
  );
}