# Theme Gallery View Integration Guide

You are given a task to integrate an existing React component into the codebase to recreate the Theme Gallery View.

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

Determine the default path for components and styles. 
If the default path for components is not `/components/ui`, it is highly recommended to create this folder to maintain a clean separation between foundational UI components and complete page views or layouts.

### Design Specifications

Before diving into the code, here are the core design tokens used to replicate this view:

**Typography**:
- **Headers & Titles**: Custom sans-serif (e.g., `Inter`), bold weights (`font-extrabold`), tight tracking for main titles (`tracking-tight`).
- **Sub-labels & Actions**: Monospace (e.g., `JetBrains Mono`), ultra-bold (`font-bold`), wide tracking (`tracking-[0.2em]` or `tracking-widest`), small text (`text-[9px]` to `text-[11px]`).

**Card Specs & Layout**:
- **Background Gradient**: To ensure the text is readable, a gradient overlay fades from bottom to top: `bg-gradient-to-t from-black/80 via-black/20 to-transparent`.
- **Glassmorphic Panel**: The bottom contextual panel uses `bg-white/10 backdrop-blur-2xl` with a subtle `border-white/20`, rounded generously (`rounded-[32px]`).
- **Thumbnail Grid**: Square thumbnails (`w-16 h-16`), rounded (`rounded-2xl`). The active thumbnail adopts a prominent amber glow/border: `border-2 border-amber-400 p-[2px]` and an overlaid "ACTIVE" badge.
- **Action Button**: A pill-like button that blends with the glass effect (`bg-white/20`), with slight scaling transitions on press.

**Functionality**:
- **Gestures**: The top text says "SWIPE DOWN TO RETURN". In a production app, you integrate `framer-motion` for drag detection (`drag="y"`). Here we simulate the return action via a click handler or a simplified swipe detection.
- **Context Switching**: Tapping a thumbnail in the horizontal list updates the active "context", which changes the background image immediately.

---

### Integration

Copy-paste this component to your `/components/ui` or `/components` folder:

```tsx
// @/components/ui/theme-gallery-view.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoItem {
  id: string;
  url: string;
}

interface ThemeGalleryProps {
  title: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  photoCount: number;
  gallery: PhotoItem[];
  onReturn?: () => void;
  onViewAll?: () => void;
  className?: string;
}

const RARITY_COLORS = {
  COMMON: "text-teal-400",
  RARE: "text-rose-400",
  EPIC: "text-amber-400",
  LEGENDARY: "text-emerald-400",
};

export function ThemeGalleryView({
  title = "AlUla Peaks",
  rarity = "EPIC",
  photoCount = 173,
  gallery,
  onReturn,
  onViewAll,
  className,
}: ThemeGalleryProps) {
  const [activePhotoId, setActivePhotoId] = useState(gallery[0]?.id);

  const activePhotoUrl = gallery.find(p => p.id === activePhotoId)?.url || gallery[0]?.url;
  const rarityColor = RARITY_COLORS[rarity];

  // Simplified swipe detection
  let touchStartY = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchEndY > touchStartY + 50) {
      onReturn?.();
    }
  };

  return (
    <div 
      className={cn("w-full h-full min-h-screen relative font-sans overflow-hidden bg-black", className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image */}
      <img
        src={activePhotoUrl}
        alt="Theme Background"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out"
      />
      
      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

      {/* Top Bar - Swipe Indicator */}
      <div 
        className="absolute top-12 inset-x-0 z-10 flex flex-col items-center justify-center cursor-pointer text-white/80 hover:text-white transition-colors"
        onClick={onReturn}
      >
        <div className="w-12 h-1.5 bg-black/60 rounded-full mb-3" />
        <ChevronDown className="w-4 h-4 mb-1" />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">
          Swipe Down to Return
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-6 inset-x-5 z-10 flex flex-col">
        
        {/* Title & Metadata Header */}
        <div className="flex items-end justify-between mb-5">
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 leading-none drop-shadow-md">
              {title}
            </h1>
            <div className="bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.4)] self-start mt-1">
              <span className={cn("text-[8px] sm:text-[9px] font-mono tracking-[0.16em] font-extrabold uppercase whitespace-nowrap overflow-hidden text-ellipsis", rarityColor)}>
                ✦ THEME RARITY: {rarity}
              </span>
            </div>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
            <span className="text-[11px] font-mono font-bold text-white tracking-widest">
              {photoCount} <span className="text-white/70">photos</span>
            </span>
          </div>
        </div>

        {/* Glassmorphic Gallery Panel */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-[32px] border border-white/10 rounded-[32px] p-5 shadow-2xl">
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-bold tracking-widest text-white uppercase w-32 leading-snug">
              Explore Theme Gallery
            </span>
            <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase w-24 text-right leading-snug opacity-90">
              Tap to change context
            </span>
          </div>

          {/* Horizontal Thumbnails List */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-4 hide-scrollbar snap-x">
            {gallery.map((photo) => {
              const isActive = photo.id === activePhotoId;
              return (
                <button
                  key={photo.id}
                  onClick={() => setActivePhotoId(photo.id)}
                  className={cn(
                    "relative shrink-0 w-[68px] h-[68px] rounded-[20px] transition-all duration-300 snap-center",
                    isActive ? "p-[2px] bg-gradient-to-b from-amber-300 to-amber-500 scale-105" : "hover:scale-95 border border-white/10"
                  )}
                >
                  <img 
                    src={photo.url} 
                    className="w-full h-full object-cover rounded-[18px]" 
                    alt="thumbnail" 
                  />
                  {isActive && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[8px] font-black px-2 py-0.5 rounded-[4px] uppercase tracking-wider shadow-md">
                      Active
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <button 
            onClick={onViewAll}
            className="w-full py-4 rounded-[20px] bg-white/20 hover:bg-white/25 active:scale-[0.98] transition-all backdrop-blur-md border border-white/10 shadow-inner flex items-center justify-center"
          >
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">
              View all photos in the theme
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
```

