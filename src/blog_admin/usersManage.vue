<template>
  <div id="userAdminManage">
    <h2 class="userManageTitle">
      用户管理<i class="iconfont icon-yonghu2"></i>
    </h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="100"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="introduction" label="简介"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="205">
        <template #default="scope">
          <el-button
            @click="addAdmin(scope.row)"
            :type="scope.row.isAdmin == 0 ? 'primary' : 'warning'"
            size="small"
          >
            {{ scope.row.isAdmin == 0 ? "添加管理员" : "删除管理员" }}
          </el-button>
          <el-button
            @click="removeUser(scope.row, scope.$index)"
            type="danger"
            size="small"
            >删除用户</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { getUser, deleteUser, addAdmins } from "@/http/api";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "userAdminManage",
  components: {},
  setup() {
    const tableData = ref([]);
    // 挂载阶段
    onMounted(() => {
      // 获取用户信息
      getUserInfo();
    });
    // 获取用户信息
    const getUserInfo = () => {
      getUser()
        .then((res) => {
          if (res.data.code == 200) {
            const { data } = res.data;
            tableData.value = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 删除用户
    const removeUser = ({ username }, index) => {
      ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "删除提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser({ username: username })
            .then((res) => {
              if (res.data.code == 200) {
                ElMessage({
                  type: "success",
                  message: "删除成功!",
                });
                location.reload();
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

      console.log(username, index);
    };
    const addAdmin = async ({ username, avatar, name, isAdmin, password }) => {
      try {
        if (isAdmin == 0) {
          const res = await addAdmins({
            username,
            avatar,
            name,
            isAdmin,
            password,
          });
          if (res.data.code == 200) {
            ElMessage.success(res.data.msg);
            getUserInfo();
          }
        } else {
          ElMessageBox.confirm("此操作将移除该管理员, 是否继续?", "操作提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              const res = await addAdmins({
                username,
                avatar,
                name,
                isAdmin,
                password,
              });
              if (res.data.code == 200) {
                ElMessage.success(res.data.msg);
                getUserInfo();
              }
            })
            .catch(() => {
              ElMessage.info("已取消删除");
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    return {
      tableData,
      removeUser,
      addAdmin,
    };
  },
});
</script>

<style lang="scss" scoped>
#userAdminManage {
  width: 100%;
  height: 100%;
  .userManageTitle {
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
}
</style>