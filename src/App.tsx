/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
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
  ChevronDown,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { CreatorProfile, MediaItem } from "./types";
import { INITIAL_PROFILE, INITIAL_MEDIA_ITEMS } from "./initialData";
import { toPng } from "html-to-image";

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
  photos: string[];
}

export const IMMERSIVE_CATEGORIES: BeautifulCategory[] = [
  {
    id: "#nomad",
    title: "THE PEAKS",
    location: "ALULA CANYONS",
    subtitle: "INVEST IN DISCOVERY",
    image: "/src/assets/images/media_butterfly_1781548057361.jpg",
    badgeText: "EPIC",
    tagline:
      "A physical high-altitude sanctuary within desert peaks defying conventional exploration.",
    description:
      "Witness high-altitude luxury blended with untouched orange sand ranges. Integrates a low-impact energy grid and mountain trails mapping raw biodiversity nodes.",
    percentageText: "96%",
    anchorsCount: 345,
    cardBg: "bg-[#1a1411]/95",
    accentColor: "text-amber-400",
    accentHex: "#fbbf24",
    borderColor: "border-amber-500/20",
    glowColor: "rgba(251, 191, 36, 0.06)",
    photos: [
      "/src/assets/images/media_butterfly_1781548057361.jpg",
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1621619856624-42fd193a0661?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "#foodie",
    title: "THE FLAVORS",
    location: "RIYADH OASIS",
    subtitle: "INVEST IN GASTRONOMY",
    image: "/src/assets/images/media_salad_1781548043109.jpg",
    badgeText: "LEGENDARY",
    tagline:
      "A sensory voyage across ancient gardens, local citric notes, and fresh cold-pressed herbs.",
    description:
      "Raw local cabbage, wild avocado mash, toasted sesames, and signature date citrus enhancements formulated in real-time by leading culinary designers.",
    percentageText: "91%",
    anchorsCount: 566,
    cardBg: "bg-[#0e1611]/95",
    accentColor: "text-emerald-400",
    accentHex: "#34d399",
    borderColor: "border-emerald-500/20",
    glowColor: "rgba(52, 211, 153, 0.06)",
    photos: [
      "/src/assets/images/media_salad_1781548043109.jpg",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "#wellness",
    title: "THE REFUSION",
    location: "RED SEA PORT",
    subtitle: "INVEST IN LONGEVITY",
    image: "/src/assets/images/media_cocktail_1781548071603.jpg",
    badgeText: "RARE",
    tagline:
      "High-mountain sage extracts slowly filtered over pure glacier crystal ice blocks.",
    description:
      "Double-poured organic wellness infusions. High in local botany extracts to expand focus and mindfulness during prolonged sunset desert meditations.",
    percentageText: "89%",
    anchorsCount: 189,
    cardBg: "bg-[#1e1010]/95",
    accentColor: "text-rose-400",
    accentHex: "#f43f5e",
    borderColor: "border-rose-500/20",
    glowColor: "rgba(244, 63, 148, 0.06)",
    photos: [
      "/src/assets/images/media_cocktail_1781548071603.jpg",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "#bookworm",
    title: "THE ARCHIVES",
    location: "DIRIYAH KEEP",
    subtitle: "INVEST IN WISDOM",
    image: "/src/assets/images/media_plant_1781548031238.jpg",
    badgeText: "COMMON",
    tagline:
      "Curated archives of world philosophies, natural history, and historic desert architectures.",
    description:
      "Anaerobic vaults preserved to safe-guard classic scripts. Surrounded by living library plant arrangements creating perfect quiet study zones.",
    percentageText: "94%",
    anchorsCount: 220,
    cardBg: "bg-[#101412]/95",
    accentColor: "text-teal-400",
    accentHex: "#2dd4bf",
    borderColor: "border-teal-500/20",
    glowColor: "rgba(45, 212, 191, 0.06)",
    photos: [
      "/src/assets/images/media_plant_1781548031238.jpg",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "#heritage",
    title: "THE HERITAGE",
    location: "JEDDAH AL-BALAD",
    subtitle: "INVEST IN TRADITIONS",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=85",
    badgeText: "RARE",
    tagline:
      "Centuries of unique coral stone architectures, beautiful wooden roshan screen openings and vintage lanes.",
    description:
      "Bespoke architectural preservation. Infusing traditional craft, historic rosewaters, and coastal breezes with interactive digital artifacts.",
    percentageText: "92%",
    anchorsCount: 412,
    cardBg: "bg-[#211611]/95",
    accentColor: "text-orange-400",
    accentHex: "#fb923c",
    borderColor: "border-orange-500/20",
    glowColor: "rgba(251, 146, 60, 0.06)",
    photos: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    id: "#cosmopolitan",
    title: "THE SKYPORT",
    location: "NEOM DISTRICT",
    subtitle: "INVEST IN FUTURE",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85",
    badgeText: "EPIC",
    tagline:
      "High-altitude sky lounges defying gravity, powered by clean energy and stellar views.",
    description:
      "Quantum tech integration hubs. Designed to foster creative computing alongside botanical sky domes and silent hyperloop stations.",
    percentageText: "95%",
    anchorsCount: 304,
    cardBg: "bg-[#141121]/95",
    accentColor: "text-purple-400",
    accentHex: "#c084fc",
    borderColor: "border-purple-500/20",
    glowColor: "rgba(192, 132, 252, 0.06)",
    photos: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    ],
  },
];

export default function App() {
  const [profile, setProfile] = useState<CreatorProfile>({
    ...INITIAL_PROFILE,
  });
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "deck" | "expanded"
  >("welcome");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isJoinedMatch, setIsJoinedMatch] = useState(false);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [isGridViewOpen, setIsGridViewOpen] = useState(false);
  const [islandMessage, setIslandMessage] = useState<string | null>(null);
  const [isExpandedCleanMode, setIsExpandedCleanMode] = useState(false);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);

  const [selectedBgs, setSelectedBgs] = useState<Record<string, string>>({});
  const [selectedHomeBg, setSelectedHomeBg] = useState<string>("");
  const [isBgPickerOpen, setIsBgPickerOpen] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showShutterFlash, setShowShutterFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Stable initial random index on layout load to prevent jittery transitions
  const initialHomeBg = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * IMMERSIVE_CATEGORIES.length);
    return IMMERSIVE_CATEGORIES[randomIndex].image;
  }, []);

  const homeBg = selectedHomeBg || initialHomeBg;

  const activeCategory = IMMERSIVE_CATEGORIES[activeCategoryIndex];
  const currentBg = selectedBgs[activeCategory.id] || activeCategory.image;

  // Dynamic Island System
  const triggerToast = (msg: string) => {
    setIslandMessage(msg);
  };

  const handleTakeScreenshot = () => {
    const node =
      document.getElementById("tastecard-printable-modal") ||
      document.getElementById("tastecard-printable-share") ||
      document.getElementById("device-sim-viewport");
    if (!node) {
      triggerToast("Failed to locate viewport 😢");
      return;
    }

    setIsCapturing(true);
    triggerToast("Generating your multi-card Tastecard... 📸✨");

    // Camera flash effect
    setShowShutterFlash(true);
    setTimeout(() => {
      setShowShutterFlash(false);
    }, 150);

    // Dynamic clean capture: download gorgeous non-cropped posters
    toPng(node, {
      pixelRatio: 2, // Standard high-definition crisp image
      cacheBust: false,
      filter: (n: any) => {
        if (n.id === "exclude-from-capture") return false;
        return true;
      },
      backgroundColor: "#0a0a0a",
      style: {
        position: "relative",
        top: "0",
        left: "0",
        transform: "none",
        margin: "0",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        const defaultName = username
          ? `${username
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "_")}_tastecard`
          : "my_tastecard";
        link.download = `${defaultName}.png`;
        link.href = dataUrl;
        link.click();
        setIsCapturing(false);
        triggerToast("Curation saved cleanly to Downloads! ✨📸");
      })
      .catch((error) => {
        console.error("Screenshot capture failed:", error);
        setIsCapturing(false);
        triggerToast("Failed. Let's try once more!");
      });
  };

  useEffect(() => {
    const activeBg = isGridViewOpen ? homeBg : currentBg;
    if (!activeBg) return;

    // Fast static check for initial defaults before dynamic load completes
    if (activeBg.includes("media_salad")) {
      setIsLightBg(true);
      return;
    }
    if (activeBg.includes("media_plant")) {
      setIsLightBg(true);
      return;
    }
    if (
      activeBg.includes("media_butterfly") ||
      activeBg.includes("media_cocktail") ||
      activeBg.includes("bg_face_portrait") ||
      activeBg.includes("NEOM")
    ) {
      setIsLightBg(false);
      return;
    }

    // Dynamic check via offscreen Canvas
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 10;
        canvas.height = 10;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, 10, 10);
          const imageData = ctx.getImageData(0, 0, 10, 10);
          const data = imageData.data;
          let brightnessSum = 0;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            brightnessSum += 0.299 * r + 0.587 * g + 0.114 * b;
          }
          const avgBrightness = brightnessSum / (data.length / 4);
          setIsLightBg(avgBrightness > 140);
        }
      } catch (e) {
        console.warn("Could not calculate dynamic background brightness", e);
      }
    };
    img.onerror = () => {
      const lower = activeBg.toLowerCase();
      if (
        lower.includes("salad") ||
        lower.includes("plant") ||
        lower.includes("white") ||
        lower.includes("light") ||
        lower.includes("cream")
      ) {
        setIsLightBg(true);
      } else {
        setIsLightBg(false);
      }
    };
    img.src = activeBg;
  }, [currentBg, homeBg, isGridViewOpen]);

  useEffect(() => {
    if (islandMessage) {
      const timer = setTimeout(() => setIslandMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [islandMessage]);

  const handleFollowToggle = () => {
    const nextState = !isJoinedMatch;
    setIsJoinedMatch(nextState);
    setProfile((prev) => ({
      ...prev,
      followers: nextState ? prev.followers + 1 : prev.followers - 1,
    }));
    triggerToast(
      nextState ? "Added to Curation Watchlist! ⚡" : "Removed from Watchlist",
    );
  };

  const handleToggleLike = (catId: string) => {
    const isLiked = !likedItems[catId];
    setLikedItems((prev) => ({ ...prev, [catId]: isLiked }));
    triggerToast(
      isLiked ? "Saved to Personal Curation! ❤️" : "Removed from Curation",
    );
  };

  const resetToDefaultSettings = () => {
    setActiveCategoryIndex(0);
    setIsJoinedMatch(false);
    setIsGridViewOpen(false);
    setIsExpandedCleanMode(false);
    setLikedItems({});
    setCurrentScreen("welcome");
    triggerToast("System Reset 🔄");
  };

  const isDeckScreen = currentScreen === "deck";
  const isWelcomeScreen = currentScreen === "welcome";

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden font-sans transition-all duration-700 ${
        isWelcomeScreen ? "bg-[#E4EEF0]" : "bg-[#090909]"
      }`}
    >
      {/* Immersive blurred ambient background mirroring the active card's image - active ONLY on deck screen */}
      {isDeckScreen && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out filter blur-[50px] scale-105 opacity-30 pointer-events-none"
          style={{ backgroundImage: `url("${currentBg}")` }}
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
              <span className="font-semibold tracking-wide">
                {islandMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Beautiful Device Simulator Container fitted exactly to mobile viewport height */}
      <div
        className={`relative w-full max-w-[325px] h-[595px] rounded-[42px] border-[7px] transition-all duration-700 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col select-none ${
          isWelcomeScreen
            ? "bg-[#E4EEF0] border-neutral-300"
            : "bg-black border-neutral-900/95"
        }`}
        id="device-sim-viewport"
      >
        {/* Device Header/Dynamic Notch area */}
        <div
          className={`absolute top-0 inset-x-0 h-9 px-6 flex items-center justify-between text-[9.5px] font-sans font-extrabold tracking-tight z-50 pointer-events-none select-none transition-colors duration-500 ${
            isWelcomeScreen ? "text-neutral-800" : "text-white/95"
          }`}
        >
          <span>10:10</span>

          {/* Dynamic Island Notch Center Element */}
          <div
            className={`w-20 h-3.5 rounded-full border transition-colors duration-500 ${
              isWelcomeScreen
                ? "bg-neutral-900 border-neutral-800"
                : "bg-neutral-950 border-white/5"
            }`}
          />

          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5 h-1.5">
              <div
                className={`w-0.5 h-1 rounded-sm ${isWelcomeScreen ? "bg-neutral-800" : "bg-white"}`}
              />
              <div
                className={`w-0.5 h-1.5 rounded-sm ${isWelcomeScreen ? "bg-neutral-800" : "bg-white"}`}
              />
              <div
                className={`w-0.5 h-2 rounded-sm ${isWelcomeScreen ? "bg-neutral-800" : "bg-white"}`}
              />
            </div>
            <span className="text-[8px] opacity-90 leading-none">5G</span>
          </div>
        </div>

        {/* Outer view screens manager with Framer motion */}
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* SCREEN 1: WELCOME TO TASTECARD (CLEAN LIGHT SURFACE) */}
            {currentScreen === "welcome" && (
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
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "linear",
                      }}
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
                          <span className="font-extrabold text-neutral-950">
                            to Tastecard
                          </span>
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
                            setCurrentScreen("deck");
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
            {currentScreen === "deck" && (
              <motion.div
                key="deck-viewport"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 flex flex-col text-white overflow-hidden"
              >
                {/* Point 7: The background should not be blurry anymore, adapts dynamically based on active view */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-100 opacity-80 pointer-events-none"
                  style={{
                    backgroundImage: `url("${isGridViewOpen ? homeBg : currentBg}")`,
                  }}
                />

                {/* Lighter, softer contrasting overlay so background photo shines through */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70 pointer-events-none" />

                {/* Main scrollable viewport interface representing the entire screen and everything inside it */}
                <div
                  className="absolute inset-0 flex flex-col pt-10 pb-6 px-4 overflow-y-auto scrollbar-none z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <>
                    {/* Header Row */}
                    <div
                      className="flex items-center justify-between w-full relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Left: Back button to return to the view card stack or welcome screen */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isGridViewOpen) {
                            setIsGridViewOpen(false);
                            triggerToast("Back to stack view 🧭");
                          } else {
                            setCurrentScreen("welcome");
                            triggerToast("Returned to welcome screen");
                          }
                        }}
                        className={`w-8 h-8 rounded-full active:scale-90 transition-all flex items-center justify-center border cursor-pointer ${
                          isLightBg
                            ? "bg-black/10 hover:bg-black/20 border-zinc-300 text-zinc-800"
                            : "bg-white/15 hover:bg-white/25 border-white/10 text-white"
                        }`}
                        title={
                          isGridViewOpen ? "Back to Stack" : "Back to Welcome"
                        }
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      {/* Center: Added My Tastecard in a premium font size */}
                      <h2
                        style={{ paddingLeft: "15px" }}
                        className={`text-[14.5px] font-black font-sans tracking-widest uppercase flex-1 text-center select-none pl-[15px] px-1 transition-colors duration-300 ${
                          isLightBg ? "text-zinc-800" : "text-white"
                        }`}
                      >
                        My Tastecard
                      </h2>

                      {/* Right: Option button: Share when in stack card view, Edit when in grid view */}
                      {!isGridViewOpen ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsShareModalOpen(true);
                          }}
                          className={`px-3.5 py-1 active:scale-95 transition-all border rounded-full text-[10px] font-mono uppercase tracking-wider font-extrabold cursor-pointer ${
                            isLightBg
                              ? "bg-black/10 hover:bg-black/20 text-zinc-800 border-zinc-300"
                              : "bg-white/10 hover:bg-white/20 text-white border-white/25 hover:text-amber-305"
                          }`}
                          title="Share Tastecard"
                        >
                          Share
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditMenuOpen((prev) => !prev);
                            triggerToast("Opening customizer options 🪐");
                          }}
                          className={`px-3.5 py-1 active:scale-95 transition-all border rounded-full text-[10px] font-mono uppercase tracking-wider font-extrabold cursor-pointer ${
                            isLightBg
                              ? "bg-black/10 hover:bg-black/20 text-zinc-800 border-zinc-300 hover:text-amber-700"
                              : "bg-white/10 hover:bg-white/20 text-white border-white/25 hover:text-amber-300"
                          }`}
                          title="Edit Customizer Options"
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {/* Point 6: Brand label & rarity status above the cards */}
                    <div className="w-full px-1.5 mt-2.5 mb-1.5 select-none relative z-10 shrink-0 text-center flex flex-col items-center justify-center">
                      {isGridViewOpen ? (
                        <div className="text-center">
                          <span
                            className={`text-[12px] font-bold font-sans uppercase tracking-wider block transition-colors duration-300 ${
                              isLightBg ? "text-zinc-800/95" : "text-white/95"
                            }`}
                          >
                            {username
                              ? `${username}'s Gallery's Top Themes`
                              : "My Gallery's Top Themes"}
                          </span>
                          <span
                            className={`text-[10px] font-mono tracking-widest uppercase block mt-1 transition-colors duration-300 ${
                              isLightBg ? "text-zinc-600" : "text-zinc-350"
                            }`}
                          >
                            Tastecard Rarity:{" "}
                            <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent inline-block">
                              Legendary
                            </span>
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`text-[12px] font-bold font-sans uppercase tracking-wider block mt-0.5 text-center transition-colors duration-300 ${
                            isLightBg ? "text-zinc-800" : "text-amber-400"
                          }`}
                        >
                          ✦ Emergent Gallery themes ✦
                        </span>
                      )}
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
                            const relativeIndex =
                              (idx -
                                activeCategoryIndex +
                                IMMERSIVE_CATEGORIES.length) %
                              IMMERSIVE_CATEGORIES.length;

                            // Render maximum 3 visible cards in stack
                            if (relativeIndex > 2) return null;

                            // Visual settings matching the design mockup perfectly
                            const scale =
                              relativeIndex === 0
                                ? 1
                                : relativeIndex === 1
                                  ? 0.94
                                  : 0.88;
                            const y =
                              relativeIndex === 0
                                ? 0
                                : relativeIndex === 1
                                  ? -12
                                  : -24;
                            const zIndex = 40 - relativeIndex;
                            const opacity = relativeIndex === 0 ? 1 : 0.55;
                            const rotate =
                              relativeIndex === 0
                                ? 0
                                : relativeIndex === 1
                                  ? 3
                                  : -3;

                            return (
                              <motion.div
                                key={cat.id}
                                style={{
                                  zIndex,
                                  boxShadow:
                                    relativeIndex === 0
                                      ? `0 15px 30px -10px ${cat.accentHex}20`
                                      : undefined,
                                }}
                                animate={{
                                  scale,
                                  y,
                                  rotate,
                                  opacity:
                                    relativeIndex === 0 && swipeDir !== null
                                      ? 0
                                      : opacity,
                                  x:
                                    relativeIndex === 0
                                      ? swipeDir === "left"
                                        ? -320
                                        : swipeDir === "right"
                                          ? 320
                                          : 0
                                      : 0,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness:
                                    relativeIndex === 0 && swipeDir !== null
                                      ? 240
                                      : 380,
                                  damping:
                                    relativeIndex === 0 && swipeDir !== null
                                      ? 18
                                      : 14,
                                  mass: 0.55,
                                  opacity: { duration: 0.18, ease: "easeOut" },
                                }}
                                drag={
                                  relativeIndex === 0 && swipeDir === null
                                    ? "x"
                                    : false
                                }
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.88}
                                onDragEnd={(event, info) => {
                                  if (swipeDir !== null) return;
                                  if (info.offset.x < -60) {
                                    setSwipeDir("left");
                                    triggerToast("Swiped 🧭");
                                    setTimeout(() => {
                                      setActiveCategoryIndex(
                                        (prev) =>
                                          (prev + 1) %
                                          IMMERSIVE_CATEGORIES.length,
                                      );
                                      setSwipeDir(null);
                                    }, 200);
                                  } else if (info.offset.x > 60) {
                                    setSwipeDir("right");
                                    triggerToast("Swiped 🧭");
                                    setTimeout(() => {
                                      setActiveCategoryIndex(
                                        (prev) =>
                                          (prev -
                                            1 +
                                            IMMERSIVE_CATEGORIES.length) %
                                          IMMERSIVE_CATEGORIES.length,
                                      );
                                      setSwipeDir(null);
                                    }, 200);
                                  }
                                }}
                                whileTap={
                                  relativeIndex === 0 && swipeDir === null
                                    ? { cursor: "grabbing" }
                                    : undefined
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (swipeDir !== null) return;
                                  if (relativeIndex === 0) {
                                    setCurrentScreen("expanded");
                                    triggerToast(`Opening ${cat.title} 🧭`);
                                  } else {
                                    setActiveCategoryIndex(idx);
                                  }
                                }}
                                className={`absolute inset-0 w-full h-full rounded-[22px] ${cat.cardBg} border shadow-2xl overflow-hidden flex flex-col justify-between p-4 pb-4.5 transition-all duration-500 ${
                                  relativeIndex === 0
                                    ? `cursor-grab ${cat.borderColor} ring-1 ring-white/[0.05]`
                                    : "cursor-pointer border-white/[0.03]"
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
                                  <span
                                    className={`text-[8px] sm:text-[8.5px] font-mono uppercase tracking-[0.12em] font-extrabold block mt-0.5 ${cat.accentColor} animate-pulse whitespace-nowrap overflow-hidden text-ellipsis`}
                                  >
                                    ✦ Theme Rarity:{" "}
                                    {cat.badgeText === "EPIC"
                                      ? "Epic"
                                      : cat.badgeText === "LEGENDARY"
                                        ? "Legendary"
                                        : cat.badgeText === "COMMON"
                                          ? "Common"
                                          : "Rare"}{" "}
                                    ✦
                                  </span>
                                </div>

                                {/* Curved photo frame - wider and longer to fill the card beautifully (145px width / 200px height) */}
                                <div className="w-[145px] h-[200px] mx-auto rounded-xl overflow-hidden relative border border-white/5 shadow-inner flex items-center justify-center shrink-0 transition-all duration-300">
                                  <img
                                    src={selectedBgs[cat.id] || cat.image}
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
                      /* Custom Grid View - Point 1: Rendered fully inside the outer scrollable interface container */
                      <div
                        className="w-full px-1 py-1 mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="grid grid-cols-2 gap-3 pb-4">
                          {IMMERSIVE_CATEGORIES.map((cat, idx) => (
                            <motion.div
                              key={`grid-${cat.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCategoryIndex(idx);
                                setIsGridViewOpen(false);
                                setCurrentScreen("expanded");
                                triggerToast(`Opening ${cat.title} 🧭`);
                              }}
                              className={`${cat.cardBg} border ${cat.borderColor} rounded-[18px] p-3 flex flex-col justify-between h-[185px] cursor-pointer hover:border-white/20 transition-all shadow-xl text-left relative overflow-hidden`}
                              whileHover={{ y: -2 }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/35 pointer-events-none" />
                              <div className="text-left relative z-10 w-full overflow-hidden">
                                <h4 className="text-[11px] font-extrabold tracking-wider uppercase text-white font-display line-clamp-1">
                                  {cat.title}
                                </h4>
                                <span
                                  className={`text-[7.5px] font-mono font-extrabold uppercase tracking-widest block mt-0.5 ${cat.accentColor} whitespace-nowrap overflow-hidden text-ellipsis`}
                                >
                                  Rarity:{" "}
                                  {cat.badgeText === "EPIC"
                                    ? "Epic"
                                    : cat.badgeText === "LEGENDARY"
                                      ? "Legendary"
                                      : cat.badgeText === "COMMON"
                                        ? "Common"
                                        : "Rare"}
                                </span>
                              </div>

                              {/* Enlarged photo container - 110px length to prevent squishing */}
                              <div className="w-full h-[110px] rounded-lg overflow-hidden my-1.5 border border-white/5 relative shrink-0">
                                <img
                                  src={selectedBgs[cat.id] || cat.image}
                                  className="w-full h-full object-cover"
                                  alt=""
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Point 3: Swap buttons & remove View stack card button inside grid view */}
                    {/* Small upper button: rendered ONLY in stack mode to customize */}
                    {!isGridViewOpen && (
                      <button
                        className="text-center text-[10.5px] text-zinc-200 font-extrabold bg-white/5 hover:bg-white/10 active:scale-95 transition-all py-2 px-6 rounded-full border border-white/5 w-full max-w-[215px] mx-auto mt-2 tracking-widest uppercase select-none relative z-10 font-mono block cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsGridViewOpen(true);
                          triggerToast("Grid customizer active! 🎯");
                        }}
                      >
                        🎨 Customise Tastecard
                      </button>
                    )}

                    {/* Master bottom button: "Share Tastecard", only visible in grid view */}
                    {isGridViewOpen && (
                      <div
                        className="w-full mt-2.5 flex flex-col items-center relative z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsShareModalOpen(true);
                          }}
                          className="py-3 w-full max-w-[240px] rounded-full bg-[#403B33] hover:bg-[#4A453C] active:scale-95 transition-all text-white border border-[#ffffff1a] shadow-lg cursor-pointer text-center text-[12px] font-extrabold tracking-[0.1em] uppercase font-sans flex items-center justify-center gap-2"
                        >
                          ✨ SHARE TASTECARD
                        </button>
                      </div>
                    )}

                    {/* Floating Customizer Options Menu */}
                    <AnimatePresence>
                      {isEditMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          className="absolute inset-x-4 bottom-14 bg-zinc-950/95 border border-white/15 p-4 rounded-[28px] backdrop-blur-2xl z-50 shadow-[0_20px_60px_rgba(0,0,0,0.95)] text-left flex flex-col gap-3.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-between items-center bg-white/5 -mx-4 -mt-4 px-4 py-2.5 border-b border-white/10 rounded-t-[28px]">
                            <span className="text-[11px] font-sans tracking-widest text-amber-400 font-extrabold uppercase flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              Customizer Options
                            </span>
                            <button
                              onClick={() => {
                                setIsEditMenuOpen(false);
                                triggerToast("Customizer closed");
                              }}
                              className="text-zinc-450 hover:text-white bg-white/10 hover:bg-white/15 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Username option */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                              Edit Username
                            </label>
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="e.g. Lina"
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-sans tracking-wide transition-colors"
                            />
                            <p className="text-[8px] text-zinc-550 italic tracking-wide">
                              Defaults to "My Gallery" if left empty.
                            </p>
                          </div>

                          {/* Profile Picture option */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                              Profile Picture
                            </label>
                            <label className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all rounded-xl border border-dashed border-white/20 cursor-pointer text-xs text-zinc-300 font-medium overflow-hidden">
                              {profilePic ? (
                                <img src={profilePic} alt="Profile" className="w-6 h-6 rounded-full object-cover shrink-0" />
                              ) : (
                                <svg
                                  className="w-4 h-4 text-amber-400"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              )}
                              <span className="font-sans text-[11px] tracking-wide text-zinc-350">
                                {profilePic ? "Change profile picture" : "Upload profile picture"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const result = event.target?.result as string;
                                      if (result) {
                                        setProfilePic(result);
                                        triggerToast("Profile picture updated! 📸");
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* Custom background image upload */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                              Upload Custom Wallpaper
                            </label>
                            <label className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all rounded-xl border border-dashed border-white/20 cursor-pointer text-xs text-zinc-300 font-medium">
                              <svg
                                className="w-4 h-4 text-amber-400 animate-pulse"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                              </svg>
                              <span className="font-sans text-[11px] tracking-wide text-zinc-350">
                                Upload background image
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const result = event.target
                                        ?.result as string;
                                      if (result) {
                                        setSelectedHomeBg(result);
                                        // Also apply to current section for immediate feedback
                                        setSelectedBgs((prev) => ({
                                          ...prev,
                                          [activeCategory.id]: result,
                                        }));
                                        triggerToast(
                                          "Custom background wallpaper applied! 🎨",
                                        );
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* Quick preset selector inside modal for reference */}
                          <div className="flex flex-col gap-1 mt-0.5">
                            <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                              Or Select Theme Wallpaper
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {IMMERSIVE_CATEGORIES.map((cat) => {
                                const defaultImg = cat.image;
                                const isSelected =
                                  homeBg ===
                                  (selectedBgs[cat.id] || defaultImg);
                                return (
                                  <button
                                    key={`modal-bg-pick-${cat.id}`}
                                    onClick={() => {
                                      const picked =
                                        selectedBgs[cat.id] || defaultImg;
                                      setSelectedHomeBg(picked);
                                      triggerToast(
                                        `Wallpaper set to ${cat.location}!`,
                                      );
                                    }}
                                    className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                                      isSelected
                                        ? "border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.25)]"
                                        : "border-white/10 hover:border-white/20"
                                    }`}
                                  >
                                    <img
                                      src={selectedBgs[cat.id] || defaultImg}
                                      className="w-full h-full object-cover"
                                      alt=""
                                    />
                                    <div className="absolute inset-0 bg-black/35" />
                                    <span className="absolute bottom-0.5 inset-x-0.5 text-[5px] font-mono text-white uppercase truncate font-black text-center bg-black/70 px-0.5 py-0.5 rounded leading-none">
                                      {cat.title.replace("THE ", "")}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setIsEditMenuOpen(false);
                              triggerToast("Updated successfully! ✨");
                            }}
                            className="w-full py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-neutral-950 font-extrabold uppercase tracking-widest text-[10.5px] rounded-xl font-sans mt-0.5 cursor-pointer active:scale-95 transition-all shadow-md"
                          >
                            Save & Close
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: CATEGORY EXPANDED (MAGNA CITY IMPRESSIVE IMMERSIVE STATE) */}
            {currentScreen === "expanded" && (
              <motion.div
                key="expanded-viewport"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.1, bottom: 0.8 }}
                onDragEnd={(event, info) => {
                  if (info.offset.y > 100) {
                    setCurrentScreen("deck");
                    triggerToast("Returned to selector deck");
                  }
                }}
                onClick={() => {
                  setCurrentScreen("deck");
                  triggerToast("Returned to selector deck");
                }}
                className="absolute inset-0 flex flex-col justify-end p-4 pb-6 text-white font-sans overflow-hidden cursor-pointer"
              >
                {/* Fully unblurred background image overlaying dynamic selection */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter-none scale-100 opacity-100 pointer-events-none transition-all duration-500 ease-in-out"
                  style={{ backgroundImage: `url("${currentBg}")` }}
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

                {/* Elegant card metadata layer dynamic for each category */}
                <div
                  className="w-full flex justify-between items-end relative z-10 mb-3 px-1 pointer-events-none text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left Side: Name and Theme Rarity */}
                  <div className="flex flex-col">
                    <span className="text-[21px] font-display tracking-tight font-extrabold leading-tight text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                      {activeCategory.title === "THE PEAKS"
                        ? "AlUla Peaks"
                        : activeCategory.title === "THE FLAVORS"
                          ? "Citrus Oasis"
                          : activeCategory.title === "THE REFUSION"
                            ? "Sage Tonic"
                            : "Ancient Keep"}
                    </span>
                    <div className="bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.4)] self-start mt-1">
                      <span
                        className={`text-[8px] sm:text-[9px] font-mono tracking-[0.16em] ${activeCategory.accentColor} font-extrabold uppercase whitespace-nowrap overflow-hidden text-ellipsis`}
                      >
                        ✦ THEME RARITY:{" "}
                        {activeCategory.badgeText === "EPIC"
                          ? "Epic"
                          : activeCategory.badgeText === "LEGENDARY"
                            ? "Legendary"
                            : activeCategory.badgeText === "COMMON"
                              ? "Common"
                              : "Rare"}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Photo Count */}
                  <div className="bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center mb-1">
                    <span className="text-[11px] font-mono font-bold text-white tracking-widest drop-shadow-md">
                      173 <span className="text-white/80">photos</span>
                    </span>
                  </div>
                </div>

                {/* Beautiful Clear Glass Horizontal Image-Switcher Gallery replacing the share button */}
                <div
                  className="w-full relative z-10 px-4 py-3 bg-white/5 border border-white/15 backdrop-blur-xl rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.6)] text-left mb-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-2 px-0.5 select-none">
                    <span className="text-[10px] font-display uppercase tracking-[0.16em] font-black text-white/95">
                      Explore theme gallery
                    </span>
                    <span className="text-[8.5px] font-mono tracking-wider font-extrabold text-amber-400/95 uppercase">
                      tap to change context
                    </span>
                  </div>

                  {/* Horizontal Scrollable Row containing the category's photos */}
                  <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-none no-scrollbar snap-x [-ms-overflow-style:none] [scrollbar-width:none]">
                    {activeCategory.photos.map((photoUrl, idx) => {
                      const isActive = currentBg === photoUrl;
                      return (
                        <motion.div
                          key={`photo-explore-${idx}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedBgs((prev) => ({
                              ...prev,
                              [activeCategory.id]: photoUrl,
                            }));
                            triggerToast(
                              `Background changed to Photo ${idx + 1} 🎨`,
                            );
                          }}
                          className={`relative flex-shrink-0 w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 snap-start ${
                            isActive
                              ? "border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.45)]"
                              : "border-white/10 hover:border-white/30 hover:opacity-100 opacity-80"
                          }`}
                        >
                          <img
                            src={photoUrl}
                            className="w-full h-full object-cover select-none"
                            alt=""
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                activeCategory.image;
                            }}
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-amber-400/10 flex items-center justify-center">
                              <span className="absolute bottom-1 right-1 bg-amber-400 text-[6.5px] font-mono text-black font-extrabold px-1 rounded-sm tracking-wide">
                                ACTIVE
                              </span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* "View all photos" action trigger button immediately below the gallery carousel inside the clear box container */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTakeScreenshot();
                    }}
                    className="w-full mt-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 transition-all text-white border border-white/20 shadow-md backdrop-blur-md cursor-pointer text-center text-[10.5px] font-mono tracking-widest uppercase font-black"
                  >
                    View all photos In the Theme
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shutter flash effect */}
        <AnimatePresence>
          {showShutterFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0 bg-white z-[120] pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* High-fidelity sharing card poster representing All Theme Cards */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -100,
          opacity: 0.001,
          pointerEvents: "none",
        }}
      >
        <div
          id="tastecard-printable-share"
          style={{
            width: "540px",
            height: "960px",
            position: "relative",
          }}
          className="bg-zinc-950 text-white overflow-hidden flex flex-col p-8 font-sans"
        >
          {/* Dynamic theme background preset or user selected background */}
          <img
            src={isGridViewOpen ? homeBg : currentBg}
            className="absolute inset-0 w-full h-full object-cover filter brightness-50"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            alt=""
          />
          <div className="absolute inset-0 bg-neutral-950/70" />

          {/* Internal mock top header bar */}
          <div className="relative z-10 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-300 mb-6 uppercase">
            <span>10:10 EST</span>
            <span className="font-sans font-black bg-white/10 px-3.5 py-1 rounded-full border border-white/10 shadow-lg select-none">
              ✦ TASTECARD PORTAL
            </span>
            <span>5G ULTRA</span>
          </div>

          {/* Header containing name and rarity status */}
          <div className="relative z-10 text-center mb-6">
            <h1 className="text-[28px] font-black font-sans tracking-widest bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-300 bg-clip-text text-transparent drop-shadow-md uppercase">
              MY TASTECARD
            </h1>
            <p className="text-[13px] font-black uppercase tracking-wider text-zinc-200 mt-2">
              {username
                ? `${username}'s Gallery's Top Themes`
                : "My Gallery's Top Themes"}
            </p>
            <span className="inline-block text-[9.5px] font-mono tracking-widest text-[#E4EEF0] bg-gradient-to-r from-teal-500/20 to-emerald-500/20 px-4 py-1 rounded-full border border-emerald-500/30 mt-1.5 shadow-md">
              TASTECARD RARITY:{" "}
              <span className="font-extrabold text-emerald-400">LEGENDARY</span>
            </span>
          </div>

          {/* 2x3 grid displaying all 6 categories beautifully in unclipped style */}
          <div className="relative z-10 grid grid-cols-2 gap-4 flex-1 mb-6">
            {IMMERSIVE_CATEGORIES.map((cat, idx) => {
              const hasCustom = selectedBgs[cat.id] || cat.image;
              const isSelected = activeCategoryIndex === idx;
              return (
                <div
                  key={`poster-grid-${cat.id}`}
                  className={`relative rounded-[22px] ${cat.cardBg} border ${isSelected ? "border-amber-400 shadow-[0_4px_20px_rgba(251,191,36,0.2)] ring-1 ring-amber-400/30" : "border-white/10"} p-3.5 flex flex-col justify-between h-[215px] overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45 pointer-events-none" />

                  {/* Header info */}
                  <div className="relative z-10 text-left">
                    <h4 className="text-[11.5px] font-black font-serif tracking-widest uppercase text-white truncate">
                      {cat.title}
                    </h4>
                    <span
                      className={`text-[7px] font-mono font-extrabold uppercase tracking-widest block mt-0.5 ${cat.accentColor}`}
                    >
                      Rarity:{" "}
                      {cat.badgeText === "EPIC"
                        ? "Epic"
                        : cat.badgeText === "LEGENDARY"
                          ? "Legendary"
                          : cat.badgeText === "COMMON"
                            ? "Common"
                            : "Rare"}
                    </span>
                  </div>

                  {/* Visual crop area */}
                  <div className="w-full h-[120px] rounded-xl overflow-hidden my-1 border border-white/5 relative shrink-0 bg-neutral-900">
                    <img
                      src={hasCustom}
                      className="w-full h-full object-cover select-none filter brightness-95"
                      alt=""
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-amber-400/10 flex items-center justify-center">
                        <span className="absolute bottom-1 right-1 bg-amber-400 text-[6px] font-mono text-black font-black px-1 rounded-sm tracking-wide">
                          ACTIVE
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer info branding */}
          <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-4 text-left">
            <div>
              <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">
                Saudi Design Passport • Riyadh Oasis
              </span>
              <p className="text-[9.5px] font-sans font-extrabold text-white mt-0.5">
                ✦ Emergent Gallery themes ✦
              </p>
            </div>
            <span className="text-[9.5px] font-mono tracking-widest font-black text-amber-400 bg-black/60 px-3 py-1 rounded-full border border-white/10">
              TASTECARD.CO
            </span>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        username={username}
        profilePic={profilePic}
        homeBg={homeBg}
        onShareTastecard={handleTakeScreenshot}
        selectedBgs={selectedBgs}
      />
    </div>
  );
}

// PlusIcon replacement to stay independent of other files
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ShareModal({
  isOpen,
  onClose,
  username,
  profilePic,
  homeBg,
  onShareTastecard,
  selectedBgs,
}: {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  profilePic: string | null;
  homeBg: string;
  onShareTastecard: () => void;
  selectedBgs: Record<string, string>;
}) {
  const displayUsername = username || "Lina";
  // Select first 4 categories for the grid
  const cardCategories = IMMERSIVE_CATEGORIES.slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[200] bg-transparent backdrop-blur-xl flex flex-col items-center pt-10 px-6 pb-12 overflow-hidden overflow-y-auto"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between mb-8 mt-2 max-w-[360px]">
            <div className="flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-zinc-300">
                Share Rollcard
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-4 h-4 text-zinc-300" />
            </button>
          </div>

          {/* Tastecard Container - Wrapper for screenshot to include background */}
          <div
            id="tastecard-printable-modal"
            className="w-full max-w-[360px] relative shrink-0 rounded-[32px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0a0a]"
          >
            {/* Background image specifically matching grid view */}
            <img
              src={homeBg}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt=""
            />
            {/* Opaque gradient layer to mirror the grid view */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70 pointer-events-none" />
            
            {/* Card Content Container */}
            <div className="w-full h-full border border-white/15 p-6 pt-5 pb-5 text-white flex flex-col relative font-sans">
              {/* Header small text */}
              <div className="flex justify-between items-center mb-5 text-white/70">
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                  MY ROLLCARD
                </span>
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                  #FTQ8
                </span>
              </div>

              {/* Profile Row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0 shadow-inner ring-1 ring-white/10">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-white/80" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[16px] text-white/95 leading-tight">
                    {displayUsername}&apos;s Rollcard
                  </span>
                  <span className="text-[8.5px] font-mono tracking-widest font-black uppercase mt-1.5 text-white/70 flex items-center gap-1">
                    ROLLCARD RARITY: <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">RARE</span>
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex mb-6 text-white/95 items-center">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[22px] font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">2.0K</span>
                  <span className="text-[9px] font-mono tracking-widest text-white/60 font-bold uppercase">
                    PHOTOS
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 ml-[95px]">
                  <span className="text-[22px] font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">6</span>
                  <span className="text-[9px] font-mono tracking-widest text-white/60 font-bold uppercase">
                    THEMES
                  </span>
                </div>
              </div>

              {/* About Me */}
              <div className="flex flex-col mb-6">
                <span className="text-[8px] font-mono tracking-widest text-white/60 uppercase font-black mb-1.5">
                  ABOUT ME
                </span>
                <span className="text-[13px] font-medium leading-snug text-white/90">
                  My name is kendrick and im 5&apos;3
                </span>
              </div>

              {/* 2x2 Grid - Completely Identical to Top Themes Card Design */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {cardCategories.map((cat) => {
                  const bg = selectedBgs[cat.id] || cat.image;
                  return (
                    <div
                      key={`modal-grid-${cat.id}`}
                      className={`relative rounded-[22px] ${cat.cardBg} border border-white/10 p-3.5 flex flex-col justify-between h-[215px] overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45 pointer-events-none" />

                      {/* Header info */}
                      <div className="relative z-10 text-left">
                        <h4 className="text-[11.5px] font-black font-serif tracking-widest uppercase text-white truncate">
                          {cat.title}
                        </h4>
                        <span
                          className={`text-[7px] font-mono font-extrabold uppercase tracking-widest block mt-0.5 ${cat.accentColor}`}
                        >
                          Rarity:{" "}
                          {cat.badgeText === "EPIC"
                            ? "Epic"
                            : cat.badgeText === "LEGENDARY"
                              ? "Legendary"
                              : cat.badgeText === "COMMON"
                                ? "Common"
                                : "Rare"}
                        </span>
                      </div>

                      {/* Visual crop area */}
                      <div className="w-full h-[120px] rounded-xl overflow-hidden my-1 border border-white/5 relative shrink-0 bg-neutral-900 mt-auto">
                        <img
                          src={bg}
                          className="w-full h-full object-cover select-none filter brightness-95"
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer small text */}
              <div className="text-center text-white/40 pb-4">
                <span className="text-[7.5px] font-mono tracking-[0.25em] font-bold uppercase block mb-6">
                  {displayUsername}&apos;S ROLLCARD • #FTQ8
                </span>
                
                <button
                  id="exclude-from-capture"
                  onClick={() => {
                    onShareTastecard();
                    setTimeout(onClose, 1200);
                  }}
                  className="py-3 w-full max-w-[240px] mx-auto rounded-full bg-[#403B33] hover:bg-[#4A453C] active:scale-95 transition-all text-white border border-[#ffffff1a] shadow-lg cursor-pointer text-center text-[12px] font-extrabold tracking-[0.1em] uppercase font-sans flex items-center justify-center gap-2"
                >
                  ✨ SHARE TASTECARD
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
