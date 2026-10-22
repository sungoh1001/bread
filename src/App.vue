<template>
  <div
    id="app"
    :class="{ dark: darkMode }"
  >
    <header-area
      title="개역 개정 성경"
      :page="page"
      :is-menu-open="isMenuOpen"
      :dark-mode="darkMode"
      :visible="isBarsVisible"
      @toggleMenu="toggleMenu"
      @togglePopup="togglePopup"
      @toggleDarkMode="toggleDarkMode"
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
      :class="{ 'menu-open': isMenuOpen, 'bars-hidden': !isBarsVisible }"
      @toggle-bars="toggleBars"
      @swipe="onSwipe"
    />
    <div
      v-show="isMenuOpen"
      class="menu-backdrop"
      @click="closeMenu"
    />
    <multi-tab-bar
      v-show="isBarsVisible"
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
import { OT_BOOKS, NT_BOOKS, BOOK_ABBREV } from 'src/bookAbbrev'
import { loadTabs, saveTabs, getCookie, setCookie } from 'src/cookie'

const CANON_BOOKS = [...OT_BOOKS, ...NT_BOOKS]

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
      isBarsVisible: true,
      showPopup: false,
      darkMode: getCookie('bible_dark') === '1',
      bookMap: {},
      tabs: saved
        ? saved.tabs
        : [{ id: 1, ref: '---', version: '개역개정', abbrev: null, chapter: null }],
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
    '$route' (route) {
      this.isBarsVisible = route.name !== ROUTE_NAMES.PAGE
    },
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
    toggleBars () {
      this.isBarsVisible = !this.isBarsVisible
    },
    togglePopup () {
      this.showPopup = !this.showPopup
    },
    toggleDarkMode () {
      this.darkMode = !this.darkMode
      setCookie('bible_dark', this.darkMode ? '1' : '0')
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
    },
    onSwipe (direction) {
      const book = this.$route.query.book
      const chapter = Number(this.$route.query.chapter)
      const bookIndex = CANON_BOOKS.indexOf(book)
      if (!book || !chapter || bookIndex === -1) return
      const chapterCount = this.bookMap[book].items
      let targetBook = book
      let targetChapter = chapter
      if (direction === 'next') {
        if (chapter < chapterCount) {
          targetChapter = chapter + 1
        } else if (bookIndex < CANON_BOOKS.length - 1) {
          targetBook = CANON_BOOKS[bookIndex + 1]
          targetChapter = 1
        } else {
          return
        }
      } else if (direction === 'prev') {
        if (chapter > 1) {
          targetChapter = chapter - 1
        } else if (bookIndex > 0) {
          targetBook = CANON_BOOKS[bookIndex - 1]
          targetChapter = this.bookMap[targetBook].items
        } else {
          return
        }
      } else {
        return
      }
      this.goTo(targetBook, targetChapter)
      window.scrollTo(0, 0)
    }
  }

}
</script>

<style lang="scss">
@import "./styles/main";
</style>