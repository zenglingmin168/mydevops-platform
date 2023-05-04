import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
*/
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    } 

    UNSAFE_componentWillUpdate(){
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        //创建角色显示表单的样式
        const formItemLayout = {
            labelCol : {span: 5},       //左侧label的宽度
            wrapperCol: {span: 16}       //右侧包裹的宽度
        }

        return (
            <Form>
                <Item label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator('roleName',{
                            initialValue: '',
                            rules: [
                                {required: true, message: '角色名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入角色名称'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
//用高阶组件处理下AddForm组件
export default Form.create()(AddForm)
