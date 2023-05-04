from unicodedata import name
import requests
import json
import datetime
from time import strftime
from django.http import HttpResponse
from django.http.response import JsonResponse

# now=datetime.datetime.now()
# todaydate = now.strftime('%d')
# numtodaydate = int(todaydate)
# #print(now.strftime("%d日"))
# #print(todaydate)

# #获取天气信息
# def getWeather(name):
#     url = 'http://wthrcdn.etouch.cn/weather_mini'
#     response = requests.get(url, {'city': name})
#     #print(response)
#     result = json.loads(response.content.decode())
#     print(result)
#     #print('city:', result.get('data').get('city'))
#     #data = result.get('data').get('yesterday')
#     #print(data.get('date'), '\t', data.get('high'), '\t', data.get('low'), '\t', data.get('type'), '\t', data.get('fx'), '\t',
#     #      data.get('fl').replace('<![CDATA[', '').replace(']]>', ''))
#     #data = result.get('data').get('forecast')
#     #print(data)
#     # for i in data:
#     #     #print(i.get('date'))
#     #     num_filter = filter(str.isdigit, i.get('date'))
#     #     num_list = list(num_filter)
#     #     num_str = "".join(num_list)
#     #     num_int = int(num_str)
#     #     #print(num_int)
#     #     #print(type(num_int))
#     #     #print(type(numtodaydate))
#     #     if num_int == numtodaydate:
#     #         #print(i.get('date'))
#     #       print(result.get('data').get('city'), i.get('date'), '\t', i.get('high'), '\t', i.get('low'), '\t', i.get('type'), '\t', i.get('fengxiang'), '\t',i.get('fengli').replace('<![CDATA[', '').replace(']]>', ''))


# if __name__ == '__main__':
#    print(getWeather('深圳'))
#    #getWeather(name)

#获取天气信息
now=datetime.datetime.now()
todaydate = now.strftime('%d')
numtodaydate = int(todaydate)

def Weather(request):
    try:
        url = 'http://wthrcdn.etouch.cn/weather_mini'
        cityname = request.GET.get('name')
        #print(cityname)
        response = requests.get(url, {'city': cityname})
        result = json.loads(response.content.decode())
        #print(result)
        #print('city:', result.get('data').get('city'))
        data = result.get('data').get('forecast')
        #print(data)
        for i in data:
            #print(i.get('date'))
            num_filter = filter(str.isdigit, i.get('date'))
            # 取出字符串里的数字
            num_list = list(num_filter)
            num_str = "".join(num_list)
            num_int = int(num_str)
            #print(num_int)
            #print(type(num_int))
            #print(type(numtodaydate))
            if num_int == numtodaydate:
                weatherdata = "城市: " + result.get('data').get('city'), "日期: " + i.get('date'), "最高温度: " + i.get('high'), "最低温度: " +  i.get('low'), "天气: " + i.get('type'), "风向: " + i.get('fengxiang'), "风力: " + i.get('fengli').replace('<![CDATA[', '').replace(']]>', '')
                #print(i.get('date'))
                #print(result.get('data').get('city'), i.get('date'), '\t', i.get('high'), '\t', i.get('low'), '\t', i.get('type'), '\t', i.get('fengxiang'), '\t',i.get('fengli').replace('<![CDATA[', '').replace(']]>', '')) 
        return JsonResponse({'status': '0','data': weatherdata})
    except Exception:
        return JsonResponse({'status': '1'})