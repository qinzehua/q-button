<template>
  <div class="g-sub-menu" v-click-outside="onLeave">
    <span
      class="g-sub-menu-title"
      :class="{ active, 'g-vertical-menu-title': vertical }"
      @click="onEnter"
    >
      <slot name="title"></slot>
      <g-icon
        name="right"
        class="g-sub-menu-title-icon"
        :class="{ 'g-sub-menu-open': open }"
      ></g-icon>
    </span>
    <div class="g-sub-menu-popover" :class="{ vertical }" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import clickOutside, { removeListener } from '../clickoOutside';
import Icon from '../g-icon/icon';

export default {
  components: {
    'g-icon': Icon
  },
  directives: {
    clickOutside
  },
  name: 'g-sub-menu',
  inject: ['root', 'vertical'],
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
      this.open = !this.open;
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
    display: inline-flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
    &.active:not(.g-vertical-menu-title) {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid #4a90e2;
        width: 100%;
      }
    }
    &.active.g-vertical-menu-title {
      color: #4a90e2;
    }

    .g-sub-menu-title-icon {
      margin-left: 3px;
      transition: transform 250ms;
      &.g-sub-menu-open {
        transform: rotateZ(180deg);
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
    &.vertical {
      position: static;
      border-radius: none;
      box-shadow: none;
    }
  }

  .g-sub-menu .g-sub-menu-popover {
    top: 0;
    left: 100%;
    margin-left: 3px;
    &.vertical {
      margin-left: 10px;
    }
  }
  .g-sub-menu-popover {
    &.vertical {
      margin-left: 10px;
    }
  }

  .g-sub-menu .g-sub-menu-title {
    &.active {
      &::after {
        display: none;
      }
    }
    &.active.g-vertical-menu-title {
      color: #666;
    }
  }
}
</style>
