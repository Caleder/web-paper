<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="院校名称" prop="schoolName">
        <el-input v-model="form.schoolName" placeholder="请输入院校名称"/>
      </el-form-item>
      <el-form-item label="院校排名" prop="schoolRank">
        <el-input v-model="form.schoolRank" placeholder="请输入院校排名" controls-position="right"/>
      </el-form-item>
      <el-form-item label="院校所在地" prop="cityName">
        <el-input v-model="form.cityName" placeholder="请输入院校所在地"/>
      </el-form-item>
      <el-form-item label="院校隶属" prop="affiliation">
        <el-input v-model="form.affiliation" placeholder="请输入院校隶属"/>
      </el-form-item>
      <el-form-item label="院校等级" prop="grade">
        <el-input v-model="form.grade" placeholder="请输入院校等级"/>
      </el-form-item>
      <el-form-item label="院校院网" prop="schoolWebUrl">
        <el-input v-model="form.schoolWebUrl" placeholder="请输入院校院网"/>
      </el-form-item>
      <el-form-item label="院校联系方式" prop="schoolTel">
        <el-input v-model="form.schoolTel" placeholder="请输入院校联系方式"/>
      </el-form-item>
      <el-form-item label="院校简介" prop="schoolContent">
        <textarea autocomplete="off" rows="3" v-model="form.schoolContent"
                  placeholder="学院简介" maxlength="500" class="el-textarea__inner"
                  style="min-height: 31px;"/>
        <!--<el-input v-model="form.schoolContent" placeholder="请输入院校简介" style="width: 370px"/>-->
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
    name: "AddSchool",
    inject: ['reload'],
    data() {
      return {
        form: {
          schoolName: '',
          schoolWebUrl: '',
          schoolTel: '',
          schoolRank: '',
          schoolContent: '',
          grade: '',
          affiliation: '',
          cityName: ''
        }
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
        if (!form.schoolName || !form.schoolRank
          || !form.schoolContent || !form.schoolTel || !form.grade
          || !form.schoolWebUrl || !form.cityName || !form.affiliation) {
          this.$layer.msg("请添加对应信息！");
        } else {
          this.$axios.post("/schoolRank/addSchoolRank", this.form)
            .then((result) => {
              let data = result.data;
              if(data.data !== '该院校已存在'){
                //关闭父组件中的弹框
                this.$layer.close(this.layerid);
              }
              this.$layer.msg(data.data);
              location.reload();
            });
        }
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
