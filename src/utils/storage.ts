/*
 * @Description: 缓存方法
 * @Author: xwq
 * @Date: 2020-12-10 10:22:33
 */

export function get(key: string): any {
    return localStorage.getItem(key);
}

export function set(key: string, data: any): void {
    let dataInfo = '';
    if (typeof data == 'object') {
        dataInfo = JSON.stringify(data);
    } else {
        dataInfo = data ? data : '';
    }
    localStorage.setItem(key, dataInfo);
}

export function remove(key: string): void {
    localStorage.removeItem(key);
}
