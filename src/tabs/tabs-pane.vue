<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsPane",
  inject: ["eventBus"],
  props: {
    name: {
      type: String,
      require: true,
    },
  },
  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    this.eventBus.$on("update:selected", (name) => {
      if (name === this.name) {
        this.active = true;
      } else {
        this.active = false;
      }
    });
  },
};
</script>

<style lang="scss">
.tabs-pane {
  &.active {
    background: red;
  }
}
</style>
