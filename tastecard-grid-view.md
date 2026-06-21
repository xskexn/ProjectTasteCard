# Tastecard Grid View Integration Guide

You are given a task to integrate an existing React component into the codebase to recreate the Tastecard Grid View.

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

# Setup shadcn CLI (if you want to use its utility integrations)
npx shadcn@latest init
```

Determine the default path for components and styles. 
If the default path for components is not `/components/ui`, it is highly recommended to create this folder to maintain a clean separation between foundational UI components and complete page views or layouts.

### Design Specifications

Before diving into the code, here are the core design tokens used to replicate this view:

**Typography**:
- **Headers**: Custom sans-serif (e.g., `Inter` or `Space Grotesk`), ultra-black (`font-black`), wide tracking (`tracking-widest`).
- **Sub-labels (Rarity)**: Monospace (e.g., `JetBrains Mono`), ultra-bold (`font-extrabold`), tiny text (`text-[8px]`).

**Card Specs**:
- **Border Radius**: Large smooth corners for the outer card (`rounded-[24px]`). The inner image has a slightly smaller radius (`rounded-xl`).
- **Colors & Borders**: 
  - Each card has a semi-transparent dark background (`bg-black/40 backdrop-blur-3xl`).
  - Outline borders depend on the theme (e.g., `border-amber-500/30` for Epic, `border-emerald-500/30` for Legendary).
- **Opacity**: The background overlay uses `bg-black/70` in the demo to give the space-background a darkened glassmatic feeling.

---

### Integration

Copy-paste this component to your `/components/ui` or `/components` folder:

```tsx
// @/components/ui/tastecard-grid.tsx
"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeCard {
  id: string;
  title: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  image: string;
}

const RARITY_COLORS = {
  COMMON: "text-teal-400 border-teal-500/30 outline-teal-500/20",
  RARE: "text-rose-400 border-rose-500/30 outline-rose-500/20",
  EPIC: "text-amber-400 border-amber-500/30 outline-amber-500/20",
  LEGENDARY: "text-emerald-400 border-emerald-500/30 outline-emerald-500/20",
};

interface TastecardGridProps {
  username?: string;
  globalRarity?: string;
  cards: ThemeCard[];
  onBack?: () => void;
  onEdit?: () => void;
  className?: string;
}

export function TastecardGrid({
  username = "MY",
  globalRarity = "LEGENDARY",
  cards,
  onBack,
  onEdit,
  className,
}: TastecardGridProps) {
  return (
    <div className={cn("w-full h-full min-h-screen text-white font-sans flex flex-col pt-12 pb-6 px-5 relative", className)}>
      
      {/* Top Header Navigation */}
      <div className="flex justify-between items-center z-10 mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white/90" />
        </button>
        
        <h1 className="text-xl font-black tracking-widest uppercase">
          MY TASTECARD
        </h1>
        
        <button 
          onClick={onEdit}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest hover:bg-white/10 active:scale-95 transition-all"
        >
          EDIT
        </button>
      </div>

      {/* Title block */}
      <div className="text-center z-10 mb-8 flex flex-col items-center">
        <h2 className="text-[14px] font-black uppercase tracking-widest text-zinc-100 mb-2">
          {username} GALLERY'S TOP THEMES
        </h2>
        <span className="text-[10px] font-mono tracking-widest text-zinc-300">
          TASTECARD RARITY: <span className="text-emerald-400 font-extrabold">{globalRarity}</span>
        </span>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 gap-3 z-10">
        {cards.map((card) => {
          const styleKey = RARITY_COLORS[card.rarity];
          const textColor = styleKey.split(' ')[0];
          const borderColor = styleKey.split(' ')[1];
          
          return (
            <div 
              key={card.id}
              className={cn(
                "relative flex flex-col p-3.5 pb-4 rounded-[24px] bg-neutral-950/40 backdrop-blur-3xl border",
                borderColor
              )}
            >
              {/* Card Header texts */}
              <div className="mb-3">
                <h3 className="text-[12px] font-black uppercase tracking-widest text-white leading-tight mb-1">
                  {card.title}
                </h3>
                <span className={cn("text-[8px] font-mono uppercase tracking-widest font-extrabold", textColor)}>
                  RARITY: {card.rarity}
                </span>
              </div>
              
              {/* Image visualizer */}
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-white/5">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
```

### Demo Implementation

Copy-paste this code into a demo file to render the actual preview.

```tsx
// demo.tsx
import { TastecardGrid } from "@/components/ui/tastecard-grid";

export function TastecardGridDemo() {
  const sampleCards = [
    {
      id: "peaks",
      title: "THE PEAKS",
      rarity: "EPIC" as const,
      image: "https://images.unsplash.com/photo-1542315183-107f9c2d1373?w=800&q=80"
    },
    {
      id: "flavors",
      title: "THE FLAVORS",
      rarity: "LEGENDARY" as const,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
    },
    {
      id: "refusion",
      title: "THE REFUSION",
      rarity: "RARE" as const,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80" // Cocktail
    },
    {
      id: "archives",
      title: "THE ARCHIVES",
      rarity: "COMMON" as const,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80" // Potted plant
    }
  ];

  return (
    <div className="relative w-full max-w-[400px] h-[850px] mx-auto bg-black rounded-[40px] overflow-hidden border-[8px] border-zinc-900 shadow-2xl">
      {/* Background space image mock */}
      <img 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        alt="Space Edge"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* The component */}
      <TastecardGrid cards={sampleCards} />
    </div>
  );
}
```

### Install NPM dependencies

```bash
npm i lucide-react clsx tailwind-merge
```

### Implementation Guidelines

1. **Analyze the component structure**: The component expects a relative environment where it can sit transparently over a darker background (hence the `bg-neutral-950/40 backdrop-blur-3xl` usage). If you use a light background, these specific styling colors might need to be inverted.
2. **Review arguments and state**: `cards` are passed dynamically as props. The interaction states are limited strictly to `onBack` and `onEdit` callbacks.
3. **Required context providers**: None. The component is fully controlled via standard React props.

### Questions to Ask
- **What data/props will be passed to this component?** An array of categories containing `id`, `title`, `rarity` badge strings, and an `image` URL. 
- **Are there any specific state management requirements?** No, it manages purely the UI state.
- **Are there any required assets?** Expects external image URLs. You need `lucide-react` for the top navigation arrows.
- **What is the expected responsive behavior?** Primarily designed for Mobile Viewports or tightly constrained Desktop Side-drawers. Uses `grid-cols-2` scaling.
- **What is the best place to use this component in the app?** As a sharing, curation, or profile viewing screen to overview the user's unlocked assets.

### Steps to integrate
0. Copy paste `tastecard-grid.tsx` into `/components/ui`.
1. Install `lucide-react`, `clsx`, and `tailwind-merge` if using the `cn()` utility.
2. The demo comes pre-filled with reliable Unsplash stock images identical to the flavor of the screenshot.
3. The `ArrowLeft` icon from lucide-react is used seamlessly in the header.
