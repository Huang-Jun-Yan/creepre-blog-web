<template>
  <div id="blogHome">
    <el-container style="height: 100%">
      <el-main style="padding: 0.1rem">
        <!-- 轮播图 -->
        <div class="blog_banner">
          <el-row class="left">
            <el-carousel
              direction="vertical"
              :autoplay="true"
              :interval="3000"
              height="2rem"
              style="width: 100%"
            >
              <el-carousel-item
                v-for="(imgSrcItem, imgSrcIndex) in PhotoList
                  ? PhotoList
                  : imgList"
                :key="imgSrcIndex"
              >
                <img class="blog_banner_img" :src="imgSrcItem" alt="" />
              </el-carousel-item>
            </el-carousel>
          </el-row>
          <el-row class="right"></el-row>
        </div>
        <!-- 最新文章 -->
        <div class="blog_newArticle">
          <el-row class="newArticle_left">
            <h2 class="blog_newArticle_title">
              <i class="iconfont icon-xin"></i>最新文章
            </h2>
            <ul class="blog_articleBody">
              <el-scrollbar style="width: 100%" :noresize="true">
                <li
                  class="article_item"
                  v-for="articleItem in newArticleArr"
                  :key="articleItem.id"
                >
                  <el-row class="articleImg">
                    <img :src="articleItem.articleCircleUrl" alt="" />
                  </el-row>
                  <div class="articleCon">
                    <div class="articleTitle">
                      <router-link to="/">{{
                        articleItem.articleTitle
                      }}</router-link>
                      <i class="iconfont icon-wenzhang1"></i>
                    </div>
                    <div class="article">
                      <p>{{ articleItem.articleContent }}</p>
                    </div>
                    <div class="article_contenter_tag">
                      <p class="article_contenter_tag_left clearfix">
                        <!-- 文章标签 -->
                        <span class="article_contenter_label">
                          <i class="iconfont icon-biaoqian1"></i>
                          <span class="">{{ articleItem.articleTag }}</span>
                        </span>
                        <!-- 文章的发表时间 -->
                        <span class="article_contenter_time">
                          <i class="iconfont icon-shijian1"></i>
                          <span>{{ articleItem.articleTime }}</span>
                        </span>
                      </p>
                      <p class="article_contenter_tag_right clearfix">
                        <!-- 浏览次数 -->
                        <span class="article_contenter_views">
                          <i class="iconfont icon-liulan"></i>
                          <span>999</span>
                        </span>
                        <!-- 点赞次数 -->
                        <span class="article_contenter_likes">
                          <i class="iconfont icon-zan"></i>
                          <span>999</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              </el-scrollbar>
            </ul>
          </el-row>
          <div class="right">
            <ul class="recommendDemo">
              <li
                class="recommendDemoItem"
                v-for="(item, index) in recVideo"
                :key="index"
              >
                <video
                  id="rec_video"
                  style="width: 100%; height: calc(100% - 0.25rem)"
                  controls
                  :poster="item.video_pic"
                  :src="item.video_url"
                ></video>
                <h2 class="videoIntroduction">{{ item.brief }}</h2>
              </li>
            </ul>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
