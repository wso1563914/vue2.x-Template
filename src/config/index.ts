let baseUrl: string;
if (process.env.NODE_ENV === 'development') {
    // baseUrl = 'http://city.engr-z.com/'; // 代理线上环境的
    baseUrl = '/api'; // 代理线上环境的
    // baseUrl = '/mock'; // 代理mock环境的
    // baseUrl = '/mock'; // mock服务上面的
    // websocketBaseUrl = 'ws://10.34.4.105:8092';
} else if (window.location.href.includes('-st')) {
    baseUrl = 'http://city-api-st.ienjoys.com';
    // websocketBaseUrl = 'ws://10.34.4.105:8092';
} else {
    baseUrl = 'https://city-api.ienjoys.com';
    // websocketBaseUrl = 'wss://msp.ienjoys.com:9444/';
}

export default { baseUrl };
