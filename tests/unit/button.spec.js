import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Button from '@/button';
import { mount } from '@vue/test-utils';

describe('Button', () => {
  it('Button 存在', () => {
    expect(Button).to.exist;
  });

  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    });
    const useElement = wrapper.find('use');
    expect(useElement.attributes().href).to.equal('#i-settings');
  });

  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        loading: true
      }
    });
    const useElements = wrapper.find('use');
    expect(useElements.attributes().href).to.equal('#i-loading');
  });

  it('icon 默认的 order 是 1', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    });
    const buttonClassName = wrapper.classes();
    expect(buttonClassName).to.contains('icon-left');
  });

  it('设置 iconPosition 可以改变 order', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    });
    const buttonClassName = wrapper.classes();
    expect(buttonClassName).to.contains('icon-right');
  });

  it('点击 button 触发 click 事件', () => {
    const wrappe = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    });
    const vm = wrappe.vm;
    const callback = sinon.fake();
    vm.$on('click', callback);
    vm.$el.click();
    expect(callback).to.have.been.called;
  });
});
