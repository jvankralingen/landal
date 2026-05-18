import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TakeoverApp from './features/evp-takeover/TakeoverApp';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <TakeoverApp />
  </StrictMode>
);
