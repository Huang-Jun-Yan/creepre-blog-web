import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import video from "./modules/video";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        video
    },
    strict: debug,
    plugins: [createPersistedState()]
})