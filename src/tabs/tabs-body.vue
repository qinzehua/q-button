<template>
  <div class="tabs-body">
      <slot>
  </div>
</template>

<script>
export default {
  name: "TabsBody",
  inject: ["eventBus"],
};
</script>

<style lang="scss">
.tabs-body {
}
</style>
