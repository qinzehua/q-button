<template>
  <div class="tabs-item">
      <slot>
  </div>
</template>

<script>
export default {
  name: "TabsItem",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.tabs-item {
}
</style>
