/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhoneFrameProps {
  children: React.ReactNode;
  islandMessage?: string | null;
  onClearIsland?: () => void;
}

export function PhoneFrame({ children, islandMessage, onClearIsland }: PhoneFrameProps) {
  const [time, setTime] = useState('');

  // Sychronize device clock with real local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30); // update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Clear island message after 3 seconds
  useEffect(() => {
    if (islandMessage && onClearIsland) {
      const timer = setTimeout(() => {
        onClearIsland();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [islandMessage, onClearIsland]);

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center p-4">
      {/* Decorative physical phone shadows and highlights */}
      <div className="relative h-[860px] w-[398px] rounded-[56px] border-[10px] border-[#222129] bg-[#0c0c0e] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-[#3a3944] ring-offset-4 ring-offset-zinc-900 transition-all duration-300">
        
        {/* Anti-glare screen layer & Bezel inner shadow */}
        <div className="absolute inset-0 z-40 rounded-[46px] pointer-events-none ring-1 ring-inset ring-white/10" />

        {/* Dynamic Inner Screen Screen Box */}
        <div className="relative h-full w-full overflow-hidden rounded-[46px] bg-[#121214] flex flex-col">
          
          {/* Top StatusBar Area */}
          <div className="absolute top-0 left-0 right-0 z-50 h-11 px-8 flex items-center justify-between text-white font-sans text-xs select-none">
            {/* Clock Indicator on the Left */}
            <span className="font-semibold tracking-tight text-[13px]">{time}</span>

            {/* Dynamic Island in the Center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 z-50">
              <AnimatePresence mode="wait">
                {islandMessage ? (
                  /* Expanded alert dynamic island style */
                  <motion.div
                    key="dynamic-island-alert"
                    initial={{ width: 110, height: 30, borderRadius: 15 }}
                    animate={{ 
                      width: 250, 
                      height: 42, 
                      borderRadius: 24,
                      y: 1
                    }}
                    exit={{ width: 110, height: 30, borderRadius: 15 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="bg-black border border-white/5 flex items-center justify-between px-4 py-2 shadow-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="text-[11px] font-medium text-emerald-100 truncate w-full tracking-wide">
                        {islandMessage}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  /* Standard pill-shaped compact dynamic island */
                  <motion.div
                    key="dynamic-island-idle"
                    initial={{ width: 110 }}
                    animate={{ width: 110 }}
                    exit={{ width: 110 }}
                    className="w-[110px] h-[30px] bg-black rounded-[15px] flex items-center justify-center gap-1.5 border border-white/5 shadow-inner"
                  >
                    {/* Simulated sensors */}
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900/80 mr-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#100c3b] self-center animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Signal & Tech Indicators on the Right */}
            <div className="flex items-center gap-1.5 text-white/90">
              <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-[10px] uppercase font-mono tracking-wider">5G</span>
              <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
              <div className="flex items-center gap-0.5">
                <Battery className="w-[18px] h-3.5" strokeWidth={2.2} />
              </div>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="flex-1 h-full w-full pt-11 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Virtual iOS Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-50 w-[120px] h-1 bg-white/40 rounded-full cursor-pointer hover:bg-white/80 transition-colors" />
        </div>
      </div>
    </div>
  );
}
