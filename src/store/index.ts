import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface setDataItem {
    name: string;
    val: any;
}

export default new Vuex.Store({
    state: {
        defaultTopMenu: 'home',
        defaultSidebarMenu: '',
        defaultSidebarMenuItem: [],
        CancelTokenArr: [],
    },
    mutations: {
        setData(state: any, object: setDataItem): void {
            state[object.name] = object.val;
        },
        setDatas(state: any, arr: setDataItem[]): void {
            arr.forEach(item => {
                state[item.name] = item.val;
            });
        },
    },
});
