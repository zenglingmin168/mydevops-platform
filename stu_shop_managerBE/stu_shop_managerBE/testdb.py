# -*- coding: utf-8 -*-
 
from django.http import HttpResponse, response
 
#from shopapp.models import Test01
 
# 数据库操作
def testdb(request):
    response = ''
    response1 = ''
    
    #list = Test01.objects.all()
    
    #list = Test01.objects.filter(id=2)

    #list = Test01.objects.get(id=2)
    #list = Test01.objects.order_by('name')[0:2]
    #list = Test01.objects.order_by("id")
    list = Test01.objects.filter(name="runoob").order_by("id")


    for var in list:
        response1 += var.name + " "
    response = response1
    return HttpResponse("<p>" + response + "</p>")

