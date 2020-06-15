#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cmath>
#include <ctime>
#include<windows.h>
using namespace std;


#define maxgen 30    // 迭代次数
#define sizepop 20   // 种群规模
#define popmax 3.5   // 个体最大取值
#define popmin -3.5  // 个体最小取值
#define Vmax 0.5     // 速度最大值
#define Vmin -0.5    //速度最小值
#define random(x, y) (((double)rand()) / RAND_MAX) * (y - x) + x //函数random(x,y)产生x-y内的随机小数

double w = 0;
double c1 = 0;
double c2 = 0;
double popx[sizepop];    // 定义种群横坐标位置数组
double popy[sizepop];    // 定义种群y坐标位置数组
double Vx[sizepop];      // 定义种群x速度数组
double Vy[sizepop];      // 定义种群y速度数组
double fitness[sizepop]; // 定义种群的适应度数组
double result[maxgen];   //定义存放每次迭代种群最优值的数组
double pbestx[sizepop];  // 个体极值的位置
double pbesty[sizepop];  
double gbest[2];              //群体极值的位置
double fitnesspbest[sizepop]; //个体极值适应度的值
double fitnessgbest;          // 群体极值适应度值
double genbestx[maxgen];      //每一代最优值取值粒子
double genbesty[maxgen];
int count[15][20] = {0};

//适应度函数
double func(double x, double y)
{
  double fitness = 3*(1-x*x)*exp(-x*x-(1+y)*(1+y))-10*(0.2*x-x*x*x-y*y*y*y*y)*exp(-x*x-y*y)-(1/3)*exp(-(x+1)*(x+1)-y*y); //peaks函数
  return fitness;
}

// 种群初始化
void pop_init(void)
{
  for (int i = 0; i < sizepop; i++)
  {
    popx[i] = random(popmin, popmax);
    popy[i] = random(popmin, popmax);
    Vx[i] = random(Vmin, Vmax);
    Vy[i] = random(Vmin, Vmax);          //初始化位置与速度
    fitness[i] = func(popx[i], popy[i]); //计算适应度函数值
  }
}

// max()函数定义
double *max(double fit[], int size)
{
  int index = 0;       // 初始化序号
  double max = fit[0]; // 初始化最大值为数组第一个元素
  static double best_fit_index[2];
  for (int i = 1; i < size; i++)
  {
    if (fit[i] > max)
      max = fit[i];
    index = i;
  }
  best_fit_index[0] = index;
  best_fit_index[1] = max;
  // 群体极值位置
  gbest[0] = popx[index];
  gbest[1] = popy[index];
  //群体极值适应度值
  fitnessgbest = max;
  return best_fit_index;
}

void PSO_func(void)
{
  pop_init();
  double *best_fit_index;                 // 用于存放群体极值和其位置(序号)
  best_fit_index = max(fitness, sizepop); //求群体极值
  int index = (int)(*best_fit_index);

  // 个体极值位置
  for (int i = 0; i < sizepop; i++)
  {
    pbestx[i] = popx[i];
    pbesty[i] = popy[i];
  }
  // 个体极值适应度值
  for (int i = 0; i < sizepop; i++)
  {
    fitnesspbest[i] = fitness[i];
  }

  //迭代寻优
  for (int i = 0; i < maxgen; i++)
  {
    for (int j = 0; j < sizepop; j++)
    {
      //速度更新及粒子更新
      double rand1 = random(0, 1);
      double rand2 = random(0, 1);
      // 速度更新
      Vx[j] = w * Vx[j] + c1 * rand1 * (pbestx[j] - popx[j]) + c2 * rand2 * (gbest[0] - popx[j]);
      if (Vx[j] > Vmax)
        Vx[j] = Vmax;
      if (Vx[j] < Vmin)
        Vx[j] = Vmin;
      Vy[j] = w * Vy[j] + c1 * rand1 * (pbesty[j] - popy[j]) + c2 * rand2 * (gbest[1] - popy[j]);
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
    }
    for (int j = 0; j < sizepop; j++)
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
  }
}

// 主函数
int PSO_main(int x,int y)
{
  clock_t start, finish;       //程序开始和结束时间
  start = clock();             //开始计时
  srand((unsigned)time(NULL)); // 初始化随机数种子
  PSO_func();
  double best = result[maxgen - 1]; //最优值
  //cout << "程序运行结果如下：" << endl;
  //cout << "---------------------------------------------------------------" << endl;
  //cout << "当自变量x，y取值为(" << genbestx[maxgen - 1] << "," << genbesty[maxgen - 1] << ")时，该二元函数取到极值" << endl;
  //cout << "该二元函数的极值为：" << best << endl;
  finish = clock(); //结束时间

  //cout << "计算值：" << func(genbestx[maxgen - 1], genbesty[maxgen - 1]) << endl;
  double duration = (double)(finish - start) / CLOCKS_PER_SEC; // 程序运行时间
  //cout << "程序迭代" << maxgen << "次的运行时间为：" << duration << endl;
  
  //cout << "---------------------------------------------------------------" << endl;
  if(best >= 8.1164)
  {
    count[x][y]++ ;
  }

  return 0;
}

int main()
{
  for(int i=0;i<15;i++)
  {
    cout<<"*";
    for(int j=0;j<20;j++){

      for(int k=0;k<maxgen;k++)
      {
        //Sleep(random(0,10));
        
        PSO_main(i,j);
      }
      c1 += 0.2;
      c2 += 0.2;
    }
    
    c1 = 0;
    c2 = 0;
    w += 0.1;
    
  }
  cout<<endl;
  float m1 = 0.0;
  for(int i=0;i<15;i++)
  {
    
    if(i==0){
      cout<<"   |0.0 0.4 0.8 1.2 1.6 2.0 2.4 2.8 3.2 3.6 4.0 4.4 4.8 5.2 5.6 6.0 6.4 6.8 7.2 7.6 8.0"<<endl;
    }
    for(int j=0;j<20;j++)
    {
      
      if(j==0)
      {
        if(m1==0)
        {
          cout<<"0.0"<<"|";
        }
        else if(m1 == 1.0){
          cout<< "1.0" <<"|";
        }
        else{
          cout<<m1<<"|";
        }
        
        m1 += 0.1;
      }
      if(count[i][j]<10)
      {
        cout<<" ";
      }
      cout<<count[i][j]<<"  ";
    }
    cout<<endl;
  }
  return 0;
}