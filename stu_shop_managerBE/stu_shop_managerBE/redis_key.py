from django.http import JsonResponse
from redis import Redis,ConnectionPool
def key_is_exists(requesta):
    key = requesta.GET.get('keyname')
    # print(key)
    try:
        conn1 = Redis(host='172.16.16.56',port=6379,password='ArthjjnlL0qgrr',db=0,socket_timeout=5)
        conn2 = Redis(host='172.16.0.129',port=6379,password='5YGsMH3!',db=0,socket_timeout=5)
        conn4 = Redis(host='172.16.16.112',port=6379,password='Xingrui@jiatui',db=0,socket_timeout=5)
        conn5 = Redis(host='172.16.0.96',port=6379,password='i0cAwTwzwZ123',db=0,socket_timeout=5)
        conn6 = Redis(host='172.16.16.51',port=6379,password='MalljjnlL0qgrr',db=0,socket_timeout=5)
        conn7 = Redis(host='172.16.16.211',port=6379,password='crs-4ebubic7:z8XMjJBUYiZ6',db=0,socket_timeout=5)
        if conn1.exists(key) == 1:
            return JsonResponse({'status':'0','msg':'172.16.16.56 exists this key'})
        elif conn2.exists(key) == 1:
            return JsonResponse({'status':'0','msg':'172.16.0.129 exists this key'})
        elif conn4.exists(key) == 1:
            return JsonResponse({'status':'0','msg':'172.16.16.112 exists this key'})
        elif conn5.exists(key) == 1:
            return JsonResponse({'msg':'172.16.0.96 exists this key'})
        elif conn6.exists(key) == 1:
            return JsonResponse({'status':'0','msg':'172.16.16.51 exists this key'})
        elif conn7.exists(key) == 1:
            return JsonResponse({'status':'0','msg':'172.16.16.211 exists this key'})
        return JsonResponse({'status':'0','msg':'this key is not exists!'})
    except Exception as e:
        return JsonResponse({'status': '1','msg': e}) 