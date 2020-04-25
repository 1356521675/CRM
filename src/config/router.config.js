// eslint-disable-next-line
import {
  BbsLayout,
  UserLayout,
  BasicLayout,
  RouteView,
  PageView,
  ManagerLayout
} from '@/components/layouts'
import {
  yd_depament,
  yd_permission,
  yd_market,
  marketkehuliang,
  marketluru,
  marketshujufenxi,
  marketlaiyuan,
  marketfuwu,
  sale_dep,
  sale_yeji,
  sale_shenhe,
  sale_leibie,
  sale_zhuanyi,
  sale_guize,
  sale_kehu,
  sale_zhuangtai,
  sale_zhifu,
  sale_chanpin,
  crm_hetong,
  crm_caiwu,
  yd_newRetail,
  crm_setting,
  fuwu_paishe,
  zhuangxiu,
  yunying,
  tuiguang,
  shouh,
  jiancha,
  weitikehu,
  tousuchuli,
  kehuchaxun,
  hetongmb,
  hetonggl,
  financefeiyong,
  financecangchu,
  usercentermsg,
  usercenterteam,
  weifenpei,
  mbidding,
  yd_source,
  sale_mycus,
  marketSearch,
} from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '',
    children: [
      // 市场
      {
        path: '/market',
        name: 'market',
        component: RouteView,
        redirect: '/market/service',
        meta: {
          title: '市场',
          icon: yd_market,
          permission: ["1"]
        },
        children: [
          {
            path: '/market/service',
            name: 'marketService',
            component: () => import(/* webpackPrefetch: true */  '@/views/market/service/index'),
            meta: {
              title: '客户录入',
              icon: marketluru,
              permission: ["6"]
            }
          },
          {
            path: '/market/cusSearch',
            name: 'marketCusSearch',
            component: () => import(/* webpackPrefetch: true */  '@/views/market/cusSearch/index'),
            meta: {
              title: '客户查询',
              icon: marketSearch,
              permission: ["6"]
            }
          },
          {
            path: '/market/pushList',
            name: 'marketPushList',
            component: () => import(/* webpackPrefetch: true */  '@/views/market/pushList/index'),
            meta: {
              title: '推送列表',
              icon: marketSearch,
              permission: ["6"]
            }
          },
          {
            path: '/market/source',
            name: 'source',
            component: PageView,
            component: () => import('@/views/market/source/index'),
            meta: {
              title: '来源设置',
              icon: marketlaiyuan,
              permission: ['7']
            }
          },
          {
            path: '/market/swt',
            name: 'swt',
            component: PageView,
            component: () => import('@/views/market/swt/index'),
            meta: {
              title: '商务通设置',
              icon: marketlaiyuan,
              permission: ['7']
            }
          },
          {
            path: '/market/set',
            name: 'set',
            component: () => import('@/views/market/customerVolumeSetting/index'),
            meta: {
              title: '客户量设置',
              icon: marketkehuliang,
              permission: ['8']
            }
          },
          {
            path: '/market/setUpTheSystem',
            name: 'setUpTheSystem',
            component: () => import('@/views/market/setUpTheSystem/modules/index'),
            meta: {
              title: '系统设置',
              icon: marketkehuliang,
              permission: ['19']
            }
          },
          {
            path: '/market/otherSettings',
            name: 'otherSettings',
            component: () => import('@/views/market/otherSettings/modules/index'),
            meta: {
              title: '其他设置',
              icon: marketkehuliang,
              permission: ['19']
            }
          },
          {
            path: '/market/configureServer',
            name: 'configureServer',
            component: () => import('@/views/market/configureServer/modules/index'),
            meta: {
              title: '配置服务器',
              icon: marketkehuliang,
              permission: ['19']
            }
          },
          {
            path: '/market/bidding',
            name: 'marketBidding',
            component: () => import('@/views/market/bidding/index'),
            meta: {
              title: '竞价数据',
              icon: mbidding,
              permission: ['107']
            }
          },
          {
            path: '/market/analysis',
            name: 'marketAnalysis',
            component: () => import(/* webpackPrefetch: true */  '@/views/market/analysis/index'),
            meta: {
              title: '数据分析',
              icon: marketshujufenxi,
              permission: ['9']
            }
          }
        ]
      },
      // 设置
      {
        path: '/userCenter',
        name: 'userCenter',
        component: RouteView,
        meta: {
          title: '设置',
          icon: crm_setting,
          permission: ['44']
        },
        redirect: '/userCenter/index',
        children: [
          {
            path: '/userCenter/index',
            name: 'userCenterIndex',
            component: () => import(/* webpackPrefetch: true */  '@/views/user/center/index'),
            meta: {
              title: '用户设置',
              icon: yd_depament,
              permission: ['45'],
              keepAlive: true
            }
          },
          {
            path: '/userCenter/team',
            name: 'userCenterTeam',
            component: () => import('@/views/user/team/index'),
            meta: {
              title: '组员管理',
              icon: usercenterteam,
              permission: ['46'],
              keepAlive: true
            }
          },
          {
            path: '/userCenter/message',
            name: 'userCenterMessage',
            component: () => import('@/views/user/message/index'),
            meta: {
              title: '消息中心',
              icon: usercentermsg,
              permission: ['47'],
              keepAlive: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/manager',
    name: 'mIndex',
    component: ManagerLayout,
    meta: {
      title: '首页'
    },
    permission: ['50'],
    redirect: '',
    children: [
      // 系统设置
      {
        path: '/manager/tree-list',
        name: 'TreeList',
        component: () => import('@/views/sysSetting/depament/TreeList'),
        meta: {
          title: '员工与部门管理',
          icon: yd_depament,
          permission: ['51'],
          keepAlive: true
        }
      },
      {
        path: '/manager/role',
        name: 'sysIndex',
        component: () => import('@/views/sysSetting/permission/index'),
        meta: {
          title: '角色权限控制',
          icon: yd_permission,
          permission: ['52']
        }
      },
      // {
      //   path: '/manager/rules',
      //   name: 'rulesIndex',
      //   component: () => import('@/views/sysSetting/permission/rules/index'),
      //   meta: {
      //     title: '权限控制',
      //     icon: sale_leibie,
      //     // permission: ['']
      //   }
      // },
      {
        path: '/manager/menu',
        name: 'menuIndex',
        component: () => import('@/views/sysSetting/menu/index'),
        meta: {
          title: '菜单管理',
          icon: sale_leibie,
          permission: ['53']
        }
      },
      {
        path: '/manager/log',
        name: 'managerLog',
        component: () => import('@/views/sysSetting/log/index'),
        meta: {
          title: '系统日志',
          icon: sale_guize,
          // permission: ['infos'],
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/bbs',
    component: BbsLayout,
    redirect: '/bbs/list',
    hidden: true,
    children: [
      {
        path: 'list',
        name: 'bbslist',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/bbs/index')
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
 
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
