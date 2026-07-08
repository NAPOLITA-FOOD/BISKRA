import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onDone: () => void;
}

// The loader video is ~10s; give it headroom before falling back (e.g. if autoplay is blocked).
const MAX_LOADER_MS = 12000;

export default function VideoLoader({ onDone }: Props) {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const didFinishRef = useRef(false);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (didFinishRef.current) return;
      didFinishRef.current = true;
      clearTimeout(fallback);
      setVisible(false);
      exitTimer = setTimeout(onDone, 700);
    };

    // Fallback in case the video fails to load/play (autoplay blocked, slow network, etc.)
    const fallback = setTimeout(finish, MAX_LOADER_MS);

    const video = videoRef.current;
    video?.addEventListener('ended', finish);
    video?.play().catch(() => {
      // Autoplay was blocked; the fallback timer will still dismiss the loader.
    });

    return () => {
      clearTimeout(fallback);
      clearTimeout(exitTimer);
      video?.removeEventListener('ended', finish);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0B0B0B] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Italian flag stripe — top */}
          <motion.div
            className="absolute top-0 left-0 right-0 flex h-[3px] z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          >
            <div className="flex-1 bg-[#2ECC71]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#E63946]" />
          </motion.div>

          {/* Loader video */}
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={`${import.meta.env.BASE_URL}video/loader.mp4`}
            muted
            autoPlay
            playsInline
            preload="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Italian flag stripe — bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex h-[3px] z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'right' }}
          >
            <div className="flex-1 bg-[#2ECC71]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#E63946]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
