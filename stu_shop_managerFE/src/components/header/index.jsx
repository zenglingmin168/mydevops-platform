import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
import './index.less'

//const { confirm } = Modal;

class Header extends Component {

    //动态显示倒三角提示栏的回调函数
    getTitle = () => {
        //得到当前的请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if(item.key===path) {  //如果当前item的key与当前请求的path一样，item的title就是当前需要显示的title
                title = item.title
            } else if(item.children) {
                //所以子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key===path)
                //如果有值说明有匹配的
                if(cItem) {
                    //取出它的title
                    title = cItem.title
                }
            }
        })
        return title
    }

    //退出登陆回调函数
    logout = () => {
        //显示确认框
        Modal.confirm({
            content: '确定退出吗？',
            onOk: () => {
              //console.log('OK',this);
              //删除当前登陆的user数据
              storageUtils.removeUser()
              memoryUtils.user = {}
              //跳转到login页
              this.props.history.replace('/login')
            }
        })
    }

    render() {
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,admin</span>
                    {/* a链接原生写法 
                    <a href='#!' onClick={this.logout}>退出</a>
                    */}
                    {/* a链接自定义写法 */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className="header-bottom-right">
                        <span>2021-09-28 11:11:30</span>
                        <img src='http://api.map.baidu.com/images/weather/day/qing.png'  alt='weather'/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)