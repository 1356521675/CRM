import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
// import md5 from 'js-md5'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
let subInterface = false;
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_MSG? process.env.VUE_APP_MSG : '', // api base_url
  // timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if(subInterface){

    }else{
      if (error.response.status === 400) {
        if(error.response.msg == 'Malformed UTF-8 characters, possibly incorrectly encoded'){
          if (token) {
            // notification.error({
            //   message: '错误',
            //   description: '您的登陆信息验证失败，请重新登陆'
            // })
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
        }
      }
      if (error.response.status === 401) {
        if(error.response.data.msg == '您还没有登录'){
          if (token) {
            // notification.error({
            //   message: '错误',
            //   description: '您的登陆信息验证失败，请重新登陆'
            // })
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
        }
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  let token = Vue.ls.get(ACCESS_TOKEN)
  subInterface= false;
  if(config.systemInfo){
    subInterface= true;
    config.baseURL = config.systemInfo.ip;
    token = config.systemInfo.key;
  };
  config.params = {
    _t: Date.parse(new Date())/1000,
    ...config.params
  }
  if (token) {
    config.headers['accessToken'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if(response.data.code== 400){
    if(response.data.msg=="联系方式已存在" || response.data.msg=='暂无数据' || response.data.msg=='抱歉，暂无数据'){

    }else{
      // if (token) {
      //   notification.error({
      //     message: '提示',
      //     description: '您的登陆信息验证失败，请重新登陆'
      //   })
      //   store.dispatch('Logout').then(() => {
      //     setTimeout(() => {
      //       window.location.reload()
      //     }, 1500)
      //   })
      // }
    }
  }else if(response.data.code== 401){
      // notification.warning({
      //   message: '提示',
      //   description: '您没有此操作权限,请联系系统管理员'
      // })
    // if (token) {
    //   notification.warning({
    //     message: '提示',
    //     description: '您没有权限查看此内容,请联系系统管理员'
    //   })
    //   store.dispatch('Logout').then(() => {
    //     setTimeout(() => {
    //       window.location.reload()
    //     }, 1500)
    //   })
    // }
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
