/*
 Title: DFVS介绍
 Sort: 2
 */

KEYWORDS: dfvs

### 概述  
DVFS 即动态电压频率调整，动态技术则是根据芯片所运行的应用程序对计算能力的不同需要，动态调节芯片的运行频率和电压(对于同一芯片，频率越高，需要的电压也越高)，从而达到节能的目的。  

降低频率可以降低功率，但是单纯地降低频率并不能节省能量。因为对于一个给定的任务，F*t是一个常量，只有在降低频率的同时降低电压，才能真正地降低能量的消耗。   
但是要让DVFS发挥作用，真正地实现节能，只有芯片的支持还是不够的，还需要软件与硬件的综合设计。

### DVFS系统流程： 
1. 采集与系统负载有关的信号，计算当前的系统负载。 
2. 根据系统的当前负载，预测系统在下一时间段需要的性能。 
3. 将预测的性能转换成需要的频率，从而调整芯片的时钟设置。 
4. 根据新的频率计算相应的电压。  
    通知电源管理模块调整给CPU的电压。另外，在调整频率和电压时，要特别注意调整的顺序。当频率由高到低调整时，应该先降频率，再降电压；相反，当升高频率时，应该先升电压，再升频率。虽然现在做DVFS的不是很多，是因为很多都被预测算法给难住，但是作者相信，随着预测算法的进步，DVFS技术必将得到广泛的应用，因为它能够节省很多能量。而节能对许多便携式设备来说，常常是第一要求。  

### 开关DVFS示例  
* CPU全速跑的命令(即关闭DVFS)  
>依次执行如下4个命令：   
    echo performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor  
    echo 1 > /sys/devices/system/cpu/cpu1/online  
    echo 1 > /sys/devices/system/cpu/cpu2/online  
    echo 1 > /sys/devices/system/cpu/cpu3/online  

* 打开DVFS命令  
>依次执行如下命令：  
    echo hotplug > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor  
    echo 0 > /sys/devices/system/cpu/cpufreq/hotplug/is_cpu_hotplug_disable




