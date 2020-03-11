const expect = chai.expect;
import Vue from "vue";
import Input from "../src/input";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Input", () => {
  it("存在.", () => {
    expect(Input).to.exist;
  });

  describe("props", () => {
    let Constructor;
    let vm;
    beforeEach(() => {
      Constructor = Vue.extend(Input);
    });
    afterEach(() => {
      vm.$destroy();
    });

    it("接收 value", () => {
      vm = new Constructor({
        propsData: {
          value: "1234"
        }
      }).$mount();
      const useElement = vm.$el.querySelector("input");
      expect(useElement.value).to.equal("1234");
    });

    it("接收 disabled", () => {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount();
      const useElement = vm.$el.querySelector("input");
      expect(useElement.disabled).to.equal(true);
    });

    it("接收 errormsg", () => {
      vm = new Constructor({
        propsData: {
          errormsg: "1222xxx"
        }
      }).$mount();
      const useElement = vm.$el.querySelector("use");
      expect(useElement.getAttribute("xlink:href")).to.equal("#i-error");
    });
  });

  describe("测试事件", () => {
    let Constructor;
    let vm;
    beforeEach(() => {
      Constructor = Vue.extend(Input);
    });
    afterEach(() => {
      vm.$destroy();
    });

    it("支持 change/input/focus/blur 事件", () => {
      vm = new Constructor({}).$mount();
      [("change", "input", "focus", "blur")].forEach(eventName => {
        const callback = sinon.fake();
        vm.$on(eventName, callback);
        const event = new Event(eventName);
        Object.defineProperty(event, "target", {
          value: { value: "hi" },
          enumerable: true
        });

        let inputElement = vm.$el.querySelector("input");
        inputElement.dispatchEvent(event);
        expect(callback).to.have.been.calledWith(event.target.value);
      });
    });
  });
});
