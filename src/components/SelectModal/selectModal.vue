<template>
    <SelectModal @on-ok="handleOk" @on-cancel="handleCancel">
        <template v-slot:trigger="scope">
            <SelectBar
                :placeholder="placeholder.selectBar"
                @click="handleSelectBarClick(scope.toggleVisible, scope.onSelect)"
                @on-close-tag="handleCloseTag($event, scope.onSelect)"
                :selectedList="value"
            />
        </template>
        <template v-slot:searchCtrls="scope">
            <SearchCtrls
                :selectedList="scope.selectedItems"
                :modalVisible="scope.modalVisible"
                :placeholder="placeholder.searchCtrls"
                @on-select="scope.onSelect($event)"
            />
        </template>
        <template v-slot:selectedCtrls="{ selectedItems, onSelect }">
            <SelectedCtrls :selectedList="selectedItems" @on-select="onSelect($event)" />
        </template>
    </SelectModal>
</template>

<script>
    import SelectedCtrls from './selectedCtrls';
    import SearchCtrls from './searchCtrls';
    import SelectBar from './selectBar';
    import SelectModal from './modalContainer';
    export default {
        selectWrapper: true,
        model: {
            event: 'change',
            prop: 'value',
        },
        components: {
            SelectedCtrls,
            SearchCtrls,
            SelectModal,
            SelectBar,
        },
        data() {
            return {};
        },
        props: {
            // mode为选择框左侧搜索区域的展示模式
            // 值为multi时，表示展示线性多选列表
            // 值为single时，表示展示线性单选列表
            // 值为tree-multi时，表示展示多选树结构组件
            // 默认值是multi
            mode: {
                type: String,
                validator(val) {
                    return ['multi', 'single', 'tree-multi'].indexOf(val) !== -1;
                },
                default: 'multi',
            },
            // searchHandler表示获取左侧搜索区域数据源的接口
            searchHandler: {
                type: Function,
                default() {
                    return () => Promise.resolve([]);
                },
            },
            // placeholder表示配置选中结果栏和搜索栏的placeholder显示文字
            placeholder: {
                type: Object,
                default() {
                    return {
                        selectBar: '请选择项目',
                        searchCtrls: '请输入项目名称',
                    };
                },
            },
            // value是对话框确认按钮点击之后，返回的数据, 类型是[{id: string; title: string; item: object}]
            // 根据value，在对话框打开时，恢复选中项目
            value: {
                type: Array,
                default() {
                    return [];
                },
            },
            // searchMode表示输入文字进行搜索之后，
            // 取值若是async，则调用searchHandler进行搜索
            // 取值若是sync，则对seachHandler在初始化阶段返回的数据源进行本地搜索
            searchMode: {
                type: String,
                validator(val) {
                    return ['async', 'sync'].indexOf(val) !== -1;
                },
                default: 'sync',
            },
            // 搜索展示结果
            // list表示搜索结果以线性列表组件展示
            // tree-multi表示搜索结果以多选结构树组件展示
            searchResultMode: {
                type: String,
                validator(val) {
                    return ['list', 'tree-multi'].indexOf(val) !== -1;
                },
                default: 'list',
            },
            // 设置搜索结构树属性
            treeAttrs: {
                type: Object,
                default() {
                    return {};
                },
            },
            // selected ctrls title
            selectedCtrlsTitle: {
                type: String,
                default: '已选项目',
            },
        },
        methods: {
            handleSelectBarClick(toggleVisible, onSelect) {
                toggleVisible();
                // 根据已选中列表，恢复左侧选中效果
                onSelect(this.value);
            },
            handleOk(selectedItems) {
                this.$emit('change', selectedItems);
                // this.$emit('on-ok', selectedItems);
            },
            handleCloseTag(selectedItems, onSelect) {
                onSelect(selectedItems);
                this.$emit('change', selectedItems);
            },
            handleCancel(_, onSelect) {
                // 取消按钮点击的时候，恢复当前对话框展示的选中状态至操作之前
                onSelect(this.value);
            },
        },
    };
</script>

<style></style>
