const state = {
    loading: false, //全局loading状态
};

const mutations = {
    setLoading(state, val: boolean) {
        state.loading = val;
    },
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
