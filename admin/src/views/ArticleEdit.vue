<template>
  <div>
    <h3>{{id? '编辑':'添加'}}文章</h3>
    <el-form @submit.native.prevent="save">
      <el-form-item label="标题" label-width="80px">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" label-width="80px">
        <vue-editor seCustomImageHandler @image-added="handleImageAdded" v-model="model.content"></vue-editor>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        author:{
          name: ''
        }
      },
      // 初始化
      handleImageAdded: function(){}
    }
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`article/${this.id}`, this.model);
      } else {
        res = await this.$http.post("article/create", this.model);
      }
      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/articles/list");
      this.$message.success("添加成功！");
    },
    async fatch() {
      const res = await this.$http.get(`article/${this.id}`)
      this.model = res.data;
      
    },
    
  },
  // 上传图片
  async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await this.$http.post('/upload',formData)
    Editor.insertEmbed(cursorLocation, "image", res.data.url)
    resetUploader()
  },
  async created() {
    this.id && this.fatch();
    this.model.author.name = await sessionStorage.getItem('name')
  }
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #cccccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>