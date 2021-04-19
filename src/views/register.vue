<template>
  <div class="login-index"><!--  :rules===v-bind:rules  :model===v-bind:model  -->
    <div class="login-container">
      <!--<div class="avatar_box">
        <img src="../assets/logo1.jpg" alt="">
      </div>-->
      <span @click="goLogin()" class="login">有账号,去登录>>></span>
      <div class="login-box">
        <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-s-custom" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="pwdType" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password">
              <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input :type="pwdTypeRe" prefix-icon="el-icon-lock" placeholder="请再次输入密码" v-model="loginForm.rePassword">
              <i slot="suffix" class="el-icon-view" @click="showPwdRe"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input prefix-icon="el-icon-phone" placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input prefix-icon="el-icon-user" placeholder="请输入姓名" v-model="loginForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="motto">
            <el-input prefix-icon="el-icon-edit-outline" placeholder="请输入座右铭" v-model="loginForm.motto"></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-select v-model="loginForm.role" placeholder="角色">
              <el-option label="管理员" value="ADMIN"></el-option>
              <el-option label="普通用户" value="OTHER"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="login-button">
            <el-button type="primary" @click="register('loginForm')">注册</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register.vue",
    data() {
      return {
        pwdType:"password",
        pwdTypeRe:"password",
        loginForm: {
          username: '',
          password: '',
          rePassword: '',
          mobile: '',
          role: '',
          name: '',
          motto: '',
          role: 'OTHER'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在1-16字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在1-16字符', trigger: 'blur'}
          ],
          rePassword: [
            {required: true, message: '请再一次输入密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在1-16字符', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '长度在11字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在1-6字符', trigger: 'blur'}
          ]
        },
        codeImg: ''
      }
    },
    methods: {
      goLogin(){
        this.$router.push('/login')
      },
      register: function (loginForm) {
        this.$refs[loginForm].validate(async valid => {
          if (this.loginForm.username == '' || this.loginForm.username == null) {
            return this.$message.error('请输入用户名');
          } else if (this.loginForm.password == '' || this.loginForm.password == null) {
            return this.$message.error('请输入密码');
          } else if (this.loginForm.rePassword == '' || this.loginForm.rePassword == null) {
            return this.$message.error('请再次输入密码');
          } else if (this.loginForm.mobile == '' || this.loginForm.mobile == null) {
            return this.$message.error('请输入手机号');
          } else if (this.loginForm.name == '' || this.loginForm.name == null) {
            return this.$message.error('请输入姓名');
          }
          if(this.loginForm.password != this.loginForm.rePassword){
            return this.$message.error('两次输入密码不一致');
          }
          if (valid) {
            const {data:result} = await this.$axios.post('/user/register',this.loginForm);
            if(result.code != 200){
              return this.$message.error(result.message);
            } else {
              this.$message.success(result.message);
              this.$router.push('/login');
            }
          } else {
            if (this.loginForm.username == '' || this.loginForm.username == null) {
              return this.$message.error('请输入用户名');
            } else if (this.loginForm.password == '' || this.loginForm.password == null) {
              return this.$message.error('请输入密码');
            } else if (this.loginForm.rePassword == '' || this.loginForm.rePassword == null) {
              return this.$message.error('请再次输入密码');
            } else if (this.loginForm.mobile == '' || this.loginForm.mobile == null) {
              return this.$message.error('请输入手机号');
            } else if (this.loginForm.name == '' || this.loginForm.name == null) {
              return this.$message.error('请输入姓名');
            }
            return false;
          }
        });
      },
      resetForm: function (loginForm) {
        this.$refs[loginForm].resetFields();
      },
      showPwd: function (){
        this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
        let e = document.getElementsByClassName('el-icon-view')[0];
        this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') :
          e.setAttribute('style', 'color: #c0c4cc');
      },
      showPwdRe: function (){
        this.pwdTypeRe === 'password' ? this.pwdTypeRe = '' : this.pwdTypeRe = 'password';
        let e = document.getElementsByClassName('el-icon-view')[1];
        this.pwdTypeRe == '' ? e.setAttribute('style', 'color: #409EFF') :
          e.setAttribute('style', 'color: #c0c4cc');
      }
    }
  }
</script>

<style scoped>

  .login-index {
    background: url("/static/loginBackground.jpg") no-repeat 0 0;
    /*background-color: red;*/
    /*background-repeat: no-repeat;*/
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
    /*margin-top: -60px;
    margin-left: -8px;*/
  }

  .login-container {
    text-align: left;
    width: 450px;
    height: 545px;
    border: 1px solid #DCDFE6;
    /*padding: 20px 50px 20px 20px;
    margin: 150px auto 0;*/
    border-radius: 5px;
    box-shadow: 0 0 20px;
    background-color: white;
    transform: translate(-50%,-50%);
    top: 45%;
    left: 50%;
    position: absolute;
  }
  .login-box {
    text-align: left;
    width: 450px;
    height: 565px;
    padding: 0px 50px 27px 4px;
    margin: 100px auto 0;
    transform: translate(-50%,-50%);
    top: 48%;
    left: 48%;
    position: absolute;
  }
  .login-button {
    text-align: center;
  }
  /*.avatar_box {
    height: 130px;
    width: 130px;
    box-shadow: 0 0 20px #dddddd;
    border-radius: 50%;
    border: 1px solid #eeeeee;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }*/

  .login{
    position: absolute;
    right: 0px;
    margin-top: 10px;
    cursor:pointer;
    color: cornflowerblue;
  }
</style>
