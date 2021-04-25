<template>
  <el-container class="el-container">
    <el-header>
      <div>
        <img src="../assets/Logo.png" class="el-logo"/>
      </div>
      <el-dropdown class="el-dropdown">
        <i class="el-icon-settings" style="color:white;cursor:pointer;">{{user}}</i>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>个人中心</el-dropdown-item>-->
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <router-link v-if="role === 'OTHER'" to="/otherIndex" style="text-decoration: none; color: inherit;">首页</router-link>
              <router-link v-if="role === 'ADMIN'" to="/adminIndex" style="text-decoration: none; color: inherit;">首页</router-link>
            </template>
          </el-menu-item>
          <el-submenu index="2" v-if="role === 'ADMIN'">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-user"></i>
              <router-link to="/user/list" style="text-decoration: none; color: inherit;">用户列表</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span v-if="role === 'ADMIN'">院校管理</span>
              <span v-if="role !== 'ADMIN'">院校查询</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-school"></i>
              <router-link to="/school/schoolList" style="text-decoration: none; color: inherit;">院校列表</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-school"></i>
              <router-link to="/school/schoolBeginList" style="text-decoration: none; color: inherit;">院校初试
              </router-link>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-school"></i>
              <router-link to="/school/schoolRepeatList" style="text-decoration: none; color: inherit;">院校复试
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>院校收藏</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-star-on"></i>
              <router-link to="/school/schoolCollect" style="text-decoration: none; color: inherit;">收藏列表</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span v-if="role === 'ADMIN'">管理员中心</span>
              <span v-if="role !== 'ADMIN'">个人中心</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-thumb"></i>
              <router-link v-if="role === 'ADMIN'" to="/user/userMsg" style="text-decoration: none; color: inherit;">管理员信息</router-link>
              <router-link v-if="role !== 'ADMIN'" to="/user/userMsg" style="text-decoration: none; color: inherit;">个人信息</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Main.vue",
    data() {
      return {
        user: window.sessionStorage.getItem('user'),
        role: window.sessionStorage.getItem('userRole')
      }
    },
    methods: {
      logout: function () {
        window.sessionStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #333744; /*#EAEDF1*/
    display: flex;
    justify-content: space-between;
    min-height: 80px;
  }

  .el-aside {
    background-color: #333744; /*#333744*/
    min-height: 857px;
    height: auto;
    min-width: 240px;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .el-dropdown {
    position: fixed;
    right: 2%;
    top: 3%;
  }

  .el-logo {
    position: absolute;
    left: 0;
    top: 1%;

  }
</style>
