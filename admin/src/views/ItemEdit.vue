<template>
  <div>
    <h3>{{id? '编辑':'添加'}}物品</h3>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称" label-width="80px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="80px">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }

      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/items/list");
      this.$message.success("添加成功！");
      console.log(res);
    },
    async fatch() {
      console.log(this.id);
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    afterUpload(res){
      // 显式赋值
      this.$set(this.model,'icon',res.url)
      // this.model.icon = res.url
    }
  },
  created() {
    this.id && this.fatch();
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
    border-color: #409EFF;
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