/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreatorProfile, MediaItem, Testimonial, ThemePreset } from './types';

export const INITIAL_PROFILE: CreatorProfile = {
  name: "Lina's Tastecard",
  handle: '@linas_tastecard',
  bioQuote: 'Rarity: rare',
  bioAuthor: '',
  followers: 2300,
  following: 345,
  commentsCount: 566,
  tags: ['#bookworm', '#foodie', '#nomad', '#wellness', '#80\'smusic'],
  backgroundImage: '/src/assets/images/bg_face_portrait_1781548017737.jpg'
};

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media_plant',
    title: 'One More Chapter',
    image: '/src/assets/images/media_plant_1781548031238.jpg',
    category: '#bookworm',
    likes: 789,
    description: "There's always a current read in the camera roll."
  },
  {
    id: 'media_salad',
    title: 'Citrus Keto Bowl',
    image: '/src/assets/images/media_salad_1781548043109.jpg',
    category: '#foodie',
    likes: 256,
    description: 'Fresh raw avocado, colorful purple heirloom cabbage, diced garden cucumbers, and toasted sesame, lightly tossed with dynamic lemon thyme dressing.'
  },
  {
    id: 'media_butterfly',
    title: 'Monarch Encounter',
    image: '/src/assets/images/media_butterfly_1781548057361.jpg',
    category: '#nomad',
    likes: 412,
    description: 'Caught this magnificent monarch sunbathing during my mountain trail hike. Witnessing quiet metamorphoses reminds us to trust the timing of life.'
  },
  {
    id: 'media_cocktail',
    title: 'Herbal Sage Rosemary',
    image: '/src/assets/images/media_cocktail_1781548071603.jpg',
    category: '#wellness',
    likes: 189,
    description: 'A crafted double-poured tonic with wild rosemary sprigs, organic orange infusions, slow-melt artisanal ice, and high-altitude wildflower honey.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial_1',
    name: 'Elena Juni',
    handle: '@elena.juni',
    avatar: '/src/assets/images/avatar_elena_1781548085976.jpg',
    comment: 'Thanks for the great recipe recommendation for this greek salad. Had so much fun making it with my family. Greetings from USA!',
    country: 'USA',
    timestamp: '2 hours ago'
  },
  {
    id: 'testimonial_2',
    name: 'Lucas Dupont',
    handle: '@lucas.travels',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Your backpacking list saved my trail run in Chamonix! Truly essential pointers on minimalist travel gear. Keep wandering!',
    country: 'France',
    timestamp: '1 day ago'
  },
  {
    id: 'testimonial_3',
    name: 'Mio Tanaka',
    handle: '@mio.notes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    comment: 'The book recommendation (The Book of Tea) redefined my morning stillness. Highly suggest it to everyone in the audience.',
    country: 'Japan',
    timestamp: '3 days ago'
  }
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'classic_bw',
    name: 'Tastecard Cream',
    bgType: 'gradient',
    primaryColor: '#F3E5C3',
    accentColor: '#E6D7B3',
    glassStyle: 'glassmorphic-card',
    bgValue: '#F3E5C3'
  },
  {
    id: 'cyber_neon',
    name: 'Neon Horizon',
    bgType: 'gradient',
    primaryColor: '#ff007f',
    accentColor: '#39ff14',
    glassStyle: 'bg-black/60 border border-fuchsia-500/20 backdrop-blur-xl',
    bgValue: 'linear-gradient(135deg, #0d0c1d 0%, #1a0b2e 50%, #03001e 100%)'
  },
  {
    id: 'sage_oasis',
    name: 'Sage Oasis',
    bgType: 'gradient',
    primaryColor: '#e0f2fe',
    accentColor: '#84cc16',
    glassStyle: 'bg-emerald-950/40 border border-emerald-500/10 backdrop-blur-xl',
    bgValue: 'linear-gradient(135deg, #0b1a13 0%, #152d21 60%, #0c1d19 100%)'
  },
  {
    id: 'sunset_dunes',
    name: 'Sunset Dunes',
    bgType: 'gradient',
    primaryColor: '#fef3c7',
    accentColor: '#f97316',
    glassStyle: 'bg-stone-900/50 border border-amber-500/10 backdrop-blur-xl',
    bgValue: 'linear-gradient(135deg, #1c0f0d 0%, #2f1712 50%, #140b10 100%)'
  },
  {
    id: 'milky_way',
    name: 'Milky Way',
    bgType: 'gradient',
    primaryColor: '#e0e7ff',
    accentColor: '#818cf8',
    glassStyle: 'bg-indigo-950/30 border border-indigo-200/5 backdrop-blur-xl',
    bgValue: 'linear-gradient(135deg, #03001e 0%, #7303c0 33%, #ec38bc 66%, #fdeff9 100%)'
  }
];
