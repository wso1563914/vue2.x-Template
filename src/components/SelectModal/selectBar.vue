<template>
    <div class="select-bar" @click="handleClick">
        <span v-if="isSelectedListEmpty" class="placeholder">{{ placeholder }}</span>
        <el-tag
            size="small"
            disable-transitions
            type="info"
            @close="handleCloseTag(item)"
            closable
            v-for="item in selectedList"
            :key="item.id"
            >{{ item.title }}</el-tag
        >
        <i class="el-icon-arrow-down arrow-dropdown"></i>
    </div>
</template>

<script>
    import { ParentPropsMixins } from './mixins';
    export default {
        mixins: [ParentPropsMixins],
        props: {
            selectedList: {
                type: Array,
                default() {
                    return [];
                },
            },
            placeholder: {
                type: String,
                default: '',
            },
        },
        computed: {
            isSelectedListEmpty() {
                return this.selectedList && this.selectedList.length === 0;
            },
        },
        methods: {
            handleClick() {
                this.$emit('click');
            },
            handleCloseTag(closeItem) {
                const nextSelectedList = this.selectedList.filter(item => item.id !== closeItem.id);
                this.$emit('on-close-tag', nextSelectedList);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .select-bar {
        display: inline-block;
        position: relative;
        // align-items: center;
        width: 200px;
        height: 36px;
        line-height: 36px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border: solid 1px rgb(220, 223, 230);
        box-sizing: border-box;
        border-radius: 2px;
        // vertical-align: middle;
        ::v-deep .el-tag {
            margin-left: 4px;
            // vertical-align: middle;
        }
        .arrow-dropdown {
            position: absolute;
            height: 14px;
            width: 14px;
            margin: auto 0;
            top: 0;
            bottom: 0;
            right: 16px;
        }
    }
    .placeholder {
        display: inline-block;
        min-height: 36px;
        line-height: 36px;
        min-width: 200px;
        box-sizing: border-box;
        padding-left: 8px;
        color: rgb(158, 167, 180);
    }
</style>
