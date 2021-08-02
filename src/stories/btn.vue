<template>
    <div :class="['btn', className]" @click="onClick">
        <span>{{ name }}</span>
    </div>
</template>

<script>
    export default {
        computed: {
            className() {
                let type = this.type ? this.type : 'default',
                    typeAll = ['primary', 'default'];
                return typeAll.indexOf(type) !== -1 ? `btn_${type}` : 'btn_default';
            },
        },
        props: {
            type: {
                type: String,
                default: 'default',
                validator: function (value) {
                    return ['primary', 'default'].indexOf(value) !== -1;
                },
            },
            name: String,
        },
        methods: {
            onClick() {
                this.$emit('onClick');
            },
        },
    };
</script>

<style lang="css" scoped>
    .btn {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 12px;
        border: 1px solid #000;
    }
    .btn_default {
        border-color: rgb(159, 160, 159);
        color: rgb(206, 206, 206);
    }
    .btn_primary {
        border-color: blue;
        color: blue;
    }
</style>
