/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Compass,
  Sparkles,
  MapPin,
  Heart,
  Bookmark,
  ChevronRight,
  Check,
  CheckCircle2,
  Bell,
  ArrowUpRight,
  X,
  RotateCcw,
  BookOpen,
  Utensils,
  Share2,
  Sliders,
  ArrowLeft,
  LayoutGrid,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { CreatorProfile, MediaItem } from './types';
import { 
  INITIAL_PROFILE, 
  INITIAL_MEDIA_ITEMS 
} from './initialData';
import { SnapshotModal } from './components/SnapshotModal';

// Interactive high-fidelity categories mimicking the Saudi mockup slides perfectly
export interface BeautifulCategory {
  id: string;
  title: string;
  location: string;
  subtitle: string;
  image: string;
  badgeText: string;
  tagline: string;
  description: string;
  percentageText: string;
  anchorsCount: number;
  // Adaptive colors properties:
  cardBg: string;
  accentColor: string;
  accentHex: string;
  borderColor: string;
  glowColor: string;
}

export const IMMERSIVE_CATEGORIES: BeautifulCategory[] = [
  {
    id: '#nomad',
    title: 'THE PEAKS',
    location: 'ALULA CANYONS',
    subtitle: 'INVEST IN DISCOVERY',
    image: '/src/assets/images/media_butterfly_1781548057361.jpg',
    badgeText: 'EPIC',
    tagline: 'A physical high-altitude sanctuary within desert peaks defying conventional exploration.',
    description: 'Witness high-altitude luxury blended with untouched orange sand ranges. Integrates a low-impact energy grid and mountain trails mapping raw biodiversity nodes.',
    percentageText: '96%',
    anchorsCount: 345,
    cardBg: 'bg-[#1a1411]/95',
    accentColor: 'text-amber-400',
    accentHex: '#fbbf24',
    borderColor: 'border-amber-500/20',
    glowColor: 'rgba(251, 191, 36, 0.06)'
  },
  {
    id: '#foodie',
    title: 'THE FLAVORS',
    location: 'RIYADH OASIS',
    subtitle: 'INVEST IN GASTRONOMY',
    image: '/src/assets/images/media_salad_1781548043109.jpg',
    badgeText: 'LEGENDARY',
    tagline: 'A sensory voyage across ancient gardens, local citric notes, and fresh cold-pressed herbs.',
    description: 'Raw local cabbage, wild avocado mash, toasted sesames, and signature date citrus enhancements formulated in real-time by leading culinary designers.',
    percentageText: '91%',
    anchorsCount: 566,
    cardBg: 'bg-[#0e1611]/95',
    accentColor: 'text-emerald-400',
    accentHex: '#34d399',
    borderColor: 'border-emerald-500/20',
    glowColor: 'rgba(52, 211, 153, 0.06)'
  },
  {
    id: '#wellness',
    title: 'THE REFUSION',
    location: 'RED SEA PORT',
    subtitle: 'INVEST IN LONGEVITY',
    image: '/src/assets/images/media_cocktail_1781548071603.jpg',
    badgeText: 'RARE',
    tagline: 'High-mountain sage extracts slowly filtered over pure glacier crystal ice blocks.',
    description: 'Double-poured organic wellness infusions. High in local botany extracts to expand focus and mindfulness during prolonged sunset desert meditations.',
    percentageText: '89%',
    anchorsCount: 189,
    cardBg: 'bg-[#1e1010]/95',
    accentColor: 'text-rose-400',
    accentHex: '#f43f5e',
    borderColor: 'border-rose-500/20',
    glowColor: 'rgba(244, 63, 148, 0.06)'
  },
  {
    id: '#bookworm',
    title: 'THE ARCHIVES',
    location: 'DIRIYAH KEEP',
    subtitle: 'INVEST IN WISDOM',
    image: '/src/assets/images/media_plant_1781548031238.jpg',
    badgeText: 'COMMON',
    tagline: 'Curated archives of world philosophies, natural history, and historic desert architectures.',
    description: 'Anaerobic vaults preserved to safe-guard classic scripts. Surrounded by living library plant arrangements creating perfect quiet study zones.',
    percentageText: '94%',
    anchorsCount: 220,
    cardBg: 'bg-[#101412]/95',
    accentColor: 'text-teal-400',
    accentHex: '#2dd4bf',
    borderColor: 'border-teal-500/20',
    glowColor: 'rgba(45, 212, 191, 0.06)'
  }
];

