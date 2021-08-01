<template>
  <div id="blogAdmin">
    <div class="blogAdmin_body">
      <div class="leftNav">
        <el-row style="height: 97.6%">
          <el-col style="height: 97.6%" :span="24">
            <h2 class="navTitle">
              <i @click="backIndex" class="iconfont icon-zuojiantou"></i
              >creepreの后台
            </h2>
            <el-menu
              style="height: 97.6%"
              :uniqueOpened="true"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :unique-opened="true"
            >
              <!-- 文章管理 -->
              <el-submenu index="1">
                <template #title>
                  <i class="el-icon-tickets"></i>
                  <span>文章管理</span>
                </template>
                <el-menu-item
                  @click="$router.push('/admin/articlePublish')"
                  index="1-1"
                  >文章发布</el-menu-item
                >
                <el-menu-item
                  @click="$router.push('/admin/articleManage')"
                  index="1-2"
                  >文章管理</el-menu-item
                >
              </el-submenu>

              <!-- 用户管理 -->
              <el-submenu index="2">
                <template #title>
                  <i class="el-icon-s-custom"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item
                  @click="$router.push('/admin/usersManage')"
                  index="2-1"
                  >用户列表管理</el-menu-item
                >
              </el-submenu>
              <!-- 图文管理 -->
              <el-submenu index="3">
                <template #title>
                  <i class="el-icon-paperclip"></i>
                  <span>内容管理</span>
                </template>
                <el-menu-item
                  @click="$router.push('/admin/photosManage')"
                  index="3-1"
                >
                  相册管理
                </el-menu-item>
                <el-menu-item
                  @click="$router.push('/admin/videoManage')"
                  index="3-2"
                >
                  视频管理
                </el-menu-item>
              </el-submenu>

              <!-- 图文管理 -->
              <el-submenu index="4">
                <template #title>
                  <i class="el-icon-paperclip"></i>
                  <span>内容发布</span>
                </template>
                <el-menu-item
                  @click="$router.push('/admin/photos')"
                  index="4-1"
                >
                  上传图片
                </el-menu-item>
                <el-menu-item
                  @click="$router.push('/admin/videos')"
                  index="4-2"
                >
                  上传视频
                </el-menu-item>
                <el-menu-item
                  @click="$router.push('/admin/musics')"
                  index="4-3"
                >
                  上传音乐
                </el-menu-item>
              </el-submenu>

              <!-- 退出管理 -->
              <el-menu-item @click="outAdminClick" index="5">
                <i class="el-icon-top"></i>
                <span>退出管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="rightCon">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { outAdmin } from "@/http/api";
import { setStorage } from "../util/Storage";
export default defineComponent({
  name: "BlogAdmin",
  components: {},
  directives: {},
  setup() {
    // 路由实例
    const router = useRouter();
    // 挂载阶段
    onMounted(() => {});
    // 退出管理
    const outAdminClick = () => {
      ElMessageBox.confirm("此操作将退出管理员登录, 是否继续?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          outAdmin().then((res) => {
            if (res.data.code == 200) {
              ElMessage({
                type: "success",
                message: "退出成功!",
              });
              setStorage("admin_id", "");
              router.replace("/");
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消退出",
          });
        });
    };
    // 返回首页
    const backIndex = () => {
      ElMessageBox.confirm("是否返回首页？", "给小主的提示", {
        confirmButtonText: "我要回去",
        cancelButtonText: "我不回去",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "确定返回,在1秒后返回",
          });
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消",
          });
        });
    };
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
      onMounted,
      outAdminClick,
      backIndex,
    };
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
});
</script>

<style lang="scss" scoped>
#blogAdmin {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  .blogAdmin_body {
    width: calc(100% - 20%);
    height: 100vh;
    background: rgba(255, 255, 255, 0.7);
    .leftNav {
      float: left;
      width: 2.08rem;
      // background: black;
      height: 100%;
      .navTitle {
        height: 0.5rem;
        display: flex;
        width: 2.07rem;
        justify-content: center;
        align-items: center;
        letter-spacing: 0.02rem;
        font-size: 0.16rem;
        background: rgb(84, 92, 100);
        color: white;
        i {
          vertical-align: middle;
          font-size: 0.3rem;
          color: cornflowerblue;
          &:hover {
            color: orange;
            cursor: pointer;
          }
        }
      }
    }
    .rightCon {
      margin-left: 2.2rem;
      height: 7.215rem;
      padding: 0 0.2rem;
      background: url("../assets/images/2.jpg") no-repeat 100%;
      opacity: 0.7;
      overflow: hidden;
    }
  }
}
</style>



