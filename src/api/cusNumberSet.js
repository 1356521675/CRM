// 客户量设置
import {
  axios
} from '@/utils/request'

import api from './index'

/********************客户量 ********************/
// 设置客户量--部门组别(展示)
export function getCsdSetnum(systemInfo) {
  return axios({
    url: api.basePart + '/csd/setnum',
    method: 'get',
    systemInfo: systemInfo
  })
}
// 设置客户量--部门组别(编辑)
export function getCsdAgainAllowUpdata(parameter,systemInfo) {
  return axios({
    url: api.basePart + '/csd/again_allow_update',
    method: 'post',
    data: parameter,
    systemInfo: systemInfo
  })
}

// 查看客户量设置--小组个人
export function getSaleCusNum (systemInfo) {
  return axios({
    url: api.basePart+'/sale/cus-num',
    method: 'get',
    systemInfo: systemInfo
  })
}
// 客户量设置--小组个人
export function postSaleCusNum (parameter,systemInfo) {
  return axios({
    url: api.basePart+'/sale/cus-num',
    method: 'put',
    data: parameter,
    systemInfo: systemInfo
  })
}

/********************客户量 ********************/