### Demo Implementation

Copy-paste this code into a demo file to render the actual preview.

```tsx
// demo.tsx
import { ThemeGalleryView } from "@/components/ui/theme-gallery-view";

export function ThemeGalleryDemo() {
  const sampleGallery = [
    { id: "1", url: "https://images.unsplash.com/photo-1542315183-107f9c2d1373?w=800&q=80" }, // Bright monarch butterfly
    { id: "2", url: "https://images.unsplash.com/photo-1682687220198-d0124f48febb?w=800&q=80" }, // Desert peaks
    { id: "3", url: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80" }, // Monoliths / abstract
    { id: "4", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80" }, // Forest fog
  ];

  return (
    <div className="relative w-full max-w-[400px] h-[850px] mx-auto bg-black rounded-[46px] overflow-hidden border-[8px] border-zinc-900 shadow-2xl">
      <ThemeGalleryView 
        title="AlUla Peaks"
        rarity="EPIC"
        photoCount={173}
        gallery={sampleGallery}
        onReturn={() => alert('Swiped down to return')}
        onViewAll={() => alert('Opening full gallery grid')}
      />
    </div>
  );
}
```

### Add custom CSS for hide-scrollbar (optional)

If you use `hide-scrollbar` in your Tailwind setup, add this to your `index.css` or Tailwind plugins:
```css
@layer utilities {
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
```

### Install NPM dependencies

```bash
npm i lucide-react clsx tailwind-merge
```

### Implementation Guidelines

1. **Analyze the component structure**: The layout utilizes an absolute full-cover image behind a gradient overlay. The bottom glassmorphic panel houses a horizontally scrollable container (`overflow-x-auto`) for the collection.
2. **Review arguments and state**: 
   - Uses `activePhotoId` internally to drive the main background switch.
   - `onReturn` allows parent screens to unmount this view (triggered via chevron click or touch swiping).
3. **Required context providers**: None. Relies purely on standard React states and props.

### Questions to Ask
- **What data/props will be passed to this component?** The `title`, `rarity` badge context, a total `photoCount` integer, and a `gallery` array containing `id` and `url`.
- **Are there any specific state management requirements?** Manages local state for which photo is currently selected (`activePhotoId`), updating the hero background upon interaction.
- **Are there any required assets?** The hero images. The Unsplash demo links provide close comparisons to the provided visual. `ChevronDown` from `lucide-react` is used at the top.
- **What is the expected responsive behavior?** It acts as an immersive full-screen view tailored specifically for Mobile and narrow layouts.
- **What is the best place to use this component in the app?** Clicking on a Theme Card from the "Tastecard" Grid View should navigate to this exact screen, taking the user inside that specific themed environment.

### Steps to integrate
0. Copy paste `theme-gallery-view.tsx` into `/components/ui`.
1. Install `lucide-react`, `clsx`, and `tailwind-merge`.
2. Add the `.hide-scrollbar` utility to your global CSS.
3. Hook up the `onReturn` to your app's navigation stack to slide the view away when the user swipes down.
