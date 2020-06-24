import Vue from "vue";
import Plugin from "./src/plugin";
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
import Toast from "./src/toast/toast";

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
Vue.component("g-toast", Toast);
Vue.use(Plugin);

new Vue({
  el: "#app",
  data: {
    loading1: false,
    message: "孙",
  },
  mounted() {
    this.$toast("<strong>这是toast</strong>", {
      closeBtn: {
        text: "关闭",
        callback() {
          console.log("用户说他知道了");
        },
      },
      enabledHtml: true,
      autoCloseDelay: 50,
    });
  },
  methods: {
    inputChange(val) {
      console.log(val);
    },
    showToast() {},
  },
});
