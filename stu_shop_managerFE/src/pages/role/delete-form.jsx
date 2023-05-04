import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'

class DeleteForm extends Component {
    static propTypes = {
        roleName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }
    UNSAFE_componentWillMount () {
        this.props.setForm(this.props.form)
    }
    render() {
        const {roleName} = this.props
        return (
            <span>确定要删除角色 “{roleName}” 吗？</span>
        )
    }
}

export default Form.create()(DeleteForm)
