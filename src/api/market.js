// 市场部
import {
  axios
} from '@/utils/request'

import api from './index'

/********************来源 ********************/
// 来源列表
export function getSource(parameter) {
  return axios({
    url: api.basePart + '/source',
    method: 'get',
    params: parameter
  })
}
// 获取所有来源
export function getAllSource(parameter) {
  return axios({
    url: api.basePart + '/source/list_all',
    method: 'get',
    params: parameter
  })
}
// 来源搜索
export function getSourceSearch(parameter) {
  return axios({
    url: api.basePart + '/source/search',
    method: 'get',
    params: parameter
  })
}
// 来源下拉列表
export function getSourceList(parameter) {
  return axios({
    url: api.basePart + '/source/list',
    method: 'get',
    params: parameter
  })
}

// 创建来源
export function getSourceCreate(parameter) {
  return axios({
    url: api.basePart + '/source/save',
    method: 'post',
    data: parameter
  })
}
// 编辑来源
export function getSourceEdit(parameter) {
  return axios({
    url: api.basePart + '/source/update',
    method: 'post',
    data: parameter
  })
}
// 来源分类下首页
export function getSourceClass(parameter) {
  return axios({
    url: api.basePart + '/source_class',
    method: 'get',
    params: parameter
  })
}
// 来源分类下拉列表
export function getSourceClassList(parameter) {
  return axios({
    url: api.basePart + '/source_class/list',
    method: 'get',
    params: parameter
  })
}
// 创建来源分类
export function getSourceClassCreate(parameter) {
  return axios({
    url: api.basePart + '/source_class/save',
    method: 'post',
    data: parameter
  })
}
// 编辑来源分类
export function getSourceClassEdit(id, parameter) {
  return axios({
    url: api.basePart + '/source_class/update?id=' + id,
    method: 'post',
    data: parameter
  })
}
// RIO首页
export function getMarketRioIndex() {
  return axios({
    url: api.basePart + 'roi/index',
    method: 'get',
  })
}
// RIO更新
export function getMarketRioSave(parameter, datas) {
  return axios({
    url: api.basePart + '/roi/save',
    method: 'post',
    params: parameter,
    data: datas
  })
}
/******************** 客服部 ********************/
// 客服部--市场-客户列表
export function getMarketList(parameter) {
  return axios({
    url: api.basePart + '/csd/market-list',
    method: 'get',
    params: parameter
  })
}
// 客服部--首页(搜索)
export function getMarketIndex(parameter,systemInfo) {
  return axios({
    url: api.basePart + '/market/index',
    method: 'get',
    params: parameter,
    systemInfo: systemInfo
  })
}

// 客服部--重新分配--查询
export function getMarketCsdAgainAllowEdit(parameter) {
  return axios({
    url: api.basePart + '/csd/again_allow_edit',
    method: 'get',
    params: parameter
  })
}

