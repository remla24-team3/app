import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import DashBoard from './components/DashBoard';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <DashBoard />
  </StrictMode>
);