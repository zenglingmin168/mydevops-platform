/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
*/
import axios from 'axios'
import {message} from 'antd'

/*优化前代码
export default function ajax(url,data={},type='GET') {
    //console.log(type)
    if(type==='GET') {      //发get请求
        return axios.get(url, {    //配置对象
            params: data            //指定请求参数
        })
    } else { //发post请求
        return axios.post(url,data,{
            headers:{
                'content-type':"form-data"
            }
        })
    }
}
*/

//优化：统一处理请求异常后的代码,要结合login.jsx
//解决方案：在外层包一个自己创建的promise对象；在请求出错时不去reject(error)，而是直接显示错误信息
export default function ajax(url,data={},type='GET') {
    return new Promise((resolve,reject) =>{
        let promise
        //执行异步ajax请求
        if(type==='GET') {      //发get请求
            // return axios.get(url, {    //配置对象
            //     params: data            //指定请求参数
            // })
            promise =  axios.get(url,{
                    params: data
            })
        } else { //发post请求
            promise =  axios.post(url,data,{
                headers:{
                    'content-type':"form-data"
                }
            })
        }
        //如果执行成功了，调用resolve(value)
        promise.then(response=>{
            resolve(response.data)     //对应login.jsx中的result，即result=response.data，返回异步结果，供login.jsx使用
        //如果执行失败了，不调用reject(reason)，而是直接提示异常信息
        }).catch(error=>{
            //reject(error)
            message.error('请求出错了：' + error.message)
        })
    })
}


//请求登陆接口
//ajax('/login',{username: 'Tom',password:'12345'},'POST').then()
//添加用户接口
//ajax('/manage/user/add',{username:'Tome',password:'12345',phone:'13712341234'},'POST').then()