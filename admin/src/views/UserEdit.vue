<template>
  <div>
    <h3>{{id? '编辑':'添加'}}用户</h3>
    <el-form @submit.native.prevent="save">
      <el-tabs type='border-card'>
        <el-tab-pane label="基础信息">
          <el-form-item label="用户名" label-width="80px">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px">
            <el-input v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item label="角色" label-width="80px">
            <el-select v-model="model.role">
              <el-option
                v-for="item in roles"
                :label="item.name"
                :key="item._id"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="头像" label-width="80px">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
         
          <el-form-item label-width="80px" label="邮箱">
            <el-input type="email" v-model="model.emali"></el-input>
          </el-form-item>
          
        </el-tab-pane>
       
      </el-tabs>
      <el-form-item label-width="80px">
        <el-button type="primary" native-type="submit" style="margin-top:1em">保存</el-button>
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
       radio: '1',
      roles: {
        
      },
      model: {
        username: "",
        avatar: "",
        emali: "",  
        role: {
          
        }     
      }
    };
  },
  methods: {
    async save() {
      let res;
     
      if (this.id) {
        res = await this.$http.put(`user/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/user/create", this.model);
      }

      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/users/list");
      this.$message.success("添加成功！");
      // console.log(res);
    },

    // 编辑
    async fatch() {
      const res = await this.$http.get(`/user/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    // 获取类别数据
    async fatchRoles() {
      const res = await this.$http.get(`/role/list`);
      this.roles = res.data;
      // console.log(res.data);
    },

    afterUpload(res) {
      // 显式赋值
      // this.$set(this.model,'avatar',res.url)
      this.model.avatar = res.url;
    }
  },
  created() {
    
    this.fatchRoles();
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