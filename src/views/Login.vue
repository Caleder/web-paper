<template>
  <div class="login-index"><!--  :rules===v-bind:rules  :model===v-bind:model  -->
    <div class="login-container">
      <!--<div class="avatar_box">
        <img src="../assets/login.jpg" alt="">
      </div>-->
      <span @click="goRegister()" class="register">没有账号？马上注册>>></span>
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
          <el-form-item prop="code">
              <el-input class="authCode" placeholder="请输入验证码" v-model="loginForm.code"/>
              <img :src="codeImg" class="img-code" @click="changeCodeImg()" alt="验证码" title="点击换一张">
          </el-form-item>
          <el-form-item class="login-button">
            <el-button type="primary" @click="login('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login.vue",
    inject: ['reload'],
    data() {
      return {
        pwdType:"password",
        loginForm: {
          username: '',
          password: '',
          code: '',
          randomStr: ''
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
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 4, max: 4, message: '长度为4字符', trigger: 'blur'}
          ]
        },
        codeImg: ''
      }
    },
    created () {
      this.changeCodeImg()
    },
    methods: {
      goRegister(){
        this.$router.push('/register')
      },
      login: function (loginForm) {
        this.$refs[loginForm].validate(async valid => {
          if (this.loginForm.username == '' || this.loginForm.username == null) {
            return this.$message.error('请输入用户名');
          } else if (this.loginForm.password == '' || this.loginForm.password == null) {
            return this.$message.error('请输入密码');
          } else if (this.loginForm.code == '' || this.loginForm.code == null) {
            return this.$message.error('请输入验证码');
          }
          if (valid) {
            const {data:result} = await this.$axios.post('/user/login',this.loginForm);
            if(result.code != 200){
              this.$message.error(result.message);
            } else {
              window.sessionStorage.setItem("token",result.data.headToken)
              window.sessionStorage.setItem("user",result.data.user)
              window.sessionStorage.setItem("userRole",result.data.userRole)
              window.sessionStorage.setItem("userId",result.data.userId)
              this.$message.success(result.message);
              if(result.data.userRole === 'ADMIN'){
                this.$router.push('/adminIndex');
              } else {
                this.$router.push('/otherIndex');
              }
            }
          } else {
            if (this.loginForm.username == '' || this.loginForm.username == null) {
              this.$message.error('请输入用户名');
            } else if (this.loginForm.password == '' || this.loginForm.password == null) {
              this.$message.error('请输入密码');
            } else if (this.loginForm.code == '' || this.loginForm.code == null) {
              this.$message.error('请输入验证码');
            }
            return false;
          }
        });
        this.reload();
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
      changeCodeImg () {
        const num = Math.ceil(Math.random()*10);
        this.loginForm.randomStr = num;
        this.$axios.get('/user/code/'+ num, {
          responseType: 'arraybuffer'
        }).then((res) => {
          //console.log(res);
          // 转换
          let codeImg =  'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
          this.codeImg = codeImg
        })
        /*this.reload();*/
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
    height: 300px;
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
    height: 370px;
    padding: 0px 50px 27px 4px;
    margin: 125px auto 0;
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
  }*/
  /*.avatar_box img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }*/

  .authCode{
    width: 220px;
  }
  .img-code{
    width: 135px;
    height: 40px;
    position: absolute;
    left: auto;
    margin-left: 15px;
  }
  .register{
    position: absolute;
    right: 0px;
    margin-top: 10px;
    cursor:pointer;
    color: cornflowerblue;
  }
</style>
