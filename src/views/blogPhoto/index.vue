<template>
  <div id="BlogPhoto">
    <div id="container">
      <!-- <el-scrollbar :noresize="true" style="width: 10.51rem" height="6.5rem"> -->
      <div class="card" v-for="(PhotoItem, index) in PhotoList" :key="index">
        <el-image
          :src="PhotoItem.imgsrc[0]"
          @click="handleToDetail(PhotoItem.pic_id)"
        ></el-image>
        <h4 style="">{{ PhotoItem.brief }}</h4>
      </div>
      <!-- </el-scrollbar> -->
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
        :total="count ? count : 100"
        :page-size="pageSize"
        @current-change="handleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getPhotos } from "../../http/api";
export default defineComponent({
  name: "blogWebPhoto",
  components: {},
  setup() {
    // 路由
    const router = useRouter();
    // 相册参数
    const BlogPhotosList = reactive({
      // 页数
      page: 1,
      // 每页数量
      pageSize: 10,
      // 总数
      count: 10,
      // 获取的数组
      PhotoList: [],
    });
    // 获取相册
    const getBlogPhotos = (page) => {
      getPhotos({
        page: page,
        pageSize: BlogPhotosList.pageSize,
      })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            const { data } = res.data;
            BlogPhotosList.count = data.count;
            data.data.map((item) => {
              item.imgsrc = JSON.parse(item.imgsrc);
            });
            BlogPhotosList.PhotoList = data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // currentPage 改变时会触发
    const handleChange = (val) => {
      BlogPhotosList.page = val;
    };
    // 去相册详情
    const handleToDetail = (id) => {
      router.replace(`/creepreBlog/Photos/PhotoDetail/${id}`);
    };
    // 监听
    watch(
      () => BlogPhotosList.page,
      () => {
        getBlogPhotos(BlogPhotosList.page);
      }
    );
    // 挂载阶段
    onMounted(() => {
      // 获取相册
      getBlogPhotos(BlogPhotosList.page);
    });
    return {
      ...toRefs(BlogPhotosList),
      handleToDetail,
      handleChange,
    };
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
#BlogPhoto {
  width: 100%;
  min-height: 6.52rem;
  border-radius: 0.04rem;
  position: relative;
  transition: all 1s;
  background: #eeeeee;
  #container {
    width: 100%;
    min-height: 3rem;
    max-height: 5.8rem;
    height: 5.8rem;
    padding: 0.05rem;
    columns: 4;
    column-gap: 0.1rem;
    .card {
      width: 100%;
      margin: 0 0 0.1rem;
      overflow: hidden;
      break-inside: avoid;
      border-radius: 0.04rem;
      box-shadow: 0 0.02rem 0.04rem rgba(0, 0, 0, 0.12),
        0 0.02rem 0.03rem rgba(0, 0, 0, 0.24);
      // &:hover {
      //   box-shadow: 0px 0px 5px #c8c8c8, /*上边阴影  红色*/ -5px 0px 5px #c8c8c8,
      //     /*左边阴影  绿色*/ 5px 0px 5px #c8c8c8,
      //     /*右边阴影  蓝色*/ 0px 0px 5px #c8c8c8;
      // }
      ::v-deep img {
        cursor: pointer;
      }
      h4 {
        margin: 0.05rem 0 0.05rem 0;
        padding: 0;
      }
    }
  }
  .pagination {
    height: 0.5rem;
    margin-top: 0.02rem;
    background: #eeeeee;
  }
  @media screen and (max-width: 1500px) {
    #container {
      columns: 2;
    }
  }
  @media screen and (max-width: 1200px) {
    #container {
      columns: 2;
    }
  }
  @media screen and (max-width: 900px) {
    #container {
      columns: 2;
    }
  }
  header {
    padding-bottom: 32px;
    position: relative;
    span:hover {
      color: lightblue;
    }
  }
}
@media screen and (max-width: 992px) {
  #photos {
    width: 100%;
    margin: 0;
  }
}
</style>