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
      <li style="padding: 0.05rem 0.03rem; border-bottom: none">
        <i class="iconfont icon-ecs-running"></i>
        <span>此网站勉强运行了 {{ siteTime() }} 天</span>
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
    const siteTime = () => {
      window.setTimeout("siteTime()", 1000);
      var seconds = 1000;
      var minutes = seconds * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var years = days * 365;
      var today = new Date();
      var todayYear = today.getFullYear();
      var todayMonth = today.getMonth() + 1;
      var todayDate = today.getDate();
      var todayHour = today.getHours();
      var todayMinute = today.getMinutes();
      var todaySecond = today.getSeconds();
      /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳) */
      var t1 = Date.UTC(2021, 8, 7, 11, 56, 22); //北京时间2016-12-1 00:00:00
      var t2 = Date.UTC(
        todayYear,
        todayMonth,
        todayDate,
        todayHour,
        todayMinute,
        todaySecond
      );
      var diff = t2 - t1;
      var diffYears = Math.floor(diff / years);
      var diffDays = Math.floor(diff / days - diffYears * 365);
      // var diffHours = Math.floor(
      //   (diff - (diffYears * 365 + diffDays) * days) / hours
      // );
      // var diffMinutes = Math.floor(
      //   (diff - (diffYears * 365 + diffDays) * days - diffHours * hours) /
      //     minutes
      // );
      // var diffSeconds = Math.floor(
      //   (diff -
      //     (diffYears * 365 + diffDays) * days -
      //     diffHours * hours -
      //     diffMinutes * minutes) /
      //     seconds
      // );
      return diffDays;
    };
    // 挂载阶段
    onMounted(() => {});
    return {
      onMessageBoard,
      onAboutMe,
      siteTime,
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
      &:nth-child(3) {
        i {
          font-size: 0.16rem;
          animation: xz 1s infinite linear;
          border-radius: 50%;
        }
        span {
          // float: right;
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
</style>