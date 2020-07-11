<template>
  <transition name="slide">
    <div class="g-slides-item" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'g-slide-item',
  inject: ['eventBus'],
  props: {
    name: {
      type: String
    }
  },
  computed: {
    visible() {
      return this.seleted === this.name;
    }
  },
  data() {
    return {
      seleted: ''
    };
  },
  mounted() {
    this.eventBus.$on('currentSelectd', seletedName => {
      this.seleted = seletedName;
    });
  }
};
</script>

<style>
.g-slides-item {
  display: inline-block;
}
.slide-leave-active {
  position: absolute;
  left: 0;
  top: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
