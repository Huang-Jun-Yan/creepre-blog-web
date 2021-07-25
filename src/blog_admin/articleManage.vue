<template>
  <div id="articleAdminManage">
    <h2 class="userManageTitle">
      后台文章管理界面<i class="iconfont icon-wenzhang2"></i>
    </h2>
    <div class="container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="文章标题" width="200">
        </el-table-column>
        <el-table-column prop="brief" label="文章简介" width="400">
        </el-table-column>
        <el-table-column prop="category" label="文章分类" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button
              @click="editArticle(scope.row, scope.$index)"
              type="success"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="removeArticle(scope.row, scope.$index)"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
        background
        layout="prev, pager, next"
        :total="total ? total : 100"
        :page-size="pageSize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, toRefs, watch } from "vue";
import { getAllArticle, deleteArticle } from "../http/api";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "articleAdminManage",
  components: {},
  setup() {
    // 路由
    const route = useRoute();
    const router = useRouter();
    // 表单数据
    const tableData = ref([]);
    // 分页获取
    const ArticlePage = reactive({
      page: 1,
      pageSize: 3,
      total: null,
    });
    // 获取
    const getArticle = (page) => {
      getAllArticle({
        page,
        pageSize: ArticlePage.pageSize,
      })
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ArticlePage.total = res.data.data.count;
            const { data } = res.data.data;
            tableData.value = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // currentPage 改变时会触发
    const handleChange = (val) => {
      ArticlePage.page = val;
    };
    // 删除用户
    const removeArticle = ({ article_id }) => {
      ElMessageBox.confirm("此操作将永久删除该文章, 是否删除?", "删除提示", {
        confirmButtonText: "思考已久，确定删除",
        cancelButtonText: "脑瓜一热，不删除",
        type: "warning",
      })
        .then(() => {
          deleteArticle({ article_id: article_id })
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                ElMessage({
                  type: "success",
                  message: "删除成功!",
                });
                setTimeout(() => {
                  location.reload(route.path);
                }, 500);
              } else {
                ElMessage({
                  showClose: true,
                  message: "检查您的网络，并重试...",
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    // 编辑用户
    const editArticle = ({ article_id }) => {
      router.replace(`/admin/article/editArticle/${article_id}`);
    };
    // 监听
    watch(
      () => ArticlePage.page,
      () => {
        getArticle(ArticlePage.page);
      }
    );
    // 挂载阶段
    onMounted(() => {
      getArticle(ArticlePage.page);
    });
    return {
      tableData,
      removeArticle,
      editArticle,
      handleChange,
      ...toRefs(ArticlePage),
    };
  },
});
</script>

<style lang="scss" scoped>
#articleAdminManage {
  width: 100%;
  height: 100%;
  .userManageTitle {
    height: 1rem;
    line-height: 1.4rem;
    color: #000;
    letter-spacing: 0.01rem;
    user-select: none;
    i {
      margin: 0 0.05rem;
      font-size: 0.2rem;
    }
  }
  .container {
    min-height: 5.4rem;
  }
  .pagination {
    height: 0.62rem;
    margin-top: 0.02rem;
  }
}
</style>