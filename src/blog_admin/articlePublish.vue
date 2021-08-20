<template>
  <div id="articleAdminPublish">
    <ul class="publishArticleBody">
      <el-scrollbar height="6.5rem">
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
            :action="uplArticleUrl"
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
          <el-dropdown
            style="margin: 0 0.1rem"
            placement="top"
            @command="handleCommandLabel"
            v-if="blogArticleLabel.length"
          >
            <el-button type="warning">
              选择已有标签<i class="el-icon-collection-tag el-icon--right"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu slots="dropdown">
                <el-dropdown-item
                  v-for="(lableItem, index) in blogArticleLabel"
                  :key="index"
                  :command="lableItem.label"
                  >{{ lableItem.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
          <el-dropdown
            style="margin: 0 0.1rem"
            placement="top"
            @command="handleCommandCategory"
            v-if="blogArticleCategory.length"
          >
            <el-button type="success">
              选择已有分类<i class="el-icon-news el-icon--right"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu slots="dropdown">
                <el-dropdown-item
                  v-for="(categoryItem, index) in blogArticleCategory"
                  :key="index"
                  :command="categoryItem.category"
                  >{{ categoryItem.category }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <!-- 文章主题内容 -->
        <li ref="editor" id="articleContent"></li>
        <!-- 文章发布按钮 -->
        <li class="articleUpload">
          <el-button
            class="iconfont icon-shangchuan4"
            @click="publish"
            type="success"
            >发布文章</el-button
          >
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onMounted,
  onBeforeUnmount,
  nextTick,
  computed,
} from "vue";
import WangEditor from "wangeditor";
import { ElMessage } from "element-plus";
import { BASEURL, upArticle, getLable, getCategory } from "@/http/api";
import { getStorage } from "@/util/Storage";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "articleAdminPublish",
  components: {},
  setup() {
    // 标签
    const blogArticleLabel = ref([]);
    // 分类
    const blogArticleCategory = ref([]);
    //   路由实例
    const router = useRouter();
    const content = reactive({
      // html: "",
      // text: "",
    });
    const editor = ref(null);
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
    // 执行发布
    const publish = () => {
      if (
        !upArticleObj.title ||
        !upArticleObj.brief ||
        !upArticleObj.category ||
        !upArticleObj.img ||
        !upArticleObj.label
      )
        return ElMessage.warning("请输入完整的文章信息");
      upArticleObj.content = instance.txt.html();
      if (upArticleObj.content) {
        upArticle({
          admin_id: getStorage("admin_id"),
          title: upArticleObj.title,
          brief: upArticleObj.brief,
          category: upArticleObj.category,
          img: upArticleObj.img,
          label: upArticleObj.label,
          content: upArticleObj.content,
          name: getStorage("blogUserInfo").name,
          avatar: getStorage("blogUserInfo").avatar,
        })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              ElMessage.success({
                message: "恭喜你，发布成功",
                type: "success",
              });
              setTimeout(() => {
                router.replace("/admin/articleManage");
              }, 1000);
            } else {
              ElMessage.error("检查网络后重试.....");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    // 上传封面成功回调
    const uploadImgSrc = (res) => {
      if (res.code == 200) {
        upArticleObj.img = res.file.url;
        ElMessage.success({
          message: "上传成功",
          type: "success",
        });
      }
    };
    // 获取文章标签和分类
    const getArticleLableOrCategory = async () => {
      const res = await Promise.all([getLable(), getCategory()]);
      if (!res) return;
      if (res[0].data.code == 200) {
        const { data } = res[0].data;
        blogArticleLabel.value = data;
      }
      if (res[1].data.code == 200) {
        const { data } = res[1].data;
        blogArticleCategory.value = data;
      }
    };
    //el-dropdown 标签
    const handleCommandLabel = (value) => {
      console.log(value);
      upArticleObj.label = value;
    };
    //el-dropdown 分类
    const handleCommandCategory = (value) => {
      console.log(value);
      upArticleObj.category = value;
    };
    // console.log(instance.txt.html());
    // 挂载阶段
    let instance;
    onMounted(async () => {
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange() {},
        linkImgCallback(src) {
          console.log(src);
        },
        onlineVideoCallback(video) {
          // 自定义回调内容，内容成功插入后会执行该函数
          console.log(video);
        },
      });
      instance.create();
      await getArticleLableOrCategory();
    });
    nextTick(() => {});
    // 销毁阶段
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });
    // 计算属性
    const uplArticleUrl = computed(() => {
      return `${BASEURL}/admin/uploadCover`;
    });
    return {
      ...toRefs(upArticleObj),
      uploadImgSrc,
      editor,
      ...toRefs(content),
      publish,
      uplArticleUrl,
      handleCommandLabel,
      handleCommandCategory,
      blogArticleLabel,
      blogArticleCategory,
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
      margin: 0.1rem 0;
      span {
        font-weight: bold;
        font-size: 0.14rem;
        margin-right: 0.1rem;
      }
    }
    .articleCover {
      padding-left: 0.7rem;
    }
  }
}
</style>