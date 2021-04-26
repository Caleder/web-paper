<template>
  <div class="el-index">
    <el-form ref="manage" :model="manage" label-width="80px">
      <el-form-item label="用户ID">
        <el-input placeholder="院校ID" disabled v-model="manage.id"/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" disabled v-model="manage.username"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名" v-model="manage.name"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="manage.mobile"/>
      </el-form-item>
      <el-form-item label="座右铭">
        <el-input type="textarea" placeholder="请输入座右铭" v-model="manage.motto"/>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="editManage(manage)">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'EditUser',
    inject: ['reload'],
    data() {
      return {
        manage: {},
        form: {}
      }
    },
    props: {
      //接收父组件传来的id值
      info: {
        type: Object,
        default: () => {
          return {}
        }
      },
      layerid: {
        type: String,
        default: ""
      }
    },
    methods: {
      //用来显示对应id的编辑内容，在created中调用
      fetchManage(username) {
        this.$axios.get('/user/userMsg/' + username).then((result) => {
          this.manage = result.data.data;
        });
      },
      editManage(manage) {
        if (!manage.name) {
          this.$layer.msg("请添加对应信息！")
        } else {
          this.$axios.post("/user/updateUser", this.manage)
            .then((result) => {
              //关闭父组件中的编辑弹框
              this.$layer.close(this.layerid);
              //弹出提示信息，默认时间为3秒
              this.$layer.msg("修改院校信息成功！");
              this.reload();
            });
        }
      }
    },
    created() {
      // this.info.id父组件传给子组件的id值
      this.fetchManage(this.info.username);
    }
  }
</script>

<style scoped>
  .el-index {
    /*margin: auto;*/
    margin: 70px;
    width: 400px;
    text-align: center;
  }
</style>
