import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, CupSoda, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, itemCount, updateQty, removeItem } = useCart();
  const hasDrink = items.some(i => i.category === 'BOISSONS');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleGoToDrinks = () => {
    closeCart();
    window.dispatchEvent(new CustomEvent('go-to-menu-category', { detail: 'BOISSONS' }));
    setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={closeCart}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-[#111111] border-l border-[#2a2a2a] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
                <div>
                  <h2 className="text-white font-sans font-bold tracking-widest text-lg">YOUR ORDER</h2>
                  <p className="text-[#888] text-sm">{itemCount} items</p>
                </div>
                <button onClick={closeCart} className="text-[#888] hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                    <div className="text-6xl mb-4 text-[#888]">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4"><path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/><path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"/><path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/></svg>
                    </div>
                    <h3 className="text-white font-serif text-2xl mb-2">Your cart is empty</h3>
                    <p className="text-[#888] text-sm">Start adding items from our menu</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={`${item.id}-${item.size || ''}`} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="text-[#666] text-[10px] font-sans uppercase tracking-widest mb-0.5">{item.category}</p>
                            <h4 className="text-white font-serif text-lg leading-none">{item.name}</h4>
                            {item.size && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-[#1A1A1A] text-[#888] text-xs border border-[#2a2a2a]">
                                Size: {item.size}
                              </span>
                            )}
                          </div>
                          <span className="text-[var(--gold)] font-serif whitespace-nowrap ml-4">
                            {(item.price * item.quantity).toLocaleString()} DA
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-7 h-7 border border-[#444] rounded-full flex items-center justify-center text-white hover:border-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-7 h-7 border border-[#444] rounded-full flex items-center justify-center text-white hover:border-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--red)] hover:text-white transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-[#2a2a2a] p-6 bg-[#0B0B0B]">
                  {!hasDrink && (
                    <div className="flex items-center justify-between gap-3 mb-6 p-4 border border-[#2a2a2a] bg-[#161616]">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 shrink-0 flex items-center justify-center text-[#888]">
                          <CupSoda size={18} />
                        </div>
                        <p className="text-[#aaa] text-sm leading-tight">
                          مخصكش مشروب؟
                        </p>
                      </div>
                      <button
                        onClick={handleGoToDrinks}
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 border border-[#444] text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors"
                      >
                        Ajouter
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#888]">Subtotal:</span>
                    <span className="text-white">{total.toLocaleString()} DA</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4 pb-4 border-b border-[#2a2a2a]">
                    <span className="text-[#888]">Delivery:</span>
                    <span className="text-white">Free</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white font-bold tracking-widest text-lg">TOTAL:</span>
                    <span className="text-[var(--gold)] font-serif text-2xl">{total.toLocaleString()} DA</span>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full h-14 mb-3 bg-[var(--red)] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    PROCEED TO CHECKOUT →
                  </button>
                  <button 
                    onClick={closeCart}
                    className="w-full h-14 border border-[#444] text-white font-bold uppercase tracking-widest hover:border-white transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
}