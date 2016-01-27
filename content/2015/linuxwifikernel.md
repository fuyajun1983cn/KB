/**
Title: Linux Wifi Driver重要函数和数据结构
Sort: 2
*/

## 重要数据结构

- struct net_device_stats


- struct iw_statistics

- struct net_device 


## 重要函数  


netif模块 
	netif_device_attach(net_dev);
	netif_start_queue(net_dev);
	netif_carrier_on(net_dev);
	netif_wake_queue(net_dev);
