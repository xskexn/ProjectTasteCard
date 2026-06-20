/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  RotateCcw, 
  Heart, 
  UserCheck, 
  Users,
  Instagram,
  Sparkles,
  Compass,
  Palette,
  Layers,
  MapPin,
  Star,
  Award,
  ChevronRight,
  Sliders,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { CreatorProfile, MediaItem } from './types';
import { 
  INITIAL_PROFILE, 
  INITIAL_MEDIA_ITEMS 
} from './initialData';
import { DetailModal } from './components/DetailModal';
import { ShareModal } from './components/ShareModal';
import { SnapshotModal } from './components/SnapshotModal';

// Define our curated, high-contrast, premium color themes from the user's specs
interface ColorTheme {
  name: string;
  bg: string;          // Page background color
  text: string;        // Main text color
  cardBg: string;      // Card bg (glass blur)
  cardBorder: string;  // Card border
}

const APP_THEMES: ColorTheme[] = [
  {
    name: "Cream",
    bg: '#F3E5C3',
    text: '#0C1519',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/25'
  },
  {
    name: "China Rose",
    bg: '#A24C61',
    text: '#FDF9F6',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/15'
  },
  {
    name: "Kobi",
    bg: '#E2A9C0',
    text: '#411528',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/20'
  },
  {
    name: "Queen Pink",
    bg: '#E1C9D5',
    text: '#411528',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/20'
  },
  {
    name: "Chocolate Kisses",
    bg: '#411528',
    text: '#FFEFF5',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/10'
  },
  {
    name: "Persian Plum",
    bg: '#710C21',
    text: '#FDF0F3',
    cardBg: 'bg-black/20 backdrop-blur-3xl',
    cardBorder: 'border-white/15'
  },
  {
    name: "Jacarta",
    bg: '#3F2A52',
    text: '#F5EFFF',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/10'
  },
  {
    name: "Dark Blue-Gray",
    bg: '#75619D',
    text: '#FFFFFF',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/15'
  },
  {
    name: "Wisteria",
    bg: '#BEAEDB',
    text: '#3F2A52',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/20'
  },
  {
    name: "Bright Gray",
    bg: '#E6EFF7',
    text: '#3A2D34',
    cardBg: 'bg-white/15 backdrop-blur-3xl',
    cardBorder: 'border-white/30'
  },
  {
    name: "Black Coffee",
    bg: '#3A2D34',
    text: '#F0EBF2',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/10'
  },
  {
    name: "Cadet Grey",
    bg: '#959BB5',
    text: '#0A1123',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/20'
  },
  {
    name: "Chinese Black",
    bg: '#0A1123',
    text: '#E6EFF7',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/10'
  },
  {
    name: "American Blue",
    bg: '#3A3E6C',
    text: '#E6EFF7',
    cardBg: 'bg-white/5 backdrop-blur-3xl',
    cardBorder: 'border-white/10'
  },
  {
    name: "Ube",
    bg: '#8387C3',
    text: '#0A1123',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/20'
  },
  {
    name: "Cool Grey",
    bg: '#8A8CAC',
    text: '#0A1123',
    cardBg: 'bg-white/10 backdrop-blur-3xl',
    cardBorder: 'border-white/20'
  }
];

