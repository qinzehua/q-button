<template>
  <div class="wrapper" ref="wrapper" :class="toastClass">
    <div class="toast">
      <div class="message">
        <slot v-if="!enabledHtml"></slot>
        <div v-if="enabledHtml" v-html="$slots.default[0]"></div>
      </div>
      <p class="line" ref="line"></p>
      <span class="close" v-if="closeBtn" @click="onClickClose()">
        {{ closeBtn.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    autoClose: {
      type: [Number, Boolean],
      default: 5,
      validator(value) {
        return typeof value === "number" || value === false;
      }
    },
    closeBtn: {
      type: Object
    },
    enabledHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "top",
      validator(v) {
        return ["top", "bottom", "middle"].indexOf(v) > -1;
      }
    }
  },
  mounted() {
    this.executeAutoClose();
    this.updateLineStyle();
  },
  computed: {
    toastClass() {
      return `position-${this.position}`;
    }
  },
  methods: {
    executeAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoClose * 1000);
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
      this.$emit("close");
      this.$destroy();
    },
    onClickClose() {
      this.close();
      if (this.closeBtn && this.closeBtn.callback) {
        this.closeBtn.callback();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
$animation-duration: 300ms;
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  &.position-top {
    top: 0;
    & .toast {
      animation: slide-down $animation-duration;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  &.position-bottom {
    bottom: 0;
    & .toast {
      animation: slide-up $animation-duration;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  &.position-middle {
    animation: fade-in $animation-duration;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
  }
}

.toast {
  border: 1px solid;
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-height;
  display: flex;
  align-items: center;
  background-color: $toast-bg;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0 8px;
}

.message {
  padding: 8px 0;
}
.close {
  padding-left: 16px;
  flex-shrink: 0;
}
.line {
  border-left: 1px solid #666;
  margin-left: 8px;
}
</style>
