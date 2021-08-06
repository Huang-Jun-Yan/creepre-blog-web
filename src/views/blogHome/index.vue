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
                v-for="(imgSrcItem, imgSrcIndex) in PhotoList"
                :key="imgSrcIndex"
              >
                <!-- <img class="blog_banner_img" :src="imgSrcItem" alt="" /> -->
                <el-image fit="fill" :src="imgSrcItem" class="blog_banner_img">
                  <template #error>
                    <div class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </template>
                </el-image>
              </el-carousel-item>
            </el-carousel>
          </el-row>
          <div class="right">
            <p class="jokeTiele">每日娱乐</p>
            <p class="jokeContent">
              <el-empty
                :image-size="50"
                v-if="!joke.text"
                description="今日没有笑话哦"
              ></el-empty>
              <el-scrollbar v-if="joke.text" height="1.4rem">
                <span>{{ joke.text }}</span>
              </el-scrollbar>
            </p>
            <div class="jokeSwitch">
              <span @click="previousJoke">上一个</span>
              <span @click="nextJoke">下一个</span>
            </div>
          </div>
        </div>
        <!-- 最新文章 -->
        <div class="blog_newArticle">
          <el-row class="newArticle_left">
            <h2 class="blog_newArticle_title">
              <i class="iconfont icon-xin"></i>最新文章
            </h2>
            <ul class="blog_articleBody">
              <el-empty
                v-if="!newArticleList.length"
                description="暂时没有文章，过几天再来吧"
              ></el-empty>
              <transition name="el-zoom-in-top">
                <el-scrollbar
                  v-if="newArticleList.length"
                  style="width: 100%"
                  :noresize="true"
                >
                  <li
                    class="article_item"
                    v-for="(articleItem, index) in newArticleList"
                    :key="index"
                  >
                    <el-row class="articleImg">
                      <!-- <img :src="articleItem.img" alt="" /> -->
                      <el-image
                        style="width: 100%; height: 100%"
                        :src="articleItem.img"
                        fit="cover"
                      >
                      </el-image>
                    </el-row>
                    <div class="articleCon">
                      <div class="articleTitle">
                        <a @click="toArticleDetail(articleItem.article_id)">{{
                          articleItem.title
                        }}</a>
                        <i class="iconfont icon-wenzhang1"></i>
                      </div>
                      <div class="article">
                        <p>{{ articleItem.brief }}</p>
                      </div>
                      <div class="article_contenter_tag">
                        <p class="article_contenter_tag_left clearfix">
                          <!-- 文章标签 -->
                          <span class="article_contenter_label">
                            <i class="iconfont icon-biaoqian1"></i>
                            <span
                              @click="
                                router.replace(
                                  `/creepreBlog/article/articleDetail/${articleItem.article_id}/users`
                                )
                              "
                              class=""
                              >{{ articleItem.label }}</span
                            >
                          </span>
                          <!-- 文章的发表时间 -->
                          <span class="article_contenter_time">
                            <i class="iconfont icon-shijian1"></i>
                            <span>{{ getDate(articleItem.create_time) }}</span>
                          </span>
                        </p>
                        <p class="article_contenter_tag_right clearfix">
                          <!-- 浏览次数 -->
                          <span class="article_contenter_views">
                            <i class="iconfont icon-liulan"></i>
                            <span>{{ articleItem.browse_num || 0 }}</span>
                          </span>
                          <!-- 点赞次数 -->
                          <span class="article_contenter_likes">
                            <i
                              @click="onUserLike(articleItem.article_id)"
                              class="iconfont icon-zan"
                              :class="likesIcon"
                            ></i>
                            <span>{{ articleItem.like_Star }}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <div class="pagination">
                    <el-pagination
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                      "
                      background
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="pageSize"
                      @current-change="handleChange"
                    >
                    </el-pagination>
                  </div>
                </el-scrollbar>
              </transition>
            </ul>
          </el-row>
          <div class="right">
            <div class="blogInfo">
              <h3 class="title">博客信息</h3>
              <ul>
                <li>
                  <i class="iconfont icon-wenzhang"></i>
                  <span>文章数量:</span>
                  <i class="clearfix num">{{ total }}</i>
                </li>
                <li>
                  <i class="iconfont icon-zan"></i>
                  <span>点赞数量:</span>
                  <i class="clearfix num">{{ likeStar_num }}</i>
                </li>
                <li>
                  <i class="iconfont icon-liulan"></i>
                  <span>浏览数量:</span>
                  <i class="clearfix num">{{ browseViews_num }}</i>
                </li>
                <li>
                  <i class="iconfont icon-xiangce"></i>
                  <span>相册数量:</span>
                  <i class="clearfix num">{{ photo_num }}</i>
                </li>
                <li>
                  <i class="iconfont icon-shipin"></i>
                  <span>视频数量:</span>
                  <i class="clearfix num">{{ video_num }}</i>
                </li>
              </ul>
            </div>
            <!-- 联系 -->
            <callMe />
            <!-- 联系 -->
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import callMe from "@/components/call_me";
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import axios from "axios";
import {
  getPhotos,
  getAllArticle,
  addArticleLikeStar,
  getLikeStarStatus,
  getAllStarNum,
  getAllVideo,
  getAllPhoto,
  getAllBrowseViewsNum,
} from "@/http/api";
import { getDate } from "@/util/date";
import { useRouter } from "vue-router";
import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "blogWebHome",
  components: {
    callMe,
  },
  setup() {
    // 路由实例
    const router = useRouter();
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
    // 最新文章列表参数
    const newArticleObj = reactive({
      // 页数
      page: 1,
      // 每页数量
      pageSize: 5,
      // 总数
      total: 0,
      // 获取的数组
      newArticleList: [],
      // 点赞的图标
      likesIcon: "", // icon-yidianzan likes
    });
    // 博客信息
    const blogInfoObj = reactive({
      likeStar_num: 0,
      browseViews_num: 0,
      video_num: 0,
      photo_num: 0,
    });
    // 笑话参数
    const jokeobj = reactive({
      // 页数
      page: Math.floor(Math.random() * 870),
      // 获取的数组
      joke: {},
    });
    // 获取文章
    const getBlogArticle = (page) => {
      getAllArticle({
        page: page,
        pageSize: newArticleObj.pageSize,
      })
        .then((res) => {
          if (res.data.code == 200) {
            const { data } = res.data.data;
            newArticleObj.total = res.data.data.count;
            newArticleObj.newArticleList = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 改变时触发
    const handleChange = (val) => {
      newArticleObj.page = val;
    };
    // 根据id跳转对应文章详情
    const toArticleDetail = (article_id) => {
      router.replace(`/creepreBlog/article/articleDetail/${article_id}/users`);
    };
    // 获取相册
    const getBlogPhotos = async (page) => {
      await getPhotos({
        page: page,
        pageSize: BlogPhotosList.pageSize,
      })
        .then((res) => {
          if (res.data.code == 200) {
            const { data } = res.data;
            data.data.map((item) => {
              item.imgsrc = JSON.parse(item.imgsrc).splice(
                5,
                JSON.parse(item.imgsrc).length - 5
              );
            });
            BlogPhotosList.PhotoList = data.data[0].imgsrc;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 获取笑话
    const getJokeRes = async (page) => {
      const res = await axios.get("https://api.apiopen.top/getJoke", {
        params: {
          page: page,
          count: 1,
          type: "text",
        },
      });
      if (res.data.code == 200) {
        const { result } = res.data;
        jokeobj.joke = result[0];
      } else {
        console.log("请求失败");
      }
    };
    // 下一个笑话
    const nextJoke = () => {
      jokeobj.page++;
      if (jokeobj.page == 870) {
        jokeobj.page = Math.floor(Math.random() * 870);
      }
    };
    // 上一个笑话
    const previousJoke = () => {
      if (jokeobj.page == 1) {
        jokeobj.page = Math.floor(Math.random() * 870);
      }
      jokeobj.page--;
    };
    // 点赞
    const onUserLike = async (article_id) => {
      /* 上传点赞状态 */
      try {
        const res = await getLikeStarStatus({
          article_id: article_id,
          username: getStorage("blogUserInfo").username,
        });
        if (res.data.code == 200 && res.data.data[0].like_Star_status == 1) {
          addArticleLikeStar({
            username: res.data.data[0].username,
            article_id: res.data.data[0].article_id,
            like_Star_status: res.data.data[0].like_Star_status,
          }).then((res) => {
            if (res.data.code == 200) {
              ElMessage.warning("你取消点赞,我有点难过 ≥﹏≤");
              getBlogArticle(newArticleObj.page);
            }
          });
        } else {
          addArticleLikeStar({
            username: getStorage("blogUserInfo").username,
            article_id: article_id,
            like_Star_status: res.data.data.like_Star_status,
          }).then((res) => {
            if (res.data.code == 200) {
              ElMessage.success("谢谢你的赞同 ≥ω≤");
              getBlogArticle(newArticleObj.page);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    /* 博客信息 */
    const blogInfo = async () => {
      try {
        const res = await Promise.all([
          getAllStarNum(),
          getAllVideo(),
          getAllPhoto(),
          getAllBrowseViewsNum(),
        ]);
        blogInfoObj.likeStar_num = res[0].data.data.likeStar;
        blogInfoObj.video_num = res[1].data.data.video_num;
        blogInfoObj.photo_num = res[2].data.data.photo_num;
        blogInfoObj.browseViews_num = res[3].data.data.browseViews;
      } catch (err) {
        console.log(err);
      }
    };
    // 监听
    watch(
      () => jokeobj.page,
      () => {
        getJokeRes(jokeobj.page);
      }
    );
    watch(
      () => newArticleObj.page,
      () => {
        getBlogArticle(newArticleObj.page);
      }
    );
    // 挂载阶段
    onMounted(() => {
      // 博客信息
      blogInfo();
      // 获取笑话
      getJokeRes(jokeobj.page);
      // 获取文章
      getBlogArticle(newArticleObj.page);
      // 获取相册
      getBlogPhotos(BlogPhotosList.page);
    });
    return {
      ...toRefs(newArticleObj),
      ...toRefs(BlogPhotosList),
      ...toRefs(jokeobj),
      ...toRefs(blogInfoObj),
      getDate,
      toArticleDetail,
      nextJoke,
      previousJoke,
      onUserLike,
      router,
      handleChange,
    };
  },
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
      box-shadow: inset 0 0 0.05rem 0.02rem #cccccc;
      user-select: none;
      .jokeTiele {
        text-align: center;
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        letter-spacing: 0.01rem;
        font-size: 0.16rem;
        font-weight: bold;
      }
      .jokeContent {
        min-height: 1.4rem;
        padding: 0 0.2rem;
        line-height: 0.17rem;
      }
      .jokeSwitch {
        height: 0.25rem;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        &:hover span {
          cursor: pointer;
        }
        span:active {
          transform: scale(1.1);
          user-select: none;
        }
      }
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
      width: 7.5rem;
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
                  cursor: pointer;
                }
                &:active {
                  transform: scale(1.1);
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
                      cursor: pointer;
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
                    &:active {
                      transform: scale(1.5);
                      user-select: none;
                    }
                  }
                  span {
                    color: rgb(123, 124, 103);
                  }
                  &:hover i {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
        .pagination {
          height: 0.3rem;
          margin-top: 0.01rem;
          background: #eeeeee;
        }
      }
    }
    .right {
      height: 4.24rem;
      overflow: hidden;
      padding: 0.05rem;
      border-radius: 0.05rem;
      box-shadow: inset 0 0 0.05rem 0.02rem #cccccc;
      user-select: none;
      .blogInfo {
        .title {
          border-bottom: 0.02rem solid #cccccc;
          padding: 0.077rem 0;
          letter-spacing: 0.02rem;
        }
        ul {
          li {
            margin: 0.1rem 0;
            border-bottom: 0.01rem solid #cccccccc;
            padding: 0.05rem 0.01rem;
            span {
              display: inline-block;
              width: 0.65rem;
              text-align: right;
              font-weight: bold;
            }
            .num {
              float: right;
              margin-right: 0.1rem;
            }
            .iconfont {
              font-size: 0.12rem;
              color: aquamarine;
            }
          }
        }
      }
    }
  }
}

@keyframes likes {
  to {
    transform: scale(1.05);
  }
}
</style>