import { getPhotos } from "../../http/api";
export default defineComponent({
  name: "blogWebHome",
  components: {},
  directives: {},
  setup() {
    // store 实例
    const store = useStore();
    // 推荐视频
    let recVideo = reactive([]);
    recVideo = store.state.video.recVideoArr;
    // 获取最新的相册展示在轮播图
    // 相册参数
    const BlogPhotosList = reactive({
      // 页数
      page: 1,
      // 每页数量
      pageSize: 1,
      // 获取的数组
      PhotoList: [],
    });
    const imgList = ref([
      require("../../assets/images/banner/2.jpg"),
      require("../../assets/images/banner/3.jpg"),
      require("../../assets/images/banner/4.jpg"),
    ]);
    // 最新文章列表参数
    const newArticleArr = reactive([
      {
        articleId: 1,
        articleTitle: "css的基础理论",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就,好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img0.baidu.com/it/u=2013609626,3082626527&fm=26&fmt=auto&gp=0.jpg",
      },
      {
        articleId: 2,
        articleTitle: "MySQL初学",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img0.baidu.com/it/u=2592042537,1864064944&fm=26&fmt=auto&gp=0.jpg",
      },
      {
        articleId: 3,
        articleTitle: "node深入教学",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img2.baidu.com/it/u=1704219071,3761829583&fm=26&fmt=auto&gp=0.jpg",
      },
      {
        articleId: 4,
        articleTitle: "富婆的基本修养",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img1.baidu.com/it/u=335183132,539509064&fm=26&fmt=auto&gp=0.jpg",
      },
      {
        articleId: 5,
        articleTitle: "最新富婆通讯录",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img1.baidu.com/it/u=3326470141,2162636233&fm=26&fmt=auto&gp=0.jpg",
      },
      {
        articleId: 6,
        articleTitle: "JS的深入学习",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img1.baidu.com/it/u=748834325,174015308&fm=11&fmt=auto&gp=0.jpg",
      },
      {
        articleId: 7,
        articleTitle: "Vue3原理的解读",
        articleContent:
          "好久不见，给大家推荐一款远控软件，让我们在疫情影响下还能轻松办公！马上就要迎来618年中庆，对于各大平台上等待业绩爆发的掌柜们来讲，熟练使用一些工具类软件可以让大促时候工作事半功倍。这个时候就",
        articleTime: "2020-6-26 11:13",
        articleTag: "BLOG文章",
        articleCircleUrl:
          "https://img0.baidu.com/it/u=2443950855,1530352950&fm=26&fmt=auto&gp=0.jpg",
      },
    ]);
    // 获取相册
    const getBlogPhotos = async (page) => {
      await getPhotos({
        page: page,
        pageSize: BlogPhotosList.pageSize,
      })
        .then((res) => {
          if (res.data.code == 200) {
            const { data } = res.data;
            data.map((item) => {
              item.imgsrc = JSON.parse(item.imgsrc);
            });
            BlogPhotosList.PhotoList = data[0].imgsrc;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 挂载阶段
    onMounted(() => {
      // 获取相册
      getBlogPhotos(BlogPhotosList.page);
    });
    return {
      imgList,
      newArticleArr,
      recVideo,
      ...toRefs(BlogPhotosList),
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
#blogHome {
  height: 100%;
  background: #eeeeee;
  .blog_banner {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.05rem;
    .left {
      height: 100%;
      width: 6rem;
      float: left;
      margin-right: 0.1rem;
    }
    .right {
      overflow: hidden;
      height: 100%;
      background: blue;
    }
    .blog_banner_img {
      width: 100%;
      height: 100%;
    }
  }
  .blog_newArticle {
    height: 4.28rem;
    .newArticle_left {
      height: 100%;
      width: 7rem;
      float: left;
      margin-right: 0.1rem;
      overflow: hidden;
      .blog_newArticle_title {
        text-align: center;
        width: 100%;
        height: 0.35rem;
        line-height: 0.3rem;
        font-weight: bold;
        letter-spacing: 0.02rem;
        user-select: none;
        border-bottom: 0.02rem solid #cccccc;
        position: relative;
        i {
          font-size: 0.1rem;
          position: absolute;
          top: -0.06rem;
          left: 56%;
          color: red;
        }
      }
      .blog_articleBody {
        width: 100%;
        height: 3.9rem;
        .article_item {
          height: 1.5rem;
          padding: 0.05rem 0.05rem;
          box-shadow: inset 0 0 0.03rem 0.02rem #cccccc;
          border-radius: 0.05rem;
          user-select: none;
          margin: 0.05rem 0;
          background: rgba(204, 201, 201, 0.5);
          .articleImg {
            float: left;
            width: 1.5rem;
            height: 100%;
            overflow: hidden;
            border-radius: 0.05rem;
            margin-right: 0.1rem;

            img {
              width: 100%;
            }
          }
          .articleCon {
            height: 1.4rem;
            border-radius: 0.05rem;
            overflow: hidden;
            padding: 0.05rem 0.05rem;
            .articleTitle {
              display: inline-block;
              width: 100%;
              height: 0.23rem;
              a {
                font-size: 0.17rem;
                font-weight: bold;
                letter-spacing: 0.01rem;
                vertical-align: middle;
                &:hover {
                  text-decoration: underline;
                }
              }
              i {
                margin: 0 0.02rem;
              }
            }
            .article {
              width: 100%;
              height: 0.7rem;
              padding: 0.1rem 0;
              p {
                line-height: 0.2rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
              }
            }
            .article_contenter_tag {
              i {
                margin-right: 0.04rem;
              }
              .article_contenter_tag_left {
                float: left;
                .article_contenter_label {
                  margin-right: 0.2rem;
                  i {
                    color: lightcoral;
                  }
                  span {
                    color: rgb(78, 160, 40);
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
                .article_contenter_time {
                  i {
                    color: rgb(54, 161, 165);
                  }
                  span {
                    color: rgb(114, 103, 103);
                  }
                }
              }
              .article_contenter_tag_right {
                float: right;
                .article_contenter_views {
                  margin-right: 0.2rem;
                  i {
                    color: rgb(180, 150, 15);
                  }
                  span {
                    color: rgb(123, 124, 103);
                  }
                }
                .article_contenter_likes {
                  i {
                    color: rgb(202, 23, 10);
                  }
                  span {
                    color: rgb(123, 124, 103);
                  }
                }
              }
            }
          }
        }
      }
    }
    .right {
      height: 4.24rem;
      overflow: hidden;
      padding: 0.05rem;
      border-radius: 0.05rem;
      box-shadow: inset 0 0 0.05rem 0.02rem #cccccc;
      .recommendDemo {
        // height: 100%;
        width: 100%;
        .recommendDemoItem {
          border-radius: 0.05rem;
          height: 2.1rem;
          width: 100%;
          margin-bottom: 0.11rem;
          overflow: hidden;
          .videoIntroduction {
            font-size: 0.12rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>