export default function App() {
  const [profile, setProfile] = useState<CreatorProfile>({ ...INITIAL_PROFILE });
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'deck' | 'expanded'>('welcome');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isJoinedMatch, setIsJoinedMatch] = useState(false);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);
  const [isGridViewOpen, setIsGridViewOpen] = useState(false);
  const [islandMessage, setIslandMessage] = useState<string | null>(null);
  const [isExpandedCleanMode, setIsExpandedCleanMode] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);

  const activeCategory = IMMERSIVE_CATEGORIES[activeCategoryIndex];

  // Dynamic Island System
  const triggerToast = (msg: string) => {
    setIslandMessage(msg);
  };

  useEffect(() => {
    if (islandMessage) {
      const timer = setTimeout(() => setIslandMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [islandMessage]);

  const handleFollowToggle = () => {
    const nextState = !isJoinedMatch;
    setIsJoinedMatch(nextState);
    setProfile(prev => ({
      ...prev,
      followers: nextState ? prev.followers + 1 : prev.followers - 1
    }));
    triggerToast(nextState ? "Added to Curation Watchlist! ⚡" : "Removed from Watchlist");
  };

  const handleToggleLike = (catId: string) => {
    const isLiked = !likedItems[catId];
    setLikedItems(prev => ({ ...prev, [catId]: isLiked }));
    triggerToast(isLiked ? "Saved to Personal Curation! ❤️" : "Removed from Curation");
  };

  const resetToDefaultSettings = () => {
    setActiveCategoryIndex(0);
    setIsJoinedMatch(false);
    setIsGridViewOpen(false);
    setIsExpandedCleanMode(false);
    setLikedItems({});
    setCurrentScreen('welcome');
    triggerToast("System Reset 🔄");
  };

  const isDeckScreen = currentScreen === 'deck';
  const isWelcomeScreen = currentScreen === 'welcome';

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden font-sans transition-all duration-700 ${
      isWelcomeScreen ? 'bg-[#E4EEF0]' : 'bg-[#090909]'
    }`}>
      
      {/* Immersive blurred ambient background mirroring the active card's image - active ONLY on deck screen */}
      {isDeckScreen && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out filter blur-[50px] scale-105 opacity-30 pointer-events-none" 
          style={{ backgroundImage: `url("${activeCategory.image}")` }}
        />
      )}
      
      {/* Contrast dark overlay on deck screen */}
      {isDeckScreen && (
        <div className="absolute inset-0 bg-black/45 transition-all duration-1000 pointer-events-none" />
      )}

      {/* Dynamic Toast Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <AnimatePresence mode="wait">
          {islandMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-neutral-900/95 border border-white/10 text-white/95 text-[11px] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="font-semibold tracking-wide">{islandMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Beautiful Device Simulator Container fitted exactly to mobile viewport height */}
      <div 
        className={`relative w-full max-w-[325px] h-[595px] rounded-[42px] border-[7px] transition-all duration-700 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col select-none ${
          isWelcomeScreen ? 'bg-[#E4EEF0] border-neutral-300' : 'bg-black border-neutral-900/95'
        }`}
        id="device-sim-viewport"
      >
        {/* Device Header/Dynamic Notch area */}
        <div className={`absolute top-0 inset-x-0 h-9 px-6 flex items-center justify-between text-[9.5px] font-sans font-extrabold tracking-tight z-50 pointer-events-none select-none transition-colors duration-500 ${
          isWelcomeScreen ? 'text-neutral-800' : 'text-white/95'
        }`}>
          <span>10:10</span>
          
          {/* Dynamic Island Notch Center Element */}
          <div className={`w-20 h-3.5 rounded-full border transition-colors duration-500 ${
            isWelcomeScreen ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-950 border-white/5'
          }`} />
          
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5 h-1.5">
              <div className={`w-0.5 h-1 rounded-sm ${isWelcomeScreen ? 'bg-neutral-800' : 'bg-white'}`} />
              <div className={`w-0.5 h-1.5 rounded-sm ${isWelcomeScreen ? 'bg-neutral-800' : 'bg-white'}`} />
              <div className={`w-0.5 h-2 rounded-sm ${isWelcomeScreen ? 'bg-neutral-800' : 'bg-white'}`} />
            </div>
            <span className="text-[8px] opacity-90 leading-none">5G</span>
          </div>
        </div>

        {/* Outer view screens manager with Framer motion */}
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: WELCOME TO TASTECARD (CLEAN LIGHT SURFACE) */}
            {currentScreen === 'welcome' && (
              <motion.div
                key="welcome-viewport"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-6 overflow-hidden bg-[#E4EEF0]"
              >
                {isAnalyzing ? (
                  /* Brief intermediate display saying 'Analyzing your gallery' with high-fidel animation */
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-neutral-800 relative z-10 px-2 mt-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full"
                    />
                    <div className="space-y-1 text-center">
                      <h3 className="text-base font-black tracking-tight text-neutral-950">
                        Analyzing your gallery...
                      </h3>
                      <p className="text-[10px] text-neutral-500 font-bold tracking-wide">
                        Extracting aesthetic parameters
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div /> {/* Spacer */}

                    {/* Primary Content Block - Styled accurately to Saudi slide 1 */}
                    <div className="space-y-6 pb-2 relative z-10 text-center">
                      <div className="space-y-3">
                        <h1 className="text-[28px] font-medium leading-[1.1] tracking-tight text-neutral-850">
                          Welcome <br />
                          <span className="font-extrabold text-neutral-950">to Tastecard</span>
                        </h1>
                        <p className="text-[12.5px] text-neutral-600 leading-relaxed font-bold max-w-[245px] mx-auto">
                          Discover your gallery personality
                        </p>
                      </div>

                      {/* Clean rounded dark charcoal action pill */}
                      <button
                        onClick={() => {
                          setIsAnalyzing(true);
                          triggerToast("Initiating analysis... 🔍");
                          setTimeout(() => {
                            setIsAnalyzing(false);
                            setCurrentScreen('deck');
                            triggerToast("Analysis complete! 🧭");
                          }, 1600);
                        }}
                        className="w-full py-3 text-[11px] font-black tracking-widest uppercase rounded-full bg-neutral-950 hover:bg-neutral-900 active:scale-95 transition-all text-white shadow-xl cursor-pointer text-center"
                      >
                        Get Started
                      </button>

                      <span className="block text-center text-[9px] text-neutral-450 font-bold leading-normal tracking-wide">
                        By continuing, you agree to <br />
                        discover emergent gallery signatures
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* SCREEN 2: PICK YOUR FUTURE (DECK GRID STACK INSPIRED FROM SCREEN 2) */}
            {currentScreen === 'deck' && (
              <motion.div
                key="deck-viewport"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 flex flex-col justify-between pt-10 pb-4 px-4 text-white overflow-hidden"
              >
                {/* Card photo blurred much less so we can see the background photo more */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out filter blur-[2px] scale-100 opacity-75 pointer-events-none" 
                  style={{ backgroundImage: `url("${activeCategory.image}")` }}
                />
                
                {/* Lighter, softer contrasting overlay so background photo shines through */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/75 pointer-events-none" />

                <>
                  {/* Header Row */}
                  <div 
                    className="flex items-center justify-between w-full relative z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Left: Back button to welcome page */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentScreen('welcome');
                        triggerToast("Returned to welcome screen");
                      }}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center border border-white/10 text-white cursor-pointer"
                      title="Back to Welcome"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    {/* Center: Added Top Gallery Themes in a premium font size */}
                    <h2 className="text-[14.5px] font-black font-sans tracking-tight text-white flex-1 text-center select-none px-1">
                      Top Gallery Themes
                    </h2>

                    {/* Right: Options/settings button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast("Options activated ⚙️");
                      }}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center border border-white/10 text-amber-400 cursor-pointer"
                      title="Options"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Overlapping Stacked Card deck layout OR Grid view */}
                  {!isGridViewOpen ? (
                    <div 
                      className="flex-1 flex items-center justify-center relative min-h-[325px] py-1 mt-1.5 select-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-full max-w-[215px] h-[310px] relative">
                        {IMMERSIVE_CATEGORIES.map((cat, idx) => {
                          // Compute offset relative to active card
                          const relativeIndex = (idx - activeCategoryIndex + IMMERSIVE_CATEGORIES.length) % IMMERSIVE_CATEGORIES.length;
                          
                          // Render maximum 3 visible cards in stack
                          if (relativeIndex > 2) return null;

                          // Visual settings matching the design mockup perfectly
                          const scale = relativeIndex === 0 ? 1 : relativeIndex === 1 ? 0.94 : 0.88;
                          const y = relativeIndex === 0 ? 0 : relativeIndex === 1 ? -12 : -24;
                          const zIndex = 40 - relativeIndex;
                          const opacity = relativeIndex === 0 ? 1 : 0.55;
                          const rotate = relativeIndex === 0 ? 0 : relativeIndex === 1 ? 3 : -3;

                          return (
                            <motion.div
                              key={cat.id}
                              style={{ 
                                zIndex,
                                boxShadow: relativeIndex === 0 ? `0 15px 30px -10px ${cat.accentHex}20` : undefined
                              }}
                              animate={{ 
                                scale, 
                                y, 
                                rotate, 
                                opacity: relativeIndex === 0 && swipeDir !== null ? 0 : opacity,
                                x: relativeIndex === 0 ? (swipeDir === 'left' ? -320 : swipeDir === 'right' ? 320 : 0) : 0
                              }}
                              transition={{ 
                                type: 'spring', 
                                stiffness: relativeIndex === 0 && swipeDir !== null ? 150 : 120, 
                                damping: relativeIndex === 0 && swipeDir !== null ? 22 : 18, 
                                mass: 0.9,
                                opacity: { duration: 0.22, ease: 'easeOut' }
                              }}
                              drag={relativeIndex === 0 && swipeDir === null ? "x" : false}
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.65}
                              onDragEnd={(event, info) => {
                                if (swipeDir !== null) return;
                                if (info.offset.x < -60) {
                                  setSwipeDir('left');
                                  triggerToast("Swiped 🧭");
                                  setTimeout(() => {
                                    setActiveCategoryIndex((prev) => (prev + 1) % IMMERSIVE_CATEGORIES.length);
                                    setSwipeDir(null);
                                  }, 200);
                                } else if (info.offset.x > 60) {
                                  setSwipeDir('right');
                                  triggerToast("Swiped 🧭");
                                  setTimeout(() => {
                                    setActiveCategoryIndex((prev) => (prev - 1 + IMMERSIVE_CATEGORIES.length) % IMMERSIVE_CATEGORIES.length);
                                    setSwipeDir(null);
                                  }, 200);
                                }
                              }}
                              whileTap={relativeIndex === 0 && swipeDir === null ? { cursor: 'grabbing' } : undefined}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (swipeDir !== null) return;
                                if (relativeIndex === 0) {
                                  setCurrentScreen('expanded');
                                  triggerToast(`Opening ${cat.title} 🧭`);
                                } else {
                                  setActiveCategoryIndex(idx);
                                }
                              }}
                              className={`absolute inset-0 w-full h-full rounded-[22px] ${cat.cardBg} border shadow-2xl overflow-hidden flex flex-col justify-between p-4 pb-4.5 transition-all duration-500 ${
                                relativeIndex === 0 ? `cursor-grab ${cat.borderColor} ring-1 ring-white/[0.05]` : 'cursor-pointer border-white/[0.03]'
                              }`}
                            >
                              {/* Inner Card Top Row */}
                              <div className="h-1" />

                              {/* Center Card Large Display Title */}
                              <div className="my-0.5 text-center text-current/90 relative z-10 w-full px-1">
                                <h3 className="text-[17px] font-extrabold tracking-widest uppercase font-serif bg-gradient-to-b from-white to-neutral-250 bg-clip-text text-transparent">
                                  {cat.title}
                                </h3>
                                {/* Changed 'Rare Node' style badge to 'Theme Rarity: ...' on all cards */}
                                <span className={`text-[8px] sm:text-[8.5px] font-mono uppercase tracking-[0.12em] font-extrabold block mt-0.5 ${cat.accentColor} animate-pulse whitespace-nowrap overflow-hidden text-ellipsis`}>
                                  ✦ Theme Rarity: {cat.badgeText === 'EPIC' ? 'Epic' : (cat.badgeText === 'LEGENDARY' ? 'Legendary' : (cat.badgeText === 'COMMON' ? 'Common' : 'Rare'))} ✦
                                </span>
                              </div>

                              {/* Curved photo frame - wider and longer to fill the card beautifully (145px width / 200px height) */}
                              <div className="w-[145px] h-[200px] mx-auto rounded-xl overflow-hidden relative border border-white/5 shadow-inner flex items-center justify-center shrink-0 transition-all duration-300">
                                <img 
                                  src={cat.image} 
                                  alt={cat.title} 
                                  className="w-full h-full object-cover select-none filter brightness-95"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                              </div>

                              {/* Elegant action prompt inside the card frame just beneath the image */}
                              <span className="text-[9px] text-zinc-250 font-mono uppercase tracking-[0.16em] font-extrabold text-center block select-none my-1 animate-pulse">
                                Tap to Modify and Explore
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                      /* Custom Grid View */
                      <div 
                        className="flex-1 overflow-y-auto px-1 py-1 mt-2.5 scrollbar-none max-h-[300px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {IMMERSIVE_CATEGORIES.map((cat, idx) => (
                            <motion.div
                              key={`grid-${cat.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCategoryIndex(idx);
                                setIsGridViewOpen(false);
                                setCurrentScreen('expanded');
                                triggerToast(`Opening ${cat.title} 🧭`);
                              }}
                              className={`${cat.cardBg} border ${cat.borderColor} rounded-[18px] p-3 flex flex-col justify-between h-[135px] cursor-pointer hover:border-white/20 transition-all shadow-xl text-left relative overflow-hidden`}
                              whileHover={{ y: -2 }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
                              <div className="text-left relative z-10 w-full overflow-hidden">
                                <h4 className="text-[11.5px] font-extrabold tracking-wider uppercase text-white font-display line-clamp-1">{cat.title}</h4>
                                <span className={`text-[8px] font-mono font-extrabold uppercase tracking-widest block mt-0.5 ${cat.accentColor} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                  Theme Rarity: {cat.badgeText === 'EPIC' ? 'Epic' : (cat.badgeText === 'LEGENDARY' ? 'Legendary' : (cat.badgeText === 'COMMON' ? 'Common' : 'Rare'))}
                                </span>
                              </div>
                              <div className="w-full h-[60px] rounded-lg overflow-hidden my-1 border border-white/5 relative">
                                <img src={cat.image} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div className="text-center relative z-10">
                                <span className="text-[9px] font-semibold text-zinc-350 hover:text-white transition-colors tracking-wide">Tap to explore</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Change 'swipe for more' to 'Share Tastecard' with expanded width and elegant styling */}
                    <button 
                      className="text-center text-[11px] text-zinc-200 font-extrabold bg-white/5 hover:bg-amber-400/10 active:scale-95 transition-all py-2 px-6 rounded-full border border-white/5 w-full max-w-[215px] mx-auto mt-2 tracking-wide uppercase select-none relative z-10 font-mono block cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSnapshotOpen(true);
                        triggerToast("Snapshot portal opened! 📸");
                      }}
                    >
                      ✨ Share Tastecard
                    </button>

                    {/* Single Glass Customise Tastecard Button */}
                    <div 
                      className="w-full mt-2 flex flex-col items-center relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsGridViewOpen(!isGridViewOpen);
                          triggerToast(isGridViewOpen ? "Back to stack view 🧭" : "Grid customizer active! 🎯");
                        }}
                        className="py-2 w-full max-w-[215px] rounded-full bg-white/10 hover:bg-white/15 active:scale-95 transition-all text-white border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.55)] backdrop-blur-md cursor-pointer text-center text-[11.5px] font-black tracking-wider uppercase font-display"
                      >
                        {isGridViewOpen ? "View Card Stack" : "Customise Tastecard"}
                      </button>
                    </div>
                  </>
              </motion.div>
            )}

            {/* SCREEN 3: CATEGORY EXPANDED (MAGNA CITY IMPRESSIVE IMMERSIVE STATE) */}
            {currentScreen === 'expanded' && (
              <motion.div
                key="expanded-viewport"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => {
                  setCurrentScreen('deck');
                  triggerToast("Returned to selector deck");
                }}
                className="absolute inset-0 flex flex-col justify-end p-4 pb-6 text-white font-sans overflow-hidden cursor-pointer"
              >
                {/* Fully unblurred background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center filter-none scale-100 opacity-100 pointer-events-none transition-all duration-500 ease-in-out"
                  style={{ backgroundImage: `url("${activeCategory.image}")` }}
                />
                
                {/* Subtle vignette/contrast overlay to protect readability of the share story button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                {/* Subtle 'swipe down to return' text hint & ChevronDown icon at the top to improve intuition */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 z-25 pointer-events-none animate-pulse">
                  <ChevronDown className="w-5 h-5 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  <span className="text-[9.5px] uppercase font-mono tracking-[0.2em] font-black text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    swipe down to return
                  </span>
                </div>

                {/* Quiet Close button in the top corner to let user return easily */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentScreen('deck');
                    triggerToast("Returned to selector deck");
                  }}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-zinc-200 hover:text-white border border-white/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xl z-25"
                >
                  <X className="w-4 h-4 font-extrabold" />
                </button>

                {/* Elegant card metadata layer dynamic for each category */}
                <div 
                  className="w-full flex justify-between items-end relative z-10 mb-3 px-1 pointer-events-none text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left Side: Name and Theme Rarity */}
                  <div className="flex flex-col">
                    <span className="text-[21px] font-display tracking-tight font-extrabold leading-tight text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                      {activeCategory.title === 'THE PEAKS' ? 'AlUla Peaks' : (activeCategory.title === 'THE FLAVORS' ? 'Citrus Oasis' : (activeCategory.title === 'THE REFUSION' ? 'Sage Tonic' : 'Ancient Keep'))}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.16em] text-amber-400 font-extrabold uppercase mt-0.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.95)] whitespace-nowrap overflow-hidden text-ellipsis">
                      ✦ THEME RARITY: {activeCategory.badgeText === 'EPIC' ? 'Epic' : (activeCategory.badgeText === 'LEGENDARY' ? 'Legendary' : (activeCategory.badgeText === 'COMMON' ? 'Common' : 'Rare'))}
                    </span>
                  </div>

                  {/* Right Side: Photo Count */}
                  <div className="text-right">
                    <span className="text-[11px] font-mono tracking-wider font-extrabold text-white bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                      173 photos
                    </span>
                  </div>
                </div>

                {/* Single Share Button container styled beautifully at bottom */}
                <div 
                  className="w-full relative z-10 bottom-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSnapshotOpen(true);
                      triggerToast("Snapshot portal opened! 📸");
                    }}
                    className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 transition-all text-white border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md cursor-pointer text-center text-[12.5px] font-mono tracking-widest uppercase font-black"
                  >
                    ✨ Share Curated Story Sticker
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Global Modals overlay wrapper */}
      <AnimatePresence>
        {isSnapshotOpen && (
          <SnapshotModal
            profile={profile}
            mediaItems={INITIAL_MEDIA_ITEMS}
            currentTheme={{
              name: 'Warm Sunset',
              bg: '#181310',
              text: '#fffdee',
              cardBg: 'bg-black/45 backdrop-blur-2xl',
              cardBorder: 'border-white/10'
            }}
            customBg={null}
            isBgDark={true}
            selectedTag={activeCategory.id}
            designStyle="immersive"
            onClose={() => setIsSnapshotOpen(false)}
            onPostToast={(msg) => triggerToast(msg)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// PlusIcon replacement to stay independent of other files
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
