<template>
  <div>
    <h3>{{id? '编辑':'添加'}}分类</h3>
    <el-form @submit.native.prevent="save">
      <el-form-item label="父级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id" ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
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
      model: {},
      parent: []
    };
  },
  methods: {
    
    async save() {
      let res
      if(this.id){
        res = await this.$http.put(`rest/categeries/${this.id}`, this.model);
      }else{
        res = await this.$http.post("rest/categeries", this.model);
      }
      
      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/categeries/list");
      this.$message.success("添加成功！");
      console.log(res);
    },
    async getParentList() {
      const res = await this.$http.get("rest/categeries");
      if(res.status !== 200){
        this.$message.error('获取父级分类失败！')
      }
      this.parent = res.data;
      console.log(res.data)
    },
    async fatch(){
      const res = await this.$http.get(`rest/categeries/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.getParentList()
    this.id && this.fatch()
  }
};
</script>