import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ConfiguratorApp from './features/campaign-configurator/ConfiguratorApp';
import './features/campaign-configurator/configurator.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ConfiguratorApp />
  </StrictMode>
);
