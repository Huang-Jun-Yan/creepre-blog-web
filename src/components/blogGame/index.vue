<template>
  <div id="blogGame">
    <div class="gameLeft">
      <router-view />
    </div>
    <div class="gameRight">
      <ul class="gameRightBody">
        <h2 class="title">{{ gameTitle }}</h2>
        <li class="bodyItem" v-for="(item, index) in scoreArr" :key="index">
          <span>{{ item.username }}</span>
          <span>
            <i>最新时间:</i>
            <i>{{ getDate1(item.create_time) }}</i>
          </span>
          <span>{{ item.gameScore }}分</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import { getBlogGameScore } from "@/http/api";
import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { getDate1 } from "@/util/date";
export default defineComponent({
  name: "blogWebGame",
  components: {},
  setup() {
    // 路由
    const route = useRoute();
    // 参数
    const getScoreObj = reactive({
      gameType: "tanchishe", // 游戏类型
      scoreArr: [],
      gameTitle: "",
    });
    const getScore = async () => {
      if (!getStorage("blogUserInfo")) {
        return ElMessage.warning("你还没有登录");
      } else {
        if (route.path === "/game/blogTanChiShe") {
          getScoreObj.gameTitle = "贪吃蛇分数";
          const res = await getBlogGameScore({
            gameType: getScoreObj.gameType,
          });
          if (res.data.code == 200) {
            if (res.data.data.length == 1) {
              getScoreObj.scoreArr.push(res.data.data);
            } else {
              getScoreObj.scoreArr = res.data.data;
            }
          }
        } else if (route.path === "/game/XiaoNiao") {
          getScoreObj.gameTitle = "飞翔的小鸟分数";
        }
      }
    };
    getScore();
    // 监听
    watch(
      () => route.path,
      () => {
        getScore();
      }
    );
    // 挂载阶段
    onMounted(() => {});
    return {
      ...toRefs(getScoreObj),
      getDate1,
    };
  },
});
</script>

<style lang="scss" scoped>
#blogGame {
  background: $my-theme-background;
  height: 100%;
  display: flex;
  .gameLeft {
    width: 8rem;
    margin-right: 0.1rem;
  }
  .gameRight {
    flex: 1;
    background: $my-theme-background;
    .gameRightBody {
      .bodyItem {
        padding: 0.05rem 0.05rem;
        font-size: 0.18rem;
        user-select: none;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        span {
          display: block;
        }
        span:nth-child(1) {
          font-size: 0.16rem;
          font-weight: bold;
          width: .8rem;
          text-align: left;
        }
        span:nth-child(2) {
          font-size: 0.12rem;
          text-align: center;
        }
        span:nth-child(3) {
          font-size: 0.16rem;
           width: .5rem;
          text-align: right;
        }
      }
      .title {
        text-align: center;
        padding: 0.05rem 0;
        border-bottom: 0.01rem solid $my-theme-border;
      }
    }
  }
}
</style>