export default function App() {
  // Application Data States
  const [profile, setProfile] = useState<CreatorProfile>({ ...INITIAL_PROFILE });
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([ ...INITIAL_MEDIA_ITEMS ]);
  
  // Custom Design Preset Style Switching Switcher State
  const [designStyle, setDesignStyle] = useState<'glass' | 'immersive' | 'editorial'>('glass');

  // Custom Background Color Cycler
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = APP_THEMES[themeIndex];

  // Custom Background Photo Upload & brightness detector
  const [customBg, setCustomBg] = useState<string | null>(null);
  const [isBgDark, setIsBgDark] = useState<boolean>(false);

  const analyzeImageBrightness = (dataUrl: string) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 10, 10);
      try {
        const imageData = ctx.getImageData(0, 0, 10, 10);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i+1];
          b += data[i+2];
        }
        const count = data.length / 4;
        const avgR = r / count;
        const avgG = g / count;
        const avgB = b / count;
        const brightness = Math.sqrt(
          0.299 * (avgR * avgR) +
          0.587 * (avgG * avgG) +
          0.114 * (avgB * avgB)
        );
        setIsBgDark(brightness < 135);
      } catch (_) {
        // Fallback
      }
    };
    img.src = dataUrl;
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setCustomBg(dataUrl);
        analyzeImageBrightness(dataUrl);
        postIslandToast("Background updated smoothly! 🌌");
      };
      reader.readAsDataURL(file);
    }
  };

  // Adaptive font colors & container glass styles
  const textColor = customBg 
    ? (isBgDark ? '#FDF9F6' : '#0C1519') 
    : currentTheme.text;

  const cardBgClass = customBg
    ? (isBgDark ? 'bg-black/25 backdrop-blur-3xl' : 'bg-white/15 backdrop-blur-3xl')
    : currentTheme.cardBg;

  const cardBorderClass = customBg
    ? (isBgDark ? 'border-white/10' : 'border-white/20')
    : currentTheme.cardBorder;

  // Active Screen Interactivities
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isJoinedMatch, setIsJoinedMatch] = useState(false); // Follow Toggle

  // Modals & Popups States
  const [activeDetailItem, setActiveDetailItem] = useState<MediaItem | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);
  const [islandMessage, setIslandMessage] = useState<string | null>(null);
  
  // Like Register (local tracking)
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  // Streamlined Dynamic Island Toast Generator
  const postIslandToast = (message: string) => {
    setIslandMessage(message);
  };

  // Clear Island Messages
  useEffect(() => {
    if (islandMessage) {
      const timer = setTimeout(() => {
        setIslandMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [islandMessage]);

  // Highlight specific cards depending on tag selecting
  const filteredMediaItems = mediaItems.map(item => {
    const isMatched = selectedTag === null || item.category === selectedTag;
    return { ...item, highlighted: isMatched };
  });

  // Follow Button Toggle Action
  const handleFollowToggle = () => {
    const isNewState = !isJoinedMatch;
    setIsJoinedMatch(isNewState);
    setProfile(prev => ({
      ...prev,
      followers: isNewState ? prev.followers + 1 : prev.followers - 1
    }));
    postIslandToast(isNewState ? "Following Lina! ➕" : "Unfollowed Lina");
  };

  // Safe reset to standards
  const resetToFactoryDefaults = () => {
    setProfile({ ...INITIAL_PROFILE });
    setMediaItems([ ...INITIAL_MEDIA_ITEMS ]);
    setThemeIndex(0);
    setCustomBg(null);
    setIsBgDark(false);
    setSelectedTag(null);
    setIsJoinedMatch(false);
    setLikedItems({});
    postIslandToast('Properties Reset 🔄');
  };

  const handleThemeChange = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * APP_THEMES.length);
    } while (nextIndex === themeIndex && APP_THEMES.length > 1);
    
    setThemeIndex(nextIndex);
    postIslandToast(`Theme: ${APP_THEMES[nextIndex].name} 🎨`);
  };

  // Like metrics toggle action
  const handleToggleLike = (id: string, currentlyLiked: boolean) => {
    setLikedItems(prev => ({ ...prev, [id]: !currentlyLiked }));
    setMediaItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { ...item, likes: currentlyLiked ? item.likes - 1 : item.likes + 1 };
        }
        return item;
      })
    );
    postIslandToast(!currentlyLiked ? 'You loved this card ❤️' : 'Removed from likes');
  };

  // Action to change/update a photo on the card in real-time
  const handleUpdateItemImage = (id: string, newImage: string) => {
    setMediaItems(prev =>
      prev.map(item => item.id === id ? { ...item, image: newImage } : item)
    );
    setActiveDetailItem(prev => prev && prev.id === id ? { ...prev, image: newImage } : prev);
    postIslandToast('Tastecard Photo Updated 🎨');
  };

  return (
    <div 
      className="min-h-dvh sm:min-h-screen w-full flex flex-col items-center justify-center p-3.5 sm:p-6 md:p-8 transition-all duration-500 relative select-none bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundColor: currentTheme.bg, 
        backgroundImage: customBg ? `url("${customBg}")` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: textColor 
      }}
    >
      {/* Background overlay for custom background to guarantee exquisite readability */}
      {customBg && (
        <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isBgDark ? 'bg-black/25' : 'bg-white/5'
        }`} />
      )}
      {/* Top Banner Dynamic Toast Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <AnimatePresence mode="wait">
          {islandMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-[#0C1519]/95 text-white border border-white/10 flex items-center gap-2.5 px-6 py-3 rounded-full shadow-2xl overflow-hidden min-w-[220px] justify-center text-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="text-xs font-medium tracking-wide">
                {islandMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Adaptable Device Frame Card container */}
      <main className="w-full max-w-sm sm:max-w-md my-auto relative space-y-4">
        
        {/* Toggle Switch Design Preset Style Floating bar */}
        <div className="w-full flex justify-center scale-[0.93] origin-center">
          <div className="bg-neutral-900/90 text-white backdrop-blur-2xl border border-white/10 p-1 rounded-full flex items-center justify-between gap-1 shadow-2xl relative z-40 w-full">
            <button 
              onClick={() => { setDesignStyle('glass'); postIslandToast("Vibe: Real-time Glass 🔮"); }}
              className={`flex-1 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-widest transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
                designStyle === 'glass' ? 'bg-white text-neutral-950 shadow-lg scale-105' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Glass</span>
            </button>
            <button 
              onClick={() => { setDesignStyle('immersive'); postIslandToast("Vibe: Immersive Travel 🧭"); }}
              className={`flex-1 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-widest transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
                designStyle === 'immersive' ? 'bg-white text-neutral-950 shadow-lg scale-105' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Immersive</span>
            </button>
            <button 
              onClick={() => { setDesignStyle('editorial'); postIslandToast("Vibe: Studio Editorial 🎨"); }}
              className={`flex-1 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-widest transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
                designStyle === 'editorial' ? 'bg-white text-neutral-950 shadow-lg scale-105' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Editorial</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {designStyle === 'glass' && (
            <motion.div 
              key="style-glass"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-full rounded-[40px] p-5 sm:p-6 backdrop-blur-3xl border shadow-xl flex flex-col space-y-5 transition-all duration-500 ${cardBgClass} ${cardBorderClass}`}
              id="lina-tastecard-portal"
            >
              {/* Main Card Inline Header Navigation */}
              <div className="w-full flex items-center justify-between pb-3.5 border-b border-current/15">
                {/* Reset Defaults button */}
                <button 
                  onClick={resetToFactoryDefaults}
                  className="w-9 h-9 rounded-full bg-current/10 hover:bg-current/15 active:scale-90 transition-all flex items-center justify-center text-current cursor-pointer"
                  title="Reset Settings"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Customizer title */}
                <span className="text-xs font-bold font-mono tracking-widest uppercase text-current/90">
                  Tastecard
                </span>

                {/* Background Image Upload button */}
                <button 
                  onClick={() => document.getElementById('bg-photo-uploader')?.click()}
                  className="w-9 h-9 rounded-full bg-current/10 hover:bg-current/15 active:scale-90 transition-all flex items-center justify-center text-current cursor-pointer"
                  title="Upload custom background photo"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <input 
                  type="file"
                  id="bg-photo-uploader"
                  accept="image/*"
                  onChange={handleBgUpload}
                  className="hidden"
                />
              </div>

              {/* Profile Owner Identity block */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h1 className="text-3.5xl font-display font-bold tracking-tight text-current leading-none">
                    {profile.name}
                  </h1>
                  
                  {/* Dynamic Rarity Badge */}
                  {profile.bioQuote === 'Rarity: rare' ? (
                    <div className="flex items-center gap-2 py-0.5 select-none font-sans">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-current/60">Tastecard Rarity:</span>
                      <span className="font-display font-extrabold uppercase text-xs tracking-wider bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(245,158,11,0.15)]">
                        rare
                      </span>
                    </div>
                  ) : (
                    <div className="pl-3 py-0.5 border-l-2 border-current/25 text-current/70 italic text-xs">
                      "{profile.bioQuote}"
                    </div>
                  )}
                </div>

                {/* Responsive "The Drop" Custom color changer theme cycler */}
                <button
                  onClick={handleThemeChange}
                  className="text-current hover:opacity-80 hover:scale-125 active:scale-90 transition-all duration-300 select-none cursor-pointer p-1 relative group"
                  title="the drop • Randomize Color Theme"
                >
                  <div className="absolute inset-0 bg-current/5 blur-[4px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <svg className="w-7 h-7 relative z-10 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 006-6c0-4-6-11-6-11S6 11 6 15a6 6 0 006 6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 16a3 3 0 010-3.5" />
                  </svg>
                </button>
              </div>

              {/* Counts Statistics rows */}
              <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-current/15">
                <div className="text-left">
                  <span className="block font-mono text-lg font-extrabold text-current tracking-tight">
                    {profile.followers === 2300 ? '2.3K' : profile.followers}
                  </span>
                  <span className="block text-[9px] uppercase tracking-wider text-current/70 font-semibold mt-0.5">
                    {profile.followers === 2300 ? 'Photos' : 'Followers'}
                  </span>
                </div>

                <div className="text-left">
                  <span className="block font-mono text-lg font-extrabold text-current tracking-tight">
                    {profile.following}
                  </span>
                  <span className="block text-[9px] uppercase tracking-wider text-current/70 font-semibold mt-0.5">
                    emerging themes
                  </span>
                </div>

                <div className="text-left">
                  <span className="block font-mono text-lg font-extrabold text-current tracking-tight">
                    {profile.commentsCount}
                  </span>
                  <span className="block text-[9px] uppercase tracking-wider text-current/70 font-semibold mt-0.5">
                    Places
                  </span>
                </div>
              </div>

              {/* Centered chips wrapper containing tag filters with premium glass style */}
              <div className="flex flex-wrap gap-2 pt-1 w-full justify-center max-w-[325px] mx-auto text-center">
                {profile.tags.map((tag) => {
                  const isActive = selectedTag === tag;
                  const displayTag = tag.startsWith('#') ? tag.slice(1) : tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        const next = isActive ? null : tag;
                        setSelectedTag(next);
                        postIslandToast(next ? `Filter active: ${displayTag} 🔍` : 'Filters cleared 🛡️');
                      }}
                      className={`text-xs font-sans px-3.5 py-1.5 rounded-full transition-all duration-300 active:scale-95 text-center cursor-pointer select-none border backdrop-blur-md ${
                        isActive
                          ? 'bg-white/35 text-current font-bold border-white/50 scale-105 shadow-md'
                          : 'bg-white/10 text-current border-white/15 hover:bg-white/20'
                      }`}
                    >
                      {displayTag}
                    </button>
                  );
                })}
              </div>

              {/* Header divider block: Emergent Themes */}
              <div className="text-center w-full pt-1.5 select-none">
                <span className="text-[13px] font-bold tracking-widest font-mono uppercase text-current/90">
                  Emergent Themes
                </span>
              </div>

              {/* Media grid showing 2 cards per row */}
              <div className="py-1">
                <div className="grid grid-cols-2 gap-3">
                  {filteredMediaItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveDetailItem(item)}
                      className={`relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border border-black/5 shadow-md hover:scale-[1.02] hover:shadow-lg ${
                        item.highlighted ? 'opacity-100 scale-100' : 'opacity-35 scale-95 blur-[0.5px]'
                      }`}
                      title={`View details on ${item.title}`}
                      id={`media-card-${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-3 left-3 right-3 text-xs leading-snug">
                        <span className="block font-medium text-white line-clamp-2">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Tastecard Button Section with high contrast Glass look */}
              <div className="pt-1">
                <button
                  onClick={() => setIsSnapshotOpen(true)}
                  className="w-full py-4 rounded-2xl text-xs font-extrabold font-sans tracking-widest transition-all duration-300 shadow-lg active:scale-97 flex items-center justify-center gap-2 cursor-pointer uppercase bg-white/15 hover:bg-white/25 border border-white/35 backdrop-blur-md text-current"
                  id="share-tastecard-btn"
                >
                  Share Tastecard ✦
                </button>
              </div>

              {/* Miniature sub-text descriptor */}
              <div id="card-footer-caption" className="text-center py-2 text-[10px] text-current/40 select-none font-mono tracking-widest uppercase">
                Lina's Tastecard • #0000
              </div>
            </motion.div>
          )}

          {/* STYLE 2: Immersive Destination Travel Style (Saudi Inspired Moodboards 1 & 3 & 6) */}
          {designStyle === 'immersive' && (
            <motion.div
              key="style-immersive"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full rounded-[45px] p-6 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col space-y-6 relative overflow-hidden text-amber-50 bg-neutral-950/85"
            >
              {/* Internal Cinematic ambient glow */}
              <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-orange-700/15 blur-[100px] pointer-events-none" />

              {/* Custom Header Row for Travel Deck */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 font-extrabold uppercase">
                  Emergent Travelogue
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  📍 24.71° N, 46.67° E
                </span>
              </div>

              {/* Luxury Display Title with Serif font pairing from screen 3 */}
              <div className="text-center space-y-1">
                <h2 className="text-4xl font-serif tracking-tight text-amber-50 font-light leading-none">
                  Lina's Tastecard
                </h2>
                <p className="text-[11px] font-sans tracking-wide text-zinc-400 italic">
                  "Enjoy the future & invest in shaping it"
                </p>
              </div>

              {/* Golden Travel Metrics Row (Inspired by Moodboard stats) */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center relative z-10 bg-white/5 rounded-2xl px-2">
                <div>
                  <span className="block font-serif text-xl font-bold text-amber-300 tracking-tight">
                    91%
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-zinc-400 font-semibold font-mono mt-0.5">
                    COHERENCY
                  </span>
                </div>
                <div className="border-x border-white/5">
                  <span className="block font-serif text-xl font-bold text-amber-300 tracking-tight">
                    {profile.following}
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-zinc-400 font-semibold font-mono mt-0.5">
                    ANCHORS
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-xl font-bold text-amber-300 tracking-tight">
                    4.92 ★
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-zinc-400 font-semibold font-mono mt-0.5">
                    RATING
                  </span>
                </div>
              </div>

              {/* Minimal Luxury Filter Selection chips with Gold style */}
              <div className="flex flex-wrap gap-1.5 justify-center pt-1.5">
                {profile.tags.map((tag) => {
                  const isActive = selectedTag === tag;
                  const displayTag = tag.startsWith('#') ? tag.slice(1) : tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        const next = isActive ? null : tag;
                        setSelectedTag(next);
                        postIslandToast(next ? `Discovering theme: "${displayTag}"` : 'All Travel themes visible');
                      }}
                      className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-neutral-950 font-bold border-amber-300 shadow-md scale-105'
                          : 'bg-transparent text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {displayTag}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Overlapping Cards Deck Stack (Inspired directly by screenshot 3) */}
              <div className="w-full py-4 flex flex-col items-center justify-center relative min-h-[340px]">
                {/* Find current deck items depending on filters */}
                {(() => {
                  const deckItems = mediaItems.filter(item => selectedTag === null || item.category === selectedTag);
                  if (deckItems.length === 0) {
                    return (
                      <div className="text-zinc-500 py-12 text-center text-xs">
                        No memories in this node catalog yet.
                      </div>
                    );
                  }
                  
                  return (
                    <div className="w-full max-w-[280px] h-[310px] relative">
                      {deckItems.map((item, index) => {
                        // Max 3 stacked cards shown
                        if (index > 2) return null;
                        
                        // Overlapping card parameters
                        const rotate = index === 0 ? 0 : index === 1 ? 4 : -3;
                        const scale = index === 0 ? 1 : index === 1 ? 0.94 : 0.88;
                        const y = index === 0 ? 0 : index === 1 ? 16 : 30;
                        const zIndex = 30 - index;
                        const opacity = index === 0 ? 1 : 0.65;

                        return (
                          <motion.div
                            key={item.id}
                            style={{ zIndex }}
                            animate={{ rotate, scale, y, opacity }}
                            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                            onClick={() => {
                              if (index === 0) {
                                setActiveDetailItem(item);
                              } else {
                                // Put selected card to front by selecting its tag!
                                setSelectedTag(item.category);
                                postIslandToast(`Shifting Deck: ${item.title}`);
                              }
                            }}
                            className={`absolute inset-0 w-full h-full rounded-[28px] overflow-hidden cursor-pointer shadow-2xl border border-white/15 bg-neutral-900 group ${
                              index === 0 ? 'hover:scale-[1.02]' : ''
                            } transition-transform duration-300`}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover select-none brightness-[0.88] group-hover:brightness-100 transition-all duration-300"
                            />
                            {/* Deep custom gold/black ambient vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                            {/* Floating category emblem stamp */}
                            <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full text-[8.5px] font-mono backdrop-blur-md uppercase font-bold tracking-widest leading-none">
                              {item.category.slice(1)}
                            </div>

                            {/* Interactive details box */}
                            <div className="absolute bottom-4 left-4 right-4 space-y-1.5 text-left">
                              <div className="flex items-center justify-between">
                                <h3 className="text-base font-serif font-bold text-white tracking-wide">
                                  {item.title}
                                </h3>
                                <span className="text-[10px] font-mono text-amber-400 font-bold shrink-0">
                                  {4.8 + (index * 0.05) > 5 ? '4.95' : (4.8 + (index * 0.05)).toFixed(2)} ★
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-300 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                              {index === 0 && (
                                <div className="pt-2 flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                                  <span>View Location Anchor</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Minimal Luxury action buttons */}
              <div className="pt-1 w-full flex items-center gap-3">
                <button
                  onClick={handleFollowToggle}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold font-mono uppercase tracking-widest text-[#FDF9F6] cursor-pointer text-center"
                >
                  {isJoinedMatch ? 'Following ' : 'Join Curation'}
                </button>
                <button
                  onClick={() => setIsSnapshotOpen(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-350 text-neutral-950 text-xs font-bold font-mono uppercase tracking-widest cursor-pointer text-center shadow-lg"
                >
                  Share Story Sticker
                </button>
              </div>

              <div className="text-center text-[8.5px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
                Lina's Tastecard • Riyadh
              </div>
            </motion.div>
          )}

          {/* STYLE 3: Studio Boutique Editorial (N99 Studio & Warm Cream Luxury mix) */}
          {designStyle === 'editorial' && (
            <motion.div
              key="style-editorial"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full rounded-[38px] p-6 backdrop-blur-3xl shadow-xl flex flex-col space-y-6 text-zinc-900 border border-stone-200 bg-stone-50"
            >
              {/* Premium editorial design grid header lines */}
              <div className="w-full flex items-center justify-between border-b border-stone-200 pb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 font-extrabold uppercase">
                  N99 Beauty Studio
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 border border-stone-300 text-stone-600 rounded-full">
                  Verified Curator
                </span>
              </div>

              {/* Large Circular Avatar Badge block from Studio reference */}
              <div className="flex flex-col items-center text-center space-y-3 pt-2">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-[3px] border-white shadow-xl overflow-hidden bg-stone-100">
                    <img 
                      src="/src/assets/images/bg_face_portrait_1781548017737.jpg" 
                      alt="Lina" 
                      className="w-full h-full object-cover scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-neutral-900 border border-white text-white p-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2.5xl font-display font-black tracking-tight text-neutral-900">
                    Emily Taylor
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-bold">
                    <span>@linas_tastecard</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-400" />
                    <span>Stylist & Curator</span>
                  </div>
                </div>
              </div>

              {/* Editorial Thin Divider Line */}
              <div className="border-t border-stone-200/80 w-full pt-4">
                <div className="text-xs text-stone-500 italic text-center max-w-xs mx-auto">
                  "Finding emergent beauty signatures across sensory nodes."
                </div>
              </div>

              {/* Asymmetrical Masonry Pinterest Grid Layout (Directly from screen 4) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Add Inspo References ({filteredMediaItems.length})
                  </span>
                  <span className="text-[10px] font-mono text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                    Consistency 91%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column: Taller Portraits */}
                  <div className="space-y-4">
                    {filteredMediaItems.filter((_, i) => i % 2 === 0).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveDetailItem(item)}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md bg-stone-100 border border-stone-200 hover:shadow-lg transition-all duration-300 ${
                          item.highlighted ? 'opacity-100 scale-100' : 'opacity-30 scale-95 blur-[0.3px]'
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full aspect-[3/4.6] object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                        
                        {/* Info details absolute badge */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left text-xs space-y-1">
                          <span className="block font-medium text-white line-clamp-1 leading-none">{item.title}</span>
                          <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-[8.5px] font-mono tracking-widest uppercase scale-90 origin-left">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Dynamic Proportions */}
                  <div className="space-y-4 pt-6">
                    {filteredMediaItems.filter((_, i) => i % 2 !== 0).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActiveDetailItem(item)}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md bg-stone-100 border border-stone-200 hover:shadow-lg transition-all duration-300 ${
                          item.highlighted ? 'opacity-100 scale-100' : 'opacity-30 scale-95 blur-[0.3px]'
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full aspect-square object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                        
                        {/* Info details absolute badge */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left text-xs space-y-1">
                          <span className="block font-medium text-white line-clamp-1 leading-none">{item.title}</span>
                          <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white rounded text-[8.5px] font-mono tracking-widest uppercase scale-90 origin-left">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Styled Creator Follow Option matching Emily Taylor from Screen 4 */}
              <div className="p-4 bg-stone-100 border border-stone-200/60 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border border-stone-300 overflow-hidden shrink-0">
                    <img 
                      src="/src/assets/images/bg_face_portrait_1781548017737.jpg" 
                      alt="Lina" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-extrabold text-stone-900 tracking-tight leading-tight">Follow Curations</span>
                    <span className="block text-[10px] font-mono text-stone-500">{profile.followers} Saved Nodes</span>
                  </div>
                </div>
                <button
                  onClick={handleFollowToggle}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase cursor-pointer transition-all ${
                    isJoinedMatch 
                      ? 'bg-neutral-200 text-stone-800' 
                      : 'bg-[#F2A5C0] text-stone-900 border border-fuchsia-300 hover:scale-105 active:scale-95 shadow'
                  }`}
                >
                  {isJoinedMatch ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Complete action footer share */}
              <div className="pt-2">
                <button
                  onClick={() => setIsSnapshotOpen(true)}
                  className="w-full py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-widest font-mono uppercase cursor-pointer text-center shadow-lg hover:shadow-xl transition-all"
                >
                  Save Inspo Story Card
                </button>
              </div>

              <div className="text-center text-[8px] font-mono text-zinc-400 tracking-[0.25em] uppercase">
                Emily Taylor Reference Series
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

        {/* Global Modal Overlay Layers */}
        <AnimatePresence>
          {activeDetailItem && (
            <DetailModal
              item={activeDetailItem}
              onClose={() => setActiveDetailItem(null)}
              liked={!!likedItems[activeDetailItem.id]}
              onToggleLike={handleToggleLike}
              onUpdateImage={handleUpdateItemImage}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isShareOpen && (
            <ShareModal
              handle={profile.handle}
              name={profile.name}
              onClose={() => setIsShareOpen(false)}
              onPostToast={(msg) => {
                postIslandToast(msg);
                setIsShareOpen(false);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSnapshotOpen && (
            <SnapshotModal
              profile={profile}
              mediaItems={mediaItems}
              currentTheme={currentTheme}
              customBg={customBg}
              isBgDark={isBgDark}
              selectedTag={selectedTag}
              designStyle={designStyle}
              onClose={() => setIsSnapshotOpen(false)}
              onPostToast={(msg) => {
                postIslandToast(msg);
              }}
            />
          )}
        </AnimatePresence>
    </div>
  );
}
