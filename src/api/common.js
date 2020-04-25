// 公共接口
import { axios } from '@/utils/request'
import api from './index'

/********************文件上传 ********************/
// 上传单文件
export function postUploadFile (parameter) {
  return axios({
    url: api.basePart+'/uploadFile',
    method: 'post',
    data: parameter,
  })
}
// 上传多文件
export function postUploadMutiFile (parameter) {
  return axios({
    url: api.basePart+'/uploadMutiFile',
    method: 'post',
    data: parameter,
  })
}


/******************** 获取人员个人信息 ********************/
//获取人员个人信息
export function getServiceUserInfo(id,parameter) {
  return axios({
    url: api.basePart + '/service/user/'+id,
    method: 'get',
    params: parameter
  })
}


/******************** 站内信 ********************/
// 站内信--获取新消息-数量
export function getMsgNewsNum(parameter) {
  return axios({
    url: api.basePart + '/message/get-news',
    method: 'get',
    params: parameter
  })
}

// 站内信--首页
export function getMsgIndex(parameter) {
  return axios({
    url: api.basePart + '/message/index',
    method: 'get',
    params: parameter
  })
}
// 站内信--创建页
export function getMsgCreate(parameter) {
  return axios({
    url: api.basePart + '/message/create',
    method: 'get',
    params: parameter
  })
}
// 站内信--查看
export function getMsgEdit(parameter) {
  return axios({
    url: api.basePart + '/message/edit',
    method: 'get',
    params: parameter
  })
}
// 站内信--添加
export function getMsgAdd(parameter) {
  return axios({
    url: api.basePart + '/message/save',
    method: 'post',
    data: parameter
  })
}
// 站内信--删除
export function getMsgDelete(id,parameter) {
  return axios({
    url: api.basePart + '/message/delete/'+id,
    method: 'delete',
    data: parameter
  })
}
// 站内信--批量
export function getMsgDeleteAll(parameter) {
  return axios({
    url: api.basePart + '/message/delete',
    method: 'delete',
    data: parameter
  })
}
// 站内信--设为已读
export function getMsgSetread(parameter) {
  return axios({
    url: api.basePart + '/message/set-read',
    method: 'put',
    data: parameter
  })
}
// 站内信--设为未读
export function getMsgSetUnread(parameter) {
  return axios({
    url: api.basePart + '/message/set-unread',
    method: 'put',
    data: parameter
  })
}


