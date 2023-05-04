import React, { Component } from 'react'
import {
Button,
Card,
Input,
Table
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

export default class ImgRegistry extends Component {
    /*
    初始化状态
    */
    state = {
        //初始集群信息数据源
        imgs : [
            {
                'imgname': 'saas测试环境harbor',
                'imgaddr': 'https://test-harbor.aijiatui.com',
                'imgdes': 'saas测试环境harbor'
            },
        ]
    }

    /* 
    封装初始化table所有列的数组的函数
    */
    initColumns = () => {
        this.columns = [
            {
                title: '镜像仓库名称',
                dataIndex: 'imgname',
                key: 'imgname'
            },
            {
                title: '镜像仓库地址',
                dataIndex: 'imgaddr',
                key: 'imgaddr'
            },
            {
                title: '描述信息',
                dataIndex: 'imgdes',
                key: 'imgdes'
            },
            {
                title: '操作',
                width: 200,
                render: (image) => {
                    return (
                        <span>
                            <LinkButton>编辑</LinkButton>
                            <DangeButton>删除</DangeButton>
                        </span>
                    )
                }
            },
        ]
    }

    //在渲染之前，初始table结构
    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    render() {

        const {imgs} = this.state
        //Card中title的左侧
        const  title = (
            <span>
                <Input placeholder='请输入搜索关键字' style={{width: 250,margin: '0 10px'}}/>
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
                    rowKey='imgname'
                    dataSource={imgs}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
