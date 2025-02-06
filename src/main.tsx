import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import {
  ColorSchemeScript,
  createTheme,
  MantineProvider as Provider,
} from '@mantine/core';

import App from './App.tsx';

const mantineTheme = createTheme({
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  primaryColor: 'gray',
  primaryShade: 7,
  defaultRadius: 'lg',
  cursorType: 'pointer',
  headings: {
    fontWeight: '500',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript />
    <Provider theme={mantineTheme} defaultColorScheme="auto">
      <App />
    </Provider>
  </StrictMode>
);
