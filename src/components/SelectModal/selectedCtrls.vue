<template>
    <div class="selected-ctrls">
        <p class="title">已选项目</p>
        <template v-if="mode === 'multi' || mode === 'tree-multi'">
            <el-checkbox
                checked
                v-for="item in selectedList"
                :key="item.id"
                @change="handleClickCheckbox(item)"
                :label="item.id"
                border
                size="medium"
                >{{ item.title }}</el-checkbox
            >
        </template>
        <template v-if="mode === 'single' && singleSelected">
            <el-radio :value="singleSelectedItem.id" :label="singleSelectedItem.id" size="medium" border>{{
                singleSelectedItem.title
            }}</el-radio>
        </template>
    </div>
</template>

<script>
    import { ParentPropsMixins } from './mixins';

    export default {
        mixins: [ParentPropsMixins],
        // watch: {
        //     selectedList: {
        //         immediate: true,
        //         handler(nextVal) {
        //             console.log('selcted items ...', nextVal);
        //         },
        //     },
        // },
        computed: {
            singleSelected() {
                return this.mode === 'single' && this.selectedList && this.selectedList.length === 1;
            },
            singleSelectedItem() {
                return this.singleSelected ? this.selectedList[0] : {};
            },
        },
        props: {
            selectedList: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        methods: {
            handleClickCheckbox(it) {
                // console.log('uncheck item ...', it);
                const nextList = this.selectedList.filter(item => item.id !== it.id);
                this.$emit('on-select', nextList);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .selected-ctrls {
        ::v-deep .el-checkbox {
            margin-right: 10px;
            margin-left: 0 !important;
            margin-bottom: 10px;
        }
    }
    .title {
        font-size: 14px;
        color: #9ea7b4;
        margin-bottom: 16px;
    }
</style>
