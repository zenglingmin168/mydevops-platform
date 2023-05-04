import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
} from 'antd'

// const Item = Form.Item 

class DeleteForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {categoryName} = this.props
        // const {getFieldDecorator} = this.props.form
        return (
            // <Form>
            //     <Item>
            //         {
            //             getFieldDecorator('categoryName',{
            //                 //显示要删除的分类名称
            //                 initialValue: categoryName
                            
            //             })(
            //                 <Input placeholder='请输入分类名称'/>
            //             )
            //         }
            //     </Item>
            // </Form>
            <span>确定要删除 “{categoryName}” 吗？</span>
        )
    }
}
export default Form.create()(DeleteForm)
