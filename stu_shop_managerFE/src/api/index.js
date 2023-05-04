/*
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数模块
每个函数的返回值都是promise
*/

// import { get } from 'store'
import ajax from './ajax'

//登陆
export const reqLogin = (username,password) => {
    //将ajax请求的参数转换成formData格式，否则后端会接收不到参数
    const formData=new FormData()
    formData.append('username',username)
    formData.append('password',password)
    return ajax('/api/login/',formData,'POST')}

//export const reqLogin = (username,password) => ajax('/api/login/',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => {
    //将ajax请求的参数转换成formData格式，否则后端会接收不到参数
    const formData=new FormData()
    formData.append('user',user)
    return ajax('/manage/user/add/',formData,'POST')}

//获取一级、二级分类列表
// export const reqCategorys = (parentId) => {
//     //将ajax请求的参数转换成formData格式，否则后端会接收不到参数
//     const formData=new FormData()
//     formData.append('parentId',parentId)
//     return ajax('/api/manage/category/list/',formData)}    //请求方式为get，由于ajax.js中设置的形参默认值为GET，故此处可以省略
export const reqCategorys = (parentId) => ajax('/api/manage/category/list/',{parentId})

//添加分类
export const reqAddCategory = (categoryName,parentId) => {
    const formData=new FormData()
    formData.append('categoryName',categoryName)
    formData.append('parentId',parentId)
    return ajax('/api/manage/category/add/',formData,'POST')}

//更新分类
export const reqUpdateCategory = (categoryId,categoryName) => {
    const formData=new FormData()
    formData.append('categoryId',categoryId)
    formData.append('categoryName',categoryName)
    return ajax('/api/manage/category/update/',formData,'POST')}

//删除分类
export const reqDeleteCategory = (categoryId) => {
    const formData=new FormData()
    formData.append('categoryId',categoryId)
    return ajax('/api/manage/category/delete/',formData,'POST')}

//获取所以角色列表
export const reqRoles = () => ajax('/api/manage/role/list/')

//添加角色
export const reqAddRoles = (roleName,create_time) => {
    const formData = new FormData()
    formData.append('roleName',roleName)
    formData.append('create_time',create_time)
    return ajax('/api/manage/role/add/',formData,'POST')
}

//更新角色权限
export const reqUpdateRole = (roleId,menus,auth_name,auth_time) => {
    const formData = new FormData()
    formData.append('roleId',roleId)
    formData.append('menus',menus)
    formData.append('auth_name',auth_name)
    formData.append('auth_time',auth_time)
    return ajax('/api/manage/role/update/',formData,'POST')
}

// 删除角色
export const reqDelRole = (roleId) => {
    const formData = new FormData()
    formData.append('roleId', roleId)
    return ajax('/api/manage/role/delete/',formData,'POST')
}

//查询redis的key
export const searchRedisKey = (keyname) => ajax('/api/key_is_exists/',{keyname})

//查询灰度
export const searchHuidu = (companyid) => ajax('/api/search_huidu/',{companyid})

//添加灰度
export const upHuidu = (companyid) => ajax('/api/huidu_up/',{companyid})

//取消灰度
export const downHuidu = (companyid) => ajax('/api/huidu_down',{companyid})

// 获取所以灰度企业
export const get_allHuidu = () => ajax('/api/get_allhuidu',{})
