<template>
  <div id="MessageBox">
    <ul>
      <li @click="onMessageBoard">
        <i class="iconfont icon-liuyanban"></i>
        <span>留言板</span>
        <i class="iconfont icon-youjiantou1"></i>
      </li>
      <li @click="onAboutMe">
        <i class="iconfont icon-jianli-A"></i>
        <span>关于我的</span>
        <i class="iconfont icon-youjiantou1"></i>
      </li>
      <li style="padding: 0.05rem 0.03rem; border-bottom: none">
        <i class="iconfont icon-ecs-running"></i>
        <span>此网站勉强运行了 {{ runDays }} 天</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "templateMessageBoard",
  components: {},
  setup() {
    const router = useRouter();
    const runDays = ref(0);
    const onMessageBoard = () => {
      if (!getStorage("blogUserToken")) {
        ElMessage.error("你还没有登录,不能前往留言板！");
      } else {
        router.replace("/creepreBlog/messageBoard");
      }
    };
    const onAboutMe = () => {
      ElMessage.warning("暂时没有开发哦！");
    };
    const siteTime = (date) => {
      let now = new Date().valueOf();
      let nTime = now - date;
      runDays.value = Math.floor(nTime / 86400000);
    };
    // 挂载阶段
    onMounted(() => {
      siteTime(1628389176512);
    });
    return {
      onMessageBoard,
      onAboutMe,
      siteTime,
      runDays,
    };
  },
});
</script>

<style lang="scss" scoped>
#MessageBox {
  min-height: 1.1rem;
  ul {
    li {
      border-bottom: 0.01rem solid $my-theme-border;
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
        background: $my-theme-background;
        cursor: pointer;
      }
      &:active {
        background: #fff;
        i,
        span {
          animation: yd 1s ease-in-out;
        }
      }
      &:nth-child(3) {
        i {
          font-size: 0.16rem;
          animation: xz 1s infinite linear;
          border-radius: 50%;
        }
      }
    }
  }
}
@keyframes xz {
  to {
    transform: rotate(360deg);
  }
}
@keyframes yd {
  to {
    transform: scaleX(1rem);
  }
}
</style>