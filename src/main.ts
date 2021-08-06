import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/css/browser-color.css';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import 'iview/dist/styles/iview.css';
import iView from 'iview';
import store from './store';
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';
import demoBlock from './components/demo-block.vue';
import SideNav from './components/side-nav.vue';
import MainHeader from './components/header.vue';
import hljs from 'highlight.js';

Vue.use(ElementUI);
Vue.use(iView);
Vue.component('demo-block', demoBlock);
Vue.component('side-nav', SideNav);
Vue.component('main-header', MainHeader);

Vue.config.productionTip = false;

router.afterEach(() => {
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
