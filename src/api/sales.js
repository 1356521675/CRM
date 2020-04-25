// 销售部
import { axios } from '@/utils/request'
import api from './index'


/********************客户管理 ********************/
// 查看本部门合同列表
export function getSaleContractList (parameter) {
  return axios({
    url: api.basePart+'/sale/fdd-contract-list',
    method: 'get',
    params: parameter
  })
}
// 搜索本部门合同列表
export function getSaleSearchContract (parameter) {
  return axios({
    url: api.basePart+'/sale/search-fdd-contract',
    method: 'get',
    params: parameter
  })
}
// 无合同
export function getContractNoFdd (parameter) {
  return axios({
    url: api.basePart+'/contract/no-fdd',
    method: 'get',
    params: parameter
  })
}
// 未服务
export function getContractNoService (parameter) {
  return axios({
    url: api.basePart+'/contract/no-service',
    method: 'get',
    params: parameter
  })
}
// 我的客户
export function getSalesIndex (parameter) {
  return axios({
    url: api.basePart+'/sale',
    method: 'get',
    params: parameter
  })
}
// 所有客户
export function getSalesAll () {
  return axios({
    url: api.basePart+'/sale/all',
    method: 'get',
  })
}
// 下属客户
export function getSalesSub () {
  return axios({
    url: api.basePart+'/sale/sub',
    method: 'get',
  })
}
// 添加状态列表
export function getSalesAddStatus () {
  return axios({
    url: api.basePart+'/sale/add-status',
    method: 'get',
  })
}
// 合作级别列表
export function getSalesRanklist () {
  return axios({
    url: api.basePart+'/sale/ranks',
    method: 'get',
  })
}
// 搜索--我的客户
export function getSalesSearch (parameter) {
  return axios({
    url: api.basePart+'/sale/search',
    method: 'get',
    params: parameter
  })
}
// 搜索--客户查询
export function getSalesRangeSearch (parameter) {
  return axios({
    url: api.basePart+'/sale/range-search',
    method: 'get',
    params: parameter
  })
}
// 客户详情
export function getSalesRead (id,parameter) {
  return axios({
    url: api.basePart+'/sale/'+id,
    method: 'get',
    params: parameter
  })
}
// 客户信息修改
export function putSalesedit (id,parameter) {
  return axios({
    url: api.basePart+'/sale/'+id,
    method: 'put',
    data: parameter
  })
}
// 成交信息录入
export function postSalesAddContract (parameter) {
  return axios({
    url: api.basePart+'/sale/add-contract',
    method: 'post',
    data: parameter
  })
}
// 合同金额修改
export function putSalesEditContract (id,parameter) {
  return axios({
    url: api.basePart+'/sale/edit-contract/'+id,
    method: 'put',
    data: parameter
  })
}
// 获取摄影信息数据
export function getSalesCamera (id) {
  return axios({
    url: api.basePart+'/sale/camera/'+id,
    method: 'get',
  })
}
// 摄影信息数据修改
export function putSalesCamera (parameter) {
  return axios({
    url: api.basePart+'/sale/camera',
    method: 'put',
    data: parameter
  })
}
// 摄影信息数据新增
export function postSalesCamera (parameter) {
  return axios({
    url: api.basePart+'/sale/camera',
    method: 'post',
    data: parameter
  })
}
// 摄影信息删除
export function delSalesCamera (id) {
  return axios({
    url: api.basePart+'/camera/'+id,
    method: 'delete',
  })
}
/********************客户状态管理 ********************/
// 编辑客户状态
export function getSalescusStatusEdit (id) {
  return axios({
    url: api.basePart+'/cus-status/'+id+'/edit',
    method: 'get',
  })
}
// 添加客户状态
export function postSalesCusStatus (parameter) {
  return axios({
    url: api.basePart+'/cus-status',
    method: 'post',
    data: parameter
  })
}
// 删除客户状态项
export function delSalesCusStatus (id) {
  return axios({
    url: api.basePart+'/cus-status/'+id,
    method: 'delete'
  })
}
// 更新客户状态
export function putSalesCusStatus (id,parameter) {
  return axios({
    url: api.basePart+'/cus-status/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询客户状态（状态列表--不传id）
export function getSalesCusStatus (id) {
  id= id? '/'+id : ''
  return axios({
    url: api.basePart+'/cus-status'+id,
    method: 'get',
  })
}

/********************签单级别管理 ********************/
// 编辑查询签单级别信息
export function getSalesRankEdit (id) {
  return axios({
    url: api.basePart+'/rank/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}
// 添加签单级别信息
export function postSalesRank (parameter) {
  return axios({
    url: api.basePart+'/rank',
    method: 'post',
    data: parameter
  })
}
// 删除签单级别信息
export function delSalesRank (id) {
  return axios({
    url: api.basePart+'/rank/'+id,
    method: 'delete'
  })
}
// 更新签单级别信息
export function putSalesRank (id,parameter) {
  return axios({
    url: api.basePart+'/rank/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询签单级别信息（级别列表）
export function getSalesRank (id) {
  id= id? '/'+id : ''
  return axios({
    url: api.basePart+'/rank'+id,
    method: 'get',
  })
}

/********************推广费规则管理 ********************/
// 编辑查询推广费规则
export function getSalesPromotionEdit (id) {
  return axios({
    url: api.basePart+'/promotion/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}
// 添加推广费规则
export function postSalesPromotion (parameter) {
  return axios({
    url: api.basePart+'/promotion',
    method: 'post',
    data: parameter
  })
}
// 删除推广费规则
export function delSalesPromotion (id) {
  return axios({
    url: api.basePart+'/promotion/'+id,
    method: 'delete'
  })
}
// 更新推广费规则
export function putSalesPromotion (id,parameter) {
  return axios({
    url: api.basePart+'/promotion/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询推广费规则（无id推广费列表）
export function getSalesPromotion (id) {
  id= id? '/'+id : ''
  return axios({
    url: api.basePart+'/promotion'+id,
    method: 'get',
  })
}
/********************合同编号 ********************/
// 获取合同编号
export function getSaleSn () {
  return axios({
    url: api.basePart+'/sale/sn',
    method: 'get',
  })
}
/********************业绩管理 ********************/
// 计算推广费
export function getSaleAchiCost (parameter) {
  return axios({
    url: api.basePart+'/achievement/cost',
    method: 'get',
    params: parameter
  })
}
// 计算合同推广费
export function getSaleAchiRankCost (parameter) {
  return axios({
    url: api.basePart+'/achievement/rank-cost',
    method: 'get',
    params: parameter
  })
}
// 编辑业绩
export function getSaleAchiEdit (id,parameter) {
  return axios({
    url: api.basePart+'/achievement/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}
// 添加业绩
export function postSaleAchi (parameter) {
  return axios({
    url: api.basePart+'/achievement',
    method: 'post',
    data: parameter
  })
}
// 删除业绩
export function delSaleAchi (id) {
  return axios({
    url: api.basePart+'/achievement/'+id,
    method: 'delete'
  })
}
// 更新业绩
export function putSaleAchi (id,parameter) {
  return axios({
    url: api.basePart+'/achievement/'+id,
    method: 'put',
    data: parameter
  })
}
// 业绩审核列表
export function getSaleAchiVerify (parameter) {
  return axios({
    url: api.basePart+'/achievement/verify',
    method: 'get',
    params: parameter
  })
}
// 销售审核业绩
export function putSaleAchiSale (id,parameter) {
  return axios({
    url: api.basePart+'/achievement/sale/'+id,
    method: 'put',
    data: parameter
  })
}
// 财务审核业绩
export function putSaleAchiFinance (id,parameter) {
  return axios({
    url: api.basePart+'/achievement/finance/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询业绩(id)
export function getSaleAchi (id) {
  id= id? '/'+id : ''
  return axios({
    url: api.basePart+'/achievement'+id,
    method: 'get',
  })
}
// 业绩列表(业绩列表)
export function getSaleAchiData (parameter) {
  return axios({
    url: api.basePart+'/achievement',
    method: 'get',
    params: parameter
  })
}
// 查询业绩by合同
export function getSaleAchiBycon (id) {
  return axios({
    url: api.basePart+'/achievement/contract/'+id,
    method: 'get',
  })
}
// 搜索业绩
export function getSaleAchiSearch (parameter) {
  return axios({
    url: api.basePart+'/achievement/search',
    method: 'get',
    params: parameter
  })
}

/********************客户转移 ********************/
// 搜索待转移客户
export function getSaleSearchCustomer (parameter) {
  return axios({
    url: api.basePart+'/move/cus-search',
    method: 'get',
    params: parameter
  })
}
// 待转移客户列表
export function getSaleMoveCustomer (parameter) {
  return axios({
    url: api.basePart+'/move/customer',
    method: 'get',
    params: parameter
  })
}
// 我的下属部门
export function getSaleMyDepartments (parameter) {
  return axios({
    url: api.basePart+'/service/my-departments',
    method: 'get',
    params: parameter
  })
}
// 部门人员
export function getSaleMyDepartmentUsers (id,parameter) {
  return axios({
    url: api.basePart+'/service/my-subordinate/'+id,
    method: 'get',
    params: parameter
  })
}
// 客户转移提交
export function putSaleGoMove (parameter) {
  return axios({
    url: api.basePart+'/move/customer',
    method: 'put',
    data: parameter
  })
}
// 搜索待转移业绩
export function getSaleSearchAchievement (parameter) {
  return axios({
    url: api.basePart+'/move/ach-search',
    method: 'get',
    params: parameter
  })
}
// 待转移业绩列表
export function getSaleMoveAchievement (parameter) {
  return axios({
    url: api.basePart+'/move/achievement',
    method: 'get',
    params: parameter
  })
}
// 业绩转移提交
export function putSaleGoMoveAchievement (parameter) {
  return axios({
    url: api.basePart+'/move/achievement',
    method: 'put',
    data: parameter
  })
}
/********************客户量设置 ********************/
// 查看客户量设置
export function getSaleCusNum () {
  return axios({
    url: api.basePart+'/sale/cus-num',
    method: 'get',
  })
}
// 客户量设置
export function postSaleCusNum (parameter) {
  return axios({
    url: api.basePart+'/sale/cus-num',
    method: 'put',
    data: parameter
  })
}
/********************数据分析 ********************/
// 个人--基础数据
export function getAnalysisSalePersonBasic (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-person-basic',
    method: 'get',
    params: parameter
  })
}
// 个人--业绩
export function getAnalysisSalePersonAchi (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-person-achi',
    method: 'get',
    params: parameter
  })
}

// 小组--基础数据
export function getAnalysisSaleGroupBasic (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-group-basic',
    method: 'get',
    params: parameter
  })
}
// 小组--业绩
export function getAnalysisSaleGroupAchi (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-group-achi',
    method: 'get',
    params: parameter
  })
}
// 小组--合作级别
export function getAnalysisSaleGroupRank (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-group-rank',
    method: 'get',
    params: parameter
  })
}
// 小组--转化率
export function getAnalysisSaleGroupTurnoverRate (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-group-turnover-rate',
    method: 'get',
    params: parameter
  })
}
// 小组--业绩排行
export function getAnalysisSaleGroupAchiTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-group-achi-top',
    method: 'get',
    params: parameter
  })
}
// 小组--任务进度
export function getAnalysisSaleGroupContractTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-group-contract-top',
    method: 'get',
    params: parameter
  })
}

// 部门--基础数据
export function getAnalysisSaleDepBasic (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-basic',
    method: 'get',
    params: parameter
  })
}
// 部门--业绩
export function getAnalysisSaleDepAchi (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-achi',
    method: 'get',
    params: parameter
  })
}
// 部门--合作级别
export function getAnalysisSaleDepRank (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-rank',
    method: 'get',
    params: parameter
  })
}
// 部门--业绩排行
export function getAnalysisSaleDepAchiTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-achi-top',
    method: 'get',
    params: parameter
  })
}
// 部门--小组业绩排行
export function getAnalysisSaleDepGroupTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-group-top',
    method: 'get',
    params: parameter
  })
}
// 部门--转化率排行
export function getAnalysisSaleDepTurnoverRateTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-turnover-rate-top',
    method: 'get',
    params: parameter
  })
}
// 部门--转化率
export function getAnalysisSaleDepTurnoverRate (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-turnover-rate',
    method: 'get',
    params: parameter
  })
}
// 部门--任务进度
export function getAnalysisSaleDepContractTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-dep-contract-top',
    method: 'get',
    params: parameter
  })
}

