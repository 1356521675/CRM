// 商务通 
import {
  axios
} from '@/utils/request'

import api from './index'

/********************商务通 ********************/
// 商务通关联用户列表
export function getbscnym(parameter) {
  return axios({
    url: api.basePart + '/bscnym-user',
    method: 'get',
    params: parameter
  })
}

// 商务通关联用户列表
export function postbscnym(parameter) {
  return axios({
    url: api.basePart + '/bscnym-user',
    method: 'post',
    data: parameter
  })
}

// 商务通列表所有  
export function getbscnymList(parameter) {
  return axios({
    url: api.basePart + '/bscnym/list',
    method: 'get',
    params: parameter
  })
}

// 商务通关联来源分类   
export function getbscnymJoinClass(id) {
  return axios({
    url: api.basePart + '/bscnym/' + id + '/join-class',
    method: 'get',
  })
}

// 商务通关联来源分类 修改保存  
export function putbscnymJoinClass(id, parameter) {
  return axios({
    url: api.basePart + '/bscnym/' + id,
    method: 'put',
    data: parameter
  })
}



// 新建商务通 列表
export function getbscnymJoinList(parameter) {
  return axios({
    url: api.basePart + '/bscnym',
    method: 'get',
    params: parameter
  })
}

// 新建商务通 新建
export function addBscnymJoinList(parameter) {
  return axios({
    url: api.basePart + '/bscnym',
    method: 'post',
    data: parameter
  })
}





// 编辑来源
export function getSourceEdit(parameter, id) {
  return axios({
    url: api.basePart + '/source/' + id + '/edit',
    method: 'get',
    params: parameter
  })
}
// 修改来源
export function putSource(parameter, id) {
  return axios({
    url: api.basePart + '/source/' + id,
    method: 'put',
    data: parameter
  })
}
//一键生成唯一标识
export function getUniqueIdentifier(parameter) {
  return axios({
    url: api.basePart + '/source-class/unique-code',
    method: 'get',
    params: parameter
  })
}
// 来源分类下拉列表
export function getSourceClass(parameter) {
  return axios({
    url: api.basePart + '/source-class/list',
    method: 'get',
    params: parameter
  })
}
// 新建来源
export function postSource(parameter) {
  return axios({
    url: api.basePart + '/source',
    method: 'post',
    data: parameter
  })
}
/********************商务通 ********************/




