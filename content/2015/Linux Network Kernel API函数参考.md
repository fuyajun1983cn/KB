/*
 Title: Linux Network Kernel API参考
 Sort: 2
 */

KEYWORDS: kernel

## Socket Buffer Functions
* struct sk_buff --  socket buffer
* skb_queue_empty --  check if a queue is empty
* skb_get --  reference buffer
* kfree_skb --  free an sk_buff
* skb_cloned --  is the buffer a clone
* skb_shared --  is the buffer shared
* skb_share_check --  check if buffer is shared and if so clone it
* skb_unshare --  make a copy of a shared buffer
* skb_peek -- 
* skb_peek_tail -- 
* skb_queue_len --  get queue length
* __skb_queue_head --  queue a buffer at the list head
* skb_queue_head --  queue a buffer at the list head
* __skb_queue_tail --  queue a buffer at the list tail
* skb_queue_tail --  queue a buffer at the list tail
* __skb_dequeue --  remove from the head of the queue
* skb_dequeue --  remove from the head of the queue
* skb_insert --  insert a buffer
* skb_append --  append a buffer
* skb_unlink --  remove a buffer from a list
* __skb_dequeue_tail --  remove from the tail of the queue
* skb_dequeue_tail --  remove from the head of the queue
* skb_put --  add data to a buffer
* skb_push --  add data to the start of a buffer
* skb_pull --  remove data from the start of a buffer
* skb_headroom --  bytes at buffer head
* skb_tailroom --  bytes at buffer end
* skb_reserve --  adjust headroom
* skb_trim --  remove end from a buffer
* skb_orphan --  orphan a buffer
* skb_queue_purge --  empty a list
* __skb_queue_purge --  empty a list
* __dev_alloc_skb --  allocate an skbuff for sending
* dev_alloc_skb --  allocate an skbuff for sending
* skb_cow --  copy header of skb when it is required
* skb_padto --  pad an skbuff up to a minimal size
* skb_over_panic --  private function
* skb_under_panic --  private function
* alloc_skb --  allocate a network buffer
* __kfree_skb --  private function
* skb_clone --  duplicate an sk_buff
* skb_copy --  create private copy of an sk_buff
* pskb_copy --  create copy of an sk_buff with private head.
* pskb_expand_head --  reallocate header of sk_buff
* skb_copy_expand --  copy and expand sk_buff
* skb_pad --  zero pad the tail of an skb
* __pskb_pull_tail --  advance tail of skb header

## Socket Filter  
* sk_run_filter --  run a filter on a socket
* sk_chk_filter --  verify socket filter code

## Network device Driver API  
* init_etherdev --  Register ethernet device
* alloc_etherdev --  Allocates and sets up an ethernet device
* alloc_fddidev --  Register FDDI device
* alloc_hippi_dev --  Register HIPPI device
* alloc_trdev --  Register token ring device
* alloc_fcdev --  Register fibre channel device
* dev_add_pack --  add packet handler
* __dev_remove_pack --  remove packet handler
* dev_remove_pack --  remove packet handler
* netdev_boot_setup_check --  check boot time settings
* __dev_get_by_name --  find a device by its name
* dev_get_by_name --  find a device by its name
* __dev_get --  test if a device exists
* __dev_get_by_index --  find a device by its ifindex
* dev_get_by_index --  find a device by its ifindex
* dev_getbyhwaddr --  find a device by its hardware address
* dev_get_by_flags --  find any device with given flags
* __dev_get_by_flags --  find any device with given flags
* dev_alloc_name --  allocate a name for a device
* dev_alloc --  allocate a network device and name
* netdev_state_change --  device changes state
* dev_load --  load a network module
* dev_open --  prepare an interface for use.
* dev_close --  shutdown an interface.
* register_netdevice_notifier --  register a network notifier block
* unregister_netdevice_notifier --  unregister a network notifier block
* call_netdevice_notifiers --  call all network notifier blocks
* dev_queue_xmit --  transmit a buffer
* netif_rx --  post buffer to the network code
* register_gifconf --  register a SIOCGIF handler
* netdev_set_master --  set up master/slave pair
* dev_set_promiscuity --  update promiscuity count on a device
* dev_set_allmulti --  update allmulti count on a device
* dev_ioctl --  network device ioctl
* dev_new_index --  allocate an ifindex
* register_netdevice --  register a network device
* free_netdev --  free network device
* unregister_netdevice --  remove device from the kernel
* netif_start_queue  用来告诉上层网络协议底层驱动程序还有空的缓冲区可用，请把下一个封包发送进来。
* netif_wake_queue. 通知上层可再次传输数据包。
* 载波状态相关函数
** netif_carrier_off, netif_carrier_on,  netif_carrier_ok


## 来源  
<http://www.cs.bham.ac.uk/~exr/teaching/lectures/systems/08_09/docs/kernelAPI/c6671.html#AEN6673>
