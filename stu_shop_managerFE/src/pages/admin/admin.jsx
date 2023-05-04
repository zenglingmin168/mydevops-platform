import React, { Component } from 'react'
import {Layout} from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Route,Switch} from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

//引入要展示的路由组件
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar/bar'
import Line from '../charts/line/line'
import Pie from '../charts/pie/pie'
import Cluster from '../cluster/cluster'
import ImgRegistry from '../imgregistry/imgregistry'
import GitRegistry from '../gitregistry/gitregistry'
import Jenkins from '../jenkins/jenkins'
import GlobalTemplate from '../globaltemplate/globaltemplate'
import CommVariable from '../commvariable/commvariable'
import CirQueue from '../../pages/cir-queue/cir-queue'
import MachineList from '../../pages/machine-list/machine-list'
import SysSet from '../sysset/sysset'
import AddHuidu from '../huidu/add-huidu'
import CancelHuidu from '../huidu/cancel-huidu'
import SearchKey from '../redisops/searchkey'
import SearchHuidu from '../huidu/search-huidu'
// import Site from '../site/site'
import Prodenv from '../site/prodenv'
import Testenv from '../site/testenv'
import Clouds from '../site/clouds'
import FlushCache from '../redisops/flushcache'
import MinCheck from '../minapp/mincheck'

const {Sider,Content,Footer} = Layout

//后台管理的路由组件
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        //如果内存中没有存储user，即当前没有登陆，则跳转到登陆页
        if(!user || !user._id) {
            //自动跳转到登陆页（render(）中）
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                <Header>
                    <Header/>
                </Header>
                <Content style={{margin: 20,backgroundColor: '#fff'}}>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/category' component={Category} />
                        <Route path='/product' component={Product} />
                        <Route path='/cirqueue' component={CirQueue} />
                        <Route path='/user' component={User} />
                        <Route path='/role' component={Role} />
                        <Route path='/bar' component={Bar} />
                        <Route path='/line' component={Line} />
                        <Route path='/pie' component={Pie} />
                        <Route path='/cluster' component={Cluster} />
                        <Route path='/imgregistry' component={ImgRegistry} />
                        <Route path='/gitregostry' component={GitRegistry} />
                        <Route path='/jenkins' component={Jenkins} />
                        <Route path='/globaltemplate' component={GlobalTemplate} />
                        <Route path='/commvariable' component={CommVariable} />
                        <Route path='/machine' component={MachineList} />
                        <Route path='/sysset' component={SysSet} />
                        < Route path='/huidusearch' component={SearchHuidu} />
                        <Route path='/huiduup' component={AddHuidu} />
                        <Route path='/huidudown' component={CancelHuidu} />
                        <Route path='/searchkey' component={SearchKey} />
                        {/* <Route path='/site' component={Site} /> */}
                        <Route path='/prodenv' component={Prodenv} />
                        <Route path='/testenv' component={Testenv} />
                        <Route path='/clouds' component={Clouds} />
                        <Route path='/flushcache' component={FlushCache} />
                        <Route path='/mincheck' component={MinCheck}/>
                        <Redirect to='/home' />
                    </Switch>
                </Content>
                <Footer style={{textAlign: 'center',color: '#ccc'}}>Devoloped By Ops In 2021</Footer>
                </Layout>
            </Layout>
        )
    }
}
