# import os
# from sys import stderr, stdin
# from jenkinsapi import result
# import paramiko
# from sqlparse import cli

# client = paramiko.SSHClient()
# client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# client.connect(hostname='192.168.2.55',port=22,username='root',password='123456')
# # result = os.popen('ls /Users/zenglingmin|grep txt').readlines()
# # result1 = os.system('scp -P1876 -i /Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key /Users/zenglingmin/test222.txt serveradm@172.16.16.96:/opt/data/txt/')
# # result2 = os.system("sed -i 's#location =/ccc#location =/ddd#' newadd.txt")
# # result3 = os.system("sed '/check/r newadd.txt' test.txt")
# client.exec_command("sed -i 's#location =/ccc#location =/ddd#' newadd.txt")

# # result = stdout.read().decode('utf-8')
# client.exec_command("sed -i '/check/r /root/newadd.txt' /root/test.txt")
# # print(result)


# from asyncio import transports
# from sys import stderr, stdin, stdout
# import paramiko
# import os
# filename = 'bbbb.txt'
# os.popen('cp flush_nginx_template.txt flush_nginx.txt')
# os.system("sed -i 's#location =/template.txt#location =/filename#' flush_nginx.txt")
# private_key = paramiko.RSAKey.from_private_key_file('/Users/zenglingmin/.ssh/172.16.16.96.id_rsa')
# private_key = paramiko.RSAKey.from_private_key_file('/Users/zenglingmin/Downloads/qcloud_serveradm_default_new.key')
# ssh = paramiko.SSHClient()
# ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# ssh.connect(hostname='172.16.16.96',port=1876,username='serveradm',pkey=private_key,timeout=30)
# stdin,stdout,stderr = ssh.exec_command('sudo nginx -s reload')
# stdin.close()
# result = stdout.read().decode('utf-8')
# print(result)
# ssh.close()
# tran = paramiko.Transport(('172.16.16.96',1876))
# tran.connect(username='serveradm', pkey=private_key)
# sftp = paramiko.SFTPClient.from_transport(tran)
# remotepath = '/opt/data/txt/test222.txt'
# localpath = '/Users/zenglingmin/test222.txt'
# sftp.put(localpath,remotepath)
# tran.close()

# # 使用sh模块操作远程主机
# from sh import ssh
# my_server = ssh.bake("serveradm@172.16.16.96","-p 1876")
# print(my_server.ls())

# 根据传入的验证文件更新配置文件，并发送到远程服务器
from urllib.request import Request
from django.http import JsonResponse
import paramiko
import os
# fileinput模块提供处理一个或多个文本文件的功能，可以通过使用for循环来读取一个或多个文本文件的所有行
import fileinput

def update_scp_filename(request):
    try:
        # filename = '11111.txt'
        # 获取校验文件的名字
        fileName = request.GET.get('filename')
        processing_fools = False
        # 逐行读取文件内容，并根据条件进行更新
        for line in fileinput.input('/Users/zenglingmin/Downloads/mydp/mydevops-platform/flush_nginx.txt',inplace=True):
            # 匹配“    #check”的行
            if line.startswith('    #check'):
                processing_fools = True
            else:
                if processing_fools:
                    # 在匹配的行后添加如下三行内容
                    print('    location =/' + fileName + ' {')
                    print('      root /opt/txt;')
                    print('    }')
                processing_fools = False
            # 去除每一行换行后多出来的空行
            print(line,end='')
        fileinput.close()
        #拷贝文件到远程服务器，执行结果会输出到命令窗口
        # os.system('scp /Users/zenglingmin/Downloads/mydp/mydevops-platform/flush_nginx.txt root@192.168.2.55://etc/nginx/conf.d/')
        # 拷贝文件到远程服务器，执行结果不会输出到命令窗口
        os.popen('scp /Users/zenglingmin/Downloads/mydp/mydevops-platform/flush_nginx.txt root@192.168.2.55://etc/nginx/conf.d/')
        return JsonResponse({'status': '0'})
    except Exception as e:
        return JsonResponse({"status": '1', 'msg': e})


#刷新配置（让服务重新加载配置文件）
def flush_config(request):
    try:
        # 获取连接远程服务器的私钥文件，“id_rsa” 和 连接云服务器常用的 “*.key” 文件的都可以
        private_key = paramiko.RSAKey.from_private_key_file('/Users/zenglingmin/.ssh/192_168_2_55_id_rsa')
        sshconn = paramiko.SSHClient()
        # 当首次连接远程服务器时需要输入“yes”进行确认，该步骤相当于自动确认
        sshconn.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        # 建立远程连接
        sshconn.connect(hostname='192.168.2.55',port=22,username='root',pkey=private_key,timeout=30)
        # 在远程服务器执行命令
        stdin,stdout,stderr = sshconn.exec_command('nginx -t && nginx -s reload')
        stdin.close()
        # 获取结果进行并解码
        result = stdout.read().decode('utf-8')
        print(result)
        sshconn.close()
        return JsonResponse({'status': '0'})
    except Exception as e:
        return JsonResponse({'status': '1', 'msg': e})