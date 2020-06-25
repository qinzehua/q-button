<template>
  <div class="tabs-item" @click="switchItem" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsItem",
  inject: ["eventBus"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String | Number,
      require: true,
    },
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
  methods: {
    switchItem() {
      this.eventBus.$emit("update:selected", this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-item {
  flex-shrink: 0;
  padding: 0 2em;
  &.active {
    background: red;
  }
}
</style>
