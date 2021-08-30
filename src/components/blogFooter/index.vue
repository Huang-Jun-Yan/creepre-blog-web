<template>
  <div id="blogFooterBox">
    <ul class="FooterBox_contenter">
      <li>
        <span @click="onToPolice">👮‍警察抓小偷Dome</span>
      </li>
      <li>
        <img src="../../assets/images/beian/2.png" alt="" />
        <a
          href="https://beian.miit.gov.cn/?spm=a2cmq.17629970.J_9220772140.115.f0d079fej4lKVV"
          >蜀ICP备2021021347号</a
        >
        <img src="../../assets/images/beian/1.gif" alt="" />
      </li>
      <li>
        <span>本网站转载的内容所有权归转载作者所有</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "blogFooter",
  components: {},
  setup() {
    const onToPolice = () => {
      location.href = "http://police.creepre.top/";
    };
    return {
      onToPolice,
    };
  },
});
</script>

<style lang="scss" scoped>
#blogFooterBox {
  height: 0.3rem;
  background: $my-theme-border;
  .FooterBox_contenter {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    li {
      user-select: none;
      &:nth-child(1) {
        span {
          color: rgb(88, 85, 85);
          &:hover {
            cursor: pointer;
            color: white;
          }
        }
      }
      &:nth-child(2) {
        img {
          width: 0.25rem;
          height: 0.25rem;
          margin: 0 0.05rem;
          vertical-align: bottom;
        }
        a {
          color: rgb(88, 85, 85);
          &:hover {
            color: white;
          }
        }
      }
      &:nth-child(3) {
        span {
          color: rgb(88, 85, 85);
          &:hover {
            cursor: pointer;
            color: white;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .FooterBox_contenter {
    li {
      display: none;
      &:nth-child(2) {
        display: block;
      }
    }
  }
}
</style>