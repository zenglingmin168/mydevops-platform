#!/bin/bash
ssh serveradm@172.16.16.83 -p1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key 'curl -o /dev/null -s -H "Content-Type: application/json" -X POST  "http://10.83.48.154/actuator/refresh"'
ssh serveradm@172.16.16.83 -p1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key 'curl -o /dev/null -s -H "Content-Type: application/json" -X POST  "http://10.83.157.150/actuator/refresh"'
ssh serveradm@172.16.16.83 -p1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key 'curl -o /dev/null -s -H "Content-Type: application/json" -X POST  "http://10.83.233.122/actuator/refresh"'
ssh serveradm@172.16.16.83 -p1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key 'curl -o /dev/null -s -H "Content-Type: application/json" -X POST  "http://10.83.217.9/actuator/refresh"'
ssh serveradm@172.16.16.83 -p1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key 'curl -o /dev/null -s -H "Content-Type: application/json" -X POST  "http://10.83.48.158/actuator/refresh"'
ssh serveradm@172.16.16.83 -p1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key 'curl -o /dev/null -s -H "Content-Type: application/json" -X POST  "http://10.83.169.190/actuator/refresh"'
