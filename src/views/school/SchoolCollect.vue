<template>
  <div>
    <el-form :inline="true" ref="queryData" :model="queryData" class="demo-form-inline">
      <el-form-item label="院校名称">
        <el-input style="width: 150px;" v-model="queryData.schoolName" placeholder="请输入院校名称"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input style="width: 150px;" v-model="queryData.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="院校所在地">
        <el-input style="width: 150px;" v-model="queryData.cityName" placeholder="请输入院校所在地"></el-input>
      </el-form-item>
      <el-form-item label="院校排名">
        <el-input style="width: 150px;" v-model="queryData.schoolRank" placeholder="请输入院校排名"></el-input>
      </el-form-item>
      <el-form-item label="院校隶属">
        <el-input style="width: 150px;" v-model="queryData.affiliation" placeholder="请输入院校隶属"></el-input>
      </el-form-item>
      <el-form-item label="院校等级">
        <el-input style="width: 150px;" v-model="queryData.grade" placeholder="请输入院校等级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableInfo">查询</el-button>
        <el-button @click="resetForm('queryData')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table class="el-table"
                :data="tableData"
                border
                style="width: 100%;">
        <el-table-column
          prop="id" fixed
          label="ID" align="center"
          width="250">
        </el-table-column>
        <el-table-column
          prop="username" fixed
          label="用户名" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="schoolName" fixed
          label="院校名称" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="cityName" fixed
          label="院校所在地" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="affiliation"
          label="院校隶属" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="院校等级" align="center"
          width="150">
        </el-table-column>
        <!--<el-table-column
          prop="schoolContent"
          label="院校信息" align="center"
          width="200">
        </el-table-column>-->
        <el-table-column
          prop="schoolRank"
          label="院校排名" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="schoolTel"
          label="院校联系方式" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="schoolWebUrl"
          label="院校院网" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间" align="center"
          width="220" :formatter="dateFormatCreate">
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态" align="center"
          width="150">
          <template slot-scope="scope">
            <el-switch disabled
                       v-model="scope.row.enabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" align="center"
          width="130">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <el-button type="danger" icon="el-icon-delete" size="small" @click="editSchool(scope.row.id)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryData.current"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="queryData.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        tableData: [],
        queryData: {
          schoolName: '',
          schoolRank: '',
          schoolTel: '',
          enabled: '',
          current: 1,
          size: 5,
          schoolWebUrl: '',
          schoolContent: '',
          userId: '',
          userName: '',
          cityName: '',
          affiliation: '',
          grade: ''
        },
        total: 0
      }
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      resetForm: function (queryData) {
        this[queryData] = {};
        this.$refs[queryData].resetFields();
        this.queryData.current = 1;
        this.queryData.size = 5;
        this.getTableInfo();
      },
      editSchool: function (id) {
        var params = new URLSearchParams();
        params.append("id", id);
        const url = "/schoolCollect/updateSchoolCollect";
        this.$axios({
          method: 'post',
          url: url,
          data: params
        }).then((result) => {
          let data = result.data;
          if (data.code != 200) {
            this.$message.error(data.message);
          }
          this.reload();
        });
      },
      handleClick(row) {
        console.log(row);
      },
      getTableInfo() {
        let role = window.sessionStorage.getItem("userRole");
        console.log(role)
        if(role === 'ADMIN'){
          this.queryData.userId = '';
        } else {
          this.queryData.userId = window.sessionStorage.getItem("userId")
        }
        this.$axios.get('/schoolCollect/list', {params: this.queryData}).then((result) => {
          let data = result.data;
          console.log(data)
          if (data.code != 200) {
            this.$message.error(data.message);
          }
          this.tableData = data.data.page;
          this.total = data.data.pageTotal;
        });
      },
      dateFormatCreate: function (row, column) {
        const t = new Date(row.gmtCreate);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
      },
      handleSizeChange(newSize) {
        this.queryData.size = newSize;
        this.getTableInfo();
      },
      handleCurrentChange(newCurrent) {
        this.queryData.current = newCurrent;
        this.getTableInfo();
      }
    }
  }
</script>

<style scoped>
  .demo-form-inline {
    text-align: center;
  }
</style>
