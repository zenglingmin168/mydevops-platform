# -*- encoding: utf-8 -*-
# ssh远程主机相关
from ast import With
from cmath import e
from fnmatch import translate
from ntpath import join
import re
from socket import timeout
from sys import stderr, stdin, stdout
from urllib.request import Request
from webbrowser import get
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.test import client
from jenkinsapi import jenkins, result
import paramiko
import traceback

from requests import Response, session

# 天气相关
# from unicodedata import name
# import requests
# import json
# import datetime
# from time import strftime

# #连接远程主机并执行命令
# def test1(ip, port, username, passwd, cmd):
#     try:
#         ssh = paramiko.SSHClient() #创建一个ssh对象
#         ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  # 允许连接know_hosts中不存在的主机
#         ssh.connect(ip, port, username, passwd, timeout=5) # 连接服务器，其中timeout的是超时时间
#         stdin, stdout, stderr = ssh.exec_command(cmd) # 执行命令，并获取结果
#         print(stdout.read().decode('utf-8'))  # 以utf-8编码对结果进行解码
#         ssh.close() #关闭ssh
#     except Exception as e:
#         print('%s' % e)

# if __name__ == '__main__':
#     ips="""
#     192.168.2.81
#     192.168.2.82
#     192.168.2.84
#     """
#     for ip in ips.split( ):
#         test1(ip, 22, "root", "123456", "pwd && if [ $? -ne 0 ];then echo '执行成功';fi")


# #获取天气信息
# now=datetime.datetime.now()
# todaydate = now.strftime('%d')
# numtodaydate = int(todaydate)

# def Weather(request):
#     try:
#         url = 'http://wthrcdn.etouch.cn/weather_mini'
#         cityname = request.GET.get('name')
#         #print(cityname)
#         response = requests.get(url, {'city': cityname})
#         result = json.loads(response.content.decode())
#         #print(result)
#         #print('city:', result.get('data').get('city'))
#         data = result.get('data').get('forecast')
#         #print(data)
#         for i in data:
#             #print(i.get('date'))
#             num_filter = filter(str.isdigit, i.get('date'))
#             num_list = list(num_filter)
#             num_str = "".join(num_list)
#             num_int = int(num_str)
#             #print(num_int)
#             #print(type(num_int))
#             #print(type(numtodaydate))
#             if num_int == numtodaydate:
#                 weatherdata = "城市: " + result.get('data').get('city'), "日期: " + i.get('date'), "最高温度: " + i.get('high'), "最低温度: " +  i.get('low'), "天气: " + i.get('type'), "风向: " + i.get('fengxiang'), "风力: " + i.get('fengli').replace('<![CDATA[', '').replace(']]>', '')
#                 #print(i.get('date'))
#                 #print(result.get('data').get('city'), i.get('date'), '\t', i.get('high'), '\t', i.get('low'), '\t', i.get('type'), '\t', i.get('fengxiang'), '\t',i.get('fengli').replace('<![CDATA[', '').replace(']]>', ''))
#         return JsonResponse({'status': '0','data': weatherdata})
#     except Exception:
#         return JsonResponse({'status': '1'})


# #paramiko远程密码连接
# import paramiko
# from sqlparse import cli
# #1、创建一个ssh对象
# client = paramiko.SSHClient()
# #2、规避问题：如果是之前没有连接过的IP，会出现要求选择“yes”或“no”的操作
# client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# #3、连接服务器
# client.connect(hostname='192.168.2.81',port=22,username='root',password='123456')
# #4、执行命令操作
# stdin,stdout,stderr = client.exec_command('hostname')
# #5、获取命令执行的结果并打印
# result = stdout.read().decode('utf-8')
# print(result)
# #6、整个操作完成之后，记得关闭连接
# client.close()

