<template>
  <div class="cascader-x">
    <div class="left">
      <div
        v-for="(item, idx) in options"
        :key="idx"
        @click="leftSelected = item"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right" v-if="leftSelected">
      <cascader-x :options="rightItems"></cascader-x>
    </div>
  </div>
</template>

<script>
export default {
  name: "cascaderX",
  props: {
    options: {
      type: Array,
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
.cascader-x {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .left {
    border: 1px solid red;
  }
}
</style>
