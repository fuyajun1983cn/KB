/*
 Title: wpa_supplicant学习贴
 Sort: 1
 */
##wap_supplicant架构分析  
 * wpa_supplicant架构图  
 ![Architecture](%image_url%/2015070401.png)  

>wpa_supplicant作为一个独立的进程进行，并处理三种事件：
 * 注册的事件
 * 命令和solicited事件
 * 底层驱动向上报告的unsolicited事件

>wpa_supplicant代码结构中使用Event Loop机制，它定义了一个事件循环，在循环当中处理如下事件：  
 * registered timeouts (i.e., do something after N seconds)  
 * sockets (e.g., a new packet available for reading)  
 * signals  

>>**主要函数分析:**  
  * `eloop_init`  
  * `eloop_register_read_sock`
  * `eloop_register_sock`
  * `eloop_register_event`
  * `eloop_register_timeout`
  * `eloop_register_signal`
  * `eloop_run`
  * `eloop_terminate`
  * `eloop_destroy`  此函数调用后，如果再次调用其他eloop函数，需要重新调用`eloop_init`  
  * `eloop_terminated`

##wpa_cli常见命令   
>**Device Discovery**  
  * p2p_find [timeout in seconds] [type=<social|progressive>] [dev_id=<addr>] [delay=<search delay in ms>]  
  >The default behavior is to run a single full scan in the beginning and
    then scan only social channels. type=social will scan only social
    channels, i.e., it skips the initial full scan. type=progressive is
    like the default behavior, but it will scan through all the channels
    progressively one channel at the time in the Search state rounds. This
    will help in finding new groups or groups missed during the initial
    full scan.  
    The optional dev_id option can be used to specify a single P2P peer to
    search for. The optional delay parameter can be used to request an extra
    delay to be used between search iterations (e.g., to free up radio
    resources for concurrent operations).  

  * p2p_listen [timeout in seconds]  
  >Start Listen-only state (become discoverable without searching for
    other devices). Optional parameter can be used to specify the duration
    for the Listen operation in seconds. This command may not be of that
    much use during normal operations and is mainly designed for
    testing. It can also be used to keep the device discoverable without
    having to maintain a group.

  * p2p_stop_find  
  >Stop ongoing P2P device discovery or other operation (connect, listen
    mode).

  * p2p_flush  
  >Flush P2P peer table and state.    

>**Group Formation**  
  * p2p_prov_disc <peer device address> <display|keypad|pbc> [join|auto]  
  >Send P2P provision discovery request to the specified peer. The
    parameters for this command are the P2P device address of the peer and
    the desired configuration method. For example, "p2p_prov_disc
    02:01:02:03:04:05 display" would request the peer to display a PIN for
    us and "p2p_prov_disc 02:01:02:03:04:05 keypad" would request the peer
    to enter a PIN that we display.  
    The optional "join" parameter can be used to indicate that this command
    is requesting an already running GO to prepare for a new client. This is
    mainly used with "display" to request it to display a PIN. The "auto"
    parameter can be used to request wpa_supplicant to automatically figure
    out whether the peer device is operating as a GO and if so, use
    join-a-group style PD instead of GO Negotiation style PD.

  * p2p_connect <peer device address> <pbc|pin|PIN#> [display|keypad]
	[persistent|persistent=<network id>] [join|auth]
	[go_intent=<0..15>] [freq=<in MHz>] [ht40] [provdisc]
  >Start P2P group formation with a discovered P2P peer. This includes
    optional group owner negotiation, group interface setup, provisioning,
    and establishing data connection.  
    The <pbc|pin|PIN#> parameter specifies the WPS provisioning
    method. "pbc" string starts pushbutton method, "pin" string start PIN
    method using an automatically generated PIN (which will be returned as
    the command return code), PIN# means that a pre-selected PIN can be
    used (e.g., 12345670). [display|keypad] is used with PIN method
    to specify which PIN is used (display=dynamically generated random PIN
    from local display, keypad=PIN entered from peer display). "persistent"
    parameter can be used to request a persistent group to be formed. The
    "persistent=<network id>" alternative can be used to pre-populate
    SSID/passphrase configuration based on a previously used persistent
    group where this device was the GO. The previously used parameters will
    then be used if the local end becomes the GO in GO Negotiation (which
    can be forced with go_intent=15).  
    "join" indicates that this is a command to join an existing group as a
    client. It skips the GO Negotiation part. This will send a Provision
    Discovery Request message to the target GO before associating for WPS
    provisioning.  
    "auth" indicates that the WPS parameters are authorized for the peer
    device without actually starting GO Negotiation (i.e., the peer is
    expected to initiate GO Negotiation). This is mainly for testing
    purposes.  
    "go_intent" can be used to override the default GO Intent for this GO
    Negotiation.  
    "freq" can be used to set a forced operating channel (e.g., freq=2412
    to select 2.4 GHz channel 1).  
    "provdisc" can be used to request a Provision Discovery exchange to be
    used prior to starting GO Negotiation as a workaround with some deployed
    P2P implementations that require this to allow the user to accept the
    connection.  

  * p2p_group_add [persistent|persistent=<network id>] [freq=<freq in MHz>] [ht40]  
  >Set up a P2P group owner manually (i.e., without group owner
    negotiation with a specific peer). This is also known as autonomous
    GO. Optional persistent=<network id> can be used to specify restart of
    a persistent group. Optional freq=<freq in MHz> can be used to force
    the GO to be started on a specific frequency. Special freq=2 or freq=5
    options can be used to request the best 2.4 GHz or 5 GHz band channel
    to be selected automatically.

  * p2p_reject <peer device address>  
  >eject connection attempt from a peer (specified with a device
address). This is a mechanism to reject a pending GO Negotiation with
a peer and request to automatically block any further connection or
discovery of the peer.  

  * p2p_group_remove <group interface>  
  >Terminate a P2P group. If a new virtual network interface was used for
