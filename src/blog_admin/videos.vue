<template>
  <div id="photos">
    <h2 class="uploadImg">上传视频</h2>
    <!-- 视频描述 -->
    <el-row style="margin: 0.3rem 0">
      <el-input
        style="width: 50%"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入视频介绍"
        v-model="viedioIntroduction"
      >
      </el-input>
    </el-row>
    <!-- 上传图片 -->
    <el-row style="margin: 0.3rem 0">
      <el-upload
        :action="uploadDemo"
        :limit="1"
        list-type="picture-card"
        :on-success="uploadImgSrc"
      >
        <template #default>
          <span>上传视频封面图片</span>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="video_pic" alt="" />
      </el-dialog>
    </el-row>
    <!-- 上传视频 -->
    <el-row style="margin: 0.3rem 0">
      <el-upload
        :limit="1"
        :action="uploadDemo"
        list-type="picture-card"
        :on-success="uploadVideo"
      >
        <span>上传视频</span>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="video_pic" alt="" />
      </el-dialog>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-button @click="clickUploadVideo" type="success">视频发布</el-button>
    </el-row>
  </div>
</template>

<script>
import { toRefs, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { BASEURL, upBlogVideo } from "../http/api";
import { ElMessage } from "element-plus";
import { getStorage } from "../util/Storage";
export default {
  name: "BlogPhotos",
  components: {},
  directives: {},
  setup() {
    //   路由实例
    const route = useRoute();
    //   封面图片
    const uploadBlogDemo = reactive({
      viedioIntroduction: "",
      video_pic: "",
      video_url: "",
      dialogVisible: false,
    });
    // 上传视频成功回调
    const uploadVideo = (res) => {
      // console.log(res, "视频");
      if (res.code == 200) {
        uploadBlogDemo.video_url = res.file.url;
        ElMessage.success({
          message: "上传成功",
          type: "success",
        });
      }
    };
    // 上传图片成功回调
    const uploadImgSrc = (res) => {
      // console.log(res, "图片");
      if (res.code == 200) {
        uploadBlogDemo.video_pic = res.file.url;
        ElMessage.success({
          message: "上传成功",
          type: "success",
        });
      }
    };
    // 点击上传
    const clickUploadVideo = () => {
      if (
        uploadBlogDemo.viedioIntroduction == "" ||
        uploadBlogDemo.video_pic == "" ||
        uploadBlogDemo.video_url == ""
      )
        return ElMessage.warning("封面，视频，简介为必传，而你没有上传！");
      // 调用接口
      upBlogVideo({
        admin_id: getStorage("adminInfo").admin_id,
        video_url: uploadBlogDemo.video_url,
        video_pic: uploadBlogDemo.video_pic,
        brief: uploadBlogDemo.viedioIntroduction,
      })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success({
              message: res.data.msg,
              type: "success",
            });
            setTimeout(() => {
              location.reload(route.path);
            }, 500);
          } else {
            ElMessage.error("失败，请检查网络后重试...");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 计算属性
    const uploadDemo = computed(() => {
      return `${BASEURL}/video/upload`;
    });
    return {
      ...toRefs(uploadBlogDemo),
      uploadDemo,
      uploadVideo,
      uploadImgSrc,
      clickUploadVideo,
    };
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
#photos {
  .uploadImg {
    height: 0.8rem;
    line-height: 1.6rem;
    color: #000;
    letter-spacing: 0.01rem;
    user-select: none;
  }
}
</style>