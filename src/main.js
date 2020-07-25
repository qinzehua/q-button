import Vue from 'vue';
import Plugin from './toast/plugin';
import Button from './button.vue';
import Icon from './icon';
import ButtonGroup from './button-group.vue';
import Input from './input.vue';
import Row from './row.vue';
import Col from './col.vue';
import Content from './layout/content';
import Footer from './layout/footer';
import Header from './layout/header';
import Layout from './layout/layout';
import Slider from './layout/slider';
import Toast from './toast/toast';
import Tabs from './tabs/tabs';
import TabsHeader from './tabs/tabs-header';
import TabsItme from './tabs/tabs-item';
import TabsBody from './tabs/tabs-body';
import TabsPane from './tabs/tabs-pane';
import Popover from './popover/popover';
import Collapse from './collapse/collapse';
import CollapseItem from './collapse/collapse-item';
import Cascader from './cascader/cascader';
import Slides from './slides/slides';
import SlidesItem from './slides/slides-item';

import Menu from './menu/menu';
import MenuItem from './menu//menu-item';
import SubMenu from './menu/sub-menu';
import Uploader from './uploader/uploader';

Vue.component('g-icon', Icon);
Vue.component('g-button-group', ButtonGroup);
Vue.component('g-button', Button);
Vue.component('g-input', Input);
Vue.component('g-row', Row);
Vue.component('g-col', Col);
Vue.component('g-content', Content);
Vue.component('g-footer', Footer);
Vue.component('g-header', Header);
Vue.component('g-layout', Layout);
Vue.component('g-slider', Slider);
Vue.component('g-toast', Toast);
Vue.use(Plugin);

Vue.component('g-tabs', Tabs);
Vue.component('g-tabs-header', TabsHeader);
Vue.component('g-tabs-item', TabsItme);
Vue.component('g-tabs-body', TabsBody);
Vue.component('g-tabs-pane', TabsPane);
Vue.component('g-popover', Popover);
Vue.component('g-collapse', Collapse);
Vue.component('g-collapse-item', CollapseItem);
Vue.component('g-cascader', Cascader);
Vue.component('g-slides', Slides);
Vue.component('g-slides-item', SlidesItem);
Vue.component('g-menu', Menu);
Vue.component('g-menu-item', MenuItem);
Vue.component('g-sub-menu', SubMenu);
Vue.component('g-uploader', Uploader);

import Demo from './demo';

new Vue({
  render: h => h(Demo)
}).$mount('#app');
