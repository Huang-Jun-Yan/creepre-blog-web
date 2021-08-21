<template>
  <div id="blogDemo">
    <div class="blogDemoShow">
      <ul class="blogDemoBox">
        <el-scrollbar :noresize="true" height="5.9rem">
          <li
            class="blogDemoItem"
            v-for="(videoItem, index) in videoList"
            :key="index"
          >
            <div class="blogDemoSelf">
              <div class="blogDemoSelfItem">
                <video
                  :src="videoItem.video_url"
                  :poster="videoItem.video_pic"
                  :preload="true"
                  controls
                  :autobuffer="true"
                ></video>
              </div>
            </div>
            <div class="blogDemoIntroduction">
              {{ videoItem.brief }}
              <span class="clearfix">发布时间:{{ getDate(videoItem.create_time) }}</span>
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
        :total="total"
        :page-size="pageSize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import { getBlogVideo } from "@/http/api";
import { getDate } from "@/util/date";
export default defineComponent({
  name: "blogWebDemo",
  components: {},
  setup() {
    // 获取的页码
    const getVideoobj = reactive({
      videoList: [],
      page: 1,
      pageSize: 1,
      total: 0, // 总数
    });
    // 获取Demo
    const getVideo = (page) => {
      getBlogVideo({
        page: page,
        pageSize: getVideoobj.pageSize,
      }).then((res) => {
        if (res.data.code == 200) {
          const { data } = res.data;
          getVideoobj.total = data.count;
          getVideoobj.videoList = data.data;
        }
      });
    };

    // currentPage 改变时会触发
    const handleChange = (val) => {
      getVideoobj.page = val;
    };
    // 监听
    watch(
      () => getVideoobj.page,
      () => {
        getVideo(getVideoobj.page);
      }
    );
    //  挂载阶段
    onMounted(() => {
      // 获取Demo
      getVideo(getVideoobj.page);
    });
    return {
      ...toRefs(getVideoobj),
      handleChange,
      getDate
    };
  },
});
</script>

<style lang="scss" scoped>
#blogDemo {
  height: calc(100% - 0.2rem);
  padding: 0 0.1rem;
  .blogDemoShow {
    height: 5.9rem;
    .blogDemoBox {
      height: 5.8rem;
      .blogDemoItem {
        height: 5.8rem;
        background: $my-theme-background;
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
          min-height: 2.5rem;
          padding: 0.05rem 0.05rem;
          box-shadow: $my-theme-box-shadow;
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
    margin-top: 0.01rem;
  }
}
@media screen and (max-width: 640px) {
  .blogDemoShow {
    height: 100% !important;
  }
  .pagination {
    position:absolute;
    bottom: .1rem;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>