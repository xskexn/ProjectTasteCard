/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, Share2, Twitter, MessageSquare, Send, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface ShareModalProps {
  handle: string;
  name: string;
  onClose: () => void;
  onPostToast: (msg: string) => void;
}

export function ShareModal({ handle, name, onClose, onPostToast }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://ais.studio/build/creator/${handle.slice(1)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    onPostToast('Profile Link Copied! 🔗');
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-Up Sheeting */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        className="relative z-10 w-full bg-zinc-900 border border-white/10 rounded-3xl p-5 shadow-2xl space-y-5"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider font-mono">
              Share Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mock QR Code Section */}
        <div className="flex flex-col items-center justify-center py-4 bg-zinc-950/60 rounded-2xl border border-white/5 space-y-3">
          <div className="relative p-3 bg-white rounded-xl shadow-lg">
            {/* Elegant SVG Vector QR replica */}
            <svg className="w-32 h-32 text-zinc-900" viewBox="0 0 100 100" fill="currentColor">
              {/* Outer borders */}
              <path d="M0 0h30v10H10v20H0V0zm70 0h30v30h-10V10H70V0zM0 70h10v20h20v10H0V70zm100 0v30H70v-10h20V70h10z" />
              {/* QR Code Blocks */}
              <rect x="15" y="15" width="15" height="15" />
              <rect x="70" y="15" width="15" height="15" />
              <rect x="15" y="70" width="15" height="15" />
              <rect x="40" y="40" width="20" height="20" />
              <path d="M35 15h5v5h-5zm0 10h5v5h-5zm10-10h5v10h-5zm5 0h5v5h-5zm10 5h5v5h-5zm-5 10h10v5H56zm-16 15h5v5h-5zM15 35h10v5H15zm20 35h5v5h-5zm5 10h5v5h-5zm10-5h5v5h-5zm10-5h5v15h-5zm-5 10h5v5h-5zm10-25h5v5h-5zm5-10h5v5h-5zm-15-5h10v5H66v-5zM15 50h5v10h-5zm15-5h5v5h-5zm10 0h15v5H40z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-zinc-900 text-white font-display text-[9px] font-bold flex items-center justify-center tracking-tight border-2 border-white shadow-md">
                JM
              </div>
            </div>
          </div>
          <div className="text-center">
            <span className="block text-[11px] font-mono font-bold text-zinc-200">
              {name}'s Digital Card
            </span>
            <span className="block text-[9px] text-zinc-500 tracking-wider">
              Scan with camera to preview
            </span>
          </div>
        </div>

        {/* Copy Link Interface */}
        <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent px-3 text-xs text-zinc-300 font-mono outline-none border-none pointer-events-none"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-zinc-950 hover:bg-zinc-100 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Link
              </>
            )}
          </button>
        </div>

        {/* Social Buttons Carousel */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <button
            onClick={() => onPostToast('Shared to Twitter/X! 🐦')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all group"
          >
            <Twitter className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-zinc-400 mt-1.5">X / Twitter</span>
          </button>
          
          <button
            onClick={() => onPostToast('Opened Messages! 💬')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all group"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-zinc-400 mt-1.5">Chat</span>
          </button>

          <button
            onClick={() => onPostToast('Shared to Telegram! ✈️')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all group"
          >
            <Send className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-zinc-400 mt-1.5">Telegram</span>
          </button>

          <button
            onClick={() => onPostToast('Opened Email draft! ✉️')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all group"
          >
            <Mail className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-zinc-400 mt-1.5">Mail</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
