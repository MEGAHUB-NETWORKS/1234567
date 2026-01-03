
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdBannerProps {
  type: 'leaderboard' | 'sidebar' | 'popup' | 'sticky-footer';
  onClose?: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ type, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (type === 'popup') {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [type]);

  if (type === 'popup') {
    return (
      <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-[#1e2329] border-2 border-[#fcd535] max-w-lg w-full rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(252,213,53,0.3)]"
        >
          {countdown === 0 ? (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-[#fcd535] hover:text-black p-2 rounded-full transition-all z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <div className="absolute top-4 right-4 bg-black/80 text-[#fcd535] px-3 py-1 rounded-full text-xs font-bold z-10">
              Close in {countdown}s
            </div>
          )}
          
          <div className="h-56 bg-gradient-to-br from-[#fcd535] via-[#f0b90b] to-[#c99400] flex items-center justify-center overflow-hidden group">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-black font-black text-6xl opacity-20 absolute select-none"
            >
              CASHBACK BONUS
            </motion.div>
            <div className="text-black text-center relative px-6">
              <div className="text-4xl font-black mb-1 drop-shadow-lg">WIN $50,000</div>
              <p className="font-bold text-lg opacity-80 uppercase tracking-tighter italic">Trading Tournament Entry</p>
            </div>
          </div>
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3 text-white">Institutional Access Level</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">Unlock advanced earning pools and zero-fee withdrawals with our professional tier sponsorship. Join 1.2M traders today.</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 bg-[#fcd535] text-black font-black rounded-xl hover:scale-105 transition-transform shadow-lg uppercase tracking-widest text-sm">
                Join Now
              </button>
              <button className="py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all uppercase tracking-widest text-sm">
                Learn More
              </button>
            </div>
          </div>
          <div className="bg-[#181a20] px-8 py-3 text-[10px] text-center text-gray-500 font-bold tracking-widest uppercase border-t border-gray-800">
            Ad powered by Global Partner Network • AdsPop Premium
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === 'sticky-footer') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fcd535] py-2 flex items-center justify-center px-4 md:px-10 overflow-hidden border-t border-black/10">
        <div className="animate-ticker whitespace-nowrap text-black font-black uppercase text-sm flex gap-20">
          <span>Get up to 100 USDT in rewards • Complete Identity Verification today • Use code: EARNPRO20 • Join the largest earning community in the world</span>
          <span>Get up to 100 USDT in rewards • Complete Identity Verification today • Use code: EARNPRO20 • Join the largest earning community in the world</span>
        </div>
      </div>
    );
  }

  if (type === 'leaderboard') {
    return (
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="w-full h-32 glass border border-[#fcd535]/30 rounded-2xl flex items-center justify-between px-8 overflow-hidden mb-8 group cursor-pointer relative shadow-lg"
      >
        <div className="absolute top-0 right-0 bg-[#fcd535] text-[9px] px-2 py-0.5 text-black font-black uppercase rounded-bl-lg">Ad</div>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#fcd535] to-white rounded-2xl rotate-3 flex items-center justify-center text-black font-black text-2xl group-hover:rotate-0 transition-transform shadow-xl">
            B
          </div>
          <div>
            <div className="font-black text-2xl text-white tracking-tight">VIP SIGNAL ACCESS</div>
            <p className="text-sm text-[#fcd535] font-bold">94.2% Success Rate • Institutional Grade Analysis</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-[#fcd535] hover:bg-white text-black font-black rounded-xl transition-all shadow-xl uppercase text-xs tracking-widest">
          Claim VIP
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full aspect-square glass border border-gray-800 rounded-2xl p-6 flex flex-col justify-between mb-8 relative cursor-pointer group hover:border-[#fcd535]/50 transition-all">
      <div className="absolute top-0 right-0 bg-gray-800 text-[9px] px-2 py-0.5 text-gray-500 font-bold uppercase rounded-bl-lg">Sponsored</div>
      <div className="h-3/4 bg-[#181a20] rounded-xl flex items-center justify-center text-gray-600 font-black text-3xl overflow-hidden group-hover:scale-105 transition-transform border border-gray-700">
        <div className="animate-pulse bg-gradient-to-br from-gray-800 to-transparent w-full h-full flex items-center justify-center italic text-4xl">
          PRO-S
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-black text-white text-base truncate uppercase tracking-tight">Institutional Yields</h4>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-medium">Earn like the top 1%. Access hidden liquidity pools with 24/7 automated management.</p>
      </div>
    </div>
  );
};

export default AdBanner;
