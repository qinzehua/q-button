import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Vue from 'vue';
chai.use(sinonChai);

import Uploader from '@/uploader/uploader';
import Button from '@/button';
import Icon from '@/icon';

import { mount } from '@vue/test-utils';
import http from '../../../src/http';
const delay = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

describe('Uploader', () => {
  it('Uploader 存在', () => {
    expect(Uploader).to.exist;
  });

  it('Uploader 可以上传一个文件', async () => {
    http.post = (url, optins) => {
      setTimeout(() => {
        optins.success(JSON.stringify({ id: 123 + new Date().valueOf() }));
      }, 500);
    };
    Vue.component('g-button', Button);
    Vue.component('g-icon', Icon);
    const wrapper = mount(Uploader, {
      propsData: {
        name: 'file',
        action: '/xxx',
        parseResponse(response) {
          const res = JSON.parse(response);
          return `http://localhost:3000/preview/${res.id}`;
        },
        accept: 'image/*',
        fileList: []
      },
      slots: {
        default: `<g-button id="x">上传</g-button>`
      },
      listeners: {
        'update:fileList': fileList => {
          wrapper.setProps({ fileList });
        }
      }
    });
    wrapper.find('#x').trigger('click');
    let inputWrapper = wrapper.find('input[type=file]');
    let input = inputWrapper.element;
    let file1 = new File(['xx'], 'xx.png');
    let file2 = new File(['yy'], 'yy.png');

    let data = new DataTransfer();
    data.items.add(file1);
    data.items.add(file2);
    input.files = data.files;
    //等待异步事件执行完
    await wrapper.vm.uploadFiles(input.files);

    let use = wrapper.find('use').element;
    expect(use.getAttribute('xlink:href')).to.eq('#i-loading');
    await delay(1000);
    let use1 = wrapper.find('use').element;
    expect(use1.getAttribute('xlink:href')).to.eq('#i-success');
  });
});
