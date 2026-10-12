const CACHE_NAME = 'suryatokoku-pwa-v1';

// 1. Proses Install Service Worker
self.addEventListener('install', (event) => {
  // Memaksa Service Worker baru untuk langsung aktif
  self.skipWaiting();
});

// 2. Proses Aktivasi
self.addEventListener('activate', (event) => {
  // Mengambil alih kontrol halaman klien secepatnya
  event.waitUntil(self.clients.claim());
});

// 3. Intercept Fetch Request (Syarat wajib Chrome agar bisa diinstall)
self.addEventListener('fetch', (event) => {
  // Mode sederhana: Selalu berusaha mengambil data dari jaringan/internet.
  // Jika internet mati sama sekali, SW akan mencegah error halaman blank/dinosaurus.
  event.respondWith(
    fetch(event.request).catch(() => {
      // Tidak melakukan apa-apa atau mengembalikan respons kosong jika offline
      // agar tidak merusak script eksternal
      return new Response("Suryatokoku sedang offline. Silakan periksa koneksi Anda.");
    })
  );
});
