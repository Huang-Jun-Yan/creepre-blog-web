<template>
  <div id="register">
    <div class="registerBox">
      <div class="blogRegisterTitle"><h2>REGISTER</h2></div>
      <transition name="el-fade-in">
        <form class="registerForm" action="">
          <div class="userNameBox">
            <label class="iconfont icon-yonghu" for="userName"></label>
            <input type="text" id="userName" placeholder="请输入用户名" />
          </div>
          <div class="userPassBox">
            <label class="iconfont icon-mima" for="userPass"></label>
            <input type="password" id="userPass" placeholder="请输入密码" />
          </div>
          <div class="userEmailBox">
            <label class="iconfont icon-youxiang" for="userEmail"></label>
            <input type="text" id="userEmail" placeholder="请输入邮箱" />
            <span>@qq.com</span>
          </div>
          <div class="sendCode">
            <button>发送验证码</button>
          </div>
          <div class="emaiCodeBox">
            <label class="iconfont icon-yanzhengma1" for="emaiCode"></label>
            <input type="text" id="emaiCode" placeholder="请输入验证码 " />
          </div>
          <div class="subRegisterBox">
            <button>注册</button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "blogRegister",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
#register {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/backgroundImg.jpg") no-repeat 100%/100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .registerBox {
    width: 4rem;
    // height: 5rem;
    border-radius: 0.05rem;
    overflow: hidden;
    background: rgba(230, 225, 225, 0.5);
    user-select: none;
    .blogRegisterTitle {
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
    .registerForm {
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
      .userEmailBox {
        position: relative;
        span {
          position: absolute;
          display: inline-block;
          height: 100%;
          top: 0;
          right: 0;
          transform: translateY(-0.1rem);
          line-height: 0.27rem;
          font-size: 0.2rem;
        }
      }
      .sendCode {
        padding: 0;
        border-bottom: none;
        button {
          background: #67c23a;
          padding: 0.08rem 0.15rem;
          border-radius: 0.08rem;
        }
      }
      .subRegisterBox {
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