import { extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50:  '#e3f9f9',
    100: '#c0edef',
    200: '#97e1e5',
    300: '#6ed5db',
    400: '#4ac9d2',
    500: '#30b0b8', // main color
    600: '#238a90',
    700: '#18646a',
    800: '#0c3f44',
    900: '#011b1f',
  },
  accent: {
    100: '#ffe3ec',
    500: '#ff3d6d',
    700: '#cc2e57',
  },
  muted: {
    100: '#f0f4f8',
    200: '#d9e2ec',
    700: '#102a43',
  },
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
