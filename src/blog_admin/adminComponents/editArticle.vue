<template>
  <div id="articleAdminEdit">
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
        <li ref="editor" id="articleContent"></li>
        <!-- 文章发布按钮 -->
        <li class="articleUpload">
          <el-button
            class="iconfont icon-shangchuan4"
            @click="publish"
            type="success"
            >编辑文章</el-button
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
import { BASEURL, byIdGetArticle, updateArticle } from "@/http/api";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "articleAdminEdit",
  components: {},
  setup() {
    //   路由实例
    const router = useRouter();
    const route = useRoute();
    const content = reactive({
      article_id: route.params.id,
    });
    const editor = ref(null);
    // 上传的参数
    const editArticleObj = reactive({
      admin_id: "", //管理员id
      title: "", //文章标题
      brief: "", //文章简介
      category: "", //分类
      img: "", //文章封面
      label: "", //标签
      content: "", //内容
      dialogVisible: false,
    });
    // 先拿到这个id的参数
    const getSelfArticle = (article_id) => {
      byIdGetArticle({ article_id: article_id })
        .then((res) => {
          if (res.data.code == 200) {
            const { data } = res.data;
            (editArticleObj.admin_id = data.admin_id),
              (editArticleObj.title = data.title),
              (editArticleObj.brief = data.brief),
              (editArticleObj.category = data.category),
              (editArticleObj.img = data.img),
              (editArticleObj.label = data.label)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSelfArticle(content.article_id);
    // 编辑
    const publish = () => {
      if (
        !editArticleObj.title ||
        !editArticleObj.brief ||
        !editArticleObj.category ||
        !editArticleObj.img ||
        !editArticleObj.label
      )
        return ElMessage.warning("请输入完整的文章信息");
      editArticleObj.content = instance.txt.html();
      if (editArticleObj.content) {
        updateArticle({
          admin_id: editArticleObj.admin_id,
          title: editArticleObj.title,
          brief: editArticleObj.brief,
          category: editArticleObj.category,
          img: editArticleObj.img,
          label: editArticleObj.label,
          content: editArticleObj.content,
          article_id: content.article_id
        })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              ElMessage.success({
                message: "恭喜你，修改成功",
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
        editArticleObj.img = res.file.url;
        ElMessage.success({
          message: "上传成功",
          type: "success",
        });
      }
    };
    // console.log(instance.txt.html());
    // 挂载阶段
    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange() {},
        linkImgCallback(src) {
          console.log(src, "图片地址");
        },
        onlineVideoCallback(video) {
          // 自定义回调内容，内容成功插入后会执行该函数
          console.log(video, "video");
        },
      });

      instance.create();
    });
    nextTick(() => {});
    // 销毁阶段
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });
    // 计算属性
    // 计算属性
    const uplArticleUrl = computed(() => {
      return `${BASEURL}/admin/uploadCover`;
    });
    return {
      ...toRefs(editArticleObj),
      uploadImgSrc,
      editor,
      ...toRefs(content),
      publish,
      uplArticleUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
#articleAdminEdit {
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