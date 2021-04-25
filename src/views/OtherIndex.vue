<template>
  <div class="login-index">
    <div class="index-body">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          {{user}},你好！
        </el-form-item>
        <el-form-item>
          当前系统有{{form.schoolRankCount === null ? 0 : form.schoolRankCount}}条院校信息
        </el-form-item>
        <el-form-item>
          自己已收藏{{form.collectCount === null ? 0 : form.collectCount}}条院校信息
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OtherIndex",
    data(){
      return {
        form: {
          schoolRankCount: '0',
          userListCount: '0',
          collectCount: '0'
        },
        user: window.sessionStorage.getItem("user")
      }
    },
    created() {
      this.getTableInfo();
    },
    methods:{
      getTableInfo() {
        var params = new URLSearchParams();
        let item = window.sessionStorage.getItem("userRole");
        let userId = window.sessionStorage.getItem("userId");
        if(item === 'OTHER'){
          params.append("userId", userId);
        } else {
          params.append("userId", "");
        }
        this.$axios.get('/index/list',{params:params}).then((result) => {
          let data = result.data;
          if (data.code != 200) {
            return this.$message.error(data.message);
          }
          console.log(data)
          this.form.schoolRankCount = data.data.schoolRankCount;
          this.form.userListCount = data.data.userListCount;
          this.form.collectCount = data.data.collectCount;
        });
      }
    }
  }
</script>

<style scoped>
  .login-index {
    background: url("/static/3.jpg") no-repeat 0 0;
    /*background-color: red;*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 100%;*/
    width: 1681px;
    min-height: 857px;
    height: auto;
    position: absolute;
    margin-top: -20px;
    margin-left: -21px;
  }

  .index-body {
    margin-top: 200px;
    margin-left: 650px;
    border: solid 1px white;
    border-radius: 25%;
    background-color: snow;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    opacity:0.5;
  }
</style>
