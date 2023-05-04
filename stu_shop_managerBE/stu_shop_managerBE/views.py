from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.contrib import auth
#from django.contrib.auth import login,authenticate,logout
from django.http import HttpResponseRedirect
import json
#导入随机数即字符串相关模块
import random
import string

##
import requests
import re
import time
from bs4 import BeautifulSoup
import pandas as pd

#引入category001的类
from shopapp.models import Category
from shopapp.models import Roles
from shopapp.models import Users

#def hello(request):
#    return HttpResponse('hello world!')


def runoob(request):
    views_name = ['菜鸟教程1','菜鸟教程2','菜鸟教程3']
    return render(request,'runoob.html',{'view_list': views_name})

def login_view(request):
  username = request.POST.get('username', 'admin')
  password = request.POST.get('password', '')
  user = authenticate(username=username, password=password)
  if user is not None:
    # Correct password, and the user is marked "active"
    login(request, user)
    # Redirect to a success page.
    return HttpResponseRedirect("runoob/")
  else:
    # Show an error page
    return HttpResponseRedirect("hello/")

#登陆视图
#def login(request):
    #return render(request,'login.html')
#    return render(request,'helloworld!!!!')

#登陆校验视图
def login(request):
    #print(request)
    #print(request.method)
    #print(request.POST)
    if request.method == 'POST':
        #成功时返回的数据
        dic1 = {'status':0,
        'data':{
            '_id':'5677fjageihrk1',
            'username':'admin',
            'password':'fhklahdlfal57523757',
            'create_time':'1554629355811',
            '__v':'0',
            'role':{
                'menus': []
            }
          }
        }
        dic1 = json.dumps(dic1)
        #失败时返回的数据
        dic2 = {'status':1,'msg':'用户名或密码不正确'}
        dic2 = json.dumps(dic2)
        if request.POST:            
            #步骤逻辑
            #1.获取提交的用户名和密码
            #request.POST 保存的是post方式提交的参数，数据类型为QueryDict
            #request.GET 保存的是get方式提交的参数，数据类型为QueryDict
            username = request.POST.get('username')
            password = request.POST.get('password')
            #print(username + ':' + password)
            #2.进行登陆校验并根据校验结果返回应答
            #此处模拟，数据写死，实际开发中，应该是和数据库中的数据进行比对
            if username == 'admin' and password == '123456':
                #用户名、密码正确，跳转到首页
                #return redirect('runoob/')
                return HttpResponse(dic1)
            else:
                #用户名、密码错误，跳转到登陆页
                #return redirect('login/')
                return HttpResponse(dic2)

# 定义功能
def add_args(a, b):
 return a+b
  
# 接口函数
def post(request):
 if request.method == 'POST': # 当提交表单时
  dic={}
  # 判断是否传参
  if request.POST:
   a= request.POST.get('a', 0)
   b = request.POST.get('b', 0)
   # 判断参数中是否含有a和b
   if a and b:
    res = add_args(a, b)
    dic['number'] = res
    dic = json.dumps(dic)
    return HttpResponse(dic)
   else:
    return HttpResponse('输入错误')
  else:
   return HttpResponse('输入为空')
  
 else:
  return HttpResponse('方法错误')

#查询商品列表函数
def category_list(request):
  #获取所有商品的信息
  try:
    #print(request)
    parentid = request.GET.get('parentId')
    Obj_categorys = Category.objects.filter(parentId=parentid).values()
    categorys = list(Obj_categorys)
    return JsonResponse({'status':0,'data':categorys})
  except Exception as e:
    return JsonResponse({'status':1,'msg':'获取商品信息异常'})

#添加商品函数
def category_add(request):
  if request.method == 'POST':
    # 从a-zA-Z0-9自动生成指定数量的随机字符，作为category_id字段的值
    ranstr = ''.join(random.sample(string.ascii_letters + string.digits,10))
    categoryName = request.POST.get('categoryName')
    parentId = request.POST.get('parentId')
    categoryadd = Category(name=categoryName,parentId=parentId,category_id=ranstr)
    categoryadd.save()
    Obj_categorys = Category.objects.filter(category_id=ranstr).values()
    categorys = list(Obj_categorys)
    return JsonResponse({'status':0,'data':categorys})

#更新商品信息函数
def category_update(request):
  if request.method == 'POST':
    categoryId = request.POST.get('categoryId')
    categoryName = request.POST.get('categoryName')
    Obj_categorys = Category.objects.get(category_id=categoryId)
    Obj_categorys.name = categoryName
    Obj_categorys.save()
    return JsonResponse({'status':0})

