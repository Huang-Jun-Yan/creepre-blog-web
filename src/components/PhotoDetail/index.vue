<template>
  <div id="photos">
    <!-- <header :style="{color: Color}"> 
      当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册
      </header> -->
    <h2 style="">相册内容</h2>
    <div id="container">
      <div class="card" v-for="(item, index) in PhotoList" :key="index">
        <el-image
          style="display: block"
          :src="item"
          :preview-src-list="PhotoList"
        ></el-image>
        <p style=""></p>
        <p style=""></p>
      </div>
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
    // 监听
    watch(
      () => route.params.id,
      () => {
        photoDetail.pic_id = route.params.id;
      }
    );
    return {
      ...toRefs(photoDetail),
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
  #container {
    width: 100%;
    min-height: 3rem;
    padding: 0.05rem;
    columns: 4;
    column-gap: 0.1rem;
    .card {
      width: 100%;
      margin: 0 0 0.1rem;
      background: #cccccc;
      overflow: hidden;
      break-inside: avoid;
      border-radius: 0.04rem;
    }
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
  header {
    padding-bottom: 2rem;
    position: relative;
    span:hover {
      color: lightblue;
    }
  }
}
</style>