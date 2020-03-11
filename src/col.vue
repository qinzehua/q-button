<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = value => {
  var keys = Object.keys(value);
  return keys.every(key => ["span", "offset"].includes(key));
};
export default {
  props: {
    span: {
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    },
    phone: {
      type: Object,
      validator
    },
    ipad: {
      type: Object,
      validator
    },
    narrowpc: {
      type: Object,
      validator
    }
  },
  data() {
    return {
      gutter: 0
    };
  },
  methods: {
    createdClasses: (obj, str) => {
      const classObj = {};
      if (!obj) {
        return classObj;
      }
      const { span, offset } = obj;
      if (span) {
        classObj[`col-${str}${span}`] = true;
      }
      if (offset) {
        classObj[`col-${str}${offset}`] = true;
      }
      return classObj;
    }
  },
  computed: {
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + "px",
        paddingRight: this.gutter / 2 + "px"
      };
    },
    colClass() {
      const { span, offset, phone, ipad, narrowpc } = this;
      return {
        ...this.createdClasses({ span, offset }, ""),
        ...this.createdClasses(phone, "phone-"),
        ...this.createdClasses(ipad, "ipad-"),
        ...this.createdClasses(narrowpc, "narrowpc-")
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.col {
  height: 100px;
  box-sizing: border-box;
  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }

  $class-prefix: offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }

  @media (min-width: 577px) {
    $class-prefix: col-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 1000px) {
    $class-prefix: col-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
}
</style>
