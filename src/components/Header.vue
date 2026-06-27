<template functional>
  <header>
    <h1>{{ props.title }}</h1>
    <button
      class="menu-button" 
      @click="listeners.toggleMenu"
    >
      <i class="im im-menu" />
      {{ props.isMenuOpen ? '메뉴 숨기기' : '메뉴 열기' }}
    </button>
    <h2>{{ props.page }}</h2>
    <button
      class="popup-button"
      @click="listeners.togglePopup"
    >
      <i class="im im-menu" />
    </button>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    page: {
      type: String,
      default: '',
      required: false
    },
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: #eeeeee;
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 0px 25px 0px rgba(0, 0, 0, 0.3);
  h1 {
    display: none;
  }
  .menu-button {
    width: 30px;
    height: 30px;
    font-size: 0;
    margin-right: 12px;
  }
  .popup-button {
    width: 30px;
    height: 30px;
    font-size: 0;
    margin-left: auto;
    background: #4a90d9;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .im {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
