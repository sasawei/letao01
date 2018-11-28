$(function(){
  var chart_left = echarts.init(document.querySelector('.chart_left'));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2018年注册人数'
            },
            tooltip: {},
            legend: {
                data:['销量','人数']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
            {
              name: '人数',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        chart_left.setOption(option1);




        var chart_right = echarts.init(document.querySelector('.chart_right'));
       var option2 = {
          title : {
              text: '热门品牌销售',
              subtext: '2018年11月28日',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['耐克','阿迪','美邦','回力','老北京']
          },
          series : [
              {
                  name: '热门品牌',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'耐克'},
                      {value:310, name:'阿迪'},
                      {value:234, name:'美邦'},
                      {value:135, name:'回力'},
                      {value:1548, name:'老北京'}
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
          chart_right.setOption(option2);
})