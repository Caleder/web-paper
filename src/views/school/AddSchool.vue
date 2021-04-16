<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :model="form" size="small" label-width="100px">
      <el-form-item label="院校名称" prop="schoolName">
        <el-input v-model="form.schoolName" placeholder="请输入学院名称" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校信息" prop="schoolContent">
        <el-input v-model="form.schoolContent" placeholder="请输入院校信息" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校排名" prop="schoolRank">
        <el-input v-model="form.schoolRank" placeholder="请输入院校排名" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="院校联系方式" prop="schoolTel">
        <el-input v-model="form.schoolTel" placeholder="请输入院校联系方式" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校院网" prop="schoolWebUrl">
        <el-input v-model="form.schoolWebUrl" placeholder="请输入院校院网" style="width: 370px"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!--<el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button type="primary" @click="addManage(form)">确认</el-button>
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
          schoolContent: ''
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
          || !form.schoolContent || !form.schoolTel
          || !form.schoolWebUrl) {
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
              this.reload();
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
    text-align: center;
  }
</style>
