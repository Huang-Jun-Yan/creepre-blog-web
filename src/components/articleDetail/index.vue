<template>
  <div id="articleDetail">
    <el-empty
      v-if="false"
      description="暂时没有文章，过几天再来吧"
      :image-size="200"
    ></el-empty>
    <el-scrollbar height="6.5rem">
    <div class="articleTitle">
      <h2>{{ selfArticleObj.title }}</h2>
    </div>
    <div class="articleCategory">
      <div style="min-width: 0.6rem">作者:{{ selfArticleObj.name }}</div>
      <div class="articleTime">
        <span>发布时间:{{ getDate(selfArticleObj.create_time) }}</span>
        <span>更新时间:{{ getDate(selfArticleObj.update_time) }}</span>
      </div>
      <div class="categoryAntlabel">
        <p>
          <span>文章分类:</span
          ><el-tag
            style="margin: 0 0.05rem; cursor: pointer"
            type="success"
            size="mini"
            >{{ selfArticleObj.category }}</el-tag
          >
          <span>文章标签:</span>
          <el-tag
            style="margin: 0 0.05rem; cursor: pointer"
            type="warning"
            size="mini"
            >{{ selfArticleObj.label }}</el-tag
          >
        </p>
      </div>
    </div>
    <div class="articleBrief">
      <h3>文章简介:</h3>
      <p style="box-shadow: inset 0 0 0.03rem 0.02rem #cccccc;padding: .05rem .1rem;">{{ selfArticleObj.brief }}</p>
    </div>
    <div class="container" v-html="selfArticleObj.content"></div>
    </el-scrollbar>
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
  min-height: 6.5rem;
  background: #eeeeee;
  .articleTitle {
    padding-left: 0.3rem;
    user-select: none;
    h2 {
      height: 0.6rem;
      line-height: 0.6rem;
    }
  }
  .articleCategory {
    height: 0.5rem;
    background: #eeeeee;
    padding: 0 0.1rem;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 0.03rem 0.02rem #cccccc;
    margin-bottom: 0.1rem;
    .categoryAntlabel {
      margin-left: 0.1rem;
      p {
        span {
          font-size: 0.13rem;
        }
      }
    }
  }
  .articleBrief {
    min-height: 0.4rem;
    margin-bottom: .1rem;
    h3 {
      margin-bottom: 0.05rem;
      user-select: none;
    }
  }
  .container {
    min-height: 4.75rem;
    border-radius: 0.05rem;
    margin: 0 0.1rem;
  }
}
</style>