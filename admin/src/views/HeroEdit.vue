<template>
  <div>
    <h3>{{id? '编辑':'添加'}}英雄</h3>
    <el-form @submit.native.prevent="save">
      <el-tabs type='border-card'>
        <el-tab-pane label="基础信息">
          <el-form-item label="名称" label-width="80px">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号" label-width="80px">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="80px">
            <el-select v-model="model.categeries" multiple>
              <el-option
                v-for="item in categerios"
                :label="item.name"
                :key="item._id"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺风出装" label-width="80px">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :label="item.name" :key="item._id" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" label-width="80px">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :label="item.name" :key="item._id" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度系数" label-width="80px">
            <el-rate v-model="model.scores.difficult" style="margin-top:0.7em" :max="10" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能" label-width="80px">
            <el-rate v-model="model.scores.skills" style="margin-top:0.7em" :max="10" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击" label-width="80px">
            <el-rate v-model="model.scores.attack" style="margin-top:0.7em" :max="10" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存" label-width="80px">
            <el-rate v-model="model.scores.survive" style="margin-top:0.7em" :max="10" show-score></el-rate>
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
          <el-form-item label-width="80px" label="使用技巧">
            <el-input type="textarea" v-model="model.usage_tips"></el-input>
          </el-form-item>
          <el-form-item label-width="80px" label="对抗技巧">
            <el-input type="textarea" v-model="model.battle_tips"></el-input>
          </el-form-item>
          <el-form-item label-width="80px" label="团战思路">
            <el-input type="textarea" v-model="model.team_tips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label='技能' >
          <el-button>添加技能</el-button>
          <el-row type='flex'>
            <el-col :md='12'>
              <el-form-item label='名称'>
              <el-input ></el-input>
            </el-form-item>
            </el-col>
          </el-row>
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
      categerios: {},
      items: {},
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }

      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/heroes/list");
      this.$message.success("添加成功！");
      // console.log(res);
    },

    // 编辑英雄
    async fatch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    // 获取类别数据
    async fatchCategeries() {
      const res = await this.$http.get(`rest/categeries`);
      this.categerios = res.data;
     
    },

    // 获取顺丰出装
    async fatchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    afterUpload(res) {
      // 显式赋值
      // this.$set(this.model,'avatar',res.url)
      this.model.avatar = res.url;
    }
  },
  created() {
    this.fatchItems();
    this.fatchCategeries();
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