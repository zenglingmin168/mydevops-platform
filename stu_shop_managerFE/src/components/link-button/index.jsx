import React  from 'react'
import './index.less'

//外形像链接的按钮组件，常用来代替a标签中的Link使用，可以作为通用组件来使用
export default function LinkButton(props) {
    return <button {...props} className='link-button'></button>
}