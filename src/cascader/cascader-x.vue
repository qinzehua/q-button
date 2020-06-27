<template>
  <div class="cascader-x" :style="{ height: height }">
    <div class="cascader-x-left">
      <div
        class="cascader-x-label"
        v-for="(item, idx) in options"
        :key="idx"
        @click="leftSelected = item"
      >
        {{ item.name }}
        <Icon v-if="item.children" name="right"></Icon>
      </div>
    </div>
    <div class="cascader-x-right" v-if="rightItems">
      <cascader-x :options="rightItems" :height="height"></cascader-x>
    </div>
  </div>
</template>

<script>
import Icon from "../icon";
export default {
  name: "cascaderX",
  components: {
    Icon,
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
      leftSelected: null,
    };
  },
  computed: {
    rightItems() {
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../var";
.cascader-x {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100px;
  .cascader-x-left {
    padding: 0.3em 0;
    height: 100%;
    width: 80px;
  }
  .cascader-x-right {
    height: 100%;
    border-left: 1px solid rgba(204, 204, 204, 0.1);
  }
  .cascader-x-label {
    padding: 0.3em 1em;
    display: flex;
    align-items: center;
    .g-icon {
      margin-left: 5px;
      font-size: 10px;
    }
  }
}
</style>
