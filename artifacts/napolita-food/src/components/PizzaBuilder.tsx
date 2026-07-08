import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function PizzaBuilder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [size, setSize] = useState('30 CM');
  const [sauce, setSauce] = useState('Tomato');
  const [cheese, setCheese] = useState('Mozzarella');
  const [toppings, setToppings] = useState<string[]>(['Mushrooms', 'Olives']);

  const toggleTopping = (topping: string) => {
    setToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  return (
    <section id="builder" className="bg-[#0B0B0B] py-[100px] w-full" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Column (30%) */}
          <div className="w-full lg:w-[30%] flex flex-col items-start">
            <motion.span 
              className="text-white text-[10px] uppercase tracking-[0.2em] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              ★ CUSTOMIZE YOUR ORDER
            </motion.span>
            
            <motion.h2 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block font-sans text-[16px] font-medium text-white uppercase tracking-widest mb-2">
                CREATE YOUR OWN
              </span>
              <span className="block font-serif text-[52px] italic text-[var(--red)] leading-[1.1]">
                PERFECT
              </span>
              <span className="block font-serif text-[52px] text-white leading-[1.1]">
                PIZZA
              </span>
            </motion.h2>

            <motion.p 
              className="font-sans text-[14px] text-[var(--gray)] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Choose your size, sauce, cheese and fresh ingredients. Create a pizza that's uniquely yours.
            </motion.p>

            <motion.button 
              className="bg-[var(--red)] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-black"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              BUILD YOUR PIZZA →
            </motion.button>
          </div>

          {/* Center Column (40%) */}
          <motion.div 
            className="w-full lg:w-[40%] flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[350px] h-[350px] rounded-full shadow-[0_0_60px_rgba(255,255,255,0.05)]">
              <img 
                src="https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg" 
                alt="Pizza Builder" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Right Column (30%) */}
          <motion.div 
            className="w-full lg:w-[30%] bg-[#111111] p-8 flex flex-col gap-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Size */}
            <div className="flex flex-col gap-3">
              <span className="text-[var(--red)] text-[10px] uppercase tracking-widest font-bold">SIZE</span>
              <div className="flex flex-wrap gap-4">
                {['25 CM', '30 CM', '35 CM'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSize(s)}
                    className="flex items-center gap-2 text-white text-[13px]"
                  >
                    <span className={`w-3 h-3 rounded-full border border-[var(--red)] flex items-center justify-center`}>
                      {size === s && <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />}
                    </span>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Sauce */}
            <div className="flex flex-col gap-3">
              <span className="text-[var(--red)] text-[10px] uppercase tracking-widest font-bold">SAUCE</span>
              <div className="flex flex-wrap gap-4">
                {['Tomato', 'Pesto'].map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSauce(s)}
                    className="flex items-center gap-2 text-white text-[13px]"
                  >
                    <span className={`w-3 h-3 rounded-full border border-[var(--red)] flex items-center justify-center`}>
                      {sauce === s && <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />}
                    </span>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Cheese */}
            <div className="flex flex-col gap-3">
              <span className="text-[var(--red)] text-[10px] uppercase tracking-widest font-bold">CHEESE</span>
              <div className="flex flex-wrap gap-4">
                {['Mozzarella', 'Burrata'].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setCheese(c)}
                    className="flex items-center gap-2 text-white text-[13px]"
                  >
                    <span className={`w-3 h-3 rounded-full border border-[var(--red)] flex items-center justify-center`}>
                      {cheese === c && <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" />}
                    </span>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="flex flex-col gap-3">
              <span className="text-[var(--red)] text-[10px] uppercase tracking-widest font-bold">TOPPINGS</span>
              <div className="flex flex-wrap gap-4">
                {['Mushrooms', 'Olives', 'Bell Peppers'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => toggleTopping(t)}
                    className="flex items-center gap-2 text-white text-[13px]"
                  >
                    <span className={`w-3 h-3 border border-[var(--red)] flex items-center justify-center text-[8px] font-bold text-[var(--red)]`}>
                      {toppings.includes(t) && '✓'}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
