<template>
    <div class="personnel-track">
        personnelTrack
        <el-button @click="push">to ScheduleIndex</el-button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class PersonnelTrack extends Vue {
        push(): void {
            this.$router.push({ name: 'scheduleIndex' });
        }
    }
</script>

<style lang="scss">
    .personnel-track {
        background: #fff;
        height: 100%;
        padding: 16px 18px;
    }
</style>
