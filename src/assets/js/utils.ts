
class Utils {
    // 时间格式化
    dateFormat = function(type: string, time: Date | string) {
        if (!time) {
            return '';
        }
        let dataArr = ['y', 'm', 'd', 'h', 'p', 's'];
        let date: any = null;
        if (typeof time === 'object') {
            date = time;
        } else if (typeof time === 'string') {
            date = new Date(time.toString().replace(/-/g, '/'));
        } else {
            date = new Date(time);
        }
        let timeObj: any = {
            y: date.getFullYear(),
            m: checkTime(date.getMonth() + 1),
            d: checkTime(date.getDate()),
            h: checkTime(date.getHours()),
            p: checkTime(date.getMinutes()),
            s: checkTime(date.getSeconds()),
        };
        let returnData = '';
        // for (let i = 0; i < type.length; i++) {
        //     const element = type[i];
        //     if (dataArr.indexOf(element) !== -1) {
        //         returnData += timeObj[element];
        //     } else {
        //         returnData += element;
        //     }
        // }
        for (const key of type) {
            if (dataArr.indexOf(key) !== -1) {
                returnData += timeObj[key];
            } else {
                returnData += key;
            }
        }
        function checkTime(time: number): string | number {
            if (time < 10) {
                return '0' + time;
            } else {
                return time;
            }
        }
        return returnData;
    };
    /**
     * 获取到昨天，今天，明天的时间
     * @param {number} addDayCount [description] -1昨天 0今天 1明天
     */
    getDateStr = function(addDayCount: number) {
        let dd = new Date();
        dd.setDate(dd.getDate() + addDayCount); // 获取addDayCount天后的日期
        let y = dd.getFullYear();
        let month: number | string = dd.getMonth() + 1; // 获取当前月份的日期
        month = month.toString();
        if (month.length == 1) {
            month = '0' + month;
        }
        let day: number | string = dd.getDate();
        day = day.toString();
        if (day.length == 1) {
            day = '0' + day;
        }
        return y + '/' + month + '/' + day;
    };
    // 时分秒转为时间戳
    timeToSec = function(time: any) {
        let s: number | string = '';
        let hour = time.split(':')[0];
        let min = time.split(':')[1];
        let sec = time.split(':')[2];

        s = Number(hour * 3600) + Number(min * 60) + Number(sec);
        return s;
    };
    // 获取当前时分秒
    getNowtime = () => {
        let d = new Date();
        let h = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
        let m = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
        let s = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
        return `${h}:${m}:${s}`;
    }
    // 获取当前年月
    getYearMonth = () => {
        let date = new Date();
        // 获取当前月份
        let nowMonth = date.getMonth() + 1;
        // 获取当前是几号
        let strDate = date.getDate();
        // 添加分隔符“-”
        let seperator = '-';
        // 最后拼接字符串，得到一个格式为(yyyy-MM)的日期
        let nowDate = date.getFullYear() + seperator + nowMonth;
        return nowDate;
    }

    /**
     * 秒转为 天小时分秒
     * @param second_time
     * @return
     */
    formatSeconds = function(second_time: any) {
        if (!second_time) {
            return '0秒';
        }
        let timeStr = parseInt(second_time, 10) + '秒';
        if (parseInt(second_time, 10) > 60) {
            let second = parseInt(second_time, 10) % 60;
            let min = parseInt(second_time / 60 + '', 10);
            timeStr = min + '分' + second + '秒';
            if (min > 60) {
                min = parseInt(second_time / 60 + '', 10) % 60;
                let hour = parseInt(
                    parseInt(second_time / 60 + '', 10) / 60 + '',
                    10
                );
                timeStr = hour + '小时' + min + '分' + second + '秒';
                if (hour > 24) {
                    hour =
                        parseInt(
                            parseInt(second_time / 60 + '', 10) / 60 + '',
                            10
                        ) % 24;
                    let day = parseInt(
                        parseInt(
                            parseInt(second_time / 60 + '', 10) / 60 + '',
                            10
                        ) /
                            24 +
                            '',
                        10
                    );
                    timeStr =
                        day + '天' + hour + '小时' + min + '分' + second + '秒';
                }
            }
        }
        return timeStr;
    };

