<template>
  <div class="g-menu" :class="{ vertical }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'g-menu',
  provide() {
    return {
      root: this,
      vertical: this.vertical
    };
  },

  props: {
    selected: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      namePath: []
    };
  },
  mounted() {
    this.updateChildren();
    this.listenToChildre();
  },
  updated() {
    this.updateChildren();
  },

  methods: {
    addItem(child) {
      this.items.push(child);
    },
    updateChildren() {
      this.items.forEach(vm => {
        if (this.selected.indexOf(vm.name) >= 0) {
          vm.selected = true;
        } else {
          vm.selected = false;
        }
      });
    },
    listenToChildre() {
      this.items.forEach(vm => {
        vm.$on('add:selected', name => {
          if (this.multiple) {
            if (this.selected.indexOf(vm.name) < 0) {
              let copySleted = JSON.parse(JSON.stringify(this.selected));
              copySleted.push(name);
              this.$emit('update:selected', copySleted);
            }
          } else {
            this.$emit('update:selected', [name]);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.g-menu {
  display: flex;
  border-bottom: 1px solid #ccc;
  &.vertical {
    flex-direction: column;
  }
}
</style>
