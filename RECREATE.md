# Lina's Tastecard AI Recreation Guide

This guide contains the absolute specifications, state machines, styling guidelines, and functional requirements needed for an AI to perfectly recreate **Lina's Tastecard** from scratch.

---

## 1. Core Visual Concept & Theming

The application is a **highly interactive digital tastecard dashboard** designed with a layout reminiscent of a responsive mobile viewport, framed elegantly as a desktop experience. It has a beautiful **glassmorphism** visual language that dynamically adapts to both predefined background color schemes and fully customized, user-uploaded background images.

### Predefined Themes
The system defines standard color themes composed of:
1. `bg`: The background color/gradient.
2. `text`: High-contrast typography colors.
3. `cardBg`: High-blur container background combinations (e.g., `bg-white/10 backdrop-blur-3xl` or `bg-black/20 backdrop-blur-3xl`).
4. `cardBorder`: Delicate surrounding borders (e.g., `border-white/15`).

### custom User-Uploaded Background Engine
- **Element**: A continuous file upload triggers a background change.
- **Image Scaling Rules**: To prevent stretching or unexpected distortion on any viewport ratio, the uploaded image must adhere perfectly to these properties:
  - `background-repeat: no-repeat`
  - `background-size: cover`
  - `background-position: center`
- **Dynamic Adaptability (Brightness Detector)**: 
  - Upon upload, the image is rendered onto a headless `canvas` to sample average RGB values.
  - The calculated brightness selects an automatic fallback theme:
    - **Dark background detected**: Turns text color to `#FDF9F6`, overlays a subtle `bg-black/25` scrim for readability, and converts the card container to a translucent `bg-black/25 backdrop-blur-3xl border-white/10`.
    - **Light background detected**: Turns text color to `#0C1519`, overlays a subtle `bg-white/5` scrim, and converts the card container into a translucent `bg-white/15 backdrop-blur-3xl border-white/20`.

---

## 2. Interactive Feature Specs

### Active Filter Navigation Bar
- Rendered as interactive capsule chips inside the core glass card.
- Supports active selection flags matching specific curated categories: `#bookworm`, `#foodie`, `#nomad`, `#wellness`.
- **Micro-interactivity Rule**: Clicking on a tag activates a system-wide filter highlight. The items in the main media photo grid that match the category scale and stand out fully (`opacity-100`). All other non-matching items fade gently to a `opacity-35` blur effect on both the main viewport and snapshot card.

### Dynamic Photo Detail Modal
- Accessed by clicking any card from the media grid.
- **Glass Styling**: The modal itself is a slide-up tray using `bg-slate-950/45 backdrop-blur-2xl border border-white/10`.
- **Rarity Gradients**: Computes and displays tag rarity capsules dynamically:
  - `#bookworm`: Displays `common` rarity with a silver-gray zinc gradient (`from-zinc-400 via-zinc-200 to-zinc-500 bg-clip-text text-transparent`).
  - `#foodie`: Displays `rare` rarity with an amber/rose gradient (`from-amber-400 via-rose-300 to-amber-600 bg-clip-text text-transparent`).
  - `#nomad`: Displays `epic` rarity with a fuchsia/violet gradient (`from-fuchsia-400 via-pink-200 to-violet-500 bg-clip-text text-transparent`).
  - `#wellness`: Displays `legendary` rarity with an emerald/amber gradient (`from-emerald-400 via-teal-100 to-amber-500 bg-clip-text text-transparent`).
- **Media Customization**: Allows swapping the card item's image via a file reader that preserves active state metrics.

---

## 3. High-Definition Snapshot Sharing System

The application features a gorgeous **Instagram Story Sticker** aspect ratio (`9/16` or `240px x 426px`) rendering viewport that outputs high-resolution snapshots.

### Layout Accuracy Requirements
- **No Icon Clutter**: The snapshot card title is beautifully pristine and must **not** render the custom droplet or icons present on the main interactive dashboard.
- **Fidelity Matching**: The canvas background, glass card container, borders, brightness adaptation overlay mode, active category highlights, and active/blurred grid elements present on the main screen must match the snapshot preview perfectly.
- **Crisp High-Res Saving**: Driven by `html-to-image` using a high pixel density (`pixelRatio: 3`) format to enable premium crisp PNG downloads for user print or social sharing.

---

## 4. HTML structure & CSS Guide

### Main Layout Hierarchy
```html
<div class="min-h-dvh w-full flex flex-col items-center justify-center p-3.5 bg-cover bg-center bg-no-repeat relative">
  <!-- Dynamic Readability Underlay -->
  <div class="absolute inset-0 bg-black/25 pointer-events-none" />

  <!-- Interactive Glass Card Container -->
  <main class="w-full max-w-sm sm:max-w-md my-auto relative">
    <div id="lina-tastecard-portal" class="w-full rounded-[40px] p-5 sm:p-6 backdrop-blur-3xl border shadow-xl flex flex-col space-y-5">
      <!-- Minimalist Header & Background Image Clickable Input -->
      <!-- Profile Header Grid -->
      <!-- Curated Category Tag Pills -->
      <!-- Photo Grid Dynamic Cards -->
    </div>
  </main>
</div>
```

### Essential Tailwind Classes Configuration
- **Translucent Glass Plates**: `backdrop-blur-3xl bg-white/10` or `bg-slate-950/45` combined with high-contrast thin borders `border-white/10`.
- **Soft Animation Transitions**: Implement standard `transition-all duration-300` and `spring` animations during slide-ins to keep the experience exceptionally tactile and polished.
