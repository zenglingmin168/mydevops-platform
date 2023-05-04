import React, { Component } from 'react'
import {
Button,
Card,
Input,
Select,
Table
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

const Option = Select.Option
//集群配置路由组件
export default class Cluster extends Component {

    /*
    初始化状态
    */
    state = {
        //初始集群信息数据源
        clusters : [
            {
                'clustertype': '测试环境',
                'clustername': 'saas测试环境',
                'clusterdes': 'saas项目测试环境',
                'clusterdo': ''
            },
        ]
    }

    /* 
    封装初始化table所有列的数组的函数
    */
    initColumns = () => {
        this.columns = [
            {
                title: '类别',
                dataIndex: 'clustertype',
                key: 'clustertype'
            },
            {
                title: '集群名称',
                dataIndex: 'clustername',
                key: 'clustername'
            },
            {
                title: '备注信息',
                dataIndex: 'clusterdes',
                key: 'clusterdes'
            },
            {
                title: '操作',
                width: 200,
                dataIndex: 'clusterdo',
                key: 'clusterdo',
                render: (cluster) => (
                    <span>
                        <LinkButton>编辑</LinkButton>
                        <DangeButton>删除</DangeButton>
                    </span>
                )
            },
        ]
    }

    //在渲染之前，初始table结构
    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    render() {
        const {clusters} = this.state
        //Card中title的左侧
        const  title = (
            <span>
                <Select style={{width: 260}} defaultValue='1'>
                    <Option value='1'>集群名称</Option>
                    <Option value='2'>集群类别</Option>
                </Select>
                <Input placeholder='请输入搜索关键字' style={{width: 260,margin: '0 10px'}}/>
                <Button type='primary' icon='search'>搜索</Button>
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
                    rowKey='clustername'
                    dataSource={clusters}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