the group, it will also be removed. The network interface name of the
group interface is used as a parameter for this command.  

  * p2p_cancel  
  >Cancel an ongoing P2P group formation and joining-a-group related
operation. This operations unauthorizes the specific peer device (if any
had been authorized to start group formation), stops P2P find (if in
progress), stops pending operations for join-a-group, and removes the
P2P group interface (if one was used) that is in the WPS provisioning
step. If the WPS provisioning step has been completed, the group is not
terminated.  

>**Invitation**  
  * p2p_invite [persistent=<network id>|group=<group ifname>] [peer=address]
	[go_dev_addr=address] [freq=<freq in MHz>] [ht40]  
    >Invite a peer to join a group (e.g., group=wlan1) or to reinvoke a
persistent group (e.g., persistent=4). If the peer device is the GO of
the persistent group, the peer parameter is not needed. Otherwise it is
used to specify which device to invite. go_dev_addr parameter can be
used to override the GO device address for Invitation Request should
it be not known for some reason (this should not be needed in most
cases). When reinvoking a persistent group, the GO device can specify
the frequency for the group with the freq parameter.

>**Group Operations**  
  * wps_pin <any|address> <PIN>   
  >Start WPS PIN method. This allows a single WPS Enrollee to connect to
the AP/GO. This is used on the GO when a P2P client joins an existing
group. The second parameter is the address of the Enrollee or a string
"any" to allow any station to use the entered PIN (which will restrict
the PIN for one-time-use). PIN is the Enrollee PIN read either from a
label or display on the P2P Client/WPS Enrollee.

  * wps_pbc  
  >Start WPS PBC method (i.e., push the button). This allows a single WPS
Enrollee to connect to the AP/GO. This is used on the GO when a P2P
client joins an existing group.  

  * p2p_get_passphrase  
  >Get the passphrase for a group (only available when acting as a GO).  

  * p2p_presence_req [<duration> <interval>] [<duration> <interval>]  
  >Send a P2P Presence Request to the GO (this is only available when
acting as a P2P client). If no duration/interval pairs are given, the
request indicates that this client has no special needs for GO
presence. the first parameter pair gives the preferred duration and
interval values in microseconds. If the second pair is included, that
indicates which value would be acceptable.

>**Parameters**  
  * p2p_ext_listen [<period> <interval>]  
  >Configure Extended Listen Timing. If the parameters are omitted, this
feature is disabled. If the parameters are included, Listen State will
be entered every interval msec for at least period msec. Both values
have acceptable range of 1-65535 (with interval obviously having to be
larger than or equal to duration). If the P2P module is not idle at
the time the Extended Listen Timing timeout occurs, the Listen State
operation will be skipped.  
The configured values will also be advertised to other P2P Devices. The
received values are available in the p2p_peer command output:  
ext_listen_period=100 ext_listen_interval=5000  

  * p2p_set <field> <value>  
  >Change dynamic P2P parameters  

  * p2p_set discoverability <0/1>  
  >Disable/enable advertisement of client discoverability. This is
