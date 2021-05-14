import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import routeList from './routeModule';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = routeList,
    router = new VueRouter({
        routes,
    });

export default router;
