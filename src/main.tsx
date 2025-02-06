import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import { ColorSchemeScript, MantineProvider as Provider } from '@mantine/core';

import App from './App.tsx';
import { mantineTheme } from './mantineTheme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript />
    <Provider theme={mantineTheme} defaultColorScheme="auto">
      <App />
    </Provider>
  </StrictMode>
);
