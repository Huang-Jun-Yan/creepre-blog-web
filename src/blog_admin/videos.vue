<template>
  <div id="photos">
    <h2 class="uploadImg">上传视频</h2>

    <el-row style="margin: 0.3rem 0">
      <el-input
        style="width: 50%"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入视频介绍"
        v-model="textarea2"
      >
      </el-input>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-upload
        action="articleVideoUpload"
        limit="1"
        list-type="picture-card"
        :auto-upload="false"
      >
        <template #default>
          <span>上传视频封面图片</span>
        </template>
        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-upload
        limit="1"
        action="articleVideoUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <span>上传视频</span>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-button type="success">视频发布</el-button>
    </el-row>
  </div>
</template>

<script>
import { toRefs, reactive, computed } from "vue";
import { useRoute } from "vue-router"
export default {
  name: "BlogPhotos",
  components: {},
  directives: {},
  setup() {
    //   封面图片
    const uploadImg = reactive({
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    });
    const handleRemove = (file) => {
      console.log(file);
    };
    const handlePictureCardPreview = (file) => {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    };
    const handleDownload = (file) => {
      console.log(file);
    };
    // 计算属性
    computed(() => {
      return function articleVideoUpload() {
        return `${useRoute.state.baseURL}/video/upload`;
      };
    });
    return {
      ...toRefs(uploadImg),
      handleRemove,
      handlePictureCardPreview,
      handleDownload,
      computed,
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
    font-size: 0.24rem;
    font-weight: bold;
    letter-spacing: 0.02rem;
    margin: 0.2rem 0;
  }
}
</style>