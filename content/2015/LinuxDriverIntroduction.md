/**
Title: Linux WiFi Driver Introduction
Sort: 1
*/

## System Architecture
![System Architecture](%image_url%/2015111601.png)

## Device/Driver Init/Exit Module
![Architecture](%image_url%/2015111602.png)

## Network Data Exchange Module
![Architecture](%image_url%/2015111603.png)

## IEEE 802.11 MLME Module
![Architecture](%image_url%/2015111604.png)
* Function Definition  
Internal requests by the configuration system or the
MgmtFrame sent by other devices, are converted to
a pre-defined MLME format, and stored in the queuing
system for latter handling   
* Device Mgmt Task
* Timer Function
* MLME Mgmt Task
* MLME FSMs (Finite State Machines)

## Device Configuration and Control Module
![Architecture](%image_url%/2015111605.png)


