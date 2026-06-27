<template>
  <div class="multi-tab-bar">
    <div class="tab-scroll">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: tab.id === activeTabId }"
        @click="activateTab(tab.id)"
      >
        <span class="tab-ref">{{ tab.ref }}</span>
        <span class="tab-version">{{ tab.version }}</span>
        <i
          v-if="tab.id === activeTabId"
          class="tab-close im im-x-mark"
          @click.stop="removeTab(tab.id)"
        />
      </button>
      <button
        class="tab-add-btn"
        @click="addNewTab"
      >
        <i class="im im-plus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiTabBar',
  props: {
    tabs: {
      type: Array,
      default: () => [
        { id: 1, ref: '?책 ?장', version: '개역개정' }
      ]
    },
    activeTabId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    const tabs = this.tabs
    const maxId = tabs.length > 0
      ? Math.max(...tabs.map(t => t.id))
      : 0
    return {
      nextId: maxId + 1
    }
  },
  methods: {
    activateTab (id) {
      this.$emit('update:activeTabId', id)
      const tab = this.tabs.find(t => t.id === id)
      if (tab) {
        this.$emit('tab-change', { ...tab })
      }
    },
    removeTab (id) {
      if (this.tabs.length <= 1) return
      const index = this.tabs.findIndex(t => t.id === id)
      const newTabs = this.tabs.filter(t => t.id !== id)
      this.$emit('update:tabs', newTabs)
      if (id === this.activeTabId) {
        const nextIndex = index >= newTabs.length ? index - 1 : index
        const nextId = newTabs[nextIndex].id
        this.$emit('update:activeTabId', nextId)
        const nextTab = newTabs[nextIndex]
        this.$emit('tab-change', { ...nextTab })
      }
    },
    addNewTab () {
      const newTab = {
        id: this.nextId,
        ref: '?책 ?장',
        version: '개역개정'
      }
      const newTabs = [...this.tabs, newTab]
      this.nextId += 1
      this.$emit('update:tabs', newTabs)
      this.$emit('update:activeTabId', newTab.id)
      this.$emit('tab-add', { ...newTab })
    }
  }
}
</script>

<style lang="scss" scoped>
$bar-bg: #3B2F2F;
$tab-active-bg: #C8A882;
$tab-active-text: #2C1810;
$tab-inactive-bg: #5C4A3A;
$tab-inactive-text: #D4C5B9;
$bar-height: 64px;

.multi-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: $bar-height;
  background: $bar-bg;
  box-sizing: border-box;
}

.tab-scroll {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 4px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.tab-item {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  height: 44px;
  padding: 6px 2px;
  margin-right: 4px;
  border: none;
  border-radius: 12px;
  background: $tab-inactive-bg;
  color: $tab-inactive-text;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &.active {
    background: $tab-active-bg;
    color: $tab-active-text;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.96);
  }
}

.tab-ref {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
}

.tab-version {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.7;
  line-height: 1.3;
}

.tab-close {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 10px;
  line-height: 1;
  opacity: 0.6;
  padding: 2px;

  &:hover {
    opacity: 1;
    color: #2C1810;
  }
}

.tab-add-btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-left: 2px;
  border: none;
  border-radius: 8px;
  background: $tab-inactive-bg;
  color: $tab-inactive-text;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  outline: none;

  .im {
    font-size: 18px;
    line-height: 1;
  }

  &:hover {
    background: lighten($tab-inactive-bg, 5%);
  }

  &:active {
    transform: scale(0.92);
  }
}
</style>
