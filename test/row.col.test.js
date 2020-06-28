const expect = chai.expect;
import Vue from "vue";
import Row from "../src/row";
import Col from "../src/col";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Row Col", () => {
  it("存在", () => {
    expect(Row).to.exist;
  });
  it("接收 gutter 属性", done => {
    Vue.component("g-row", Row);
    Vue.component("g-col", Col);
    const div = document.createElement("div");
    div.innerHTML = `
      <g-row gutter="20">
        <g-col span="12"></g-col>
        <g-col span="12"></g-col>
      </g-row>
    `;
    const vm = new Vue({
      el: div
    });
    setTimeout(() => {
      const rows = vm.$el.querySelectorAll(".row");
      expect(rows[0].style.marginLeft).to.eq("-10px");
      expect(rows[0].style.marginRight).to.eq("-10px");
      const cols = vm.$el.querySelectorAll(".col");
      expect(cols[0].style.paddingLeft).to.eq("10px");
      expect(cols[1].style.paddingRight).to.eq("10px");
      vm.$el.remove();
      vm.$destroy();
      done();
    });
  });
});
