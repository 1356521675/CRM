import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */

// 登陆
export function login (parameter) {
  return axios({
    url: api.basePart+'/login',
    method: 'post',
    data: parameter
  })
}

// 注册
export function register (parameter) {
  return axios({
    url: api.basePart+'/login/register',
    method: 'post',
    data: parameter
  })
}

// 短息验证码
export function getSmsCode (phone,parameter) {
  return axios({
    url: api.basePart+'/sms/code/'+phone,
    method: 'get',
    params: parameter
  })
}

// 获取登陆人员信息
export function getInfo () {
  return axios({
    url: api.basePart+'/user/user-info',
    method: 'get',
  })
}

// 退出
export function logout (token) {
  return axios({
    url: api.basePart+'/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'accessToken' : token
    }
  })
}

