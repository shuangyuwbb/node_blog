<template>
  <div>
    <h3>物品页面</h3>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="ID" width="340"></el-table-column>
      <el-table-column prop="article" label="文章ID"></el-table-column>
       <el-table-column prop="user" label="userID"></el-table-column>
         <el-table-column prop="body" label="评论"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: []
    };
  },
  methods: {
    async getItemList() {
      const res = await this.$http.get("comment/list");
      if (res.status !== 200) {
        this.$message.error("获取列表失败！");
      }
      console.log(res.data)
      this.itemList = res.data;
    },
    remove(row) {
      this.$confirm(`此操作将永久删除 "${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`comment/${row._id}`);
        if (res.status !== 200) {
          this.$message.error("删除失败！！");
        }
        this.$message.success("删除成功！");
        this.getItemList();
      });
    }
  },
  created() {
    this.getItemList();
  }
};
</script>

<style lang="less" scoped>
</style>