/*
 Titile: WiFi问题常见调试命令
 Sort: 2
 */

##Android Box常见调试命令
* TCPDUMP    
>tcpdump -i any -s 0 -w /data/tcpdump_log.pcap

* iwpriv
>while true; do iwpriv wlan0 set ResetCounter=0; sleep 1; iwpriv wlan0 stat; iwpriv wlan0 mac 2954;  done
