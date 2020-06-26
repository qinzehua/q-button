import Vue from "vue";
import Plugin from "./src/toast/plugin";
import Button from "./src/button.vue";
import Icon from "./src/icon";
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
import Tabs from "./src/tabs/tabs";
import TabsHeader from "./src/tabs/tabs-header";
import TabsItme from "./src/tabs/tabs-item";
import TabsBody from "./src/tabs/tabs-body";
import TabsPane from "./src/tabs/tabs-pane";
import Popover from "./src/popover/popover";

Vue.component("g-icon", Icon);
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

Vue.component("g-tabs", Tabs);
Vue.component("g-tabs-header", TabsHeader);
Vue.component("g-tabs-item", TabsItme);
Vue.component("g-tabs-body", TabsBody);
Vue.component("g-tabs-pane", TabsPane);
Vue.component("g-popover", Popover);

new Vue({
  el: "#app",
  data: {
    loading1: false,
    message: "孙",
    selectTab: "sport",
  },
  mounted() {},
  methods: {
    inputChange(val) {
      console.log(val);
    },
    showToast() {
      this.$toast("已从之已从", {
        position: "bottom",
        closeBtn: {
          text: "关闭",
          callback() {
            console.log("用户说他知道了");
          },
        },
        autoClose: 5,
      });
    },
  },
});