// 客服部--重新分配--提交
export function postMarketCsdAgainAllowEdit(parameter) {
  return axios({
    url: api.basePart + '/csd/again_allow_edit',
    method: 'post',
    data: parameter
  })
}
// 客服部--创建客户
export function getCsdCreate(parameter) {
  return axios({
    url: api.basePart + '/csd/create',
    method: 'post',
    data: parameter
  })
}
// 客服部--获取销售部门
export function getCsdSaleDep(parameter) {
  return axios({
    url: api.basePart + '/csd/get_sale_dep',
    method: 'get',
    params: parameter
  })
}
// 客服部--获取销售人员
export function getCsdSaleDpMember(id, parameter) {
  return axios({
    url: api.basePart + '/csd/get_sale?department_id=' + id,
    method: 'get',
    params: parameter
  })
}
// 客服部--查询QQ，phone，微信是否存在
export function getContactExist(parameter) {
  return axios({
    url: api.basePart + '/customer/contact_exist',
    method: 'get',
    params: parameter
  })
}
// 客服部--省市匹配
export function getMachCity(parameter) {
  return axios({
    url: api.basePart + '/csd/match-city',
    method: 'get',
    params: parameter,
  })
}
// 客服部--未分配
export function getCsdUnassigned(parameter) {
  return axios({
    url: api.basePart + '/csd/unassigned',
    method: 'get',
    params: parameter
  })
}
// 客服部--新建并分配
export function getCsdBatchAllow(parameter) {
  return axios({
    url: api.basePart + '/csd/batch_allow',
    method: 'post',
    data: parameter
  })
}
// 客服部--一键分配
export function getCsdCreateAllow(parameter) {
  return axios({
    url: api.basePart + '/csd/create_allot',
    method: 'post',
    data: parameter
  })
}
// 客服部--未分配数量
export function getCsdUnassignedNum(parameter) {
  return axios({
    url: api.basePart + '/csd/unassigned_num',
    method: 'get',
    params: parameter
  })
}
// 客服部--设置客户量(展示)
export function getCsdSetnum(parameter) {
  return axios({
    url: api.basePart + '/csd/setnum',
    method: 'get',
    params: parameter
  })
}
// 客服部--设置客户量(编辑)
export function getCsdAgainAllowUpdata(parameter) {
  return axios({
    url: api.basePart + '/csd/again_allow_update',
    method: 'post',
    data: parameter,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}
// 客服部--客户查询(编辑)
export function getCsdSetnumEdit(parameter) {
  return axios({
    url: api.basePart + '/csd/setnum_update',
    method: 'post',
    data: parameter
  })
}
// 客服部--客户查询--选择分配
export function putCsdSelectAllow(parameter) {
  return axios({
    url: api.basePart + '/csd/select_allow',
    method: 'put',
    data: parameter
  })
}

// 客服部--导出页面
export function getCsdImportPage(parameter) {
  return axios({
    url: api.basePart + '/csd/import2',
    method: 'get',
    params: parameter
  })
}

// 客服部--模版导出
export function getCsdimportExample() {
  return axios({
    url: api.basePart + '/csd/import_example',
    method: 'get',
  })
}

// 客服部--数据导入
export function getCsdImport(parameter) {
  return axios({
    url: api.basePart + '/csd/import',
    method: 'post',
    data: parameter,
  })
}
// 客服部--数据导入保存
export function getCsdImportSave(parameter) {
  return axios({
    url: api.basePart + '/csd/import_save',
    method: 'post',
    data: parameter,
  })
} 
/******************** 留言板 ********************/
// 客服部--留言板初始化数据 
export function getmessageBoard(parameter) {
  return axios({
    url: api.basePart + '/liuyan/index',
    method: 'get',
    params: parameter
  })
}

// 客服部--留言板详情  
export function getMessageXdetails(id) {
  return axios({
    url: api.basePart + '/liuyan/read/'+id,
    method: 'get',
  })
}

// 客服部--留言板详情修改  
export function getUpdateMessage(id,parameter) {
  return axios({
    url: api.basePart + '/liuyan/update/'+id,
    method: 'put',
    data: parameter,
  })
}    

// 客服部--留言板选择导入  
export function getLeaveAmessageToImport(parameter) {
  return axios({
    url: api.basePart + '/liuyan/select-import',
    method: 'put',
    data: parameter,
  })
}    
// 客服部--留言板删除  
export function getDeleteTheMessaget(id) {
  return axios({
    url: api.basePart + '/liuyan/delete/'+id,
    method: 'delete',
  })
}   
// 客服部--拼多多留言板初始化数据 
export function getPddmessageBoard(parameter) {
  return axios({
    url: api.basePart + '/liuyan-pdd/index',
    method: 'get',
    params: parameter
  })
} 
// 客服部--拼多多留言板详情  
export function getPddMessageXdetails(id) {
  return axios({
    url: api.basePart + '/liuyan-pdd/read/'+id,
    method: 'get',
  })
} 
// 客服部--拼多多留言板详情修改  
export function getPddUpdateMessage(id,parameter) {
  return axios({
    url: api.basePart + '/liuyan-pdd/update/'+id,
    method: 'put',
    data: parameter,
  })
}     
// 客服部--拼多多留言板选择导入 
export function getPddLeaveAmessageToImport(parameter) {
  return axios({
    url: api.basePart + '/liuyan-pdd/select-import',
    method: 'put',
    data: parameter,
  })
}   
// 客服部--拼多多留言板删除  
export function getPddDeleteTheMessaget(id) {
  return axios({
    url: api.basePart + '/liuyan-pdd/delete/'+id,
    method: 'delete',
  })
}   
/******************** SEO ********************/
// SEO--首页
export function getSeoIndex(parameter) {
  return axios({
    url: api.basePart + '/seo',
    method: 'get',
    params: parameter
  })
}

// SEO--数据导出
export function getSeoExport(parameter) {
  return axios({
    url: api.basePart + '/seo/export',
    method: 'post',
    data: parameter
  })
}

// SEO--一键分配
export function getSeoAkeyallow(parameter) {
  return axios({
    url: api.basePart + '/seo/akeyallow',
    method: 'post',
    data: parameter
  })
}

// SEO--详情修改
export function getSeoDetailedit(parameter) {
  return axios({
    url: api.basePart + '/seo/detailedit',
    method: 'post',
    data: parameter
  })
}


/******************** 数据分析 ********************/

// 概览--基础数据
export function getMarketGetBasicDataView(parameter) {
  return axios({
    url: api.basePart + '/market/get_basic_data_view',
    method: 'get',
    params: parameter
  })
}


// 概览--来源分析
export function getMarketGetSource(parameter) {
  return axios({
    url: api.basePart + '/market/get-source',
    method: 'get',
    params: parameter
  })
}
// 概览--来源分析排序
export function postSourceUpdataSort(parameter) {
  return axios({
    url: api.basePart + '/source/update_sort',
    method: 'post',
    data: parameter
  })
}
// 概览--关键词
export function getMarketGetKeyword(parameter) {
  return axios({
    url: api.basePart + '/market/get-keyword',
    method: 'get',
    params: parameter
  })
}

// 概览--合作类别
export function getMarketGetPlatform(parameter) {
  return axios({
    url: api.basePart + '/market/get_platform',
    method: 'get',
    params: parameter
  })
}
// 概览--客户类别
export function getMarketGetHasProduct(parameter) {
  return axios({
    url: api.basePart + '/market/get-has-product',
    method: 'get',
    params: parameter
  })
}

// 数据分析--区域分析(省)
export function getMarketGetArea(parameter) {
  return axios({
    url: api.basePart + '/market/get-area',
    method: 'get',
    params: parameter
  })
}
// 数据分析--区域分析(市)
export function getMarketGetAreaCity(parameter) {
  return axios({
    url: api.basePart + '/market/get_area_city',
    method: 'get',
    params: parameter
  })
}
// 客户量--基础数据
export function getMarketGetBasicCustomerNum(parameter) {
  return axios({
    url: api.basePart + '/market/get_basic_customer_num',
    method: 'get',
    params: parameter
  })
}
// 客户量--客户量
export function getMarketCustomerNumber(parameter) {
  return axios({
    url: api.basePart + '/market/get_customer_number',
    method: 'get',
    params: parameter
  })
}
// 客户量--早晚班客户量
export function getMarketEarlieLateNumber(parameter) {
  return axios({
    url: api.basePart + '/market/get_earlie_late_number',
    method: 'get',
    params: parameter
  })
}
// 客户量--小组
export function getMarketGroupNumber(parameter) {
  return axios({
    url: api.basePart + '/market/get_group_number',
    method: 'get',
    params: parameter
  })
}
// 客户量--来源(来源分布，来源添加，来源转化)
export function getMarketSourceAll(parameter) {
  return axios({
    url: api.basePart + '/market/get_source_all',
    method: 'get',
    params: parameter
  })
}
//  业绩--基础数据
export function getMarketBasicAchiDataView(parameter) {
  return axios({
    url: api.basePart + '/market/get_basic_achi_data_view',
    method: 'get',
    params: parameter
  })
}
// 业绩--业绩
export function getMarketAchiData(parameter) {
  return axios({
    url: api.basePart + '/market/get_achi_data',
    method: 'get',
    params: parameter
  })
}
// 业绩--RIO
export function getMarketGetRoi(parameter) {
  return axios({
    url: api.basePart + '/market/get_roi',
    method: 'get',
    params: parameter
  })
}
// 业绩--RIO计算
export function getMarketManualRoi(parameter) {
  return axios({
    url: api.basePart + '/market/get-manual-roi',
    method: 'get',
    params: parameter,
  })
}



/******************** 新零售 ********************/

// 任务详情
export function getRetailDetails(parameter) {
  return axios({
    url: api.basePart + '/retail/details',
    method: 'get',
    params: parameter
  })
}
// 删除任务
export function getRetailDelete(parameter) {
  return axios({
    url: api.basePart + '/retail/delete',
    method: 'delete',
    params: parameter,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 新零售--我的客户搜索 
export function getTheCustomerSearch(parameter) {
  return axios({
    url: api.basePart + '/retail/index-search',
    method: 'get',
    params: parameter
  })
}


// 新零售--我的客户 
export function getRetailGetList(parameter) {
  return axios({
    url: api.basePart + '/retail',
    method: 'get',
    params: parameter
  })
}
//新零售--客户详情  
export function getRetailGetDetails(id) {
  return axios({
    url: api.basePart + '/retail/' + id,
    method: 'get',
    // params: paramete
  })
}

//新零售--修改提交
export function getModifyTheSubmitted(parameter, id) {
  return axios({
    url: api.basePart + '/retail/' + id,
    method: 'put',
    data: parameter
  })
}

//新零售-- 未分配  
export function getUndistributed(parameter) {
  return axios({
    url: api.basePart + '/retail/allot',
    method: 'get',
    params: parameter
  })
}
// 新零售--执行分配
export function getPerformAssigned(parameter) {
  return axios({
    url: api.basePart + '/retail/allot',
    method: 'put',
    data: parameter
  })
}
// 新零售--审核数据列表   
export function getAuditList(parameter) {
  return axios({
    url: api.basePart + '/retail/check',
    method: 'get',
    params: parameter
  })
}

//快速审核
export function getDirectlyToTheAudit(parameter, id) {
  return axios({
    url: api.basePart + '/retail/check/' + id,
    method: 'put',
    data: parameter
  })
}

// 新零售--团队任务
export function getRetailGetAll(parameter) {
  return axios({
    url: api.basePart + '/retail/getAll',
    method: 'get',
    params: parameter
  })
}

// 新零售--未分配客户搜索
export function getDistributionSearch(parameter) {
  return axios({
    url: api.basePart + '/retail/allot-search',
    method: 'get',
    params: parameter
  })
}



// 新零售--分配任务
export function getRetailSetWork(rid, uid) {
  return axios({
    url: api.basePart + '/retail/Work?' + 'rid=' + rid + '&uid=' + uid,
    method: 'put',

  })
}

// 新零售--更新状态
export function getRetailSetStatus(parameter) {
  return axios({
    url: api.basePart + '/retail/setStatus',
    method: 'put',
    data: parameter
  })
}

//查询
export function getInquire(parameter) {
  return axios({
    url: api.basePart + '/retail/allot',
    method: 'get',
    params: parameter
  })
}

//新零售--基础数据 
export function getEssentialData(parameter) {
  return axios({
    url: api.basePart + '/retail/analyze',
    method: 'get',
    params: parameter
  })
}


//新零售--客户转移
export function getCustomerTransfer(parameter) {
  return axios({
    url: api.basePart + '/retail/move',
    method: 'get',
    params: parameter
  })
}

//新零售--个人排行
export function getIndividualRanking(parameter) {
  return axios({
    url: api.basePart + '/retail/p-rank',
    method: 'get',
    params: parameter
  })
}


//新零售--客户转移搜索
export function getTransferSearch(parameter) {
  return axios({
    url: api.basePart + '/retail/move-search',
    method: 'get',
    params: parameter
  })
}

//新零售--执行转移
export function getPerformTransfer(parameter) {
  return axios({
    url: api.basePart + '/retail/move',
    method: 'put',
    data: parameter
  })
}

//新零售--小组排行  
export function getTeamRanking(parameter) {
  return axios({
    url: api.basePart + '/retail/t-rank',
    method: 'get',
    params: parameter
  })
}

//新零售--数据分析客户量
export function getTheDataAnalysis(parameter) {
  return axios({
    url: api.basePart + '/retail/group',
    method: 'get',
    params: parameter
  })
}
//审核查询
export function getInSearch(parameter) {
  return axios({
    url: api.basePart + '/retail/check-search',
    method: 'get',
    params: parameter
  })
}


/******************** 新零售 ********************/

/******************** 电商拍摄 ********************/
// 电商拍摄--我的客户初始化
export function getInitializationOfShooting(parameter) {
  return axios({
    url: api.basePart + '/camera',
    method: 'get',
    params: parameter
  })
}
// 电商拍摄--我的客户搜索 
export function getTakenTheSearch(parameter) {
  return axios({
    url: api.basePart + '/camera/index-search',
    method: 'get',
    params: parameter
  })
}
//电商拍摄--审核初始化
export function getAuditInitialization(parameter) {
  return axios({
    url: api.basePart + '/camera/check',
    method: 'get',
    params: parameter
  })
}

// 电商拍摄--审核查询
export function getPhotoAuditQuery(parameter) {
  return axios({
    url: api.basePart + '/camera/check-search',
    method: 'get',
    params: parameter
  })
}

// 电商拍摄--执行审核
export function getPhotographyExecutiveReview(parameter, id) {
  return axios({
    url: api.basePart + '/camera/check/' + id,
    method: 'put',
    data: parameter
  })
}

// 转移客户--初始化
export function getTransferInitialization(parameter) {
  return axios({
    url: api.basePart + '/camera/move',
    method: 'get',
    params: parameter
  })
}

// 转移客户--搜索
export function getPhotographicTransferSearch(parameter) {
  return axios({
    url: api.basePart + '/camera/move-search',
    method: 'get',
    params: parameter
  })
}

//转移--执行转移
export function getPhotographicTransfer(parameter) {
  return axios({
    url: api.basePart + '/camera/move',
    method: 'put',
    data: parameter
  })
}

// 电商拍摄--详情 
export function getPhotographicDetails(id) {
  return axios({
    url: api.basePart + '/camera/' + id,
    method: 'get',
  })
}

//电商拍摄--修改提交
export function getTakenToModify(parameter,id) {
  return axios({
    url: api.basePart + '/camera/'+id,
    method: 'put',
    data: parameter
  })
}

/******************** 电商拍摄 ********************/

/******************** 店铺装修 ********************/
// 店铺装修--我的客户初始化
export function getShopDecorationInitialization(parameter) {
  return axios({
    url: api.basePart + '/decoration',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--我的客户查找 
export function getShopDecorationSearch(parameter) {
  return axios({
    url: api.basePart + '/decoration/search',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--分配列表
export function getStoreDecorationAllocationList(parameter) {
  return axios({
    url: api.basePart + '/decoration/allot',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--分配查询  
export function getStoreDecorationAllocationQuery(parameter) {
  return axios({
    url: api.basePart + '/decoration/allot-search',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--执行分配
export function getDecorationExecutionAllocation(parameter) {
  return axios({
    url: api.basePart + '/decoration/allot',
    method: 'put',
    data: parameter
  })
}

// 店铺装修--转移客户  
export function getDecorationTransferData(parameter) {
  return axios({
    url: api.basePart + '/decoration/move',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--转移客户搜索 
export function getDecorationTransferSearch(parameter) {
  return axios({
    url: api.basePart + '/decoration/move-search',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--执行转移
export function getDecorationExecutionTransfer(parameter) {
  return axios({
    url: api.basePart + '/decoration/move',
    method: 'put',
    data: parameter
  })
}

// 店铺装修--详情  
export function geStoreDecorationDetails(id) {
  return axios({
    url: api.basePart + '/decoration/' + id,
    method: 'get',

  })
}

// 店铺装修--修改
export function getShopToModify(parameter, id) {
  return axios({
    url: api.basePart + '/decoration/' + id,
    method: 'put',
    data: parameter
  })
}


/******************** 店铺装修 ********************/

/******************** 淘宝运营 ********************/
// 淘宝运营--我的客户初始化
export function getTaobaoInitializationList(parameter) {
  return axios({
    url: api.basePart + '/tb-operation',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--我的客户查找 
export function getTaobaoOperationQuery(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/search',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--分配列表
export function getTaobaoOperationAllocationList(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/allot',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--分配查询  
export function getTaobaoAllocationQuery(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/allot-search',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--执行分配
export function getTaobaoImplementationAllocation(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/allot',
    method: 'put',
    data: parameter
  })
}

// 淘宝运营--转移客户  
export function getTaobaoTransfer(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/move',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--转移客户搜索 
export function getTaobaoTransferSearch(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/move-search',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--执行转移
export function getTaobaoExecutionTransfer(parameter) {
  return axios({
    url: api.basePart + '/tb-operation/move',
    method: 'put',
    data: parameter
  })
}

// 淘宝运营--详情  
export function getDetailsOnTaobao(id) {
  return axios({
    url: api.basePart + '/tb-operation/' + id,
    method: 'get',

  })
}

// 淘宝运营--修改
export function getTaobaoToModify(parameter, id) {
  return axios({
    url: api.basePart + '/tb-operation/' + id,
    method: 'put',
    data: parameter
  })
}

// 淘宝运营--新增
export function getTaobaoAdd(parameter) {
  return axios({
    url: api.basePart + '/tb-operation',
    method: 'post',
    data: parameter
  })
}
// 淘宝运营--删除
export function getTaobaoDelete(id) {
  return axios({
    url: api.basePart + '/tb-operation/' + id,
    method: 'DELETE',

  })
}

/******************** 淘宝运营 ********************/

/******************** 拼多多运营 ********************/

// 拼多多运营--我的客户初始化
export function getPinduoduoInitialization(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation',
    method: 'get',
    params: parameter
  })
}

// 拼多多运营--我的客户查找 
export function getPinduoduoOperationQuery(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/search',
    method: 'get',
    params: parameter
  })
}

// 拼多多运营--分配列表
export function getPinduoduoOperationAllocationList(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/allot',
    method: 'get',
    params: parameter
  })
}

// 拼多多运营--分配查询  
export function getPinduoduoAllocationQuery(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/allot-search',
    method: 'get',
    params: parameter
  })
}

// 拼多多运营--执行分配
export function getPinduoduoImplementationAllocation(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/allot',
    method: 'put',
    data: parameter
  })
}

// 拼多多运营--转移客户  
export function getPinduoduoTransfer(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/move',
    method: 'get',
    params: parameter
  })
}

// 拼多多运营--转移客户搜索 
export function getPinduoduoTransferSearch(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/move-search',
    method: 'get',
    params: parameter
  })
}

// 拼多多运营--执行转移
export function getPinduoduoExecutionTransfer(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation/move',
    method: 'put',
    data: parameter
  })
}

// 拼多多运营--详情  
export function getDetailsOnPinduoduo(id) {
  return axios({
    url: api.basePart + '/pdd-operation/' + id,
    method: 'get',

  })
}

// 拼多多运营--修改
export function getPinduoduoToModify(parameter, id) {
  return axios({
    url: api.basePart + '/pdd-operation/' + id,
    method: 'put',
    data: parameter
  })
}

// 淘宝运营--新增
export function getPinduoduoAdd(parameter) {
  return axios({
    url: api.basePart + '/pdd-operation',
    method: 'post',
    data: parameter
  })
}
// 淘宝运营--删除
export function getPinduoduoDelete(id) {
  return axios({
    url: api.basePart + '/pdd-operation/' + id,
    method: 'DELETE',

  })
}
/******************** 拼多多运营 ********************/

/******************** 微商运营 ********************/
// 微商运营--我的客户初始化
export function getWeChatInitialization(parameter) {
  return axios({
    url: api.basePart + '/ws-operation',
    method: 'get',
    params: parameter
  })
}

// 微商运营--我的客户查找 
export function getWeChatOperationQuery(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/search',
    method: 'get',
    params: parameter
  })
}

// 微商运营--分配列表
export function getWeChatOperationAllocationList(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/allot',
    method: 'get',
    params: parameter
  })
}

// 微商运营--分配查询  
export function getWeChatAllocationQuery(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/allot-search',
    method: 'get',
    params: parameter
  })
}

// 微商运营--执行分配
export function getWeChatImplementationAllocation(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/allot',
    method: 'put',
    data: parameter
  })
}

// 微商运营--转移客户  
export function getWeChatTransfer(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/move',
    method: 'get',
    params: parameter
  })
}

// 微商运营--转移客户搜索 
export function getWeChatTransferSearch(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/move-search',
    method: 'get',
    params: parameter
  })
}

// 微商运营--执行转移
export function getWeChatExecutionTransfer(parameter) {
  return axios({
    url: api.basePart + '/ws-operation/move',
    method: 'put',
    data: parameter
  })
}

// 微商运营--详情  
export function getDetailsOnWeChat(id) {
  return axios({
    url: api.basePart + '/ws-operation/' + id,
    method: 'get',

  })
}

// 微商运营--修改
export function getWeChatToModify(parameter, id) {
  return axios({
    url: api.basePart + '/ws-operation/' + id,
    method: 'put',
    data: parameter
  })
}    
// 微商运营--转化代理 
export function getConversionAgent (id) {
  return axios({
    url: api.basePart+'/ws-operation/agency/'+id,
    method: 'put',
    // data: parameter
  })
} 
/******************** 微商运营 ********************/

/******************** 全网推广 ********************/
// 全网推广--我的客户 
export function getToPromoteTheCustomer(parameter) {
  return axios({
    url: api.basePart + '/seo/me',
    method: 'get',
    params: parameter
  })
}

// 全网推广--详情展示 
export function getPromoteTheDetails(id) {
  return axios({
    url: api.basePart + '/seo/detail-show?' + 'seo_id=' + id,
    method: 'get',
  })
}


// 全网推广--分配客户 
export function getPromotionOfDistribution(parameter) {
  return axios({
    url: api.basePart + '/seo/not-allow',
    method: 'get',
    params: parameter
  })
}
// 全网推广--执行分配 
export function getPromoteImplementation(parameter) {
  return axios({
    url: api.basePart + '/seo/akeyallow',
    method: 'put',
    data: parameter
  })
}

// 全网推广--审核列表 
export function getPromotionAuditList(parameter) {
  return axios({
    url: api.basePart + '/seo/audit',
    method: 'get',
    params: parameter
  })
}

// 全网推广--执行审核 驳回
export function getApprovalOfPromotion(parameter) {
  return axios({
    url: api.basePart + '/seo/examine-verify',
    method: 'put',
    data: parameter
  })
}

// 全网推广--客户转移 
export function getPromoteCustomerTransfer(parameter) {
  return axios({
    url: api.basePart + '/seo/transfer',
    method: 'get',
    params: parameter
  })
}

// 全网推广--客户转移 
export function getPromotionOfExecutionTransfer(parameter) {
  return axios({
    url: api.basePart + '/seo/select-transfer',
    method: 'put',
    data: parameter
  })
}

// 全网推广--上传文件 
export function getPromoteUploadFiles(parameter) {
  return axios({
    url: api.basePart + '/uploadFile',
    method: 'post',
    data: parameter
  })
}

// 全网推广--上传保存
export function getUploadSaved(parameter) {
  return axios({
    url: api.basePart + '/seo/detail-update-excel',
    method: 'put',
    data: parameter
  })
}

// 全网推广--删除文件
export function getPromotionToDelete(parameter) {
  return axios({
    url: api.basePart + '/seo/delete-xls',
    method: 'put',
    data: parameter
  })
}

// 全网推广--详情修改 
export function getPromoteDetailsToModify(parameter) {
  return axios({
    url: api.basePart + '/seo/detail-update',
    method: 'put',
    data: parameter
  })
} 

// 全网推广--所在部门 
export function getPromotionDepartment(parameter) {
  return axios({
    url: api.basePart + '/seo/get-dep-list',
    method: 'put',
    data: parameter
  })
}

// 全网推广--部门人员 
export function getPromotionDepartmentStaff(parameter) {
  return axios({
    url: api.basePart + '/seo/get-user-list',
    method: 'put',
    data: parameter
  })
}

/******************** 全网推广 ********************/
/******************** 产品售后 ********************/
// 产品售后--我的客户初始化
export function getAfterSalesInitialization(parameter) {
  return axios({
    url: api.basePart + '/after',
    method: 'get',
    params: parameter
  })
}

// 产品售后--我的客户查找 
export function getAfterTheQuery(parameter) {
  return axios({
    url: api.basePart + '/after/search',
    method: 'get',
    params: parameter
  })
}

// 产品售后--分配列表
export function getAfterSaleDistributionList(parameter) {
  return axios({
    url: api.basePart + '/after/allot',
    method: 'get',
    params: parameter
  })
}

// 产品售后--分配查询  
export function getAfterSalesDistributionInquiry(parameter) {
  return axios({
    url: api.basePart + '/after/allot-search',
    method: 'get',
    params: parameter
  })
}

// 产品售后--执行分配
export function getAfterSalesDistribution(parameter) {
  return axios({
    url: api.basePart + '/after/allot',
    method: 'put',
    data: parameter
  })
}

// 产品售后--转移客户  
export function getAfterSalesTransferCustomer(parameter) {
  return axios({
    url: api.basePart + '/after/move',
    method: 'get',
    params: parameter
  })
}

// 产品售后--转移客户搜索 
export function getAfterSaleTransferEnquiry(parameter) {
  return axios({
    url: api.basePart + '/after/move-search',
    method: 'get',
    params: parameter
  })
}

// 产品售后--执行转移
export function getAfterSalesExecutionTransfer(parameter) {
  return axios({
    url: api.basePart + '/after/move',
    method: 'put',
    data: parameter
  })
}

// 产品售后--详情  
export function getAfterSalesServiceDetails(id) {
  return axios({
    url: api.basePart + '/after/' + id,
    method: 'get',

  })
}

// 产品售后--修改
export function getAfterSalesModification(parameter, id) {
  return axios({
    url: api.basePart + '/after/' + id,
    method: 'put',
    data: parameter
  })
}
/******************** 产品售后 ********************/
/******************** 产品库存 ********************/
//产品库存--初始化
export function getProductInventory(parameter) {
  return axios({
    url: api.basePart + '/inventory',
    method: 'get',
    params: parameter
  })
}
//产品库存--查询
export function getProductInventorySearch(parameter) {
  return axios({
    url: api.basePart + '/inventory/search',
    method: 'get',
    params: parameter
  })
}

//产品库存--新增库存
export function getTheNewInventory(parameter) {
  return axios({
    url: api.basePart + '/inventory',
    method: 'post',
    data: parameter
  })
}

//产品库存--详情 
export function getInventoryDetails(id) {
  return axios({
    url: api.basePart + '/inventory/' + id,
    method: 'get',
  })
}
//产品库存--修改
export function getInventoryChanges(parameter, id) {
  return axios({
    url: api.basePart + '/inventory/' + id,
    method: 'put',
    data: parameter
  })
}

//产品库存--删除
export function getInventoryToDelete(id) {
  return axios({
    url: api.basePart + '/inventory/' + id,
    method: 'delete',
  })
}
/******************** 产品库存 ********************/

/******************** 商品采购 ********************/
//商品采购--初始化
export function getMerchandise(parameter) {
  return axios({
    url: api.basePart + '/purchase/index',
    method: 'get',
    params: parameter
  })
}

//商品采购--详情
export function getCommodityDetails(id) {
  return axios({
    url: api.basePart + '/purchase/edit?' + "id=" + id,
    method: 'get',

  })
}

//商品采购--详情提交
export function getSubmissionOfCommodityDetails(parameter) {
  return axios({
    url: api.basePart + '/purchase/update',
    method: 'put',
    data: parameter
  })
}
//商品采购--审核
export function getCommodityAudit(parameter) {
  return axios({
    url: api.basePart + '/purchase/audit',
    method: 'put',
    data: parameter
  })
}

//商品采购--驳回
export function getRejectedGoods(parameter) {
  return axios({
    url: api.basePart + '/purchase/cancel-audit',
    method: 'put',
    data: parameter
  })
}
//商品采购--删除
export function getGoodsToDeletes(parameter) {
  return axios({
    url: api.basePart + '/purchase/delete',
    method: 'post',
    data: parameter
  })
}
//商品采购--新增
export function getTheNewGoods(parameter) {
  return axios({
    url: api.basePart + '/purchase/save',
    method: 'post',
    data: parameter
  })
}
/******************** 商品采购 ********************/

/******************** 仓库盘点 ********************/
//仓库盘点--初始化
export function getCheckTheStock(parameter) {
  return axios({
    url: api.basePart + '/purchase/warehouse-index',
    method: 'get',
    params: parameter
  })
}

//仓库盘点--详情
export function getWarehouseInventoryDetails(id) {
  return axios({
    url: api.basePart + '/purchase/warehouse-read?' + 'id=' + id,
    method: 'get',

  })
}

//仓库盘点--盘点
export function getStockTaking(parameter) {
  return axios({
    url: api.basePart + '/purchase/warehouse-stock-count',
    method: 'put',
    data: parameter
  })
}

//仓库盘点--取消盘点
export function getStockTakingCallOff(parameter) {
  return axios({
    url: api.basePart + '/purchase/warehouse-cancel-stock-count',
    method: 'put',
    data: parameter
  })
}
//仓库盘点--审核
export function getWarehouseInventoryAudit(parameter) {
  return axios({
    url: api.basePart + '/purchase/warehouse-audit',
    method: 'put',
    data: parameter
  })
}

//仓库盘点--驳回
export function getRejectiOnofWarehouseInventory(parameter) {
  return axios({
    url: api.basePart + '/purchase/warehouse-cancel-audit',
    method: 'put',
    data: parameter
  })
}
/******************** 仓库盘点 ********************/

/******************** 订单记录 ********************/
//订单记录--初始化
export function getorderHistory(parameter) {
  return axios({
    url: api.basePart + '/order',
    method: 'get',
    params: parameter
  })
}

//订单记录--搜索
export function getOrderRecordSearch(parameter) {
  return axios({
    url: api.basePart + '/order/search',
    method: 'get',
    params: parameter
  })
}

//订单记录--新增
export function getNewOrderRecord(parameter) {
  return axios({
    url: api.basePart + '/order',
    method: 'post',
    data: parameter
  })
}

//订单记录--详情
export function getOrderRecordDetails(id) {
  return axios({
    url: api.basePart + '/order/' + id,
    method: 'get',
  })
}

//订单记录--修改提交
export function getModifyOrderRecord(id, parameter) {
  return axios({
    url: api.basePart + '/order/' + id,
    method: 'put',
    data: parameter
  })
}

//订单记录--删除
export function getDeleteOrderRecord(id) {
  return axios({
    url: api.basePart + '/order/' + id,
    method: 'delete',
  })
}

//订单记录--审核
export function getAuditOrderRecord(id) {
  return axios({
    url: api.basePart + '/order/check/' + id,
    method: 'put',
  })
}
//订单记录--上传
export function getOrderRecordUpload(parameter) {
  return axios({
    url: api.basePart + '/order/importOrder',
    method: 'post',
    data: parameter
  })
}
//订单记录--批量删除
export function getallDeletOrderRecord(parameter) {
  return axios({
    url: api.basePart + '/order/allDelete',
    method: 'get',
    params: parameter
  })
} 
//订单记录--汇总
export function getSummarizing(parameter) {
  return axios({
    url: api.basePart + '/order/total',
    method: 'get',
    params: parameter
  })
}
//产品售后部门列表
export function getAfterSalesDepartment(parameter) {
  return axios({
    url: api.basePart + '/order/after-sale-dep-list',
    method: 'get',
    params: parameter
  })
} 
/******************** 订单记录 ********************/

/******************** 退款记录 ********************/
//退款记录--初始化
export function getArefundRecord(parameter) {
  return axios({
    url: api.basePart + '/refund',
    method: 'get',
    params: parameter
  })
}

//退款记录--搜索
export function getRefundRecordSearch(parameter) {
  return axios({
    url: api.basePart + '/refund/all-search',
    method: 'get',
    params: parameter
  })
}
 
//退款记录--一审 未审
export function getTheFirstTrialIsNotCareful(parameter) {
  return axios({
    url: api.basePart + '/refund/audit',
    method: 'get',
    params: parameter
  })
}
//退款记录--一审搜索
export function getSearchOfTrial(parameter) {
  return axios({
    url: api.basePart + '/refund/audit-search',
    method: 'get',
    params: parameter
  })
}

//退款记录--新增
export function getNewRefundRecord(parameter) {
  return axios({
    url: api.basePart + '/refund',
    method: 'post',
    data: parameter
  })
}

//退款记录--详情
export function getRefundRecordDetails(id) {
  return axios({
    url: api.basePart + '/refund/' + id,
    method: 'get',
  })
}

//退款记录--修改提交
export function getRefundRecordModification(id, parameter) {
  return axios({
    url: api.basePart + '/refund/' + id,
    method: 'put',
    data: parameter
  })
}

//退款记录--删除
export function getDeletionOfRefundRecord(id) {
  return axios({
    url: api.basePart + '/refund/' + id,
    method: 'delete',
  })
}

//退款记录--审核
export function getReviewOfRefundRecords(id, parameter) {
  return axios({
    url: api.basePart + '/refund/first/' + id,
    method: 'put',
    data: parameter
  })
}
/******************** 退款记录 ********************/

/******************** 订单类型 ********************/
//订单类型--初始化
export function getOrderType(parameter) {
  return axios({
    url: api.basePart + '/order-type',
    method: 'get',
    params: parameter
  })
}


//订单类型--新增
export function getNewOrderType(parameter) {
  return axios({
    url: api.basePart + '/order-type',
    method: 'post',
    data: parameter
  })
}

//订单类型--详情 
export function getOrderTypeDetails(id) {
  return axios({
    url: api.basePart + '/order-type/' + id,
    method: 'get',
  })
}
//订单类型--修改
export function getModifyOrderType(parameter, id) {
  return axios({
    url: api.basePart + '/order-type/' + id,
    method: 'put',
    data: parameter
  })
}

//订单类型--开启关闭
export function getOrderTypeOnAndOff(parameter, id) {
  return axios({
    url: api.basePart + '/order-type/open/' + id,
    method: 'put',
    data: parameter
  })
}
/******************** 订单类型 ********************/

/******************** 核销状态 ********************/
// 核销状态--我的客户 
export function getVerifyTnitialization(parameter) {
  return axios({
    url: api.basePart + '/reimbursement/all',
    method: 'get',
    params: parameter
  })
}

// 核销状态-一及未审核  
export function getVerifyCustomerSearch(parameter) {
  return axios({
    url: api.basePart + '/reimbursement/audit',
    method: 'get',
    params: parameter
  })
} 

// 核销状态 搜索 
export function getVerificationStatusSearch(parameter) {
  return axios({
    url: api.basePart + '/reimbursement/all-search',
    method: 'get',
    params: parameter
  })
} 

// 核销状态--已审核未审核搜索
export function getAllCancelAfterVerificationr(parameter) {
  return axios({
    url: api.basePart + '/reimbursement/audit-search',
    method: 'get',
    params: parameter
  })
}

// 核销状态--全部查询
export function getVerifyAllEnquiries(parameter) {
  return axios({
    url: api.basePart + '/reimbursement/search',
    method: 'get',
    params: parameter
  })
}

// 核销状态--详情
export function getCheckTheDetails(id) {
  return axios({
    url: api.basePart + '/reimbursement/' + id,
    method: 'get',
    // params: parameter
  })
}
// 核销状态--修改详情
export function getVerifyAmendmentDetails(parameter, id) {
  return axios({
    url: api.basePart + '/reimbursement/' + id,
    method: 'put',
    data: parameter
  })
}
// 核销状态--删除
export function getVerifyTheDelete(id) {
  return axios({
    url: api.basePart + '/reimbursement/' + id,
    method: 'delete',

  })
}

// 核销状态--审核驳回
export function getDataParameter(parameter, id) {
  return axios({
    url: api.basePart + '/reimbursement/check/' + id,
    method: 'put',
    data: parameter
  })
}
/******************** 核销状态 ********************/


/******************** 公共接口类 ********************/
// 公共--部门信息  
export function getDepartmentInformation(parameter) {
  return axios({
    url: api.basePart + '/service/my-departments',
    method: 'get',
    params: parameter
  })
}
// 公共--人员信息  
export function getDepartmentStaff(id,parameter) {
  return axios({
    url: api.basePart + '/service/my-subordinate/' + id,
    method: 'get',
    params: parameter
  })
}
// 公共--我的下属  
export function getUnderstrapper(parameter) {
  return axios({
    url: api.basePart + '/service/my-users',
    method: 'get',
    params: parameter
  })
}
// 公共--获取个人信息  
export function getPersonalDetails(id) {
  return axios({
    url: api.basePart + '/service/user/' + id,
    method: 'get',

  })
}

// 公共--获取支付方式  
export function getANewVerification() {
  return axios({
    url: api.basePart + '/pay-method',
    method: 'get',

  })
} 


// 核销--新建核销  
export function getModeOfPayment(id) {
  return axios({
    url: api.basePart + '/reimbursement/add-msg/'+id,
    method: 'get',

  })
} 

// 核销--新建核销保存  
export function getNewlyIncreased(parameter) {
  return axios({
    url: api.basePart + '/reimbursement',
    method: 'post',
    data: parameter
  })
}
/******************** 公共接口类 ********************/

/******************** 数据分析 ********************/
// 全网推广--基础数据
export function getBasicData(parameter) {
  return axios({
    url: api.basePart + '/service-data/seo-basic',
    method: 'get',
    params: parameter
  })
}
// 全网推广--客户量
export function getClientele(parameter) {
  return axios({
    url: api.basePart + '/service-data/seo-number',
    method: 'get',
    params: parameter
  })
}
// 全网推广--完成量
export function getComplete(parameter) {
  return axios({
    url: api.basePart + '/service-data/seo-done-number',
    method: 'get',
    params: parameter
  })
}
// 全网推广--任务进度
export function getTaskProgress(parameter) {
  return axios({
    url: api.basePart + '/service-data/seo-isdone',
    method: 'get',
    params: parameter
  })
}

// 全网推广--未完成
export function getunfinished(parameter) {
  return axios({
    url: api.basePart + '/service-data/seo-not-done',
    method: 'get',
    params: parameter
  })
}
// 全网推广- 合作级别
export function getSeoRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/seo-rank',
    method: 'get',
    params: parameter
  })
}

