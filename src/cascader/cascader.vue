<template>
  <div class="cascader">
    <div class="trigger" @click="cascaderVisible = !cascaderVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="cascaderVisible">
      <div class="level level1">
        <div
          v-for="(item1, idx) in options"
          :key="idx"
          @click="level1Selected = item1"
        >
          {{ item1.name }}
        </div>
      </div>
      <div class="level level2">
        <div
          v-for="(item2, idx) in level2Items"
          :key="idx"
          @click="level2Selected = item2"
        >
          {{ item2.name }}
        </div>
      </div>
      <div class="level level3">
        <div v-for="(item3, idx) in level3Items" :key="idx">
          {{ item3.name }}
        </div>
      </div>
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
      level1Selected: null,
      level2Selected: null,
    };
  },
  computed: {
    level2Items() {
      if (this.level1Selected) {
        return this.level1Selected.children;
      } else {
        return [];
      }
    },
    level3Items() {
      if (this.level2Selected) {
        return this.level2Selected.children;
      } else {
        return [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../var";
.cascader {
  .popover {
    display: flex;
  }
}
</style>
