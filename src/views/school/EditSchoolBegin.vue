<template>
  <!--表单组件-->
  <div class="el-index">
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="院校初试ID" prop="id">
        <el-input disabled v-model="form.id" placeholder="请输入院校初试ID" style="width: 290px"/>
      </el-form-item>
      <el-form-item label="院校名称" prop="schoolName">
        <el-input v-model="form.schoolName" placeholder="请输入院校名称" style="width: 290px"/>
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
    name: "EditSchoolBegin",
    inject: ['reload'],
    /*data() {
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
    },*/
    data() {
      return {
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
        this.$axios.get('/schoolBegin/getSchoolBegin/' + id).then((result) => {
          this.form = result.data.data;
        });
      },
      addManage(form) {
        if (!form.schoolName || !form.deptName
          || !form.majorName || !form.planNum
          || !form.beginContent || !form.beginBook || !form.schoolYear) {
          this.$layer.msg("请添加对应信息！");
        } else {
          this.$axios.post("/schoolBegin/updateSchoolBegin", this.form)
            .then((result) => {
              //关闭父组件中的编辑弹框
              this.$layer.close(this.layerid);
              //弹出提示信息，默认时间为3秒
              this.$layer.msg("修改院校初试信息成功！");
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
