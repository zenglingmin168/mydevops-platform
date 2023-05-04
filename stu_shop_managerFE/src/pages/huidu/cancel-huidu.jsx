import React, { Component } from 'react'
import { Input,Breadcrumb,Layout, message } from 'antd'
import { downHuidu } from '../../api'
const { Content } = Layout
const { Search } = Input

export default class CancelHuidu extends Component {
    // 初始化状态
    state = ({
        visiable: false,
        value: '请稍后......',
        loading: false
    })

    // 定义取消灰度函数
    cancelHuidu = async (companyid) => {
        // 判断输入是否的 companyid 是否存在
        if (companyid === '') {
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
                // 调用封装后的 ”downHuidu“ 函数，向后端接口发起ajax请求，并获取返回结果
                const results = await downHuidu(companyid)
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
                    onSearch={this.cancelHuidu}
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
