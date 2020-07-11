<template>
  <div
    class="g-slides"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot></slot>
    <div v-if="childrenLength" class="g-dot-box">
      <span
        v-for="index in childrenLength"
        :key="index - 1"
        @click="selectedChange(index - 1)"
        :class="{
          'g-active-dot': index - 1 === selectedIndex
        }"
        >{{ index - 1 }}</span
      >
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'g-slide',
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  props: {
    selected: {
      type: [String, Number]
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    seletedName() {
      return (
        this.selected || (this.$children[0] && this.$children[0].name) || ''
      );
    },
    selectedIndex() {
      return this.names.indexOf(this.selected) > 0
        ? this.names.indexOf(this.selected)
        : 0;
    }
  },
  data() {
    return {
      eventBus: new Vue(),
      childrenLength: 0,
      names: [],
      previousIndex: null,
      timerId: null,
      startTouch: null
    };
  },
  mounted() {
    this.names = this.$children.map(vm => vm.name);
    this.childrenLength = this.$children.length;
    this.updateChildren(this.seletedName);
    this.playAutomatically();
  },
  updated() {
    this.updateChildren(this.seletedName);
  },
  methods: {
    selectedChange(index) {
      if (index === -1) index = this.names.length - 1;
      if (index === this.names.length) index = 0;
      this.previousIndex = this.selectedIndex;
      this.$emit('update:selected', this.names[index]);
    },
    updateChildren(seletedName) {
      let reverse = this.selectedIndex > this.previousIndex ? false : true;
      if (this.timerId) {
        if (
          this.previousIndex === this.names.length - 1 &&
          this.selectedIndex == 0
        ) {
          reverse = false;
        }
        if (
          this.previousIndex === 0 &&
          this.selectedIndex == this.names.length - 1
        ) {
          reverse = true;
        }
      }
      this.eventBus.$emit('currentSelectd', seletedName, reverse);
    },
    playAutomatically() {
      if (!this.autoPlay) return;
      if (this.timerId) {
        return;
      }
      const run = () => {
        let index = this.names.indexOf(this.seletedName);
        index += 1;
        this.selectedChange(index);
        this.timerId = setTimeout(run, 4000);
      };
      this.timerId = setTimeout(run, 4000);
    },
    pause() {
      clearTimeout(this.timerId);
      this.timerId = null;
    },
    onMouseEnter() {
      this.pause();
    },
    onMouseLeave() {
      this.playAutomatically();
    },
    onTouchStart(e) {
      this.pause();
      if (e.touches.length > 1) {
        return;
      }
      this.startTouch = e.touches[0];
    },
    onTouchEnd(e) {
      let endTouch = e.changedTouches[0];
      let { clientX: x1, clientY: y1 } = this.startTouch;
      let { clientX: x2, clientY: y2 } = endTouch;
      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let deltaY = Math.abs(y2 - y1);
      let rate = distance / deltaY;
      if (rate > 2) {
        if (x2 > x1) {
          this.selectedChange(this.selectedIndex - 1);
        } else {
          this.selectedChange(this.selectedIndex + 1);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.g-slides {
  overflow: hidden;
  position: relative;

  .g-dot-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    span {
      display: inline-flex;
      width: 1.5em;
      height: 1.5em;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #e2e2e2;
      margin: 0 10px;
      cursor: pointer;
      &.g-active-dot {
        background-color: red;
        cursor: default;
      }
    }
  }
}
</style>
