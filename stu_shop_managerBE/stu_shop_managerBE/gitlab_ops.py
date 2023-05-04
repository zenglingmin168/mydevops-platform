# from turtle import st
from ntpath import join
from symbol import with_item
from urllib.request import Request
from django.http import JsonResponse
import gitlab
from jenkinsapi import result
from pandas import wide_to_long
import requests

def search_huidu(request):
    try:
        gitlaburl = "https://arch-gitlab.aijiatui.com/"
        gitlabtoken = "Pj85xMQxyhDFumDFFYg4"
        gitlaborg = "root"
        project_name = 'prodconfig-company-k8s'

        gl = gitlab.Gitlab(gitlaburl,gitlabtoken,api_version='4')
        # print(gl)
        project = gl.projects.get(gitlaborg + '/' + project_name)
        # print(project)
        git_path = "teamenv/gatewayzuul.yml"
        f = project.files.get(file_path=git_path,ref='master')
        #print(f)
        file_content01 = f.decode()
        file_content = file_content01.decode()
        company_id = request.GET.get('companyid')
        # print(type(company_id))
        if company_id  in file_content:
            return JsonResponse({'status':'0','msg':'企业在灰度'})
        else:
            return JsonResponse({'status':'1','msg':'企业不在灰度'})
    except Exception as e:
        return JsonResponse({'status':"1","msg": e})

#在匹配的位置后添加行，如下是在以“  companyIdToIzoneStr”开头的行后添加内容为“hello”的行
import fileinput
import os

def huidu_up(request):
    try:
        companyID = request.GET.get('companyid')
        # izone = request.GET.get('i_zone')
        processing_fools = False
        # for line in fileinput.input('/Users/zenglingmin/Downloads/222.txt',inplace=True):
        #测试环境
        # for line in fileinput.input('/Users/zenglingmin/Downloads/service-config-test-ms-refactor/teamenv/gatewayzuul.yml',inplace=True):
        #生产环境
        #先拉取最新的配置
        os.system("cd /Users/zenglingmin/Downloads/prodconfig-company-k8s && git pull")
        for line in fileinput.input('/Users/zenglingmin/Downloads/prodconfig-company-k8s/teamenv/gatewayzuul.yml',inplace=True):
            if line.startswith('  companyIdToIzoneStr'):
                processing_fools = True
            else:
                if processing_fools:
                    # print('    ' + companyID + '=' + izone + ',')
                    # 测试环境
                    # print('    ' + companyID + '=luna,')
                    # 生产环境
                    print('    ' + companyID.strip() + '=gray,')
                processing_fools = False
            print(line,end='')
        fileinput.close()
        #测试环境
        # val = os.system("cd /Users/zenglingmin/Downloads/service-config-test-ms-refactor && git add . && git commit -m '灰度变更' && git push && curl -H 'Content-Type: application/json' -X POST  'https://test.aijiatui.com/gateway-zuul/actuator/refresh'")
        #生产环境
        os.system("cd /Users/zenglingmin/Downloads/prodconfig-company-k8s && git add . && git commit -m '灰度变更' && git push && sh /Users/zenglingmin/Downloads/mydp/mydevops-platform/stu_shop_managerBE/flush_gateway.sh")
        # os.system("cd /Users/zenglingmin/Downloads/prodconfig-company-k8s && git add . && git commit -m '灰度变更' && git push")
        return JsonResponse({'status':'0','msg':'添加灰度成功！'})
    except Exception as e:
        return JsonResponse({'status':'1','msg':'添加灰度失败！'})



# #将匹配到的字符串替换成新的字符串
# def alter(file,old_str,new_str):
#     file_data = ""
#     with open(file,"r",encoding="utf-8") as f:
#         for line in f:
#             if old_str in line:
#                 line = line.replace(old_str,new_str)
#             file_data += line
#     with open(file,"w",encoding="utf-8") as f:
#         f.write(file_data)

# alter('/Users/zenglingmin/Downloads/222.txt','hello','haha')


#删除匹配的行，可以是部分匹配，也可以是全部匹配
import re
import os

