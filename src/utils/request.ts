import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Qs from 'qs';
import { getToken, removeToken } from './auth';
import { message } from 'ant-design-vue';
import router from '../router';
import store from '../store';

const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
        function(data) {
            data = Qs.stringify(data);
            return data;
        },
    ],
});

interface Rule {
    [key: number]: (msg: string) => {};
}
const responseCode: Rule = {
    40500: (msg: string): any => {
        message.error({
            content: msg,
            duration: 1,
        });
    },
    40300: (msg: string): any => {
        message.error({
            content: msg,
            duration: 1,
        });
    },
    40600: (msg: string): any => {
        message.error({
            content: msg,
            duration: 1,
        });
    },
    40100: (msg: string): any => {
        message.error({
            content: msg,
            duration: 1,
        });
        setTimeout(() => {
            // 登录失效清除token
            removeToken();
            router.replace('/login');
        }, 1000);
    },
    40400: (msg: string): any => {
        message.error({
            content: msg,
            duration: 1,
        });
    },
    40000: () => {
        return true;
    },
    50000: () => {
        message.error({
            content: '系统繁忙，请稍后再试',
            duration: 1,
        });
        return true;
    },
};

service.interceptors.request.use(
    config => {
        // console.log("config==", config);
        if (config.data === undefined) {
            config.data = {};
        }
        if (getToken()) {
            config.data.token = getToken();
        }
        return config;
    },
    error => {
        return Promise.reject(error).catch(reason => {
            return reason;
        });
    }
);

service.interceptors.response.use(
    (response: any) => {
        const {
            data: { code, msg },
        } = response;
        if (code !== 20000) {
            if (responseCode[code]) {
                responseCode[code](msg);
            }
            return Promise.reject(response).catch(reason => {
                return reason;
            });
        } else {
            return response.data;
        }
    },
    (error: any) => {
        let str = error.toString();
        if (str.match('Network Error')) {
            message.error({
                content: '网络异常，请检查网络！',
                duration: 1.5,
            });
            return Promise.reject(error);
        }

        //超时处理
        let config = error.config;
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) return Promise.reject(error);

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            // Reject with the error
            return Promise.reject(error);
        }

        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        let backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve('');
            }, config.retryDelay || 1);
        });

        // Return the promise in which recalls axios to retry the request
        return backoff.then(function() {
            return service(config);
        });
    }
);
interface RequestConfig extends AxiosRequestConfig {
    isLoading?: boolean;
}

const request = ({
    method = 'POST',
    url,
    data,
    isLoading = false,
    headers,
    params,
}: RequestConfig): AxiosPromise => {
    if (isLoading) {
        store.commit('app/setLoading', true);
    }
    return service({
        method,
        url,
        data,
        headers,
        params,
    });
};

export default request;
