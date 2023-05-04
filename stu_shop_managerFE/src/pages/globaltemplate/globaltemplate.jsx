import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Input,
    Select,
    Alert
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

export default class GlobalTemplate extends Component {

    //初始化状态
    state = {
        globaltmp: [
            {
                'tmpname': 'Dockerfile',
                'languagetype': 'Java',
                'tmpcontext': 'ls',
                'tmptype': 'Text File'
            },
            {
                'tmpname': 'Jenkinsfile.v8',
                'languagetype': 'Java',
                'tmpcontext': 'echo',
                'tmptype': 'Text File'
            }
        ]
    }

    //初始化表格回调函数
    initColumns = () => {
        this.columns = [
            {
                title: '模版名称',
                dataIndex: 'tmpname',
                key: ''
            },
            {
                title: '所属服务开发语言类型',
                dataIndex: 'languagetype',
                key: ''
            },
            {
                title: '模版内容',
                dataIndex: 'tmpcontext',
                key: ''
            },
            {
                title: '模版类型',
                dataIndex: 'tmptype',
                key: ''
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

    //render之前先初始化表格结构
    UNSAFE_componentWillMount(){
        this.initColumns()
    }

    render() {
        const {globaltmp} = this.state
        //Card的title的左边
        const title = (
            <span>
                <div icon='arrow-left' style={{margin: '0 0 10px 0'}}>
                    配置列表-全局默认模板
                </div>
                <Alert showIcon message='模板优先级 环境服务模板 > 项目服务模板 > 环境默认模板 > 项目默认模板 > 全局默认模板' type='info' style={{width: 830, margin: '10px 0'}}/>
                <div>
                    语言类型: 
                    <Select placeholder='请选择' style={{width: 300, margin: '0 50px 0 5px'}}></Select>
                    配置文件名称: 
                    <Input placeholder='请输入配置文件名称' style={{width: 300, margin: '0 630px 0 5px'}}/>
                    <Button icon='plus' type='primary'>新建</Button>
                </div>
            </span>
        )
        //Card的title的右边
        // const extra = (
        //     <Button type='primary' icon='plus'>新增</Button>
        // )

        return (
            <Card title={title}>
                <Table 
                    bordered
                    rowKey='tmpname'
                    columns={this.columns}
                    dataSource={globaltmp}
                />
            </Card>
        )
    }
}
