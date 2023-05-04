/*
进行local数据持久化存储管理的工具模块。定义几个方法
*/
import store from 'store'     //store需要安装

const USER_KEY = 'user_key'
export default {
    /*
    保存user
    */
    saveUser(user) {
        //localStorage.setItem(USER_KEY,JSON.stringify(user))       //原生写法
        //利用store库之后更简洁的写法
        store.set(USER_KEY,user)
    },
    /*
    读取user
    */
    getUser() {
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    /*
    删除user
    */
   removeUser(){
        //localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
   }
}