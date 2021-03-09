import requestApi from '../utils/request';
export default {
    login(params: { username: string, password: string }): any {
        return requestApi({
            url: '/JnsXh/Guest/merchantLogin',
            data: params,
            isLoading: true,
        });
    },
};
