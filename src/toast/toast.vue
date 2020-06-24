<template>
  <div class="toast" ref="wrapper">
    <div class="message">
      <slot v-if="!enabledHtml"></slot>
      <div v-if="enabledHtml" v-html="$slots.default[0]"></div>
    </div>
    <p class="line" ref="line"></p>
    <span class="close" v-if="closeBtn" @click="onClickClose()">
      {{ closeBtn.text }}
    </span>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {};
  },
  props: {
    autoClose: {
      type: Boolean,
      default: true,
    },
    autoCloseDelay: {
      type: Number,
      default: 5,
    },
    closeBtn: {
      type: Object,
    },
    enabledHtml: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.executeAutoClose();
    this.updateLineStyle();
  },
  methods: {
    executeAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000);
      }
    },
    updateLineStyle() {
      this.$nextTick(() => {
        this.$refs.line.style.height =
          this.$refs.wrapper.getBoundingClientRect().height + "px";
      });
    },
    close() {
      this.$el.remove();
      this.$destroy();
    },
    onClickClose() {
      this.close();
      if (this.closeBtn && this.closeBtn.callback) {
        this.closeBtn.callback();
      }
    },
  },
};
</script>

<style lang="scss">
$font-size: 14px;
$toast-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
.toast {
  border: 1px solid;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-height;
  display: flex;
  align-items: center;
  background-color: $toast-bg;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding-left: 8px;
}
.message {
  padding: 8px 0;
}
.close {
  padding-left: 16px;
  flex: 0 0 50px;
}
.line {
  border-left: 1px solid #666;
  margin-left: 8px;
}
</style>
