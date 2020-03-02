import Vue from "vue";
import Button from "./button.vue";
import Icon from "./icon.vue";
import ButtonGroup from "./button-group.vue";

Vue.component("g-icon", Icon);
Vue.component("g-button-group", ButtonGroup);
Vue.component("g-button", Button);

new Vue({
  el: "#app",
  data: {
    loading1: false
  }
});

import chai from "chai";
const expect = chai.expect;

{
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "settings"
    }
  });
  button.$mount("#test");
  let useElement = button.$el.querySelector("use");
  expect(useElement.getAttribute("xlink:href")).to.eq("#i-settings");
  button.$el.remove();
  button.$destory();
}

{
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData: {
      icon: "settings",
      loading: true
    }
  });
  button.$mount();
  let useElement = button.$el.querySelector("use");
  expect(useElement.getAttribute("xlink:href")).to.eq("#i-loading");
  button.$el.remove();
  button.$destory();
}
