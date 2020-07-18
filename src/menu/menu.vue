<template>
  <div class="g-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'g-menu',
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.updateChildren();
    this.listenToChildre();
  },
  updated() {
    this.updateChildren();
  },
  computed: {
    items() {
      return this.$children.filter(vm => vm.$options.name === 'g-menu-item');
    }
  },
  methods: {
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
}
</style>
