<template>
  <div class="tabs-header">
    <slot></slot>
    <div class="action-wrapper">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabsHeader",
  inject: ["eventBus"],
  created() {},
};
</script>

<style lang="scss">
$tab-height: 40px;
.tabs-header {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  & .action-wrapper {
    margin-left: auto;
  }
}
</style>
