<template>
  <div id="EditInfo">
    <div class="EditInfoBox">
      <h2 class="editTitle">小主，这里修改您的信息哦!</h2>
      <div class="oldImg">
        <img :src="circleUrl" alt="" />
      </div>
      <div class="upImg">
        <el-upload
          :action="ImageUpload"
          list-type="picture-card"
          :on-success="upLoadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <div class="editUserName editCon">
        <label for="editUserName">昵称:</label>
        <input
          v-model="username"
          id="editUserName"
          type="text"
          :placeholder="username"
        />
      </div>
      <div class="editIntroduction editCon">
        <label for="editIntroduction">介绍:</label>
        <input
          v-model="introduction"
          id="editIntroduction"
          type="text"
          :placeholder="introduction"
        />
      </div>
      <div class="editBtn">
        <button @click="outEdit" class="outEdit">退出编辑</button>
        <button @click="subEdit" class="subEdit">提交修改</button>
        <button @click="outLogin" class="outLogin">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { BASEURL, editUserInfo } from "@/http/api";
import { getStorage, setStorage } from "@/util/Storage";
// import { reload } from "@/util/reload";
export default defineComponent({
  name: "BlogWebEditInfo",
  components: {},
  directives: {},
  setup() {
    //   路由实例
    const router = useRouter();
    const route = useRoute();
    // console.log(route.path)
    // 用户信息
    const userInfo = reactive({
      token: getStorage("blogUserToken").userToken,
      username: "",
      introduction: "",
      circleUrl: "",
    });
    const upLoadImg = reactive({
      dialogImageUrl: "",
      dialogVisible: false,
    });
    // 获取当前用户信息
    const getUserInfo = () => {
      userInfo.username = getStorage("blogUserInfo").name || "";
      userInfo.introduction = getStorage("blogUserInfo").introduction;
      userInfo.circleUrl = getStorage("blogUserInfo").avatar || "";
    };
    // 计算属性
    const ImageUpload = computed(() => {
      return `${BASEURL}/users/editAvatar`;
    });
    // 退出登录
    const outLogin = () => {
      ElMessageBox.confirm("确定要退出登录吗？", "退出登录提示", {
        confirmButtonText: "认真思考过，要退出登录", // 确定
        cancelButtonText: "仔细想想，不退出了", // 取消
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("userInfo");
          ElMessage({
            type: "success",
            message: "您以退出登录，即将跳转到登录",
          });
          setTimeout(() => {
            router.replace("/users/blogLogin");
          }, 2000);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "您的脑瓜真聪明，继续留下吧！",
          });
        });
    };
    // 退出编辑
    const outEdit = () => {
      ElMessageBox.confirm("确定退出编辑吗？", "退出编辑提示", {
        confirmButtonText: "不想修改，让我回去",
        cancelButtonText: "我还想修改，不走",
        type: "warning",
      })
        .then(async () => {
          await ElMessage({
            type: "success",
            message: "即将返回首页",
          });
          setTimeout(() => {
            router.push("/creepreBlog/blogHome");
          }, 2000);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "您将留在此页面继续编辑",
          });
        });
    };
    // 提交修改
    const subEdit = () => {
      console.log("222");
      if (userInfo.username.length > 12)
        return ElMessage.warning("昵称长度不能大于6个");
      editUserInfo({
        token: userInfo.token,
        introduction: userInfo.introduction,
        name: userInfo.username,
        avatar: userInfo.circleUrl,
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
            ElMessage.success({
              message: "小主您的信息修改成功啦ヾ(≧▽≦*)o!",
              type: "success",
            });
            getUserInfo();
            location.reload(route.path);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 图片上传成功的钩子
    const upLoadSuccess = (res) => {
      if (res.code == 200) {
        upLoadImg.dialogImageUrl = res.file.url;
        userInfo.circleUrl = res.file.url;
      }
    };
    // 挂载阶段
    onMounted(async () => {
      getUserInfo();
    });
    return {
      ...toRefs(upLoadImg),
      ...toRefs(userInfo),
      subEdit,
      ImageUpload,
      upLoadSuccess,
      outEdit,
      outLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
#EditInfo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: $my-theme-background;
  .EditInfoBox {
    width: 5rem;
    height: auto;
    .editTitle {
      letter-spacing: 0.01rem;
      user-select: none;
      height: 0.5rem;
      line-height: 0.5rem;
    }
    .oldImg {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      background: #cccccc;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .upImg {
      margin: 0.3rem 0;
    }
    .editCon {
      margin: 0.1rem 0;
      input {
        border-bottom: 0.01rem solid $my-theme-border;
        width: 3rem;
      }
      #editUserName {
        width: 1.3rem;
      }
      label {
        margin-right: 0.06rem;
        font-size: 0.2rem;
        letter-spacing: 0.02rem;
      }
    }
    .editBtn {
      user-select: none;
      height: 0.5rem;
      line-height: 0.5rem;
      button {
        margin: 0 0.05rem;
        background: #67c23a;
        color: white;
        width: 1rem;
        height: 0.33rem;
        border-radius: 0.08rem;
        letter-spacing: 0.01rem;
        font-size: 0.12rem;
        font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
        &:hover {
          cursor: pointer;
        }
      }
      .outEdit {
        background: #f56c6c;
      }
      .outLogin {
        background: #e6a23c;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .editIntroduction{
    input {
      width: 4rem !important;
    }
  }
  .editUserName{
    input {
      width: 1.5rem !important;
    }
  }
  .editBtn {
    button {
      width: 1.2rem !important;
      height: 0.55rem !important;
    }
  }
}
</style>