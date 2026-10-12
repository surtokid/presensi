// Import OneSignal Service Worker SDK (Wajib di baris paling pertama)
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

// Versi cache dinaikkan ke v2 agar browser mendeteksi adanya pembaruan Service Worker
const CACHE_NAME = 'suryatokoku-pwa-v2';

// 1. Proses Install Service Worker
self.addEventListener('install', (event) => {
  // Memaksa Service Worker baru untuk langsung aktif tanpa menunggu browser ditutup
  self.skipWaiting();
});

// 2. Proses Aktivasi
self.addEventListener('activate', (event) => {
  // Mengambil alih kontrol halaman klien secepatnya
  event.waitUntil(self.clients.claim());
});

// 3. Intercept Fetch Request (Syarat wajib Chrome/PWA agar bisa diinstall)
self.addEventListener('fetch', (event) => {
  // Mode sederhana: Selalu berusaha mengambil data dari jaringan/internet.
  // Jika internet mati sama sekali, SW akan mencegah error halaman blank/dinosaurus.
  event.respondWith(
    fetch(event.request).catch(() => {
      // Mengembalikan respons cadangan saat perangkat offline
      return new Response("Suryatokoku sedang offline. Silakan periksa koneksi internet Anda.");
    })
  );
});