def huidu_down(request):
    try:
        companyID = request.GET.get('companyid')
        lineList = []
        matchPattern = re.compile(companyID)
        # file = open('/Users/zenglingmin/Downloads/222.txt','r',encoding='utf-8')
        # 测试环境
        # file = open('/Users/zenglingmin/Downloads/service-config-test-ms-refactor/teamenv/gatewayzuul.yml','r',encoding='utf-8')
        # 生产环境
        #先拉取最新的配置
        os.system("cd /Users/zenglingmin/Downloads/prodconfig-company-k8s && git pull")
        file = open('/Users/zenglingmin/Downloads/prodconfig-company-k8s/teamenv/gatewayzuul.yml','r',encoding='utf-8')
        while 1:
            line = file.readline()
            if not line:
                # print("Read file End or Error")
                break
            elif matchPattern.search(line):
                pass
            else:
                lineList.append(line)
        file.close()
        # file = open(r'/Users/zenglingmin/Downloads/222.txt.bak','w',encoding='utf-8')
        #测试环境
        # file = open(r'/Users/zenglingmin/Downloads/service-config-test-ms-refactor/teamenv/gatewayzuul.yml.bak','w',encoding='utf-8')
        # 生产环境
        file = open(r'/Users/zenglingmin/Downloads/prodconfig-company-k8s/teamenv/gatewayzuul.yml.bak','w',encoding='utf-8')
        for i in lineList:
            file.write(i)
        file.close()
        # os.rename('/Users/zenglingmin/Downloads/222.txt.bak','/Users/zenglingmin/Downloads/222.txt')
        # 测试环境
        # os.rename('/Users/zenglingmin/Downloads/service-config-test-ms-refactor/teamenv/gatewayzuul.yml.bak','/Users/zenglingmin/Downloads/service-config-test-ms-refactor/teamenv/gatewayzuul.yml')
        # val = os.system("cd /Users/zenglingmin/Downloads/service-config-test-ms-refactor && git add . && git commit -m '灰度变更' && git push && curl -H 'Content-Type: application/json' -X POST  'https://test.aijiatui.com/gateway-zuul/actuator/refresh'")
        # 生产环境
        os.rename('/Users/zenglingmin/Downloads/prodconfig-company-k8s/teamenv/gatewayzuul.yml.bak','/Users/zenglingmin/Downloads/prodconfig-company-k8s/teamenv/gatewayzuul.yml')
        os.system("cd /Users/zenglingmin/Downloads/prodconfig-company-k8s && git add . && git commit -m '灰度变更' && git push && sh /Users/zenglingmin/Downloads/mydp/mydevops-platform/stu_shop_managerBE/flush_gateway.sh")
        return JsonResponse({'status':'0','msg':'取消灰度成功！'})
    except Exception as e:
        return JsonResponse({'status':'1','msg':'取消灰度失败！'})

# # 基于密钥远程主机并执行命令
# import paramiko

# key = paramiko.RSAKey.from_private_key_file("/Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key")
# ssh = paramiko.SSHClient()
# ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# print("connecting")
# ssh.connect(hostname="172.16.16.83",port=1876,username="serveradm", pkey=key)
# print("connected")
# # commands = "ls /opt/data/sdklogs/"
# commands = "curl -H 'Content-Type: application/json' -X POST  'http://10.83.48.154/actuator/refresh'"
# stdin, stdout, stderr = ssh.exec_command(commands)
# stdin.close()
# res, err= stdout.read(), stderr.read()
# result= res if res else err
# print(result)
# ssh.close()

# import os
# import re
# import pandas as pd
# # def huidu_all(request):
# # Specific = request.GET.get('specific')
# # Specific ='gray'
# linelist = []
# matchPattern =  re.compile('gray')
# # os.system('cd /Users/zenglingmin/Downloads/prodconfig-company-k8s && git pull')
# file01 = open('/Users/zenglingmin/Downloads/222.txt','r',encoding='utf-8')
# while 1:
#     line = file01.readline()
#     if not line:
#         break
#     elif matchPattern.search(line):
#         linelist.append(line)
#     else:
#         pass
# file01.close()
# print(linelist)

# file02 = open('/Users/zenglingmin/Downloads/222.txt.bak','w',encoding='utf-8')
# for i in linelist:
#     if i == '    xx=gray,\n' or i == '    x-0=gray,\n' or i == '    183.46.9.3=gray,\n' or i == '    14.150.39.26=gray,\n' or i == '    14.26.75.177=gray,':
#         pass
#     else:
#         num1 = i.lstrip()
#         file02.write(num1)
# file02.close()

# file03 = open('/Users/zenglingmin/Downloads/222.txt.bak','r',encoding='utf-8')
# aa = file03.read()
# file04 = open('/Users/zenglingmin/Downloads/222.txt.bak.bak','a',encoding='utf-8')
# l1 = aa.split('=gray,')
# for i in l1:
#     file04.write(i)
# file04.close()

# 展示所有灰度企业
import re

def get_allhuidu(request):
    try:
        file = open('/Users/zenglingmin/Downloads/222.txt.bak','w',encoding='utf-8')
        with open('/Users/zenglingmin/Downloads/222.txt') as f:
            read_txt = f.read()
        re_txt = re.findall("[0-9][0-9][0-9][0-9]+",read_txt)
        for i in re_txt:
            file.write(i + '\n')
        return JsonResponse({'status':'0','msg':re_txt})
    except Exception as e:
        return JsonResponse({'status':'1','msg':'获取所以灰度企业信息异常'})
# print(re_txt)