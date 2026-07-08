import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="bg-[#0B0B0B] py-[80px]" ref={ref}>
      <div className="container mx-auto px-6">

        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            className="text-[var(--red)] text-[10px] uppercase tracking-[0.2em] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            ─── GALLERY
          </motion.span>

          <motion.h2
            className="font-serif text-[48px] leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-white">A FEAST FOR THE </span>
            <span className="italic text-[var(--red)]">EYES</span>
          </motion.h2>
        </div>

        {/* Full-width video */}
        <motion.div
          className="w-full overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <video
            src="https://res.cloudinary.com/lprhfwpu/video/upload/v1783498040/gallery-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
