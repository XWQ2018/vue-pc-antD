/*
 * @Description: 全局组件注册
 * @Author: xwq
 * @Date: 2021-01-11 09:30:14
 */

function changeStr(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const requireComponent = require.context('./components/', false, /\.vue$/);
const install = (app: any) => {
    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName);
        const componentName = changeStr(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
        app.component(componentName, config.default || config);
    });
};

export default install;
