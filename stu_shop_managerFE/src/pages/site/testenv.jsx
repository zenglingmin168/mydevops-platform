import React, { Component } from 'react'
import { Button } from 'antd'
import './index.css'

export default class Testenv extends Component {
    render() {
        // 定义测试环境地址跳转回调函数
        const jumpToTestJenkins = () => {
            const w = window.open('_black')
            let url = 'https://jenkins-dev.pushplus.cn/login?from=%2F'
            w.location.href = url
        }
        const jumpToTestConfig = () => {
            const w = window.open('_black')
            let url = 'https://arch-git.jiatuiyun.net/devconfig/service-config-test-ms-refactor'
            w.location.href = url
        }
        const jumpToTestMsr = () => {
            const w = window.open('_black')
            let url = 'http://msr.jiatuitest.com/service-envdirect/index.html'
            w.location.href = url
        }
        const jumpToTestHarbor = () => {
            const w = window.open('_black')
            let url = 'https://harbor.jiatuiyun.net/harbor/sign-in?redirect_url=%2Fharbor%2Fprojects'
            w.location.href = url
        }
        const jumpToTestXXLjob = () => {
            const w = window.open('_black')
            let url = 'http://arch-xjob.ms.jiatuitest.com/jobinfo'
            w.location.href = url
        }
        const jumpToTestPrometheus = () => {
            const w = window.open('_black')
            let url = 'http://192.168.1.66:3000/d/KT3QxjMnk/1-node-exporter-for-prometheus-dashboard-cn-v20191102?orgId=1&from=now-5m&to=now&var-job=test-env&var-hostname=All&var-node=All&var-maxmount=%2Fdata&var-env=&var-name='
            w.location.href = url
        }
        return (
            <div>
                {/* <font style={{color: 'red', margin: '10px'}} size='5'>测试环境</font><br/> */}
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToTestJenkins()}}
                    className='aaa'                   
                >测试Jenkins</Button>
                <Button
                    style={{backgroundColor: '#90ee90',margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToTestHarbor()}}
                >测试Harbor</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToTestConfig()}}
                ><div>测试配置中心</div></Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px',fontSize: '30px'}}
                    onClick={() => {jumpToTestMsr()}}
                >测试msr</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px',fontSize:'30px'}}
                    onClick={() => {jumpToTestXXLjob()}}
                >测试XXLjob</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToTestPrometheus()}}
                >测试Prometheus</Button>
            </div>
        )
    }
}
