import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directiveInstall from '@/directive';
import highComponentInstall from '@/highComponent';
import antD from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@assets/css/reset.css';
import '@assets/css/common.css';

console.log('env==', process.env);

import { getToken } from '@/utils/auth';

router.beforeEach((to, from, next) => {
    const { path } = to;
    if (to.matched.length === 0) {
        next({ name: 'notFound' });
        return;
    }
    if (path != '/login' && !getToken()) next({ name: 'login' });
    else next();
});

const app = createApp(App);
directiveInstall(app); //全局指令注册
highComponentInstall(app); //全局组件注册
app.provide('loading', '0');
app.config.globalProperties.$globInfo = {
    test: '定义全局变量',
};
app.use(store)
    .use(router)
    .use(antD)
    .mount('#app');
