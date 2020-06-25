<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    selected: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) > -1;
      },
    },
  },
  created() {
    this.$emit("update:selected", "woman");
  },
};
</script>

<style lang="scss">
.tabs {
}
</style>
