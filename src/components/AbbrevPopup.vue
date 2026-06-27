<template>
  <div
    v-if="visible"
    class="abbrev-popup-overlay"
    @click.self="$emit('close')"
  >
    <!-- 1단계: 약자 선택 -->
    <div class="abbrev-popup">
      <div class="popup-header">
        <span class="popup-title">성경 선택</span>
        <button
          class="close-btn"
          @click="$emit('close')"
        >
          <i class="im im-x-mark" />
        </button>
      </div>
      <div class="popup-body">
        <div class="section-label">
          구약
        </div>
        <div class="abbrev-grid">
          <button
            v-for="book in otBooks"
            :key="book.abbrev"
            class="abbrev-btn"
            @click="selectBook(book)"
          >
            {{ book.shortName }}
          </button>
        </div>
        <div class="section-label">
          신약
        </div>
        <div class="abbrev-grid">
          <button
            v-for="book in ntBooks"
            :key="book.abbrev"
            class="abbrev-btn"
            @click="selectBook(book)"
          >
            {{ book.shortName }}
          </button>
        </div>
      </div>
    </div>

    <!-- 2단계: 장 선택 -->
    <div
      v-if="selectedBook"
      class="chapter-popup"
    >
      <div class="popup-header">
        <span class="chapter-title">
          {{ selectedBook.category }}
          <small>({{ selectedBook.shortName }})</small>
        </span>
        <button
          class="close-btn"
          @click="selectedBook = null"
        >
          <i class="im im-x-mark" />
        </button>
      </div>
      <div class="popup-body chapter-grid">
        <button
          v-for="ch in selectedBook.items"
          :key="ch"
          class="chapter-btn"
          @click="selectChapter(ch)"
        >
          {{ ch }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { OT_BOOKS, NT_BOOKS, BOOK_ABBREV } from 'src/bookAbbrev'

export default {
  name: 'AbbrevPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    bookMap: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedBook: null
    }
  },
  computed: {
    otBooks () {
      return OT_BOOKS.map(abbrev => ({
        abbrev: abbrev,
        shortName: BOOK_ABBREV[abbrev] || abbrev,
        category: (this.bookMap[abbrev] && this.bookMap[abbrev].category) || abbrev,
        items: (this.bookMap[abbrev] && this.bookMap[abbrev].items) || 0
      }))
    },
    ntBooks () {
      return NT_BOOKS.map(abbrev => ({
        abbrev: abbrev,
        shortName: BOOK_ABBREV[abbrev] || abbrev,
        category: (this.bookMap[abbrev] && this.bookMap[abbrev].category) || abbrev,
        items: (this.bookMap[abbrev] && this.bookMap[abbrev].items) || 0
      }))
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.selectedBook = null
      }
    }
  },
  methods: {
    selectBook (book) {
      this.selectedBook = book
    },
    selectChapter (chapter) {
      this.$emit('go-to', { book: this.selectedBook.abbrev, chapter: chapter })
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
$overlay-bg: rgba(0, 0, 0, 0.6);
$popup-bg: #f5f0eb;
$header-bg: #e8ddd0;
$btn-bg: #5C4A3A;
$btn-text: #D4C5B9;
$btn-active-bg: #C8A882;
$btn-active-text: #2C1810;

.abbrev-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  background: $overlay-bg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.abbrev-popup,
.chapter-popup {
  width: 94vw;
  max-width: 400px;
  max-height: 85vh;
  background: $popup-bg;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.chapter-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: $header-bg;
  flex-shrink: 0;
}

.popup-title {
  font-size: 14px;
  font-weight: 700;
  color: #2C1810;
}

.chapter-title {
  font-size: 14px;
  font-weight: 700;
  color: #2C1810;

  small {
    font-weight: 400;
    opacity: 0.6;
    margin-left: 4px;
  }
}

.close-btn {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: #2C1810;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .im {
    font-size: 10px;
  }
}

.popup-body {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  color: #8b7355;
  padding: 6px 4px 3px;
  margin-top: 2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 5px;

  &:first-child {
    margin-top: 0;
  }
}

.abbrev-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.abbrev-btn {
  width: 48px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: $btn-bg;
  color: $btn-text;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.12s ease;

  &:active {
    background: $btn-active-bg;
    color: $btn-active-text;
    transform: scale(0.94);
  }
}

.chapter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.chapter-btn {
  width: 38px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: $btn-bg;
  color: $btn-text;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;

  &:active {
    background: $btn-active-bg;
    color: $btn-active-text;
    transform: scale(0.94);
  }
}
</style>
