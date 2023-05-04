import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import setmenuList from './setmenuConfig'

// const { Content, Sider } = Layout;
const {SubMenu} = Menu

class SysSet extends Component {
    /*
    根据menu的数据数组生成对应的标签数组;
    使用map() + 递归调用生成子菜单标签数组
    使用reduce() + 递归调用，本例中使用的是reduce方式
    */
   //根据menu的数据数组生成对应的标签数组的回调函数（写法1）
   getsetMenuNodes_map = (setmenuList) => {
        return setmenuList.map(item =>{
            //由于存在两种菜单结构（有子菜单和无子菜单），所以需要加以判断
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
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
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 递归调用 */}
                        {this.getsetMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    //根据menu的数据数组生成对应的标签数组的回调函数（写法2）
    getsetMenuNodes = (setmenuList) => {
        //得到当前请求的路由路径，通过withRouter包装之后，可以继承location属性
        const path = this.props.location.pathname

        return setmenuList.reduce((pre,item) => {
            //判断菜单类型，并往数组中添加数据
            if(!item.children) {
            //如果是子菜单类型，就添加<SubMenu>
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
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
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 递归调用 */}
                        {this.getsetMenuNodes(item.children)}
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
        this.menuNodes = this.getsetMenuNodes(setmenuList)
    }

    render() {
        //得到当前请求的路由路径，通过withRouter包装之后，可以继承location属性
        const path = this.props.location.pathname
        //console.log(path)
        //得到需要打开的菜单项的key
        const openKey = this.openKey

        return (
            <div >
                <Menu
                    mode="inline"
                    theme="dark"
                    //根据访问地址，动态的高亮菜单栏
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}  //自动打开当前子列表
                    >
                    {/* 写法二、灵活写法 */}
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(SysSet)