<template>
  <div class="col" :class="[`col-${span}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: [Number, String]
    }
  }
};
</script>

<style lang="scss">
.col {
  height: 100px;
  background: blue;
  border: 1px solid red;
  box-sizing: border-box;
  $class-prefix: col-;
  @for $n from 1 through 20 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
</style>
