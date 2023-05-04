import React, { Component } from 'react'
import { Input,Breadcrumb,Layout, message } from 'antd'
import { searchHuidu,get_allHuidu } from '../../api' 
const { Search } = Input
const { Content } = Layout

export default class SearchHuidu extends Component {
    state = {
        visible: false,
        // list: []
        list: '请稍后......',
        loading: false
    }

    // 发起异步ajax请求
    searchHuidu = async (companyid) => {
        if (companyid === '') {
            message.warning('查询条件不允许为空，请重新输入！')
            this.setState({list: '请稍后......'})
        }
        // if (companyid.length < 18) {
        //     message.warning('companyid长度不能少于18位')
        // }
        else {
            if (companyid.length < 18 || companyid.length > 20) {
                message.warning('companyid长度只能介于18位和20位之间')
                this.setState({list: '请稍后......'})
            }
            else {
                // 将loading变更为true状态
                this.setState({loading: true})
                // 获取异步请求返回的结果
                const results = await searchHuidu(companyid)
                // 将loading变更为false状态
                this.setState({loading: false})
                this.setState({
                    list: results.msg
                })
            }
        }
    }

    getallHuidu = async () => {
        const result = await get_allHuidu()
        console.log(result.msg)
        this.setState({
            list: result.msg
        })
    }

    // componentDidMount () {
    //     this.getallHuidu()
    // }

    render() {
        const { searchHuidu } = this
        return (
            <div>
                <Search
                  placeholder="请输入companyId"
                  enterButton
                  size="large"
                  loading={this.state.loading}
                  rules={[{required: true}]}
                  style={{width: 500}}
                  onSearch={searchHuidu}
                />
                <Content style={{ padding: '0 10px' }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                    </Breadcrumb>
                    {/* <div style={{ background: 'rgba(0,0,0,.05)', padding: 10, minHeight: 540 }}>{this.state.list}</div> */}
                    {/* {this.state.str.map((it,id)=><div key={id}>{it}</div>)} */}
                    <div style={{ background: 'rgba(0,0,0,.05)', padding: 10, minHeight: 550 }}>
                        {/* {
                            this.state.list.map((it,id) => (
                                <div key={id}>
                                    {it}
                                </div>)
                            )
                        } */}
                        {this.state.list}
                    </div>
                </Content>
          </div>
        )
    }
}
