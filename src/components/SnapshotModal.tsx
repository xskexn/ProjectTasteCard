/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Link as LinkIcon, 
  Utensils
} from 'lucide-react';
import { motion } from 'motion/react';
import { CreatorProfile, MediaItem } from '../types';
import { toPng } from 'html-to-image';

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
  onClose: () => void;
  onPostToast: (msg: string) => void;
}

export function SnapshotModal({ 
  profile, 
  mediaItems, 
  currentTheme, 
  customBg, 
  isBgDark, 
  selectedTag,
  onClose, 
  onPostToast 
}: SnapshotModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Compute exact styles from main screen
  const textColor = customBg 
    ? (isBgDark ? '#FDF9F6' : '#0C1519') 
    : currentTheme.text;

  const cardBgClass = customBg
    ? (isBgDark ? 'bg-black/35 backdrop-blur-3xl' : 'bg-white/20 backdrop-blur-3xl')
    : currentTheme.cardBg;

  // Let's make sure card background is transparent & glassy to faintly see the background
  const cardBorderClass = customBg
    ? (isBgDark ? 'border-white/10' : 'border-white/20')
    : currentTheme.cardBorder;

  // Real HD download implementation using html-to-image
  const handleDownload = () => {
    const node = document.getElementById('instagram-snapshot-rendering-layer');
    if (!node) return;

    setIsDownloading(true);

    // High Density capture parameters
    toPng(node, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: customBg ? undefined : currentTheme.bg,
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
        onPostToast('Image capture blocked or failed. Saving fallback...');
        
        // Dynamic fallback to download the background directly if available, otherwise simple notification
        const fallbackLink = document.createElement('a');
        fallbackLink.download = 'tastecard_snapshot.png';
        fallbackLink.href = dataUrlPlaceholder();
        fallbackLink.click();
      });
  };

  // Safe fallback placeholder generator helper
  const dataUrlPlaceholder = () => {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="712" viewBox="0 0 400 712">` +
      `<rect width="100%" height="100%" fill="${currentTheme.bg}"/>` +
      `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="${textColor}">${profile.name}</text>` +
      `</svg>`
    );
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
      className="absolute inset-0 z-50 bg-transparent flex flex-col justify-end p-4 md:p-6"
    >
      {/* Click outside to close layout */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Slide-Up Core Wrapper */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 210 }}
        className="relative z-10 w-full bg-slate-950/45 backdrop-blur-2xl border border-white/10 rounded-[32px] p-5 shadow-2xl flex flex-col max-h-[95%] overflow-hidden text-white"
      >
        {/* Top Header Controls Panel */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/5 bg-transparent">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-amber-400/50 blur-[5px] rounded-full animate-ping opacity-75 w-4 h-4" />
              <Utensils className="w-4 h-4 text-amber-400 relative z-10 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            </div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300 font-bold">
              Share your taste
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Centerpiece viewport previewing the canvas */}
        <div className="flex-1 my-4 flex items-center justify-center overflow-hidden bg-black/50 rounded-[28px] p-4 relative border border-white/5 min-h-[280px]">
          
          {/* Aesthetic background vignette glow decoration */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Snapshot Container with custom layout matching main background & exact styles */}
          <div 
            id="instagram-snapshot-rendering-layer"
            className="transition-all duration-500 flex flex-col justify-between p-5 relative select-none shadow-2xl overflow-hidden rounded-[24px] bg-cover bg-center"
            style={{ 
              backgroundColor: currentTheme.bg,
              backgroundImage: customBg ? `url("${customBg}")` : 'none',
              aspectRatio: '9/16',
              width: '240px',
              height: '426px', // Scaled up slightly for gorgeous proportion
            }}
          >
            {/* Custom background overlay for readability matches main screen */}
            {customBg && (
              <div className={`absolute inset-0 pointer-events-none ${
                isBgDark ? 'bg-black/25' : 'bg-white/5'
              }`} />
            )}

            {/* Top Minimal Header Brand Row */}
            <div className="flex items-center justify-between w-full opacity-75 relative z-10">
              <span className="text-[7px] font-mono tracking-widest uppercase font-extrabold" style={{ color: textColor }}>
                {profile.name.toUpperCase()}
              </span>
              <span className="text-[7px] font-bold font-mono" style={{ color: textColor }}>
                #0000
              </span>
            </div>

            {/* Inner Floated Card Frame (Exact glass replication of the main screen card) */}
            <div 
              className={`w-full rounded-[24px] p-3 border shadow-lg flex flex-col space-y-2.5 mt-2 flex-grow relative z-10 transition-all duration-500 ${cardBgClass} ${cardBorderClass}`}
              style={{ color: textColor }}
            >
              {/* Profile Card Header Title with NO droplet next to it as requested */}
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-[14px] font-display font-black tracking-tight leading-tight">
                    {profile.name}
                  </h4>
                  {/* Dynamic Rarity Badge or custom quote */}
                  {profile.bioQuote === 'Rarity: rare' ? (
                    <div className="flex items-center gap-1 select-none font-sans">
                      <span className="text-[6px] font-mono uppercase tracking-wider opacity-60">Tastecard Rarity:</span>
                      <span className="font-display font-extrabold uppercase text-[7px] tracking-wider bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent">
                        rare
                      </span>
                    </div>
                  ) : (
                    <div className="pl-1.5 border-l border-current/20 italic text-[7px] opacity-70">
                      "{profile.bioQuote}"
                    </div>
                  )}
                </div>
              </div>

              {/* Stats metric bar */}
              <div className="grid grid-cols-3 gap-1 py-1 border-y border-current/15 opacity-90 text-[7px] leading-tight font-mono">
                <div>
                  <span className="block font-bold">
                    {profile.followers === 2300 ? '2.3K' : profile.followers}
                  </span>
                  <span className="text-[5px] uppercase opacity-70">
                    {profile.followers === 2300 ? 'Photos' : 'Followers'}
                  </span>
                </div>
                <div>
                  <span className="block font-bold">{profile.following}</span>
                  <span className="text-[5px] uppercase opacity-70">themes</span>
                </div>
                <div>
                  <span className="block font-bold">{profile.commentsCount}</span>
                  <span className="text-[5px] uppercase opacity-70">Places</span>
                </div>
              </div>

              {/* Tag filters list rendered smaller with active/inactive state */}
              <div className="flex flex-wrap gap-1 justify-center py-0.5">
                {profile.tags.map((tag) => {
                  const isActive = selectedTag === tag;
                  const displayTag = tag.startsWith('#') ? tag.slice(1) : tag;
                  return (
                    <span 
                      key={tag}
                      className={`text-[6px] px-1.5 py-0.5 rounded-full font-bold transition-all ${
                        isActive
                          ? 'bg-white/30 border border-white/55 text-current'
                          : 'bg-white/10 border border-white/5 opacity-60'
                      }`}
                    >
                      {displayTag}
                    </span>
                  );
                })}
              </div>

              {/* Mini picture grid matching exact highlights and blurs of the main screen */}
              <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden min-h-[100px]">
                {mediaItems.slice(0, 4).map((item) => {
                  const isHighlighted = selectedTag === null || item.category === selectedTag;
                  return (
                    <div 
                      key={item.id} 
                      className={`relative aspect-[3/4] bg-white rounded-xl overflow-hidden border border-black/5 transition-all duration-300 ${
                        isHighlighted ? 'opacity-100 scale-100' : 'opacity-35 scale-95 blur-[0.2px]'
                      }`}
                    >
                      <img 
                        src={item.image} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[6px] font-bold text-white leading-tight line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom story footprint label */}
            <div className="w-full text-center opacity-50 relative z-10">
              <span className="text-[6px] font-mono tracking-widest uppercase" style={{ color: textColor }}>
                Lina's Tastecard • #0000
              </span>
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
                : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg active:scale-97 hover:opacity-95'
            }`}
          >
            {isDownloading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 animate-bounce" />
                Save HD Snapshot
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
