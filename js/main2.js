//图表二的绘制程序
// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('main2'));

var data3 = [];
var data4 = [];
var data5 = [];
var count1 = 0;


function generateData() {
    let data = [];
    for (let i = 0; i < result.length ; i ++) {
        data.push([i,result[i]]);
    }
    return data;
}


// 指定图表二的配置项和数据
var option2 = {
    title: {
        text: 'PSO算法收敛效果图',
        subtext: ' '
    },
    legend: {
        data: ['迭代20次', '迭代80次', '迭代300次', '迭代1000次']
    },
    animation: true,
    grid: {
        top: 40,
        left: 50,
        right: 40,
        bottom: 50,
        containLabel: true
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        name: '迭代次数',
        nameLocation : "center",
        nameTextStyle:{
            //fontSize: "16px",
            //lineHeight:"6px",
            padding: [10,0,0,0]
        },
        //triggerEvent : true,
        // type: "category",
        type: "value",
        //data:generateData(),
        minorTick: {
            show: true
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisLabel:{
            show:true,
        },
        axisPointer : {
            show:true,
            snap : true,
            label:{
                show:true,
            }
        },
        axisLine:{
            show:true,
            onZero:true,
        }
    },
    yAxis: {
        name: '适应度值Pgbest',
        nameLocation : "center",
        nameTextStyle:{
            //fontSize: "16px",
            //lineHeight:"6px",
        },
        min: 0,
        max: 10,
        minorTick: {
            show: true
        },
        splitLine: {
            lineStyle: {
                color: '#999'
            }
        },
        minorSplitLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisPointer : {
            show:true,
            snap : true,
            label:{
                show:true,
            }
        },
        axisLabel:{
            show:true,
        }
    },
    tooltip:{
        show:true,
        trigger:"axis",
        formatter: '迭代次数,适应度值：<br />{c0}',
        axisPointer : {
            show:true,
            snap : true,
            label:{
                show:true,
            }
        }
    },
    dataZoom: [{
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: 0,
        endValue: 20
    }, {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: 0,
        endValue: 20
    }],
    series: [
        {
            type: 'line',
            stack:"1",
            showSymbol: true,
            clip: true,
            //itemStyle : { normal: {label : {show: true}}},
            data:data2
        },
        {
            type: 'line',
            stack:"2",
            showSymbol: true,
            clip: true,
            //itemStyle : { normal: {label : {show: true}}},
            data:data3
        },
        {
            type: 'line',
            stack:"3",
            showSymbol: true,
            clip: true,
            //itemStyle : { normal: {label : {show: true}}},
            data:data4
        },
        {
            type: 'line',
            stack:"4",
            showSymbol: true,
            clip: true,
            //itemStyle : { normal: {label : {show: true}}},
            data:data5
        }
    ]
};

function generateData2() {
    if(count1==4){
        count1 =0;
    }
    if(count1 == 0){
        data2 = [];
    
        for (let i = 0; i < result.length ; i ++) {
            data2.push([i,result[i]]);
        }
        option2.series[0].data = data2;
    }
    else if(count1==1){
        data3 = [];
    
        for (let i = 0; i < result.length ; i ++) {
            data3.push([i,result[i]]);
        }
        option2.series[1].data = data3;
    }
    else if(count1==2){
        data4 = [];
    
        for (let i = 0; i < result.length ; i ++) {
            data4.push([i,result[i]]);
        }
        option2.series[2].data = data4;
    }
    else if(count1==3){
        data5 = [];
    
        for (let i = 0; i < result.length ; i ++) {
            data5.push([i,result[i]]);
        }
        option2.series[3].data = data5;
    }
    count1++;
    //return data2;
}
generateData2();

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);

