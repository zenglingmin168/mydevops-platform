import React, { Component } from 'react'
import {
    Button,
    Card,
    Input,
    Table
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

export default class GitRegistry extends Component {

    /* 初始化状态 */
    state = {
        gitinfo : [
            {
                'gitname': '加推aaa仓库',
                'gitaddr': 'https://aaa.jiatuiyun.net/',
                'gitpeple': 'admin'
            },
            {
                'gitname': '加推bbb仓库',
                'gitaddr': 'https://bbb.jiatuiyun.net',
                'gitpeple': 'admin'
            }
        ]
    }

    initColums = () => {
        this.columns = [
            {
                title: 'git平台名称',
                dataIndex: 'gitname',
                key: 'gitname'
            },
            {
                title: 'git平台地址',
                dataIndex: 'gitaddr',
                key: 'gitaddr'
            },
            {
                title: 'git平台录入人',
                dataIndex: 'gitpeple',
                key: 'gitpeple'
            },
            {
                title: '操作',
                width: 200,
                render: (gitname) => (
                    <span>
                        <LinkButton>编辑</LinkButton>
                        <DangeButton>删除</DangeButton>
                    </span>
                )
            },

        ]
    }    

    //render之前初始化table结构
    UNSAFE_componentWillMount() {
        this.initColums()
    }

    render() {
        const {gitinfo} = this.state
        //Card中title的左侧
        const title = (
            <span>
                <Input placeholder='请输入git平台名称' 
                    style={{width: 260,margin: '0 10px'}}
                />
                <Button type='primary' icon='search' >搜索</Button>
            </span>
        )
        //Card中title的右侧
        const extra = (
            <span>
                <Button icon='plus' type='primary'>添加</Button>
            </span>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='gitname'
                    dataSource={gitinfo}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
