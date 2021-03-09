import { createStore } from 'vuex';
import app from './module/app';
import author from './module/author';
import permission from './module/permission';
import getters from './getters';

export default createStore({
    getters,
    modules: {
        app,
        author,
        permission,
    },
});
