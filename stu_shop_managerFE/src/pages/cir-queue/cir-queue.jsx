import React, { Component } from 'react'
import {
    Card,
    Table,
    Select,
    Button,
    Input
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

const Option = Select.Option
export default class CirQueue extends Component {

    //初始化状态
    state = {
        cirqueue : [
            {
                'svcname': 'server-aaa',
                'buildversion': '1',
                'svcstate': '未接收',
                'svcfeature': 'default',
                'queuefeature': 'gray',
                'buildtag': 'master',
                'buildtime': '2021-09-10 10:10:11'
            },
            {
                'svcname': 'server-bbb',
                'buildversion': '2',
                'svcstate': '已接收',
                'svcfeature': 'gray',
                'queuefeature': 'default',
                'buildtag': 'test',
                'buildtime': '2021-09-12 10:30:30'
            }
        ]
    }

    //初始化table结构回调函数
    initColumns = () => {
        this.columns =[
            {
                title: '服务名',
                dataIndex: 'svcname',
                key: 'svcname'
            },
            {
                title: '构建版本号',
                dataIndex: 'buildversion',
                key: 'buildversion'
            },
            {
                title: '服务状态',
                dataIndex: 'svcstate',
                key: 'svcstate'
            },
            {
                title: '服务特性',
                dataIndex: 'svcfeature',
                key: 'svcfeature'
            },
            {
                title: '流转特性',
                dataIndex: 'queuefeature',
                key: 'queuefeature'
            },
            {
                title: '构建分支',
                dataIndex: 'buildtag',
                key: 'buildtag'
            },
            {
                title: '构建时间',
                dataIndex: 'buildtime',
                key: 'buildtime'
            },
            {
                title: '操作',
                width: 230,
                render: () => (
                    <span>
                        <LinkButton>接收</LinkButton>
                        <LinkButton>变更流转特性</LinkButton>
                        <DangeButton>删除</DangeButton>
                    </span>
                )
            }
        ]
    }

    //render前先初始化table结构
    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    render() {
        const {cirqueue} = this.state

        //Card中title
        const  title = (
            <span>
                选择环境:
                <Select style={{width: 260,margin: '0 5px'}} placeholder='请选择' >
                    <Option value='1'>集群名称</Option>
                </Select>
                <Input placeholder='请输入搜索关键字' style={{width: 260,margin: '0 10px'}}/>
                <Button type='primary' icon='search'>搜索</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table 
                    bordered
                    rowKey='svcname'
                    dataSource={cirqueue}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