//新零售设计--基础数据
export function getNewRetailBaseData(parameter) {
  return axios({
    url: api.basePart + '/service-data/retail-basic',
    method: 'get',
    params: parameter
  })
}

//新零售设计--分配客户量
export function getNewRetailCustomers(parameter) {
  return axios({
    url: api.basePart + '/service-data/retail-number',
    method: 'get',
    params: parameter
  })
}

// 新零售设计--完成量
export function getNewRetailCompletions(parameter) {
  return axios({
    url: api.basePart + '/service-data/retail-done-number',
    method: 'get',
    params: parameter
  })
}

// 新零售--任务进度
export function getNewRetailTaskSchedule(parameter) {
  return axios({
    url: api.basePart + '/service-data/retail-isdone',
    method: 'get',
    params: parameter
  })
}
// 新零售--小组PK
export function getNewRetailGroupPk(parameter) {
  return axios({
    url: api.basePart + '/service-data/retail-group-pk',
    method: 'get',
    params: parameter
  })
}
// 新零售- 合作级别
export function getRetailRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/retail-rank',
    method: 'get',
    params: parameter
  })
}
// 电商拍摄--基础数据
export function getShootingBasicData(parameter) {
  return axios({
    url: api.basePart + '/service-data/video-basic',
    method: 'get',
    params: parameter
  })
}

