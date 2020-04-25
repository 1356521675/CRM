// 竞价数据
import {
  axios
} from '@/utils/request'
import api from './index'



/********************ROI********************/
// ROI（列表）
export function getBiddingRoiList(parameter,systemInfo) {
  return axios({
    url: api.basePart + '/bidding/roi-list',
    method: 'get',
    params: parameter,
    systemInfo: systemInfo
  })
}
// ROI--汇总
export function getBiddingRoiSummarize(parameter,systemInfo) {
  return axios({
    url: api.basePart + '/bidding/roi-summarize',
    method: 'get',
    params: parameter,
    systemInfo: systemInfo
  })
}
// ROI--导出
export function getBiddingRoiDownload(parameter) {
  return axios({
    url: api.basePart + '/bidding/roi-download',
    method: 'get',
    params: parameter
  })
}

/********************升级占比********************/
// 升级占比（列表）
export function getBiddingUpgradeList(parameter) {
  return axios({
    url: api.basePart + '/bidding/upgrade-list',
    method: 'get',
    params: parameter
  })
}
// 升级占比--汇总
export function getBiddingUpgradeTotal(parameter) {
  return axios({
    url: api.basePart + '/bidding/upgrade-total',
    method: 'get',
    params: parameter
  })
}
// 升级占比--导出
export function getBiddingUpgradeDownload(parameter) {
  return axios({
    url: api.basePart + '/bidding/upgrade-download',
    method: 'get',
    params: parameter
  })
}

/********************个人占比********************/
// 个人占比（列表）
export function getBiddingPersonalList(parameter) {
  return axios({
    url: api.basePart + '/bidding/personal-list',
    method: 'get',
    params: parameter
  })
}
// 个人占比--汇总
export function getBiddingPersonalTotal(parameter) {
  return axios({
    url: api.basePart + '/bidding/personal-total',
    method: 'get',
    params: parameter
  })
}
// 个人占比--导出
export function getBiddingPersonalDownload(parameter) {
  return axios({
    url: api.basePart + '/bidding/personal-download',
    method: 'get',
    params: parameter
  })
}

/********************部门转化********************/
// 部门转化（列表）
export function getBiddingDepList(parameter) {
  return axios({
    url: api.basePart + '/bidding/dep-list',
    method: 'get',
    params: parameter
  })
}
// 部门转化--汇总
export function getBiddingDepTotal(parameter) {
  return axios({
    url: api.basePart + '/bidding/dep-total',
    method: 'get',
    params: parameter
  })
}
// 部门转化--导出
export function getBiddingDepDownload(parameter) {
  return axios({
    url: api.basePart + '/bidding/dep-download',
    method: 'get',
    params: parameter
  })
}

/********************个人转化********************/
// 个人转化（列表）
export function getBiddingPerList(parameter) {
  return axios({
    url: api.basePart + '/bidding/per-list',
    method: 'get',
    params: parameter
  })
}
// 个人转化--汇总
export function getBiddingPerTotal(parameter) {
  return axios({
    url: api.basePart + '/bidding/per-total',
    method: 'get',
    params: parameter
  })
}
// 个人转化--导出(获取key)
export function getBiddingPerDownload(parameter) {
  return axios({
    url: api.basePart + '/bidding/per-all',
    method: 'get',
    params: parameter
  })
}

/********************添加状态********************/
// 添加状态（列表）
export function getBiddingAdd(parameter) {
  return axios({
    url: api.basePart + '/bidding/add',
    method: 'get',
    params: parameter
  })
}

/********************客户信息********************/
// 客户信息（列表）
export function getBiddingCustomer(parameter) {
  return axios({
    url: api.basePart + '/bidding/customer',
    method: 'get',
    params: parameter
  })
}
// 客户信息--导出
export function getBiddingDownloadCustomer(parameter) {
  return axios({
    url: api.basePart + '/bidding/downloadCustomer',
    method: 'get',
    params: parameter
  })
}