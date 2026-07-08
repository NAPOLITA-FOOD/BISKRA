import { motion } from 'framer-motion';

export default function HeroSection() {
  const words = ["AUTHENTIC", "ITALIAN", "EXPERIENCE"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center bg-[#0B0B0B] overflow-hidden pt-16">

      {/* Cinematic Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/lprhfwpu/video/upload/v1783497310/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Left-to-right gradient overlay — keeps text readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/85 to-[#0B0B0B]/30" />
      {/* Bottom fade */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="w-full lg:w-1/2 text-left">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <span className="text-[var(--red)] text-xs uppercase tracking-widest font-sans font-medium mb-6 block">
              ★ Authentic Italian Cuisine
            </span>
          </motion.div>

          <motion.h1
            className="font-serif leading-[1.05] mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="block text-[42px] sm:text-[64px] lg:text-[100px] font-black"
                variants={wordVariants}
                style={
                  word === "ITALIAN"
                  ? {
                      background: 'linear-gradient(90deg, #2ECC71 0%, #fff 50%, #E63946 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }
                  : { color: 'var(--white)' }
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="font-sans font-light text-[var(--gray)] text-base max-w-[400px] leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            We bring the true taste of Italy to your table. Made with love, served with passion.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <button
              data-testid="hero-order-now"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[var(--red)] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              ORDER NOW
            </button>
            <button
              data-testid="hero-explore-menu"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border border-white text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              EXPLORE MENU →
            </button>
          </motion.div>
        </div>

        {/* Bottom Elements */}
        <div className="absolute bottom-10 left-6 flex items-center">
          <span className="text-white text-xs font-sans tracking-widest">01 ─── 03</span>
        </div>

        <div className="absolute bottom-10 right-6 flex items-center cursor-pointer group">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mr-3 group-hover:bg-white transition-colors duration-300">
            <svg className="w-3 h-3 text-white group-hover:text-black ml-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-white text-xs font-sans tracking-widest uppercase">▶ WATCH OUR STORY</span>
        </div>
      </div>
    </section>
  );
}
