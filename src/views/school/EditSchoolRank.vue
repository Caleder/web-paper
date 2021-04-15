<template>
  <div class="el-index">
    <el-form ref="manage" :model="manage" label-width="80px">
      <el-form-item label="院校ID">
        <el-input placeholder="院校ID" v-model="manage.id"/>
      </el-form-item>
      <el-form-item label="院校名称">
        <el-input placeholder="学院名称" v-model="manage.schoolName"/>
      </el-form-item>
      <el-form-item label="学院信息">
        <el-input placeholder="学院信息" v-model="manage.schoolContent"/>
      </el-form-item>
      <el-form-item label="学院排名">
        <el-input placeholder="学院排名" v-model="manage.schoolRank"/>
      </el-form-item>
      <el-form-item label="学院电话">
        <el-input placeholder="学院电话" v-model="manage.schoolTel"/>
      </el-form-item>
      <el-form-item label="学院院网">
        <el-input placeholder="学院院网" v-model="manage.schoolWebUrl"/>
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
          || !manage.schoolContent || !manage.schoolTel
          || !manage.schoolWebUrl) {
          this.$layer.msg("请添加对应信息！")
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
    margin: auto;
    width: 500px;
  }
</style>
