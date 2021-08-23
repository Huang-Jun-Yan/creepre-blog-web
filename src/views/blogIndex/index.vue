<template>
  <div id="index">
    <blogDusk v-show="!backgroundTab" />
    <clearSky v-show="backgroundTab" />
    <highlight v-show="windoWwidth >= 640" />
    <otherMenu />
    <div ref="templateButton" id="templateButton">
      <i @click="onHideAside" class="iconfont icon-caidan"></i>
    </div>
    <!-- 页头 -->
    <blogHeaders />
    <div class="el-main">
      <div class="mainBox">
        <div ref="isHideAside" class="leftAside clearfix">
          <!-- 头像 -->
          <el-row class="blog_userAvatar">
            <el-avatar
              class="userAvatar"
              icon="el-icon-user-solid"
              shape="circle"
              :size="100"
              fit="contain"
              @click="editAvatar"
              :src="userInfo.avatar"
            ></el-avatar>
            <!-- 用户名字及登录注册按钮 -->
            <el-row class="blog_userName">
              <!-- 用户名字 -->
              <div class="userName" v-if="userInfo.name">
                <h2 @click="toAdmin">{{ userInfo.name }}</h2>
              </div>
              <!-- 登录注册按钮 -->
              <div class="blogBtn" v-if="!userInfo.name">
                <el-button @click="toUserLogin" type="success"
                  >登录及注册</el-button
                >
              </div>
            </el-row>
            <!-- 用户介绍 -->
            <el-row class="blog_readNumber">
              {{ userInfo.introduction }}
            </el-row>
          </el-row>
          <!-- 推荐列表 -->
          <el-row class="blog_SuggestList">
            <h2 class="suggestTitle">
              推荐文章<i class="iconfont icon-tuijian1"></i>
            </h2>
            <transition name="el-fade-in">
              <ul v-if="true" class="blog_SuggestList_item">
                <el-scrollbar>
                  <li
                    class="nav_item"
                    v-for="(item, index) in articleRec"
                    :key="index"
                  >
                    <a
                      class="title"
                      @click="toArticleDetail(item.article_id)"
                      >{{ item.title }}</a
                    >
                    <div class="content">
                      <p>{{ item.brief }}</p>
                      <h4>{{ item.create_time }}</h4>
                    </div>
                  </li>
                </el-scrollbar>
              </ul>
            </transition>
            <div v-if="false" class="noContent">
              <el-empty
                :image-size="80"
                style="width: 2rem; height: 0.17rem"
                description="暂时没有文章"
              ></el-empty>
            </div>
          </el-row>
          <!-- 其他 -->
          <messageBoard />
          <!-- 其他 -->
        </div>
        <div class="rightBody">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
    <blogFooters />
  </div>
</template>

