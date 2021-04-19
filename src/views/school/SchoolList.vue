<template>
  <div>
    <el-form :inline="true" ref="queryData" :model="queryData" class="demo-form-inline">
      <el-form-item label="院校名称">
        <el-input v-model="queryData.schoolName" placeholder="请输入院校名称"></el-input>
      </el-form-item>
      <el-form-item label="院校所在地">
        <el-input v-model="queryData.cityName" placeholder="请输入院校所在地"></el-input>
      </el-form-item>
      <el-form-item label="院校排名">
        <el-input v-model="queryData.schoolRank" placeholder="请输入院校排名"></el-input>
      </el-form-item>
      <el-form-item label="院校联系方式">
        <el-input v-model="queryData.schoolTel" placeholder="请输入院校联系方式"></el-input>
      </el-form-item>
      <el-form-item label="院校院网">
        <el-input v-model="queryData.schoolWebUrl" placeholder="请输入院校院网"></el-input>
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
    <el-button type="primary" icon="el-icon-plus" style="margin-left: 1500px;margin-bottom: 15px;" @click="addSchool()">新增院校</el-button>
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
        <el-table-column
          prop="schoolContent"
          label="院校信息" align="center"
          width="200">
        </el-table-column>
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
            <el-switch v-model="scope.row.enabled" @change="makeEnabled(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="collected"
          label="是否收藏" align="center"
          width="150">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.collected === false" @change="makeCollected(scope.row.id)"
                       v-model="scope.row.collected">
            </el-switch>
            <el-switch disabled v-else-if="scope.row.collected === true" @change="makeCollected(scope.row.id)"
                       v-model="scope.row.collected">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" icon="el-icon-message" type="info" size="small">查看</el-button>
            <el-button type="success" size="small" icon="el-icon-edit" @click="editSchool(scope.row.id)">编辑</el-button>
            <!--<el-button type="text" size="small" v-if="scope.row.collected == false" @click="collectSchool(scope.row.id)">收藏</el-button>-->
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
  import EditSchoolRank from '@/views/school/EditSchoolRank';
  import AddSchool from '@/views/school/AddSchool';
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
          cityName: ''
        },
        total: 0
      }
    },
    mounted() {
      this.getTableInfo();
    },
    methods: {
      makeEnabled(schoolInfo) {
        this.$axios.post("/schoolRank/updateSchoolRank", schoolInfo)
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
      addSchool: function () {
        this.$layer.iframe({
          type:1,
          title:"新增院校",
          area:['600px','700px'],
          shade:true,
          offset:'auto',
          content:{
            content:AddSchool
          }
        })
      },
      editSchool: function (id) {
        this.$layer.iframe({
          type:2,
          title:"编辑",
          area:['600px','750px'],
          shade:true,
          offset:'auto',
          content:{
            content:EditSchoolRank,//传递的编辑组件主线
            parent:this,
            data:{
              info:{id:id}// 传递的要编辑内容的id值
            }
          }
        })
      },
      makeCollected: function (id) {
        var params = new URLSearchParams();
        params.append("schoolId", id);
        const url = "/schoolCollect/addSchoolCollect";
        this.$axios({
          method: 'post',
          url: url,
          data: params
        }).then((result) => {
          let data = result.data;
          if (data.code != 200) {
            this.$message.error(data.message);
          }
          /*this.reload();*/
        });
      },
      collectSchool: function (id) {
        var params = new URLSearchParams();
        params.append("schoolId", id);
        const url = "/schoolCollect/addSchoolCollect";
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
        this.$axios.get('/schoolRank/list', {params: this.queryData}).then((result) => {
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