// 所有--基础数据
export function getAnalysisSaleAllBasic (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-basic',
    method: 'get',
    params: parameter
  })
}
// 所有--业绩
export function getAnalysisSaleAllAchi (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-achi',
    method: 'get',
    params: parameter
  })
}
// 所有--合作级别
export function getAnalysisSaleAllRank (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-rank',
    method: 'get',
    params: parameter
  })
}
// 所有--业绩排行
export function getAnalysisSaleAllAchiTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-achi-top',
    method: 'get',
    params: parameter
  })
}
// 所有--小组业绩排行
export function getAnalysisSaleAllGroupTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-group-top',
    method: 'get',
    params: parameter
  })
}
// 所有--添加率&转化率
export function getAnalysisSaleAllAddTurnoverRate (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-add-turnover-rate',
    method: 'get',
    params: parameter
  })
}
// 所有--转化排行
export function getAnalysisSaleAllTurnoverRate (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-turnover-rate-top',
    method: 'get',
    params: parameter
  })
}
// 所有--销售部门
export function getAnalysisSaleSaleDep (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-sale-dep',
    method: 'get',
    params: parameter
  })
}
// 所有--任务进度
export function getAnalysisSaleAllContractTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-contract-top',
    method: 'get',
    params: parameter
  })
}


/********************支付方式管理 ********************/
// 编辑支付方式
export function getPayMethodEdit (id) {
  return axios({
    url: api.basePart+'/pay-method/'+id+'/edit',
    method: 'get',
  })
}
// 添加支付方式
export function postPayMethod (parameter) {
  return axios({
    url: api.basePart+'/pay-method',
    method: 'post',
    data: parameter
  })
}
// 删除支付方式
export function delPayMethod (id) {
  return axios({
    url: api.basePart+'/pay-method/'+id,
    method: 'delete'
  })
}
// 更新支付方式
export function putPayMethod (id,parameter) {
  return axios({
    url: api.basePart+'/pay-method/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询支付方式（支付列表--不传id）
export function getPayMethod (id) {
  id= id? '/'+id : ''
  return axios({
    url: api.basePart+'/pay-method'+id,
    method: 'get',
  })
}

/********************产品服务管理 ********************/
// 编辑产品服务
export function getServiceEdit (id) {
  return axios({
    url: api.basePart+'/service/'+id+'/edit',
    method: 'get',
  })
}
// 添加产品服务
export function postService (parameter) {
  return axios({
    url: api.basePart+'/service',
    method: 'post',
    data: parameter
  })
}
// 删除产品服务
export function delService (id) {
  return axios({
    url: api.basePart+'/service/'+id,
    method: 'delete'
  })
}
// 更新产品服务
export function putService (id,parameter) {
  return axios({
    url: api.basePart+'/service/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询产品服务（产品服务列表--不传id）
export function getService (id) {
  id= id? '/'+id : ''
  return axios({
    url: api.basePart+'/service'+id,
    method: 'get',
  })
}
/********************业绩排名 ---(个人、小组、部门) ********************/
// 业绩排名 ---(个人、小组、部门)
export function getAnalysisSaleAllTop (parameter) {
  return axios({
    url: api.basePart+'/analysis-sale/get-all-top',
    method: 'get',
    params: parameter
  })
}

/********************销售部--管理备注********************/
// 管理备注 
export function putSaleNote (parameter) {
  return axios({
    url: api.basePart+'/sale/note',
    method: 'put',
    data: parameter
  })
}
