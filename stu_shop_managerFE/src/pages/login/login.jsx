import React, { Component } from 'react'
import { Form,
         Icon,
         Input, 
         Button,
         message}
        from 'antd';
import logo from '../../assets/images/login-logo.png'
import './login.less'
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router';


//后台登陆的路由组件
class Login extends Component {
    handleSubmit = e => {
        //阻止事件的默认提交
        e.preventDefault();
        //全局表单校验
        /*方法一、常规promise对象写法
        this.props.form.validateFields((err,values)=>{
            if(!err) {
                console.log('提交登陆的ajax请求成功',values)               
                const {username,password} = values
                reqLogin(username,password).then(response => {
                    console.log('成功了',response.data)
                }).catch(error=>{
                    console.log('失败了',error)
                })
                
            } else {
                console.log('校验失败')
            }
        });
        */
        
        //方法二、用async和await简化promise对象后的写法
        this.props.form.validateFields(async (err,values)=>{
            if(!err) {              
                const {username,password} = values
                const result = await reqLogin(username,password)  ////有如下返回结果{status:0,data: user}或 {status:1,msg: 'xxx'}
                //console.log('请求成功',result)
                if(result.status===0){  //登陆成功，提示成功信息
                    message.success('登陆成功')
                    //登陆成功时，实际上传递过来了一个user对象
                    const user = result.data
                    //跳转之前保存user信息到内存中
                    memoryUtils.user = user
                    //跳转之前保存user信息到local中，持久化存储
                    storageUtils.saveUser(user)
                    //跳转到后台管理界面（不需要在回退到登陆界面）
                    this.props.history.push('/')
                } else {  //登陆失败，提示错误信息
                    message.error('登陆失败：用户名密码错误！')
                }
            } else {
                console.log('校验失败')
            }
        });

        //*  局部表单校验
        //得到form对象
        //const form = this.props.form;
        //获取表单项的输入数据
        //const values = form.getFieldsValue();
        //console.log('handleSubmit()',values);
    }

    //对密码进行自定义校验
    validatePwd = (rule,value,callback) => {
        if(!value){
            callback('密码不能为空')
        } else if(value.length<4) {
            callback('密码长度不能少于4位数')
        } else if(value.length>10) {
            callback('密码长度不能超过10位数')
        } else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('用户名必须是字母、数字、下划线')
        } else {
            callback()   //返回空表示密码输入符合要求
        }
    }

    render() {
        //判断用户是否登陆，如已登陆，自动跳转到管理界面
        const user = memoryUtils.user
        if(user && user._id) {
            return <Redirect to='/' />
        }

        //得到具有强大功能的form对象，繁写
        //const form = this.props.form;
        //const {getFieldDecorator} from form;
        //简写
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='login'>
                {/* 头部区 */}
                <header className='login-header'>
                    <img src={logo} alt='logo'/>
                    <h1>加推运维平台</h1>
                </header>
                {/* 内容区 */}
                <section className='login-content'>
                    {/* 登陆框标题 */}
                    <h2>用户登陆</h2>
                    {/* 登陆界面输入框*/}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                          {getFieldDecorator('username', {  //配置对象：属性名是特定的一些名称
                          //声明式验证：直接使用别人定义好的验证规则进行验证
                            rules: [
                                { required: true, whitespace: true, message: '请输入用户名' },
                                { min: 4, message: '最少长度不能少于4' },
                                { max: 10, message: '最大长度不能超过10' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '请输入用户名' }, //用户名必须是字母、数字、下划线
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />
                        )}
                        </Form.Item>
                        <Form.Item>
                            {/* 自定义验证 */}
                            {getFieldDecorator('password', {
                                rules: [{ validator: this.validatePwd }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
//包装Form组件，生成一个新的组件：Form(Login)，form是其对象之一，并传递给子组件使用
const WrapLogin = Form.create()(Login);
export default WrapLogin
