import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import routeList from './routeModule';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = routeList,
    router = new VueRouter({
        routes,
    });

export default router;

router.afterEach(to => {
    // 设置面包屑
    store.commit('setData', {
        name: 'breadcrumb',
        val: to.meta.breadcrumb,
    });

    // 设置菜单高亮，route必须先配置对
    if (to.meta) {
        store.commit('setDatas', [
            {
                name: 'defaultTopMenu',
                val: to.meta.topRoute,
            },
            {
                name: 'defaultSidebarMenu',
                val: to.meta.besideRoute,
            },
        ]);
    }
});
