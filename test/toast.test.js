import Vue from "vue";
import Toast from "../src/toast/toast";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Toast 测试", () => {
  it("存在.", () => {
    expect(Toast).to.exist;
  });

  describe("props", () => {
    it("接受 autoClose", done => {
      let div = document.createElement("div");
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          autoClose: 1
        }
      }).$mount(div);

      vm.$on("close", () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
    });

    it("接受 closeBtn", () => {
      const callback = sinon.fake();
      let div = document.createElement("div");
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          closeBtn: {
            text: "关闭",
            callback
          }
        }
      }).$mount();

      let closeBtn = vm.$el.querySelector(".close");
      expect(closeBtn.textContent.trim()).to.eq("关闭");
      closeBtn.click();
      expect(callback).to.have.been.called;
    });

    it("接受 enabledHtml", () => {
      let div = document.createElement("div");
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          enabledHtml: true
        }
      });
      vm.$slots.default = ["<strong>hi</strong>"];
      vm.$mount();
      expect(vm.$el.querySelector(".message strong")).to.exist;
    });

    it("接受 position", () => {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          position: "bottom"
        }
      }).$mount();
      expect(vm.$el.classList.contains("position-bottom")).to.eq(true);
    });
  });
});