# #使用sftp上传文件
# import paramiko
# #1、获取transport实例
# tran = paramiko.Transport('192.168.2.81',22)
# #连接ssh服务端
# tran.connect(username='root',password='123456')
# #获取sftp实例
# sftp = paramiko.SFTPClient.from_transport(tran)
# #设置上传端本地、远程文件路径，注意远程文件路径需要指定文件名
# localpath = '/Users/zenglingmin/ai-referral-gray.txt'
# remotepath = '/opt/ai-referral-gray.txt'
# sftp.put(localpath,remotepath,callback=None,confirm=True)
# tran.close()

# #使用sftp下载文件方法01
# import paramiko
# #1、获取transport实例
# tran = paramiko.Transport('192.168.2.81',22)
# #连接ssh服务端
# tran.connect(username='root',password='123456')
# #获取sftp实例
# sftp = paramiko.SFTPClient.from_transport(tran)
# #设置上传端本地、远程文件路径，注意远程文件路径需要指定文件名
# 本地文件路径
# localpath = '/Users/zenglingmin/test111.txt'
# 远程存放路径
# remotepath = '/opt/test111.txt'
# 下载
# sftp.get(remotepath,localpath,callback=None)
# tran.close()

# #使用sftp下载文件方法02
# import paramiko
# #获取SSHClient实例
# client = paramiko.SSHClient()
# #规避连接陌生IP需要确认的问题
# client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# #连接ssh服务端
# client.connect(hostname='192.168.2.81',port=22,username='root',password='123456')
# #获取Transport实例
# tran = client.get_transport()
# #获取sftp实例
# sftp = paramiko.SFTPClient.from_transport(tran)
# #远程文件路径
# remotepath = '/opt/test111.txt'
# #本地存放路径,注意：需要指定文件名称
# localpath = '/Users/zenglingmin/test111.txt'
# #下载
# sftp.get(remotepath,localpath,callback=None)
# sftp.close()

# # 批量远程密码连接
# from paramiko.ssh_exception import NoValidConnectionsError
# from paramiko.ssh_exception import AuthenticationException


# def cmdconnect(cmd, hostname, port, username, passwd):
#     import paramiko
#     client = paramiko.SSHClient()
#     client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     try:
#         client.connect(hostname=hostname, port=port,
#                        username=username, password=passwd)
#         print('正在连接主机%s....... ' % (hostname))
#     except NoValidConnectionsError as e:
#         print('连接失败')
#     except AuthenticationException as t:
#         print('密码错误')
#     else:
#         stdin, stdout, stderr = client.exec_command(cmd)
#         result = stdout.read().decode('utf-8')
#         print(result)
#     finally:
#         client.close()
# with open('/Users/zenglingmin/ip.txt') as f:
#     for line in f:
#         lineline = line.strip()
#         # print(lineline.split(','))
#         uname, hostname, port, username, passwd = lineline.split(',')
#         #print(uname, hostname, port, username, passwd)
#         print(hostname.center(50, '*'))
#         cmdconnect(uname, hostname, port, username, passwd)

# # paramiko基于公钥密钥批量连接
# import paramiko
# import socket
# 导入连接异常和认证异常模块 
# from paramiko.ssh_exception import NoValidConnectionsError,AuthenticationException

# def cmdconnect(cmd,host,port=22,user='root'):
#     client = paramiko.SSHClient()
#     #需要将连接端“id_rsa.pub”公钥ssh-copd-id到被连接端，同时需要将被连接端的“id_rsa”密钥scp到连接端
#     private_key = paramiko.RSAKey.from_private_key_file('/Users/zenglingmin/Downloads/192_168_2_81_id_rsa')
#     client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     try:
#         client.connect(hostname=host,port=port,username=user,pkey=private_key,timeout=2)
#         stdin,stdout,stderr = client.exec_command(cmd)
#     except NoValidConnectionsError as e:
#         print('连接失败')
#     except AuthenticationException as f:
#         print('密码错误')
#         #用于处理socket timeout异常
#     except socket.timeout as g:
#         print('连接超时')
#     else:
#         result = stdout.read().decode('utf-8')
#         print(result)
#     finally:
#         client.close()
# for count in range(80,100):
#     host = '192.168.2.%s' %(count+1)
#     print(host.center(50,'*'))
#     cmdconnect('ls /opt',host)

