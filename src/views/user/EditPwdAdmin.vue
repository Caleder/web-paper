<template>
  <div class="el-index">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="id">
        <el-input type="text" disabled v-model="form.id">
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="text" disabled v-model="form.username">
        </el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input :type="pwdTypeRe" prefix-icon="el-icon-lock" placeholder="请输入新密码" v-model="form.newPassword">
        </el-input>
      </el-form-item>
      <el-form-item prop="reNewPassword">
        <el-input :type="pwdTypeRe" prefix-icon="el-icon-lock" placeholder="请再次输入新密码" v-model="form.reNewPassword">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editPwd(form)">立即提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EditPwd",
    inject: ['reload'],
    data() {
      return {
        pwdType:"password",
        pwdTypeRe:"password",
        form: {
          newPassword: '',
          reNewPassword: '',
          id: '',
          username: ''
        },
        rules: {
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在3-16字符', trigger: 'blur'}
          ],
          reNewPassword: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在3-16字符', trigger: 'blur'}
          ]
        },
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
      editPwd(form) {
        if (!form.newPassword || !form.reNewPassword) {
          return this.$layer.msg("请添加对应信息！");
        }
        if(this.form.newPassword != this.form.reNewPassword){
          return this.$message.error('两次输入的新密码不一致');
        }
        if(this.form.reNewPassword != this.form.newPassword){
          return this.$message.error('两次输入新密码不一致');
        }
        /*this.form.password = this.form.reNewPassword;*/
        this.$axios.post("/user/updateUserPwd", this.form)
          .then((result) => {
            this.$layer.close(this.layerid);
            this.$layer.msg('修改密码成功');
          });
      }
    },
    created() {
      // this.info.id父组件传给子组件的id值
      let user = this.info.user;
      this.form.id = user.id;
      this.form.username = user.username;
    }
  }
</script>

<style scoped>
  .el-index {
    /*margin: auto;*/
    margin: 70px;
    width: 400px;
    /*text-align: center;*/
  }
  .dialog-footer {
    text-align: center;
  }
</style>
