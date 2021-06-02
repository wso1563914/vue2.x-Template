<template>
    <select-modal
        v-model="selectedItems"
        mode="tree-multi"
        searchResultMode="tree-multi"
        searchMode="async"
        :treeAttrs="treeAttrs"
        :searchHandler="getSkillList"
        :placeholder="placeholder"
    />
</template>
<script lang="ts">
    import Vue from 'vue';
    import { SelectModal } from '@/components/SelectModal';
    import axios from 'axios';
    import { normalizeTree } from './treeNodeMapper';
    const netCtx = axios.create({
        baseURL: 'http://10.243.19.215:8415',
    });
    const toMenuName = dataItem => dataItem.typeName || dataItem.name;
    const toChildren = dataItem => dataItem.skillEntityList;
    const toNodeKey = dataItem => dataItem.typeCode + (dataItem.name ? dataItem.name : dataItem.typeName);
    export default Vue.extend({
        components: {
            SelectModal,
        },
        data() {
            // const self = this;
            return {
                placeholder: {
                    selectBar: '请选择技能',
                    searchCtrls: '请输入关键字搜索',
                },
                treeAttrs: {
                    class: 'menu-tree-demo',
                    'check-strictly': true,
                    'render-content': (h, { data }) => {
                        // console.log('data node: ',data);
                        const isParentMenu = this.isParent(data);
                        return h('span', { class: isParentMenu ? 'parent-menu-title' : undefined }, data.title);
                    },
                },
                selectedItems: [],
            };
        },
        methods: {
            isParent(dataItem) {
                return Array.isArray(dataItem.children) && dataItem.children.length > 0;
            },
            async getSkillList(keyword) {
                const resultPromise = netCtx.request({
                    method: 'get',
                    url: '/manager/skill/list',
                    params: {
                        name: keyword,
                    },
                });
                return resultPromise.then(resp => {
                    const nextData = normalizeTree(resp.data.result, { toName: toMenuName, toChildren, toNodeKey });
                    return Promise.resolve(nextData);
                });
            },
        },
    });
</script>
<style lang="scss">
    .menu-tree-demo {
        // border: solid 1px ;
        .parent-menu-title {
            margin-left: -22px;
            position: relative;
            z-index: 1;
            background-color: #fff;
        }
    }
</style>