//电商拍摄--分配客户量
export function getFilmDistribution(parameter) {
  return axios({
    url: api.basePart + '/service-data/video-number',
    method: 'get',
    params: parameter
  })
}

//电商拍摄--完成量
export function getShootingCompletion(parameter) {
  return axios({
    url: api.basePart + '/service-data/video-done-number',
    method: 'get',
    params: parameter
  })
}
// 电商拍摄--任务进度 -摄影
export function getTaskProgressPhotography(parameter) {
  return axios({
    url: api.basePart + '/service-data/video-isdone-camera',
    method: 'get',
    params: parameter
  })
}
// 电商拍摄--任务进度 -视频
export function getMissionProgressVideo(parameter) {
  return axios({
    url: api.basePart + '/service-data/video-isdone-video',
    method: 'get',
    params: parameter
  })
}
// 电商拍摄- 合作级别
export function getVideoRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/video-rank',
    method: 'get',
    params: parameter
  })
}

// 产品售后--基础数据
export function getAfterSalesBasicData(parameter) {
  return axios({
    url: api.basePart + '/service-data/after-sale-basic',
    method: 'get',
    params: parameter
  })
}

//产品售后--分配客户量
export function getAfterTheCustomer(parameter) {
  return axios({
    url: api.basePart + '/service-data/after-sale-number',
    method: 'get',
    params: parameter
  })
}

