import React, { Component } from 'react'
import { Select,Icon,Divider, Button,Upload } from 'antd'
import LinkButton from '../../components/link-button';
const { Option } = Select
let index = 0;

export default class MinCheck extends Component {
    state = {
        items: ['resource.aijiatui.com','business.aijiatui.com','test.aijiatui.com']
    }

    // const props = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //       authorization: 'authorization-text',
    //     },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //       }
    //     },
    // }

    render() {
        const {items} = this.state

        return (
            <span style={{margin: 20, width: 400,height: 20}}>
                选择校验域名：
                <Select
                    style={{ width: 240 }}
                    placeholder="选择要校验的域名"
                    size='large'
                    // dropdownRender={menu => (
                    //   <div>
                    //     {menu}
                    //     <Divider style={{ margin: '4px 0' }} />
                    //   </div>
                    // )}
                > 
                    {items.map(item => (
                      <Option key={item}>{item}</Option>
                    ))}
                </Select>
                <Button 
                    style={{margin: 10}}
                    type='primary'
                    size='large' 
                    icon='upload' 
                    onClick={() => {}}
                >
                上传校验文件
                </Button>
                {/* <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                mountNode */}
                <Button type='primary' size='large' style={{margin: 10}}>刷新配置</Button>
            </span>
        )
    }
}
