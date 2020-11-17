<template>
  <div>
    <h3>{{id? '编辑':'添加'}}角色</h3>
    <el-form @submit.native.prevent="save">
      

      <el-form-item label="角色">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button>重置</el-button>
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
      let res
      if(this.id){
        res = await this.$http.put(`rest/roles/${this.id}`, this.model);
      }else{
        res = await this.$http.post("rest/roles", this.model);
      }
      
      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/roles/list");
      this.$message.success("添加成功！");
      console.log(res);
    },
    
    async fatch(){
      const res = await this.$http.get(`rest/roles/${this.id}`)
      this.model = res.data
    }
  },
  created(){
  
    this.id && this.fatch()
  }
};
</script>