# #基于密钥的上传和下载
# import paramiko
# #远端服务器的传给连接端的密钥
# private_key = paramiko.RSAKey.from_private_key_file('/Users/zenglingmin/Downloads/192_168_2_81_id_rsa')
# #获取Transport实例
# tran = paramiko.Transport('192.168.2.81',22)
# #连接ssh服务端
# tran.connect(username='root',pkey=private_key)
# #获取sftp实例
# sftp = paramiko.SFTPClient.from_transport(tran)
# #远程文件路径
# remotepath = '/opt/test111.txt'
# #本地文件路径
# localpath = '/Users/zenglingmin/test111.txt'
# #下载
# #sftp.get(remotepath,localpath)
# #上传
# sftp.put(localpath,remotepath)


# #paramiko再封装
# import os
# import paramiko
# # 导入连接异常、认证异常及ssh异常模块
# from paramiko.ssh_exception import NoValidConnectionsError,AuthenticationException,SSHException
# class SshRemoteHost(object):
#     def __init__(self,hostname,port,user,passwd,cmd):
#         self.hostname = hostname
#         self.port = port
#         self.user = user
#         self.passwd = passwd
#         self.cmd = cmd
#     def run(self):
#         """默认能调用的命令""" 
#         # cmd hostname
#         # put 
#         # get
#         #获取调用的命令
#         cmd_str = self.cmd.split()[0]
#         # 类的反射，判断类里面是否可以支持该操作
#         if hasattr(self, 'do_' + cmd_str):
#                 getattr(self, 'do_' + cmd_str)
#         else:
#             print('目前不支持该功能')
#     def do_cmd(self):
#         client = paramiko.SSHClient()
#         client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#         try:
#             client.connect(hostname=self.hostname,port=self.port,username=self.user,password=self.passwd)
#             print('正在连接%s......'%(self.hostname))
#         except NoValidConnectionsError as e:
#             print('连接异常')
#         except AuthenticationException as f:
#             print('密码错误')
#         else:
#             #执行操作
#             #取出输入的命令
#             cmd = ''.join(self.cmd.split()[1:])
#             stdin,stdout,stderr = client.exec_command(cmd)
#             result = stdout.read().decode('utf-8')
#             print(result)
#         finally:
#             client.close()
#     def do_put(self):
#         print('正在上传......')
#         try:
#             #获取Transport实例，注意：端口要是整形，而用split方法得到的是str，所以这里用int方法转换成整形
#             tran = paramiko.Transport(self.hostname,int(self.port))
#             #建立ssh连接
#             tran.connect(username=self.user,password=self.passwd)
#         except SSHException as e:
#             print('连接失败')
#         else:
#             #获取stfp实例
#             sftp = paramiko.SFTPClient.from_transport(tran)
#             #取出路径的数组，并生成本地文件路径和远程文件路径
#             newCmd = self.cmd.split()[1:]
#             if len(newCmd) == 2:
#                 localpath = newCmd[0]
#                 remotepath = newCmd[1]
#                 #执行上传动作
#                 sftp.put(localpath,remotepath)
#                 print('%s文件上传到%s主机的%s文件成功'%(localpath,self.hostname,remotepath))
#             else:
#                 print('文件上传信息错误')
#             tran.close()
#     def do_get(self):
#         print('正在下载......')
#         try:
#             tran = paramiko.Transport(self.hostname, int(self.port))
#             tran.connect(username=self.user,password=self.passwd)
#         except SSHException as e:
#             print('连接失败')
#         else:
#             sftp = paramiko.SFTPClient.from_transport(tran)
#             newCmd = self.cmd.split()[1:]
#             if len(newCmd) == 2:
#                 localpath = newCmd[1]
#                 remotepath = newCmd[0]
#                 #执行下载动作
#                 sftp.get(remotepath,localpath)
#                 print('%s主机的%s文件下载到%s成功'%(self.hostname,remotepath,localpath))
#             else:
#                 print('下载文件信息错误')
#                 tran.close()



