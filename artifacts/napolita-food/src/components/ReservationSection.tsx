import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ReservationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [guests, setGuests] = useState(2);

  return (
    <section id="reserve" className="bg-[#0B0B0B] py-[100px]" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Form Column (full width) */}
          <div className="w-full flex flex-col items-start justify-center">
            <motion.span 
              className="text-[var(--red)] text-[10px] uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              RESERVE A TABLE
            </motion.span>
            
            <motion.h2 
              className="font-serif text-[48px] leading-[1.1] mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block text-white">BOOK YOUR</span>
              <span className="block italic text-white">TABLE</span>
            </motion.h2>

            <motion.form 
              className="w-full flex flex-col gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={e => e.preventDefault()}
            >
              {/* Name */}
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="YOUR NAME" 
                  className="w-full bg-transparent border-b border-white text-white placeholder-white text-[12px] uppercase tracking-widest pb-3 focus:outline-none focus:border-[var(--red)] transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div className="w-full">
                <input 
                  type="tel" 
                  placeholder="PHONE NUMBER" 
                  className="w-full bg-transparent border-b border-white text-white placeholder-white text-[12px] uppercase tracking-widest pb-3 focus:outline-none focus:border-[var(--red)] transition-colors"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="w-full flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-1/2">
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-b border-white text-white text-[12px] uppercase tracking-widest pb-3 focus:outline-none focus:border-[var(--red)] transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <select 
                    className="w-full bg-transparent border-b border-white text-white text-[12px] uppercase tracking-widest pb-3 focus:outline-none focus:border-[var(--red)] transition-colors appearance-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled hidden>TIME</option>
                    <option value="18:00" className="text-black">18:00</option>
                    <option value="19:00" className="text-black">19:00</option>
                    <option value="20:00" className="text-black">20:00</option>
                    <option value="21:00" className="text-black">21:00</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="w-full border-b border-white pb-3 flex justify-between items-center">
                <span className="text-white text-[12px] uppercase tracking-widest">PEOPLE</span>
                <div className="flex items-center gap-6">
                  <button 
                    type="button" 
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="text-[var(--gray)] hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-white text-[14px] w-4 text-center">{guests}</span>
                  <button 
                    type="button" 
                    onClick={() => setGuests(guests + 1)}
                    className="text-[var(--gray)] hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="mt-6 self-start bg-white text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[var(--red)] hover:text-white transition-colors duration-300"
              >
                RESERVE NOW →
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}
