/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings, 
  Palette, 
  MessageSquare, 
  Image, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  Heart,
  User,
  Quote
} from 'lucide-react';
import { CreatorProfile, MediaItem, Testimonial, ThemePreset } from '../types';
import { THEME_PRESETS } from '../initialData';

interface CreatorStudioProps {
  profile: CreatorProfile;
  onChangeProfile: (p: CreatorProfile) => void;
  mediaItems: MediaItem[];
  onChangeMediaItems: (m: MediaItem[]) => void;
  testimonials: Testimonial[];
  onChangeTestimonials: (t: Testimonial[]) => void;
  selectedTheme: ThemePreset;
  onSelectTheme: (theme: ThemePreset) => void;
  onPostToast: (msg: string) => void;
  onResetToDefaults: () => void;
}

export function CreatorStudio({
  profile,
  onChangeProfile,
  mediaItems,
  onChangeMediaItems,
  testimonials,
  onChangeTestimonials,
  selectedTheme,
  onSelectTheme,
  onPostToast,
  onResetToDefaults,
}: CreatorStudioProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'media' | 'testimonials'>('profile');

  // Local form states for adding a new feedback item
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentHandle, setNewCommentHandle] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCountry, setNewCommentCountry] = useState('USA');
  const [newCommentAvatar, setNewCommentAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');

  // Local form states for creating a new media item
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState('#nomad');
  const [newMediaDesc, setNewMediaDesc] = useState('');
  const [newMediaImage, setNewMediaImage] = useState('/src/assets/images/media_plant_1781548031238.jpg');

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    '/src/assets/images/avatar_elena_1781548085976.jpg'
  ];

  const presetImages = [
    { name: 'Houseplant', url: '/src/assets/images/media_plant_1781548031238.jpg' },
    { name: 'Keto Salad', url: '/src/assets/images/media_salad_1781548043109.jpg' },
    { name: 'Sunlit Butterfly', url: '/src/assets/images/media_butterfly_1781548057361.jpg' },
    { name: 'Summer Cocktail', url: '/src/assets/images/media_cocktail_1781548071603.jpg' }
  ];

  const handleProfileFieldChange = (key: keyof CreatorProfile, value: any) => {
    onChangeProfile({
      ...profile,
      [key]: value
    });
  };

  const handleStatChange = (key: 'followers' | 'following' | 'commentsCount', value: number) => {
    // Prevent negative numbers
    const cleanVal = Math.max(0, value);
    onChangeProfile({
      ...profile,
      [key]: cleanVal
    });
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) {
      onPostToast('Please pack comments and names correctly! ⚠️');
      return;
    }

    const created: Testimonial = {
      id: `comment_${Date.now()}`,
      name: newCommentAuthor.trim(),
      handle: newCommentHandle.trim().startsWith('@') ? newCommentHandle.trim() : `@${newCommentHandle.trim() || 'anonymous'}`,
      avatar: newCommentAvatar,
      comment: newCommentText.trim(),
      country: newCommentCountry,
      timestamp: 'Just now'
    };

    const nextComments = [created, ...testimonials];
    onChangeTestimonials(nextComments);
    
    // Auto increment comments metrics count safely
    onChangeProfile({
      ...profile,
      commentsCount: profile.commentsCount + 1
    });

    onPostToast('Comment Shared Successfully! ✨');

    // Clean up
    setNewCommentAuthor('');
    setNewCommentHandle('');
    setNewCommentText('');
  };

  const deleteComment = (id: string) => {
    const list = testimonials.filter(t => t.id !== id);
    onChangeTestimonials(list);
    onChangeProfile({
      ...profile,
      commentsCount: Math.max(0, profile.commentsCount - 1)
    });
    onPostToast('Comment Deleted 🗑️');
  };

  const addMediaCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaTitle.trim() || !newMediaDesc.trim()) {
      onPostToast('Please fill in high-fidelity Title and Insights! ⚠️');
      return;
    }

    const created: MediaItem = {
      id: `media_${Date.now()}`,
      title: newMediaTitle.trim(),
      image: newMediaImage,
      category: newMediaCategory,
      likes: Math.floor(Math.random() * 80) + 12,
      description: newMediaDesc.trim()
    };

    onChangeMediaItems([...mediaItems, created]);
    
    // Add tag to list if not already there
    if (!profile.tags.includes(newMediaCategory)) {
      onChangeProfile({
        ...profile,
        tags: [...profile.tags, newMediaCategory]
      });
    }

    onPostToast('Portfolio Card Added! 🎨');
    setNewMediaTitle('');
    setNewMediaDesc('');
  };

  const deleteMedia = (id: string) => {
    if (mediaItems.length <= 1) {
      onPostToast('Keep at least one media card to preview design! ⚠️');
      return;
    }
    const list = mediaItems.filter(m => m.id !== id);
    onChangeMediaItems(list);
    onPostToast('Portfolio Card Removed 🗑️');
  };

  return (
    <div id="creator-studio-panel" className="w-full lg:max-w-[480px] bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col shadow-2xl">
      {/* Header Toolbar */}
      <div className="p-6 border-b border-zinc-800 bg-zinc-950/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-lg font-display font-medium text-white tracking-tight">
              Creator Studio
            </h2>
            <p className="text-xs text-zinc-400">Customizer & Interactive Engine</p>
          </div>
        </div>

        {/* Global Reset System defaults */}
        <button
          onClick={onResetToDefaults}
          title="Reset back to standard Mockup values"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800/50 border border-zinc-700/50 rounded-lg active:scale-95 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Tabs list Bar */}
      <div className="flex border-b border-zinc-800 bg-zinc-950/10 p-2 gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'profile'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
          }`}
        >
          <User className="w-3.5 h-3.5 text-orange-400" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'theme'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-sky-400" />
          Themes
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'media'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
          }`}
        >
          <Image className="w-3.5 h-3.5 text-pink-400" />
          Cards
        </button>
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'testimonials'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          Guestbook
        </button>
      </div>

      {/* Primary Scrollable Workspace panels */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[580px] no-scrollbar">
        
        {/* TAB 1: Profile Properties content */}
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-orange-400" />
                Identity Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1.5">
                    Profile Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                    className="w-full font-sans text-sm bg-zinc-950 border border-zinc-800 focus:border-orange-500 px-3 py-2 rounded-xl text-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1.5">
                    User Handle
                  </label>
                  <input
                    type="text"
                    value={profile.handle}
                    onChange={(e) => handleProfileFieldChange('handle', e.target.value)}
                    className="w-full font-mono text-sm bg-zinc-950 border border-zinc-800 focus:border-orange-500 px-3 py-2 rounded-xl text-amber-100 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800/60 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <Quote className="w-3.5 h-3.5 text-rose-400" />
                Bio Quote Text
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1.5">
                    Inspiration Quote
                  </label>
                  <textarea
                    rows={2}
                    value={profile.bioQuote}
                    onChange={(e) => handleProfileFieldChange('bioQuote', e.target.value)}
                    className="w-full font-sans text-xs bg-zinc-950 border border-zinc-800 focus:border-rose-500 px-3 py-2 rounded-xl text-white outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1.5">
                    Quote Author
                  </label>
                  <input
                    type="text"
                    value={profile.bioAuthor}
                    onChange={(e) => handleProfileFieldChange('bioAuthor', e.target.value)}
                    className="w-full font-sans text-xs bg-zinc-950 border border-zinc-800 focus:border-rose-500 px-3 py-2 rounded-xl text-white outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800/60 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Social Metrics Counts
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950/40 border border-zinc-800/50 p-2.5 rounded-xl space-y-1">
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                    Followers
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={profile.followers}
                      onChange={(e) => handleStatChange('followers', parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent outline-none text-sm font-semibold text-white font-mono"
                    />
                  </div>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-800/50 p-2.5 rounded-xl space-y-1">
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                    Following
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={profile.following}
                      onChange={(e) => handleStatChange('following', parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent outline-none text-sm font-semibold text-white font-mono"
                    />
                  </div>
                </div>

                <div className="bg-zinc-950/40 border border-zinc-800/50 p-2.5 rounded-xl space-y-1">
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                    Comments
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={profile.commentsCount}
                      onChange={(e) => handleStatChange('commentsCount', parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent outline-none text-sm font-semibold text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Custom Theme Selection */}
        {activeTab === 'theme' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              Theme Engine Presets
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {THEME_PRESETS.map((t) => {
                const isActive = t.id === selectedTheme.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t);
                      onPostToast(`Style shifted: ${t.name}! 🎨`);
                    }}
                    className={`p-4 rounded-2xl flex items-center justify-between text-left transition-all border ${
                      isActive
                        ? 'bg-zinc-800 border-sky-500 shadow-md scale-[1.01]'
                        : 'bg-zinc-950/40 border-zinc-800/80 hover:bg-zinc-800/20 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Theme Preview Dot */}
                      <span className="relative flex h-5 w-5">
                        <span 
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-35"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <span 
                          className="relative inline-flex rounded-full h-5 w-5 border border-white/20"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                      </span>

                      <div>
                        <span className="block text-sm font-semibold text-white">
                          {t.name}
                        </span>
                        <span className="block text-[10px] text-zinc-500 font-mono">
                          {t.bgType === 'image' ? 'Dynamic Backdrop Asset' : 'Rich CSS3 Gradient'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: t.primaryColor }} 
                        title="Primary Theme Color"
                      />
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: t.accentColor }} 
                        title="Accent/Secondary Color"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom decorative banner */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <span className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                Glassmorphism Blur Strategy
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Each preset modulates the underlying background portrait and computes specific color pairings with strict contrast compliance.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Media Cards Manager */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Form to inject a new Media Slide Card */}
            <form onSubmit={addMediaCard} className="bg-zinc-950/65 border border-zinc-800/80 rounded-2xl p-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Custom Media Card
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dreamy Dunes"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    className="w-full text-xs font-sans bg-zinc-900 border border-zinc-800 focus:border-pink-500 px-3 py-2 rounded-xl text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                    Hashtag/Category
                  </label>
                  <select
                    value={newMediaCategory}
                    onChange={(e) => setNewMediaCategory(e.target.value)}
                    className="w-full text-xs font-sans bg-zinc-900 border border-zinc-800 focus:border-pink-500 px-3 py-2 rounded-xl text-white outline-none"
                  >
                    <option value="#bookworm">#bookworm</option>
                    <option value="#foodie">#foodie</option>
                    <option value="#nomad">#nomad</option>
                    <option value="#wellness">#wellness</option>
                    <option value="#80'smusic">#80'smusic</option>
                  </select>
                </div>
              </div>

              {/* Preset Image Thumbnail Select */}
              <div>
                <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1.5">
                  Select Design Illustration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {presetImages.map((img) => {
                    const isSel = newMediaImage === img.url;
                    return (
                      <button
                        type="button"
                        key={img.name}
                        onClick={() => setNewMediaImage(img.url)}
                        className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                          isSel ? 'border-pink-500 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img.url} 
                          alt={img.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                  Insights / Description
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Share details or stories behind this card..."
                  value={newMediaDesc}
                  onChange={(e) => setNewMediaDesc(e.target.value)}
                  className="w-full text-xs font-sans bg-zinc-900 border border-zinc-800 focus:border-pink-500 px-3 py-2 rounded-xl text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-500 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Card to Carousel
              </button>
            </form>

            {/* List Existing Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Active Cards ({mediaItems.length})
              </h3>
              <div className="space-y-2">
                {mediaItems.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 shrink-0 max-w-[80%]">
                      <img
                        src={m.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover bg-zinc-800 border border-white/5"
                      />
                      <div className="truncate">
                        <span className="block text-xs font-semibold text-white truncate">
                          {m.title}
                        </span>
                        <span className="block text-[9px] text-zinc-400 font-mono">
                          {m.category} • <Heart className="w-2.5 h-2.5 inline align-middle text-rose-500" /> {m.likes}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteMedia(m.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Guestbook Comments Manager */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Form to inject new feedback */}
            <form onSubmit={addComment} className="bg-zinc-950/65 border border-zinc-800/80 rounded-2xl p-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Draft Guestbook Entry
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sophie V."
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    className="w-full text-xs font-sans bg-zinc-900 border border-zinc-800 focus:border-emerald-500 px-3 py-2 rounded-xl text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                    User Handle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. sophie.wander"
                    value={newCommentHandle}
                    onChange={(e) => setNewCommentHandle(e.target.value)}
                    className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 focus:border-emerald-500 px-3 py-2 rounded-xl text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                    Country Flag / Origin
                  </label>
                  <select
                    value={newCommentCountry}
                    onChange={(e) => setNewCommentCountry(e.target.value)}
                    className="w-full text-xs font-sans bg-zinc-900 border border-zinc-800 focus:border-emerald-500 px-3 py-2 rounded-xl text-white outline-none"
                  >
                    <option value="USA">USA 🇺🇸</option>
                    <option value="Japan">Japan 🇯🇵</option>
                    <option value="France">France 🇫🇷</option>
                    <option value="Germany">Germany 🇩🇪</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Canada">Canada 🇨🇦</option>
                  </select>
                </div>

                {/* Avatar select button */}
                <div>
                  <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                    Select Avatar Face
                  </label>
                  <div className="flex gap-1.5 pt-0.5">
                    {presetAvatars.map((avUrl) => {
                      const isSel = newCommentAvatar === avUrl;
                      return (
                        <button
                          type="button"
                          key={avUrl}
                          onClick={() => setNewCommentAvatar(avUrl)}
                          className={`relative w-7 h-7 rounded-full overflow-hidden border transition-all ${
                            isSel ? 'ring-2 ring-emerald-400 border-white scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={avUrl} 
                            alt="" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono uppercase text-zinc-400 mb-1">
                  Feedback Remark
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Draft your response comment detail here..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full text-xs font-sans bg-zinc-900 border border-zinc-800 focus:border-emerald-500 px-3 py-2 rounded-xl text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                Drape Feedback Item
              </button>
            </form>

            {/* List Existing Feedback items with quick actions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Comments List ({testimonials.length})
              </h3>
              <div className="space-y-2.5">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-start justify-between gap-3"
                  >
                    <div className="flex gap-2.5 shrink-0 max-w-[85%]">
                      <img
                        src={t.avatar}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-white/5 bg-zinc-800"
                      />
                      <div>
                        <span className="block text-xs font-semibold text-white">
                          {t.name} <span className="text-[10px] text-zinc-500 font-mono">{t.handle}</span>
                        </span>
                        <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mt-0.5">
                          {t.comment}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteComment(t.id)}
                      className="p-1 px-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/15 rounded-lg transition-all self-center"
                      title="Remove feedback item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
