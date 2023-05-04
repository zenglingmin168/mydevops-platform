"""stu_shop_managerBE URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from stu_shop_managerBE import get_weather
from stu_shop_managerBE.testdb import testdb
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from . import views
from . import testdb
from .import ssh_cmd
from . import test02
from . import get_weather
from . import redis_key
from . import jianshu_url
from . import gitlab_ops
from . import yuming_check

urlpatterns = [
    path('admin/', admin.site.urls),
    url('hello/',views.post),
    url('runoob/',views.runoob),
    url('login/',views.login),
    url('manage/category/list/',views.category_list),        #商品列表
    url('manage/category/add/',views.category_add),          #新增商品
    url('manage/category/update/',views.category_update),    #更新商品信息
    url('manage/category/delete/',views.category_delete),    #删除商品信息
    url('manage/role/list/',views.roles_list),               #角色列表
    url('manage/role/add/',views.add_role),                  #添加角色
    url('manage/user/list/',views.users_list),               #用户列表
    url('manage/role/update/',views.update_role),            #修改角色
    url('manage/role/delete/',views.delete_role),            #删除角色
    url('sshcmd',ssh_cmd.sshcmd),                           #ssh远程主机并执行命令
    url('get_weather',get_weather.Weather),                  #获取天气信息
    url('get_web_url/',jianshu_url.get_jiashu_url),          #爬取网站文章标题和url
    url('key_is_exists',redis_key.key_is_exists),            #查询key是否存在
    url('search_huidu',gitlab_ops.search_huidu),             #查询灰度
    url('huidu_up',gitlab_ops.huidu_up),                     #添加灰度
    url('huidu_down',gitlab_ops.huidu_down),                 #取消灰度
    url('get_allhuidu',gitlab_ops.get_allhuidu),             #获取所以灰度企业信息
    url('update_scp_filename',yuming_check.update_scp_filename),    #更新并发送配置文件
    url('flush_config',yuming_check.flush_config),           #刷新配置
#    url('login_check/',views.login_check)
]
