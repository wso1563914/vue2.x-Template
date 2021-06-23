<template>
    <div class="select-modal">
        <div class="selected-items">
            <slot name="trigger" v-bind="{ selectedItems, toggleVisible, onSelect: this.handleSelectChange }" />
        </div>
        <el-dialog class="select-dialog" width="1000px" :visible.sync="visible" :show-close="false" v-bind="dialogAttrs">
            <template v-slot:title>
                <p class="title">{{ title }}<i class="el-icon-close" @click="handleCancel"></i></p>
            </template>
            <slot name="searchCtrls" v-bind="{ selectedItems, onSelect: this.handleSelectChange, modalVisible: visible }" />
            <div class="selected-ctrls">
                <slot name="selectedCtrls" v-bind="{ selectedItems, onSelect: this.handleSelectChange }" />
                <div class="footer">
                    <el-button @click="handleCancel">{{ cancelText }}</el-button>
                    <el-button type="primary" @click="handleConfirm">{{ okText }}</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'change',
        },
        data() {
            return {
                visible: false,
                selectedItems: [],
            };
        },
        props: {
            title: {
                type: String,
                default: '请选择',
            },
            cancelText: {
                type: String,
                default: '取消',
            },
            okText: {
                type: String,
                default: '确定',
            },
            value: {
                type: Array,
                default() {
                    return [];
                },
            },
            searchHandler: {
                type: Function,
                default() {
                    return () => Promise.resolve([]);
                },
            },
            dialogAttrs: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        methods: {
            // selectedItems: {id: string; title: string; item: object}
            handleSelectChange(selectedItems) {
                this.selectedItems = selectedItems;
                this.$emit('change', this.selectedItems);
            },
            toggleVisible() {
                this.visible = !this.visible;
            },
            handleConfirm() {
                this.visible = false;
                this.$emit('on-ok', this.selectedItems);
            },
            handleCancel() {
                this.visible = false;
                this.$emit('on-cancel', this.selectedItems, this.handleSelectChange);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .select-modal {
        display: inline-block;
        vertical-align: middle;
        width: 200px;
    }
    .selected-items {
    }
    .selected-ctrls {
        flex: 1;
        overflow: auto;
        align-self: stretch;
        position: relative;
        // height: 520px;
    }
    .footer {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .search-ctrls {
    }
    .select-dialog {
        ::v-deep .el-dialog {
            border-radius: 4px;
        }
        ::v-deep .el-dialog__header {
            padding: 0;
            border-radius: 4px 4px 0 0;
            height: auto;
        }
        ::v-deep .el-dialog__body {
            padding: 0 20px;
            padding-bottom: 20px;
            border-radius: 0 0 4px 4px;
            display: flex;
            justify-content: space-between;
            min-height: 550px;
        }
        ::v-deep .el-icon-close {
            cursor: pointer;
        }
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #61677a;
        margin-bottom: 20px;
        background: #f5f7f9;
        border-radius: 4px 4px 0 0;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
    }
</style>
