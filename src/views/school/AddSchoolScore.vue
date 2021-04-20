<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="院校名称" prop="schoolId">
        <el-select v-model="form.schoolId" placeholder="院校名称">
          <el-option v-for="item in schoolRankList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学年" prop="schoolYear">
        <el-input v-model="form.schoolYear" placeholder="请输入学年" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校复试线" prop="schoolScore">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model.number="form.schoolScore" placeholder="请输入院校复试线" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校报名人数" prop="schoolApply">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model.number="form.schoolApply" placeholder="请输入院校报名人数" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校录取人数" prop="schoolAdmit">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model.number="form.schoolAdmit" placeholder="请输入院校录取人数" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校报录比(%)" prop="schoolApplyAdmit">
        <el-input readonly v-model="schoolApplyAdmit === 'NaN%' ? '0%' : schoolApplyAdmit" placeholder="请输入院校报录比(%)" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="初复试资料" prop="schoolFile">
        <el-input v-model="form.schoolFile" placeholder="请输入初复试资料" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="初复试" prop="beginRepeat">
        <el-select v-model="form.beginRepeat" placeholder="初复试">
          <el-option label="初试" value="true"></el-option>
          <el-option label="复试" value="false"></el-option>
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
    name: "AddSchoolScore",
    inject: ['reload'],
    data() {
      return {
        form: {
          schoolId: '',
          schoolScore: '',
          schoolApply: '',
          schoolAdmit: '',
          schoolApplyAdmit: '',
          schoolFile: '',
          beginRepeat: '',
          schoolYear: ''
        },
        schoolRankList: {}
      }
    },
    props: {
      layerid: {
        type: String,
        default: ""
      }
    },
    computed: {
      schoolApplyAdmit(){
        let num = (parseFloat(this.form.schoolApply) / parseFloat(this.form.schoolAdmit))*100;
        let number = num.toFixed(2);
        this.form.schoolApplyAdmit = number;
        return number+"%";
      }
    },
    methods: {
      addManage(form) {
        if (!form.schoolId || !form.schoolScore
          || !form.schoolApply || !form.schoolAdmit
          || !form.schoolFile || !form.beginRepeat || !form.schoolYear) {
          this.$layer.msg("请添加对应信息！");
        } else {
          this.$axios.post("/schoolScore/addSchoolScore", this.form)
            .then((result) => {
              let data = result.data;
              if(data.data !== '院校该学年已存在'){
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
      this.$axios.get('/schoolScore/schoolYearList').then((result) => {
        let data = result.data;
        if (data.code != 200) {
          this.$message.error(data.message);
        }
        this.schoolRankList = data.data.schoolRankList;
      });
    }
  }
</script>

<style scoped>
  .el-index {
    /*margin: auto;*/
    margin: 70px;
    width: 400px;
    height: 500px;
    /*text-align: center;*/
  }
  .dialog-footer {
    text-align: center;
  }
</style>
