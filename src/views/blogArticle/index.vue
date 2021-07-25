<template>
  <div id="blogArticle">
      <el-row :gutter="20" style="margin: 0.1rem 0; min-height: 5.8rem">
        <el-col :span="24">
          <div
            class="grid-content bg-purple"
            style="min-height: 5.4rem; padding: 0.05rem 0.05rem"
          >
            <el-scrollbar style="width: 100%" height="5.4rem">
              <div class="articleDetailTitle">
                <h2>
                  {{ ArticleList.title
                  }}<i class="iconfont icon-biaoti-xianxing"></i>
                </h2>
              </div>
              <div class="articleDetailLabel">
                <div class="top">
                  <div class="author">
                    <p>
                      作者:<span>{{ ArticleList.name }}</span>
                    </p>
                  </div>
                  <div class="createTime">
                    <p>
                      发布时间:<span>{{
                        getDate(ArticleList.create_time)
                      }}</span>
                    </p>
                  </div>
                  <div class="Label">
                    <p>
                      文章标签:
                      <el-tag size="mini" type="success">{{
                        ArticleList.label
                      }}</el-tag>
                    </p>
                    <p>
                      文章分类:
                      <el-tag size="mini" type="warning">{{
                        ArticleList.category
                      }}</el-tag>
                    </p>
                  </div>
                </div>
                <div class="bottom">
                  {{ ArticleList.brief }}ˋωˊ
                  <p>
                    更新时间:<span>{{ getDate(ArticleList.update_time) }}</span>
                  </p>
                </div>
              </div>
              <div
                class="articleDetailContent"
                v-html="ArticleList.content"
              ></div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    <div class="pagination">
      <div>
        <el-dropdown
          trigger="click"
          @command="handleCommandCategory"
          style="margin: 0 0.1rem"
        >
          <el-button size="mini" type="warning">
            {{ category }}<i class="el-icon-upload2 el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu slots="dropdown">
              <el-dropdown-item
                icon="el-icon-notebook-2"
                :command="categoryItem.category"
                v-for="(categoryItem, index) in blogArticleCategory"
                :key="index"
                >{{ categoryItem.category }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="Label">这里选择</span>
      </div>
      <el-pagination
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRefs, watch } from "vue";
import { getLable, getCategory, ByCategoryGetArticle } from "@/http/api";
import { getDate } from "@/util/date";
export default defineComponent({
  name: "blogWebArticle",
  components: {},
  setup() {
    // 标签
    const blogArticleLable = ref([]);
    // 分类
    const blogArticleCategory = ref([]);
    // 获取文章的参数
    const getArticleObj = reactive({
      label: "",
      category: "",
      page: 1,
      pageSize: 1,
      count: null,
      ArticleList: [],
    });
    // 获取文章标签和分类
    const getArticleLableOrCategory = async () => {
      const res = await Promise.all([getLable(), getCategory()]);
      if (!res) return;
      if (res[0].data.code == 200) {
        const { data } = res[0].data;
        blogArticleLable.value = data;
        getArticleObj.label = blogArticleLable.value[0].label;
      }
      if (res[1].data.code == 200) {
        const { data } = res[1].data;
        blogArticleCategory.value = data;
        getArticleObj.category = blogArticleCategory.value[0].category;
      }
    };
    // 通过分类获取的文章
    const byLableGetArtic = (category, page) => {
      ByCategoryGetArticle({
        category: category,
        page: page,
        pageSize: getArticleObj.pageSize,
      }).then((res) => {
        if (res.data.code == 200) {
          const { data } = res.data.data;
          console.log(data);
          getArticleObj.ArticleList = data[0];
          getArticleObj.count = res.data.data.count;
        }
      });
    };
    // currentPage 改变时会触发
    const handleChange = (val) => {
      getArticleObj.page = val;
    };
    // 监听
    watch(
      () => [getArticleObj.category, getArticleObj.page],
      () => {
        // 通过标签获取的文章
        byLableGetArtic(getArticleObj.category, getArticleObj.page);
      }
    );
    // 挂载阶段
    onMounted(async () => {
      // 获取文章标签和分类
      await getArticleLableOrCategory();
    });
    //el-dropdown 分类
    const handleCommandCategory = (value) => {
      console.log(value);
      getArticleObj.category = value;
    };
    return {
      handleCommandCategory,
      blogArticleLable,
      blogArticleCategory,
      ...toRefs(getArticleObj),
      handleChange,
      getDate,
    };
  },
});
</script>

<style lang="scss" scoped>
#blogArticle {
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
          min-height: 4.3rem;
          background: white;
          padding: 0.05rem 0.05rem;
        }
      }
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.5rem;
    background: #eeeeee;
  }
}
</style>