
/**
 * @Description: 日期格式化
 * @Param: 
 * @Author: xwq
 * @Date: 2021-04-02 13:18:04
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return {*}
 * @param {Date} date
 * @param {string} forMate
 */
export function dateFormate(date: Date, forMate: string = 'YYYY-MM-dd') {
    const fn =  (i: string | number): string=> {
        return (i < 10 ? '0' : '') + i;
    };
    return forMate.replace(/YYYY|MM|dd|HH|mm|ss/g, function (a: string): string {
        let result = '';
        switch (a) {
            case 'YYYY':
                result = fn(date.getFullYear());
            case 'MM':
                result = fn(date.getMonth() + 1);
            case 'dd':
                result = fn(date.getDate());
            case 'mm':
                result = fn(date.getMinutes());
            case 'HH':
                result = fn(date.getHours());
            case 'ss':
                result = fn(date.getSeconds());
        }
        return result;
    });
}