//产品售后--完成量
export function getAfterComplete(parameter) {
  return axios({
    url: api.basePart + '/service-data/after-sale-done-number',
    method: 'get',
    params: parameter
  })
}
// 产品售后--任务进度 
export function getAfterSalesTaskProgress(parameter) {
  return axios({
    url: api.basePart + '/service-data/after-sale-done',
    method: 'get',
    params: parameter
  })
}
// 产品售后- 合作级别
export function getAfterSaleRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/after-sale-rank',
    method: 'get',
    params: parameter
  })
}

// 店铺装修--基础数据
export function getStoreDecorationData(parameter) {
  return axios({
    url: api.basePart + '/service-data/decoration-basic',
    method: 'get',
    params: parameter
  })
}

//店铺装修--分配客户量
export function getStoreDecorationCustomers(parameter) {
  return axios({
    url: api.basePart + '/service-data/decoration-number',
    method: 'get',
    params: parameter
  })
}

//店铺装修--完成量
export function getDecorateToComplete(parameter) {
  return axios({
    url: api.basePart + '/service-data/decoration-done-number',
    method: 'get',
    params: parameter
  })
}
// 店铺装修--任务进度 
export function getDecorateProgress(parameter) {
  return axios({
    url: api.basePart + '/service-data/decoration-done',
    method: 'get',
    params: parameter
  })
}
// 店铺装修- 合作级别
export function getDecorationRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/decoration-rank',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--基础数据
export function getTaobaoBasicData(parameter) {
  return axios({
    url: api.basePart + '/service-data/tb-operation-basic',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--客户量
export function getNumberOfTaobaoCustomers(parameter) {
  return axios({
    url: api.basePart + '/service-data/tb-operation-number',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--完成量
export function getCompletedQuantityOfTaobao(parameter) {
  return axios({
    url: api.basePart + '/service-data/tb-operation-done-number',
    method: 'get',
    params: parameter
  })
}
// 淘宝运营--任务进度
export function getTaobaoOperationTaskProgress(parameter) {
  return axios({
    url: api.basePart + '/service-data/tb-operation-isdone',
    method: 'get',
    params: parameter
  })
}

// 淘宝运营--活动
export function getTaobaoOperationActivities(parameter) {
  return axios({
    url: api.basePart + '/service-data/tb-operation-log',
    method: 'get',
    params: parameter
  })
}
// 淘宝运营- 合作级别
export function getTboperationRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/tb-operation-rank',
    method: 'get',
    params: parameter
  })
}

// 微商运营--基础数据
export function getWeChatData(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-basic',
    method: 'get',
    params: parameter
  })
}


// 微商运营--分配客户量
export function getWeChatCustomers(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-number',
    method: 'get',
    params: parameter
  })
}

