import axios from 'axios';
import Vue from 'vue';
import store from '@/store';
import config from '@/config';
import { request, response, errorFunc } from './interceptors';
let v = new Vue();

// import NProgress from 'nprogress'; // Progress 进度条
// NProgress.configure({ ease: 'ease', speed: 500 });
Vue.prototype.$baseUrl = config.baseUrl;

let instance = axios.create({
    baseURL: config.baseUrl,
    timeout: 30000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
});

// http返回状态码，如果`validateStatus`返回true（或者设置成null/undefined），promise将会resolve；其他的promise将reject。
instance.defaults.validateStatus = function(status) {
    return status >= 200 && status <= 500; // 默认的
};

instance.interceptors.request.use(request, errorFunc);

// HTTP response拦截
instance.interceptors.response.use(response, errorFunc);

let http = (options: any, params: object = {}) => {
    let additionalParams = Object.assign({
        isShowErrAlert: true, // 返回错误时，是否弹窗，默认弹
    }, options);
    return new Promise( (resolve, reject) => {

        let opt: any = Object.assign({}, options);
        // 请求时在进行接口路由拼装
        config.adminArr.forEach(item => {
            if (item == (opt.url.split('/')[1])) { opt.url = 'admin' + opt.url; }
        });
        config.upmsArr.forEach(item => {
            if (item == (opt.url.split('/')[1])) { opt.url = 'upms' + opt.url; }
        });
        // get请求不使用缓存
        if (opt.method && opt.method.toUpperCase() === 'GET') {
            opt.data = opt.params;
        }
        // cancelToken
        opt.cancelToken = new axios.CancelToken(function executor(c) {
            let CancelTokenArr: any[] = [];
            store.state.CancelTokenArr.forEach(item => {
                if (item) { CancelTokenArr.push(item); }
            });
            CancelTokenArr.push(c);
            store.commit('setData', {
                name: 'CancelTokenArr',
                val: CancelTokenArr,
            });
        });
        instance(opt)
            .then((res: any) => {
                if (res.status === 200) {
                    // 针对登录接口单独处理
                    if (res.config.url.indexOf('token') !== -1) {
                        resolve(res.data);
                    } else {
                        if (res.data.code !== 0 && additionalParams.isShowErrAlert) {
                            v.$msgbox({
                                title: '提示',
                                message: res.data.msg,
                                dangerouslyUseHTMLString: true
                            });
                        }
                        resolve(res.data);
                    }
                } else {
                    if (additionalParams.isShowErrAlert) {
                        v.$alert(res.data.msg, '错误');
                    }
                    resolve(res);
                }
            })
            .catch(error => {
                console.log(error);
                // reject(error);
            });
    });
};

export default http;
