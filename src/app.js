import Vue from "vue";
import Button from "./button.vue";
import ButtonGroup from "./button-group.vue";

Vue.component("g-button-group", ButtonGroup);
Vue.component("g-button", Button);

new Vue({
  el: "#app",
  data: {
    loading1: false
  }
});
