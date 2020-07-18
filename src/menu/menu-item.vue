<template>
  <div class="g-menu-item" :class="{ selected }" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'g-menu-item',
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
  methods: {
    onClick() {
      this.$emit('add:selected', this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.g-menu-item {
}
.selected {
  background: red;
}
</style>
