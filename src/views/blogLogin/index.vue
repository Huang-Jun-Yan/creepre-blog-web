<template>
  <div id="login">
    <div class="blogLogo" @click="$router.replace('/')">
      <img src="@/assets/images/bloglogo.png" alt="" />
    </div>
    <div class="loginBox">
      <div class="blogLoginTitle"><h2>LOGIN</h2></div>
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
            <button @click="userLogin">登录</button>
          </div>
          <div class="tip">
            <router-link to="/users/blogRegister">
              这里前往<i>注册</i>的地方=>
            </router-link>
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
import { userRegister } from "../../http/api";
import { setStorage } from "../../util/Storage";
export default defineComponent({
  name: "blogWebLogin",
  components: {},
  setup() {
    // 登录参数
    const blogUserInfo = reactive({
      username: "",
      password: "",
    });
    // 路由实例
    const router = useRouter();
    // 登录提交
    const userLogin = () => {
      if (blogUserInfo.username == "" || blogUserInfo.password == "")
        return ElMessage.warning("输入框不能为空！");
      userRegister({
        username: blogUserInfo.username,
        password: blogUserInfo.password,
      })
        .then((res) => {
          if (res.data.code == 200) {
            setStorage("blogUserInfo", {
              avatar: res.data.data.avatar,
              email: res.data.data.email,
              introduction: res.data.data.introduction,
              name: res.data.data.name,
              register_time: res.data.data.register_time,
              username: res.data.data.username,
            });
            setStorage("blogUserToken", { userToken: res.data.token });
            ElMessage.success("登陆成功");
            router.replace("/creepreBlog/blogHome");
          } else if (res.data.code == 400) {
            ElMessage.error({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 挂载阶段
    onMounted(() => {});

    return {
      ...toRefs(blogUserInfo),
      onMounted,
      userLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/backgroundImg.jpg") no-repeat 100%/100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .blogLogo {
    margin: 0.2rem 0;
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: scale(1.05);
    }
  }
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
        margin: 0.2rem 0;
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
        margin: 0.1rem 0;
        button {
          background: #409eff;
          width: 2.4rem;
          height: 0.33rem;
          border-radius: 0.08rem;
          letter-spacing: 0.04rem;
          font-size: 0.16rem;
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          &:active {
            transform: scale(.99);
          }
        }
        &:hover button {
          cursor: pointer;
        }
      }
      .tip {
        margin: 0.1rem 0;
        border-bottom: none;
        text-align: right;
        width: 100%;
        margin-right: 0.1rem;
        a {
          &:hover {
            border-bottom: 0.01rem solid black;
          }
        }
        i {
          color: orangered;
          margin: 0 0.05rem;
        }
      }
    }
  }
}
</style>