// 微商运营--分配客户量
export function getWeChatCompletion(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-done-number',
    method: 'get',
    params: parameter
  })
}
// 微商运营--任务进度
export function getWeChattaskProgress(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-isdone',
    method: 'get',
    params: parameter
  })
}

// 微商运营--活动报名
export function getWechatBusinessActivities(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-state',
    method: 'get',
    params: parameter
  })
}

// 微商运营--代理转化率
export function getWechatPercentConversion(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-agency',
    method: 'get',
    params: parameter
  })
}
// 微商运营- 合作级别
export function getWsoperationRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/ws-operation-rank',
    method: 'get',
    params: parameter
  })
}

// 拼多多--基础数据
export function getPddBasicData(parameter) {
  return axios({
    url: api.basePart + '/service-data/pdd-operation-basic',
    method: 'get',
    params: parameter
  })
}

// 拼多多--客户量
export function getNumberOfPddCustomers(parameter) {
  return axios({
    url: api.basePart + '/service-data/pdd-operation-number',
    method: 'get',
    params: parameter
  })
}

// 拼多多--完成量
export function getCompletedQuantityOfPdd(parameter) {
  return axios({
    url: api.basePart + '/service-data/pdd-operation-done-number',
    method: 'get',
    params: parameter
  })
}
// 拼多多--任务进度
export function getPddOperationTaskProgress(parameter) {
  return axios({
    url: api.basePart + '/service-data/pdd-operation-isdone',
    method: 'get',
    params: parameter
  })
}

