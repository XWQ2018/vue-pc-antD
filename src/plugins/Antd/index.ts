/*
 * @Description: ant-design-vue 全局UI组件注册
 * @Author: xwq
 * @Date: 2021-01-11 10:07:05
 */

import {
    Button,
    Input,
    Steps,
    Form,
    Select,
    Row,
    Radio,
    DatePicker,
    Col,
    Icon,
    Checkbox,
    Switch,
    Layout,
    Breadcrumb,
    Menu,
    Avatar,
    Dropdown,
    Spin,
} from 'ant-design-vue';

const ant = {
    install(app: any) {
        app.use(Button);
        app.use(Input);
        app.use(Steps);
        app.use(Form);
        app.use(Select);
        app.use(Row);
        app.use(Radio);
        app.use(DatePicker);
        app.use(Col);
        app.use(Icon);
        app.use(Checkbox);
        app.use(Switch);
        app.use(Layout);
        app.use(Breadcrumb);
        app.use(Menu);
        app.use(Avatar);
        app.use(Dropdown);
        app.use(Spin);
    },
};
export default ant;
