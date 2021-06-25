<template>
    <div class="search-ctrls">
        <el-input
            class="search-input"
            :placeholder="placeholder"
            v-on:keyup.native.enter="handleSearch"
            v-on:click.native.stop
            @clear="handleInputClear"
            v-model="searchText"
            clearable
            prefix-icon="el-icon-search"
        />
        <div v-if="showResults" class="search-result" ref="searchResultRef">
            <ul v-if="!isSearchResultsEmpty && parentProps.searchResultMode === 'list'" @click="handleClickSearchItem">
                <li
                    v-for="item in searchResults"
                    :data-itemkey="item.id"
                    :key="item.id"
                    class="search-item"
                    :class="{ 'search-selected': checkedList.indexOf(item.id) !== -1 }"
                >
                    {{ item.title }}
                </li>
            </ul>
            <div v-if="parentProps.searchResultMode === 'tree-multi'">
                <el-tree
                    ref="resTreeMultiRef"
                    :props="treeProps"
                    :data="searchResults"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="checkedList"
                    @check-change="handleClickSearchItem"
                    v-bind="parentProps.treeAttrs"
                ></el-tree>
            </div>
        </div>
        <div class="select-list">
            <el-checkbox-group size="small" :value="checkedList" v-if="mode === 'multi'">
                <el-checkbox v-for="item in dataSource" @change="handleCheckChange(item)" :label="item.id" :key="item.id">{{
                    item.title
                }}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group :value="checkedList[0]" v-if="mode === 'single'">
                <el-radio v-for="item in dataSource" @change="handleSingleChange(item)" :key="item.id" :label="item.id">{{
                    item.title
                }}</el-radio>
            </el-radio-group>
            <div class="tree-list">
                <el-tree
                    v-if="mode === 'tree-multi'"
                    ref="treeMultiRef"
                    :props="treeProps"
                    :data="dataSource"
                    @check-change="handleNodeCheck"
                    show-checkbox
                    node-key="id"
                    v-bind="parentProps.treeAttrs"
                ></el-tree>
            </div>
        </div>
    </div>
</template>

