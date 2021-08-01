<template>
  <div id="photos">
    <h2>相册内容</h2>
    <div class="photosBox">
      <el-scrollbar height="5.5rem">
        <div id="container">
          <div class="card" v-for="(item, index) in PhotoList" :key="index">
            <el-image
              style="display: block; transition: all 0.5s"
              :src="item"
              :preview-src-list="PhotoList"
            ></el-image>
          </div>
        </div>
      </el-scrollbar>
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
        total=""
        page-size=""
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPhotoDetail } from "../../http/api";
export default defineComponent({
  name: "about",
  computed: {},
  setup() {
    // 路由
    const route = useRoute();
    // 详情参数
    const photoDetail = reactive({
      // 接受传进来的id
      pic_id: "",
      // 获取的数组
      PhotoList: [],
    });
    // 获取详情
    const getPhotoDetails = () => {
      getPhotoDetail({
        pic_id: route.params.id,
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            const { data } = res.data;
            photoDetail.PhotoList = JSON.parse(data.imgsrc);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 挂载
    onMounted(() => {
      getPhotoDetails();
    });
    // currentPage 改变时会触发
    const handleChange = (val) => {
      console.log(val);
    };
    // 监听
    watch(
      () => route.params.id,
      () => {
        photoDetail.pic_id = route.params.id;
      }
    );
    return {
      ...toRefs(photoDetail),
      handleChange,
    };
  },
});
</script>

<style lang='scss'>
#photos {
  width: 100%;
  min-height: 6.52rem;
  height: 100%;
  border-radius: 0.04rem;
  min-height: 95vh;
  position: relative;
  transition: all 1s;
  background: #eeeeee;
  h2 {
    height: 0.5rem;
    line-height: 0.5rem;
    color: #000;
    letter-spacing: 0.01rem;
    user-select: none;
    padding-left: 0.1rem;
  }
  .photosBox {
    min-height: 5.5rem;
    #container {
      padding: 0.05rem;
      columns: 4;
      column-gap: 0.02rem;
      .card {
        width: 100%;
        margin: 0 0 0.1rem;
        background: #cccccc;
        overflow: hidden;
        break-inside: avoid;
        border-radius: 0.04rem;
      }
    }
  }
  .pagination {
    height: 0.6rem;
    line-height: 0.6rem;
    background: #eeeeee;
  }

  @media screen and (max-width: 1500px) {
    #container {
      column-count: 2;
    }
  }
  @media screen and (max-width: 1200px) {
    #container {
      column-count: 2;
    }
  }
  @media screen and (max-width: 900px) {
    #container {
      column-count: 2;
    }
  }
}
</style>