import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { mount } from "@vue/test-utils";
chai.use(sinonChai);
import Input from "@/input";

describe("Input", () => {
  it("存在.", () => {
    expect(Input).to.exist;
  });

  describe("props", () => {
    it("接收 value", () => {
      const wrapper = mount(Input, {
        propsData: {
          value: "1234"
        }
      });
      const useElement = wrapper.find("input").element;
      expect(useElement.value).to.equal("1234");
    });

    it("接收 disabled", () => {
      const wrapper = mount(Input, {
        propsData: {
          disabled: true
        }
      });
      const useElement = wrapper.find("input");
      expect(useElement.element.disabled).to.equal(true);
    });

    it("接收 errormsg", () => {
      const wrapper = mount(Input, {
        propsData: {
          errormsg: "1222xxx"
        }
      });
      const useElement = wrapper.find("use");
      expect(useElement.attributes().href).to.equal("#i-error");
    });
  });

  describe("测试事件", () => {
    it("支持 change/input/focus/blur 事件", () => {
      const wrapper = mount(Input);
      const vm = wrapper.vm;
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
