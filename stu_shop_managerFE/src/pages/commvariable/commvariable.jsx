import React, { Component } from 'react'
import{
    Card,
    Table,
    Select,
    Input,
    Button,
    Alert
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

/* 通用模版变量路由组件*/
export default class CommVariable extends Component {

    state = {
        commvar : [
            {
                'varkey': 'yamlt_test',
                'varvalue': 'version: v1 metadata: ooo: xxx mono: - v1 - v2',
                'vartype': 'YAML'
            }
        ]
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Key',
                dataIndex: 'varkey',
                key: 'varkey'
            },
            {
                title: 'Value',
                dataIndex: 'varvalue',
                key: 'varvalue'
            },
            {
                title: '变量类型',
                dataIndex: 'vartype',
                key: 'vartype'
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
        const {commvar} = this.state
        //Card的title的左侧
        const title = (
            <span>
                <div style={{margin: '0 0 10px 0'}}>
                    配置列表-全局默认变量
                </div>
                <Alert 
                    showIcon
                    message='变量优先级 环境服务变量 > 项目服务变量 > 环境默认变量 > 项目默认变量 > 全局默认变量 Key相同的，Value以优先级最高的为准'
                    style={{width: 1200}}
                />
                <Alert 
                    message='变量在模版中引用方式为 {{vars.`key name`}} 举例，有数据 ·类型=JSON Key=person Value={"name": "Jack", age: 18}· 在模板中要取name的value，可以为 {{vars.person.name}}'
                    style={{width: 1200}}
                />
                Type: 
                <Select placeholder='请选择' style={{width: 500,margin: '10px 50px 5px 5px'}}/>
                key:   
                <Input placeholder='请输入' style={{width: 570,margin: '10px 260px 5px 5px'}}/>
                <Button icon='plus' type='primary' >新建</Button>
            </span>
        )
        //Card的title的右侧
        // const extra = (
        //     <span>
        //         <Button icon='plus' type='primary'>新建</Button>
        //     </span>
        // )

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='varkey'
                    dataSource={commvar}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
