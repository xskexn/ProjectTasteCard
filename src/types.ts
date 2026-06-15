/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CreatorProfile {
  name: string;
  handle: string;
  bioQuote: string;
  bioAuthor: string;
  followers: number;
  following: number;
  commentsCount: number;
  tags: string[];
  backgroundImage: string;
}

export interface MediaItem {
  id: string;
  title: string;
  image: string;
  category: string;
  likes: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  comment: string;
  country: string;
  timestamp: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  bgType: 'dark' | 'light' | 'image' | 'gradient';
  primaryColor: string;
  accentColor: string;
  glassStyle: string;
  bgValue: string;
}
