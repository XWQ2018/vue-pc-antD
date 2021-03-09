import loginApi from '../../api/login';
import { getToken, setToken, removeToken } from '../../utils/auth';
import { ActionContext } from 'vuex';
import router from '../../router';
import store from '../../store';
export interface userRule {
    username: string;
    password: string;
}

export interface State {
    token: string;
}

export default {
    namespaced: true,
    state: {
        token: getToken(),
    },
    mutations: {
        SET_TOKEN(state: State, payload: any) {
            state.token = payload;
        },
        REMOVE_TOKEN(state: State, payload: any) {
            state.token = '';
        },
    },
    actions: {
        Login({ commit }: ActionContext<userRule, userRule>, userInfo: userRule) {
            return new Promise((resolve, reject) => {
                loginApi
                    .login(userInfo)
                    .then(response => {
                        let { code, data } = response;
                        if (code == 20000) {
                            setToken(data.token);
                            commit('SET_TOKEN', data.token);
                            store.commit('app/setLoading', false);
                            setTimeout(() => {
                                router.replace('/');
                            }, 200);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    },
};
