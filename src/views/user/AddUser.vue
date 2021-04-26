<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-s-custom" placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="pwdType" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password">
          <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="rePassword">
        <el-input :type="pwdTypeRe" prefix-icon="el-icon-lock" placeholder="请再次输入密码" v-model="form.rePassword">
          <i slot="suffix" class="el-icon-view" @click="showPwdRe"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input prefix-icon="el-icon-user" placeholder="请输入姓名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input prefix-icon="el-icon-phone" placeholder="请输入手机号" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="motto">
        <el-input type="textarea" prefix-icon="el-icon-edit-outline" placeholder="请输入座右铭" v-model="form.motto"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select v-model="form.role" placeholder="角色">
          <el-option label="管理员" value="ADMIN"></el-option>
          <el-option label="普通用户" value="OTHER"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!--<el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button type="primary" @click="addManage(form)">立即提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddUser",
    inject: ['reload'],
    data() {
      return {
        pwdType: "password",
        pwdTypeRe: "password",
        form: {
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
            {min: 3, max: 16, message: '长度在3-16字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在3-16字符', trigger: 'blur'}
          ],
          rePassword: [
            {required: true, message: '请再一次输入密码', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在3-16字符', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '长度在11字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 16, message: '长度在1-6字符', trigger: 'blur'}
          ]
        },
      }
    },
    props: {
      layerid: {
        type: String,
        default: ""
      }
    },
    methods: {
      addManage(form) {
        if (!form.username || !form.name
          || !form.password || !form.rePassword || !form.role || !form.mobile) {
          this.$layer.msg("请添加对应信息！");
        } else {
          if (this.form.password != this.form.rePassword) {
            return this.$message.error('两次输入密码不一致');
          }
          this.$axios.post("/user/register", this.form)
            .then((result) => {
              this.$layer.close(this.layerid);
              this.$layer.msg('新增用户成功');
              this.reload();
            });
        }
      },
      showPwd: function () {
        this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
        let e = document.getElementsByClassName('el-icon-view')[0];
        this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') :
          e.setAttribute('style', 'color: #c0c4cc');
      },
      showPwdRe: function () {
        this.pwdTypeRe === 'password' ? this.pwdTypeRe = '' : this.pwdTypeRe = 'password';
        let e = document.getElementsByClassName('el-icon-view')[1];
        this.pwdTypeRe == '' ? e.setAttribute('style', 'color: #409EFF') :
          e.setAttribute('style', 'color: #c0c4cc');
      }
    },
    created() {

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
