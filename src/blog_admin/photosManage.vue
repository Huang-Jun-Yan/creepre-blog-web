<template>
  <div id="BlogPhotosmanage">
    <h2 class="PhotosManageTitle">
      相册管理<i class="iconfont icon-tupian"></i>
    </h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="管理员名字" width="100">
      </el-table-column>
      <el-table-column align="center " label="图片" width="120">
        <template #default="scope">
          <el-avatar
            shape="square"
            size="large"
            :src="scope.row.imgsrc[0]"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="brief" label="描述"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default="scope">
          <el-button @click="removePhotos(scope.row)" type="danger" size="small"
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
        :total="total ? total : 100"
        :page-size="pageSize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, toRefs, watch } from "vue";
import { getPhotos, deletePhotos } from "@/http/api"; //getPhotos deletePhotos
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  name: "CreepreBlogWebPhotosmanage",
  components: {},
  setup() {
    // 路由
    const route = useRoute();
    const tableData = ref([]);
    // 相册参数
    const getPhotosObj = reactive({
      total: null,
      page: 1,
      pageSize: 3,
    });
    // 获取相册
    const getPhotosInfo = async (page) => {
      const res = await getPhotos({
        page: page,
        pageSize: getPhotosObj.pageSize,
      });
      if (res.data.code == 200) {
        const { data } = res.data;
        getPhotosObj.total = data.count;

        data.data.forEach((item) => {
          item.imgsrc = JSON.parse(item.imgsrc);
        });
        tableData.value = data.data;
      }
    };
    // currentPage 改变时会触发
    const handleChange = (val) => {
      getPhotosObj.page = val;
    };
    // 删除
    const removePhotos = async ({ pic_id }) => {
      ElMessageBox.confirm("你将永久删除此相册, 是否继续?", "删除提示", {
        confirmButtonText: "想好了，确定删除",
        cancelButtonText: "思考良久，不删除了",
        type: "warning",
      })
        .then(() => {
          deletePhotos({
            pic_id: pic_id,
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
      () => getPhotosObj.page,
      () => {
        getPhotosInfo(getPhotosObj.page);
      }
    );
    // 挂载阶段
    onMounted(() => {
      getPhotosInfo(getPhotosObj.page);
    });
    return {
      tableData,
      removePhotos,
      handleChange,
      ...toRefs(getPhotosObj),
    };
  },
});
</script>

<style lang="scss" scoped>
#BlogPhotosmanage {
  width: 100%;
  height: 100%;
  .PhotosManageTitle {
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