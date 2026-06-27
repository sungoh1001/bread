// 쿠키 유틸리티 (외부 라이브러리 없이 사용)
const COOKIE_NAME = 'bible_tabs'

export function getCookie (name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export function setCookie (name, value, days = 30) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`
}

export function loadTabs () {
  try {
    const raw = getCookie(COOKIE_NAME)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.tabs && Array.isArray(data.tabs) && data.tabs.length > 0) {
      return {
        tabs: data.tabs,
        activeTabId: data.activeTabId || data.tabs[0].id
      }
    }
    return null
  } catch (e) {
    return null
  }
}

export function saveTabs (tabs, activeTabId) {
  try {
    const data = JSON.stringify({ tabs: tabs, activeTabId: activeTabId })
    setCookie(COOKIE_NAME, data)
  } catch (e) {
    // 쿠키 저장 실패 시 무시
  }
}
