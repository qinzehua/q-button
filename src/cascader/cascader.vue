<template>
  <div class="cascader">
    <div class="trigger" @click="cascaderVisible = !cascaderVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="cascaderVisible">
      <cascader-x :options="options"></cascader-x>
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
  data() {
    return {
      cascaderVisible: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../var";
.cascader {
}
</style>
