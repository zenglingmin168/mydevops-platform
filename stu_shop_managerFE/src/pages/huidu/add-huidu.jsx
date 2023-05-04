import React, { Component } from 'react'
import { Input,Breadcrumb,Layout, message } from 'antd'
import { upHuidu } from '../../api'
const { Search } = Input;
const { Content } = Layout;

export default class AddHuidu extends Component {
    // 初始化状态
    state = {
        visiale: false,
        value: '请稍后......',
        loading: false
    }

    // 定义添加灰度函数
    addHuidu = async (companyid) => {
        // 判断输入是否为空
        if(companyid === '') {
            // this.setState({
            //     value: '不允许输入为空，请重新输入......'
            // })
            message.warning('输入不能为空，请重新输入!')
            this.setState({value: '请稍后......'})
        }
        else {
            if (companyid.length < 18 || companyid.length > 20) {
                message.warning('companyid长度只能介于18位和20位之间')
                this.setState({value: '请稍后......'})
            }
            else {
                // 将loading变更为true状态
                this.setState({loading: true})
                // 调用封装后的 “upHuidu” 函数，向后端接口发起ajax请求，并获取返回结果
                const results = await upHuidu(companyid)
                // 将loading变更为false状态
                this.setState({loading: false})
                // 根据返回结果更新状态
                this.setState({
                    value: results.msg
                })
            }
        }    
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="请输入companyid"
                    enterButton="提交"
                    size="large"
                    loading={this.state.loading}
                    // 点击按钮时调用定义好的 “addHuidu” 函数
                    onSearch={this.addHuidu}
                    style={{width: 500}}
                />
                <Content style={{ padding: '0 10px' }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                    </Breadcrumb>
                    <div style={{ background: 'rgba(0,0,0,.05)', padding: 10, minHeight: 540 }}>{this.state.value}</div>
                    {/* <div style={{ background: 'rgba(0,0,0,.05)', padding: 10, minHeight: 550 }}>{this.state.str}</div> */}
                </Content>
            </div>
        )
    }
}
