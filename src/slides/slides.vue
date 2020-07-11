<template>
  <div class="g-slides">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'g-slide',
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  props: {
    selected: {
      type: [String, Number]
    }
  },
  data() {
    return {
      eventBus: new Vue()
    };
  },
  mounted() {
    this.updateChildre();
  },
  updated() {
    this.updateChildre();
  },
  methods: {
    updateChildre() {
      const seletedName = this.selected || this.$children[0].name;
      this.eventBus.$emit('currentSelectd', seletedName);
    }
  }
};
</script>

<style>
.g-slides {
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
