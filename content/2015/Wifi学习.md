/*
 Title: Wifi学习记录
 Sort: 2
 */

KEYWORDS: android 

## L2ConnectedState  
WifiStateMachine进入该状态后，表明链接层连接已经建立，准备获取IP地址。  
在准备建立DHCP前，需要做如下一些措施：  
1. 如果当前没有连接蓝牙设备，则需要将蓝牙共存模式关掉，因为当关掉Wi-Fi驱动的省电模式时，会与蓝牙共存模式有冲突。  
2. 获取IP地址的时候，需要关掉Wi-Fi驱动的省电模式,以及禁用Suspend优化，因为有些低电量模式下的路由器存在兼容性问题。
3. 一旦成功获取到IP地址，则要恢复蓝牙的共存模式以及打开省电模式。  

## 获取IP地址的过程  
当L2连接已经完成时，即收到WifiMonitor.NETWORK_CONNECTION_EVENT事件通知时，此时WifiStateMachine处于ConnectModeState状态中，此时会进入ObtainingIpState，这个时候会获取L3层的网络IP地址。 根据配置的情况，会选择是获取静态IP地址或动态IP地址。 当通过动态方式获取IP地址时，会通过DhcpStateMachine来获取IP地址，方法是向其发送DhcpStateMachine.CMD_START_DHCP消息。  

## DhcpStateMachine  
默认状态是StoppedState, WifiStateMachine注册了CMD_PRE_DHCP_ACTION,所以运行DHCP前，要发一个消息给WifiStateMachine去做一些前期准备，即上面所提到的一些设置。随后进入WaitBeforeStartState等待WifiStateMachine的确认消息，当收到CMD_PRE_DHCP_ACTION_COMPLETE后，则开始调用runDhcp,代码如下：  
```java
   case CMD_PRE_DHCP_ACTION_COMPLETE:
    if (runDhcp(DhcpAction.START)) {
        transitionTo(mRunningState);
    } else {
        transitionTo(mStoppedState);
    }
    break;
```
## DhcpAction.START  
```java
    if (dhcpAction == DhcpAction.START) {
        /* Stop any existing DHCP daemon before starting new */
        NetworkUtils.stopDhcp(mInterfaceName);
        if (DBG) Log.d(TAG, "DHCP request on " + mInterfaceName);
        success = NetworkUtils.runDhcp(mInterfaceName, dhcpResults);
    }
```
通过JNI层，会调用`dhcp_do_request`方法, 该函数定义在/system/core/libnetutils/dhcp_utils.c。  
最终通过设置属性`ctl.start`来启动`dhcpcd_*`服务。在init.rc可以看到定义的相关服务：  
```
service dhcpcd_wlan0 /system/bin/logwrapper /system/bin/dhcpcd -BK -dd
    class main
	user dhcp
	group net_admin net_raw 
    disabled
    oneshot

service dhcpcd_eth0 /system/bin/logwrapper /system/bin/dhcpcd -BK -dd
    class main
    user dhcp
    group net_admin net_raw 
    disabled
    oneshot	
	
service dhcpcd_p2p /system/bin/logwrapper /system/bin/dhcpcd -BK -dd
    class main
	user dhcp
	group net_admin net_raw 
    disabled
    oneshot
```
`dhcp_do_request`核心步骤如下：  
```c
   property_set(ctrl_prop, daemon_cmd);
    if (wait_for_property(daemon_prop_name, desired_status, 10) < 0) {
        snprintf(errmsg, sizeof(errmsg), "%s", "Timed out waiting for dhcpcd to start");
        return -1;
    }

    /* Wait for the daemon to return a result */
    if (wait_for_property(result_prop_name, NULL, 30) < 0) {
        snprintf(errmsg, sizeof(errmsg), "%s", "Timed out waiting for DHCP to finish");
        return -1;
    }
```
从上述代码流程中，可以看到：
1. 先通过property_set启动上述的服务之一。
2. 等待服务启动成功。
3. 等待返回结果。  

在实际应用中：
1. 在dhcpcd刚获取到IP，Framework层的broadcast还未发出去的时候，如果这个时间点出现link down，会直接发Disconnected的broadcast，但不会做stop dhcp的动作。这样会导致再次link up时，run dhcp不会真正生效。看到的IP地址还是前一次的，因为没有broadcast connected，所以apk也会识别不到网络。
2. 当dhcpcd还没有拿到IP时，出现link down的情况。 


