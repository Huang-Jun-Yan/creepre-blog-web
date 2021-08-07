<template>
  <div id="messageBoard">
    <p class="messageTip">这里可以给博主大大留言哦●ω●</p>
    <div class="messageInput">
      <el-input
        placeholder="请输入内容"
        style="width: 50%"
        v-model="sendMsgValue"
        :clearable="true"
      />
      <el-button @click="sendMessage" style="margin: 0 0.1rem" type="primary"
        >发表留言<i class="el-icon-chat-line-square el-icon--right"
      /></el-button>
    </div>
    <div class="messageBody">
      <el-empty
        v-if="!MessageArr.length"
        description="还没有发表评论哦∪△∪"
      ></el-empty>
      <transition v-if="MessageArr.length" name="el-zoom-in-top">
        <el-scrollbar height="5.51rem">
          <div
            style="margin-top: 0.1rem"
            v-for="(item, index) in MessageArr"
            :key="index"
          >
            <!-- 留言 -->
            <div class="message">
              <!-- 头像 -->
              <div class="avatar clearfix">
                <el-avatar
                  style="width: 0.5rem; height: 0.5rem; line-height: 0.5rem"
                  fit="cover"
                  shape="square"
                  size="large"
                  :src="item.imgsrc"
                  >头像</el-avatar
                >
              </div>
              <!-- 留言内容 -->
              <div class="messageDetail">
                <span class="name"
                  >{{ item.name }}
                  <b v-show="item.username === 'admin'">老博主</b>
                </span>
                <p class="content">{{ item.content }}</p>
                <span class="time">
                  {{ getDate(item.create_time) }}
                  <i @click="onReplySelf(item.id)">回复</i>
                </span>
              </div>
            </div>
            <!-- 回复 -->
            <div
              class="reply"
              v-for="(itemReply, index) in item.replyAccess"
              :key="index"
            >
              <!-- 头像 -->
              <div class="avatar clearfix">
                <el-avatar
                  style="width: 0.5rem; height: 0.5rem; line-height: 0.5rem"
                  fit="cover"
                  shape="square"
                  size="large"
                  :src="itemReply.user_imgsrc"
                  >头像</el-avatar
                >
              </div>
              <!-- 回复内容 -->
              <div class="messageDetail">
                <span class="name"
                  >{{ itemReply.name
                  }}<b v-show="itemReply.username === 'admin'">老博主</b></span
                >
                <p class="content">
                  <span
                    >回复<i>@{{ itemReply.reply_name }}</i></span
                  >
                  {{ itemReply.content }}
                </p>
                <span class="time">
                  {{ getDate(itemReply.datetime) }}
                  <i @click="onReplyChild(itemReply.id)">回复</i>
                </span>
              </div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
              "
              background
              layout="prev, pager, next"
              :total="count"
              :page-size="pageSize"
              @current-change="handleChange"
            >
            </el-pagination>
          </div>
        </el-scrollbar>
      </transition>
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import { leaveMessage, getMessage, messageReply } from "@/http/api";
import { getStorage } from "@/util/Storage";
import { getDate } from "@/util/date";
export default defineComponent({
  name: "CreepreBlogmessageBoard",
  components: {},
  setup() {
    /* 发表留言的参数 */
    const sendMessageObj = reactive({
      sendMsgValue: "",
      count: 0,
      page: 1,
      pageSize: 10,
      message_id: "",
      reply_id: "",
      MessageArr: [],
    });
    /* 发表留言 */
    const sendMessage = async () => {
      if (
        !sendMessageObj.sendMsgValue ||
        !getStorage("blogUserToken").userToken
      )
        return ElMessage.warning("你的留言是空的哦∪﹏∪");
      const res = await leaveMessage({
        content: sendMessageObj.sendMsgValue,
        token: getStorage("blogUserToken").userToken,
      });
      if (res.data.code == 200) {
        ElMessage.success(res.data.msg);
        sendMessageObj.sendMsgValue = "";
        getMessageInfo(sendMessageObj.page);
      } else {
        ElMessage.error(res.data.msg);
      }
    };
    /* 回复留言 */
    const handleMessageReply = async (val) => {
      const res = await messageReply({
        token: getStorage("blogUserToken")
          ? getStorage("blogUserToken").userToken
          : "",
        content: val,
        message_id: sendMessageObj.message_id,
        reply_id: sendMessageObj.reply_id,
      });
      if (res.data.code == 200) {
        ElMessage.success(res.data.msg);
        getMessageInfo(sendMessageObj.page);
      } else {
        ElMessage.error(res.data.msg);
      }
    };
    /* 回复 */
    const onReplySelf = (id) => {
      sendMessageObj.message_id = id;
      sendMessageObj.reply_id = "";
      open();
    };
    /* 回复 */
    const onReplyChild = (id) => {
      sendMessageObj.message_id = "";
      sendMessageObj.reply_id = id;
      open();
    };
    // 打开回复的模态框
    const open = () => {
      ElMessageBox.prompt("请输入回复内容", "回复提示", {
        confirmButtonText: "确定回复",
        cancelButtonText: "取消回复",
        inputValidator: (val) => {
          if (val === null) {
            return "内容不能为空呀，请输入内容~"; //初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
          }
        },
        inputErrorMessage: "内容不能为空呀，请输入内容~",
      })
        .then(({ value }) => {
          handleMessageReply(value);
        })
        .catch((err) => {
          ElMessage.warning("你已取消了回复！");
          console.log(err);
        });
    };
    // 获取留言
    const getMessageInfo = async (page) => {
      const res = await getMessage({
        page: page,
        pageSize: sendMessageObj.pageSize,
      });
      if (res.data.code == 200) {
        const { data } = res.data.data;
        sendMessageObj.count = res.data.data.count;
        sendMessageObj.MessageArr = data;
      }
    };
    // currentPage 改变时会触发
    const handleChange = (val) => {
      sendMessageObj.page = val;
    };
    // 监听
    watch(
      () => sendMessageObj.page,
      () => {
        // 获取留言
        getMessageInfo(sendMessageObj.page);
      }
    );
    // 挂载阶段
    onMounted(() => {
      // 获取留言
      getMessageInfo(sendMessageObj.page);
    });
    return {
      ...toRefs(sendMessageObj),
      onReplySelf,
      onReplyChild,
      sendMessage,
      getDate,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
#messageBoard {
  height: 100%;
  .messageTip {
    text-align: center;
    font-weight: bold;
    font-size: 0.2rem;
    padding: 0.1rem 0;
    letter-spacing: 0.01rem;
  }
  .messageInput {
    text-align: center;
    margin: 0.1rem 0;
  }
  .messageBody {
    height: 5.51rem;
    .pagination {
      height: 0.4rem;
      margin-top: 0.01rem;
    }
    .message {
      min-height: 0.65rem;
      padding: 0 0.1rem;
      border-bottom: 0.01rem solid #eeeeee;
      margin-bottom: 0.1rem;
      .avatar {
        width: 0.5rem;
        height: 0.65rem;
        margin-right: 0.2rem;
        float: left;
      }
      .messageDetail {
        overflow: hidden;
        min-height: 0.65rem;
        .name {
          font-size: 0.14rem;
          font-weight: bold;
          letter-spacing: 0.01rem;
          b {
            color: orangered;
            margin: 0 0.05rem;
            user-select: none;
          }
          // i {
          //   font-weight: 400;
          //   font-size: .13rem;
          //   user-select: none;
          // }
        }
        .content {
          min-height: 0.25rem;
          padding-top: 0.05rem;
          margin: 0.02rem 0;
          font-size: 0.16rem;
          padding-right: 1rem;
        }
        .time {
          user-select: none;
          &:hover i {
            cursor: pointer;
            text-decoration: underline;
          }
          i {
            color: cornflowerblue;
            letter-spacing: 0.01rem;
            font-weight: bold;
            margin: 0 0.05rem;
            &:active {
              transform: scale(1.05);
            }
          }
        }
      }
    }
    .reply {
      min-height: 0.65rem;
      padding: 0 0.1rem;
      margin-left: 0.7rem;
      border-bottom: 0.01rem solid #eeeeee;
      margin-bottom: 0.1rem;
      .avatar {
        width: 0.5rem;
        height: 0.65rem;
        margin-right: 0.1rem;
        float: left;
      }
      .messageDetail {
        overflow: hidden;
        min-height: 0.65rem;
        .name {
          font-size: 0.14rem;
          font-weight: bold;
          letter-spacing: 0.01rem;
          b {
            color: orangered;
            margin: 0 0.05rem;
            user-select: none;
          }
        }
        .content {
          min-height: 0.25rem;
          padding-top: 0.05rem;
          margin: 0.02rem 0;
          font-size: 0.16rem;
          span {
            font-size: 0.12rem;
            user-select: none;
            i {
              color: green;
              margin: 0 0.05rem;
            }
          }
        }
        .time {
          user-select: none;
          i {
            color: cornflowerblue;
            letter-spacing: 0.01rem;
            font-weight: bold;
            margin: 0 0.05rem;
            &:active {
              transform: scale(1.05);
            }
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>