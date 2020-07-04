<template>
  <div class="cascader" ref="cascader">
    <div class="trigger" @click="toggle">
      <slot :selected="selected"></slot>
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
      console.log(selected);
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

      for (let j = 0; j < source.length; j++) {
        const item = source[j];
        if (item.children) {
          const ch = this.findItemFromSource(item.children, id);
          if (ch) {
            return ch;
          }
        }
      }
      return undefined;
    },
    hideOverlay(e) {
      const { target } = e;
      const { cascader } = this.$refs;
      if (target === cascader || cascader.contains(target)) {
        return;
      }
      this.close();
    },
    toggle() {
      if (this.cascaderVisible) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      this.cascaderVisible = true;
      this.$nextTick(() => {
        document.addEventListener("click", this.hideOverlay);
      });
    },
    close() {
      this.cascaderVisible = false;
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
