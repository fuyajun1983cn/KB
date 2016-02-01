/*
 Title: Wifi reason code
 Sort: 2
 */

|Code|Reason|Explanation
|----|----|----
|0|	Reserved|	Normal working operation
|1|	Unspecific Reason|	We don’t know what’s wrong
|2|	Previous authentication no longer valid|	Client has associated but is not authorised.
|3|	Deauthenticated because sending STA is leaving (or has left) IBSS or ESS|	The access point went offline, deauthenticating the client.
|4|	Disassociated due to inactivity	Client session timeout exceeded.| |
|5|	Disassociated because AP is unable to handle all currently associated STAs|	The access point is busy, performing load balancing, for example.
|6|	Class 2 frame received from nonauthenticated STA|	Client attempted to transfer data before it was authenticated.
|7|	Class 3 frame received from nonassociated STA|	Client attempted to transfer data before it was associated.
|8|	Disassociated because sending STA is leaving (or has left) BSS|	Operating System moved the client to another access point using non-aggressive load balancing.
|9|	STA requesting (re)association is not authenticated with responding STA	Client not authorized yet, still attempting to associate with an access point.|
