import React, { Component } from 'react'
import { 
    Card,
    Table,
    Input,
    Button
} from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

export default class MachineList extends Component {
    //初始状态
    state = {
        machines : [
            {
                machinename: 'test01',
                machineip: '1.1.1.1',
                machineport: '1876',
                machinemethod: 'ssh',
                machineos: 'centos7',
                machineenv: '机房虚拟机',
                addtime: '2021-11-01 14:15:16'
            },
            {
                machinename: 'saas-01',
                machineip: '172.11.11.11',
                machineport: '1876',
                machinemethod: 'ssh',
                machineos: 'centos7',
                machineenv: '腾讯云',
                addtime: '2021-11-01 15:16:17'
            }
        ]
    }

    //初始化table结构回调函数
    initColumns = () => {
        this.columns = [
            {
                title: '服务器名',
                dataIndex: 'machinename',
                key: 'machinename'
            },
            {
                title: '服务器ip',
                dataIndex: 'machineip',
                key: 'machineip'
            },
            {
                title: '远程端口',
                dataIndex: 'machineport',
                key: 'machineport'
            },
            {
                title: '远程方式',
                dataIndex: 'machinemethod',
                key: 'machinemethod'
            },
            {
                title: '服务器系统',
                dataIndex: 'machineos',
                key: 'machineos'
            },
            {
                title: '服务器环境',
                dataIndex: 'machineenv',
                key: 'machineenv'
            },
            {
                title: '添加时间',
                dataIndex: 'addtime',
                key: 'addtime'
            },
            {
                title: '操作',
                render: () => (
                    <span>
                        <LinkButton>编辑</LinkButton>
                        <DangeButton>删除</DangeButton>
                    </span>

                )
            }
        ]
    }

    //render前先初始化table结构
    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    render() {
        const {machines} = this.state

        //Card的title的左侧
        const title = (
            <span >
                <Input placeholder='请输入搜索关键字' style={{width: 300,margin: '0 5px 0 0'}} />
                <Button icon='search' type='primary'>搜索</Button>
            </span>
        )
        //Card的title的右侧
        const extra = (
            <span>
                <Button icon='plus' type='primary'>添加</Button>
            </span>
        )
        return (
            <Card title={title} extra={extra}>
                <Table 
                    rowKey='machinename'
                    dataSource={machines}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