# import paramiko
# import os
# #在本地定义并选择操作的主机组
# groups = [file.rstrip('.conf') for file in os.listdir('/Users/zenglingmin/Downloads/pythontest-conf')]
# print(groups)
# print('主机组显示：'.center(50,'*'))
# for group in groups:
#     print('\t',group)
# choiceGroup = input('选择批量操作的主机组(eg:mysql):')
# #根据选择的主机组，显示包含的主机IP/主机名
# #1）打开存放主机名单的文件，显示主机IP/主机名
# #2）逐行读取
# #3）讲行合并成数组，便于后边逐个取出使用
# print('主机组包含的主机：'.center(50,'*'))
# with open('/Users/zenglingmin/Downloads/pythontest-conf/%s.conf' % (choiceGroup)) as f:
#     for line in f:
#         print(line.split(':')[0])
#     #把指针移动到文件最开始的位置
#     f.seek(0,0)
#         #hostinfos = line.strip()
#     hostinfos = [line.strip() for line in f.readlines()]
#     # print(hostinfos)
# #让用户确认信息，输入需要批量执行的操作
# print('批量执行脚本'.center(50,'*'))
# while True:
#     print('请输入操作命令（put是上传、get是下载，需要指定本地和远程文件的路径）')
#     cmd = input('>>:').strip()
#     if cmd == 'exit' or cmd == 'quit':
#         print('执行完毕，正在退出')
#         break
#     for info in hostinfos:
#         host,port,user,passwd = info.split(':')
#         clientObj = SshRemoteHost(host,port,user,passwd,cmd)
#         clientObj.run()
#         clientObj.do_cmd()
#         #根据输入来判断是上传还是下载
#         if cmd.split()[0] == "get":
#             clientObj.do_get()
#         if cmd.split()[0] == "put":
#             clientObj.do_put()
            


# #获取命令执行结果
# import os
# cmdcmd = os.popen('ls')
# print('读取cmd执行的结果为：\n' + cmdcmd.read())

#python调用Jenkins API。要先安装python-jenkins模块
# import jenkinsapi
# server = jenkins.Jenkins('https://jenkins-dev.pushplus.cn',username='dev',password='Jiatui@Jenkins')
# server.build_job('1.architect-arch-probe-behind',{'XBUILD_TEAM':'architect','XBUILD_DEPLOY':'arch-probe-behind','XBUILD_FEATURE':'','XBUILD_REPO':'git@git.jiatuiyun.net:architect/arch-probe-behind.git','XBUILD_BRANCH':'master','XBUILD_VERSION':'49','XBUILD_DP_BUILD_ID':'11808','XBUILD_SCHEME':'scheme','XBUILD_PROJECT_TYPE':'1','XBUILD_HARBOR_URL':'https://harbor.jiatuiyun.net/','XBUILD_HARBOR_CREDENTIALS_ID':'Harbor'})

# import requests
# import urllib.parse

# url = 'https://git.jiatuiyun.net'
# url = urllib.parse.urljoin(url,'/api/v4/projects')
# params = {
#     'private_token': 'uWzzxwh5L45rso1vnk6K',
# }
# data = requests.get(url,params)
# print(data.json)



