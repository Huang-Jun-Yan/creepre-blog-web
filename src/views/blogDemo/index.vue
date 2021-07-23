<template>
  <div id="blogDemo">
    <div class="blogDemoShow">
      <ul class="blogDemoBox">
        <el-scrollbar :noresize="true" height="5.7rem">
          <li
            class="blogDemoItem"
            v-for="(videoItem, index) in getVideo.videoList"
            :key="index"
          >
            <div class="blogDemoSelf">
              <div class="blogDemoSelfItem">
                <video
                  :src="videoItem.video_url"
                  :poster="videoItem.video_pic"
                  :preload="true"
                  controls
                ></video>
              </div>
            </div>
            <div class="blogDemoIntroduction">
              {{ videoItem.brief }}
              <span class="clearfix">发布时间:{{ videoItem.create_time }}</span>
            </div>
          </li>
        </el-scrollbar>
      </ul>
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
        :total="getVideo.total ? getVideo.total : 100"
        :page-size="getVideo.pageSize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "blogWebDemo",
  components: {},
  setup() {
    // store 实例
    const store = useStore();
    // 获取的页码
    const getVideo = reactive({
      videoList: [],
      page: 1,
      pageSize: 6,
      total: null, // 总数
    });
    // 获取Demo
    store
      .dispatch("video/getBlogVideoAsunc", {
        page: getVideo.page,
        pageSize: getVideo.pageSize,
      })
      .then((res) => {
        if (res.code == 200) {
          getVideo.total = res.data.count;
          getVideo.videoList = res.data.data;
        }
        
      });

    // currentPage 改变时会触发
    const handleChange = (val) => {
      console.log(val);
    };
    //  挂载阶段
    onMounted(() => {});
    return {
      getVideo,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
#blogDemo {
  height: calc(100% - 0.2rem);
  padding: 0 0.1rem;
  .blogDemoShow {
    height: 5.6rem;
    .blogDemoBox {
      height: 5.5rem;
      .blogDemoItem {
        height: 3.6rem;
        background: #eeeeee;
        border-radius: 0.05rem;
        .blogDemoSelf {
          height: 3rem;
          display: flex;
          justify-content: center;
          margin: 0.1rem 0;
          .blogDemoSelfItem {
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 0 0.04rem 0.03rem #cccccc;
            border-radius: 0.05rem;
            height: 100%;
            width: 6.1rem;
            video {
              width: 100%;
              height: 100%;
              border-radius: 0.05rem;
            }
          }
        }
        .blogDemoIntroduction {
          min-height: 0.11rem;
          padding: 0.05rem 0.05rem;
          box-shadow: inset 0 0 0.03rem 0.02rem #cccccc;
          span {
            float: right;
            user-select: none;
          }
        }
      }
    }
  }
  .pagination {
    height: 0.62rem;
    margin-top: 0.02rem;
    background: #eeeeee;
  }
}
</style>