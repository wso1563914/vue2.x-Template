<template>
    <div class="home">
        <i-button @click="show">Click me!</i-button>
        <i-button @click="handleHere">Click here!</i-button>
        <SelectModalDemo />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    // import { SelectModal } from 'gem-select-modal';
    import SelectModalDemo from './SelectModalDemo';
    @Component({
        components: {
            SelectModalDemo
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
        treeAttrs = {};
        handleHere(): void {}
    }
</script>
