import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bike } from 'lucide-react';

export default function DeliverySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#090909] py-[80px] w-full" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left Column (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col items-start">
            <motion.div 
              className="text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Bike size={32} />
            </motion.div>
            
            <motion.span 
              className="text-[var(--red)] text-[10px] uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              FAST & HOT
            </motion.span>
            
            <motion.h2 
              className="font-serif text-[42px] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white">WE DELIVER</span>
              <span className="block text-white">TO YOU</span>
            </motion.h2>

            <motion.p 
              className="font-sans text-[14px] text-[var(--gray)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your favorite Italian dishes delivered hot and fresh to your door.
            </motion.p>

            <motion.div 
              className="w-16 h-px bg-[var(--gold)]"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: 64 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          {/* Center Column (30%) */}
          <motion.div 
            className="w-full lg:w-[30%] flex flex-col items-center gap-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full h-[300px] overflow-hidden">
              <img 
                src="https://res.cloudinary.com/lprhfwpu/image/upload/v1783497295/delivery-scooter.jpg" 
                alt="Delivery scooter" 
                className="w-full h-full object-cover"
              />
            </div>
            <img 
              src={`${import.meta.env.BASE_URL}logo-round-new.png`} 
              alt="Napolita Food" 
              className="w-[72px] h-[72px] object-contain"
            />
          </motion.div>

          {/* Right Column (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-end text-center lg:text-right">
            <motion.div 
              className="flex flex-col mb-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-sans text-[14px] text-white uppercase tracking-widest">DELIVERED IN</span>
              <span className="font-sans text-[14px] text-white uppercase tracking-widest">LESS THAN</span>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center lg:items-end mb-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="font-serif font-black text-[100px] leading-[0.9] text-[var(--red)]">
                30
              </span>
              <span className="font-sans text-[24px] text-white uppercase tracking-[0.2em] mt-2">
                MINUTES
              </span>
            </motion.div>

            <motion.button 
              className="border border-white text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              TRACK YOUR ORDER →
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}
