import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Input
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

export default class Jenkins extends Component {

    /*初始化状态*/
    state = {
        jenkinsinfo :[
            {
                'jenkinsname': 'aaa-jenkins',
                'jenkinsaddr': 'http://jenkins.aaa.com/',
                'jenkinsdes': 'aaa-jenkins'
            },
            {
                'jenkinsname': 'bbb-jenkins',
                'jenkinsaddr': 'http://jenkins.bbb.com/',
                'jenkinsdes': 'bbb-jenkins'
            }
        ]
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Jenkins名称',
                dataIndex: 'jenkinsname',
                key: 'jenkinsname'
            },
            {
                title: 'Jenkins地址',
                dataIndex: 'jenkinsaddr',
                key: 'jenkinsaddr'
            },
            {
                title: '描述',
                dataIndex: 'jenkinsdes',
                key: 'jenkinsdes'
            },
            {
                title: '操作',
                width: 200,
                render: () => (
                    <span>
                        <LinkButton>编辑</LinkButton>
                        <DangeButton>删除</DangeButton>
                    </span>
                )
            }
        ]
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    render() {
        const {jenkinsinfo} = this.state
        //Card中title的左侧
        const title = (
            <span>
                <Input placeholder='请输入Jenkins名称'style={{width: 260,margin: '0 10px'}}/>
                <Button type='primary' icon="search">搜索</Button>
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
                    rowKey='jenkinsname'
                    dataSource={jenkinsinfo}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
