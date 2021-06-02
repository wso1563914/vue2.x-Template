<template>
    <div class="home">
        <i-button @click="show">Click me!</i-button>
        <i-button @click="handleHere">Click here!</i-button>
        <select-modal
            v-model="selectedItems"
            mode="tree-multi"
            searchResultMode="tree-multi"
            searchMode="async"
            :treeAttrs="treeAttrs"
            :searchHandler="getSkillList"
            :placeholder="placeholder"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    // import { SelectModal } from 'gem-select-modal';
    import { SelectModal } from '@/components/SelectModal';
    import axios from 'axios';
    import { normalizeTree } from './treeNodeMapper';
    const netCtx = axios.create({
        baseURL: 'http://10.243.19.215:8415',
    });
    const toMenuName = dataItem => dataItem.typeName || dataItem.name;
    const toChildren = dataItem => dataItem.skillEntityList;
    const toNodeKey = dataItem => dataItem.typeCode + (dataItem.name ? dataItem.name : dataItem.typeName);
    @Component({
        components: {
            SelectModal,
        },
    })
    export default class Home extends Vue {
        value = [20, 50];
        // hello = {};
        selectedItems = [];
        show(): void {
            this.$router.push({ name: 'personnelTrack' });
        }
        placeholder = {
            selectBar: '请选择技能',
            searchCtrls: '请输入关键字搜索',
        };
        treeAttrs = {

        };
        handleHere(): void {}
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
                // console.log('skill menus ---', nextData);
                // if (keyword) {
                //     return Promise.resolve(nextData);
                // }
                return Promise.resolve(nextData);
            });
            // return [];
        }
    }
</script>