// 拼多多--活动
export function getPddOperationActivities(parameter) {
  return axios({
    url: api.basePart + '/service-data/pdd-operation-log',
    method: 'get',
    params: parameter
  })
}
// 拼多多- 合作级别
export function getPddoperationRank(parameter) {
  return axios({
    url: api.basePart + '/service-data/pdd-operation-rank',
    method: 'get',
    params: parameter
  })
}
/******************** 数据分析 ********************/

/******************** 摄影 ********************/
// 摄影--个人任务
export function getRetailCamList(parameter) {
  return axios({
    url: api.basePart + '/retail/camList',
    method: 'get',
    params: parameter
  })
}
// 摄影--团队任务
export function getRetailCamAll(parameter) {
  return axios({
    url: api.basePart + '/retail/camAll',
    method: 'get',
    params: parameter
  })
}

// 摄影--分配任务
export function getRetailCamWork(parameter) {
  return axios({
    url: api.basePart + '/retail/camWork',
    method: 'put',
    data: parameter
  })
}

// 摄影--更新状态
export function getRetailCamStatus(parameter) {
  return axios({
    url: api.basePart + '/retail/camStatus',
    method: 'put',
    data: parameter
  })
} 


/******************** 服务 客户查询 ********************/ 
// 服务--我的客户
export function getCustomerEnquiry(parameter) {
  return axios({
    url: api.basePart + '/customer/service_search',
    method: 'get',
    params: parameter
  })
} 
//客户详情
export function getpricedetailstoclients(id) {
  return axios({
    url: api.basePart + '/customer/service-customer-detail/'+id,
    method: 'get',
  })
}
/******************** 服务 收款明细 ********************/ 
export function getcollectionSchedule(id) {
  return axios({
    url: api.basePart + '/service/achievement-list/'+id,
    method: 'get',
    // params: parameter
  })
}

