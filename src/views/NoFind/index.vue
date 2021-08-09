<template>
  <div class="system">
    <div class="img">
      <img src="./image/404.png" />
    </div>
    <div class="title">
      <h2>页面走丢了...</h2>
      <h4>亲爱的！非常抱歉，您所请求的页面不存在！</h4>
      <h4>请仔细检查您输入的网址是否正确。</h4>
      <router-link to="/">前往=>Creepre的博客</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreepreBlogNOFind",
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.system {
  user-select: none;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  background: #7395ff;
  .img {
    text-align: center;
    transform: translateX(-0.3rem);
  }
  .title {
    text-align: center;
    line-height: 0.5rem;
    h2 {
      color: #fff;
      font-size: 0.36rem;
      letter-spacing: 0.04rem;
    }
    h4 {
      color: #fff;
      font-size: 0.18rem;
    }
    a {
      color: #fff;
      font-size: 0.16rem;
      &:hover {
          border-bottom: .01rem solid black;
      }
      &:active {
          transform: scale(1.1);
      }
    }
  }
}
</style>