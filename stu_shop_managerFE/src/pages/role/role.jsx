import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'

import {reqRoles,reqAddRoles,reqUpdateRole,reqDelRole, reqAddUser} from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import DeleteRole from './delete-form'
import memoryUtils from '../../utils/memoryUtils'
import {time} from '../../utils/moment-time'
import DangeButton from '../../components/dange-button'

/*
角色路由组件
*/
export default class Role extends Component {
    //初始化状态
    state = {
        roles: [],   //所有角色的列表
        role: {},    //选中的角色,空表示默认未选中任何角色
        isShowAdd: false,   //是否显示添加界面
        isShowAuth: false,   //是否显示权限设置界面
        isShowDel:  false    //是否显示删除角色界面
    }

    constructor(props) {
        super(props)
        //创建一个容器，传给AuthForm组件
        this.auth = React.createRef()
    }

    //初始化表格
    initColums = () => {
        this.columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'ct',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'at',
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'an',
            },
            {
                title: '操作',
                render: (role)=>(
                    <span>
                        <DangeButton onClick={() => this.showDelete(role)}>删除</DangeButton>
                    </span>
                )
            }
        ]
    }

    //勾选点击的行
    onRow = (role) =>{
        return {
            onClick: event => {    //点击行
                //console.log(role.role_id)
                this.setState({
                    role
                })
            },
        }
    }

    //发送异步请求函数
    getRoles = async () => {
        const result = await reqRoles()
        if(result.status==='0'){
            const roles = result.data
            //根据返回的结果更新状态
            this.setState({
                roles
            })
        }
    }

    //添加角色（回调函数）
    addRole = () => {
        //进行表单验证，只有通过了才向下处理
        this.form.validateFields(async (error,values) => {
            if(!error) {
                //隐藏确认框
                this.setState({
                    isShowAdd: false
                })
                //收集数据
                const {roleName} = values
                //清空上一次的输入数据
                this.form.resetFields()
                //创建角色的时间
                let date = new Date()
                const create_time = time(date)
                //请求添加角色
                const result = await reqAddRoles(roleName,create_time)
                //根据结果显示/更新角色列表显示
                if(result.status==='0') {
                    message.success('添加角色成功')
                    //更新角色列表显示
                    this.getRoles()
                    //新产生的角色
                    const role = result.data
                    //更新roles状态
                    const {roles} = this.state
                    //将新增的角色添加到roles数组中
                    roles.push(role)
                    //更新，适用于新的数据和原本数据根本不相关
                    this.setState({
                        roles
                    })
                    //console.log(roles)
                    //更新roles状态：基于原本状态数据进行更新
                    // this.setState(state => ({
                    //     roles: [...state.roles,role]
                    // }))

                } else {
                    message.success('添加角色失败')
                }
            }
        })
    }
    // 删除角色（回调函数）
    deleteRole = async () => {
        // 隐藏确认框
        this.setState({
            isShowDel: false
        })
        // 发送删除请求
        // 准备数据
        const roleId = this.role.role_id
        // console.log(roleid)
        // 发送ajax异步请求
        const result = await reqDelRole(roleId)
        if (result.status ==='0') {
            this.getRoles()
            message.warning('删除角色成功')
        }
    }

    // 删除分类确认框
    showDelete = (role) => {
        console.log(role)
        this.role = role
        this.setState({
            isShowDel: true
        })
    }

    //更新权限（回调函数）
    updateRole = async () => {
        //隐藏确认框
        this.setState({
            isShowAuth: false
        })
        const role = this.state.role
        //通过子组件AuthForm提供的getMenus()方法获取最新的menus
        const menus = this.auth.current.getMenus()
        //从状态中取出role_id
        const {role_id} = this.state.role
        //console.log(role_id)
        role.menus = menus
        //授权人
        role.auth_name = memoryUtils.user.username
        //修改角色权限的时间
        let date = new Date()
        role.auth_time = time(date)
        //发更新请求
        const result = await reqUpdateRole(role_id,menus,role.auth_name,role.auth_time)
        if(result.status===0) {
            message.success('修改角色成功')
            //更新角色列表
            //this.getRoles()
            this.setState({
                roles: [...this.state.roles]
            })
        } else {
            message.success('修改角色失败')
        }
    }

    //render之前初始化表格
    UNSAFE_componentWillMount(){
        this.initColums()
    }

    //render之后获取角色列表
    componentDidMount(){
        this.getRoles()
    }

    render() {

        //从状态中获取最新的角色列表
        const {roles,role,isShowAdd,isShowAuth,isShowDel} = this.state

        //页面title显示栏
        const title = (
            <span>
                <Button type='primary' onClick={() => {this.setState({isShowAdd: true})}}>创建角色</Button> &nbsp;&nbsp;
                {/* 如果没有role_id，则禁止操作 */}
                <Button type='primary' disabled={!role.role_id} onClick={() => {this.setState({isShowAuth: true})}}>设置角色权限</Button>    {/* disabled：当某项被选中的时候，设置角色权限按钮就转变成可操作状态 */}
            </span>
        )
        return (
            //页面body显示栏
            <Card title={title}>
                <Table
                    bordered
                    rowKey='role_id'
                    dataSource={roles} 
                    columns={this.columns}
                    //自定义分页即快速跳转到某页
                    pagination={{defaultPageSize:3,showQuickJumper:true}}
                    //根据回调函数返回的结果勾选（单选）被点击行的角色
                    rowSelection={{type: 'radio',selectedRowKeys:role.role_id}}
                    //调用点击回调函数
                    onRow={this.onRow}
                />
                <Modal
                    title="创建角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    //点击取消时隐藏添加表单
                    onCancel={() => {
                    this.setState({isShowAdd: false})
                    //如果表单中上次输入的内容不为空，则清空表单中上次输入的内容 
                    if (this.form !== undefined) this.form.resetFields()}}
                >
                    <AddForm setForm={(form) => this.form = form}/>
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    //点击取消时隐藏添加表单
                    onCancel={() => {
                    this.setState({isShowAuth: false})}}
                >
                    <AuthForm
                        //接收父组件Role传递过来的容器
                        ref={this.auth}
                        role={role}
                    />
                </Modal>
                <Modal
                    title="删除角色"
                    visible={isShowDel}
                    // 点击OK表示确认删除
                    onOk={this.deleteRole}
                    // 点击cacal表示取消删除
                    onCancel={()=>{
                        this.setState({isShowDel: false})
                    }}
                >
                    <DeleteRole roleName={role.name} setForm={(form) => {this.form = form}}/>
                </Modal>
            </Card>
        )
    }
}
