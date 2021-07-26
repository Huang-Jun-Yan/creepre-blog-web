<template>
  <div id="index">
    <!-- 页头 -->
    <blogHeaders></blogHeaders>
    <el-container style="height: 100%">
      <el-main style="height: 100%">
        <div class="mainBox">
          <div class="leftAside clearfix">
            <!-- 头像 -->
            <el-row class="blog_userAvatar">
              <el-avatar
                class="userAvatar"
                icon="el-icon-user-solid"
                shape="circle"
                :size="100"
                fit="contain"
                @click="editAvatar"
                :src="circleUrl"
              ></el-avatar>
              <!-- 用户名字及登录注册按钮 -->
              <el-row class="blog_userName">
                <!-- 用户名字 -->
                <div class="userName" v-if="username">
                  <h2 @click="toAdmin">{{ username }}</h2>
                </div>
                <!-- 登录注册按钮 -->
                <div class="blogBtn" v-if="!username">
                  <el-button @click="toUserLogin" type="success"
                    >登录及注册</el-button
                  >
                </div>
              </el-row>
              <!-- 浏览次数 -->
              <el-row class="blog_readNumber">
                <ul>
                  <li>
                    <span><b>浏览次数</b>999</span>
                    <i class="iconfont icon-liulan"></i>
                  </li>
                  <li>
                    <span><b>收藏数量</b>999</span>
                    <i class="iconfont icon-shoucang"></i>
                  </li>
                </ul>
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
            <!-- 联系我 -->
            <div class="callMe">
              <p class="callMe_title">联系我:</p>
              <ul>
                <li>
                  <el-tooltip
                    class="blog_own_link_item_child"
                    effect="dark"
                    content="QQ联系:2503705169"
                    placement="top"
                  >
                    <el-button
                      type="text"
                      circle
                      class="iconfont icon-QQ btn"
                    ></el-button>
                  </el-tooltip>
                  <p>微信</p>
                </li>
                <li>
                  <el-tooltip
                    class="blog_own_link_item_child"
                    effect="dark"
                    content="微信联系:Darker-___-"
                    placement="top"
                  >
                    <el-button
                      type="text"
                      circle
                      class="iconfont icon-weixin1 btn"
                    ></el-button>
                  </el-tooltip>
                  <p>QQ</p>
                </li>
                <li>
                  <el-tooltip
                    class="blog_own_link_item_child"
                    effect="dark"
                    content="github:https://github.com/Huang-Jun-Yan"
                    placement="top"
                  >
                    <el-button
                      type="text"
                      circle
                      class="iconfont icon-github btn"
                    ></el-button>
                  </el-tooltip>
                  <p>gitHub</p>
                </li>
                <li>
                  <el-tooltip
                    class="blog_own_link_item_child"
                    effect="dark"
                    content="微博:https://weibo.com/u/7561336645/home"
                    placement="top"
                  >
                    <el-button
                      type="text"
                      circle
                      class="iconfont icon-weibo1 btn"
                    ></el-button>
                  </el-tooltip>
                  <p>微博</p>
                </li>
              </ul>
            </div>
            <!-- 友情链接 -->
            <div class="blog_Links">
              <p class="Links_title">友情链接</p>
              <ul>
                <li>
                  <el-tooltip
                    class="blog_own_link_item_child"
                    effect="dark"
                    content="QQ联系:2503705169"
                    placement="top"
                  >
                    <el-button
                      type="text"
                      circle
                      class="iconfont icon-QQ btn"
                    ></el-button>
                  </el-tooltip>
                  <p>微信</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="rightBody">
            <router-view v-slot="{ Component }">
              <transition name="el-zoom-in-center">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </el-main>
    </el-container>
    <!-- 页脚 -->
    <!-- <blogFooters></blogFooters> -->
  </div>
</template>

