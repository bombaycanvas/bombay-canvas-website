import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent browser from restoring mid-page scroll position on refresh.
// Without this, the browser repositions the page AFTER GSAP initializes,
// causing ScrollTrigger to calculate all trigger points from wrong scroll offsets.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
