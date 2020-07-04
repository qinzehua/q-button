<template>
  <div class="cascader-x" :style="{ height: height }">
    <div class="cascader-x-left">
      <div
        class="cascader-x-label"
        v-for="(item, idx) in options"
        :key="idx"
        @click="leftOnClick(item)"
      >
        {{ item.name }}
        <template v-if="loadingItem === item">
          <Icon name="loading" class="g-icon loading"></Icon>
        </template>
        <template v-else>
          <Icon v-if="!item.isLeaf" name="right" class="g-icon"></Icon>
        </template>
      </div>
    </div>
    <div class="cascader-x-right" v-if="rightItems">
      <cascader-x
        :options="rightItems"
        :height="height"
        :index="index + 1"
        :selected="selected"
        @selectedChange="selectedChange"
        :loadingItem="loadingItem"
      ></cascader-x>
    </div>
  </div>
</template>

<script>
import Icon from "../icon";
export default {
  name: "cascaderX",
  components: {
    Icon
  },
  props: {
    options: {
      type: Array
    },
    height: {
      type: String
    },
    selected: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number
    },
    loadingItem: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rightItems() {
      if (!this.selected[this.index]) {
        return null;
      }
      const item = this.options.filter(
        item => item.id === this.selected[this.index].id
      )[0];
      if (item && item.children) {
        return item.children;
      }
      return null;
    }
  },
  methods: {
    leftOnClick(item) {
      const copySelected = JSON.parse(JSON.stringify(this.selected));
      copySelected[this.index] = item;
      copySelected.splice(this.index + 1);
      this.$emit("selectedChange", copySelected);
    },
    selectedChange(selected) {
      this.$emit("selectedChange", selected);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
$input-height: 32px;
$button-height: 32px;
$font-size: 14px;
$button-bg: white;
$button-active-bg: #eee;
$border-radius: 4px;
$border-color: #ccc;
$border-hover-color: #666;
$item-hover-color: #ececec;
.box-shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.cascader-x {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100px;
  .cascader-x-left {
    padding: 0.3em 0;
    height: 100%;
    width: auto;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .cascader-x-right {
    height: 100%;
    border-left: 1px solid rgba(204, 204, 204, 0.1);
  }
  .cascader-x-label {
    padding: 0.3em 1em;
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background: $item-hover-color;
    }
    .g-icon {
      margin-left: 5px;
      font-size: 10px;
      width: 1em;
      height: 1em;
    }
    .loading {
      animation: spin 1.5s infinite linear;
    }
  }
}
</style>
