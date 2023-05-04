
/*
定义一个数组类型的模块，用于将数据从展示部分单独剥离出来，然后再根据数组数据的变化动态的生成展示内容
*/

const menuList = [
    {
        title: '首页',   //菜单标题名称
        key : '/home',  //以对应path作为key，可防止重复
        icon: 'home'    //图标名称
    },
    {
        title: '项目管理',
        key : '/projects',
        icon: 'project',
        children : [  //子菜单列表
            {
                title: '项目列表',
                key : '/category',
                icon: 'unordered-list',
            },
            {
                title: '环境服务管理',
                key : '/product',
                icon: 'copy',
            },
            {
                title: '流转队列',
                key : '/cirqueue',
                icon: 'control',
            }
        ]
    },
    {
        title: '资产管理',
        key : '/assets',
        icon: 'money-collect',
        children : [  //子菜单列表
            {
                title: '服务器列表',
                key : '/machine',
                icon: 'credit-card',
            }
        ]
    },
    {
        title: '操作redis',
        key : '/redis-ops',
        icon: 'control',
        children : [  //子菜单列表
            {
                title: '查询key',
                key : '/searchkey',
                icon: 'search',
            },
            {
                title: '清缓存',
                key: '/flushcache',
                icon: 'delete'
            }
        ]
    },
    {
        title: '灰度操作',
        key : '/huidu-ops',
        icon: 'file-add',
        children : [  //子菜单列表
            {
                title: '查询灰度',
                key : '/huidusearch',
                icon: 'search',
            },
            {
                title: '开启灰度',
                key : '/huiduup',
                icon: 'caret-up',
            },
            {
                title: '取消灰度',
                key: '/huidudown',
                icon: 'caret-down',
            }
        ]
    },
    {
        title: '配置中心',
        key : '/configures',
        icon: 'form',
        children : [  //子菜单列表
            {
                title: '集群',
                key : '/cluster',
                icon: 'radar-chart',
            },
            {
                title: '镜像仓库',
                key : '/imgregistry',
                icon: 'shop',
            },
            {
                title: 'Git仓库',
                key : '/gitregostry',
                icon: 'gitlab',
            },
            {
                title: 'Jenkins',
                key : '/jenkins',
                icon: 'apartment',
            },
            {
                title: '全局通用模版',
                key : '/globaltemplate',
                icon: 'global',
            },
            {
                title: '通用模版变量',
                key : '/commvariable',
                icon: 'profile',
            }
        ]
    },
    {
        title: '站点导航',
        key: '/site',
        icon: 'bank',
        children: [ //子菜单
            {
                title: '生产环境',
                key: '/prodenv',
                icon: 'profile'
            },
            {
                title: '测试环境',
                key: '/testenv',
                icon: 'profile'
            },
            {
                title: '云平台',
                key: '/clouds',
                icon: 'cloud'
            }
        ]
    },
    {
        title: '小程序鉴权',
        key: '/minapp',
        icon: 'aliwangwang',
        children: [
            {
                title: '校验处理',
                key: '/mincheck',
                icon: 'diff'
            }
        ]
    },
    {
        title: '系统管理',
        key : '/settings',
        icon: 'setting',
        children : [  //子菜单列表
            {
                title: '账户管理',
                key : '/user',
                icon: 'user',
            },
            {
                title: '角色管理',
                key : '/role',
                icon: 'team',
            },
            {
                title: '系统设置',
                key : '/sysset',
                icon: 'appstore',
            }
        ]
    }
]

export default menuList
