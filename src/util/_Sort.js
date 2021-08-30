/**
 * @param {排序}
 * @param {Array} 数组
 */
export const _Sort = (arr) => {
    return arr.sort((a, b) => {
        return b.gameScore - a.gameScore;
    });
};