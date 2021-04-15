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
            <i class="el-icon-s-help"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
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
              <span>院校管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-school"></i>
              <router-link to="/school/schoolList" style="text-decoration: none; color: inherit;">院校列表</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-school"></i>
              <router-link to="/school/schoolApplyList" style="text-decoration: none; color: inherit;">院校初复试</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-thumb"></i>
              <router-link to="/user/userMsg" style="text-decoration: none; color: inherit;">个人信息</router-link>
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
        user: window.sessionStorage.getItem('user')
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
    background-color: #333744;/*#EAEDF1*/
    display: flex;
    justify-content: space-between;
    min-height: 80px;
  }
  .el-aside {
    background-color: #333744;/*#333744*/
    height: 857px;
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
    position: fixed;
    left: 0;
    top: 1%;
  }
</style>