    // 对象合并赋值，根据a对象（被赋值对象）的key值从b对象取值, defaultValue默认值
    objectAssign = function(a: object, b: object, defaultValue?: any) {
        for (const key in a) {
            if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
                a[key] = b[key] === undefined ? defaultValue : b[key];
            } else {
                if (defaultValue !== undefined) {
                    a[key] = defaultValue;
                }
            }
        }
        return a;
    };

    getNextDay(date: string): string {
        return this.dateFormat(
            'y-m-d',
            new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
        );
    }

    countdown(time: number, fn: any): Promise<any> {
        let t = time;
        let timer = -1;
        return new Promise((resolve, reject) => {
            timer = setInterval(() => {
                t--;
                if (t <= 0) {
                    clearInterval(timer);
                    resolve('');
                } else {
                    if (typeof fn === 'function') {
                        fn(t, timer);
                    }
                }
            }, 1000);
        });
    }

    // 获取本月起始和结束日期
    /**
     *
     * @param type String 第一天还是最后一天 's':第一天， 'e':最后一天
     * @param months Number 当前月份的前/后几个月
     * @param noDay Boolean 是否要天数 true: 要， false: 不要
     */
    getMonth = function(type: string, months: number, noDay: boolean = true) {
        let d = new Date();
        let year = d.getFullYear();
        let month: string | number = d.getMonth() + 1;
        let M: any = months;
        if (Math.abs(M) > 12) {
            M = M % 12;
        }
        if (M !== 0) {
            if (month + M > 12) {
                year++;
                month = (month + M) % 12;
            } else if (month + M < 1) {
                year--;
                month = 12 + month + M;
            } else {
                month = month + M;
            }
        }
        month = month < 10 ? '0' + month : month;
        let firstday = '';
        if (noDay) {
            firstday = year + '-' + month + '-' + '01';
        } else {
            firstday = year + '-' + month;
        }

        let lastday = '';
        if (
            month === '01' ||
            month === '03' ||
            month === '05' ||
            month === '07' ||
            month === '08' ||
            month === '10' ||
            month === '12'
        ) {
            if (noDay) {
                lastday = year + '-' + month + '-' + 31;
            } else {
                lastday = year + '-' + month;
            }
        } else if (month === '02') {
            if (
                (year % 4 === 0 && year % 100 !== 0) ||
                (year % 100 === 0 && year % 400 === 0)
            ) {
                if (noDay) {
                    lastday = year + '-' + month + '-' + 29;
                } else {
                    lastday = year + '-' + month;
                }
            } else {
                if (noDay) {
                    lastday = year + '-' + month + '-' + 28;
                } else {
                    lastday = year + '-' + month;
                }
            }
        } else {
            if (noDay) {
                lastday = year + '-' + month + '-' + 30;
            } else {
                lastday = year + '-' + month;
            }
        }
        let day = '';
        if (type === 's') {
            day = firstday;
        } else {
            day = lastday;
        }
        return day;
    };
    /**
     * 处理带px单位的数值
     */
    parseHeight = function(height: number | string) {
        if (typeof height === 'number') {
            return height;
        }
        if (typeof height === 'string') {
            if (/^\d+(?:px)?$/.test(height)) {
                return parseInt(height, 10);
            } else {
                return height;
            }
        }
        return null;
    };
    /**
     * 减运算
     * ps：解决浮点数相减出现多个0的问题
     */
    numSub = function(a: number, b: number) {
        if (
            (typeof a === 'number' || typeof a === 'string') &&
            (typeof b === 'number' || typeof b === 'string')
        ) {
            return (Math.round(a * 100 - b * 100) / 100).toFixed(2);
        } else {
            return 0;
        }
    };
    /**
     * 加运算
     * ps：解决浮点数相加出现多个0的问题
     */
    numAdd = function(a: number, b: number, c?: number) {
        if (typeof c === 'number') {
            return (Math.round(a * 100 + b * 100 + c * 100) / 100).toFixed(2);
        } else {
            return (Math.round(a * 100 + b * 100) / 100).toFixed(2);
        }
    };
    /**
     * 计算某日期的n月之后的日期
     * startTime: 指定日期
     * addCount: 相加月数/天数
     * dayFlag: 是否为天
     */
    getLaterDate = function(
        startTime: string,
        addCount: number,
        dayFlag: boolean = false
    ) {
        let dd: any;
        if (typeof startTime === 'object') {
            dd = startTime;
        } else {
            dd = new Date(startTime);
        }
        // 获取AddCount天、月后的日期
        if (dayFlag) {
            dd.setDate(dd.getDate() + addCount);
        } else {
            dd.setMonth(dd.getMonth() - 1 + addCount);
        }
        function timeToStr(time) {
            const Y = time.getFullYear();
            const M =
                time.getMonth() + 1 < 10
                    ? '0' + (time.getMonth() + 1)
                    : time.getMonth() + 1;
            const D =
                time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            if (dayFlag) {
                return Y + '-' + M + '-' + D;
            } else {
                return Y + '-' + M;
            }
        }
        return timeToStr(dd);
    };
    /**
     * 解决对象赋值视图无法更新的问题
     */
    objectAssignArr = function(a: object, b: object, vue: any) {
        for (const i in b) {
            if (b.hasOwnProperty(i)) {
                const item = b[i];
                vue.$set(a, i, item);
            }
        }
    };
    /**
     * 延时等待
     * fn: 条件判断函数
     * interval: 时间间隔
     */
    interval = function(fn: any, intervalTime: number = 100): Promise<any> {
        return new Promise((resolve, reject) => {
            let index = 1;
            let key = setInterval(() => {
                if (index > 30000 / intervalTime) {
                    clearInterval(key);
                    reject();
                }
                if (fn()) {
                    clearInterval(key);
                    resolve('');
                }
                index++;
            }, intervalTime);
        });
    };

    // 深拷贝 对象/数组
    deepClone(target: any) {
        // 定义检测数据类型的功能函数
        function checkedType(target: any) {
            return Object.prototype.toString.call(target).slice(8, -1);
        }
        let result: any;
        let targetType: string = checkedType(target);
        // 判断拷贝的数据类型
        if (targetType === 'Object') {
            result = {};
        } else if (targetType === 'Array') {
            result = [];
        } else {
            return target;
        }
        // 遍历目标数据
        for (const i in target) {
            if (target.hasOwnProperty(i)) {
                const value = target[i];
                if (
                    checkedType(value) === 'Object' ||
                    checkedType(value) === 'Array'
                ) {
                    result[i] = this.deepClone(value);
                } else {
                    result[i] = value;
                }
            }
        }
        return result;
    }
    // 判断对象是否是空对象
    isEmptyObject(obj: any) {
        if (JSON.stringify(obj) === '{}') {
            return true;
        } else {
            return false;
        }
    }
}

