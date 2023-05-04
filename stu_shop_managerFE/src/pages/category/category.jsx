import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal,
}
from 'antd'
import LinkButton from '../../components/link-button'
import DangeButton from '../../components/dange-button/'
import {reqCategorys,reqAddCategory,reqUpdateCategory,reqDeleteCategory} from '../../api/'
import AddForm from './add-form'
import UpdateForm from './update-form'
import DeleteForm from './delete-form'

/*
商品分类路由组件
*/
export default class Category extends Component {
    state = {
        loading: false, //是否正在获取数据
        //categorys: [{'name':'haha'},{'name':'hehe'},{'name':'haha'},{'name':'xxxf'},{'name':'cahkd'},{'name':'1cdad'},{'name':'78cefr'}], //一级分类列表
        categorys: [],  //一级分类列表，初始值为空
        subCategorys: [], //二级分类列表，初始值为空
        parentId: '0', //当前需要显示的分类列表的父分类ID
        parentName: '', //当前需要显示的分类列表的父分类名称
        showStatus: 0,
    }
    
    /*
    封装初始化table所有列的数组的函数
    */
    initColums = () => {
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
                title: '名称空间',
                dataIndex: 'ns',
                key: 'ns',
            },
            {
                title: '备注信息',
                dataIndex: 'des',
                key: 'des',
            },
            {
              title: '操作',
              width: 550,
              render: (category) => (
                  <span>
                    <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                    <LinkButton>环境管理</LinkButton>
                    {/* 
                    1. 如何向事件回调函数传递参数： 先定义一个匿名函数，在匿名函数调用回调函数时传入参数 
                    2. 二级分类列表显示时隐藏 “查看子分类按钮”
                    */}
                    {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
                    <LinkButton>设置项目默认模版</LinkButton>
                    <LinkButton>项目模版变量</LinkButton>
                    <DangeButton onClick={() => this.showDelete(category)}>删除分类</DangeButton>
                  </span>
              )
            }
        ];
    }

    /* 
    异步获取一级/二级分类列表显示 
    parentId: 如果没有指定parentId，就根据状态中的parentId发请求；如果指定了，就根据指定的parentId发请求
    */
    getCategorys = async (parentId) => {
        //发异步ajax请求，获取数据
        //在发请求前，显示loading
        this.setState({loading: true})
        parentId = parentId || this.state.parentId
        //发异步ajax请求，获取数据
        const results = await reqCategorys(parentId)
        //发完请求后，隐藏loading
        this.setState({loading: false})
        //console.log('成功了',results)
        if(results.status===0) {
            //取出分类数组（可能是一级，也可能是二级）
            const categorys = results.data
            if(parentId==='0'){
                //更新一级分类列表状态
                this.setState({
                    categorys
                })
            } else {
                //更新二级分类列表状态
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message.error('获取分类列表失败')
        }
    }

    //显示指定一级分类对象的二级列表
    showSubCategorys = (category) => {
        //更新状态
        this.setState({
            parentId: category.category_id,
            parentName: category.name
        }, () => {
            //console.log('parentId',this.state.parentId)
            //获取二级分类列表
            this.getCategorys()
        })
        //setState不能立即获取最新的状态：因为setState()是异步更新状态的
        //console.log('parentId',this.state.parentId)
    }

    //回退一级分类回调函数
    showCategorys = () => {
        //更新状态到一级列表
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []

        })
    }

    //显示添加到确认框
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    //添加分类回调函数
    addCategory = () => {
        //console.log('addCategory()')
        //先进行输入校验，只有校验通过才执行后面的动作
        this.form.validateFields( async (err,values) => {
            if(!err) {
                //1. 隐藏确认框
                this.setState({
                    showStatus: 0
                })

                //2. 收集数据，并提交添加分类的请求
                //收集数据
                const {parentId,categoryName} = this.form.getFieldsValue()
                //提交请求
                const result = await reqAddCategory(categoryName,parentId)
                //清除上一次输入的数据
                this.form.resetFields()
                //如果请求成功
                if(result.status===0) {
                    //如果添加的分类就是当前分类列表下的分类
                    if(parentId===this.state.parentId) {
                        //3. 重新获取分类列表
                        this.getCategorys()
                    } else if(parentId==='0') {   //在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示一级分类列表
                        this.getCategorys('0')
                    }
                }
            }
        })
    }

    //修改分类的确认框
    showUpdate = (category) => {
        //保存分类对象
        this.category = category
        //更新状态
        this.setState({
            showStatus: 2
        })
    }

    //删除分类确认框
    showDelete = (category) => {
        //保存分类对象
        this.category = category
        //更新状态
        this.setState({
            showStatus: 3
        })
    }


    //修改分类回调函数
    updateCategory = () => {
        //console.log('updateCategory()')
        //先进行表单验证，只有通过了之后才执行
        this.form.validateFields( async (err,values) => {
            if(!err) {
                //1. 隐藏确定框
                this.setState({
                    showStatus: 0
                })
                //2. 发请求更新分类
                //准备数据
                const categoryId = this.category.category_id
                const {categoryName} = values
                console.log(categoryName)
                //清除上次输入数据的缓存
                this.form.resetFields()
                //发送异步请求
                const result = await reqUpdateCategory(categoryId,categoryName)
                //判断更新分类是否正常
                if(result.status===0) {
                    //3. 重新显示分类列表
                    this.getCategorys()
                }
            }
        })
    }

    //删除分类回调函数
    deleteCatogory = async () => {
        //1. 隐藏确定框
        this.setState({
            showStatus: 0
        })
        //2. 发送删除分类请求
        //准备数据
        const categoryId = this.category.category_id
        console.log(categoryId)
        //清除上次显示框数据的缓存
        this.form.resetFields()
        //发送异步请求
        const result = await reqDeleteCategory(categoryId)
        //判断删除分类是否正常
        if(result.status===0) {
            //重新获取分类列表
            this.getCategorys()
        }
    }

    //隐藏添加/修改/删除分类框
    handleCancel = () => {
        //清除上次输入数据的缓存
        this.form.resetFields()
        //隐藏确认框
        this.setState({
            showStatus: 0
        })
    }

    //render之前调用initColums函数，为第一次render准备数据
    UNSAFE_componentWillMount () {
        this.initColums()
    }

    //发异步ajax请求
    componentDidMount () {
        //获取一级分类列表
        this.getCategorys()
    }

    render() {

        //读取状态数据
        const {categorys,loading,subCategorys,parentId,parentName,showStatus} = this.state
        const category = this.category  || {}    //如果还没有指定就赋予一个空对象
        const title = parentId==='0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type='double-right' style={{ marginRight: 5 }}></Icon>
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus'  />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='category_id'
                    //数据加载友好提示
                    loading={loading}
                    dataSource={parentId==='0' ? categorys : subCategorys} 
                    columns={this.columns}
                    //自定义分页即快速跳转到某页
                    pagination={{defaultPageSize:5,showQuickJumper:true}}    
                />
                {/* 添加分类弹出框 */}
                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm key={parentId} categorys={categorys} parentId={parentId} setForm={(form) => {this.form = form}}/>
                </Modal>
                {/* 修改分类弹出框 */}
                <Modal
                    title="修改分类"
                    visible={showStatus===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    {/* 
                    父组件以参数的形式传递一个函数给子组件，从而获取到子组件的form属性，并存起来
                    */}
                    <UpdateForm categoryName={category.name} setForm={(form) => {this.form = form}}/>
                </Modal>
                <Modal
                    title="删除分类"
                    visible={showStatus===3}
                    onOk={this.deleteCatogory}
                    onCancel={this.handleCancel}
                >
                    {/*
                    父组件以参数的形式传递一个函数给子组件，从而获取到子组件的form属性，并存起来
                    */}
                    <DeleteForm categoryName={category.name} setForm={(form) => {this.form = form}}/>
                </Modal>
            </Card>
        )
    }
}
