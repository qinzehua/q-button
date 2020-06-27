<template>
  <div class="cascader">
    <div class="trigger">
      <slot></slot>
    </div>
    <div class="popover">
      <Cascader-x :options="options"></Cascader-x>
    </div>
  </div>
</template>

<script>
import CascaderX from "./cascader-x";
export default {
  name: "CasCader",
  components: {
    CascaderX,
  },
  props: {
    options: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../var";
.cascader {
}
</style>
