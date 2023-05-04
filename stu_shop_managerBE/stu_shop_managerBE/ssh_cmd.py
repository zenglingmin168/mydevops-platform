# -*- encoding: utf-8 -*-
from django.http import HttpResponse
from django.http.response import JsonResponse
import paramiko
import traceback

#连接远程主机并执行命令
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
#     192.168.2.83
#     """
#     for ip in ips.split( ):
#         test1(ip, 22, "root", "123456", "pwd && if [ $? -ne 0 ];then echo '执行成功';fi")

def sshcmd(request):
  try:
    #data = None
    if request.method == 'POST':
        ips = request.POST.get('ip')
        ip = ips.split(',')
        port  = request.POST.get('port')
        username = request.POST.get('username')
        passwd = request.POST.get('passwd')
        cmd = request.POST.get('cmd')
        ssh = paramiko.SSHClient() #创建一个ssh对象
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  # 允许连接know_hosts中不存在的主机
        for sship in ip:
            ssh.connect(sship, port, username, passwd, timeout=5) # 连接服务器，其中timeout的是超时时间
            stdin, stdout, stderr = ssh.exec_command(cmd) # 执行命令，并获取结果
            data = stdout.read().decode('utf-8')
            print(data)  # 以utf-8编码对结果进行解码
            ssh.close() #关闭ssh
    #return JsonResponse({'status': 0, "data": data})
    return JsonResponse({'status': 0, "data": data})
  except Exception:
    return JsonResponse({'status':1, 'msg': '执行命令异常'})




