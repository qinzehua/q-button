<template>
  <div class="tabs-pane">
      <slot>
  </div>
</template>

<script>
export default {
  name: "TabsPane",
  inject: ["eventBus"],
};
</script>

<style lang="scss">
.tabs-pane {
}
</style>
