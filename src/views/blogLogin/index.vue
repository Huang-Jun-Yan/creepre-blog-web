<template>
  <div id="login">
    <div class="loginBox">
      <div class="blogLoginTitle"><h2>LOGIN</h2></div>
      <transition name="el-fade-in">
        <form class="loginForm" action="">
          <div class="userNameBox">
            <label class="iconfont icon-yonghu" for="userName"></label>
            <input type="text" id="userName" placeholder="请输入用户名" />
          </div>
          <div class="userPassBox">
            <label class="iconfont icon-mima" for="userPass"></label>
            <input type="password" id="userPass" placeholder="请输入密码" />
          </div>
          <div class="subLoginBox">
            <button>登录</button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "blogWebLogin",
  components: {},
  setup() {
    // 登录参数
    const blogUserInfo = ref({
      email: "",
    });

    // 登录提交
    const submitForm = () => {};
    // 挂载阶段
    onMounted(() => {});

    return {
      blogUserInfo,
      submitForm,
      onMounted,
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
  justify-content: center;
  align-items: center;
  .loginBox {
    width: 4rem;
    // height: 5rem;
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
        }
      }
    }
  }
}
</style>