# #python调用gitlab API
# import gitlab
# url = 'https://git.jiatuiyun.net'
# #gitlab 10.2版本后取消了private token，换成了access token
# private_token = 'uWzzxwh5L45rso1vnk6K'
# #从 GitLab 9.0 开始，v4 是首选版本；从 GitLab 9.5开始，v3不再支持
# gl = gitlab.Gitlab(url,private_token,api_version='4')
# #print(gl.projects.list())
# project_id = '1517'
# project = gl.projects.get(project_id)
# # print(project)
# # print("project.attributes['id']", project.attributes['id'])
# print('项目名：',project.attributes['name'])
# print('项目名：',project.name)
# print('项目id：',project.attributes['id'])
# print('项目id：',project.id)
# print('项目描述信息：',project.attributes['description'])
# print('项目归属：',project.attributes['name_with_namespace'])
# print('项目路径：',project.attributes['path'])
# print('项目路径：',project.path)
# print('项目创建时间：',project.attributes['created_at'])
# print('默认分支：',project.attributes['default_branch'])
# print('tag列表：',project.attributes['tag_list'])
# print('项目仓库ssh地址：',project.attributes['ssh_url_to_repo'])
# print('项目仓库http地址：',project.attributes['http_url_to_repo'])
# print('项目访问地址：',project.attributes['web_url'])
# print("项目star数量", project.star_count)
# print("项目被fork次数", project.forks_count)
# print("项目最近更新时间", project.last_activity_at)
# print("项目namespace情况", project.namespace)

# print("project.attributes['members'] ", project.members)

# print("project.attributes['archived'] ", project.archived)
# print("project.attributes['visibility'] ", project.visibility)
# print("project.attributes['resolve_outdated_diff_discussions'] ", project.resolve_outdated_diff_discussions)
# print("project.attributes['container_registry_enabled'] ", project.container_registry_enabled)
# print("project.attributes['issues_enabled'] ", project.issues_enabled)

# print("project.attributes['merge_requests_enabled'] ", project.merge_requests_enabled)
# print("project.attributes['wiki_enabled'] ", project.wiki_enabled)
# print("project.attributes['jobs_enabled'] ", project.jobs_enabled)
# print("project.attributes['snippets_enabled'] ", project.snippets_enabled)
# print("project.attributes['shared_runners_enabled'] ", project.shared_runners_enabled)
# print("project.attributes['lfs_enabled'] ", project.lfs_enabled)

# print("project.attributes['creator_id'] ", project.creator_id)
# print("project.attributes['import_status'] ", project.import_status)
# print("project.attributes['import_error'] ", project.import_error)
# print("project.attributes['open_issues_count'] ", project.open_issues_count)
# print("project.attributes['runners_token'] ", project.runners_token)
# print("project.attributes['public_jobs'] ", project.public_jobs)
# print("project.attributes['ci_config_path'] ", project.ci_config_path)
# print("project.attributes['shared_with_groups'] ", project.shared_with_groups)
# print("project.attributes['only_allow_merge_if_pipeline_succeeds'] ", project.only_allow_merge_if_pipeline_succeeds)
# print("project.attributes['request_access_enabled'] ", project.request_access_enabled)
# print("project.attributes['only_allow_merge_if_all_discussions_are_resolved'] ", project.only_allow_merge_if_all_discussions_are_resolved)
# print("project.attributes['project'] ", project.printing_merge_request_link_enabled)
# print("project.attributes['merge_method'] ", project.merge_method)
# print("project.attributes['permissions'] ", project.permissions)



# #python3实现爬取简书首页文章标题和文章链接
# from urllib import request
# #Beautiful Soup是一个可以从HTML或XML文件中提取结构化数据的Python库
# from bs4 import BeautifulSoup
# #构造头文件，模拟浏览器访问
# url = 'http://www.jianshu.com'
# headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'}
# page = request.Request(url,headers=headers)
# #打开URL，获取HttpResponseBody
# page_info = request.urlopen(page).read().decode('utf-8')
# #将获取到的数据转换成BeautifulSoup格式，并将html.parser作为解析器
# soup = BeautifulSoup(page_info,'html.parser')
# #以格式化的形势打印html
# # print(soup.prettify())
# #查找所有a标签中class='title'的语句
# titles = soup.find_all('a','title')
# #print(titles)
# with open(r"/Users/zenglingmin/Downloads/my-python/python-script/test01.txt",'w') as file:
#     for title in titles:
#         #打印查找的的每一个a标签的标题
#         # print(title.string)
#         file.write(title.string+'\n')
#         file.write(url + title.get('href') + '\n\n')
#         # print(title.get('href'))
#         #打印查找到的每一个a标签的文章链接
#         print(url + title.get('href') + '\n\n')


