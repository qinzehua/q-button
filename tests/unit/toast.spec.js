import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
import Toast from "@/toast/toast";

describe("Toast 测试", () => {
  it("存在.", () => {
    expect(Toast).to.exist;
  });

  describe("props", () => {
    it("接受 autoClose", done => {
      const wrapper = mount(Toast, {
        propsData: {
          autoClose: 1
        }
      });
      wrapper.vm.$on("close", () => {
        expect(document.body.contains(wrapper.vm.$el)).to.eq(false);
        done();
      });
    });
    it("接受 closeBtn", async () => {
      const callback = sinon.fake();
      const wrapper = await mount(Toast, {
        propsData: {
          closeBtn: {
            text: "关闭",
            callback
          }
        }
      });
      let closeBtn = wrapper.find(".close");
      expect(closeBtn.element.textContent.trim()).to.eq("关闭");
      closeBtn.trigger("click");
      expect(callback).to.have.been.called;
    });

    it("接受 position", () => {
      const wrapper = mount(Toast, {
        propsData: {
          position: "bottom"
        }
      });
      expect(wrapper.element.classList.contains("position-bottom")).to.eq(true);
    });
  });
});
