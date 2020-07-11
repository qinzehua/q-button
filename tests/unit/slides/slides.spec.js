import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Slides from '@/slides/slides';
import GSlidesItem from '@/slides/slides-item';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

describe('Slides', () => {
  it('Slides 存在', () => {
    expect(Slides).to.exist;
  });

  it('接受 g-slides-item组件', done => {
    Vue.component('GSlidesItem', GSlidesItem);
    const wrapper = mount(Slides, {
      slots: {
        default: `<g-slides-item name="1">
                <div class="items box1">1</div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="items box1">2</div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="items">3</div>
            </g-slides-item>`
      },
      propsData: {
        selected: '1',
        autoPlay: false
      }
    });
    setTimeout(() => {
      expect(wrapper.find('.box1').element).to.exist;
      done();
    });
  });
});
