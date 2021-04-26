<template>
  <div>
    <el-form :inline="true" ref="queryData" :model="queryData" class="demo-form-inline">
      <el-form-item label="院校名称">
        <el-input v-model="queryData.schoolName" placeholder="请输入院校名称"></el-input>
      </el-form-item>
      <el-form-item label="学年">
        <el-input v-model="queryData.schoolYear" placeholder="请输入学年"></el-input>
        <!--<el-select v-model="queryData.schoolYear" placeholder="学年">
          <el-option v-for="item in schoolYearList" :key="item" :label="item" :value="item"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="学院名称">
        <el-input v-model="queryData.deptName" placeholder="请输入学院名称"></el-input>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-input v-model="queryData.majorName" placeholder="请输入专业名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableInfo">查询</el-button>
        <el-button @click="resetForm('queryData')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button v-if="role === 'ADMIN'" type="primary" icon="el-icon-plus" style="margin-left: 1450px;margin-bottom: 15px;" @click="addSchoolBegin()">新增院校初试</el-button>
    <el-card>
      <el-table class="el-table"
                :data="tableData"
                border
                style="width: 100%;">
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
          prop="schoolYear" fixed
          label="学年" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="学院名称" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="majorName"
          label="专业名称" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="planNum"
          label="计划名额" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="beginContent"
          label="初试专业内容" align="center"
          width="200">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div style="width: 150px;" slot="content">{{scope.row.beginContent}}</div>
              <el-button style="width: 200px;border: #EAEDF1 0 solid">{{scope.row.beginContent}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="beginBook"
          label="初试专业参考书" align="center"
          width="200">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div style="width: 150px;" slot="content">{{scope.row.beginBook}}</div>
              <el-button style="width: 200px;border: #EAEDF1 0 solid">{{scope.row.beginBook}}</el-button>
            </el-tooltip>
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
          width="150">
          <template slot-scope="scope">
            <el-switch v-if="role === 'ADMIN'" @change="makeEnabled(scope.row)"
                       v-model="scope.row.enabled">
            </el-switch>
            <el-switch disabled v-else-if="role === 'OTHER'"
                       v-model="scope.row.enabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right" v-if="role === 'ADMIN'"
          label="操作" align="center"
          width="120">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <el-button type="success" size="small" icon="el-icon-edit" @click="editSchoolBegin(scope.row.id)">编辑</el-button>
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
  import AddSchoolBegin from '@/views/school/AddSchoolBegin';
  import EditSchoolBegin from '@/views/school/EditSchoolBegin';
  export default {
    data() {
      return {
        tableData: [],
        queryData: {
          schoolName: '',
          deptName: '',
          majorName: '',
          current: 1,
          size: 5,
          schoolYear: ''
        },
        total: 0,
        /*schoolYearList: [],*/
        role: window.sessionStorage.getItem("userRole")
      }
    },
    created() {
      /*this.$axios.get('/schoolScore/schoolYearList').then((result) => {
        let data = result.data;
        if (data.code != 200) {
          this.$message.error(data.message);
        }
        this.schoolYearList = data.data.getSchoolYear;
      });*/
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      makeEnabled(schoolInfo) {
        this.$axios.post("/schoolBegin/updateSchoolBegin", schoolInfo)
          .then((result) => {
            let data = result.data;
            if (data.code != 200) {
              this.$message.error(data.message);
            }
            /*this.reload();*/
          });
      },
      addSchoolBegin: function () {
        this.$layer.iframe({
          type:1,
          title:"新增院校初试",
          area:['600px','700px'],
          shade:true,
          offset:'auto',
          content:{
            content:AddSchoolBegin
          }
        })
      },
      editSchoolBegin: function (id) {
        this.$layer.iframe({
          type:2,
          title:"编辑院校初试",
          area:['600px','750px'],
          shade:true,
          offset:'auto',
          content:{
            content:EditSchoolBegin,//传递的编辑组件主线
            parent:this,
            data:{
              info:{id:id}// 传递的要编辑内容的id值
            }
          }
        })
      },
      resetForm: function (queryData) {
        this[queryData] = {};
        this.$refs[queryData].resetFields();
        this.queryData.current = 1;
        this.queryData.size = 5;
        this.getTableInfo();
      },
      handleClick(row) {
        console.log(row);
      },
      getTableInfo() {
        this.$axios.get('/schoolBegin/list', {params: this.queryData}).then((result) => {
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
