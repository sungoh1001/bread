<template>
  <main
    id="page"
    @click="onClick"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchcancel="onTouchCancel"
  >
    <ul class="bible">
      <li
        v-for="(line, index) in bible"
        :key="index"
        class="verse"
      >
        <i class="index">{{ index + 1 }}</i>
        <span class="text">{{ line }}</span>
      </li>
    </ul>
  </main>
</template>

<script>
import { ROUTE_NAMES } from 'src/constants'

export default {
  name: ROUTE_NAMES.PAGE,
  props: {
    bible: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      touchStartX: null,
      touchStartY: null,
      suppressClick: false
    }
  },
  methods: {
    onClick () {
      if (this.suppressClick) {
        this.suppressClick = false
        return
      }
      this.$emit('toggle-bars')
    },
    onTouchStart (event) {
      const touch = event.touches[0]
      this.touchStartX = touch.clientX
      this.touchStartY = touch.clientY
      this.suppressClick = false
    },
    onTouchEnd (event) {
      if (this.touchStartX === null) return
      const touch = event.changedTouches[0]
      const dx = touch.clientX - this.touchStartX
      const dy = touch.clientY - this.touchStartY
      this.touchStartX = null
      this.touchStartY = null
      if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return
      this.suppressClick = true
      this.$emit('swipe', dx < 0 ? 'next' : 'prev')
    },
    onTouchCancel () {
      this.touchStartX = null
      this.touchStartY = null
    }
  }
}
</script>

<style lang="scss" scoped>
.bible {
  padding: 16px;
}

.verse {
  position: relative;
}

.index {
  position: absolute;
  top: 0;
  left: 0;
  width: 25px;
  display: inline-block;
  text-align: center;
  font-weight: 700;
}

.text {
  display: inline-block;
  padding-left: 32px;
}
</style>
