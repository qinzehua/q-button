<template>
  <button class="g-button" :class="{ [`icon-${iconPosition}`]: true }">
    <g-icon :name="icon" v-if="icon" class="icon"></g-icon>
    <g-icon name="loading" v-if="icon" class="icon loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: "left",
      validator(vale) {
        return vale === "left" || vale === "right";
      }
    }
  }
};
</script>

<style lang="scss">
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.g-button {
  font-size: var(--font-size);
  height: var(--button-height);
  padding: 0 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  &:hover {
    border-color: var(--border-hover-color);
  }
  &:active {
    background-color: var(--button-active-bg);
  }
  &:focus {
    outline: none;
  }
  .icon {
    order: 1;
    margin-right: 0.3em;
  }
  .content {
    order: 2;
  }
  &.icon-right {
    .icon {
      order: 2;
      margin-left: 0.3em;
      margin-right: 0;
    }
    .content {
      order: 1;
    }
  }

  .loading {
    animation: spin 1.5s infinite linear;
  }
}
</style>
