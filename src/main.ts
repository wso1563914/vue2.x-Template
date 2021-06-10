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

Vue.use(ElementUI);
Vue.use(iView);
Vue.config.productionTip = false;

// 在页面加载时读取sessionStorage里的状态信息
if (sessionStorage.getItem('vuexStore')) {
    let vxs: Obj = JSON.parse(sessionStorage.getItem('vuexStore') as string);
    store.replaceState(Object.assign({}, store.state, vxs));
}

// 在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener('pagehide', () => {
    window.sessionStorage.setItem('vuexStore', JSON.stringify(store.state));
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
