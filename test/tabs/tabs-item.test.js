import Vue from "vue";
Vue.config.productionTip = false;
Vue.config.devtools = false;
import Tabs from "../../src/tabs/tabs";
import TabsHeader from "../../src/tabs/tabs-header";
import TabsItme from "../../src/tabs/tabs-item";
import TabsBody from "../../src/tabs/tabs-body";
import TabsPane from "../../src/tabs/tabs-pane";

Vue.component("g-tabs", Tabs);
Vue.component("g-tabs-header", TabsHeader);
Vue.component("g-tabs-item", TabsItme);
Vue.component("g-tabs-body", TabsBody);
Vue.component("g-tabs-pane", TabsPane);

describe("TabsItme", () => {
  it("存在.", () => {
    expect(TabsItme).to.exist;
  });

  it("可以接受 name", () => {
    const Constructor = Vue.extend(TabsItme);
    const vm = new Constructor({
      propsData: {
        name: "xxx",
      },
    }).$mount();
    expect(vm.$el.getAttribute("data-name")).to.eq("xxx");
  });

  it("可以接受 disabled", () => {
    const Constructor = Vue.extend(TabsItme);
    const vm = new Constructor({
      propsData: {
        disabled: true,
      },
    }).$mount();
    expect(vm.$el.classList.contains("disabled")).to.be.true;
    const callback = sinon.fake();
    vm.$on("click", callback);
    vm.$el.click();
    expect(callback).to.have.not.been.called;
  });
});
