<template>
  <div id="photos">
    <h2 class="uploadImg">上传图片<i class="iconfont icon-tupian"></i></h2>

    <el-row style="margin: 0.3rem 0">
      <el-input
        style="width: 50%"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入图片介绍"
        v-model="photoCon"
      >
      </el-input>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-upload
        :action="PhotosUpload"
        list-type="picture-card"
        :on-success="onSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
      >
        <template #default>
          <span>上传图片</span>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-button @click="onUpPhotos" type="success">图片发布</el-button>
    </el-row>
  </div>
</template>

<script>
import { toRefs, reactive, computed, defineComponent } from "vue";
import { BASEURL, upBlogPhotos } from "@/http/api";
import { getStorage } from "@/util/Storage";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "BlogPhotos",
  components: {},
  directives: {},
  setup() {
    //   路由实例
    const route = useRoute();
    const uploadPhotos = reactive({
      photoCon: "",
      photosList: [],
      dialogImageUrl: "",
      username: "",
      dialogVisible: false,
      disabled: false,
    });
    // 上传
    const onUpPhotos = () => {
      upBlogPhotos({
        admin_id: getStorage("admin_id"),
        brief: uploadPhotos.photoCon,
        username: getStorage("blogUserInfo").name || getStorage("blogUserInfo").username,
        imgsrc: JSON.stringify(uploadPhotos.photosList),
      })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success({
              message: "上传成功",
              type: "success",
            });
            setTimeout(() => {
              location.reload(route.path);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 上传成功回调
    const onSuccess = (response) => {
      if (response.code == 200) {
        uploadPhotos.photosList.push(response.file.url);
      }
    };
    //文件状态改变时触发
    const handleChange = () => {
      console.log();
    };
    const handleRemove = (file) => {
      console.log(file);
    };
    const handlePictureCardPreview = (file) => {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    };
    // 计算属性
    const PhotosUpload = computed(() => {
      return `${BASEURL}/photo/uploadPhotos`;
    });
    return {
      ...toRefs(uploadPhotos),
      handleRemove,
      handlePictureCardPreview,
      PhotosUpload,
      onSuccess,
      handleChange,
      onUpPhotos,
    };
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
});
</script>

<style lang="scss" scoped>
#photos {
  .uploadImg {
    font-size: 0.24rem;
    font-weight: bold;
    letter-spacing: 0.02rem;
    margin: 0.2rem 0;
    i {
      margin: 0 0.05rem;
      font-size: 0.2rem;
    }
  }
}
</style>