<template>
  <div style="width: 1000px;margin-top: 5px;font-size: 10px">
    <el-breadcrumb separator=">>>">
      <el-breadcrumb-item style="font-family: 微软雅黑;font-weight: bolder;">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item style="font-family: 微软雅黑;font-weight: bolder;">个人信息</el-breadcrumb-item>
      <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-form ref="form" label-width="100px" style="text-align: left;margin-top: 35px">
      <el-form-item label="用户名：" style="text-align: left;">
        <span>{{username}}</span>
      </el-form-item>
      <el-form-item label="手机号：" style="text-align: left">
        <span>{{mobile}}</span>
      </el-form-item>
      <el-form-item label="创建时间：">
        <span :formatter="dateFormatCreate">{{gmtCreate}}</span>
      </el-form-item>
      <el-form-item label="登录密码：">
        <span type="password">******</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    /*name: "UserMsg.vue",*/
    data() {
      return {
        gmtCreate: '',
        mobile: '',
        password: '',
        username: window.sessionStorage.getItem('user')
      }
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      getTableInfo() {
        this.$axios.get('/user/userMsg/'+this.username).then((result) => {
          let res = result.data;
          if (res.code != 200) {
            this.$message.error(res.message);
          }
          this.username = res.data.username;
          this.mobile = res.data.mobile;
          this.password = res.data.password;
          let gmtCreate = res.data.gmtCreate;
          const t = new Date(gmtCreate);
          const i = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
          this.gmtCreate = i;
        });
      },
      dateFormatCreate: function (row, column) {
        const t = new Date(row.gmtCreate);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
      }
    }
  }
</script>

<style scoped>
  el-form{
    text-align: left;
  }
  span{
    text-align: left;
  }
</style>
