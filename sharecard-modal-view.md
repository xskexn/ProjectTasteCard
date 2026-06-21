# Share Tastecard Modal Integration Guide

You are given a task to integrate an existing React component into the codebase to recreate the Share Tastecard Modal View.

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, please initialize your project first:
```bash
# Setup project and Tailwind
npx create-react-app my-app --template typescript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Setup shadcn CLI
npx shadcn@latest init
```

### Design Specifications

Before diving into the code, here are the core design tokens used to replicate this view:

**Colors & Container Shapes**:
- **Background Overlay**: The modal expands to cover the screen with a glass UI `bg-black/40 backdrop-blur-md`.
- **Card Background**: A deep glass dark background `bg-neutral-950/40 backdrop-blur-3xl`.
- **Card Text**: Crispy accessible whites `text-white`.
- **Theme Gradient Button**: An energetic hot-pink gradient or solid color, closely representing `bg-rose-500` or `bg-[#EC2254]`.

**Typography**:
- **Headers & Actions**: Main texts like profile name or the action button use heavy weights (`font-extrabold` or `font-bold`). Minimum line heights.
- **Sub-labels & Watermarks**: All metadata like `#FTQ8`, `MY TASTECARD`, and tags employ `font-mono tracking-widest uppercase` to give a technical yet high-fashion blueprint format.

**Layout & Spacing**:
- **Thumbnails**: 2x2 Grid of portrait aspect-ratio images (`aspect-square`) using inner text layout with subtle gradient backing.

---

### Integration

Copy-paste this component to your `/components/ui` or `/components` folder:

```tsx
// @/components/ui/share-tastecard-modal.tsx
"use client";

import React from "react";
import { Utensils, X, User, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onShareTastecard: () => void;
  photos: { id: string, title: string, image: string }[];
}

export function ShareTastecardModal({
  isOpen,
  onClose,
  username,
  onShareTastecard,
  photos
}: ShareModalProps) {
  const displayUsername = username || "Rohan S";
  const displayPhotos = photos.slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
           className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md flex flex-col items-center pt-10 px-6 pb-12 overflow-hidden overflow-y-auto"
        >
          {/* Top Interface Header */}
          <div className="w-full flex items-center justify-between mb-8 mt-2 max-w-[360px]">
            <div className="flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-zinc-300">
                Share your taste
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-4 h-4 text-zinc-300" />
            </button>
          </div>

          {/* Core Tastecard */}
          <div className="w-full max-w-[360px] bg-neutral-950/40 backdrop-blur-3xl rounded-[32px] p-6 pt-5 pb-5 text-white flex flex-col relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] shrink-0 font-sans border border-white/10">
             {/* Header Blueprint Labels */}
             <div className="flex justify-between items-center mb-5 text-white/70">
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase">MY TASTECARD</span>
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase">#FTQ8</span>
             </div>

             {/* Profile Row */}
             <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
                  <User className="w-5 h-5 text-white/80" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[15px] text-white/95 leading-tight">
                    {displayUsername}&apos; Tastecard
                  </span>
                  <span className="text-[8px] font-mono tracking-widest font-black uppercase mt-1 text-white/70 flex items-center gap-1">
                    TASTECARD RARITY: <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">RARE</span>
                  </span>
                </div>
             </div>

             {/* Data Stats Row */}
             <div className="grid grid-cols-3 gap-2 mb-6 text-center text-white/95">
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-xl font-extrabold">2.0K</span>
                  <span className="text-[7.5px] font-mono tracking-widest text-white/60 font-bold uppercase">PHOTOS</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xl font-extrabold">6</span>
                  <span className="text-[7.5px] font-mono tracking-widest text-white/60 font-bold uppercase">THEMES</span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xl font-extrabold">11</span>
                  <span className="text-[7.5px] font-mono tracking-widest text-white/60 font-bold uppercase">PLACES</span>
                </div>
             </div>

             {/* Bio Section */}
             <div className="flex flex-col mb-6">
                <span className="text-[8px] font-mono tracking-widest text-white/60 uppercase font-black mb-1.5">ABOUT ME</span>
                <span className="text-[13px] font-medium leading-snug text-white/90">My name is kendrick and im 5&apos;3</span>
             </div>

             {/* Immersive 2x2 Theme Grid - Completely Identical to Top Themes Card Design */}
             <div className="grid grid-cols-2 gap-3 mb-8">
               {displayPhotos.map((cat, i) => (
                 <div
                   key={cat.id || i}
                   className="relative rounded-[22px] bg-white/5 border border-white/10 p-3.5 flex flex-col justify-between h-[215px] overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45 pointer-events-none" />

                   {/* Header info */}
                   <div className="relative z-10 text-left">
                     <h4 className="text-[11.5px] font-black font-serif tracking-widest uppercase text-white truncate">
                       {cat.title}
                     </h4>
                     <span className="text-[7.5px] font-mono tracking-widest text-[#fbbf24] font-bold uppercase mt-1">
                       ✦ RARITY: EPIC
                     </span>
                   </div>

                   {/* Visual crop area */}
                   <div className="w-full h-[120px] rounded-xl overflow-hidden my-1 border border-white/5 relative shrink-0 bg-neutral-900">
                     <img src={cat.image} className="w-full h-full object-cover select-none filter brightness-95" alt="" />
                   </div>

                   {/* Subtitle location badge */}
                   <span className="relative z-10 text-[7px] font-mono tracking-widest text-zinc-400 uppercase truncate text-left">
                     ✦ SAUDI DESIGN PASSPORT
                   </span>
                 </div>
               ))}
             </div>

             {/* Footer Registration Mark */}
             <div className="absolute bottom-4 left-0 right-0 text-center text-white/40">
                <span className="text-[7.5px] font-mono tracking-[0.25em] font-bold uppercase">
                  {displayUsername}&apos; TASTECARD • #FTQ8
                </span>
             </div>
          </div>
          
          {/* Main Action Call */}
          <div className="w-full max-w-[360px] mt-8 flex flex-col items-center">
            <button 
               onClick={onShareTastecard}
               className="w-full py-4 rounded-[16px] bg-rose-500 hover:bg-rose-600 text-white font-sans font-bold shadow-[0_4px_24px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2 mb-4 active:scale-95 transition-all text-[15px] cursor-pointer"
            >
               <Share2 className="w-5 h-5" /> Share Tastecard
            </button>
            <p className="text-[9px] font-mono tracking-widest text-[#8F9BAC]/80 uppercase">
              Shares a high-resolution image. Nothing is uploaded.
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Install NPM dependencies

```bash
npm i framer-motion lucide-react 
```

### Guidance
- This modal drops down entirely over the working screen, bringing dramatic focus to the content.
- Use `framer-motion`'s `<AnimatePresence>` to mount/unmount the interface with the smooth sliding action designed here.
