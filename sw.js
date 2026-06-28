// Service Worker — 오프라인 캐싱
const CACHE_NAME = 'bible-cache-v3'

// 설치 즉시 활성화 (대기 건너뛰기)
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

// 활성화 시 이전 캐시 삭제 + 클라이언트 제어
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    }).then(() => self.clients.claim())
  )
})

// Cache-first 전략: 캐시 먼저, 없으면 네트워크 + 캐시 저장
self.addEventListener('fetch', (event) => {
  // chrome-extension 등 지원하지 않는 스킴은 통과
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached
      }
      return fetch(event.request).then((response) => {
        // 유효한 응답만 캐시
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone)
        })
        return response
      }).catch(() => {
        // 네트워크 실패 시 오프라인 페이지 (SPA는 index.html로)
        if (event.request.mode === 'navigate') {
          return caches.match('/')
        }
      })
    })
  )
})