enabled by default and this parameter is mainly used to allow testing
of device discoverability.

  * p2p_set managed <0/1>  
  >Disable/enable managed P2P Device operations. This is disabled by
default.

  * p2p_set listen_channel <1/6/11>  
  >Set P2P Listen channel. This is mainly meant for testing purposes and
changing the Listen channel during normal operations can result in
protocol failures.

  * p2p_set ssid_postfix <postfix>  
  >Set postfix string to be added to the automatically generated P2P SSID
(DIRECT-<two random characters>). For example, postfix of "-testing"
could result in the SSID becoming DIRECT-ab-testing.  

  * set <field> <value>  
  >Set global configuration parameters which may also affect P2P
operations. The format on these parameters is same as is used in
wpa_supplicant.conf. Only the parameters listen here should be
changed. Modifying other parameters may result in incorrect behavior
since not all existing users of the parameters are updated.

  * set uuid <UUID>  
  >Set WPS UUID (by default, this is generated based on the MAC address).

  * set device_name <device name>  

  * Set WPS Device Name (also included in some P2P messages).  

  * set manufacturer <manufacturer>  
  >Set WPS Manufacturer.

  * set model_name <model name>

  * Set WPS Model Name.
   
  * set model_number <model number>
   
  * Set WPS Model Number.
   
  * set serial_number <serial number>
   
  * Set WPS Serial Number.
   
  * set device_type <device type>
   
  * Set WPS Device Type.
   
  * set os_version <OS version>
   
  * Set WPS OS Version.
   
  * set config_methods <config methods>
   
  * Set WPS Configuration Methods.

  * set sec_device_type <device type>  
  >Add a new Secondary Device Type.

  * set p2p_go_intent <GO intent>   
  >Set the default P2P GO Intent. Note: This value can be overridden in
p2p_connect command and as such, there should be no need to change the
default value here during normal operations.  

  * set p2p_ssid_postfix <P2P SSID postfix>  

  * Set P2P SSID postfix.

  * set persistent_reconnect <0/1>  
  >Disable/enabled persistent reconnect for reinvocation of persistent
groups. If enabled, invitations to reinvoke a persistent group will be
accepted without separate authorization (e.g., user interaction).

  * set country <two character country code>  
  >Set country code (this is included in some P2P messages).  

>**Status**  
  * p2p_peers [discovered]  
  >List P2P Device Addresses of all the P2P peers we know. The optional
"discovered" parameter filters out the peers that we have not fully
discovered, i.e., which we have only seen in a received Probe Request
frame.

  * p2p_peer <P2P Device Address>  
  >Fetch information about a known P2P peer.  

>**Group Status**  
  * status  
  >Show status information (connection state, role, use encryption
parameters, IP address, etc.).  
  * sta  
  >Show information about an associated station (when acting in AP/GO role).  
  * all_sta  
  >Lists the currently associated stations.  

##wpa_supplicant知识拓展  
 * wpa_supplicant邮件列表  
   - <http://lists.shmoo.com/mailman/listinfo/hostap>  
   - <http://w1.fi/cgit/hostap/>


 * AP Monitor Mode  
 `iwconfig wlan0 mode monitor`  

 * Beacon Interval  
> What should the beacon interval be set to. What is the default?  
Default is 100, i.e., ten beacons per second. With Host AP mode, the
most noticeable effect of beacon interval is latency in sending unicast
packets to power saving stations and broadcast/multicast packets in
general. I would set beacon interval depending on the environment where
the AP is operating.
>
><font color=red>If you have many stations using power saving, you might want to keep the
beacon interval quite small since larger interval adds latency to
AP->STA packets</font>. Even without any stations using PS, Host AP mode seems
to often wait for next DTIM beacon frame before sending pending
broadcast/multicast frames. This might be an issue in some cases. On the
other hand, <font color=red>every beacon frame take a small portion of the maximum
bandwidth and using a larger beacon interval would save some bandwidth
for data frames</font>. So, this will be a compromise between enlarged latency
and saved bandwidth. I would suggest experimenting with different values
since there is not really any one-value-fits-all solution for this.


