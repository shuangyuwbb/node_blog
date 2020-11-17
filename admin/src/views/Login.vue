<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="LoginFormRef"
        :rules="LoginFormRules"
        class="login_form"
        label-width="0px"
        :model="Login_Form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="Login_Form.username" prefix-icon="el-icon-user-solid" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="Login_Form.password" prefix-icon="el-icon-star-on" type="password" />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 登陆表单的数据绑定对象
      Login_Form: {
        username: "admin",
        password: "123456"
      },
      // 验证规则
      LoginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        // 验证密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 重置按钮
    resetLoginForm() {
      console.log(this);
      this.$refs.LoginFormRef.resetFields()
    },
    async login() {
      this.$refs.LoginFormRef.validate(async valid => {
      
        if (!valid) {
          return;
        }
        const res = await this.$http.post("login", this.Login_Form);
          console.log(res)
        if (res.status != 200) {
          return this.$message.error("登陆失败");
        }
        this.$message.success("登陆成功");
       
        // 保存token
        
        // 保存token在sessiong中
        sessionStorage.token = res.data.token;
        sessionStorage.name = res.data.username;
        // 跳转后台主页
        this.$router.push(`main`);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribe to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #2d3d4d;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    border: 1px solid #ccc;
    .avatar_box {
      width: 130px;
      height: 130px;
      border: 1px solid #ccc;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #eee;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
