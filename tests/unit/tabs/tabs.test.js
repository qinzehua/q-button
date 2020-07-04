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

describe("Tabs", () => {
  it("存在.", () => {
    expect(Tabs).to.exist;
  });

  it("可以接受 selected", done => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
        <g-tabs selected="woman">
            <g-tabs-header>
                <g-tabs-item name="woman"> 百度热榜 </g-tabs-item>
                <g-tabs-item name="finance">财经</g-tabs-item>
                <g-tabs-item name="sport">体育</g-tabs-item>
            </g-tabs-header>
        </g-tabs>
    `;
    const vm = new Vue({
      el: div
    });
    vm.$nextTick(() => {
      let x = vm.$el.querySelector(".tabs-item:nth-child(1)");
      expect(x.classList.contains("active")).to.be.true;
      done();
    });
  });

  it("可以接受 direction", () => {});
});
