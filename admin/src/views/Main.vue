<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-opened="['1']" unique-opened>
          <!-- 内容管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>内容管理
            </template>

            <!-- 物品管理 -->
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新增物品</el-menu-item>
              <el-menu-item index="/items/list">评论列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>运营管理
            </template>
            <!-- 文章管理 -->
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新增文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>系统设置
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categeries/create">新增分类</el-menu-item>
              <el-menu-item index="/categeries/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <!-- 英雄管理 -->

            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新增英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">角色</template>
              <el-menu-item index="/roles/create">新增角色</el-menu-item>
              <el-menu-item index="/roles/list">角色列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-message"></i>用户管理
            </template>

            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/create">新增用户</el-menu-item>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span></span>
        </el-header>

        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    getStorage() {
      this.name = sessionStorage.getItem('name')
    },
    loginOut() {
      sessionStorage.clear();
      this.$router.push("login");
    }
  },
  created() {
    this.getStorage();
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

