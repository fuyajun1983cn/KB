/*
 Title: A2DP 学习贴  
 Sort: 2
 */

##A2dp Profile学习记录  
A2DP主要关注的是Audio Streaming。 同时A2DP也不包含远程控制函数。  
与其他Profile的关系如下：  
![a2dp](%image_url%/2015071301.bmp)  

Protocol Model:  
![protocol model](%image_url%/2015071302.bmp)  

Supported Codecs:  
![supported Codecs](%image_url%/2015071303.bmp)  

##A2dpStateMachine  
此类包定义了三种BluetoothDevice成员变量：  
mCurrentDevice: 在状态发生改变之前，已连接的设备。  
mTargetDevice: 将要去连接的设备。  
mIncommingDevice:  正在连接我们的设备。  只在PendingState下有效。  
>当mIncommingDevice不为空时，mCurrentDevice和mTargetDevice都为空。  
>当mCurrentDevice或mTargetDevice任何一个不为空，mIncommingDevice则为空。  

定义了以下几种状态：  
* Stable状态：  
无连接，断开状态， mCurrentDevice和mTargetDevice都为空。  
已连接状态， mCurrentDevice不为空， mTargetDevice为空。  
* 中间状态   
正在连接一个设备，Pending。  
mCurrentDevice为空，mTargetDevice不为空。   
断开设备，正在连接一个新设备。   
Pending， mCurrentDevice和mTargetDevice都不为空。   
断开设备  Pending   
mCurrentDevice不为空，mTargetDevice为空。   
收到连接请求， Pending   
mCurrentDevice和mTargetDevice都为空。   

```java  
    private BluetoothDevice mCurrentDevice = null;  //当前已经连接的设备
    private BluetoothDevice mTargetDevice = null;   //准备连接的设备
    private BluetoothDevice mIncomingDevice = null;  //想与我们建立连接的设备
    private BluetoothDevice mPlayingA2dpDevice = null; //正在播放音乐的设备  
```




