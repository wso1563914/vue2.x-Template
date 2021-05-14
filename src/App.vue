<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class App extends Vue {}
</script>
<style lang="scss">
    @import '~@/assets/css/reset.scss';
    html,
    body {
        width: 100%;
        height: 100%;
    }
    #app {
        width: 100%;
        height: 100%;
        min-height: 100%;
        background: $background;
        overflow: auto;
        .container {
            @include flexD;
            width: 100%;
            height: 100%;
            .top {
                width: 100%;
                height: 56px;
                background: #050d1c;
                font-size: 16px;
                color: #ffffff;
            }
            & > .content {
                @include flex;
                flex: 1;
                overflow: hidden;
                & > .container-right-content {
                    flex: 1;
                    @include flexD;
                    position: relative;
                    border-radius: 2px;
                    margin: 16px;
                    box-sizing: border-box;
                    background: #ffffff;
                    &.no-margin {
                        width: 100%;
                        margin: 0;
                    }
                    .slide-button {
                        width: 10px;
                        height: 80px;
                        background: #ffffff;
                        border-radius: 0 10px 10px 0;
                        position: absolute;
                        left: -16px;
                        top: 50%;
                        margin-top: -40px;
                        cursor: pointer;
                        @include flex(center, center);
                        .el-icon-arrow-left {
                            transition: all 0.1s;
                            color: $secondary-text;
                            font-size: 16px;
                            font-weight: bold;
                            &.isRotate {
                                transform: rotate(180deg);
                            }
                        }
                    }
                    .router-wr {
                        height: 100%;
                        overflow: auto;
                    }
                }
            }
        }
    }
</style>
