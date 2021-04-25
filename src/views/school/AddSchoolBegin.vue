<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="院校名称" prop="schoolId">
        <el-input v-model="form.schoolName" placeholder="请输入院校名称" style="width: 290px"/>
        <!--<el-select v-model="form.schoolId" placeholder="院校名称">
          <el-option v-for="item in schoolRankList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="学年" prop="schoolYear">
        <el-input v-model="form.schoolYear" placeholder="请输入学年" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="学院名称" prop="deptName">
        <el-input v-model.number="form.deptName" placeholder="请输入学院名称" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="专业名称" prop="majorName">
        <el-input v-model.number="form.majorName" placeholder="请输入专业名称" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="计划名额" prop="planNum">
        <el-input v-model.number="form.planNum" placeholder="请输入计划名额" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="初试专业内容" prop="beginContent">
        <textarea autocomplete="off" rows="3" v-model="form.beginContent"
                  placeholder="初试专业内容" maxlength="500" class="el-textarea__inner"
                  style="min-height: 31px;"/>
      </el-form-item>
      <el-form-item label="初试专业参考书" prop="beginBook">
        <textarea autocomplete="off" rows="3" v-model="form.beginBook"
                  placeholder="初试专业参考书" maxlength="500" class="el-textarea__inner"
                  style="min-height: 31px;"/>
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
    name: "AddSchoolBegin",
    inject: ['reload'],
    data() {
      return {
        form: {
          schoolName: '',
          deptName: '',
          majorName: '',
          planNum: '',
          beginContent: '',
          beginBook: '',
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
    methods: {
      addManage(form) {
        if (!form.schoolName || !form.deptName
          || !form.majorName || !form.planNum
          || !form.beginContent || !form.beginBook || !form.schoolYear) {
          this.$layer.msg("请添加对应信息！");
        } else {
          this.$axios.post("/schoolBegin/addSchoolBegin", this.form)
            .then((result) => {
              let data = result.data;
              if(data.data !== '院校该学年初试信息已存在'){
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
