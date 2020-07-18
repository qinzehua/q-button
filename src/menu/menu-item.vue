<template>
  <div class="g-menu-item" :class="{ selected }" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'g-menu-item',
  inject: ['root'],
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
      this.$emit('add:selected', this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.g-menu-item {
  padding: 10px 15px;
  cursor: pointer;
}
.selected {
  background: red;
}
</style>
