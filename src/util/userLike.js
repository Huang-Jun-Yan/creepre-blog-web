import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
import { getLikeStarStatus, addArticleLikeStar } from "@/http/api";

/** 
 * @method 用户文章点赞
 * @param  {number} article_id
 * @param  {string} username
 */
export const userLikeStar = async(article_id, page) => {
    try {
        const res = await getLikeStarStatus({
            article_id: article_id,
            username: getStorage("blogUserInfo").username,
        });
        if (res.data.code == 200 && res.data.data[0].like_Star_status == 1) {
            addArticleLikeStar({
                username: res.data.data[0].username,
                article_id: res.data.data[0].article_id,
                like_Star_status: res.data.data[0].like_Star_status,
            }).then((res) => {
                if (res.data.code == 200) {
                    ElMessage.warning("你取消点赞,我有点难过 ≥﹏≤");
                    getBlogArticle(page);
                }
            });
        } else {
            addArticleLikeStar({
                username: getStorage("blogUserInfo").username,
                article_id: article_id,
                like_Star_status: res.data.data.like_Star_status,
            }).then((res) => {
                if (res.data.code == 200) {
                    ElMessage.success("谢谢你的赞同 ≥ω≤");
                    getBlogArticle(page);
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}