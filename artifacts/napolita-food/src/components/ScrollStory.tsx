import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="bg-[#0B0B0B] py-[100px] w-full" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <motion.span 
              className="text-[var(--red)] text-[10px] uppercase tracking-[0.2em] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              ─── OUR STORY
            </motion.span>

            <motion.h2 
              className="font-serif text-[60px] leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block text-white">A PASSION FOR</span>
              <span className="block">
                <span className="italic text-[var(--red)]">ITALIAN</span>{' '}
                <span className="italic text-white">FLAVOR</span>
              </span>
            </motion.h2>

            <motion.p 
              className="font-sans font-light text-[15px] text-[var(--gray)] max-w-[500px] leading-[1.8] mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Napolita Food was born from a love for authentic Italian cuisine. We use only the freshest ingredients, traditional recipes, and a touch of Italian soul in every dish we serve.
            </motion.p>

            <motion.button 
              className="border border-white text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              DISCOVER MORE →
            </motion.button>
          </div>

          {/* Right Column (45%) — 3 real pizza photos */}
          <div className="w-full lg:w-[45%] flex flex-col gap-2">
            <motion.div
              className="w-full h-[240px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://res.cloudinary.com/lprhfwpu/image/upload/v1783497560/story-pizza-1.jpg"
                alt="Napolita pizza"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <div className="flex gap-2">
              <motion.div
                className="w-1/2 h-[160px] overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <img
                  src="https://res.cloudinary.com/lprhfwpu/image/upload/v1783497562/story-pizza-2.jpg"
                  alt="Napolita pizza 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                className="w-1/2 h-[160px] overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <img
                  src="https://res.cloudinary.com/lprhfwpu/image/upload/v1783497563/story-pizza-3.jpg"
                  alt="Napolita pizza 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
