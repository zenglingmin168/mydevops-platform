import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table
} from 'antd'
import LinkButtom from '../../components/link-button'

const Option = Select.Option

//Product的默认子路由组件
export default class ProductHome extends Component {

    state = {
        products: [
            {
                'status': 1,
                'imgs': [
                    'image-155.jpg',
                    'image-156.jpg'
                ],
                "product_id": 'aaa111',
                'name': '联想ThinkPad 翼480',
                'desc': '年度重量级新品，X390',
                'price': 66000,
                'pCategoryId': 'aaa112',
                'categoryId': 'aaa113',
                'detail': '联想电脑，办公好助手',
                'product_v': 0
            },
            {
                'status': 1,
                'imgs': [
                    'image-157.jpg',
                    'image-158.jpg'
                ],
                "product_id": 'bbb221',
                'name': '戴尔 S600',
                'desc': '年度重量级新品，X990',
                'price': 66000,
                'pCategoryId': 'bbb222',
                'categoryId': 'bbb223',
                'detail': '戴尔电脑，大厂出品',
                'product_v': 0
            },
        ] //商品的数组
    }

    initColums = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '¥' + price   //当前指定了对应的属性，传入的对应的属性值
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: (price) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <LinkButtom>详情</LinkButtom>
                            <LinkButtom>修改</LinkButtom>
                        </span>
                    )
                }
            },
        ]
    }

    UNSAFE_componentWillMount () {
        this.initColums()
    }

    render() {

        const {products} = this.state
        
        const title = (
            <span>
                <Select value='1' style={{width: 150}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}}/>
                <Button type='primary'>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered  //边框，布尔值，默认为true
                    rowKey='product_id' 
                    dataSource={products}
                    columns={this.columns} 
                />
            </Card>
        )
    }
}