export interface UtilsInstace {
    /**
     * 时间戳格式转换
     * 参数说明： type: 年y 月m 日d 时h 分p 秒s, time: 时间
     * demo：this.$utils.dateFormat('y-m-d h:p:s', 时间); ==>> 返回格式为：2018-01-01 10:10:10
     */
    dateFormat(type: string, time: Date | string): string;
    getDateStr(addDayCount: number): string;
    /**
     * 时分秒转为时间戳
     * @param  {string} time 时间(00:00:00)
     * @return {string} 时间戳（单位：秒）
     * demo: this.$utils.timeToSec('02:00:00')
     */
    timeToSec(time: string): string;
    /**
     * 秒转为 天小时分秒
     * @param second_time
     * @return
     */
    getNowtime();
    getYearMonth();
    getLaterDate(string, number, boolean);
    formatSeconds(second_time): string;
    /**
     * 新窗口打开页面
     * vue: vue实例
     * routeParams一般为 { name: routerName, query: { param: 1 } }
     * @memberof UtilsInstace
     */
    openNewWindow(routeParams: object);
    /**
     * 对象合并赋值，少的从多的里面取值
     *
     * @param {object} a
     * @param {object} b
     * @memberof UtilsInstace
     */

    objectAssign(a: object, b: object, defaultValue?: any);
    /**
     * 获取传入日期的下一天
     *
     * @param {string} date 字符串格式的日期
     * @returns {string} 字符串格式日期
     * @memberof UtilsInstace
     */
    getNextDay(date: string): string;

    /** 倒计时 time:倒数时间， fn：倒数时间内做的事， .then()倒数结束时做的事 */
    countdown(time: number, fn: any): Promise<any>;

    /**
     * 判断是否含有权限
     */
    hasPermission(params: any): boolean;
    /*
     * 获取本月起始和结束日期
     * type为字符串类型，有两种选择，'s'代表开始,'e'代表结束，months为数字类型，0代表本月，-1代表上月，1代表下月
     */
    getMonth(type: string, months: number): string;
    parseHeight(height: number | string): any;
    numSub(a: number, b: number): number;
    numAdd(a: number, b: number, c?: number): number;
    objectAssignArr(a: object, b: object, vue: any): any;
    interval(fn: any, intervalTime: number): any;
    getEnableMdm(groupId: string): any;
    deepClone(target: any): any;
    isEmptyObject(obj: any): boolean;
}


export default new Utils();

