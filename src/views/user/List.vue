<template>
  <div>
    <el-form :inline="true" ref="queryData" :model="queryData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="queryData.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="queryData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryData.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="座右铭">
        <el-input v-model="queryData.motto" placeholder="请输入座右铭"></el-input>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-select v-model="queryData.enabled" placeholder="状态">
          <el-option label="启用" value="true"></el-option>
          <el-option label="停用" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableInfo">查询</el-button>
        <el-button @click="resetForm('queryData')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="el-icon-plus" style="margin-left: 1500px;margin-bottom: 15px;" @click="addUser()">新增用户</el-button>
    <el-card>
      <el-table class="el-table"
                :data="tableData"
                border
                style="width: 93%;">
        <el-table-column
          prop="id" fixed
          label="ID" align="center"
          width="250">
        </el-table-column>
        <el-table-column
          prop="name" fixed
          label="姓名" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="username" fixed
          label="用户名" align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号" align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="motto"
          label="座右铭" align="center"
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
          width="180">
          <template slot-scope="scope">
            <el-switch @change="makeEnabled(scope.row)"
              v-model="scope.row.enabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" align="center"
          width="120">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" v-if="scope.row.enabled === true" size="small" @click="editUser(scope.row.username)">编辑</el-button>
            <el-button disabled type="warning" v-if="scope.row.enabled === false" size="small">激活状态</el-button>
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
  import EditUser from '@/views/user/EditUser';
  import AddUser from '@/views/user/AddUser';
  export default {
    inject: ['reload'],
    data() {
      return {
        tableData: [],
        queryData: {
          name: '',
          username: '',
          enabled: '',
          current: 1,
          size: 5,
          mobile: ''
        },
        total: 0
      }
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      makeEnabled(userInfo) {
        this.$axios.post("/user/updateUser", userInfo)
          .then((result) => {
            let data = result.data;
            if (data.code != 200) {
              this.$message.error(data.message);
            }
            /*this.reload();*/
          });
      },
      resetForm: function (queryData) {
        this[queryData] = {};
        this.$refs[queryData].resetFields();
        this.queryData.current = 1;
        this.queryData.size = 2;
        this.getTableInfo();
      },
    addUser: function () {
      this.$layer.iframe({
        type:1,
        title:"新增用户",
        area:['600px','610px'],
        shade:true,
        offset:'auto',
        content:{
          content:AddUser
        }
      })
    },
    editUser: function (username) {
      this.$layer.iframe({
        type:2,
        title:"编辑",
        area:['600px','500px'],
        shade:true,
        offset:'auto',
        content:{
          content:EditUser,//传递的编辑组件主线
          parent:this,
          data:{
            info:{username:username}// 传递的要编辑内容的id值
          }
        }
      })
    },
      handleClick(row) {
        console.log(row);
      },
      getTableInfo() {
        this.$axios.get('/user/list', {params: this.queryData}).then((result) => {
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
