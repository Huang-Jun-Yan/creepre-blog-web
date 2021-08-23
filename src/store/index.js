import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import video from "./modules/video";
import globalConfig from "./modules/global_config";
import game from "./modules/game";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        video,
        globalConfig,
        game
    },
    strict: debug,
    plugins: [createPersistedState()]
})