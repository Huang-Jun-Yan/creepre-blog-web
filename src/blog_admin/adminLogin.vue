<template>
  <div id="login">
    <div class="loginBox">
      <div class="blogLoginTitle"><h2>管理员Login</h2></div>
      <transition name="el-fade-in">
        <form class="loginForm" action="">
          <div class="userNameBox">
            <label class="iconfont icon-yonghu" for="userName"></label>
            <input
              v-model="username"
              type="text"
              id="userName"
              placeholder="请输入用户名"
              autocomplete="off"
            />
          </div>
          <div class="userPassBox">
            <label class="iconfont icon-mima" for="userPass"></label>
            <input
              v-model="password"
              type="password"
              id="userPass"
              placeholder="请输入密码"
              autocomplete="off"
            />
          </div>
          <div class="subLoginBox">
            <button @click.prevent="adminLogin">登录</button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { blogAdminLogin } from "@/http/api";
import { setStorage } from "@/util/Storage";
export default defineComponent({
  name: "blogWebLogin",
  components: {},
  setup() {
    // 登录参数
    const blogAdminInfo = reactive({
      username: "",
      password: "",
    });
    // 路由实例
    const router = useRouter();
    // 管理员登录
    const adminLogin = () => {
      if (blogAdminInfo.username == "" || blogAdminInfo.password == "")
        return ElMessage.warning("账号 or 密码不能为空");
      blogAdminLogin({
        username: blogAdminInfo.username,
        password: blogAdminInfo.password,
      })
        .then((res) => {
          if (res.data.code == 200) {
            setStorage("admin_id", res.data.data.admin_id);
            router.replace("/creepreBlog/admin");
            ElMessage.success({
              message: res.data.msg,
              type: "success",
            });
          } else {
            ElMessage.warning({
              message: "对不起，你不是管理员用户，不能进入该区域！",
              type: "warning",
            });
            return false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 挂载阶段
    onMounted(() => {});

    return {
      ...toRefs(blogAdminInfo),
      onMounted,
      adminLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/backgroundImg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    width: 4rem;
    border-radius: 0.05rem;
    overflow: hidden;
    background: rgba(230, 225, 225, 0.5);
    user-select: none;
    .blogLoginTitle {
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      h2 {
        letter-spacing: 0.01rem;
        font-weight: bold;
        font-size: 0.32rem;
        font-family: Georgia, "Times New Roman", Times, serif;
      }
    }
    .loginForm {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin: 0.1rem 0;
        padding-bottom: 0.1rem;
        border-bottom: 0.02rem solid #cccccc;
        width: 3rem;
        label {
          vertical-align: middle;
          display: inline-block;
          margin-right: 0.1rem;
          font-size: 0.2rem;
        }
        input {
          width: 1.7rem;
        }
      }
      .subLoginBox {
        border-bottom: none;
        text-align: center;
        padding: 0;
        button {
          background: #409eff;
          width: 2.4rem;
          height: 0.33rem;
          border-radius: 0.08rem;
          letter-spacing: 0.04rem;
          font-size: 0.16rem;
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
            &:hover {
            cursor: pointer;
          }
          &:active {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style>