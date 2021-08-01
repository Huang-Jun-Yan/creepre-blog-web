<template>
  <div id="BlogVideomanage">
    <div id="BlogPhotosmanage">
      <h2 class="videoManageTitle">
        视频管理<i class="iconfont icon-shipin1"></i>
      </h2>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="管理员名字" width="100">
        </el-table-column>
        <el-table-column align="center " label="视频封面" width="120">
          <template #default="scope">
            <el-avatar
              shape="square"
              size="large"
              :src="scope.row.video_pic"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="brief" label="视频描述"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="scope">
            <el-button
              @click="removeVideos(scope.row)"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
          :total="total ? total : 10"
          :page-size="pageSize"
          @current-change="handleChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, toRefs, watch } from "vue";
import { getBlogVideo, deleteVideos } from "@/http/api"; //
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  name: "CreepreBlogWebVideomanage",
  components: {},
  setup() {
    // 路由
    const route = useRoute();
    const tableData = ref([]);
    // 相册参数
    const getVideoObj = reactive({
      total: null,
      page: 1,
      pageSize: 3,
    });
    // 获取相册
    const getVideoInfo = async (page) => {
      const res = await getBlogVideo({
        page: page,
        pageSize: getVideoObj.pageSize,
      });
      if (res.data.code == 200) {
        const { data } = res.data;
        getVideoObj.total = data.count;
        tableData.value = data.data;
      }
    };
    // currentPage 改变时会触发
    const handleChange = (val) => {
      getVideoObj.page = val;
    };
    // 删除
    const removeVideos = async ({ video_id }) => {
      ElMessageBox.confirm("你将永久删除此相册, 是否继续?", "删除提示", {
        confirmButtonText: "想好了，确定删除",
        cancelButtonText: "思考良久，不删除了",
        type: "warning",
      })
        .then(() => {
          deleteVideos({
            video_id: video_id,
          })
            .then((res) => {
              if (res.data.code) {
                ElMessage.success(res.data.msg);
                setTimeout(() => {
                  location.reload(route.path);
                }, 500);
              } else {
                ElMessage.error("删除失败，请稍后再试=￣ω￣= ");
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
    // 监听
    watch(
      () => getVideoObj.page,
      () => {
        getVideoInfo(getVideoObj.page);
      }
    );
    // 挂载阶段
    onMounted(() => {
      getVideoInfo(getVideoObj.page);
    });
    return {
      tableData,
      removeVideos,
      handleChange,
      ...toRefs(getVideoObj),
    };
  },
});
</script>

<style lang="scss" scoped>
#BlogVideomanage {
  width: 100%;
  height: 100%;
  .videoManageTitle {
    height: 1rem;
    line-height: 1.6rem;
    color: #000;
    letter-spacing: 0.01rem;
    user-select: none;
    i {
      margin: 0 0.05rem;
      font-size: 0.2rem;
    }
  }
  .pagination {
    height: 0.62rem;
    margin-top: 0.02rem;
  }
}
</style>