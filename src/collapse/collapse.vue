<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "collapse",
  props: {
    single: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Array
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
  mounted() {
    if (this.single) {
      this.eventBus.$emit("update:selected", [this.selected[0]]);
    } else {
      this.eventBus.$emit("update:selected", this.selected);
    }

    this.eventBus.$on("update:addSelected", name => {
      let selected = JSON.parse(JSON.stringify(this.selected));
      if (this.single) {
        selected = [name];
      } else {
        selected.push(name);
      }
      this.eventBus.$emit("update:selected", selected);
      this.$emit("update:selected", selected);
    });

    this.eventBus.$on("update:deleteSelected", name => {
      const selected = JSON.parse(JSON.stringify(this.selected));

      const idx = selected.indexOf(name);
      selected.splice(idx, 1);
      this.eventBus.$emit("update:selected", selected);
      this.$emit("update:selected", selected);
    });
  }
};
</script>

<style lang="scss">
.collapse {
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 4px;
}
</style>
