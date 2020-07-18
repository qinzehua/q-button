<template>
  <div class="g-sub-menu" v-click-outside="onLeave">
    <span class="g-sub-menu-title" :class="{ active }" @click="onEnter">
      <slot name="title"></slot>
    </span>
    <div class="g-sub-menu-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import clickOutside, { removeListener } from '../clickoOutside';
export default {
  directives: {
    clickOutside
  },
  name: 'g-sub-menu',
  inject: ['root'],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    active() {
      return this.root.namePath.indexOf(this.name) >= 0;
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    onEnter() {
      this.open = true;
    },
    onLeave() {
      this.open = false;
    },
    updateNamePath() {
      this.root.namePath.push(this.name);
      this.$parent.updateNamePath && this.$parent.updateNamePath();
    }
  },
  beforeDestroy() {
    removeListener(this.$el);
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
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid #4a90e2;
        width: 100%;
      }
    }
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
