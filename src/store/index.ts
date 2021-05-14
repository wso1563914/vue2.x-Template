import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        CancelTokenArr: '',
    },
    mutations: {
        setData(state: any, object: any): void {
            // console.log(object.name, object.val, 9999);
            state[object.name] = object.val;
        },
    },
    actions: {},
});
