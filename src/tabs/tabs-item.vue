<template>
  <div class="tabs-item" @click="switchItem">
      <slot>
  </div>
</template>

<script>
export default {
  name: "TabsItem",
  inject: ["eventBus"],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String | Number,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.eventBus.$on("update:selected", (value) => {
       
    });
  },
  methods:{ 
    switchItem() {
      this.eventBus.$emit('update:selected', this.name)
    }
  }
};
</script>

<style lang="scss">
.tabs-item {
}
</style>