######python操作redis
# #安装导入
# #pip3 install redis
# from redis import Redis,ConnectionPool

# #连接
# client = Redis(host='192.168.1.121',port=6379,password='zD6MovvH6XO4Hfg',db=0)
# redis_poll = ConnectionPool(host='192.168.1.121',port=6379,password='zD6MovvH6XO4Hfg',db=0,max_connections=16)

# #通用操作
# #查看当前数据库大小
# # print('dbsize',client.dbsize())

# #搜索key
# for key in client.scan_iter('846400679986987008_849015410799280128_132*'):
#     print(key)

# # #判断某个key是否存在，存在返回“1”，不存在返回“0”
# # print('exists',client.exists('846400679986987008_849015410799280128_132_carda'))
# # #删除key
# # print('delete',client.delete('846400679986987008_849015410799280128_132_carda'))
# # #获取key类型
# # print('type',client.type('846400679986987008_849015410799280128_132_card'))
# # #查询key的过期时间
# # print('ttl',client.ttl('846400679986987008_849015410799280128_132_card'))
# # #设置key的过期时间
# # print('expire',client.expire('846400679986987008_849015410799280128_132_card',97000))

# #操作字符串
# #字符串取值
# print('get',client.get('846400679986987008_849015410799280128_132_card'))
# # print('set',client.set('846400679986987008_849015410799280128_132_card','{"total":1,"yesterday":0,"beforeYesterday":0}'))
# #对key的值进行加减，默认是加1，负数表示减
# print('incr',client.incr('846400679986987008_849015410799280128_132_carda'))

# # #操作列表
# # #在列表左边添加一个值
# # print("lpush",client.lpush("list",0))
# # print("lpush",client.lpush("list",1))
# # #获取列表的长度
# # print("lpush",client.llen("list"))
# # #获取列表左边的10个元素
# # print("lrange",client.lrange("list",0,10))
# # #从列表右边弹出一个元素
# # print("rpop",client.rpop("list"))

# # #操作哈希
# # #在json赋值
# # print("hset",client.hset("json","key1","val1"))
# # #在json批量赋值
# # print("hmset",client.hmset("json",{"key2":"val2","key3":"val3"}))
# # #在json赋值(如果不存在)
# # print("hsetnx",client.hsetnx("json","key1","val1"))
# # #获取json指定key的值
# # print("hget",client.hget("json","key1"))
# # #获取json所有的内容
# # print("hgetall",client.hgetall("json"))
# # #获取json长度
# # print("hlen",client.hlen("json"))
# # #删除json中指定的key
# # print("hdel",client.hdel("json","key2"))

# # #操作集合
# # #集合赋值
# # print("sadd",client.sadd("set1","a","b","c"))
# # #获取集合所以内容
# # print("smembers",client.smembers("set1"))
# # #获取集合长度
# # print("scard",client.scard("set1"))
# # #判断元素是否在集合中
# # print("sismember",client.sismember("set1","a"))
# # #集合赋值
# # print("sadd",client.sadd("set2","a","b"))
# # #获取两个集合的交集
# # print("sinter",client.sinter("set1","set2"))

# # #操作有序集合
# # #有序集合赋值
# # print("sinter",client.zadd("zset1",{"aaa":90,"bbb":80,"ccc":85}))
# # #有序集合中指定元素分值加1
# # print("sinter",client.zincrby("zset1",1,"bbb"))
# # #获取10个有序集合的元素
# # print("zrange",client.zrange("zset1",0,10))
# # #获取有序集合中分值在100-80之间的元素，并按分值倒序
# # print("zrevrangebyscore",client.zrevrangebyscore("zset1",100,80,withscores=True))
# # #获取有序集合中分值在85-90之间的元素的个数
# # print("zcount",client.zcount("zset1",85,90))

PI = 3.14
def main():
    print("PI: ",PI)

if __name__ == "__main__":
    main()