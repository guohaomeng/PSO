//图表一的绘制程序及参数设置程序
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  baseOption: {
    timeline: {
      show: true,
      loop: false,
      autoPlay: false,
      playInterval: 1000,
      data:[],
      axisType: "value",
    },
    animation: true,
    tooltip: {},
    backgroundColor: '#fff',
    visualMap: {
      show: false,
      dimension: 2,
      min: -3.5,
      max: 3.5,
      inRange: {
         color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        //color: ['#50a3ba', '#eac736', '#fff','#000']
      },
      seriesIndex : 0
    },
    xAxis3D: {
      type: 'value',

    },
    yAxis3D: {
      type: 'value',

    },
    zAxis3D: {
      type: 'value',

    },
    grid3D: {
      viewControl: {
        projection: 'orthographic',
        // autoRotate: true,
        animation: true,


      }
    },
    series: [{
      type: 'surface',
      wireframe: {
        // show: false
      },
      equation: {
        x: {
          step: 0.05,
          min: -3.5,
          max: 3.5
        },
        y: {
          step: 0.05,
          min: -3.5,
          max: 3.5
        },
        z: function (x, y) {

          // return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
          //return (-x*y*20)/Math.exp(x*x+y*y);
          //返回peaks函数
          return 3 * (1 - x * x) * Math.exp(-x * x - (1 + y) * (1 + y)) - 10 * (0.2 * x - x * x * x - y * y * y * y * y) * Math.exp(-x * x - y * y) - (1 / 3) * Math.exp(-(x + 1) * (x + 1) - y * y);
        }
      }
    },
    {
      type: 'scatter3D',
      data: dataE,
      animation: true,
      itemStyle: {
        // color: "#409EFF"
        color: '#ffffff'//更改散点图颜色
      }
    }
    ]
  },
  options:[

  ]
}
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option, true);
//更新图表程序
function echartRefresh() {

  dataE = [];
  //更新dataE
  for (var i = 0; i < sizepop; i++) {
    if (countGen == maxgen - 1) {
      countGen = 0;
    }
    let x = popxHistory[countGen][i];
    let y = popyHistory[countGen][i];
    let z = fitnessHistory[countGen][i];
    dataE.push([x, y, z]);
  }
  var option1 = myChart.getOption();
  //console.log("dataE:%o", dataE);
  option1.series[1].data = dataE;
  myChart.setOption(option1, true);
  countGen++;
}

function getEdata() {
  if (countGen == 0) {
    return dataE;
  }
  else {
    echartRefresh();
    return dataE;
  }
}
//初始化图表一的时间轴
function timelineInit()
{
  option.options = [];
  option.baseOption.timeline.data = [];
  for(var i =0;i<maxgen;i++){
    option.baseOption.timeline.data.push(i);
    var dataM=[];
    for(var j=0;j<sizepop;j++)
    {
      let x = popxHistory[i][j];
      let y = popyHistory[i][j];
      let z = fitnessHistory[i][j];
      dataM.push([x, y, z]);
    }
    var somearr =  {
      series: [{
        type: 'surface',
        wireframe: {
          // show: false
        },
        equation: {
          x: {
            step: 0.05,
            min: -3.5,
            max: 3.5
          },
          y: {
            step: 0.05,
            min: -3.5,
            max: 3.5
          },
          z: function (x, y) {
  
            // return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
            //return (-x*y*20)/Math.exp(x*x+y*y);
            //返回peaks函数
            return 3 * (1 - x * x) * Math.exp(-x * x - (1 + y) * (1 + y)) - 10 * (0.2 * x - x * x * x - y * y * y * y * y) * Math.exp(-x * x - y * y) - (1 / 3) * Math.exp(-(x + 1) * (x + 1) - y * y);
          }
        }
      },
      {
          type: 'scatter3D',
          data: []
      }]
  };
    
    option.options.push(somearr);
    // option.options[i].series[0] = option.baseOption.series[0];
    // option.options[i].series[1] = option.baseOption.series[1];
    option.options[i].series[1].data = dataM;
  }
  myChart.setOption(option,true);
  console.log("optios:%o",option);
}
timelineInit();

function PSO_all()
{
  PSO_main();
  timelineInit();
  generateData2();
  myChart2.setOption(option2,true);
}
//用户参数设置程序
function setValue(){
  var mpopsize = $("input#popsize").val();
  var mmaxgen = $("input#maxgen").val();
  var mc1 = $("input#c1").val();
  var mc2 = $("input#c2").val();
  var mpopxy = $("input#popxy").val();
  var mpopv = $("input#popv").val();
  var mw1 = $("input#w1").val();
  if( (mpopsize !="")&& (mmaxgen !="") && (mc1 !="") && (mc2 !="") && (mpopxy !="") && (mpopv !=""))
  {
    sizepop = parseFloat(mpopsize);
    maxgen = parseFloat(mmaxgen);
    w1 = parseFloat(mw1);
    c1 = parseFloat(mc1);
    c2 = parseFloat(mc2);
    popmax = parseFloat(mpopxy);
    popmin = - parseFloat(popmax);
    Vmax = parseFloat(mpopv);
    Vmin = - parseFloat(Vmax);
    console.log(sizepop + " " + maxgen +" "+ c1 + " "+ c2 +" "+ popmax +" "+popmin + " "+Vmax + " "+Vmin) ;
    $(".result").html("参数设置成功"+" w1:"+w1);
  }
  else{
    $(".result").html("参数设置不完整！");
  }
}