<template>
  <div id="articleDetail">
    <el-empty
      v-if="!selfArticleObj"
      description="暂时没有文章，过几天再来吧"
      :image-size="200"
    ></el-empty>
    <el-row :gutter="20" style="margin: 0.1rem 0; min-height: 6.5rem">
      <el-col :span="24">
        <div
          class="grid-content bg-purple"
          style="min-height: 6.4rem; padding: 0.05rem 0.05rem"
        >
          <el-scrollbar style="width: 100%" height="6.4rem">
            <div class="articleDetailTitle">
              <h2>
                {{ selfArticleObj.title }}
              <i class="iconfont icon-biaoti-xianxing"></i>
              </h2>
            </div>
            <div class="articleDetailLabel">
              <div class="top">
                <div class="author">
                  <p>
                    作者:<span>{{ selfArticleObj.name }}</span>
                  </p>
                </div>
                <div class="createTime">
                  <p>
                    发布时间:<span>{{ getDate(selfArticleObj.create_time) }}</span>
                  </p>
                </div>
                <div class="Label">
                  <p>
                    文章标签:
                    <el-tag size="mini" type="success">{{
                      selfArticleObj.label
                    }}</el-tag>
                  </p>
                  <p>
                    文章分类:
                    <el-tag size="mini" type="warning">{{
                      selfArticleObj.category
                    }}</el-tag>
                  </p>
                </div>
              </div>
              <div class="bottom">
                {{ selfArticleObj.brief }}ˋωˊ
                <p>
                  更新时间:<span>{{ getDate(selfArticleObj.update_time) }}</span>
                </p>
              </div>
            </div>
            <div
              class="articleDetailContent"
              v-html="selfArticleObj.content"
            ></div>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { byIdGetArticle } from "@/http/api";
import { getDate } from "@/util/date";
export default defineComponent({
  name: "CreepreBlogWebArticleDetail",
  components: {},
  setup() {
    // 路由
    const route = useRoute();
    let selfArticle = reactive({
      selfArticleObj: {},
    });
    // 通过传递的id获取
    const getArticle = async (article_id) => {
      const res = await byIdGetArticle({ article_id: article_id });
      if (res.data.code == 200) {
        const { data } = res.data;
        Object.assign(selfArticle.selfArticleObj, data);
      }
    };
    // 监听
    watch(
      () => route.params.id,
      () => {
        getArticle(route.params.id);
      }
    );
    // 挂载阶段
    onMounted(() => {
      getArticle(route.params.id);
    });
    return {
      ...toRefs(selfArticle),
      getDate,
    };
  },
});
</script>

<style lang="scss" scoped>
#articleDetail {
  background: #eeeeee;
  height: 100%;
  .el-row {
    .el-col {
      border-radius: 4px;
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
        display: flex;
        align-items: center;
        .Label {
          font-weight: bold;
          user-select: none;
        }
        .articleDetailTitle {
          min-height: 0.3rem;
          background: white;
          line-height: 0.4rem;
          letter-spacing: 0.01rem;
          margin-bottom: 0.05rem;
        }
        .articleDetailLabel {
          height: 0.5rem;
          margin-bottom: 0.05rem;
          background: white;
          .top {
            height: 50%;
            display: flex;
            align-items: center;
            .author {
              min-width: 1.1rem;
              font-size: 0.14rem;
              font-weight: bold;
              span {
                margin-left: 0.05rem;
              }
            }
            .createTime {
            }
            .Label {
              display: flex;
              margin: 0 0.1rem;
              p {
                font-size: 0.14rem;
                margin-right: 0.2rem;
              }
            }
          }
          .bottom {
            height: 50%;
            display: flex;
            align-items: center;
            p {
              min-width: 1.7rem;
              margin: 0 0.1rem;
              span {
                margin-left: 0.05rem;
              }
            }
          }
        }
        .articleDetailContent {
          min-height: 5.24rem;
          background: white;
          padding: 0.05rem 0.05rem;
        }
      }
    }
  }
}
</style>