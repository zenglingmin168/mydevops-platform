from urllib import request
#Beautiful Soup是一个可以从HTML或XML文件中提取结构化数据的Python库
from bs4 import BeautifulSoup
from parsel import Selector
import requests
import json

def get_jiashu_url(requesta):
    try:
    # if 1:
        #构造头文件，模拟浏览器访问
        url = requesta.GET.get('urlname')
        # url = 'http://www.jianshu.com'
        headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'}
        # print(url)
        #page = request.Request(url,headers=headers)
        page = requests.get(url, headers=headers)
        #print(page)
        #打开URL，获取HttpResponseBody
        # page_info = request.urlopen(page).read().decode('utf-8')
        page_info =page.text
        # print(page_info)
        #将获取到的数据转换成BeautifulSoup格式，并将html.parser作为解析器
        # soup = BeautifulSoup(page_info,'html.parser')
        #以格式化的形势打印html
        # print(soup.prettify())
        #查找所有a标签中class='title'的语句
        # titles = soup.find_all('a','title')
        titles = Selector(text=page_info).xpath('//a[@class="title"]')
        print(titles)

        with open(r"/Users/zenglingmin/Downloads/my-python/python-script/test01.txt",'w') as file:
            for title in titles:
                #打印查找的的每一个a标签的标题
                # print(title.string)
                file.write(title.xpath('./text()').extract_first()+'\n')
                file.write(url + title.xpath('./@href').extract_first() + '\n\n')
                # print(title.get('href'))  
                #打印查找到的每一个a标签的文章链接
                # print(url + title.get('href') + '\n\n')
            return JsonResponse({'status': '0'})
        
    except Exception as e:
        # print(e)
        return JsonResponse({'status': '1'})