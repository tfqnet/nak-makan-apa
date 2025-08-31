import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for PWA
// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
    navigator.serviceWorker.register(swUrl).then(reg => {
      if (reg.waiting) {
        alert('Versi baru tersedia! App akan di-refresh.');
        reg.waiting.postMessage('SKIP_WAITING');
        window.location.reload();
      }
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            alert('Versi baru tersedia! App akan di-refresh.');
            window.location.reload();
          }
        });
      });
    });
  });
}
