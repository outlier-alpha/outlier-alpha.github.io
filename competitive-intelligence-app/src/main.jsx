import React from 'react';
import { createRoot } from 'react-dom/client';
import CompetitiveIntelligenceApp from './components/CompetitiveIntelligenceApp.jsx';

function mount() {
  const rootEl = document.getElementById('competitive-intelligence-app');
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(React.createElement(CompetitiveIntelligenceApp));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}


