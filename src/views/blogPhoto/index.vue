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
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
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
      pageSize: 1,
      // 总数
      count: 10,
      // 获取的数组
      PhotoList: [],
    });
    // 获取相册
    const getBlogPhotos = () => {
      getPhotos({
        page: BlogPhotosList.page,
        pageSize: BlogPhotosList.pageSize,
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            const { data } = res.data;
            data.map((item) => {
              item.imgsrc = JSON.parse(item.imgsrc);
            });
            BlogPhotosList.PhotoList = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 去相册详情
    const handleToDetail = (id) => {
      router.replace(`/creepreBlog/Photos/PhotoDetail/${id}`);
    };
    // 挂载阶段
    onMounted(() => {
      // 获取相册
      getBlogPhotos();
    });
    return {
      ...toRefs(BlogPhotosList),
      handleToDetail,
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
  #container {
    width: 100%;
    min-height: 6.52rem;
    column-count: 4;
    .card {
      // background: red;
      border-radius: 0.04rem;
      break-inside: avoid;
      padding: 0.08rem;
      margin: 0.08rem;
      box-shadow: 0 0.02rem 0.04rem rgba(0, 0, 0, 0.12),
        0 0.02rem 0.03rem rgba(0, 0, 0, 0.24);
      &:hover {
        box-shadow: 0px 0px 5px #c8c8c8, /*上边阴影  红色*/ -5px 0px 5px #c8c8c8,
          /*左边阴影  绿色*/ 5px 0px 5px #c8c8c8,
          /*右边阴影  蓝色*/ 0px 0px 5px #c8c8c8;
      }
      ::v-deep img {
        cursor: pointer;
      }
    }
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