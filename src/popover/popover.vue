<template>
  <div class="popover" ref="popover">
    <div
      ref="content-wrapper"
      class="content-wrapper"
      :class="classes"
      v-if="visible"
      @click.stop
    >
      <slot name="content"></slot>
    </div>
    <span class="trigger-wrapper" ref="trigger-wrapper" @click="triggerPop">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Popover",
  props: {
    position: {
      type: String,
      default: "top",
      validator(v) {
        return ["top", "bottom", "left", "right"].indexOf(v) > -1;
      }
    },
    trigger: {
      type: String,
      default: "click",
      validator(v) {
        return ["click", "hover"].indexOf(v) > -1;
      }
    }
  },
  computed: {
    classes() {
      return {
        [`position-${this.position}`]: true
      };
    },
    openEvetn() {
      if (this.trigger === "click") {
        return "click";
      } else {
        return "mouseenter";
      }
    },
    closeEvent() {
      if (this.trigger === "click") {
        return "click";
      } else {
        return "mouseleave";
      }
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    triggerPop() {
      this.visible = !this.visible;
      if (this.visible) {
        this.$nextTick(() => {
          this.appendWrapperToBody();
          this.addDocumentListener();
        });
      }
    },
    appendWrapperToBody() {
      const TriggerWrapperRef = this.$refs["trigger-wrapper"];
      const ContentWrapperRef = this.$refs["content-wrapper"];

      document.body.appendChild(ContentWrapperRef);
      const {
        width,
        height,
        top,
        left
      } = TriggerWrapperRef.getBoundingClientRect();
      const {
        height: ConHeight,
        width: ConWidth
      } = ContentWrapperRef.getBoundingClientRect();
      const positions = {
        top: {
          left: left + window.scrollX,
          top: top + window.scrollY
        },
        bottom: {
          left: left + window.scrollX,
          top: top + window.scrollY + height
        },
        left: {
          left: left + window.scrollX - ConWidth,
          top: top + window.scrollY + (height - ConHeight) / 2
        },
        right: {
          left: left + window.scrollX + width,
          top: top + window.scrollY + (height - ConHeight) / 2
        }
      };

      ContentWrapperRef.style.left = positions[this.position].left + "px";
      ContentWrapperRef.style.top = positions[this.position].top + "px";
    },
    addDocumentListener() {
      let x = () => {
        this.visible = false;
        document.removeEventListener("click", x);
      };
      document.addEventListener("click", x);
    }
  },
  mounted() {
    if (this.trigger === "hover") {
      this.$refs.popover.addEventListener(this.openEvetn, () => {
        this.visible = true;
        this.$nextTick(() => {
          this.appendWrapperToBody();
        });
      });
      this.$refs.popover.addEventListener(this.closeEvent, () => {
        this.visible = false;
      });
    }
  }
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
  border: 1px solid #333;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
  border-radius: 4px;
  padding: 1em;
  max-width: 300px;
  word-break: break-all;
  background-color: white;
  &::before,
  &::after {
    content: "";
    display: block;
    border: 10px solid transparent;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before {
      left: 10px;
      top: 100%;
      border-top-color: black;
    }
    &::after {
      left: 10px;
      top: 100%;
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before {
      left: 10px;
      bottom: 100%;
      border-bottom-color: black;
    }
    &::after {
      left: 10px;
      bottom: calc(100% - 1px);
      border-bottom-color: white;
    }
  }
  &.position-left {
    margin-left: -10px;
    &::before {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: black;
    }
    &::after {
      left: calc(100% - 1px);
      top: 50%;
      transform: translateY(-50%);
      border-left-color: white;
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: black;
    }
    &::after {
      right: calc(100% - 1px);
      top: 50%;
      transform: translateY(-50%);
      border-right-color: white;
    }
  }
}
.trigger-wrapper {
  display: inline-block;
}
</style>
