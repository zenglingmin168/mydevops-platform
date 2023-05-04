import React, { Component } from 'react'
import {
    Card,
    Table,
    Select,
    Input,
    Button
} from 'antd'

import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button'

const Option = Select.Option
/*用户路由组件*/
export default class User extends Component {

    state = {
        users: [
            {
                'userindex': '1',
                'username': 'zhangsan',
                'rellname': '张三',
                'usertype': 'default',
                'userrole': 'saas开发',
                'userstate': '正常',
                'lastlogin': '2021-11-01 16:16:16'
            },
            {
                'userindex': '2',
                'username': 'lisi',
                'rellname': '李四',
                'usertype': 'default',
                'userrole': 'vip-devtest开发',
                'userstate': '正常',
                'lastlogin': '2021-11-02 17:17:17'
            }
        ]
    }

    initColumns = () => {
        this.columns = [
            {
                title: '序号',
                dataIndex: 'userindex',
                key: 'userindex'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '真实名字',
                dataIndex: 'rellname',
                key: 'rellname'
            },
            {
                title: '用户类型',
                dataIndex: 'usertype',
                key: 'usertype'
            },
            {
                title: '所属角色',
                dataIndex: 'userrole',
                key: 'userrole'
            },
            {
                title: '账号状态',
                dataIndex: 'userstate',
                key: 'userstate'
            },
            {
                title: '最近登陆',
                dataIndex: 'lastlogin',
                key: 'lastlogin'
            },
            {
                title: '操作',
                render: () => (
                    <span>
                        <LinkButton>禁用</LinkButton>
                        <LinkButton>编辑</LinkButton>
                        <LinkButton>重置密码</LinkButton>
                        <DangeButton>删除</DangeButton>
                    </span>
                )
            }
        ]
    }

    UNSAFE_componentWillMount () {
        this.initColumns()
    }

    render() {
        const {users} = this.state
        const title = (
            <span>
                用户名:
                <Input placeholder='请输入' style={{width: 300,margin: '0 30px 0 5px'}}/>
                用户状态:
                <Select placeholder='请选择' style={{width: 300,margin: '0 700px 0 5px'}}>
                    <Option key='1'>正常</Option>
                    <Option key='2'>禁用</Option>
                </Select>
                <Button icon='plus' type='primary'>添加</Button>
            </span>
        ) 

        return (
            <Card title={title}>
                <Table 
                    rowKey='userindex'
                    dataSource={users}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
