import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import 'iview/dist/styles/iview.css';
import iView from 'iview';
import store from './store';
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';

// import SidebarMenu from '@/third/sidebarMenu/sidebar-menu.umd';
// import SidebarMenu from 'lib';

Vue.use(ElementUI);
Vue.use(iView);
Vue.config.productionTip = false;
// Vue.use(SidebarMenu);
// Vue.use(SidebarMenu);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
