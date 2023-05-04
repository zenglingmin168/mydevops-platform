# from calendar import c
# from ctypes.wintypes import HACCEL
# from datetime import datetime
# import json
# from sqlite3 import adapters
# from symbol import parameters
# import requests
# from requests.auth import HTTPBasicAuth
# from requests.adapters import HTTPAdapter
# from requests.packages.urllib3.util.retry import Retry
# import os
# import time
# import logging
# from logging.handlers import RotatingFileHandler

# class Harbor(object):
#     def __int__(self, api_url, api_user, api_passwd, tag_num, proj_exclude):
#         self.api_url = api_url
#         self.api_user = api_user
#         self.api_passwd = api_passwd
#         self.api_auth = HTTPBasicAuth(self.api_user, self.api_passwd)
#         self.tag_num = tag_num
#         self.proj_exclude = proj_exclude
#         self.proj_url = self.api_url + '/projects'
#         self.repos_url = self.api_url + '/repositories'
#         self.header_dict = {
#             'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36','Content-Type': 'application/x-www-form-urlencoded'
#         }
#         self.deldata = []
#         self.session = requests.Session()
#         self.session.auth = self.api_auth
#         retry = Retry(connect=3,backoff_factor=1)
#         adapter = HTTPAdapter(max_retries=retry)
#         self.session.mount('http://',adapter)
#         self.session.keep_alive = False

#     def soft_del_repos(self):
#         try:
#             projresp = self.session.get(url=self.proj_url,headers=self.header_dict)
#             if projresp.status_code == 200:
#                 projdata = projresp,json()
#                 for proj in projdata:
#                     if proj['name'] not in self.proj_exclude:
#                         try:
#                             resporesp = self.session.get(self.repos_url,params={'project_id': proj['project_id']}, headers=self.header_dict)
#                             if resporesp.status_code == 200:
#                                 repodata = resporesp.json()
#                                 for repo in repodata:
#                                     if repo['tags_count'] > self.tag_num:
#                                         tag_url = self.repos_url + "/" + repo['name'] + "/tags"
#                                         tags = self.session.get(tag_url).json()
#                                         tagdata = sorted(tags, key=lambda a:a['created'])
#                                         del_tags = tagdata[0: len(tagdata) - self.tag_num]
#                                         for tag in del_tags:
#                                             del_repo_tag_url = tag_url + '/' + tag['name']
#                                             cmd = 'curl -v -X DELETE -u "' + self.api_user + ":" + self.api_passwd + '" -H "accept: application/json"' + del_repo_tag_url
#                                             try:
#                                                 ok = os.system(cmd)
#                                                 if ok == 0:
#                                                     logging.info("httpdel:" + del_repo_tag_url )
#                                                     deldata = {"project_id": proj['project_id'], "project_name": proj['name'],"repo_name": tag['name']}
#                                                     print(deldata)
#                                                     self.deldata.append(deldata)
#                                                     logging.info("httpdel_project_id=" + str(proj['project_id']) + ",project_name=" + proj['name'] + ",repo_name=" + repo['name'] + ",tag_name=" + tag['name'])
#                                                 else:
#                                                     logging.error("exec_cmd fail:" + cmd)
#                                             except:
#                                                 logging.error("exec_cmd fail:" + cmd)
#                         except:
#                             logging.error("httpget fail:" + self.repos_url)
#             else:
#                 logging.error("httpget fail:" + self.repos_url)
#         except:
#             # logging.error("apilogin fail:" + self.api_url)
#             logging.error("apilogin fail:  haha")
#             # return self.deldata

#     def hard_del_repo(self):
#         # 进入到harbor安装目录
#         pwd_cmd = "cd /opt/harbor"    
#         # 停止harbor服务
#         stop_cmd = "docker-compose stop"
#         # 删除未被使用到镜像
#         del_cmd = 'docker run -it --name gc --rm --volumes-from registry goharbor/registry-photon:v2.7.1-patch-2819-v1.8.6 garbage-collect /etc/registryctl/config.yml'
#         # 启动harbor
#         start_cmd = "docker-compose start"
#         os.system(pwd_cmd)
#         ok1 = os.system(stop_cmd)
#         if ok1 == 0:
#             time.sleep(10)
#             ok2 = os.system(del_cmd)
#             ok3 = os.system(start_cmd)
#             if ok3 == 0:
#                 logging.info('hard_del_repo ok:')
#             else:
#                 logging.error('hard_del_repo fail:')
# if __name__ == "__main__":
#     Rthandler = RotatingFileHandler("harbor_repo_clear.log",maxBytes=10*1024*1024,backupCount=5)
#     logging.basicConfig(level=logging.INFO)
#     formatter = logging.Formatter('%(levelname)s %(asctime)s %(process)d %(thread)d %(pathname)s %(filename)s %(funcName)s[line: %(lineno)d] %(message)s')
#     Rthandler.setFormatter(formatter)
#     logging.getLogger('').addHandler(Rthandler)

# # Harbor服务的API URL
# api_url = 'https://192.168.2.55/api'
# # Harbor服务的超级管理员
# api_user = 'admin'
# # Harbor服务的超级管理员的密码
# api_passwd = 'Harbor12345'
# # 保留的tag数量
# tag_num = 20
# proj_exclude = ['library']
# harborClient = Harbor()
# data = harborClient.soft_del_repos()
# print(data)
# if data == '':
#     logging.info("hard_del_repo:")

from cgitb import reset
from fileinput import filename
from operator import itemgetter
from urllib import parse

import requests
import datetime as dt
import logging

