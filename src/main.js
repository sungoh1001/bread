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
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('SW registered')
    }).catch(() => {
      // SW 등록 실패는 무시 (개발 환경 등)
    })
  })
}