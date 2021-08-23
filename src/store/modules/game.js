// state
const state = () => ({
    // 贪吃蛇分数
    greedySnakeScore: 0
});
//mutations
const mutations = {
    handleChangeGreedySnakeScore(state, payload) {
        if (payload == 0) {
            state.greedySnakeScore = payload;
        } else {
            state.greedySnakeScore += payload;
        }

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