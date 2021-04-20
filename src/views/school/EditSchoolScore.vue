<template>
  <div class="el-index">
    <el-form ref="manage" :model="manage" label-width="110px">
      <el-form-item label="院校ID" prop="schoolId">
        <el-input disabled v-model="manage.schoolId" placeholder="请输入院校id" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校名称" prop="schoolName">
        <el-input disabled v-model="manage.schoolName" placeholder="请输入院校名称" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="学年" prop="schoolYear">
        <el-input v-model="manage.schoolYear" placeholder="请输入学年" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校复试线" prop="schoolScore">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="manage.schoolScore" placeholder="请输入院校复试线" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校报名人数" prop="schoolApply">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="manage.schoolApply" placeholder="请输入院校报名人数" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校录取人数" prop="schoolAdmit">
        <el-input maxlength="7" onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="manage.schoolAdmit" placeholder="请输入院校录取人数" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="院校报录比(%)" prop="schoolApplyAdmit">
        <el-input v-model="schoolApplyAdmit" readonly placeholder="请输入院校报录比(%)" style="width: 370px"/>
      </el-form-item>
      <el-form-item label="初复试资料" prop="schoolFile">
        <el-input v-model="manage.schoolFile" placeholder="请输入初复试资料" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="初复试" prop="beginRepeat">
        <el-select v-model="manage.beginRepeat" placeholder="初复试">
          <el-option label="初试" value="true"></el-option>
          <el-option label="复试" value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!--<el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <el-button type="primary" @click="editManage(manage)">立即提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditSchoolScore',
    inject: ['reload'],
    data() {
      return {
        manage: {}
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
    computed: {
      schoolApplyAdmit(){
        let num = (parseFloat(this.manage.schoolApply) / parseFloat(this.manage.schoolAdmit))*100;
        let number = num.toFixed(2);
        this.manage.schoolApplyAdmit = number;
        return number+"%";
      }
    },
    methods: {
      //用来显示对应id的编辑内容，在created中调用
      fetchManage(id) {
        this.$axios.get('/schoolScore/getSchoolScore/' + id).then((result) => {
          this.manage = result.data.data;
          if(result.data.data.beginRepeat === true){
            this.manage.beginRepeat = '初试';
          } else {
            this.manage.beginRepeat = '复试';
          }
        });
      },
      editManage(manage) {
        if (!manage.schoolId || !manage.schoolScore
          || !manage.schoolApply || !manage.schoolAdmit || !manage.schoolApplyAdmit
          || !manage.schoolFile || !manage.beginRepeat || !manage.schoolYear) {
          this.$layer.msg("请添加对应信息！");
        } else {
          if(manage.beginRepeat === '初试'){
            this.manage.beginRepeat = true;
          } else {
            this.manage.beginRepeat = false;
          }
          this.$axios.post("/schoolScore/updateSchoolScore", this.manage)
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
    /*text-align: center;*/
  }
  .dialog-footer {
    text-align: center;
  }
</style>
