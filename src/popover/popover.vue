<template>
  <div class="popover" @click="xxx">
    <div class="content-wrapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Popover",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    xxx() {
      this.visible = !this.visible;
      if (this.visible) {
        this.$nextTick(() => {
          let x = () => {
            this.visible = false;
            document.removeEventListener("click", x);
          };
          document.addEventListener("click", x);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.popover {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  .content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    border: 1px solid red;
  }
}
</style>