logging.basicConfig(filename='harbor_clean.txt',filemode="w", level=logging.INFO)
logger = logging.getLogger(__name__)

class HarborCleaner(object):
    delete_status = {
        # 初始化状态码
        200: "Delete tag successfully.",    
        400: "Invalid repo_name.",
        401: "Unauthorized.",
        403: "Forbidden.",
        404: "Repository or tag not found.",
    }

    def __ini__(self,user: str, password: str, hostname: str, port: int, use_https: True):
        # 使用的协议
        scheme = "https" if use_https else "http"
        # 定义基础接口
        # API v1.0
        api_base = f"{scheme}://{hostname}:{port}/api/"
        # API v2.0
        # api_base = f"{scheme}://{hostname}:{port}/api/v2.0"
        # 查询接口
        self.search_api = api_base + "/search?q={key_word}"
        # 列出所有项目
        self.projects_api = api_base + "/projects"
        # 列出指定项目
        self.repository_query_api = api_base + "/repositories?project_id={project_id}"
        # 列出指定镜像的所有tags，“repo_name”一般为“project_name/repo_name”格式，必须做转义处理，因为中间有斜杆
        self.repository_tags_api = api_base + "/repositories/{repo_name}/tags"
        # 展示指定镜像指定tag的信息
        self.repository_tag_api = self.repository_tags_api + "/{tag}"

        self.session = requests.Session()
        # 如果使用的是自签名证书，不能通过SSL验证，就需要设置这个
        self.session.verify = False
        self.session.headers = {
            "Accept": "application/json"
        }
        self.session.auth(user,password)

    def get_all_projects(self):
        resp = self.session.get(self.projects_api)
        success = resp.status_code == 200
        return {
            "success": success,
            "data": resp.json() if success else resp.text
        }

    def get_all_repos(self, project: dict):
        url = self.repository_query_api.format(project_id=project['project_id'])
        resp = self.session.get(url)
        success = resp.status_code == 200
        return {
            "success": success,
            "data": resp.json() if success else resp.text
        }

    def get_all_tags(self,repo: dict):
        # repo_name需要做转义
        repo_name = parse.quote(repo['name'],safe='')
        url = self.repository_tags_api.format(repo_name=repo_name)
        resp = self.session.get(url)
        success = resp.status_code == 200
        return {
            "success": success,
            "data": resp.json() if success else resp.text
        }

    def get_tags_except_latest_n(self,repo: dict,n : int):
        # 获取除了最新的n个tag之外的所有tags
        # 如果tags数量少于等于n + 1，说明该镜像不需要做清理; +1是因为latest是重复的tag
        if repo['tags_count'] <= n+1:
            return []
        result = self.get_all_tags(repo)
        tags : list = result["data"]
        for tag in tags:
            # tag['time'] = maya.MayaDT.from_iso8601(tag['created'])

            # '2019-04-09T11:33:49.296960745Z'
            # # python 自带的解析函数，只能处理 6 位小数，下面截去多余的三位
            timestamp = tag['created'][:-4] + 'Z'
            tag['time'] = dt.datetime.strftime(timestamp,r'%Y-%m-%dT%H:%M:%S.%fZ')

        # 使用time键进行原地排序
        tags.sort(key=itemgetter('time'))
        # expect the latest n tags, -1 是因为 latest 是重复的 tag
        return tags[:-n-1]

    def soft_delete_tag(self, repo: dict, tag: dict):
        # repo_name需要做转义；这里删除后，还要进行一次GC，才能真正的清理出可用空间
        repo_name = parse.quote(repo['name'],safe='')
        url = self.repository_tag_api.format(repo_name=repo_name, tag=tag['name'])
        resp = self.session.delete(url)
        return {
            "success": resp.status_code == 200,
            "message": self.delete_status.get(resp.status_code)
        }

    def soft_delete_all_tags_except_latest_n(self, n):
        # 从每个仓库中删除除最新n个tags之外的所有tags
        res_projects = self.get_all_projects()
        if not res_projects['success']:
            logger.warning("faild to get all projects, message: {}".format(res_projects['data']))
        logger.info("we have {} projects".format(len(res_projects['data'])))
        for p in res_projects['data']:
            res_repos = self.get_all_projects(p)
            if not res_projects['success']:
                logger.warning("faild to get all repos in project: {}, message: {}".format(p['name'], res_repos['data']))
            logger.info("we hava {} repos in project:{}".format(len(res_repos['data']),p['name']))
            for repo in res_repos['data']:
                logger.info("deal with repo: {}".format(repo['name']))

                old_tags = self.get_tags_except_latest_n(repo, n)
                logger.info("we hava {} tags to delete in repo: {}".format(len(old_tags), repo['name']))
                for tag in old_tags:
                    logger.info("try to delete repo: {}, tag: {}, createtime: {}".format(repo['name'], tag['name'],tag['created']))
                    result = self.soft_delete_tag(repo, tag)
                    if result['success']:
                        logger.info("success delete it.")
                    else:
                        logger.warning("delete faild!, message: {}".format(result['message']))
if __name__ == "__main__":
    # 1. 通过harbor的restful api进行软删除
    harbor_cleaner = HarborCleaner(
        user = "admin",
        password = "Harbor12345",
        hostname = "192.168.2.55",
        port = "443"
    )
    # 每个镜像只保留最新的5个tag
    harbor_cleaner.soft_delete_all_tags_except_latest_n(5)

# 脚本执行完成后回收磁盘空间
# docker run -it --name gc --rm --volumes-from registry vmware/registry:2.6.2-photon garbage-collect  /etc/registry/config.yml


