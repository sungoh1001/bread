<template>
  <div id="app">
    <header-area
      title="개역 개정 성경"
      :page="page"
      :is-menu-open="isMenuOpen"
      @toggleMenu="toggleMenu"
      @togglePopup="togglePopup"
    />
    <menu-area
      :menus="bookMap"
      :is-menu-open="isMenuOpen"
    >
      <template #menu="{ menuId, category, items }">
        <drop-down
          :item-id="menuId"
          :category="category"
          :items="items"
          :is-open="category === categoryOpen"
          :current-category="currentBook"
          :current-item="currentChapter"
          @toggleCategory="toggleCategory"
          @goTo="goTo"
        />
      </template>
    </menu-area>
    <router-view
      :class="{'menu-open': isMenuOpen }"
    />
    <div
      v-show="isMenuOpen"
      class="menu-backdrop"
      @click="closeMenu"
    />
    <multi-tab-bar
      :tabs.sync="tabs"
      :active-tab-id.sync="activeTabId"
      @tab-change="onTabChange"
    />
    <abbrev-popup
      :visible="showPopup"
      :book-map="bookMap"
      @close="closePopupMenu"
      @go-to="onPopupGoTo"
    />
  </div>
</template>

<script>
import bible from 'src/assets/ko_rev.json'
import Header from 'src/components/Header'
import Menu from 'src/components/Menu'
import DropDown from 'src/components/DropDown'
import MultiTabBar from 'src/components/MultiTabBar'
import AbbrevPopup from 'src/components/AbbrevPopup'

import { ROUTE_NAMES } from 'src/constants'
import { BOOK_ABBREV } from 'src/bookAbbrev'
import { loadTabs, saveTabs } from 'src/cookie'

export default {
  name: 'Root',
  components: {
    'header-area': Header,
    'menu-area': Menu,
    'drop-down': DropDown,
    'multi-tab-bar': MultiTabBar,
    'abbrev-popup': AbbrevPopup
  },
  data () {
    const saved = loadTabs()
    return {
      categoryOpen: null,
      currentBook: null,
      currentChapter: null,
      isMenuOpen: false,
      showPopup: false,
      bookMap: {},
      tabs: saved
        ? saved.tabs
        : [{ id: 1, ref: '빈탭', version: '개역개정', abbrev: null, chapter: null }],
      activeTabId: saved ? saved.activeTabId : 1
    }
  },
  computed: {
    page () {
      return (
        this.currentBook && this.currentChapter
          ? `${this.currentBook} ${this.currentChapter}장`
          : null
      )   
    }
  },
  watch: {
    tabs: {
      handler () {
        saveTabs(this.tabs, this.activeTabId)
      },
      deep: true
    },
    activeTabId () {
      saveTabs(this.tabs, this.activeTabId)
    }
  },
  created () {
    bible.forEach((book) => {
      this.bookMap[book.abbrev] = {
        category: book.name,
        chpaters: book.chapters,
        items: book.chapters.length
      }
    })
  },
  methods: {
    closeMenu () {
      this.isMenuOpen = false
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    togglePopup () {
      this.showPopup = !this.showPopup
    },
    closePopupMenu () {
      this.showPopup = false
    },
    onPopupGoTo ({ book, chapter }) {
      this.showPopup = false
      this.goTo(book, chapter)
    },
    toggleCategory (category) {
      this.categoryOpen = (this.categoryOpen === category) ? null : category
      console.log('toggleCategory( open: ', this.categoryOpen, ' )')
    },
    setCurrent (book, chapter) {
      this.currentBook = book
      this.currentChapter = chapter
      this.isMenuOpen = false
    },
    goTo (book, chapter) {
      let bible = this.bookMap[book].chpaters[chapter - 1]
      this.setCurrent(this.bookMap[book].category, chapter)
      this.$router.replace({
        name: ROUTE_NAMES.PAGE,
        params: { bible },
        query: { book, chapter }
      })
      // Update active tab with the newly navigated reference (약자 형식: 창 1, 고전 1)
      const activeTab = this.tabs.find(t => t.id === this.activeTabId)
      if (activeTab && book && chapter) {
        const abbr = BOOK_ABBREV[book] || book
        activeTab.ref = `${abbr}${chapter}`
        activeTab.abbrev = book
        activeTab.chapter = chapter
      }
      console.log('goTo( book: ', book, ', chapter: ', chapter, ' )')
    },
    onTabChange (tab) {
      if (tab.abbrev && tab.chapter) {
        this.goTo(tab.abbrev, tab.chapter)
      }
      console.log('onTabChange( tab: ', tab, ' )')
    }
  }

}
</script>

<style lang="scss">
@import "./styles/main";
</style>