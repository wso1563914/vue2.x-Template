<template>
    <div class="home">
        <i-button @click="show">Click me!</i-button>
        <i-button @click="handleHere">Click here!</i-button>
        <select-modal v-model="selectedItems"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { SelectModal } from 'gem-select-modal';

    @Component({
        components: {
            SelectModal
        },
    })
    export default class Home extends Vue {
        value = [20, 50];
        // hello = {};
        selectedItems = [];
        show(): void {
            this.$router.push({ name: 'personnelTrack' });
        }
        handleHere(): void {

        }
    }
</script>
