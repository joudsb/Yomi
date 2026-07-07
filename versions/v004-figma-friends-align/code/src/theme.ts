import { useColorScheme } from 'react-native';

/**
 * Yomi brand: yellow = the signature (capture, celebration, active states);
 * blue = interactive accents. Used sparingly — neutrals carry the UI so the
 * brand pops where it matters. White/black bases for light/dark modes.
 */
export const brand = {
  yellow: '#FFD500',
  blue: '#0A00FF',
};

export interface Theme {
  dark: boolean;
  bg: string;
  surface: string;
  surfaceBorder: string;
  text: string;
  textMuted: string;
  icon: string;
  iconMuted: string;
  glass: string;
  glassBorder: string;
  shutterRing: string;
  onYellow: string;
}

const light: Theme = {
  dark: false,
  bg: '#FFFFFF',
  surface: '#F4F4F5',
  surfaceBorder: '#E4E4E7',
  text: '#111113',
  textMuted: '#71717A',
  icon: '#2D2D30',
  iconMuted: '#9B9BA3',
  glass: 'rgba(255,255,255,0.72)',
  glassBorder: 'rgba(0,0,0,0.08)',
  shutterRing: '#1C1C1F',
  onYellow: '#111113',
};

const dark: Theme = {
  dark: true,
  bg: '#0B0B0C',
  surface: '#1A1A1D',
  surfaceBorder: '#2A2A2E',
  text: '#F4F4F5',
  textMuted: '#A1A1AA',
  icon: '#E4E4E7',
  iconMuted: '#6E6E76',
  glass: 'rgba(18,18,20,0.72)',
  glassBorder: 'rgba(255,255,255,0.10)',
  shutterRing: '#F4F4F5',
  onYellow: '#111113',
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}
