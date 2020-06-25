<template>
  <div class="tabs-header">
    <slot></slot>
    <slot name="action"></slot>
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
.tabs-header {
}
</style>
