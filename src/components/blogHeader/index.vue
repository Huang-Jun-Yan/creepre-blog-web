<template>
  <div id="blogHeader">
    <div class="blogHeaderBox">
      <!-- 博客logo -->
      <div class="left clearfix">
        <div class="blog_logo">
          <img src="../../assets/images/bloglogo.png" alt="" />
          <h2 class="blogName">creepre の 博客</h2>
        </div>
      </div>
      <!-- 博客导航 -->
      <div class="right">
        <el-row class="blogMusicDome">
          <el-col
            style="display: flex; align-items: center; justify-content: center"
            :span="6"
          >
            <div class="grid-content bg-purple">
              <el-progress
                type="circle"
                :width="60"
                :percentage="percentage ? percentage : 0"
                status="success"
                :stroke-width="2"
                :color="[
                  { color: '#f56c6c', percentage: 20 },
                  { color: '#e6a23c', percentage: 40 },
                  { color: '#5cb87a', percentage: 60 },
                  { color: '#1989fa', percentage: 80 },
                  { color: '#6f7ad3', percentage: 100 },
                ]"
              >
                <el-avatar
                  :class="ifSongImgRotate"
                  fit="fit"
                  :size="56"
                  :src="musicItem.music_img"
                  >未上传</el-avatar
                >
              </el-progress>
            </div>
          </el-col>
          <el-col :span="18" style="padding: 0.01rem 0">
            <div class="grid-content bg-purple">
              <el-col :span="16" style="margin-right: 0.2rem">
                <transition name="el-fade-in">
                  <p class="songTitle">
                    {{ musicItem.singer_name }}
                    <i
                      style="font-size: 0.1rem; color: coral"
                      class="iconfont icon-icon-test"
                    ></i>
                  </p>
                </transition>
                <div class="musicControl">
                  <div
                    style="font-size: 0.2rem; color: #cccccc"
                    class="controlRight iconfont icon-youjiantou"
                    @click="onPreviousMusic"
                  ></div>
                  <div
                    style="font-size: 0.2rem; color: #cccccc"
                    class="controlMiddle iconfont"
                    :class="isPlay"
                    @click="onPauseMusic"
                  ></div>
                  <div
                    style="font-size: 0.2rem; color: #cccccc"
                    class="controlLeft iconfont icon-zuojiantou1"
                    @click="onNextMusic"
                  ></div>
                </div>
              </el-col>
              <el-col :span="8" style="padding-top: 0.02rem">
                <!-- <el-slider
                  v-model="volumeValue"
                  :show-tooltip="false"
                  vertical
                  height=".45rem"
                >
                </el-slider> -->
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="navMenu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            menu-trigger="click"
            background-color="white"
            @select="handleSelect"
            text-color="#090909"
            active-text-color="#ffcc66"
            router
          >
            <el-menu-item
              v-for="(routerItem, index) in routerInfoArr[0]"
              :index="routerItem.path"
              :key="index"
            >
              {{ routerItem.meta.routerName }}
            </el-menu-item>
          </el-menu>
        </el-row>
      </div>
    </div>
    <!-- 音乐播放 -->
    <audio
      id="Audio"
      ref="audio"
      :preload="true"
      :autoplay="false"
      :src="musicItem.music_url"
      :volume="0.1"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="timeUpDate"
      @ended="musicEnded"
    ></audio>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  inject,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { getBlogMusic } from "@/http/api";
