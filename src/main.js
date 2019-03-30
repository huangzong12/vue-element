import Vue from 'vue';
import App from './App.vue';

import 'normalize.css'
import './assets/element.scss';
import './assets/base.scss';
import ElementUI from 'element-ui';
 import component from './common'
import draggable from './directive/draggable'

Vue.directive(draggable.name, draggable);

Vue.use(ElementUI, {size: 'mini', zIndex: 3000});

Object.values(component).forEach(item => {
  Vue.component(item.name, item);
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
