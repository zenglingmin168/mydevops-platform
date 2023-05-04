import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
*/
class UpdateForm extends Component {
    //接收父组件传过来的参数
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount () {
        //将form通过setForm()传递给父组件
        this.props.setForm(this.props.form)
    }

    render() {
        //获取要更新的分类的名称
        const {categoryName} = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            //显示要更新的分类名称
                            initialValue: categoryName,
                            rules : [
                                {required: true, message: '分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
//用高阶组件处理下UpdateForm组件
export default Form.create()(UpdateForm)
