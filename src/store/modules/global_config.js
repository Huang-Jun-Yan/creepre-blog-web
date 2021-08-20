// state
const state = () => ({
    // 白天晚上切换
    backgroundTab: true,
    // 播放器是否隐藏
    isHidePlayer: true,
    // 侧边栏是否隐藏
    isHideAside: true
});
//mutations
const mutations = {
    handleChangeBackgroundTab(state) {
        state.backgroundTab = !state.backgroundTab;
    },
    handleChangeHidePlayer(state) {
        state.isHidePlayer = !state.isHidePlayer;
    },
    handleChangeHideAside(state) {
        state.isHideAside = !state.isHideAside;
    },
};
// getters
const actions = {};
// getters
const getters = {};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {}
}