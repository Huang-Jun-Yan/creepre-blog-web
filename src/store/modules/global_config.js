// state
const state = () => ({
    // 白天晚上切换
    backgroundTab: true
});
//mutations
const mutations = {
    handleChange(state) {
        state.backgroundTab = !state.backgroundTab;
    }
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