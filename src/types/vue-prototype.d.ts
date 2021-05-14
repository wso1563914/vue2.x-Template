import { Vue } from 'vue/types/vue';
import { UrlConfig } from '../config/configTypes';
import { Utils } from '@/assets/js/utils';

declare module 'vue/types/vue' {
    interface Vue {
        $api: any;
        $utils: Utils;
        $config: UrlConfig;
        $alert: any;
        $valid: any;
        $attrs: any;
        $bus: Vue;
    }
}
