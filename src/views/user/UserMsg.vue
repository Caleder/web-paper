<template>
  <div style="width: 1000px;margin-top: 5px;font-size: 10px">
    <el-breadcrumb separator=">>>">
      <el-breadcrumb-item style="font-family: 微软雅黑;font-weight: bolder;">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item style="font-family: 微软雅黑;font-weight: bolder;">个人信息</el-breadcrumb-item>
      <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-form ref="form" label-width="100px" style="text-align: left;margin-top: 35px">
      <el-form-item label="ID：" style="text-align: left;">
        <span>{{id}}</span>
      </el-form-item>
      <el-form-item label="姓名：" style="text-align: left;">
        <span>{{name}}</span>
      </el-form-item>
      <el-form-item label="用户名：" style="text-align: left;">
        <span>{{username}}</span>
      </el-form-item>
      <el-form-item label="手机号：" style="text-align: left">
        <span>{{mobile}}</span>
      </el-form-item>
      <el-form-item label="座右铭：" style="text-align: left">
        <span>{{motto}}</span>
      </el-form-item>
      <el-form-item label="创建时间：">
        <span :formatter="dateFormatCreate">{{gmtCreate}}</span>
      </el-form-item>
      <el-form-item label="登录密码：">
        <span type="password">******</span>
        <el-button type="primary" size="small" icon="el-icon-edit"
                   style="margin-left: 30px;margin-bottom: 15px;" @click="editPwd(id,username)">修改密码</el-button>
      </el-form-item>
      <el-form-item label="用户身份：" style="text-align: left">
        <span v-if="role === 'ADMIN'">管理员</span>
        <span v-if="role !== 'ADMIN'">普通用户</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import EditPwd from '@/views/user/EditPwd';
  export default {
    /*name: "UserMsg.vue",*/
    data() {
      return {
        id: '',
        gmtCreate: '',
        mobile: '',
        password: '',
        name: '',
        motto: '',
        username: window.sessionStorage.getItem('user'),
        role: window.sessionStorage.getItem('userRole')
      }
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      editPwd(id,username){
        const user = {
          id: id,
          username: username
        }
        this.$layer.iframe({
          type:1,
          title:"修改密码",
          area:['600px','500px'],
          shade:true,
          offset:'auto',
          content:{
            content:EditPwd,
            parent:this,
            data:{
              info:{user:user}// 传递的要编辑内容的id值
            }
          }
        })
      },
      getTableInfo() {
        this.$axios.get('/user/userMsg/'+this.username).then((result) => {
          let res = result.data;
          if (res.code != 200) {
            this.$message.error(res.message);
          }
          this.id = res.data.id;
          this.username = res.data.username;
          this.mobile = res.data.mobile;
          this.password = res.data.password;
          this.name = res.data.name;
          this.motto = res.data.motto;
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
