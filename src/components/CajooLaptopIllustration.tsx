import React from 'react';
import { motion } from 'motion/react';
import cajooLaptopImg from '../assets/images/cajoo_laptop_pure_black_bg_1785352746711-removebg-preview.png';

export const CajooLaptopIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div id="computer-hero-container" className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Large Soft Radial Ambient Glow pulsing slowly behind laptop */}
      <motion.div 
        animate={{ scale: [0.95, 1.12, 0.95], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-linear-to-tr from-purple-600/35 via-fuchsia-600/25 to-indigo-600/20 blur-[100px] rounded-full pointer-events-none" 
      />

      {/* Laptop Image Container with Floating Code Brackets < > */}
      <div className="relative w-full max-w-237.5 flex justify-center items-center z-10 group">
        
        {/* Soft Radial Screen Glow - Simulating laptop interface light bloom */}
        <motion.div
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [0.96, 1.06, 0.96] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[22%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[58%] h-[38%] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.5)_0%,rgba(168,85,247,0.35)_45%,transparent_75%)] blur-xl sm:blur-2xl rounded-full pointer-events-none mix-blend-screen z-15"
        />

        {/* Secondary subtle ambient screen beam */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[45%] bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.25)_0%,rgba(99,102,241,0.15)_50%,transparent_80%)] blur-2xl sm:blur-3xl rounded-full pointer-events-none mix-blend-plus-lighter z-15"
        />

        {/* Laptop Image */}
        <img
          src={cajooLaptopImg}
          alt="Laptop 3D CAJOO Dashboard"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_25px_50px_rgba(168,85,247,0.4)] scale-100 sm:scale-105 origin-center"
        />

        {/* Static Left Bracket < - Positioned statically right next to the left laptop edge */}
        <div className="absolute left-[14%] sm:left-[15%] md:left-[16%] top-[42%] sm:top-[45%] -translate-y-1/2 z-20 select-none pointer-events-none">
          <svg className="w-5 h-8 sm:w-7 sm:h-12 md:w-9 md:h-15 lg:w-12 lg:h-19 drop-shadow-[0_0_18px_rgba(217,70,239,0.95)]" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 20 L25 70 L75 120" stroke="url(#cajoo-pink-grad-left)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="cajoo-pink-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a85" />
                <stop offset="50%" stopColor="#e026c2" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Static Right Bracket > - Positioned statically right beside the right outer edge near the middle of laptop */}
        <div className="absolute right-[7%] sm:right-[8%] md:right-[9%] top-[42%] sm:top-[45%] -translate-y-1/2 z-20 select-none pointer-events-none">
          <svg className="w-5 h-8 sm:w-7 sm:h-12 md:w-9 md:h-15 lg:w-12 lg:h-19 drop-shadow-[0_0_18px_rgba(217,70,239,0.95)]" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 20 L75 70 L25 120" stroke="url(#cajoo-pink-grad-right)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="cajoo-pink-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a85" />
                <stop offset="50%" stopColor="#e026c2" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>
    </div>
  );
};


