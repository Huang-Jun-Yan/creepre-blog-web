<template>
  <div id="blogFooterBox">
    <ul class="FooterBox_contenter">
      <li>
        <img src="../../assets/images/beian/2.png" alt="" />
        <a href="www.baidu.com">这里是备案号</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "blogFooter",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
#blogFooterBox {
  height: 0.3rem;
  background: $my-theme-border;
  .FooterBox_contenter {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      user-select: none;
      img {
        width: 0.25rem;
        height: 0.25rem;
        margin: 0 0.05rem;
      }
      a {
        color: rgb(88, 85, 85);
        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>