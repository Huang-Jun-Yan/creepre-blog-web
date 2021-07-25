<template>
  <div id="blogHeader">
    <div class="blogHeaderBox">
      <!-- 博客logo -->
      <div class="left clearfix">
        <div class="blog_logo">
          <img src="../../assets/images/bloglogo.png" alt="" />
          <h2>creepre の 博客</h2>
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
              <el-avatar fit="fit" :size="55" src="">未上传</el-avatar>
            </div>
          </el-col>
          <el-col :span="18" style="padding: 0.01rem 0">
            <div class="grid-content bg-purple">
              <el-col :span="16" style="margin-right: .2rem;">
                <p class="songTitle">
                  一叶知秋<i
                    style="font-size: 0.1rem; color: coral"
                    class="iconfont icon-icon-test"
                  ></i>
                </p>
                <div class="musicControl">
                  <div
                    style="font-size: 0.26rem; color: #cccccc"
                    class="controlRight iconfont icon-youjiantou"
                  ></div>
                  <div
                    style="font-size: 0.26rem; color: #cccccc"
                    class="controlMiddle iconfont icon-bofang"
                  ></div>
                  <div
                    style="font-size: 0.26rem; color: #cccccc"
                    class="controlLeft iconfont icon-zuojiantou1"
                  ></div>
                </div>
              </el-col>
              <el-col :span="8" style="padding-top: 0.02rem">
                <el-slider
                  v-model="volumeValue"
                  :show-tooltip="false"
                  vertical
                  height=".45rem"
                >
                </el-slider>
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
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from "vue";
// import { getBlogMusic } from "../../http/api";
export default defineComponent({
  name: "headers",
  components: {},
  setup() {
    const routerInfoArr = ref([]);
    const activeIndex = ref("1");
    const volumeValue = ref(100);
    // 动态导航
    const dynNav = () => {
      /* 子接收父组件传递的值 */
      const routerInfo = inject("routerInfo");
      routerInfoArr.value.push(routerInfo.children);
      if (routerInfoArr.value[0].length >= 5) {
        routerInfoArr.value[0].splice(4, routerInfoArr.value[0].length - 4);
      }
    };
    //
    const arr = (val) => {
      console.log(val);
      // return val / 100;
    };
    // 动态匹配activeIndex
    const activeIndexArr = ref([
      "/creepreBlog/blogHome",
      "/creepreBlog/blogArticle",
      "/creepreBlog/blogPhoto",
      "/creepreBlog/blogDemo",
    ]);
    // 挂载阶段
    onMounted(() => {
      // 动态导航
      dynNav();
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
      arr,
      volumeValue,
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
          margin-left: 0.1rem;
          margin-top: 0.07rem;
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
</style>