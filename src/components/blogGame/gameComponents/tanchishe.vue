<template>
  <div id="blogTanChiShe">
    <div class="controller">
      <el-button
        style="margin: 0.05rem 0.1rem"
        type="success"
        size="mini"
        @click="onStartGame"
        >开始游戏</el-button
      >
      <el-button
        style="margin: 0.05rem 0.1rem"
        type="primary"
        size="mini"
        @click="onPauseGame"
        >暂停游戏</el-button
      >
      <el-tag type="warning">目前的分数: {{ score }}</el-tag>
    </div>
    <canvas ref="canvasRef" id="canvas" height="600" width="600"></canvas>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  computed,
  reactive,
  toRefs,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import { addBlogGameScore } from "@/http/api";
import { getStorage } from "../../../util/Storage";
export default defineComponent({
  name: "blogWebTanChiShe",
  components: {},
  setup() {
    const canvasRef = ref(null);
    let newCanvas = ref(null);
    // router
    const route = useRoute();
    // vuex
    const store = useStore();
    // 速度
    let speed = ref(300);
    // 游戏结束
    let isGameOver = ref(true);
    // 食物吃掉判断
    let isEated = false;
    // 暂停
    let tiemr;
    // 绘制蛇身
    let snake = [
      { X: 2, Y: 0 },
      { X: 1, Y: 0 },
      { X: 0, Y: 0 },
    ];
    // 食物随机位置
    let X = Math.floor(Math.random() * 20) * 30;
    let Y = Math.floor(Math.random() * 20) * 30;
    let directionX = 1;
    let directionY = 0;
    // 添加更新分数
    const changeScoreObj = reactive({
      gameType: "tanchishe",
    });
    const onStartGame = async () => {
      await nextTick();
      if (isGameOver.value) {
        isGameOver.value = false;
        startGame(newCanvas.value);
      }
    };
    const onPauseGame = async () => {
      if (!isGameOver.value) {
        isGameOver.value = true;
        clearInterval(tiemr);
      }
    };
    // 更新分数
    const upDateScore = async () => {
      if (!getStorage("blogUserInfo")) {
        return ElMessage.warning("你还没有登录");
      } else {
        const res = await addBlogGameScore({
          gameScore: store.state.game.greedySnakeScore,
          username: getStorage("blogUserInfo").username,
          gameType: changeScoreObj.gameType,
        });
        return res.data;
      }
    };
    const startGame = (el) => {
      tiemr = setInterval(async () => {
        // 先清除画布内容
        el.clearRect(0, 0, 600, 600);
        //  蛇身移动 旧的蛇头位置
        let oldHead = snake[0];
        // 新的蛇头位置
        let newHead = {
          X: oldHead.X + directionX,
          Y: oldHead.Y + directionY,
        };
        if (
          newHead.Y < 0 ||
          newHead.X < 0 ||
          newHead.X * 30 >= 600 ||
          newHead.Y * 30 >= 600
        ) {
          isGameOver.value = true;
          clearInterval(tiemr);
          const res = await upDateScore();
          ElMessageBox.alert(
            `你的分数是  ${store.state.game.greedySnakeScore} ${res.msg}`,
            "这是你的分数",
            {
              confirmButtonText: "确定",
              callback: () => {
                location.reload(route.path);
                ElMessage({
                  type: "info",
                  message: `已重新开始`,
                });
              },
            }
          );
          store.commit("game/handleChangeGreedySnakeScore", 0);
        } else {
          snake.unshift(newHead);
          // 吃到食物判断
          if (snake[0].X * 30 === X && snake[0].Y * 30 === Y) {
            isEated = true;
            store.commit("game/handleChangeGreedySnakeScore", 1);
          } else {
            isEated = false;
            snake.pop();
          }
        }
        // 食物是否被吃掉
        if (isEated) {
          X = Math.floor(Math.random() * 20) * 30;
          Y = Math.floor(Math.random() * 20) * 30;
        }
        // 绘制食物
        el.fillStyle = "#ff3399";
        el.fillRect(X, Y, 30, 30);
        // 蛇身
        for (let i = 0; i < snake.length; i++) {
          if (i === 0) {
            el.fillStyle = "#6600ff";
          } else if (i === 1) {
            el.fillStyle = "#33ccff";
          } else if (i === 5) {
            el.fillStyle = "#33ffff";
          } else if (i === 9) {
            el.fillStyle = "#cc33ff";
          } else if (i === 14) {
            el.fillStyle = "#ff33ff";
          } else if (i === 19) {
            el.fillStyle = "#ff9966";
          } else if (i === 24) {
            el.fillStyle = "#ffffcc";
          }
          el.fillRect(snake[i].X * 30, snake[i].Y * 30, 30, 30);
        }
        // 画出X轴的线条
        for (let i = 1; i < 20; i++) {
          el.moveTo(0, 30 * i + 0.5);
          el.lineTo(600, 30 * i + 0.5);
        }
        // 绘制Y轴的线条
        for (let i = 1; i < 20; i++) {
          el.moveTo(30 * i + 0.5, 0);
          el.lineTo(30 * i + 0.5, 600);
        }
        // 设置线条颜色
        el.strokeStyle = "white";
        // 绘制画布
        el.stroke();
      }, speed.value);
    };
    const Initialize = async (el) => {
      if (isGameOver.value) {
        // 绘制食物
        el.fillStyle = "#ff3399";
        el.fillRect(X, Y, 30, 30);
        // 蛇身
        for (let i = 0; i < snake.length; i++) {
          if (i === 0) {
            el.fillStyle = "#6600ff";
          } else if (i === 1) {
            el.fillStyle = "#33ccff";
          } else if (i === 5) {
            el.fillStyle = "#33ffff";
          } else if (i === 9) {
            el.fillStyle = "#cc33ff";
          } else if (i === 14) {
            el.fillStyle = "#ff33ff";
          } else if (i === 19) {
            el.fillStyle = "#ff9966";
          } else if (i === 24) {
            el.fillStyle = "#ffffcc";
          }
          el.fillRect(snake[i].X * 30, snake[i].Y * 30, 30, 30);
        }
        // 画出X轴的线条
        for (let i = 1; i < 20; i++) {
          el.moveTo(0, 30 * i + 0.5);
          el.lineTo(600, 30 * i + 0.5);
        }
        // 绘制Y轴的线条
        for (let i = 1; i < 20; i++) {
          el.moveTo(30 * i + 0.5, 0);
          el.lineTo(30 * i + 0.5, 600);
        }
        // 设置线条颜色
        el.strokeStyle = "white";
        // 绘制画布
        el.stroke();
      } else {
        startGame(el);
      }
    };
    onMounted(() => {
      // 创建画布
      const tools = canvasRef.value.getContext("2d");
      newCanvas.value = tools;
      Initialize(tools);
    });
    // 监听键盘事件
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 38 && directionX != 0 && directionY != 1) {
        // 上键
        directionX = 0;
        directionY = -1;
      } else if (e.keyCode == 40 && directionY != -1 && directionX != 0) {
        // 下键
        directionX = 0;
        directionY = 1;
      } else if (e.keyCode == 37 && directionX != 1 && directionY != 0) {
        // 左键
        directionX = -1;
        directionY = 0;
      } else if (e.keyCode == 39 && directionX != -1 && directionY != 0) {
        // 右键
        directionX = 1;
        directionY = 0;
      }
    });

    return {
      score: computed(() => store.state.game.greedySnakeScore),
      ...toRefs(changeScoreObj),
      speed,
      onStartGame,
      canvasRef,
      onPauseGame,
    };
  },
});
</script>

<style lang="scss" scoped>
#blogTanChiShe {
  background: $my-theme-background;
  height: 100%;
  text-align: center;
  #canvas {
    border: 0.02rem solid white;
    margin: 0.05rem 0;
  }
}
</style>