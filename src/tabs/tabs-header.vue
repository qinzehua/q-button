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
    this.eventBus.$on("update:selected", () => {});
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
    border-bottom: 1px solid $blue;
    width: 100px;
  }
}
</style>
