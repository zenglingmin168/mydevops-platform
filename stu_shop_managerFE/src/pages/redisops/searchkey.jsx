import React, { Component } from 'react'
import { Input,Breadcrumb,Layout } from 'antd'
import { searchRedisKey } from '../../api/'
const { Content } = Layout;
const { Search } = Input

export default class SearchKey extends Component {
    state = {
        visible: false,
        str: '请稍后......'
    }    
    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };



    searchKey = async (keyname) => {
        if (keyname === '') {
            this.setState({
                str: "查询条件不允许为空，请重新输入！"
            })}
        else {   
        //发异步ajax请求，获取数据
        const results = await searchRedisKey(keyname)
        // console.log(results.msg)
        this.setState({
            str: results.msg,
          })};
    }

    // searchKey = async (keyname) => {
    //     //发异步ajax请求，获取数据
    //     const results = await searchRedisKey(keyname)
    //     console.log(results.msg)
    // }

    render() {
        return (
            <div>
                <Search placeholder="请输入要查询的key" onSearch={this.searchKey} enterButton size='large' style={{ width: 500 }} />
                <Content style={{ padding: '0 10px' }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                    </Breadcrumb>
                    <div style={{ background: 'rgba(0,0,0,.05)', padding: 10, minHeight: 550 }}>{this.state.str}</div>
                </Content>
            </div>
        )
    }
}