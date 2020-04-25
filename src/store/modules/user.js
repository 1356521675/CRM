import Vue from 'vue'
import {
  login,
  getInfo,
  logout
} from '@/api/login'
import {
  ACCESS_TOKEN,
  INDEX_PAGE
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'
import {
  menulist
} from '@/config/menu'


let myIds = []
for (var i = 1; i < 80; i++) {
  myIds.push(i + '')
}


const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    sysListInfo: [],
    msgNum: 0,
    unauditedNum: {},
    refreshMsg: true,
    loadPath: '/'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SYSLISTINFO: (state, info) => {
      state.sysListInfo = info
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_MSGNUM: (state, num) => {
      state.msgNum = num
    },
    SET_UNAUDITEDNUM: (state, num) => {
      state.unauditedNum = num
    },
    SET_loadPath: (state, path) => {
      state.loadPath = path
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          Vue.ls.set(ACCESS_TOKEN, result.data.accessToken, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.data.accessToken)
          if (response.code == 200) {
            getInfo().then(res => {
              if (res.code == 200) {
                let menuIds = []
                function one(item) {
                  if (item.children.length == 0) {
                    menuIds.push({
                      permissionId: (item.id + '')
                    })
                  } else {
                    menuIds.push({
                      permissionId: (item.id + '')
                    })
                    item.children.forEach(function (list) {
                      one(list)
                    })
                  }
                }
                res.data.menu.forEach(function (item) {
                  one(item)
                })
                res.data.menu.forEach(function (item, index) {
                  if (item.children.length == 0) {
                    let myindex = menuIds.indexOf({
                      permissionId: (item.id + '')
                    })
                    menuIds.splice(myindex, 1)
                  }
                })
                let topath = ''
                menulist.forEach(item => {
                  if (item.permission == menuIds[1].permissionId) {
                    topath = item.path
                  }
                })
                commit('SET_loadPath', topath)
                Vue.ls.set(INDEX_PAGE, topath)
                response.data.topath = topath
                resolve(response)
              } else {
                resolve(res)
              }
            }).catch(err => {
              // 
            })
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        let myPath= Vue.ls.get(INDEX_PAGE)? Vue.ls.get(INDEX_PAGE) : ''
        getInfo().then(response => {
          if (response.code == 200) {
            let menuIds = []

            function one(item) {
              if (item.children.length == 0) {
                menuIds.push({
                  permissionId: (item.id + '')
                })
              } else {
                menuIds.push({
                  permissionId: (item.id + '')
                })
                item.children.forEach(function (list) {
                  one(list)
                })
              }
            }

            let showMenu = []
            response.data.menu.forEach(function (item, index) {
              if (item.children.length != 0) {
                showMenu.push(item)
              }
            })
            showMenu.forEach(function (item) {
              one(item)
            })
            let topath = ''
            menulist.forEach(item => {
              if (item.permission == menuIds[1].permissionId) {
                topath = item.path
              }
            })
            if(response.data.user_id=='7' || response.data.user_id=='11'){
              menuIds.push({permissionId:'infos'})
            }
            commit('SET_loadPath', topath)
            let res = {
              'name': response.data.user_name ? response.data.user_name : response.data.user_name,
              'username': response.data.user_name,
              'avatar': '/default-avatar.png',
              'userInfo': response.data,
              'role': {
                'id': response.data.user_id,
                'name': response.data.user_name,
                'permissions': menuIds,
                'path':myPath
              }
            }
            const result = res
            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }
            commit('SET_NAME', result.name)
            commit('SET_AVATAR', result.avatar)
            resolve(res)
          } else {
            notification.error({
              message: '错误',
              description: response.msg
            })
            store.dispatch('Logout').then(() => {
              next({
                path: '/user/login',
                query: {
                  redirect: to.fullPath
                }
              })
            })
            return false
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取子系统信息
    GetSysList({
      commit
    }) {
      getInfo().then(() => {
        let sysListData= [
          { name: "点识", id: 1 ,key:'dianshi_token1',ip:'http://192.168.102.101:7771'},
          { name: "易点通", id: 2 ,key:'yidiantong_token2',ip:'http://192.168.102.101:7772'},
          { name: "店店通", id: 3 ,key:'diandiantong_token3',ip:'http://192.168.102.101:7773'},
          { name: "博达", id: 4 ,key:'boda_token4',ip:'http://192.168.102.101:7774'}
        ];
        commit('SET_SYSLISTINFO', sysListData)
      }).catch(() => {
      })
    },
    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        // commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
        commit('SET_TOKEN', '')

      })
    },
    // 设置消息数
    setMsgNum({
      commit
    }, num) {
      commit('SET_MSGNUM', num)
    },
    //用户修改姓名
    setCusName({
      commit
    }, name) {
      commit('SET_NAME', name)
    },
    // 设置评论区未审核数
    setUnauditedNum({
      commit
    }, num) {
      commit('SET_UNAUDITEDNUM', num)
    },
  }
}

export default user