/******************** 用户中心 ********************/
// 编辑用户
export function getUserEdit(id,parameter) {
  return axios({
    url: api.basePart + '/user/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}

// 更新用户
export function putUser(id,parameter) {
  return axios({
    url: api.basePart + '/user/'+id,
    method: 'put',
    data: parameter
  })
}
// 修改密码
export function putModifyPassword(id,parameter) {
  return axios({
    url: api.basePart + '/user/'+id+'/modify-password',
    method: 'put',
    data: parameter
  })
}

// 在职下属
export function getServiceSubordinate(parameter) {
  return axios({
    url: api.basePart + '/service/subordinate',
    method: 'get',
    params: parameter
  })
}

// 关闭账户
export function putUserClose(id,parameter) {
  return axios({
    url: api.basePart + '/user/'+id+'/close',
    method: 'put',
    data: parameter
  })
}

// 转移账户
export function putServiceMove(id,parameter) {
  return axios({
    url: api.basePart + '/service/'+id+'/move',
    method: 'put',
    data: parameter
  })
}

/******************** 客户信息 ********************/
export function getClientInformation(id,parameter) {
  return axios({
    url: api.basePart + '/customer/info/'+id,
    method: 'get',
    params: parameter
  })
}


/******************** bbs讨论区 ********************/
// 问题 - 主帖列表
export function getBbsForumTopicList(parameter) {
  return axios({
    url: api.basePart + '/bbs/forum-topic-list',
    method: 'get',
    params: parameter
  })
}
// 问题 - 置顶
export function putBbsSetTop(id,parameter) {
  return axios({
    url: api.basePart + '/bbs/'+id+'/set-top',
    method: 'put',
    data: parameter
  })
}
// 问题 - 楼层详情
export function getBbsFloor(id,parameter) {
  return axios({
    url: api.basePart + '/bbs/'+id+'/floor',
    method: 'get',
    params: parameter
  })
}
// 问题 - 列表
export function getBbs(parameter) {
  return axios({
    url: api.basePart + '/bbs',
    method: 'get',
    params: parameter
  })
}
// 问题 - 添加
export function postBbs(parameter) {
  return axios({
    url: api.basePart + '/bbs',
    method: 'post',
    data: parameter
  })
}
// 问题 - 编辑
export function getBbsEdit(id,parameter) {
  return axios({
    url: api.basePart + '/bbs/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}
// 问题 - 修改
export function putBbs(id,parameter) {
  return axios({
    url: api.basePart + '/bbs/'+id,
    method: 'put',
    data: parameter
  })
}
// 问题 - 审核
export function putBbsAudit(parameter) {
  return axios({
    url: api.basePart + '/bbs/audit',
    method: 'put',
    data: parameter
  })
}
// 问题 - 删除
export function delBbs(id,parameter) {
  return axios({
    url: api.basePart + '/bbs/'+id,
    method: 'delete',
    data: parameter
  })
}
// BBS楼层区 - -列表
export function getBbsStorey(parameter) {
  return axios({
    url: api.basePart + '/bbs-storey',
    method: 'get',
    params: parameter
  })
}
// BBS楼层区 - 添加
export function postBbsStorey(parameter) {
  return axios({
    url: api.basePart + '/bbs-storey',
    method: 'post',
    data: parameter
  })
}
// BBS楼层区 - 编辑
export function getBbsStoreyEdit(id,parameter) {
  return axios({
    url: api.basePart + '/bbs-storey/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}
// BBS楼层区 - 更新
export function putBbsStorey(id,parameter) {
  return axios({
    url: api.basePart + '/bbs-storey/'+id,
    method: 'put',
    data: parameter
  })
}
// BBS楼层区 - 审核
export function putBbsStoreyAudit(parameter) {
  return axios({
    url: api.basePart + '/bbs-storey/audit',
    method: 'put',
    data: parameter
  })
}
// BBS楼层区 - 删除
export function delBbsStorey(id,parameter) {
  return axios({
    url: api.basePart + '/bbs-storey/'+id,
    method: 'delete',
    data: parameter
  })
}
// BBS楼层评论区 - 列表
export function getBbsScomment(parameter) {
  return axios({
    url: api.basePart + '/bbs-s-comment',
    method: 'get',
    params: parameter
  })
}
// BBS楼层评论区 - 添加
export function postBbsScomment(parameter) {
  return axios({
    url: api.basePart + '/bbs-s-comment',
    method: 'post',
    data: parameter
  })
}
// BBS楼层评论区 - 编辑
export function getBbsScommentEdit(id,parameter) {
  return axios({
    url: api.basePart + '/bbs-s-comment/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}
// BBS楼层评论区 - 更新
export function putBbsScomment(id,parameter) {
  return axios({
    url: api.basePart + '/bbs-s-comment/'+id,
    method: 'put',
    data: parameter
  })
}
// BBS楼层评论区 - 审核
export function putBbsScommentAudit(parameter) {
  return axios({
    url: api.basePart + '/bbs-s-comment/audit',
    method: 'put',
    data: parameter
  })
}
// BBS楼层评论区 - 删除
export function delBbsScomment(id,parameter) {
  return axios({
    url: api.basePart + '/bbs-s-comment/'+id,
    method: 'delete',
    data: parameter
  })
}
// BBS楼层评论区 - 删除
export function getBbsUnauditedNum(parameter) {
  return axios({
    url: api.basePart + '/bbs/unaudited-num',
    method: 'get',
    params: parameter
  })
}
// BBS楼层评论区 - 管理员添加
export function postBbsStoreyAdminSave(parameter) {
  return axios({
    url: api.basePart + '/bbs-storey/admin-save',
    method: 'post',
    data: parameter
  })
}