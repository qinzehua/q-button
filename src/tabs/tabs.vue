<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Tabs",
  props: {
    selected: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) > -1;
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  created() {},
  mounted() {
    if (this.$children.length === 0) {
      console.warn("tabs 没有子组件, 子组件应该是tabs-header和tabs-body");
    }
    this.$children.forEach(vm => {
      if ("TabsHeader" === vm.$options.name) {
        vm.$children.forEach(item => {
          if (
            !item.disabled &&
            item.$options.name === "TabsItem" &&
            item.name === this.selected
          ) {
            this.eventBus.$emit("update:selected", this.selected, item);
          }
        });
      }
    });
  }
};
</script>

<style lang="scss">
.tabs {
}
</style>
