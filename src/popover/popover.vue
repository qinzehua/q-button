<template>
  <div class="popover">
    <div
      ref="content-wrapper"
      class="content-wrapper"
      v-if="visible"
      @click.stop
    >
      <slot name="content"></slot>
    </div>
    <span ref="trigger-wrapper" @click="trigger">
      <slot></slot>
    </span>
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
    trigger() {
      this.visible = !this.visible;
      if (this.visible) {
        this.$nextTick(() => {
          this.appendWrapperToBody();
          this.addDocumentListener();
        });
      }
    },
    appendWrapperToBody() {
      document.body.appendChild(this.$refs["content-wrapper"]);
      let { width, height, top, left } = this.$refs[
        "trigger-wrapper"
      ].getBoundingClientRect();
      this.$refs["content-wrapper"].style.left = `${left + window.scrollX}px`;
      this.$refs["content-wrapper"].style.top = `${top + window.scrollY}px`;
    },
    addDocumentListener() {
      let x = () => {
        this.visible = false;
        document.removeEventListener("click", x);
      };
      document.addEventListener("click", x);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.popover {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.content-wrapper {
  position: absolute;
  border: 1px solid red;
  transform: translateY(-100%);
}
</style>
