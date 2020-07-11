<template>
  <div>
    <div class="box">
      <br />
      <g-slides :selected.sync="slideSelted">
        <g-slides-item name="1">
          <div class="items">1</div>
        </g-slides-item>
        <g-slides-item name="2">
          <div class="items">2</div>
        </g-slides-item>
        <g-slides-item name="3">
          <div class="items">3</div>
        </g-slides-item>
      </g-slides>
    </div>
    <div class="box">
      <g-cascader
        :options.sync="options"
        :selected.sync="selectedOptions"
        :loadData="loadData"
        height="200px"
      >
        <template v-slot="dataDefalut">
          <g-button>{{
            dataDefalut.selected.length
              ? dataDefalut.selected.map(item => item.name).join('/')
              : '显示'
          }}</g-button>
        </template>
      </g-cascader>
    </div>
    <div class="box">
      <g-collapse :selected.sync="selectedItem" :single="true">
        <g-collapse-item title="标题1" name="1">内容1</g-collapse-item>
        <g-collapse-item title="标题2" name="2">内容2</g-collapse-item>
        <g-collapse-item title="标题3" name="3">内容3</g-collapse-item>
      </g-collapse>
    </div>
    <div class="box" style="overflow: hidden;">
      <g-popover position="bottom">
        <template slot="content">
          <div>
            adfasdfdsfadfasdfdsfadfasfadfasdfdsfadfasdfdsfadfasdfdsfadfasdfdsfadfasdfdsfadfasdfdsf
          </div>
        </template>
        <g-button icon="settings">点我</g-button>
      </g-popover>
      <g-popover position="top">
        <template slot="content">
          <div>popover 内容popover 内容</div>
        </template>
        <g-button :loading="true">点我</g-button>
      </g-popover>
      <g-popover position="left">
        <template slot="content">
          <div>popover r 内容popover 内容popover 内容</div>
        </template>
        <g-button>点我</g-button>
      </g-popover>
      <g-popover position="right" trigger="hover">
        <template slot="content">
          <div>popover容</div>
        </template>
        <g-button>点我</g-button>
      </g-popover>
    </div>
    <div class="box">
      <h1>Tabs</h1>
      <g-tabs :selected.sync="selectTab" direction="vertical">
        <g-tabs-header>
          <template slot="action">
            <button>设置</button>
          </template>
          <g-tabs-item name="woman" disabled> 百度热榜 </g-tabs-item>
          <g-tabs-item name="finance">财经</g-tabs-item>
          <g-tabs-item name="sport">体育</g-tabs-item>
        </g-tabs-header>
        <g-tabs-body>
          <g-tabs-pane name="woman"> 百度热榜</g-tabs-pane>
          <g-tabs-pane name="finance">财经111</g-tabs-pane>
          <g-tabs-pane name="sport">体育111</g-tabs-pane>
        </g-tabs-body>
      </g-tabs>
    </div>
    <div class="box">
      <g-input value="张三" :readonly="true"></g-input>
      <g-input value="李四" :disabled="true"></g-input>
      <g-input value="王五" @change="inputChange"></g-input>
    </div>
    <div class="box">
      <g-input v-model="message" errormsg="名字长度不能少于2"></g-input>
      <p>{{ message }}</p>
    </div>
    <div class="box">
      <g-row class="topbar" gutter="15">
        <g-col span="20" :ipad="{ span: 12 }" :narrowpc="{ span: 6 }">
          <g-row class="left" gutter="15">
            <g-col span="8"> <div class="demo-box">1</div></g-col>
            <g-col span="8"> <div class="demo-box">2</div></g-col>
            <g-col span="8"> <div class="demo-box">3</div></g-col>
          </g-row>
        </g-col>
        <g-col span="2" :ipad="{ span: 5 }" :narrowpc="{ span: 6 }">
          <div class="demo-box">1</div></g-col
        >
      </g-row>
    </div>
    <div class="box">
      <h1>Layout</h1>
      <g-layout>
        <g-slider>slider</g-slider>
        <g-layout>
          <g-header class="demo">header</g-header>
          <g-layout>
            <g-slider class="demo">slider</g-slider>
            <g-content class="demo">content</g-content>
          </g-layout>
          <g-layout>
            <g-content class="demo">content</g-content>
            <g-slider class="demo">slider</g-slider>
          </g-layout>
          <g-footer class="demo">footer</g-footer>
        </g-layout>
      </g-layout>
    </div>
    <div class="box">
      <h1>Toast</h1>
      <button @click="showToast">这是toast</button>
    </div>
  </div>
</template>

<script>
import { db } from './cascader/db.js';

function ajax(parent_id) {
  return new Promise(resolve => {
    const r = db.filter(item => {
      return item.parent_id == parent_id;
    });
    r.forEach(node => {
      if (db.filter(item => item.parent_id === node.id).length > 0) {
        node.isLeaf = false;
      } else {
        node.isLeaf = true;
      }
    });

    setTimeout(() => {
      resolve(r);
    }, 1000);
  });
}
export default {
  name: 'demo',
  data() {
    return {
      loading1: false,
      message: '孙',
      selectTab: 'sport',
      selectedItem: ['1', '2'],
      options: [],
      selectedOptions: [],
      slideSelted: '2',
      reverse: false
    };
  },
  methods: {
    inputChange(val) {
      console.log(val);
    },
    showToast() {
      this.$toast('已从之已从', {
        position: 'bottom',
        closeBtn: {
          text: '关闭',
          callback() {
            console.log('用户说他知道了');
          }
        },
        autoClose: 5,
        enabledHtml: true,
        message: 'xxxxx'
      });
    },
    yyy() {
      console.log('yyy');
    },
    async loadData({ id }, callback) {
      const r = await ajax(id);
      callback(r);
    }
  },
  async created() {
    const r = await ajax(0);
    this.options = r;
  }
};
</script>
<style>
.items {
  width: 100%;
  height: 300px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>
