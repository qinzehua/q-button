import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Menu from '@/menu/menu';
import MenuItem from '@/menu/menu-item';
import SubMenu from '@/menu/sub-menu';
import Icon from '@/g-icon/icon';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

describe('Menu', () => {
  it('Menu 存在', () => {
    expect(Menu).to.exist;
  });

  it('接受 selected 参数', done => {
    Vue.component('g-menu-item', MenuItem);
    Vue.component('g-sub-menu', SubMenu);
    Vue.component('g-icon', Icon);
    const wrapper = mount(Menu, {
      slots: {
        default: `
        <g-menu-item name="1">123</g-menu-item>
        <g-menu-item name="2">456</g-menu-item>
        <g-sub-menu name="s1">
          <template slot="title">有子菜单</template>
          <g-menu-item name="a">企业文化</g-menu-item>
          <g-menu-item name="b">开发团队</g-menu-item>
          <g-menu-item name="c">联系电话</g-menu-item>
          <g-sub-menu name="s2">
            <template slot="title">联系方式</template>
            <g-menu-item name="w">微信</g-menu-item>
            <g-menu-item name="q">qq</g-menu-item>
            <g-sub-menu name="s3">
              <template slot="title">手机</template>
              <g-menu-item name="m1">18380448381</g-menu-item>
              <g-menu-item name="m2">18363458382</g-menu-item>
              <g-menu-item name="m3">18380442222</g-menu-item>
            </g-sub-menu>
          </g-sub-menu>
        </g-sub-menu>
        <g-menu-item name="3">789</g-menu-item>
      `
      },
      propsData: {
        selected: ['1']
      }
    });
    setTimeout(() => {
      expect(wrapper.find('[data-name="1"].selected').exists()).to.be.true;
      done();
    });
  });

  it('会触发 update:seleted 函数', () => {
    Vue.component('g-menu-item', MenuItem);
    Vue.component('g-sub-menu', SubMenu);
    Vue.component('g-icon', Icon);
    const callback = sinon.fake();
    const wrapper = mount(Menu, {
      slots: {
        default: `
        <g-menu-item name="1">123</g-menu-item>
        <g-menu-item name="2">456</g-menu-item>
        <g-sub-menu name="s1">
          <template slot="title">有子菜单</template>
          <g-menu-item name="a">企业文化</g-menu-item>
          <g-menu-item name="b">开发团队</g-menu-item>
          <g-menu-item name="c">联系电话</g-menu-item>
          <g-sub-menu name="s2">
            <template slot="title">联系方式</template>
            <g-menu-item name="w">微信</g-menu-item>
            <g-menu-item name="q">qq</g-menu-item>
            <g-sub-menu name="s3">
              <template slot="title">手机</template>
              <g-menu-item name="m1">18380448381</g-menu-item>
              <g-menu-item name="m2">18363458382</g-menu-item>
              <g-menu-item name="m3">18380442222</g-menu-item>
            </g-sub-menu>
          </g-sub-menu>
        </g-sub-menu>
        <g-menu-item name="3">789</g-menu-item>
      `
      },
      propsData: {
        selected: ['1']
      },
      listeners: {
        'update:selected': callback
      }
    });

    wrapper.find('[data-name="2"]').trigger('click');
    expect(callback).to.have.been.calledWith(['2']);
  });
});
