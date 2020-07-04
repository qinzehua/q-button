<template>
  <div class="cascader">
    <div class="trigger" @click="cascaderVisible = !cascaderVisible">
      <slot></slot>
    </div>
    <div class="popover" v-if="cascaderVisible">
      <cascader-x
        :options="options"
        :height="height"
        :index="index"
        :selected="selected"
        @selectedChange="selectedChange"
      ></cascader-x>
    </div>
  </div>
</template>

<script>
import CascaderX from "./cascader-x";
export default {
  name: "CasCader",
  components: {
    CascaderX
  },
  props: {
    options: {
      type: Array
    },
    height: {
      type: String
    },
    selected: {
      type: Array,
      default: () => []
    },
    loadData: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      cascaderVisible: false,
      index: 0
    };
  },
  methods: {
    selectedChange(selected) {
      const optionsCopy = JSON.parse(JSON.stringify(this.options));
      const lastSelected = selected[selected.length - 1];
      const upateItem = this.findItemFromSource(optionsCopy, lastSelected.id);
      this.$emit("update:selected", selected);
      if (!upateItem.children) {
        this.loadData(upateItem, r => {
          if (r.length) {
            upateItem.children = r;
            this.$emit("update:options", optionsCopy);
          }
        });
      }
    },
    findItemFromSource(source, id) {
      for (let i = 0; i < source.length; i++) {
        const item = source[i];
        if (item.id === id) {
          return item;
        }
      }
      for (let i = 0; i < source.length; i++) {
        const item = source[i];
        if (item.children) {
          return this.findItemFromSource(item.children, id);
        }
      }
    }
  }
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
