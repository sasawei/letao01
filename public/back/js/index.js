$(function () {
  // <!-- 为ECharts准备一个具备大小（宽高）的Dom -->

  // 基于准备好的dom，初始化echarts实例
  var cont_left = echarts.init(document.querySelector('.content_left'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2018年上半年注册人数',
     
    },

    tooltip: {},
    legend: {
      data: ['男生', '女生'],
      
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
        name: '男生',
        type: 'bar',
        data: [50, 220, 36, 100, 10, 50]
      },
      {
        label:{color:'pink'},
        name: '女生',
        type: 'bar',
        data: [50, 220, 36, 100, 10, 50]
      }
    ]
          
        
  };

  // 使用刚指定的配置项和数据显示图表。
  cont_left.setOption(option1);

  var cont_right = echarts.init(document.querySelector('.content_right'));
  var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年11月27日',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['老北京','匡威','耐克','回力','阿迪']
    },
    series : [
        {
            name: '热门品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'老北京'},
                {value:310, name:'匡威'},
                {value:234, name:'耐克'},
                {value:135, name:'回力'},
                {value:1548, name:'阿迪'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


  // 使用刚指定的配置项和数据显示图表。
  cont_right.setOption(option2);

})