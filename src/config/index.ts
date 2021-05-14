let baseUrl: string,
    fileUrl: string,
    adminArr = [
        'geofencePolygonStaff',
        'geofencePolylineStaff',
        'staffInfo',
        'staff',
        'oss',
        'index',
        'staffPost',
        'geofencePolygon',
        'geofencePolyline',
        'platformProfile',
        'schedule',
        'message',
        'deviceInfo',
        'staffDept',
        'notice',
    ],
    upmsArr = [
        'selector',
        'token',
        'dict',
        'client',
        'platform',
        'log',
        'user',
        'dept',
        'menu',
        'addProject',
        'getProject',
        'getProjectNum',
        'modifyProject',
        'queryProjectList',
        'removeProject',
        'role',
    ];
if (process.env.NODE_ENV === 'development') {
    // baseUrl = 'http://city.engr-z.com/'; // 代理线上环境的
    baseUrl = '/api'; // 代理线上环境的
    // baseUrl = '/mock'; // 代理mock环境的
    fileUrl = 'http://csfwoss.oss-cn-shenzhen.aliyuncs.com/test/template/excel/';
    // baseUrl = '/mock'; // mock服务上面的
    // websocketBaseUrl = 'ws://10.34.4.105:8092';
} else if (window.location.href.includes('-st')) {
    baseUrl = 'http://city-api-st.ienjoys.com';
    fileUrl = 'http://csfwoss.oss-cn-shenzhen.aliyuncs.com/test/template/excel/';
    // websocketBaseUrl = 'ws://10.34.4.105:8092';
} else {
    baseUrl = 'https://city-api.ienjoys.com';
    fileUrl = 'https://csfwoss.oss-cn-shenzhen.aliyuncs.com/pron/template/excel/';
    // websocketBaseUrl = 'wss://msp.ienjoys.com:9444/';
}

export default { baseUrl, adminArr, upmsArr, fileUrl };
