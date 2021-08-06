import Vue from 'vue';
import VueRouter from 'vue-router';

import roue from './route.config';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: roue,
});

export default router;