export default defineComponent({
  name: "headers",
  components: {},
  setup() {
    const routerInfoArr = ref([]);
    const activeIndex = ref("1");
    const volumeValue = ref(100);
    const musicListObj = reactive({
      musicLength: null,
      audio: "",
      ifSongImgRotate: "", // songImg
      isPlay: "icon-bofang", //icon-zantingtingzhi 暂停 icon-bofang 播放
      index: 0,
      musicItem: {},
      percentage: null,
    });
    // 动态导航
    const dynNav = () => {
      /* 子接收父组件传递的值 */
      const routerInfo = inject("routerInfo");
      routerInfoArr.value.push(routerInfo.children);
      if (routerInfoArr.value[0].length >= 5) {
        routerInfoArr.value[0].splice(4, routerInfoArr.value[0].length - 4);
      }
    };
    // 获取音乐
    const getMusic = (index) => {
      getBlogMusic()
        .then((res) => {
          if (res.data.code == 200) {
            const { data } = res.data;
            musicListObj.musicLength = data.length;
            musicListObj.musicItem = data[index];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 播放中的回调
    const onPlay = (e) => {
      musicListObj.audio = e.path[0];
      musicListObj.ifSongImgRotate = "songImg";
    };
    // 暂停的回调
    const onPause = () => {};
    // 点击暂停及播放
    const onPauseMusic = () => {
      let { audio } = musicListObj;
      // 为false的时候是播放状态
      if (!audio.paused) {
        audio.pause();
        musicListObj.isPlay = "icon-bofang";
        musicListObj.ifSongImgRotate = "";
      } else if (audio.paused) {
        audio.play();
        musicListObj.isPlay = "icon-zantingtingzhi";
        musicListObj.ifSongImgRotate = "songImg";
      }
    };
    // 点击下一首
    const onNextMusic = () => {
      let { audio } = musicListObj;
      audio.pause();
      musicListObj.index++;
      if (musicListObj.index == musicListObj.musicLength) {
        musicListObj.index = 0;
      }
      // 为false的时候是播放状态
      if (audio.paused) {
        setTimeout(() => {
          audio.play();
        }, 500);
      }
    };
    // 点击上一首
    const onPreviousMusic = () => {
      let { audio } = musicListObj;
      audio.pause();
      if (musicListObj.index == 0) {
        musicListObj.index = musicListObj.musicLength;
      }
      musicListObj.index--;
      // 为false的时候是播放状态
      if (audio.paused) {
        setTimeout(() => {
          audio.play();
        }, 500);
      }
    };
    // 播放结束
    const musicEnded = () => {
      let { audio } = musicListObj;
      audio.pause();
      musicListObj.index++;
      if (musicListObj.index == musicListObj.musicLength) {
        musicListObj.index = 0;
      }
      // 为false的时候是播放状态
      if (audio.paused) {
        setTimeout(() => {
          audio.play();
          musicListObj.isPlay = "icon-zantingtingzhi";
          musicListObj.ifSongImgRotate = "songImg";
        }, 500);
      }
    };
    // 播放时间
    const timeUpDate = () => {
      //获取当前播放的百分比  当前进度/总进度
      let percent =
        musicListObj.audio.currentTime / musicListObj.audio.duration;
      musicListObj.percentage = Number((percent * 100).toFixed(0));
    };
    // 动态匹配activeIndex
    const activeIndexArr = ref([
      "/creepreBlog/blogHome",
      "/creepreBlog/blogArticle",
      "/creepreBlog/blogPhoto",
      "/creepreBlog/blogDemo",
    ]);
    // 监听
    watch(
      () => musicListObj.index,
      () => {
        getMusic(musicListObj.index);
      }
    );
    // 挂载阶段
    onMounted(async () => {
      // 动态导航
      dynNav();
      // 获取音乐
      await getMusic(musicListObj.index);
    });
    let index;
    const handleSelect = (key) => {
      index = activeIndexArr.value.findIndex((val) => val == key);
      activeIndex.value = index + 1 + "";
    };
    return {
      handleSelect,
      activeIndex,
      routerInfoArr,
      volumeValue,
      ...toRefs(musicListObj),
      onPlay,
      onPause,
      onPauseMusic,
      onNextMusic,
      onPreviousMusic,
      timeUpDate,
      musicEnded,
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
#blogHeader {
  width: 100%;
  height: 0.6rem;
  z-index: 999;
  .blogHeaderBox {
    position: fixed;
    top: 0;
    left: 0;
    height: 0.6rem;
    width: 100%;
    background: white;
    z-index: 999;
    .left {
      width: calc(100% - 80% - 0.31rem);
      height: 100%;
      float: left;
      padding-left: 1rem;
      user-select: none;
      .blog_logo {
        height: 100%;
        line-height: 0.6rem;
        img {
          width: 0.55rem;
          height: 0.55rem;
          margin: 0 0.2rem;
          float: left;
        }
        h2 {
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          font-weight: bold;
          letter-spacing: 0.01rem;
        }
      }
    }
    .right {
      height: 100%;
      margin: 0;
      overflow: hidden;
      display: flex;
      .blogMusicDome {
        width: 3rem;
        margin: 0 0.5rem 0 1rem;
        // background: chartreuse;
        .musicControl {
          display: inline-block;
          display: flex;
          justify-content: space-between;
          width: 1rem;
          margin-top: 0.07rem;

          .controlRight {
            &:hover {
              color: orange !important;
              cursor: pointer;
            }
          }
          .controlMiddle {
            &:hover {
              color: orange !important;
              cursor: pointer;
            }
          }
          .controlLeft {
            &:hover {
              color: orange !important;
              cursor: pointer;
            }
          }
        }
        .songImg {
          animation: avatarRotate 3s linear infinite;
        }
      }
      .navMenu {
        height: 100%;
        margin-left: 1rem;
        background: #8a8a8ae6;
        .el-menu-demo {
          height: 100%;
          .el-menu-item {
            height: calc(100% - 10%);
          }
        }
      }
    }
  }
}
@keyframes avatarRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 1500px) {
  .blogName {
    visibility: hidden;
  }
}
</style>