<template>
  <div>
    <el-form :inline="true" ref="queryData" :model="queryData" class="demo-form-inline">
      <el-form-item label="院校名称">
        <el-input v-model="queryData.schoolName" placeholder="请输入院校名称"></el-input>
      </el-form-item>
      <el-form-item label="院校报录比">
        <el-input v-model="queryData.schoolApplyAdmit" placeholder="请输入院校报录比"></el-input>
      </el-form-item>
      <el-form-item label="院校复试线">
        <el-input v-model="queryData.schoolScore" placeholder="请输入院校复试线"></el-input>
      </el-form-item>
      <el-form-item label="院校初复试">
        <el-select v-model="queryData.beginRepeat" placeholder="初复试">
          <el-option label="初试" value="true"></el-option>
          <el-option label="复试" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="初复试资料">
        <el-input v-model="queryData.schoolFile" placeholder="请输入初复试资料"></el-input>
      </el-form-item>
      <!--<el-form-item label="账号状态">
        <el-select v-model="queryData.enabled" placeholder="状态">
          <el-option label="启用" value="true"></el-option>
          <el-option label="停用" value="false"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="getTableInfo">查询</el-button>
        <el-button @click="resetForm('queryData')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table class="el-table"
                :data="tableData"
                border
                style="width: 97.5%;">
        <el-table-column
          prop="id" fixed
          label="ID" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="schoolName" fixed
          label="院校名称" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="schoolScore"
          label="院校复试线" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="schoolApply"
          label="院校报名人数" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="schoolAdmit"
          label="院校录取人数" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="schoolApplyAdmit"
          label="院校报录比(%)" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="schoolFile"
          label="初复试资料" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="beginRepeat"
          label="初复试" align="center"
          width="180">
          <template slot-scope="scope">
            <el-switch disabled
                       v-model="scope.row.beginRepeat">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间" align="center"
          width="220" :formatter="dateFormatCreate">
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态" align="center"
          width="180">
          <template slot-scope="scope">
            <el-switch disabled
                       v-model="scope.row.enabled">
            </el-switch>
          </template>
        </el-table-column>
        <!--<el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryData.current"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryData.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        queryData: {
          schoolName: '',
          schoolApplyAdmit: '',
          schoolScore: '',
          schoolFile: '',
          /*enabled: '',*/
          current: 1,
          size: 2,
          beginRepeat: ''
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
        this.queryData.size = 2;
        this.getTableInfo();
      },
      handleClick(row) {
        console.log(row);
      },
      getTableInfo() {
        this.$axios.get('/schoolScore/list', {params: this.queryData}).then((result) => {
          let data = result.data;
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
