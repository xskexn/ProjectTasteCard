# Replicating the Glassmorphic Rollcard

This document breaks down the exact techniques, Tailwind classes, and logic used to build the highly-polished "Rollcard" and the high-resolution image export functionality (screenshotting the UI).

## 🛠 Prerequisites & Dependencies

To replicate this in any standard React project, you'll need the following libraries:
- **Tailwind CSS**: For all styling, typography, and glassmorphism.
- **html-to-image**: For capturing the DOM node as a high-res crisp image (`toPng`).
- **lucide-react**: For the clean SVG icons.

```bash
npm install html-to-image lucide-react
```

---

## 1. High-Resolution Screenshot Logic

To capture the card cleanly while ignoring specific elements (like the "Share Tastecard" button), we use `html-to-image` combined with a DOM `filter`.

```tsx
import { toPng } from 'html-to-image';

const handleTakeScreenshot = async () => {
  const node = document.getElementById("tastecard-printable-modal");
  
  if (!node) return;

  try {
    const dataUrl = await toPng(node, {
      pixelRatio: 2, // 2x resolution for crisp, high-definition text
      cacheBust: false,
      backgroundColor: "#0a0a0a", // Matches the app's dark theme
      filter: (n: any) => {
        // Exclude the button from the final image
        if (n.id === "exclude-from-capture") return false;
        return true;
      },
      style: {
        position: "relative",
        margin: "0",
      }
    });

    // Create a temporary link to download the image
    const link = document.createElement("a");
    link.download = "My-Rollcard.png";
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("Failed to export image", err);
  }
};
```

---

## 2. Layout Structure & Glassmorphism

The card achieves its "Glassmorphic" depth by layering an image, a dark gradient overlay, and a transparent border inside an `overflow-hidden` container.

### The Container Shell
```tsx
<div
  id="tastecard-printable-modal"
  className="w-full max-w-[360px] relative rounded-[32px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#0a0a0a]"
>
  {/* 1. Background Image */}
  <img
    src={homeBg}
    className="absolute inset-0 w-full h-full object-cover opacity-80"
  />
  
  {/* 2. Gradient Overlay (ensures text readability over bright photos) */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70 pointer-events-none" />
  
  {/* 3. Glass Content Container */}
  <div className="w-full h-full border border-white/15 p-6 pt-5 pb-5 text-white flex flex-col relative font-sans">
    {/* All internal content goes here */}
  </div>
</div>
```

---

## 3. Typography & Styling Secrets

The UI achieves its premium look through high-contrast typography pairings:

### Stats Row (Gradient Text)
To make the numbers pop, we use a transparent text fill with a background gradient:
```tsx
<div className="flex items-baseline gap-1.5">
  <span className="text-[22px] font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">
    2.0K
  </span>
  <span className="text-[9px] font-mono tracking-widest text-white/60 font-bold uppercase">
    PHOTOS
  </span>
</div>
```

### Profile Row (Avatars & Rarity Badges)
The avatar uses an inner shadow and a subtle white ring to separate it from the background. The "RARE" text uses a drop-shadow to create a slight glow effect:
```tsx
<div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0 shadow-inner ring-1 ring-white/10">
  <img src={profilePic} className="w-full h-full object-cover" />
</div>

{/* Rarity text with glow */}
<span className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
  RARE
</span>
```

---

## 4. The 2x2 Grid Items (Theme Cards)

The grid items inside the card also use layered positioning to place labels directly over darkened images.

```tsx
<div className="grid grid-cols-2 gap-3 mb-10">
  {categories.map((cat) => (
    <div key={cat.id} className="relative rounded-[22px] bg-[#2a1f1a]/80 border border-white/10 p-3.5 flex flex-col justify-between h-[215px] overflow-hidden">
      
      {/* Dark overlay specifically for the grid item headers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45 pointer-events-none" />

      {/* Grid Item Header */}
      <div className="relative z-10 text-left">
        <h4 className="text-[11.5px] font-black font-serif tracking-widest uppercase text-white truncate">
          {cat.title}
        </h4>
        <span className="text-[7px] font-mono font-extrabold uppercase tracking-widest text-amber-500">
          Rarity: Rare
        </span>
      </div>

      {/* Bottom Photo Crop */}
      <div className="w-full h-[120px] rounded-xl overflow-hidden my-1 border border-white/5 relative shrink-0 bg-neutral-900 mt-auto">
        <img src={cat.image} className="w-full h-full object-cover filter brightness-95" />
      </div>
    </div>
  ))}
</div>
```

---

## 5. Summary of Key Tailwind Patterns Used

1. **`filter brightness-95`**: slightly dampens images so white text pops.
2. **`backdrop-blur-` / Opaque Gradients**: Used layered gradients (`from-black/20 via-black/30...`) instead of `backdrop-blur` for the export card, as `html-to-image` handles CSS gradients much more reliably than heavy filter blurs across all browser engines.
3. **`bg-clip-text text-transparent`**: The secret to gradient text (used on the large stat numbers).
4. **`tracking-widest font-mono text-[9px]`**: Used extensively for all standard all-caps subtitle labels to give the app its distinctive editorial/technical look.
