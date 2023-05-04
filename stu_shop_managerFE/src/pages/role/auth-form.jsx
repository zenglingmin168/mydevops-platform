import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'
import menuList from '../../config/menuConfig'
const Item = Form.Item
const { TreeNode } = Tree;

export default class AuthForm extends Component {
    static propTypes = {
        role: PropTypes.object
    }

    constructor (props) {
        super(props)
        //根据传入角色的menus生成初始状态，由状态驱动权限展示 
        const {menus,role_id} = this.props.role
        this.state = {
            checkedKeys: menus,
            checkedRoleId: role_id
        }
    }

    //为父组件Role提供获取最新menus数据的方法
    getMenus = () => this.state.checkedKeys
    
    //获取节点（回调函数）
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre,item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        },[])
    }

    //选中某个node时的回调
    // onCheck = (checkedKeys, info) => {
    //     console.log('onCheck', checkedKeys, info);
    //     this.setState({ checkedKeys })
    // };
    onCheck = (checkedKeys) => {
        //console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys })
    };

    UNSAFE_componentWillMount() {
        //根据菜单数组，生成角色权限数组
        this.treeNodes = this.getTreeNodes(menuList)
    }

    //当组件接收到新的role属性时,自动调用该组件更新checkedKeys
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log('UNSAFE_componentWillReceiveProps()',nextProps)
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }

    render() {
        // console.log('AuthForm render()')
        //获取父组件传递过来的role属性
        const {role} = this.props
        //console.log(role)
        const {checkedKeys} = this.state
        //指定Item布局的配置对象
        const formItemLayout ={
            labelCol: { span: 4},   //左侧label的宽度
            wrapperCol: { span: 15},    //右侧包裹的宽度
        }

        return (
            <div>
                <Item label='角色名称' {...formItemLayout} disabled>
                    <Input value={role.name} />    
                </Item>

                <Tree
                    checkable
                    //defaultExpandAll：是否展开所有节点
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {/* 根据角色权限数组，生成角色权限表单界面 */}
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
