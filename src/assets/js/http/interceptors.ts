/*
 * @Author: your name
 * @Date: 2021-03-01 16:13:19
 * @LastEditTime: 2021-04-13 12:39:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \leetcodee:\Alice yang\code\citiesServices\src\assets\js\http\interceptors.ts
 */
import store from '@/store';
import router from '@/router';
import Vue from 'vue';
// import errorCode from './errorCode'

// import NProgress from 'nprogress'; // Progress 进度条
// NProgress.configure({ ease: 'ease', speed: 500 });

let v = new Vue();

export function request(config) {
    // NProgress.start();
    const isToken = (config.headers || {}).isToken === false;
    console.log((config.headers || {}).isPlatform, '(config.headers || {}).isPlatform')
    const isPlatform = (config.headers || {}).isPlatform === false;
    let token =  store.state.access_token;
    let paltform =  store.state.tenantId;
    if (token && !isToken) {
        config.headers.Authorization = 'Bearer ' + token; // token
    }
    if (paltform && !isPlatform) {
        config.headers.tenantId = paltform; // 平台id
    }
    return config;
}

export function response(res) {
    // NProgress.done();
    const status = Number(res.status) || 200;
    // const message = res.data.msg || errorCode[status] || errorCode['default'];
    const message = res.data.msg;
    let isShowErrAlert = res.config.isShowErrAlert === false ? false : true;
    if (status === 403 || status === 401) {
        store.state.CancelTokenArr.forEach(item => { // 将剩下的接口都取消
            if (item) { item(); }
        });
        v.$msgbox({
            title: '提示',
            message: '登陆过期',
            type: 'error'
        }).then(() => {
            router.replace({name: 'login'});
            store.dispatch('logout');
        });
        return;
    }
    if (status !== 200) {
        if (isShowErrAlert) {
            v.$msgbox({
                title: '错误',
                message,
                type: 'error'
            });
        }
        return Promise.reject(new Error(message));
    }
    return res;
}

export function errorFunc(error) {
    // NProgress.done();
    return Promise.reject(new Error(error));
}
