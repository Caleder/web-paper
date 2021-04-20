<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'Index',
    data() {
      return {
        xdata: [],
        ydata: [],
        userId: ''
      }
    },
    mounted: function() {
      let role = window.sessionStorage.getItem("userRole");
      if(role === 'ADMIN'){
        this.userId = '';
      } else {
        this.userId = window.sessionStorage.getItem("userId")
      }
      var params = new URLSearchParams();
      params.append("userId", this.userId);
      this.$axios.get("/schoolCollect/getSchoolCollectList",{params: params})
        .then((result) => {
          let data = result.data;
          if (data.code != 200) {
            this.$message.error(data.message);
          }
          let res = data.data;
          this.xdata = res.keys;
          this.ydata = res.values;
          var myChart = echarts.init(document.getElementById("main"));
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: '收藏院校走势图'
            },
            tooltip: {},
            legend: {
              data:['收藏量']
            },
            xAxis: {
              data: this.xdata
            },
            yAxis: {
              min:0,
              minInterval:1,
            },
            series: [{
              name: '收藏量',
              type: 'line',
              data: this.ydata
            }]
          };
          myChart.setOption(option);
        });
    }
  }
</script>

<style scoped>

</style>
