<template>
    <div class="home">
        <i-button @click="show">Click me!</i-button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        value = [20, 50];

        show(): void {}
    }
</script>
