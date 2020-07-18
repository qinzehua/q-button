<template>
  <div class="g-sub-menu">
    <span class="g-sub-menu-title" @click="onClick">
      <slot name="title"></slot>
    </span>
    <div class="g-sub-menu-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'g-sub-menu',
  data() {
    return {
      open: false
    };
  },
  methods: {
    onClick() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss" scoped>
.g-sub-menu {
  position: relative;
  z-index: 1;
  .g-sub-menu-title {
    display: block;
    padding: 10px 15px;
    cursor: pointer;
  }
  .g-sub-menu-popover {
    position: absolute;
    top: 100%;
    white-space: nowrap;
    background: white;
    margin-top: 4px;
    box-shadow: 0 0 3px fade-out(black, 0.8);
    border-radius: 4px;
    font-size: 14px;
    color: #666;
    min-width: 5em;
  }

  .g-sub-menu .g-sub-menu-popover {
    top: 0;
    left: 100%;
    margin-left: 3px;
  }
}
</style>
