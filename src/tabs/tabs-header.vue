<template>
  <div class="tabs-header">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="action-wrapper">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabsHeader",
  inject: ["eventBus"],
  created() {
    this.eventBus.$on("update:selected", (name, vm) => {
      const { width, height, top, left } = vm.$el.getBoundingClientRect();
      this.$refs.line.style.width = `${width}px`;
      this.$refs.line.style.left = `${left - 22}px`;
    });
  },
};
</script>

<style lang="scss">
$tab-height: 40px;
$blue: blue;
.tabs-header {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  border: 1px solid;
  position: relative;
  & .action-wrapper {
    margin-left: auto;
  }
  & .line {
    position: absolute;
    bottom: 0;
    border-bottom: 2px solid $blue;
    transition: all 0.5s;
  }
}
</style>
