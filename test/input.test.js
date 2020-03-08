const expect = chai.expect;
import Vue from "vue";
import Input from "../src/input";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Button", () => {
  it("存在.", () => {
    expect(Input).to.exist;
  });

  describe("props", () => {
    let Constructor, vm;
    beforeEach(() => {
      Constructor = Vue.extend(Input);
    });
    afterEach(() => {
      vm.$destory();
    });

    it("接收 value", () => {
      const vm = new Constructor({
        propsData: {
          value: "1234"
        }
      }).$mount();
      const useElement = vm.$el.querySelector("input");
      expect(useElement.value).to.equal("1234");
    });

    it("接收 disabled", () => {
      const vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount();
      const useElement = vm.$el.querySelector("input");
      expect(useElement.disabled).to.equal(true);
    });

    it("接收 errormsg", () => {
      const vm = new Constructor({
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
      vm.$destory();
    });

    it("支持 change/input/focus/blur 事件", () => {
      ["change", "input", "focus", "blur"].forEach(eventName => {
        const vm = new Constructor({}).$mount();
        const callback = sinon.fake();
        vm.on(eventName, callback);
        const event = new Event(eventName);
        let inputElement = vm.$el.querySelector("input");
        inputElement.dispacthEvent(event);
        expect(callback).to.have.been.calledWith(event);
      });
    });
  });
});
