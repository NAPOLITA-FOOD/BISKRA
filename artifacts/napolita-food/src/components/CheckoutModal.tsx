import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Check, X, ArrowLeft } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  const handleConfirm = () => {
    clearCart();
    setStep(3);
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => setStep(1), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={step !== 3 ? onClose : undefined}
          />
          
          <div className="relative w-full max-w-lg bg-[#0B0B0B] border border-[#2a2a2a] shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="p-6 flex flex-col h-full absolute inset-0"
                >
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a2a]">
                    <h2 className="text-white font-sans font-bold tracking-widest text-lg">CHECKOUT</h2>
                    <button onClick={onClose} className="text-[#888] hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div>
                      <label className="block text-[#888] text-sm mb-2">Votre Nom *</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-[#444] text-white py-2 focus:outline-none focus:border-[var(--red)] transition-colors"
                        placeholder="Entrez votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] text-sm mb-2">Numéro de téléphone *</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-[#444] text-white py-2 focus:outline-none focus:border-[var(--red)] transition-colors"
                        placeholder="05..."
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] text-sm mb-2">Adresse de livraison *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-transparent border-b border-[#444] text-white py-2 focus:outline-none focus:border-[var(--red)] transition-colors"
                        placeholder="Quartier, rue..."
                      />
                    </div>

                    <div>
                      <label className="block text-[#888] text-sm mb-2">Note (optionnel)</label>
                      <textarea
                        value={formData.note}
                        onChange={e => setFormData({...formData, note: e.target.value})}
                        rows={2}
                        className="w-full bg-transparent border-b border-[#444] text-white py-2 focus:outline-none focus:border-[var(--red)] transition-colors resize-none"
                        placeholder="Remarques, allergies, préférences..."
                      />
                    </div>
                  </div>

                  <button
                    disabled={!formData.name || !formData.phone || !formData.address}
                    onClick={() => setStep(2)}
                    className="w-full mt-8 h-14 bg-[var(--red)] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-[var(--red)] disabled:hover:text-white"
                  >
                    CONTINUER →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="p-6 flex flex-col h-full absolute inset-0"
                >
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a2a]">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setStep(1)} className="text-[#888] hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                      </button>
                      <h2 className="text-white font-sans font-bold tracking-widest text-lg">RÉCAPITULATIF</h2>
                    </div>
                    <span className="text-[#888] text-sm">STEP 2/2</span>
                  </div>

                  <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-4">
                    {items.map(item => (
                      <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                        <div className="flex gap-3 items-center">
                          <span className="text-[#888]">{item.quantity}x</span>
                          <span className="text-white">{item.name} {item.size ? `(${item.size})` : ''}</span>
                        </div>
                        <span className="text-[var(--gold)] font-serif">{(item.price * item.quantity).toLocaleString()} DA</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#2a2a2a] pt-4 space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Adresse</span>
                      <span className="text-white text-right max-w-[200px]">{formData.address}</span>
                    </div>
                    {formData.note && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#888]">Note</span>
                        <span className="text-white text-right max-w-[200px]">{formData.note}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-[var(--gold)] font-serif text-xl">{total.toLocaleString()} DA</span>
                    </div>
                    <div className="text-[#888] text-xs">
                      Paiement: Cash à la livraison
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full h-14 bg-[var(--red)] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    CONFIRMER LA COMMANDE →
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 flex flex-col h-full absolute inset-0 items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full border-2 border-[var(--green)] flex items-center justify-center text-[var(--green)] mb-6"
                  >
                    <Check size={40} />
                  </motion.div>
                  
                  <h2 className="text-white font-serif text-3xl mb-4">Commande Confirmée!</h2>
                  <p className="text-[#888] mb-2">Merci {formData.name}! Votre commande est en cours de préparation.</p>
                  <p className="text-white font-medium mb-6">Livraison estimée: 25-35 minutes</p>
                  <div className="bg-[#1A1A1A] px-6 py-3 border border-[#2a2a2a] text-sm text-[#888] mb-8">
                    Numéro de commande: <span className="text-white font-bold">#NF{Math.floor(Math.random() * 9000) + 1000}</span>
                  </div>

                  <button
                    onClick={closeAndReset}
                    className="w-full max-w-xs h-14 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#ccc] transition-colors"
                  >
                    FERMER
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}