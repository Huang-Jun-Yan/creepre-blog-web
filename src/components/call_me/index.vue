<template>
  <!-- 联系我 -->
  <div class="callMe">
    <h3 class="callMe_title">联系我</h3>
    <ul>
      <li>
        <el-tooltip
          class="blog_own_link_item_child"
          effect="light"
          content="QQ联系:2503705169"
          placement="top"
        >
          <el-button
            type="text"
            circle
            class="iconfont icon-QQ btn"
          ></el-button>
        </el-tooltip>
        <p>QQ</p>
      </li>
      <li>
        <el-tooltip
          class="blog_own_link_item_child"
          effect="light"
          content="微信联系:Darker-___-"
          placement="top"
        >
          <el-button
            type="text"
            circle
            class="iconfont icon-weixin1 btn"
          ></el-button>
        </el-tooltip>
        <p>微信</p>
      </li>
      <li>
        <el-tooltip
          class="blog_own_link_item_child"
          effect="light"
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
          effect="light"
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
    <h3 class="Links_title">友情链接</h3>
    <ul>
      <li>
        <el-tooltip
          class="blog_own_link_item_child"
          effect="light"
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
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "templateCall_me",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.callMe {
  height: 1rem;
  .callMe_title {
    font-size: 0.16rem;
    padding: 0.05rem 0 0.05rem 0.05rem;
    letter-spacing: 0.01rem;
    border-bottom: 0.01rem solid #cccccc;
  }
  ul {
    width: 100%;
    // height: .73rem;
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
    // height: calc(100% - 0.27rem);
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
</style>