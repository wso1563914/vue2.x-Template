<template>
    <div>
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

<style lang="scss"></style>
