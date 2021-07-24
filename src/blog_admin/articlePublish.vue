<template>
  <div id="articleAdminPublish">
    <ul class="publishArticleBody">
      <el-scrollbar height="6rem">
        <!-- 文章标题 -->
        <li class="articleTitle">
          <span>文章标题:</span>
          <el-input
            placeholder="请输入文章标题"
            style="width: 3rem"
            v-model="title"
            clearable
          >
          </el-input>
        </li>
        <!-- 文章简介 -->
        <li class="articleBrief">
          <span>文章简介:</span>
          <el-input
            placeholder="请输入文章简介"
            style="width: 3rem"
            v-model="brief"
            clearable
          >
          </el-input>
        </li>
        <!-- 文章封面 -->
        <li class="articleCover">
          <el-upload
            action=""
            :limit="1"
            list-type="picture-card"
            :on-success="uploadImgSrc"
          >
            <template #default>
              <span>上传文章封面图片</span>
            </template>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img width="100%" :src="img" alt="" />
          </el-dialog>
        </li>
        <!-- 标签 -->
        <li class="articleLabel">
            <span>文章标签:</span>
            <el-input
              placeholder="请输入文章标签"
              style="width: 3rem"
              v-model="label"
              clearable
            >
            </el-input>
        </li>
        <!-- 分类 -->
        <li class="articleCategory">
            <span>文章分类:</span>
            <el-input
              placeholder="请输入文章分类"
              style="width: 3rem"
              v-model="category"
              clearable
            >
            </el-input>
        </li>
        <!-- 文章主题内容 -->
        <li class="articleContent"></li>
        <!-- 文章发布按钮 -->
        <li class="articleUpload">
          <el-button class="iconfont icon-shangchuan4" type="success">发布文章</el-button>
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "articleAdminPublish",
  components: {},
  setup() {
    // 上传的参数
    const upArticleObj = reactive({
      admin_id: "", //管理员id
      title: "", //文章标题
      brief: "", //文章简介
      category: "", //分类
      img: "", //文章封面
      label: "", //标签
      content: "", //内容
      name: "", //管理员name
      avatar: "", //管理员头像
      dialogVisible: false,
    });
    // 上传封面成功回调
    const uploadImgSrc = () => {};
    return {
      ...toRefs(upArticleObj),
      uploadImgSrc,
    };
  },
});
</script>

<style lang="scss" scoped>
#articleAdminPublish {
  // background: red;
  height: 100%;
  .publishArticleBody {
    padding: 0.2rem 0;
    li {
      margin: .1rem 0;
      span {
        font-weight: bold;
        font-size: .14rem;
        margin-right: .1rem;
      }
    }
  }
}
</style>