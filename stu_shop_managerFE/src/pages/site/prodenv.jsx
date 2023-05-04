import React, { Component } from 'react'
import { Button } from 'antd'

export default class Prodenv extends Component {
    
    render() {
        // 定义生产环境各平台地址跳转回调函数
        const jumpToProdSQL = () => {
            const w = window.open('_black')
            let url = 'https://sqlprod.jiatuiyun.net/dbaprinciples/'
            w.location.href = url
        }
        const jumpToProdGitlab = () => {
            const w = window.open('_black')
            let url = 'https://git.jiatuiyun.net/'
            w.location.href = url
        }
        const jumpToProdConfig = () => {
            const w = window.open('_black')
            let url = 'https://arch-gitlab.aijiatui.com/root/prodconfig-company-k8s'
            w.location.href = url
        }
        const jumpToDeploy = () => {
            const w = window.open('_black')
            let url = 'http://deploy.jiatuiyun.net/'
            w.location.href =url
        }
        const jumpToProdJenkins = () => {
            const w = window.open('_black')
            let url = 'https://jenkins-ops.jiatuiyun.net/login?from=%2F'
            w.location.href = url
        }
        const jumpToProdHarbor = () => {
            const w = window.open('_black')
            let url = 'https://hub.jiatuiyun.net/harbor/sign-in?redirect_url=%2Fharbor%2Fprojects'
            w.location.href = url
        }
        const jumpToProdNexus = () => {
            const w = window.open('_black')
            let url = 'https://vip-maven.jiatuiyun.net/#admin/repository/repositories:npmjs'
            w.location.href = url
        }
        const jumpToProdXXLjob = () => {
            const w = window.open('_black')
            let url = 'http://arch-xjob.ms.jiatuiprod.com/'
            w.location.href = url 
        }
        const jumpToProdMsr = () => {
            const w = window.open('_black')
            let url = 'http://msr.jiatuiprod.com/service-envdirect/index.html'
            w.location.href = url
        }
        const jumpToWiki = () => {
            const w = window.open('_black')
            let url = 'https://wiki.jiatuiyun.net/'
            w.location.href = url
        }
        const jumpToDocs = () => {
            const w = window.open('_black')
            let url = 'https://docs.ops.jiatuiyun.net/'
            w.location.href = url
        }
        return (
            <div>
                {/* <font className='prod' style={{color:'red', height: '20px', width: '100px', margin: '10px'}} size='5'><b/>生产环境</font><br/> */}
                {/* 点击切换到新页面 */}
                {/* <Button 
                    style={{backgroundColor:'#F0F2F5',margin: '10px'}} 
                    onClick={()=>{window.location.href="https://baidu.com"}} 
                    className="r-button"
                >百度</Button> */}
                {/* 点击打开一个新页面 */}
                <Button
                    style={{backgroundColor: '#90ee90',margin: '10px', width: '260px', height: '100px', fontSize:'30px'}}
                    onClick={() => {jumpToProdSQL()}}
                    // className='last-button'
                >生产sql审核平台</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToProdGitlab()}}
                >生产Gitlab</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToProdConfig()}}
                >生产配置中心</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToDeploy()}}
                >微服务部署平台</Button><br/>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToProdJenkins()}}
                >生产Jenkins</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToProdHarbor()}}
                >生产Harbor</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToProdNexus()}}
                >生产Nexus</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px',width: '260px', height: '100px',  fontSize: '30px'}}
                    onClick={() => {jumpToProdXXLjob()}}
                >生产XXLjob</Button><br/>
                <Button
                    style={{backgroundColor: '#90ee90',margin: '10px',width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToProdMsr()}}
                >生产环境msr</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px',width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToWiki()}}
                >公共文档Wiki</Button>
                <Button
                    style={{backgroundColor: '#90ee90', margin: '10px', width: '260px', height: '100px', fontSize: '30px'}}
                    onClick={() => {jumpToDocs()}}
                >运维文档Wiki</Button>
            </div>
        )
    }
}
