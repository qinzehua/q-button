import Vue from "vue";
import Button from "./src/button.vue";
import ButtonGroup from "./src/button-group.vue";
import Input from "./src/input.vue";
import Row from "./src/row.vue";
import Col from "./src/col.vue";

import Content from "./src/layout/content";
import Footer from "./src/layout/footer";
import Header from "./src/layout/header";
import Layout from "./src/layout/layout";
import Slider from "./src/layout/slider";

Vue.component("g-button-group", ButtonGroup);
Vue.component("g-button", Button);
Vue.component("g-input", Input);
Vue.component("g-row", Row);
Vue.component("g-col", Col);
Vue.component("g-content", Content);
Vue.component("g-footer", Footer);
Vue.component("g-header", Header);
Vue.component("g-layout", Layout);
Vue.component("g-slider", Slider);

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
