import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'

import logo from '../../assets/images/login-logo.png'
import './index.less'
//import Item from 'antd/lib/list/Item';

const { SubMenu } = Menu;

class LeftNav extends Component {
    /*
    根据menu的数据数组生成对应的标签数组;
    使用map() + 递归调用生成子菜单标签数组
    使用reduce() + 递归调用，本例中使用的是reduce方式
    */
   //根据menu的数据数组生成对应的标签数组的回调函数（写法1）
    getMenuNodes_map = (menuList) => {
        return menuList.map(item =>{
            /* item为menuList数组中的数据，例如
                {
                    title: '首页',   //菜单标题名称
                    key : '/home',  //以对应path作为key，可防止重复
                    icon: 'home',    //图标名称
                    children: []     //可能有，也可能没有
                },
            */
           
            //由于存在两种菜单结构（有子菜单和无子菜单），所以需要加以判断
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 递归调用 */}
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    //根据menu的数据数组生成对应的标签数组的回调函数（写法2）
    getMenuNodes = (menuList) => {
        //得到当前请求的路由路径，通过withRouter包装之后，可以继承location属性
        const path = this.props.location.pathname

        return menuList.reduce((pre,item) => {
            //判断菜单类型，并往数组中添加数据
            if(!item.children) {
            //如果是子菜单类型，就添加<SubMenu>
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                //查找与当前请求路径匹配的子item
                const cItem = item.children.find(cItem => cItem.key===path)
                //如果存在，说明当前item的子列表要展开
                if(cItem) {
                    this.openKey = item.key
                }

                //如果不是子菜单类型，就添加<Menu.Item>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 递归调用 */}
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }

    /*
    在第一次render()之前执行一次
    为第一次render()准备数据（必须是同步的）
    */
    UNSAFE_componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        //得到当前请求的路由路径，通过withRouter包装之后，可以继承location属性
        const path = this.props.location.pathname
        //console.log(path)
        //得到需要打开的菜单项的key
        const openKey = this.openKey

        return (
            <div to='/' className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='logo'/>
                    <h1>加推运维平台</h1>
                </Link>

                <Menu
                    //默认选中菜单
                    //defaultSelectedKeys={[path]}   默认选中菜单
                    //defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    //根据访问地址，动态的高亮菜单栏
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}  //自动打开当前子列表
                    >
                    {/*  写法一、不够灵活的写法
                    <Menu.Item key="1">
                        <Link to='home'>
                            <Icon type="home" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="project" />
                            <span>项目管理</span>
                        </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to='/category'>
                                <Icon type="unordered-list" />
                                <span>项目列表</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to='./product'>
                                <Icon type="copy" />
                                <span>环境服务管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to='/aaa'>
                                <Icon type="control" />
                                <span>流转队列</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                        <span>
                            <Icon type="setting" />
                            <span>系统管理</span>
                        </span>
                        }
                    >
                        <Menu.Item key="8">
                            <Link to='/user'>
                                <Icon type="user" />
                                <span>用户管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to='./role'>
                                <Icon type="solution" />
                                <span>角色管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link to='/bbb'>
                                <Icon type="appstore" />
                                <span>系统设置</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    */}    

                    {/* 写法二、灵活写法 */}
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

/*
withRouter高阶组件：
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递三个属性：history、location、match
*/
export default withRouter(LeftNav)