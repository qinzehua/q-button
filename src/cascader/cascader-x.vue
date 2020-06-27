<template>
  <div>
    <div v-for="(item, idx) in options" :key="idx" class="cascader-x">
      {{ item.name }}
      <cascader-x v-if="item.children" :options="item.children"></cascader-x>
    </div>
  </div>
</template>

<script>
export default {
  name: "cascaderX",
  props: {
    options: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.cascader-x {
  border: 1px solid red;
  margin: 10px;
}
</style>
