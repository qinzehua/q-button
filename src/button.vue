<template>
  <button
    class="g-button"
    :class="{ [`icon-${iconPosition}`]: true }"
    @click="$emit('click')"
  >
    <g-icon :name="icon" v-if="icon && !loading" class="icon"></g-icon>
    <g-icon name="loading" v-if="loading" class="icon loading"></g-icon>
    <div class="g-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Icon from "./icon.vue";
export default {
  props: {
    icon: {
      type: String,
    },
    iconPosition: {
      type: String,
      default: "left",
      validator(vale) {
        return vale === "left" || vale === "right";
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    "g-icon": Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "./var";
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.g-button {
  font-size: $font-size;
  height: $button-height;
  padding: 0 1rem;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $button-bg;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  &:hover {
    border-color: $border-hover-color;
  }
  &:active {
    background-color: $button-active-bg;
  }
  &:focus {
    outline: none;
  }
  .icon {
    order: 1;
    margin-right: 0.3em;
  }
  .g-button-content {
    order: 2;
  }
  &.icon-right {
    .icon {
      order: 2;
      margin-left: 0.3em;
      margin-right: 0;
    }
    .g-button-content {
      order: 1;
    }
  }

  .loading {
    animation: spin 1.5s infinite linear;
  }
}
</style>
