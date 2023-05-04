import React, { Component } from 'react'
import { Button } from 'antd'

export default class Clouds extends Component {
    render() {
        // 定义各云平台地址跳转回调函数
        const jumpToTencent = () => {
            const w = window.open('_black')
            let url = 'https://console.cloud.tencent.com/'
            w.location.href = url
        }
        const jumpToAliyun = () => {
            const w = window.open('_black')
            let url = 'https://home.console.aliyun.com/home/dashboard/ProductAndService'
            w.location.href = url
        }
        const jumpToHuawei = () => {
            const w = window.open('_black')
            let url = 'https://console.huaweicloud.com/console/?region=cn-south-1#/home'
            w.location.href = url
        }
        const jumpToBaidu = () => {
            const w = window.open('_black')
            let url = 'https://login.bce.baidu.com/login'
            w.location.href = url
        }
        const jumpToWangyi = () => {
            const w = window.open('_black')
            let url = 'https://app.yunxin.163.com/overview'
            w.location.href = url
        }
        
        return (
            <div>
                {/* <font style={{color: 'red',margin: '10px'}} size='5'><b/>云平台</font><br/> */}
                <Button 
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToTencent()}}
                >腾讯云</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToHuawei()}}
                >华为云</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToAliyun()}}
                >阿里云</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToBaidu()}}
                >百度云</Button>   
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '350px', height: '100px', fontSize: '30px'}}
                >网易云</Button>
            </div>
        )
    }
}
