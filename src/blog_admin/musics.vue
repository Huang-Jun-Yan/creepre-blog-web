<template>
  <div id="upMusics">
    <h2 class="title">上传音乐<i class="iconfont icon-yinle"></i></h2>
    <!-- 视频描述 -->
    <el-row style="margin: 0.3rem 0">
      <el-input
        style="width: 50%"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入音乐的名字"
        v-model="music_name"
      >
      </el-input>
    </el-row>
    <!-- 上传图片 -->
    <el-row style="margin: 0.1rem 0">
      <el-upload
        :action="uploadMusicImg"
        :limit="1"
        list-type="picture-card"
        :on-success="uploadImgSrc"
      >
        <template #default>
          <span>上传音乐封面图片</span>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="music_img" alt="" />
      </el-dialog>
    </el-row>
    <!-- 上传音乐 -->
    <el-row style="margin: 0.3rem 0">
      <el-upload
        :limit="1"
        :action="uploadMusicImg"
        list-type="picture-card"
        :on-success="uploadMusic"
      >
        <span>上传音乐</span>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="music_url" alt="" />
      </el-dialog>
    </el-row>
    <el-row style="margin: 0.3rem 0">
      <el-button @click="clickUploadMusic" type="success">音乐上传</el-button>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs, reactive } from "vue";
import { BASEURL, sendMusics } from "@/http/api"; // sendMusics
export default defineComponent({
  name: "CreepreBlogWebMusics",
  components: {},
  setup() {
    //   封面图片
    const uploadBlogMusic = reactive({
      music_name: "",
      music_img: "",
      music_url: "",
      dialogVisible: false,
    });
    // 上传
    const clickUploadMusic = () => {
      sendMusics({
        singer_name: uploadBlogMusic.music_name,
        music_img: uploadBlogMusic.music_img,
        music_url: uploadBlogMusic.music_url,
      }).then((res) => {
        console.log(res);
      });
    };
    // 上传成功回调
    const uploadImgSrc = (res) => {
      uploadBlogMusic.music_img = res.file.url;
    };
    // 上传成功回调
    const uploadMusic = (res) => {
      uploadBlogMusic.music_url = res.file.url;
    };
    // 计算属性
    const uploadMusicImg = computed(() => {
      return `${BASEURL}/music/uploadMusicImg`;
    });
    return {
      uploadImgSrc,
      uploadMusic,
      uploadMusicImg,
      clickUploadMusic,
      ...toRefs(uploadBlogMusic),
    };
  },
});
</script>

<style lang="scss" scoped>
#upMusics {
  .title {
    height: 0.8rem;
    line-height: 1rem;
    user-select: none;
    color: #000;
    letter-spacing: 0.01rem;
    i {
      margin: 0 0.05rem;
      font-size: 0.2rem;
    }
  }
}
</style>