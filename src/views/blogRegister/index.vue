<template>
  <div id="register">
    <div class="registerBox">
      <div class="blogRegisterTitle"><h2>REGISTER</h2></div>
      <form class="registerForm" action="">
        <div class="userNameBox">
          <label class="iconfont icon-yonghu" for="userName"></label>
          <input
            type="text"
            v-model="blogUserInfo.username"
            id="userName"
            placeholder="请输入用户名"
            autocomplete="off"
          />
        </div>
        <div class="userPassBox">
          <label class="iconfont icon-mima" for="userPass"></label>
          <input
            type="password"
            v-model="blogUserInfo.password"
            id="userPass"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </div>
        <div class="userEmailBox">
          <label class="iconfont icon-youxiang" for="userEmail"></label>
          <input
            type="text"
            v-model="blogUserInfo.email"
            id="userEmail"
            placeholder="请输入邮箱"
            autocomplete="off"
          />
          <span>@qq.com</span>
        </div>
        <div class="sendCode">
          <button :disabled="blogUserInfo.isDis" @click="sendEmailCode">
            {{ blogUserInfo.btnCon }}
          </button>
        </div>
        <div class="emaiCodeBox">
          <label class="iconfont icon-yanzhengma1" for="emaiCode"></label>
          <input
            type="text"
            v-model.number="blogUserInfo.code"
            id="emaiCode"
            placeholder="请输入验证码 "
            autocomplete="off"
          />
        </div>
        <div class="subRegisterBox">
          <button @click="subRegister">注册</button>
        </div>
        <div class="tip">
          <router-link to="/users/blogLogin">
            这里前往<i>登录</i>的地方
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userRegister, getEmailCode } from "@/http/api";
import { setStorage } from "@/util/Storage";
export default defineComponent({
  name: "blogRegister",
  components: {},
  setup() {
    //   邮箱验证
    const reg =
      /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
    // router实例
    const router = useRouter();
    const blogUserInfo = reactive({
      username: "",
      password: "",
      email: "",
      code: null,
      btnCon: "发送验证码",
      countDown: 60,
      isDis: false,
    });
    // 发送邮箱验证码
    const sendEmailCode = async () => {
      // 判断有没有填写邮箱
      if (!blogUserInfo.email) {
        ElMessage.warning("你还没有填写邮箱");
        return false;
      }
      // 判断邮箱格式是否正确
      if (reg.test(blogUserInfo.email + "@qq.com") == true) {
        try {
          const res = await getEmailCode({
            email: blogUserInfo.email + "@qq.com",
          });
          if (res.data.code == 200) {
            ElMessage.success("验证码已发送，请在邮箱查收");
            const timer = setInterval(() => {
              blogUserInfo.countDown--;
              if (blogUserInfo.countDown == 0) {
                blogUserInfo.isDis = false;
                blogUserInfo.btnCon = "发送验证码";
                clearInterval(timer);
              } else {
                blogUserInfo.isDis = true;
                blogUserInfo.btnCon = `${blogUserInfo.countDown}秒  后发送验证码`;
              }
            }, 1000);
          } else {
            ElMessage.error("验证码发送失败！");
          }
        } catch (err) {
          console.log("请求超时");
        }
      } else {
        ElMessage.warning("填写正确邮箱");
        return false;
      }
    };
    // 注册
    const subRegister = async () => {
      //   判断有没有输入
      if (
        blogUserInfo.username == "" ||
        blogUserInfo.password == "" ||
        blogUserInfo.email == "" ||
        blogUserInfo.code == null
      ) {
        ElMessage.warning("你还没有开始注册！");
      } else {
        try {
          userRegister({
            username: blogUserInfo.username,
            password: blogUserInfo.password,
            email: blogUserInfo.email + "@qq.com",
            code: blogUserInfo.code,
          })
            .then((res) => {
              const { code } = res.data;
              if (code == 200) {
                setStorage("blogUserToken", { userToken: res.data.token });
                ElMessage.success("注册成功，即将去首页");
                setTimeout(() => {
                  router.push(`/creepreBlog/blogHome`);
                }, 1000);
              } else if (code == 400) {
                ElMessage.warning("该账号已注册，请重新注册");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
    };
    return {
      blogUserInfo,
      sendEmailCode,
      subRegister,
    };
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
          &:hover {
            cursor: pointer;
          }
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
          &:active {
            transform: scale(0.99);
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
      .tip {
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