<script>
    import { ParentPropsMixins } from './mixins';
    export default {
        mixins: [ParentPropsMixins],
        data() {
            return {
                dataSource: [],
                searchText: '',
                searchResults: [],
                showResults: false,
                // checkedList: [],
            };
        },
        computed: {
            checkedList() {
                return this.selectedList ? this.selectedList.map(item => item.id) : [];
            },
            isSearchResultsEmpty() {
                return this.searchResults && this.searchResults.length === 0;
            },
            treeProps() {
                return {
                    label: 'title',
                    children: 'children',
                };
            },
        },
        props: {
            placeholder: {
                type: String,
                default: '',
            },
            modalVisible: {
                type: Boolean,
                default: false,
            },
            selectedList: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        watch: {
            modalVisible: {
                immediate: true,
                handler(nextVal) {
                    if (nextVal) {
                        // init dataSource
                        this.getDataSource();
                        this.initClickEvents();
                    } else {
                        this.removeClickEvents();
                    }
                },
            },
            // 同步结构树的选择结果
            selectedList: {
                immediate: true,
                handler(nextVal) {
                    const checkedKeys = Array.isArray(nextVal) ? nextVal.map(item => item.id) : [];
                    if (this.mode === 'tree-multi') {
                        const { treeMultiRef } = this.$refs;
                        if (treeMultiRef) {
                            treeMultiRef.setCheckedKeys(checkedKeys);
                        }
                    }
                },
            },
        },
        methods: {
            handleNodeCheck() {
                // let nextSelectedItems = [];
                const currentCheckedItems = this.$refs.treeMultiRef.getCheckedNodes();
                this.$emit('on-select', currentCheckedItems);
            },
            getDataSource() {
                const searchHandler = this.parentProps.searchHandler;
                if (searchHandler) {
                    const handlerPromise = searchHandler();
                    if (handlerPromise && handlerPromise.then) {
                        handlerPromise.then(data => {
                            // console.log('data source --- ', data);
                            if (data && data.flatSource) {
                                this.dataSource = data.data;
                                this.resetSelectedItems(data.flatSource());
                                return;
                            }
                            this.dataSource = data;
                            this.resetSelectedItems(data);
                        });
                    }
                }
            },
            resetSelectedItems(nextDataSource) {
                if (Array.isArray(this.checkedList) && this.checkedList.length > 0) {
                    // checkedList中的数据表示数据源dataSourece选中项的id集合，如果数据源dataSource被更换，checkedList（存放上一个dataSource的选中数据）需要被清除
                    const flag = nextDataSource.some(item => this.checkedList.indexOf(item.id) !== -1);
                    if (!flag) {
                        this.$emit('on-select', []);
                    }
                }
            },
            async handleSearch() {
                const searchMode = this.parentProps.searchMode;
                const searchHandler = this.parentProps.searchHandler;
                if (searchMode === 'sync') {
                    const results = this.dataSource.filter(item => item.title && item.title.indexOf(this.searchText) !== -1);
                    // console.log('search results ---', results);
                    this.searchResults = results;
                } else if (searchMode === 'async' && searchHandler) {
                    const result = await searchHandler(this.searchText);
                    if (result && result.flatSource) {
                        this.searchResults = result.data;
                    }
                }
                this.showResults = true;

                this.$nextTick(() => {
                    this.oldSelectedList = []; // 存储选择的旧值
                    let currentKey = this.$refs.resTreeMultiRef.getCheckedKeys() || [];
                    if (currentKey.length != this.checkedList.length) {
                        // 之前选中的值不在搜索列表中
                        for (let checkedId of this.checkedList) {
                            if (currentKey.indexOf(checkedId) == -1) {
                                this.oldSelectedList.push(...this.selectedList.filter(item => item.id == checkedId));
                            }
                        }
                    }
                });
            },
            handleCheckChange(nextItem) {
                // console.log('next checked items ---',items);
                let nextList = [];
                if (this.checkedList.indexOf(nextItem.id) !== -1) {
                    nextList = this.selectedList.filter(item => item.id !== nextItem.id);
                } else {
                    nextList = this.selectedList.concat(nextItem);
                }
                // console.log('checked --', this.checkedList, ' next --', nextList, ' selected list --', this.selectedList);
                this.$emit('on-select', nextList);
            },
            handleSingleChange(nextItem) {
                this.$emit('on-select', [nextItem]);
            },
            handleInputClear() {
                this.showResults = false;
                this.searchResults = [];
            },
            handleClickSearchItem(e) {
                const searchResultMode = this.parentProps.searchResultMode;
                if (searchResultMode === 'list') {
                    const { itemkey } = e.target.dataset;
                    // console.log(e.target.dataset.itemkey);
                    const [selectedItem] = this.dataSource.filter(item => item.id === itemkey);
                    if (selectedItem && this.mode === 'multi') {
                        this.handleCheckChange(selectedItem);
                    }
                    if (selectedItem && this.mode === 'single') {
                        this.handleSingleChange(selectedItem);
                    }
                } else if (searchResultMode === 'tree-multi') {
                    const checkedItems = this.$refs.resTreeMultiRef.getCheckedNodes();

                    this.$emit('on-select', this.oldSelectedList.concat(checkedItems));
                }
            },
            handleOutsideClickClose(env) {
                const searchResultRef = this.$refs.searchResultRef;
                if (searchResultRef) {
                    const rect = searchResultRef.getBoundingClientRect();
                    const { x, y, width, height } = rect;
                    const { clientX, clientY } = env;
                    // if (!(x < clientX && clientX < x + width && y < clientY && clientY < y + height)) {
                    //     this.showResults = false;
                    // }
                    this.showResults = x < clientX && clientX < x + width && y < clientY && clientY < y + height;
                }
            },
            initClickEvents() {
                document.addEventListener('click', this.handleOutsideClickClose);
            },
            removeClickEvents() {
                document.removeEventListener('click', this.handleOutsideClickClose);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .search-ctrls {
        width: 320px;
        margin-right: 25px;
        position: relative;
        ::v-deep .el-checkbox {
            display: block;
        }
        ::v-deep .el-radio {
            display: block;
            margin: 4px 0;
            &:first-child {
                margin: 0;
            }
        }
    }
    .search-input {
        width: 100%;
        margin-bottom: 8px;
    }
    .select-list {
        height: 430px;
        overflow: auto;
        padding: 16px;
        background: #f5f7f9;
        border-radius: 4px;
    }
    .search-result {
        position: absolute;
        z-index: 100;
        top: 40px;
        width: 100%;
        max-height: 400px;
        min-height: 36px;
        overflow: auto;
        padding: 16px;
        background: #fff;
        border: 1px solid #f5f7f9;
        box-shadow: 0 4px 8px 0 #d7dde4;
        box-sizing: border-box;
    }
    .search-item {
        margin: 8px 0;
        padding: 6px;
        cursor: pointer;
        &:first-child {
            margin-top: 0;
        }
    }
    .search-selected {
        background-color: rgb(236, 245, 255);
    }
    .tree-list {
        height: 100%;
        background-color: #fff;
        padding-top: 8px;
        ::v-deep .el-tree-node__content:hover {
            background-color: #fff;
        }
    }
</style>
