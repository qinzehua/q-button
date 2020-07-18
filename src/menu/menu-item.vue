<template>
  <div
    class="g-menu-item"
    :class="{ selected, 'g-vertical-menu-item': vertical }"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'g-menu-item',
  inject: ['root', 'vertical'],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: false
    };
  },
  mounted() {
    this.root.addItem(this);
  },
  methods: {
    onClick() {
      this.root.namePath = [];
      this.$parent.updateNamePath && this.$parent.updateNamePath();
      this.$emit('add:selected', this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.g-menu-item {
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  &.selected:not(.g-vertical-menu-item) {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      border: 1px solid #4a90e2;
      width: 100%;
    }
  }
  &.selected.g-vertical-menu-item {
    color: #4a90e2;
  }
}

.g-sub-menu .g-menu-item {
  &.selected {
    background: #eee;
    color: #111;
    &::after {
      display: none;
    }
  }
}
</style>
