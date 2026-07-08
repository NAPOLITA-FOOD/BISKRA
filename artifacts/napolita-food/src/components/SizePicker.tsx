import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../data/menuData';
import { useState } from 'react';

type SizePickerProps = {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (size: string, price: number) => void;
};

export default function SizePicker({ item, isOpen, onClose, onAdd }: SizePickerProps) {
  const [selectedSize, setSelectedSize] = useState<string>('S');

  if (!item) return null;

  const getPrice = (size: string) => {
    if (size === 'S') return item.price;
    if (size === 'M') return item.priceM || item.price;
    if (size === 'L') return item.priceL || item.price;
    return item.price;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#111111] w-full max-w-sm border border-[#2a2a2a] p-6 shadow-2xl"
          >
            <h3 className="text-white font-serif text-2xl mb-6">Choose Your Size</h3>
            
            <div className="space-y-4 mb-8">
              {['S', 'M', 'L'].map((size) => (
                <label
                  key={size}
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setSelectedSize(size)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 border flex items-center justify-center ${selectedSize === size ? 'border-[var(--red)]' : 'border-[#444]'}`}>
                      {selectedSize === size && <div className="w-3 h-3 bg-[var(--red)]" />}
                    </div>
                    <span className="text-white font-sans">
                      {size === 'S' ? 'Small' : size === 'M' ? 'Medium' : 'Large'}
                    </span>
                  </div>
                  <span className="text-[var(--gold)] font-serif">{getPrice(size).toLocaleString()} DA</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => onAdd(selectedSize, getPrice(selectedSize))}
              className="w-full h-12 bg-[var(--red)] text-white font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              ADD TO CART →
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}