#删除商品信息函数
def category_delete(request):
  try:
    if request.method == "POST":
      categoryId = request.POST.get('categoryId')
      #Obj_categorys = Category.objects.filter(category_id=categoryId).delete()
      Obj_categorys = Category.objects.filter(category_id=categoryId)
      Obj_categorys.delete()
      categorys = list(Obj_categorys)
      return JsonResponse({'status':0})
  except Exception as e:
    return JsonResponse({'status':1,'msg':'删除商品信息异常'})

# 删除角色
def delete_role(request):
  try:
    if request.method == "POST":
      roleId = request.POST.get('roleId')
      print(roleId)
      Obj_role = Roles.objects.get(role_id=roleId)
      Obj_role.delete()
      return JsonResponse({"status": "0"})
  except Exception as e:
    return JsonResponse({"status": "1", "msg": '删除角色异常'})

#获取角色列表函数
def roles_list(request):
  try:
    Obj_roles = Roles.objects.all().values()
    roles = list(Obj_roles)
    #return JsonResponse({'status':'0','data':roles})
    for i in roles:
      result = i['menus']
      i['menus'] = result.split(',')
    return JsonResponse({'status':'0','data':roles})
  except Exception as e:
    return JsonResponse({'status':'1','msg': '获取角色列表异常'})

#添加角色函数
def add_role(request):
  try:
    if request.method == 'POST':
      # 从a-zA-Z0-9自动生成指定数量的随机字符，作为role_id字段的值
      ranstr = ''.join(random.sample(string.ascii_letters + string.digits,10))
      roleName = request.POST.get('roleName')
      createTime = request.POST.get('create_time')
      roleadd = Roles(name=roleName,role_id=ranstr,create_time=createTime)
      roleadd.save()
      Obj_role = Roles.objects.filter(role_id=ranstr).values()
      newrole = list(Obj_role)
      return JsonResponse({'status':'0','data':newrole}) 
  except Exception as e:
    return JsonResponse({'status':'1','msg':'添加角色异常'})

#获取用户列表函数
def users_list(request):
  try:
    Obj_users = Users.objects.all().values()
    users = list(Obj_users)
    return JsonResponse({'status':'0','data':users})
  except Exception as e:
    return JsonResponse({'status':'1','msg':'获取用户列表异常'})

#修改角色
def update_role(request):
  try:
    if request.method == 'POST':
      roleId = request.POST.get('roleId')
      menus = request.POST.get('menus')
      auth_name = request.POST.get('auth_name')
      auth_time = request.POST.get('auth_time')
      Obj_role = Roles.objects.get(role_id=roleId)
      Obj_role.menus = menus
      Obj_role.auth_name = auth_name
      Obj_role.auth_time = auth_time
      #categoryadd = Roles(name=roleName,memus=memus,category_id=ranstr)
      Obj_role.save()
      Obj_roles = Roles.objects.filter(role_id=roleId).values()
      #menus转换成数组
      roles = list(Obj_roles)
      for i in roles:
        result = i['menus']
        i['menus'] = result.split(',')
      return JsonResponse({'status': 0,'data':roles})
  except Exception as e:
    return JsonResponse({'status':1, 'msg': '修改角色异常'})

# 删除角色
def delete_role(request):
  try:
    if request.method == "POST":
      roleId = request.POST.get('roleId')
      print(roleId)
      Obj_role = Roles.objects.get(role_id=roleId)
      Obj_role.delete()
      return JsonResponse({"status": "0"})
  except Exception as e:
    return JsonResponse({"status": "1", "msg": '删除角色异常'})


#获取天气信息
def getWeather(request):
    url = 'http://wthrcdn.etouch.cn/weather_mini'
    response = requests.get(url, {'city': name})
    result = json.loads(response.content.decode())
    #print(result)
    print('city:', result.get('data').get('city'))
    #data = result.get('data').get('yesterday')
    #print(data.get('date'), '\t', data.get('high'), '\t', data.get('low'), '\t', data.get('type'), '\t', data.get('fx'), '\t',
    #      data.get('fl').replace('<![CDATA[', '').replace(']]>', ''))
    data = result.get('data').get('forecast')
    print(data)
    for i in data:
        #print(i.get('date'))
        num_filter = filter(str.isdigit, i.get('date'))
        num_list = list(num_filter)
        num_str = "".join(num_list)
        num_int = int(num_str)
        #print(num_int)
        #print(type(num_int))
        #print(type(numtodaydate))
        if num_int == numtodaydate:
            #print(i.get('date'))
          print(i.get('date'), '\t', i.get('high'), '\t', i.get('low'), '\t', i.get('type'), '\t', i.get('fengxiang'), '\t',i.get('fengli').replace('<![CDATA[', '').replace(']]>', ''))


# if __name__ == '__main__':
#    print(getWeather('深圳'))