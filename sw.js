// Service Worker ─ SVV テスト（SVV・SVH / Functional Neuro Training）
// 戦略：Network First（新しいコードを最優先で拾う）。オフライン時のみキャッシュへ。
// index.html 側で controllerchange を検知して読み込み直す（測っている最中は待つ）。
const CACHE_NAME = 'svv-check-v1.1.0';
const ASSETS_TO_CACHE = ['./', './index.html', './about.html', './manifest.json', './FNT512.png', './FNT512-transparent.png', './voice/index.json', './voice/unlock.mp3',
  'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&display=swap'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS_TO_CACHE)).then(() => self.skipWaiting()).catch((err) => console.error('[SW] precache failed', err)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.map((n) => n !== CACHE_NAME ? caches.delete(n) : null))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = req.url, sameOrigin = url.startsWith(self.location.origin), isFont = url.startsWith('https://fonts.');
  if (!sameOrigin && !isFont) return;
  event.respondWith(
    fetch(req).then((res) => {
      if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) { const clone = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, clone)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then((hit) => hit || (req.mode === 'navigate' ? caches.match('./index.html') : new Response('Offline', { status: 503 }))))
  );
});
self.addEventListener('message', (event) => { if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting(); });
