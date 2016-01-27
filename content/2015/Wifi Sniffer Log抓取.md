/*
 Title: Wifi Sniffer log抓取常见方法
 Sort: 2
 */

* 抓listen channel的sniffer log的时候执行下面的cmd，然后抓channel 1就可以了：
>wpa_cli –ip2p0 –p/data/misc/wifi/sockets p2p_set listen_channel 1


