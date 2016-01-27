/*
 Title: HDCP规范学习  
 Sort: 2
 */

##Scope  
This specification describes a content protection mechanism for:   
(1) authentication of HDCP Receivers to their immediate upstream connection (to an
HDCP Transmitter),  
(2) revocation of HDCP Receivers that are determined by the Digital
Content Protection, LLC, to be invalid, and   
(3) HDCP Encryption of Audiovisual Content
over the HDCP-protected Interfaces between HDCP Transmitters and their downstream
HDCP Receivers.

##Connection Topology of an HDCP System  
![topology](%image_url%/2015071601.bmp)  

##The HDCP Authentication Protocol  
The first part establishes shared values between the two HDCP Devices if both devices have a valid Device Key Set
from the Digital Content Protection LLC.   
![first phase](%image_url%/2015071602.bmp)
The second part allows an HDCP Repeater to report the KSVs of attached HDCP Receivers.   
![second phase](%image_url%/2015071603.bmp)
The third part occurs during the vertical blanking interval preceding each frame for which encryption is enabled, and provides an initialization state for the HDCP Cipher for encrypting the HDCP Content within that frame.
![third phase](%image_url%/2015071604.bmp)
