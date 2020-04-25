// 来源 
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
/********************来源 ********************/

/********************来源分类 ********************/

// 来源分类列表
export function getClassification(parameter) {
  return axios({
    url: api.basePart + '/source-class',
    method: 'get',
    params: parameter
  })
}
// 编辑来源分类
export function getClassificationEdit(parameter, id) {
  return axios({
    url: api.basePart + '/source-class/' + id + '/edit',
    method: 'get',
    params: parameter
  })
}
// 来源分类修改
export function putClassification(parameter, id) {
  return axios({
    url: api.basePart + '/source-class/' + id,
    method: 'put',
    data: parameter
  })
}

//来源分类 新建
export function postClassification(parameter) {
  return axios({
    url: api.basePart + '/source-class',
    method: 'post',
    data: parameter
  })
}
/********************来源分类 ********************/


