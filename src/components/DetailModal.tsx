/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaItem } from '../types';

interface DetailModalProps {
  item: MediaItem;
  onClose: () => void;
  onToggleLike: (id: string, currentlyLiked: boolean) => void;
  liked: boolean;
  onUpdateImage: (id: string, newImage: string) => void;
}

export function DetailModal({ item, onClose, onToggleLike, liked, onUpdateImage }: DetailModalProps) {
  const [likesCount, setLikesCount] = useState(item.likes);
  const [localLiked, setLocalLiked] = useState(liked);
  const [isSparkling, setIsSparkling] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLikeClick = () => {
    const nextState = !localLiked;
    setLocalLiked(nextState);
    setLikesCount(prev => (nextState ? prev + 1 : prev - 1));
    onToggleLike(item.id, localLiked);
    
    if (nextState) {
      setIsSparkling(true);
      setTimeout(() => setIsSparkling(false), 900);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateImage) {
      const imageUrl = URL.createObjectURL(file);
      onUpdateImage(item.id, imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-transparent flex flex-col justify-end p-4"
    >
      {/* Click outside to close container */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-up Container */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative z-10 w-full bg-slate-950/45 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90%]"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-transparent">
          <span className="text-xs font-bold font-mono tracking-widest text-zinc-100 uppercase select-none">
            {item.category.startsWith('#') ? item.category.slice(1) : item.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all flex items-center justify-center text-zinc-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto no-scrollbar p-5 flex-1 space-y-5">
          {/* Main Visual Asset Thumbnail */}
          <div className="relative group aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft dark vignetting layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Title and Stats Row */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                {item.title}
              </h3>
              {(() => {
                const r = (() => {
                  const cat = item.category.toLowerCase();
                  if (cat.includes('bookworm')) {
                    return { name: 'common', gradient: 'from-zinc-400 via-zinc-200 to-zinc-500' };
                  }
                  if (cat.includes('foodie')) {
                    return { name: 'rare', gradient: 'from-amber-400 via-rose-300 to-amber-600' };
                  }
                  if (cat.includes('nomad')) {
                    return { name: 'epic', gradient: 'from-fuchsia-400 via-pink-200 to-violet-500' };
                  }
                  if (cat.includes('wellness')) {
                    return { name: 'legendary', gradient: 'from-emerald-400 via-teal-100 to-amber-500' };
                  }
                  return { name: 'custom', gradient: 'from-cyan-400 via-indigo-200 to-sky-500' };
                })();
                return (
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="text-zinc-400 font-sans">Theme rarity:</span>
                    <span className={`font-display font-extrabold uppercase text-xs tracking-wider bg-gradient-to-r ${r.gradient} bg-clip-text text-transparent select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.05)]`}>
                      {r.name}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Micro interactivity Like Counter */}
            <div className="flex items-center gap-1">
              <div className="text-right pl-1 select-none">
                <span className="block font-mono text-sm font-semibold text-white">
                  {likesCount}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-zinc-500 font-mono">
                  photos
                </span>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-3 h-3 text-amber-400" />
              Atlas Insight
            </h4>
            <p className="text-sm text-zinc-200 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>

          {/* Tips / Interactive Quote details */}
          <div className="text-center pt-2 pb-1 text-[11px] text-zinc-400 font-sans italic">
            you are free to change the photo being displayed
          </div>

          {/* Change Photo Trigger Button */}
          <div className="w-full pt-1 pb-3">
            <button
              onClick={triggerFileInput}
              className="w-full py-3.5 rounded-2xl text-xs font-extrabold font-sans tracking-widest transition-all duration-300 shadow-md active:scale-97 flex items-center justify-center gap-2 cursor-pointer uppercase bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:shadow-lg"
            >
              <span>change photo</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
