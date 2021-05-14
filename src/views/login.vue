<template>
    <div>
        登录
        <el-button type="primary" @click="login">登录</el-button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class Login extends Vue {
        login(): void {
            this.$router.push({ name: 'home' });
        }
    }
</script>

<style lang="scss"></style>
