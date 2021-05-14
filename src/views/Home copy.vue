<template>
    <div class="home">
        <!-- <SuperForm :formData="formData" :renderFormItem="formItems"></SuperForm> -->
    </div>
</template>

<script lang="ts">
    // import { SuperForm } from 'publib/SuperForm';
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            // SuperForm,
        },
    })
    export default class Home extends Vue {
        formData: any = {};
        formItems: any = [
            {
                type: 'input',
                key: 'aa',
                label: '安安安',
            },
        ];
    }
</script>
