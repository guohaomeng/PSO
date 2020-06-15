//pso算法程序
var c1 = 2;//加速度因子一般是根据大量实验所得
var c2 = 2;
var maxgen = 100;   // 迭代次数
var sizepop = 100;  // 种群规模
var popmax = 3.5; // 个体位置最大取值
var popmin = -3.5; // 个体位置最小取值
var Vmax = 0.2;   // 速度最大值
var Vmin = -0.2;  //速度最小值
var dataE = [];
var data2 = [];
var countGen = 0;
var w1 = 1.0;

var popx = new Array();       // 定义种群横坐标位置数组
var popy = new Array();       // 定义种群y坐标位置数组
var Vx = new Array();         // 定义种群x速度数组
var Vy = new Array();         // 定义种群y速度数组
var fitness = new Array();    // 定义种群的适应度数组
var result = new Array();     //定义存放每次迭代种群最优值的数组
var pbestx = new Array();     // 个体极值的位置
var pbesty = new Array();
var gbest = new Array();      //群体极值的位置
var fitnesspbest = new Array();//个体极值适应度的值
var fitnessgbest = new Array();// 群体极值适应度值
var genbestx = new Array();    //每一代最优值取值粒子位置
var genbesty = new Array();
var popxHistory = new Array();//每个粒子历史位置
var popyHistory = new Array();
var fitnessHistory = new Array();//每个粒子历史最优值

function initArray(){//初始化二维数组
  for(var i = 0;i<maxgen;i++)
  {
    popxHistory[i] = new Array();
    popyHistory[i] = new Array();
    fitnessHistory[i] = new Array();
  }
}
//适应度函数
function func(x,y) {
  var fitness = 3*(1-x*x)*Math.exp(-x*x-(1+y)*(1+y)) - 10*(0.2*x - x*x*x - y*y*y*y*y) * Math.exp(-x*x-y*y) - (1/3)*Math.exp(-(x+1)*(x+1) - y*y) //peaks函数
  return fitness;
}
//函数random(x,y)产生x-y内的随机小数
function random(x,y){
  return Math.random()*(y-x) + x ;
}

function pop_init(){
  for (var i = 0; i < sizepop; i++)
  {
    popx[i] = random(popmin, popmax);
    popy[i] = random(popmin, popmax);
    Vx[i] = random(Vmin, Vmax);
    Vy[i] = random(Vmin, Vmax);          //初始化位置与速度
    fitness[i] = func(popx[i], popy[i]); //计算适应度函数值
  }
  //初始化gbest与fitnessgbest
  var index = 0;
  var max = 0;
  for(var i=0;i<sizepop;i++)
  {
    if(fitness[i]>max)
    {
      max = fitness[i];
      index = i;
    }
  }
  // 群体极值位置
  gbest[0] = popx[index];
  gbest[1] = popy[index];
  //群体极值适应度值
  fitnessgbest = max;
  //更新dataE
  for (var i = 0; i < sizepop; i++) {

    let x = popx[i];
    let y = popy[i];
    let z = fitness[i];
    dataE.push([x, y, z]);
  }
  

}

function PSO_func(){
  pop_init();
  // 个体极值位置
  
  for (var i = 0; i < sizepop; i++)
  {
    pbestx[i] = popx[i];
    pbesty[i] = popy[i];
  }
  // 个体极值适应度值
  for (var i = 0; i < sizepop; i++)
  {
    fitnesspbest[i] = fitness[i];
  }

  //迭代寻优
  for (var i = 0; i < maxgen; i++)
  {
    for (var j = 0; j < sizepop; j++)
    {
      //速度更新及粒子更新
      var rand1 = random(0, 1);
      var rand2 = random(0, 1);
      // 速度更新
      
      Vx[j] = w1 * Vx[j] + c1 * rand1 * (pbestx[j] - popx[j]) + c2 * rand2 * (gbest[0] - popx[j]);
      if (Vx[j] > Vmax)
        Vx[j] = Vmax;
      if (Vx[j] < Vmin)
        Vx[j] = Vmin;
      Vy[j] = w1 * Vy[j] + c1 * rand1 * (pbesty[j] - popy[j]) + c2 * rand2 * (gbest[1] - popy[j]);
      if (Vy[j] > Vmax)
        Vy[j] = Vmax;
      if (Vy[j] < Vmin)
        Vy[j] = Vmin;
      // 粒子更新
      popx[j] = popx[j] + Vx[j];
      if (popx[j] > popmax)
        popx[j] = popmax;
      if (popy[j] < popmin)
        popy[j] = popmin;
      popy[j] = popy[j] + Vy[j];
      if (popx[j] > popmax)
        popx[j] = popmax;
      if (popy[j] < popmin)
        popy[j] = popmin;

      fitness[j] = func(popx[j], popy[j]); //新粒子的适应度值

      //记录粒子历史位置及适应度
      popxHistory[i][j] = popx[j];
      popyHistory[i][j] = popy[j];
      fitnessHistory[i][j] = fitness[j];
    }
    for (var j = 0; j < sizepop; j++)
    {
      // 个体极值更新
      if (fitness[j] > fitnesspbest[j])
      {
        pbestx[j] = popx[j];
        pbesty[j] = popy[j];

        fitnesspbest[j] = fitness[j];
      }
      // 群体极值更新
      if (fitness[j] > fitnessgbest)
      {
        gbest[0] = popx[j];
        gbest[1] = popy[j];

        fitnessgbest = fitness[j];
      }
    }

    // 每一代最优值取值粒子位置记录
    genbestx[i] = gbest[0];
    genbesty[i] = gbest[1];

    result[i] = fitnessgbest; // 每代的最优值记录到数组
    w1 = 0.9 - (0.5*i)/maxgen;//PSO算法改进

  }
}

function PSO_main(){
  result = [];
  initArray();
  PSO_func();
  var best = result[maxgen-1];//最优值
  console.log("程序运行结果如下：\n");
  console.log("---------------------------------------------------------------\n");
  console.log("当自变量x,y取值为：(%o,%o)	时,该二元函数取到极值\n", genbestx[maxgen - 1], genbesty[maxgen - 1]);
  console.log("该二元函数的极值为：%o\n",best);
  console.log("计算值：%o\n",func(genbestx[maxgen-1],genbesty[maxgen-1]));
  console.log("历代最优值：%o\n",result);
  console.log("---------------------------------------------------------------\n");
  $(".result").html("");
  $(".result").append("程序运行结果如下：<br>");
  $(".result").append("---------------------------------------------------------------<br>");
  $(".result").append("当自变量x,y取值为：("+ genbestx[maxgen - 1] + "," + genbesty[maxgen - 1] +")	时,该二元函数取到极值<br>");
  $(".result").append("该二元函数的极值为：" + best + "<br>");
  $(".result").append("计算值：" + func(genbestx[maxgen-1],genbesty[maxgen-1]) + "<br>");
  $(".result").append("历代最优值：" + result + "<br>");
  $(".result").append("---------------------------------------------------------------<br>");
  
  return "运行成功";
}

PSO_main();