/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Link as LinkIcon, 
  Compass,
  Utensils,
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { CreatorProfile, MediaItem } from '../types';
import { toPng } from 'html-to-image';
import { IMMERSIVE_CATEGORIES } from '../App';

interface SnapshotModalProps {
  profile: CreatorProfile;
  mediaItems: MediaItem[];
  currentTheme: {
    name: string;
    bg: string;
    text: string;
    cardBg: string;
    cardBorder: string;
  };
  customBg: string | null;
  isBgDark: boolean;
  selectedTag: string | null;
  designStyle: 'glass' | 'immersive' | 'editorial';
  onClose: () => void;
  onPostToast: (msg: string) => void;
}

export function SnapshotModal({ 
  profile, 
  selectedTag,
  onClose, 
  onPostToast 
}: SnapshotModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Find the selected category detail, default to first category if null
  const selectedCategory = IMMERSIVE_CATEGORIES.find(c => c.id === selectedTag) || IMMERSIVE_CATEGORIES[0];

  // HD download implementation using html-to-image
  const handleDownload = () => {
    const node = document.getElementById('instagram-snapshot-rendering-layer');
    if (!node) return;

    setIsDownloading(true);

    toPng(node, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: '#0a0a09',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: node.offsetWidth + 'px',
        height: node.offsetHeight + 'px',
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_tastecard.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
        onPostToast('High-Res PNG Saved to your Downloads! 📸');
      })
      .catch((error) => {
        console.error('Snapshot capture failed:', error);
        setIsDownloading(false);
        onPostToast('Download failed. Please try again.');
      });
  };

  const handleCopy = () => {
    const mockUrl = `https://linas.tastecard.io/${profile.handle.slice(1)}`;
    navigator.clipboard.writeText(mockUrl).catch(() => {});
    onPostToast('Story Link Sticker copied! 🔗');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end p-4 md:p-6"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Slide-Up Core Wrapper */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 210 }}
        className="relative z-10 w-full bg-[#14100e] border border-white/10 rounded-[32px] p-5 shadow-2xl flex flex-col max-h-[95%] overflow-hidden text-white"
      >
        {/* Top Header Controls Panel */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/5 bg-transparent">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-amber-400/50 blur-[5px] rounded-full animate-ping opacity-75 w-4 h-4" />
              <Compass className="w-4 h-4 text-amber-400 relative z-10" />
            </div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300 font-bold">
              Export Curation Story Sticker
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Preview Viewport */}
        <div className="flex-1 my-4 flex items-center justify-center overflow-auto bg-black/40 rounded-[28px] p-4 relative border border-white/5 min-h-[300px]">
          
          {/* Snapshot Container representing the cinematic, gorgeous design of Screen 3 */}
          <div 
            id="instagram-snapshot-rendering-layer"
            className="transition-all duration-500 flex flex-col justify-between p-5 relative select-none shadow-2xl overflow-hidden rounded-[24px] bg-cover bg-center text-white"
            style={{ 
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%), url("${selectedCategory.image}")`,
              aspectRatio: '9/16',
              width: '240px',
              height: '426px',
            }}
          >
            {/* Top header sticker branding */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[6.5px] font-mono text-zinc-400">
              <span className="text-amber-400 font-extrabold tracking-widest uppercase">Lina's Tastecard</span>
              <span>📍 VERIFIED EXPORT</span>
            </div>

            {/* Immersive Category Core Info */}
            <div className="space-y-2 mt-auto text-left">
              <div className="flex items-center gap-1">
                {selectedCategory.id === '#nomad' && <Compass className="w-3.5 h-3.5 text-amber-400" />}
                {selectedCategory.id === '#foodie' && <Utensils className="w-3.5 h-3.5 text-amber-400" />}
                {selectedCategory.id === '#wellness' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                {selectedCategory.id === '#bookworm' && <BookOpen className="w-3.5 h-3.5 text-amber-400" />}
                <span className="text-[7.5px] font-mono text-zinc-450 uppercase tracking-widest font-extrabold">{selectedCategory.location}</span>
              </div>

              <h3 className="text-xl font-serif text-white leading-none font-bold">
                {selectedCategory.title === 'THE PEAKS' ? 'AlUla Peaks' : (selectedCategory.title === 'THE FLAVORS' ? 'Citrus Oasis' : (selectedCategory.title === 'THE REFUSION' ? 'Sage Tonic' : 'Ancient Keep'))}
              </h3>
              
              <p className="text-[7.5px] text-zinc-300 leading-normal line-clamp-3">
                {selectedCategory.description}
              </p>

              {/* Gold metrics stamp */}
              <div className="grid grid-cols-2 gap-1 py-1 px-1.5 bg-black/40 border border-white/10 rounded-xl text-center text-[7px]">
                <div>
                  <span className="block font-bold text-amber-400">{selectedCategory.percentageText}</span>
                  <span className="block text-[4.5px] text-zinc-400 uppercase font-mono tracking-wider font-semibold">Coherency</span>
                </div>
                <div>
                  <span className="block font-bold text-amber-400">4.95 ★</span>
                  <span className="block text-[4.5px] text-zinc-400 uppercase font-mono tracking-wider font-semibold">Rating</span>
                </div>
              </div>
            </div>

            {/* Bottom branding footer */}
            <div className="text-center text-[5.5px] font-mono text-zinc-500 tracking-[0.2em] uppercase pt-2 border-t border-white/5 mt-2">
              Discover futures at linas.tastecard.io
            </div>
          </div>
        </div>

        {/* Action Buttons Footer Panel */}
        <div className="space-y-2.5 pt-3.5 border-t border-white/5 bg-transparent">
          <button
            onClick={handleCopy}
            className="w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-97 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white border border-white/10 cursor-pointer"
          >
            <LinkIcon className="w-4 h-4 text-emerald-400" />
            Copy Sticker Link
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              isDownloading 
                ? 'bg-zinc-700 text-zinc-400' 
                : 'bg-gradient-to-r from-amber-500 to-orange-600 text-neutral-950 shadow-lg active:scale-97 hover:opacity-95'
            }`}
          >
            {isDownloading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-neutral-950" />
                Save Story Sticker Image
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