<script>
import messageBoard from "@/components/other/message";
import blogHeaders from "@/components/blogHeader";
import blogDusk from "@/components/dusk";
import clearSky from "@/components/clearSky";
import highlight from "@/components/highlight";
import otherMenu from "@/components/other/otherMenu";
import blogFooters from "@/components/blogFooter";
import { useRouter } from "vue-router";
import {
  defineComponent,
  onMounted,
  provide,
  reactive,
  toRefs,
  ref,
  computed,
} from "vue";
import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
import {
  getRecentArticle,
  adminIsLogined,
  getAdminAcc,
  getuserInfo,
} from "@/http/api"; // getuserInfo
import { getDate } from "@/util/date";
import { useStore } from "vuex";
export default defineComponent({
  name: "blogIndex",
  components: {
    blogHeaders,
    messageBoard,
    blogDusk,
    clearSky,
    highlight,
    otherMenu,
    blogFooters
  },
  setup() {
    // 路由实例
    const router = useRouter();
    // vuex
    const store = useStore();
    // 用户信息
    const blogUserobj = reactive({
      userInfo: {},
    });
    /* 父向子传值 */
    provide("routerInfo", router.options.routes[0]);
    // 推荐文章数组
    const articleRec = ref([]);
    // 推荐文章
    const recentArticle = () => {
      getRecentArticle().then((res) => {
        if (res.data.code == 200) {
          const { data } = res.data;
          data.map((item) => {
            item.create_time = getDate(item.create_time);
          });
          articleRec.value = data;
        }
      });
    };
    // 根据id跳转对应文章详情
    const toArticleDetail = (article_id) => {
      router.replace(`/creepreBlog/article/articleDetail/${article_id}/users`);
    };
    // 用户登录
    const userLogin = async () => {
      if (getStorage("blogUserToken")) {
        const res = await getuserInfo({
          token: getStorage("blogUserToken").userToken,
        });
        if (res.data.code == 200) {
          Object.assign(blogUserobj.userInfo, res.data.Info);
        } else {
          ElMessage.warning(res.data.msg);
          localStorage.removeItem("userInfo");
        }
      } else {
        ElMessage.warning({
          message: "欢迎来到creepre的博客，但是你还没有登录哦˙ω˙",
          type: "warning",
        });
      }
    };
    // 跳转至登录页
    const toUserLogin = () => {
      router.push("/users/blogLogin");
    };
    // 跳转至后台管理
    const toAdmin = async () => {
      const isAdminRes = await adminIsLogined();
      const getAdminRes = await getAdminAcc();
      getAdminRes.data.list.forEach((item) => {
        if (
          isAdminRes.data.code == 200 &&
          getStorage("blogUserInfo").username == item.username
        ) {
          router.replace("/creepreBlog/admin");
        } else if (getStorage("blogUserInfo").username == item.username) {
          router.replace("/users/admin/adminLogin");
          ElMessage("亲爱的管理员，你还没登录哦ㄟ≥◇≤ㄏ");
        } else {
          ElMessage.warning("你不是管理员，不要乱跑哦");
        }
      });
    };
    // 用户修改信息页面
    const editAvatar = async () => {
      if (getStorage("blogUserToken")) {
        router.push("/creepreBlog/editInfo");
      } else {
        ElMessage.warning("你还未登录，不能编辑自己的信息╮╯▽╰╭");
      }
    };
    /* 挂载阶段钩子 */
    onMounted(() => {
      // 获取近期文章
      recentArticle();
      // 用户登录
      userLogin();
      // 获取window的宽度，在什么设备显示菜单按钮
      windowSize();
    });
    // 获取移动端隐藏菜单
    const templateButton = ref(null);
    const isHideAside = ref(null);
    const windoWwidth = ref(null);
    // 菜单的事件
    const onHideAside = () => {
      if (store.state.globalConfig.isHideAside) {
        store.commit("globalConfig/handleChangeHideAside");
        isHideAside.value.style.transform = `translate(0)`;
      } else {
        store.commit("globalConfig/handleChangeHideAside");
        isHideAside.value.style.transform = `translate(-2.28rem)`;
      }
    };
    window.addEventListener("resize", () => {
      windowSize();
    });
    // 获取window的宽度，在什么设备显示菜单按钮
    const windowSize = () => {
      windoWwidth.value =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (windoWwidth.value > 640) {
        templateButton.value.style.display = "none";
      } else {
        templateButton.value.style.display = "block";
      }
    };
    // 计算属性
    const backgroundTab = computed(() => {
      return store.state.globalConfig.backgroundTab;
    });
    return {
      ...toRefs(blogUserobj),
      editAvatar,
      toUserLogin,
      toAdmin,
      articleRec,
      toArticleDetail,
      backgroundTab,
      templateButton,
      onHideAside,
      isHideAside,
      windoWwidth,
    };
  },
});
</script>
<style lang="scss" scoped>
#index {
  height: calc(100% - 0.37rem);
  .el-main {
    padding: 0;
    display: flex;
    justify-content: center;
    height: calc(100% - 0.31rem);
    .mainBox {
      width: calc(100% - 15%);
      height: 100%;
      .leftAside {
        height: 100%;
        width: 2.3rem;
        background: $my-theme-background;
        float: left;
        margin-right: 0.1rem;
        position: relative;
        .blog_userAvatar {
          display: flex;
          justify-content: center;
          height: 2.1rem;
          border-bottom: 0.01rem solid #dddddd;
          .blog_readNumber {
            width: 100%;
            min-height: 0.3rem;
            padding: 0 0.05rem;
            line-height: 0.14rem;
            font-size: 0.08rem;
          }
          .userAvatar {
            margin-top: 0.05rem;
            transition: 1s all;
            &:hover {
              transform: rotate(360deg);
              cursor: pointer;
            }
          }
          .blog_userName {
            height: 0.5rem;
            width: 100%;
            line-height: 0.5rem;
            font-weight: bold;
            font-size: 0.18rem;
            .userName {
              width: 100%;
              text-align: center;
              user-select: none;
              cursor: pointer;
              &:hover {
                animation: ShiftUp 0.5s;
              }
            }
            .blogBtn {
              width: 100%;
              text-align: center;
            }
          }
        }
        .blog_SuggestList {
          user-select: none;
          overflow: hidden;
          width: 100%;
          height: 3.2rem;
          padding: 0.03rem 0;
          box-shadow: inset 0 0 0.01rem 0rem #cccccc;
          margin-bottom: 0.1rem;
          .noContent {
            height: calc(100% - 0.22rem);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .suggestTitle {
            font-weight: bold;
            margin: 0.05rem 0 0.15rem 0.05rem;
            i {
              color: orange;
              margin: 0 0.05rem;
              animation: rotateZoom 1s infinite ease-in-out;
            }
          }
          .blog_SuggestList_item {
            height: 100%;
            width: 100%;
            .nav_item {
              height: 0.5rem;
              width: 100%;
              margin-bottom: 0.03rem;
              line-height: 0.17rem;
              padding-left: 0.02rem;
              border-bottom: 0.01rem solid $my-theme-border;
              .title {
                font-size: 0.13rem;
                font-weight: bold;
                &:hover {
                  text-decoration: underline;
                  cursor: pointer;
                }
              }
              .content {
                p {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
                h4 {
                  text-align: right;
                  padding-right: 0.1rem;
                }
              }
              &:hover {
                background: $my-theme-background;
                cursor: pointer;
              }
            }
          }
        }
      }
      .rightBody {
        height: 100%;
        // height: 6.53rem;
        overflow: hidden;
      }
    }
  }
  #templateButton {
    width: 0.3rem;
    height: 0.5rem;
    background: $my-theme-background;
    position: absolute;
    right: 0.02rem;
    top: 0.66rem;
    line-height: 0.5rem;
    display: none;
  }
}
@media screen and (max-width: 640px) {
  #templateButton {
    display: block;
    z-index: 999;
    &:active {
      transform: scale(1.05);
    }
  }
  .mainBox {
    width: 100% !important;
    .leftAside {
      transform: translate(-2.28rem);
      transition: 1s all ease-in-out;
      z-index: 999;
      .blog_SuggestList {
        visibility: hidden;
      }
      .blog_userAvatar {
        height: 3.5rem !important;
        .blog_readNumber {
          line-height: 0.25rem !important;
          font-size: 0.26rem !important;
        }
      }
    }
    .rightBody {
      width: 100%;
      position: absolute;
      top: 0.66rem;
      left: 0;
      height: calc(100% - 0.66rem) !important;
    }
  }
}
@keyframes rotateZoom {
  0% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1.05);
  }
}
@keyframes ShiftUp {
  to {
    transform: translateY(-0.05rem);
  }
}
</style>