/******************** 服务 电商拍摄 未分配 ********************/ 
// 电商拍摄--未分配初始化
export function getUnallocatedInitialization(parameter) {
  return axios({
    url: api.basePart + '/camera/allow',
    method: 'get',
    params: parameter
  })
} 
// 电商拍摄--未分配查询
export function getUnallocatedQuery(parameter) {
  return axios({
    url: api.basePart + '/camera/allow-search',
    method: 'get',
    params: parameter
  })
} 
// 电商拍摄--文分配 客户转移
export function getCustomerTransferNotAssigned(parameter) {
  return axios({
    url: api.basePart + '/camera/allow',
    method: 'put',
    data: parameter
  })
} 

/******************** 服务 投诉客服 ********************/  
export function getTheCustomerComplaints(parameter) {
  return axios({
    url: api.basePart + '/complain-server',
    method: 'get',
    params: parameter
  })
}  
 
// 投诉客服--详情  
export function getComplaintTustomerServiceDetails(id) {
  return axios({
    url: api.basePart + '/complain-server/' + id,
    method: 'get',
  })
}  

// 投诉客服--修改 
export function putDetailsToModify(parameter,id) {
  return axios({
    url: api.basePart + '/complain-server/'+id,
    method: 'put',
    data: parameter
  }) 
}  

//投诉客服--未分配
export function getComplaintCustomerServiceNotAllocated(parameter) {
  return axios({
    url: api.basePart + '/complain-server/allot',
    method: 'get',
    params: parameter
  }) 
}  
//投诉客服--未分配 -执行分配
export function getComplaintDistributionOfComplaints(parameter) {
  return axios({
    url: api.basePart + '/complain-server/allot',
    method: 'put',
    data: parameter
  }) 
}  

//投诉客服--客服转移 查询
export function getTransferOfComplaintCustomerService(parameter) {
  return axios({
    url: api.basePart + '/complain-server/move',
    method: 'get',
    params: parameter
  }) 
}   
// 投诉客服--客户转移-执行转移
export function putComplainTransfer(parameter) {
  return axios({
    url: api.basePart + '/complain-server/move',
    method: 'put',
    data: parameter
  })
}  

/******************** 服务 投诉客服 ********************/ 

/******************** 市场  腾讯线索管理 ********************/
// 编辑线索
export function getLeadsTencentEdit (id) {
  return axios({
    url: api.basePart+'/leads-tencent/'+id+'/edit',
    method: 'get',
  })
}
// 添加线索
export function addLeadsTencent (parameter) {
  return axios({
    url: api.basePart+'/leads-tencent',
    method: 'post',
    data: parameter
  })
}
// 删除线索
export function delLeadsTencent (id) {
  return axios({
    url: api.basePart+'/leads-tencent/'+id,
    method: 'delete'
  })
}
// 更新线索
export function putLeadsTencent (id,parameter) {
  return axios({
    url: api.basePart+'/leads-tencent/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询线索
export function getLeadsTencentSearch (id,parameter) {
  return axios({
    url: api.basePart+'/leads-tencent/'+id,
    method: 'get',
    params: parameter
  })
}
// 线索列表
export function getLeadsTencentList (parameter) {
  return axios({
    url: api.basePart+'/leads-tencent',
    method: 'get',
    params: parameter
  })
}
// 添加线索到客户表
export function postLeadsCus (parameter) {
  return axios({
    url: api.basePart+'/leads-cus',
    method: 'post',
    data: parameter
  })
}

/******************** 市场  百度线索管理 ********************/
// 编辑线索
export function getLeadsBaiduEdit (id) {
  return axios({
    url: api.basePart+'/leads-baidu/'+id+'/edit',
    method: 'get',
  })
}
// 添加线索
export function addLeadsBaidu (parameter) {
  return axios({
    url: api.basePart+'/leads-baidu',
    method: 'post',
    data: parameter
  })
}
// 添加线索（在线）
export function addLeadsBaiduOnLine (parameter) {
  return axios({
    url: 'https://mac.y-diantong.cn/notify/leads/baidu',
    method: 'post',
    data: parameter
  })
}
// 删除线索
export function delLeadsBaidu (id) {
  return axios({
    url: api.basePart+'/leads-baidu/'+id,
    method: 'delete'
  })
}
// 更新线索
export function putLeadsBaidu (id,parameter) {
  return axios({
    url: api.basePart+'/leads-baidu/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询线索
export function getLeadsBaiduSearch (id,parameter) {
  return axios({
    url: api.basePart+'/leads-baidu/'+id,
    method: 'get',
    params: parameter
  })
}
// 线索列表
export function getLeadsBaiduList (parameter) {
  return axios({
    url: api.basePart+'/leads-baidu',
    method: 'get',
    params: parameter
  })
}
// 添加线索到客户表
export function postLeadsBaiduCus (parameter) {
  return axios({
    url: api.basePart+'/leads/baidu/cus',
    method: 'post',
    data: parameter
  })
}