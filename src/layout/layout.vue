<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "gLayout",
  data() {
    return {
      layoutClass: {
        hasSlider: false
      }
    };
  },
  mounted() {
    this.$children.forEach(vm => {
      if (vm.$options.name === "gSlider") {
        console.log(vm.$options.name);

        this.layoutClass.hasSlider = true;
      }
    });
  }
};
</script>

<style lang="scss">
.layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &.hasSlider {
    flex-direction: row;
  }
}
</style>
