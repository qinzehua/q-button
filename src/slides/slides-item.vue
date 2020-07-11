<template>
  <transition name="slide">
    <div class="g-slides-item" :class="{ reverse }" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'g-slides-item',
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
      seleted: '',
      reverse: false
    };
  },
  mounted() {
    this.eventBus.$on('currentSelectd', (seletedName, reverse) => {
      this.reverse = reverse;
      this.$nextTick(() => {
        this.seleted = seletedName;
      });
    });
  }
};
</script>

<style>
.g-slides-item {
}
.slide-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter {
  transform: translateX(100%);
}
.slide-enter.reverse {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-leave-to.reverse {
  transform: translateX(100%);
}
</style>
