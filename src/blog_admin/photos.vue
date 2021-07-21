<template>
  <div id="photos">
    <h2 class="uploadImg">上传图片</h2>

    <el-row style="margin: 0.3rem 0">
      <el-input
        style="width: 50%"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入图片介绍"
        v-model="textarea2"
      >
      </el-input>
    </el-row>

    <el-row style="margin: 0.3rem 0">
      <el-upload
        action="articleImageUpload"
        list-type="picture-card"
        :auto-upload="false"
      >
        <template #default>
          <i class="el-icon-plus"></i>
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
      <el-button type="success">图片发布</el-button>
    </el-row>
  </div>
</template>

<script>
import { toRefs, reactive, computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "BlogPhotos",
  components: {},
  directives: {},
  setup() {
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
      return function articleImageUpload() {
        return `${useRoute.state.baseURL}/admin/uploadCover`;
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
});
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