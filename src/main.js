import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

router.push('/')

// Service Worker 등록 (PWA 오프라인 지원)
if ('serviceWorker' in navigator) {
  let refreshing = false
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // 새 버전 감지 → 자동 새로고침
      reg.onupdatefound = () => {
        const newWorker = reg.installing
        if (!newWorker) return
        newWorker.onstatechange = () => {
          if (newWorker.state === 'activated' && navigator.serviceWorker.controller && !refreshing) {
            refreshing = true
            window.location.reload()
          }
        }
      }
    }).catch(() => {
      // SW 등록 실패는 무시 (개발 환경 등)
    })
  })
}