/*
定义一个数组类型的模块，用于将数据从展示部分单独剥离出来，然后再根据数组数据的变化动态的生成展示内容
*/

const setmenuList = [
    {
        title: '基本设置',   //菜单标题名称
        key : '/baseset'  //以对应path作为key，可防止重复
    },
    {
        title: '安全设置',
        key : '/secset'
    },
    {
        title: 'LDAP设置',
        key : '/ldapset'
    },
    {
        title: '密钥设置',
        key : '/keyset'
    },
    {
        title: '报警服务设置',
        key : '/alertset'
    },
    {
        title: '开放服务设置',
        key : '/openset'
    },
    {
        title: '关于',
        key : '/about'
    }
]

export default setmenuList
