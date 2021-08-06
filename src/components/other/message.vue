<template>
  <div id="MessageBox">
    <ul>
      <li @click="$router.push('/creepreBlog/messageBoard')">
        <i class="iconfont icon-liuyanban"></i>
        <span>留言板</span>
        <i class="iconfont icon-youjiantou1"></i>
      </li>
      <li @click="onAboutMe">
        <i class="iconfont icon-jianli-A"></i>
        <span>关于我的</span>
        <i class="iconfont icon-youjiantou1"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "templateMessageBoard",
  components: {},
  setup() {
    const onMessageBoard = () => {};
    const onAboutMe = () => {};
    // 挂载阶段
    onMounted(() => {});
    return {
      onMessageBoard,
      onAboutMe
    };
  },
});
</script>

<style lang="scss" scoped>
#MessageBox {
  min-height: 1.1rem;
  ul {
    li {
      border-bottom: 0.02rem solid #cccccc;
      padding: 0.1rem 0.03rem;
      margin: 0.03rem 0;
      transition: 0.3s all;
      i:nth-child(0n + 1) {
        margin: 0 0.05rem;
      }
      i:nth-child(n + 2) {
        float: right;
      }
      span {
        font-weight: bold;
      }
      &:hover {
        cursor: pointer;
      }
      &:active {
        background: #fff;
      }
    }
  }
}
</style>