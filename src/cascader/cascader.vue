<template>
  <div class="cascader">
    <div class="trigger" @click="cascaderVisible = !cascaderVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="cascaderVisible">
      <cascader-x :options="options" :height="height"></cascader-x>
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
    height: {
      type: String,
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
  display: inline-block;
  position: relative;

  .popover {
    background-color: white;
    @extend .box-shadow;
    position: absolute;
    left: 0;
    top: calc(100% + 5px);
  }
}
</style>
