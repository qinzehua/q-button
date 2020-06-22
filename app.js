import Vue from "vue";
import Button from "./src/button.vue";
import ButtonGroup from "./src/button-group.vue";
import Input from "./src/input.vue";
import Row from "./src/row.vue";
import Col from "./src/col.vue";

Vue.component("g-button-group", ButtonGroup);
Vue.component("g-button", Button);
Vue.component("g-input", Input);
Vue.component("g-row", Row);
Vue.component("g-col", Col);

new Vue({
  el: "#app",
  data: {
    loading1: false,
    message: "孙",
  },
  methods: {
    inputChange(val) {
      console.log(val);
    },
  },
});
