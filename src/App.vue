<template>
    <div id="app" :class="{ 'is-component': isComponent }">
        <main-header></main-header>
        <div class="main-cnt">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class App extends Vue {
        get isComponent() {
            return /^component-/.test(this.$route.name || '');
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/css/reset.scss';
</style>
