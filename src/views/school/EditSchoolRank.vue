<template>
  <div class="el-index">
    <el-form ref="manage" :model="manage" label-width="100px">
      <el-form-item label="院校ID">
        <el-input disabled placeholder="院校ID" v-model="manage.id"/>
      </el-form-item>
      <el-form-item label="院校名称">
        <el-input placeholder="学院名称" v-model="manage.schoolName"/>
      </el-form-item>
      <el-form-item label="学院排名">
        <el-input placeholder="学院排名" v-model="manage.schoolRank"/>
      </el-form-item>
      <el-form-item label="院校所在地" prop="cityName">
        <el-input v-model="manage.cityName" placeholder="请输入院校所在地"/>
      </el-form-item>
      <el-form-item label="院校隶属" prop="affiliation">
        <el-input v-model="manage.affiliation" placeholder="请输入院校隶属"/>
      </el-form-item>
      <el-form-item label="院校等级" prop="grade">
        <el-input v-model="manage.grade" placeholder="请输入院校等级"/>
      </el-form-item>
      <el-form-item label="学院院网">
        <el-input placeholder="学院院网" v-model="manage.schoolWebUrl"/>
      </el-form-item>
      <el-form-item label="学院电话">
        <el-input placeholder="学院电话" v-model="manage.schoolTel"/>
      </el-form-item>
      <el-form-item label="学院简介">
        <textarea autocomplete="off" rows="3" v-model="manage.schoolContent"
                  placeholder="学院简介" maxlength="500" class="el-textarea__inner"
                  style="min-height: 31px;"/>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="editManage(manage)">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'EditSchoolRank',
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
      fetchManage(id) {
        this.$axios.get('/schoolRank/getSchoolRank/' + id).then((result) => {
          this.manage = result.data.data;
        });
      },
      editManage(manage) {
        if (!manage.schoolName || !manage.schoolRank
          || !manage.schoolContent || !manage.schoolTel || !manage.grade
          || !manage.schoolWebUrl || !manage.cityName || !manage.affiliation) {
          this.$layer.msg("请添加对应信息！");
        } else {
          this.$axios.post("/schoolRank/updateSchoolRank", this.manage)
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
      this.fetchManage(this.info.id);
    }
  }
</script>

<style scoped>
  .el-index {
    /*margin: auto;*/
    margin: 70px;
    width: 400px;
    height: 500px;
    text-align: center;
  }
  .el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
</style>
