import { expect } from "chai";

import PopOver from "@/popover/popover";
import { mount } from "@vue/test-utils";

describe("PopOver", () => {
  it("PopOver 存在", () => {
    expect(PopOver).to.exist;
  });

  it("可以设置position", async () => {
    const wrapper = mount(PopOver, {
      propsData: {
        position: "top"
      },
      slots: {
        default: { template: `<button>点点点</button>` },
        content: "<div>显示内容</div>"
      }
    });
    await wrapper.find("button").trigger("click");
    let classes = wrapper.find(".content-wrapper").classes();
    expect(classes).to.include("position-top");
  });

  it("可以设置trigger", async () => {
    const wrapper = mount(PopOver, {
      propsData: {
        trigger: "hover"
      },
      slots: {
        default: { template: `<button>点点点</button>` },
        content: "<div>显示内容</div>"
      }
    });
    await wrapper.find(".popover").trigger("mouseenter");
    let cw = wrapper.find(".content-wrapper");
    expect(cw).to.exist;

    await wrapper.find(".popover").trigger("mouseleave");
    cw = wrapper.find(".content-wrapper");
    expect(cw.element).to.not.exist;
  });
});