<script>
import blogHeaders from "@/components/blogHeader";
// import blogFooters from "../../components/blogFooter";
import { useRouter } from "vue-router";
import {
  defineComponent,
  onMounted,
  provide,
  reactive,
  toRefs,
  ref,
} from "vue";
import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
import { getuserInfo, getRecentArticle } from "@/http/api";
import { getDate } from "@/util/date";
export default defineComponent({
  name: "blogIndex",
  components: {
    blogHeaders,
    // blogFooters,
  },
  setup() {
    // 路由实例
    const router = useRouter();
    // 用户信息
    const blogUserInfo = reactive({
      username: "",
      introduction: "",
      circleUrl: "",
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
          // console.log(articleRec.value);
        }
      });
    };
    // 根据id跳转对应文章详情
    const toArticleDetail = (article_id) => {
      router.replace(`/creepreBlog/article/articleDetail/${article_id}/users`);
    };
    /* 挂载阶段钩子 */
    onMounted(() => {
      // 获取近期文章
      recentArticle();
      // 用户登录
      userLogin();
    });
    // 用户登录
    const userLogin = () => {
      // 获取token
      const { userToken } = getStorage("blogUserToken")
        ? getStorage("blogUserToken")
        : {};
      if (!userToken) {
        ElMessage.warning({
          message: "您还没有登录注册哦!",
          type: "warning",
        });
        return false;
      } else {
        const userInfo = getStorage("blogUserInfo");
        // 用token查询用户信息
        getuserInfo({ token: userToken })
          .then((res) => {
            if (res.data.code == 200) {
              blogUserInfo.username = res.data.Info.username
                ? userInfo.username.name
                : res.data.Info.username;
              blogUserInfo.introduction = res.data.Info.introduction;
              blogUserInfo.circleUrl = res.data.Info.avatar;
            } else if (res.data.code == 401) {
              localStorage.removeItem("userInfo");
              ElMessage.error(res.data.msg);
              return false;
            } else if (res.data.code == 400) {
              ElMessage.error("您还没有登录哦！");
              return false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    // 跳转至登录页
    const toUserLogin = () => {
      router.push("/users/blogLogin");
    };
    // 管理员是否登录
    // const isAdminLogin = async () => {
    //   let admin_id;
    //   if (!getStorage("adminInfo").admin_id) {
    //     ElMessage.warning({
    //       message: "警告，管理未登录",
    //       type: "warning",
    //     });
    //     return false;
    //   } else {
    //     admin_id = getStorage("adminInfo").admin_id;
    //   }
    //   const res = await adminIsLogined({ admin_id: admin_id });
    //   if (res.data.code == 200) {
    //     return true;
    //   }
    //   return false;
    // };
    // 跳转至后台管理
    const toAdmin = async () => {
      // 先判断是否登录
      // const res = await isAdminLogin();
      // if (res) {
      //   router.replace("/creepreBlog/admin");
      // } else {
      // 上面没有返回true，执行下面去登录
      const { username } = getStorage("blogUserInfo");
      if (username.username == "admin") {
        router.replace("/users/admin/adminLogin");
      } else {
        ElMessage.warning({
          message: "您还不是管理员哦！",
          type: "warning",
        });
        return false;
        // }
      }
    };
    // 用户修改信息页面
    const editAvatar = async () => {
      router.push("/creepreBlog/editInfo");
    };
    return {
      ...toRefs(blogUserInfo),
      editAvatar,
      toUserLogin,
      toAdmin,
      articleRec,
      toArticleDetail,
    };
  },
});
</script>
<style lang="scss" scoped>
#index {
  min-height: calc(100% - 0.6rem);
  height: calc(100% - 0.8rem);
  .el-container {
    width: 100%;
    .el-main {
      padding: 0;
      display: flex;
      justify-content: center;
      .mainBox {
        width: calc(100% - 15%);
        height: 100%;
        .leftAside {
          height: 6.52rem;
          width: 2.3rem;
          background: #eeeeee;
          float: left;
          margin-right: 0.1rem;
          .blog_userAvatar {
            display: flex;
            justify-content: center;
            height: 2.1rem;
            // background: red;
            border-bottom: 0.01rem solid #dddddd;
            .blog_readNumber {
              width: 100%;
              height: 0.3rem;
              user-select: none;
              ul {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                li {
                  span {
                    b {
                      font-weight: bold;
                      margin: 0 0.02rem;
                    }
                  }
                  i {
                    margin: 0 0.02rem;
                    vertical-align: middle;
                  }
                }
              }
            }
            .userAvatar {
              margin-top: 0.05rem;
              transition: 1s all;
              &:hover {
                transform: rotate(360deg);
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
            height: 2rem;
            padding: 0.03rem 0;
            box-shadow: inset 0 0 0.03rem 0.02rem #cccccc;
            margin-bottom: 0.2rem;
            .noContent {
              height: calc(100% - 0.22rem);
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .suggestTitle {
              font-weight: bold;
              margin: 0.05rem 0 0.05rem 0.05rem;
              i {
                color: orange;
                margin: 0 0.05rem;
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
                border-bottom: 0.01rem solid #cccccc;
                .title {
                  font-size: 0.13rem;
                  font-weight: bold;
                  &:hover {
                    text-decoration: underline;
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
                  background: #e6e6e6;
                }
              }
            }
          }
          .callMe {
            height: 1rem;
            margin-bottom: 0.2rem;
            .callMe_title {
              font-size: 0.16rem;
              padding: 0.05rem 0 0.05rem 0.05rem;
              letter-spacing: 0.01rem;
              border-bottom: 0.01rem solid #cccccc;
            }
            ul {
              width: 100%;
              height: calc(100% - 0.27rem);
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              li {
                text-align: center;
                .btn {
                  color: black;
                }
                p {
                  user-select: none;
                }
              }
            }
          }
          .blog_Links {
            height: 1rem;
            .Links_title {
              font-size: 0.16rem;
              padding: 0.05rem 0 0.05rem 0.05rem;
              letter-spacing: 0.01rem;
              border-bottom: 0.01rem solid #cccccc;
            }
            ul {
              width: 100%;
              height: calc(100% - 0.27rem);
              display: flex;
              justify-content: space-between;
              align-items: center;
              li {
                text-align: center;
                .btn {
                  color: black;
                }
                p {
                  user-select: none;
                }
              }
            }
          }
        }
        .rightBody {
          height: 6.53rem;
          overflow: hidden;
        }
      }
    }
  }
}
</style>