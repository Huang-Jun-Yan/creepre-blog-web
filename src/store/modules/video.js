import { getBlogVideo } from "@/http/api";
import { getDate } from "@/util/date";
// state
const state = () => ({
    // 首页推荐video的数组
    recVideoArr: []
});
// mutations
const mutations = {
        // 添加推荐的视频
        addRecVideo(state, val) {
            state.recVideoArr = val;
        }
    }
    // actions
const actions = {
    getBlogVideoAsunc({ commit }, val) {
        return new Promise((resolve, reject) => {
            getBlogVideo(val).then(res => {
                if (res.data.code == 200) {
                    const demoData = JSON.parse(JSON.stringify(res.data));
                    // 转日期
                    demoData.data.data.map((item) => {
                        let videoTime = getDate(item.create_time);
                        item.create_time = videoTime;
                    });
                    // 截取前俩个放在首页
                    const recVideoArr = demoData.data.data.slice(0, 2);
                    commit("addRecVideo", recVideoArr);
                    resolve(demoData);
                }
            }).catch(err => {
                reject(err);
            })
        });
    }
};
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