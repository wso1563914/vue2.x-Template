<template>
    <div>
        scheduleIndex
        <div>
            <el-button @click="push">to Home</el-button>
        </div>
        <div>
            <el-button @click="push2">to peopleDynamics</el-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class ScheduleIndex extends Vue {
        push(): void {
            this.$router.push({ name: 'home' });
        }
        push2(): void {
            this.$router.push({ name: 'peopleDynamics' });
        }
    }
</script>

<style lang="scss"></style>
