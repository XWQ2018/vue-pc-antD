/*
 * @Description: 指令定义统一注册
 * @Author: xwq
 * @Date: 2021-01-09 17:52:06
 */

function changeStr(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const requireComponent = require.context('./directiveFile/', false, /\.ts$/);
const install = (app: any) => {
    requireComponent.keys().forEach(fileName => {
        console.log('fileName==', fileName);
        const config = requireComponent(fileName);
        const componentName = changeStr(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
        app.directive(componentName, config.default || config);
    });
};

export default install;
