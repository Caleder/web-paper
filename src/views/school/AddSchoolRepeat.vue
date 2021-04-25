<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="院校名称" prop="schoolName">
        <el-input v-model="form.schoolName" placeholder="请输入院校名称" style="width:290px"/>
        <!--<el-select v-model="form.schoolId" placeholder="院校名称">
          <el-option v-for="item in schoolRankList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="学年" prop="schoolYear">
        <el-input v-model="form.schoolYear" placeholder="请输入学年" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="学院名称" prop="deptName">
        <el-input v-model="form.deptName" placeholder="请输入学院名称" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="专业名称" prop="majorName">
        <el-input v-model="form.majorName" placeholder="请输入专业名称" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="复试专业内容" prop="repeatContent">
         <textarea autocomplete="off" rows="3" v-model="form.repeatContent"
                   placeholder="复试专业内容" maxlength="500" class="el-textarea__inner"
                   style="min-height: 31px;"/>
      </el-form-item>
      <el-form-item label="复试专业参考书" prop="repeatBook">
         <textarea autocomplete="off" rows="3" v-model="form.repeatBook"
                   placeholder="复试专业参考书" maxlength="500" class="el-textarea__inner"
                   style="min-height: 31px;"/>
      </el-form-item>
      <el-form-item label="院校复试线" prop="score">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model.number="form.score" placeholder="请输入院校复试线" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="院校报名人数" prop="schoolApply">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model.number="form.schoolApply" placeholder="请输入院校报名人数" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="院校录取人数" prop="schoolAdmit">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model.number="form.schoolAdmit" placeholder="请输入院校录取人数" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="院校报录比(%)" prop="schoolApplyAdmit">
        <el-input readonly v-model="schoolApplyAdmit === 'NaN%' ? '0%' : schoolApplyAdmit" placeholder="请输入院校报录比(%)" style="width: 290px"/>
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
    name: "AddSchoolRepeat",
    inject: ['reload'],
    data() {
      return {
        form: {
          schoolName: '',
          score: '',
          schoolApply: '',
          schoolAdmit: '',
          schoolApplyAdmit: '',
          deptName: '',
          repeatContent: '',
          majorName: '',
          repeatBook: '',
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
        if (!form.schoolName || !form.score
          || !form.schoolApply || !form.schoolAdmit
          || !form.repeatContent || !form.repeatBook || !form.schoolYear) {
          this.$layer.msg("请添加对应信息！");
        } else {
          this.$axios.post("/schoolRepeat/addSchoolRepeat", this.form)
            .then((result) => {
              let data = result.data;
              if(data.data !== '院校该学年复试信息已存在'){
                //关闭父组件中的弹框
                this.$layer.close(this.layerid);
              }
              this.$layer.msg(data.data);
              location.reload();
            });
        }
      }
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
