<template>
  <div class="row" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gutter: {
      type: [String, Number]
    },
    justalign: {
      type: String,
      validator(value) {
        return ["left", "right", "center"].includes(value);
      }
    }
  },
  mounted() {
    this.$children.forEach(vm => {
      vm.gutter = this.gutter;
    });
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px"
      };
    },
    rowClass() {
      return {
        [`aligin-${this.justalign}`]: this.justalign
      };
    }
  }
};
</script>

<style lang="scss">
.row {
  display: flex;
  .aligin {
    &-left {
      justify-content: flex-start;
    }
    &-right {
      justify-content: flex-end;
    }
    &-center {
      justify-content: flex-center;
    }
  }
}
</style>
