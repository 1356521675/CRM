// 管理员

import { axios } from '@/utils/request'
import api from './index'

// 已登录员工列表
/********************来源 ********************/
export function getUserLogin (parameter) {
  return axios({
    url: api.basePart+'/login',
    method: 'get',
    params: parameter
  })
}

/******************** 用户 ********************/
// 用户列表
export function getUserList (parameter) {
  return axios({
    url: api.basePart+'/user',
    method: 'get',
    params: parameter
  })
}
// 添加用户
export function addNewUser (parameter) {
  return axios({
    url: api.basePart+'/user',
    method: 'post',
    data: parameter
  })
}

// 删除用户
export function delNewUser (id) {
  return axios({
    url: api.basePart+'/user/'+id,
    method: 'delete'
  })
}
// 编辑用户
export function getEditUser (id) {
  return axios({
    url: api.basePart+'/user/'+id+'/edit',
    method: 'get',
  })
}
// 更新用户
export function editUser (parameter,id) {
  return axios({
    url: api.basePart+'/user/'+id,
    method: 'put',
    data: parameter
  })
}
// 重置密码
export function putUserResetpwd (id,parameter) {
  return axios({
    url: api.basePart+'/user/'+id+'/reset-password',
    method: 'put',
    data: parameter
  })
}
// 搜索用户
export function getUserSearch (parameter) {
  return axios({
    url: api.basePart+'/user/search',
    method: 'get',
    params: parameter
  })
}

/******************** 组织机构 ********************/
// 获取机构列表
export function getOrg (parameter) {
  return axios({
    url: api.basePart+'/org',
    method: 'get',
    params: parameter
  })
}
// 添加机构
export function addOrg (parameter) {
  return axios({
    url: api.basePart+'/org',
    method: 'post',
    data: parameter
  })
}
// 编辑机构
export function editOrg (parameter,id) {
  return axios({
    url: api.basePart+'/org/'+id,
    method: 'put',
    data: parameter
  })
}
// 移除机构
export function delOrg (id) {
  return axios({
    url: api.basePart+'/org/'+id,
    method: 'delete',
  })
}

/******************** 部门 ********************/
// 获取部门列表
export function getDepartment (parameter) {
  return axios({
    url: api.basePart+'/dep',
    method: 'get',
    params: parameter
  })
}

// 编辑部门
export function editDepartment (parameter,id) {
  return axios({
    url: api.basePart+'/dep/'+id,
    method: 'put',
    data: parameter
  })
}

// 添加部门
export function addDepartment (parameter) {
  return axios({
    url: api.basePart+'/dep',
    method: 'post',
    data: parameter
  })
}

// 移除部门
export function delDepartment (parameter,id) {
  return axios({
    url: api.basePart+'/dep/'+id,
    method: 'delete',
    params: parameter
  })
}
// 获取所有部门的用户(传入部门id时获取指定部门用户)
export function getDpUser (id) {
  const does= id? '/'+id : ''
  return axios({
    url: api.basePart+'/dep-user'+does,
    method: 'get',
  })
}
// 给部门分配用户
export function addDpUser (parameter) {
  return axios({
    url: api.basePart+'/dep-user',
    method: 'post',
    data: parameter
  })
}


/******************** 权限 ********************/
// 权限列表
export function getRuleList (parameter) {
  return axios({
    url: api.basePart+'/rule',
    method: 'get',
    params: parameter
  })
}
// 查询权限
export function getRuleById (id) {
  return axios({
    url: api.basePart+'/rule/'+id,
    method: 'get',
  })
}
// 添加权限
export function addRule (parameter) {
  return axios({
    url: api.basePart+'/rule',
    method: 'post',
    data: parameter
  })
}
// 编辑权限
export function editRule (id,parameter) {
  return axios({
    url: api.basePart+'/rule/'+id,
    method: 'put',
    data: parameter
  })
}
// 删除权限
export function delRule (id,parameter) {
  return axios({
    url: api.basePart+'/rule/'+id,
    method: 'delete',
    data: parameter
  })
}


/******************** 权限组管理 ********************/
// 权限组列表
export function getRuleGroup (parameter) {
  return axios({
    url: api.basePart+'/rule-group',
    method: 'get',
    params: parameter
  })
}
// 查询权限组
export function getRuleGroupById (id) {
  return axios({
    url: api.basePart+'/rule-group/'+id,
    method: 'get',
  })
}
// 添加权限组
export function addRuleGroup (parameter) {
  return axios({
    url: api.basePart+'/rule-group',
    method: 'post',
    data: parameter
  })
}
// 编辑权限组
export function editRuleGroup (id,parameter) {
  return axios({
    url: api.basePart+'/rule-group/'+id,
    method: 'put',
    data: parameter
  })
}
// 删除权限组
export function delRuleGroup (id,parameter) {
  return axios({
    url: api.basePart+'/rule-group/'+id,
    method: 'delete',
    data: parameter
  })
}


/******************** 角色权限 ********************/
// 角色权限列表
export function getRoleRuleList (parameter) {
  return axios({
    url: api.basePart+'/role-rule',
    method: 'get',
    params: parameter
  })
}
// 查询角色权限
export function getRoleRules (id) {
  return axios({
    url: api.basePart+'/role-rule/'+id,
    method: 'get',
  })
}
// 添加角色权限
export function addRoleRules (parameter) {
  return axios({
    url: api.basePart+'/role-rule',
    method: 'post',
    data: parameter
  })
}
// 编辑角色权限
export function editRoleRules (parameter,id) {
  return axios({
    url: api.basePart+'/role-rule/'+id,
    method: 'put',
    data: parameter
  })
}
// 删除角色权限
export function delRoleRules (parameter,id) {
  return axios({
    url: api.basePart+'/role-rule/'+id,
    method: 'delete',
    data: parameter
  })
}
/******************** 角色 ********************/
// 角色列表
export function getRoleList (parameter) {
  return axios({
    url: api.basePart+'/role',
    method: 'get',
    params: parameter
  })
}

// 新增角色
export function addRoleList (parameter) {
  return axios({
    url: api.basePart+'/role',
    method: 'post',
    data: parameter
  })
}

// 编辑角色
export function editItemRole (parameter,id) {
  return axios({
    url: api.basePart+'/role/'+id,
    method: 'put',
    data: parameter
  })
}

// 删除角色
export function delRole (id) {
  return axios({
    url: api.basePart+'/role/'+id,
    method: 'delete',
  })
}

/******************** 角色用户管理 ********************/
// 添加用户到角色
export function addRoleUser (parameter) {
  return axios({
    url: api.basePart+'/role-user',
    method: 'post',
    data: parameter
  })
}

// 角色用户列表
export function getRoleUser (id) {
  return axios({
    url: api.basePart+'/role-user/'+ id +'/edit',
    method: 'get',
  })
}

// 删除角色中所有用户
export function delRoleUser (id) {
  return axios({
    url: api.basePart+'/role-user/'+ id,
    method: 'delete',
  })
}
// 删除角色中指定用户
export function delOneRoleUser (parameter,id) {
  return axios({
    url: api.basePart+'/role-user/delUserById/'+ id,
    method: 'delete',
    data:parameter,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}


/******************** 角色部门 ********************/
// 角色部门列表
export function getRoleDep (parameter) {
  return axios({
    url: api.basePart+'/role-dep',
    method: 'get',
    params: parameter
  })
}

// 查询指定角色部门列表
export function getSelfRoleDep (id,parameter) {
  return axios({
    url: api.basePart+'/role-dep/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}

// 角色部门绑定
export function putRoleDep (id,parameter) {
  return axios({
    url: api.basePart+'/role-dep/'+id,
    method: 'put',
    data: parameter
  })
}

// 移除角色中的所有部门
export function delRoleDep (id) {
  return axios({
    url: api.basePart+'/role-dep/'+id,
    method: 'delete',
  })
}

/******************** 菜单管理 ********************/

// 编辑菜单
export function getMenuEdit (id) {
  return axios({
    url: api.basePart+'/menu/'+id+'/edit',
    method: 'get',
  })
}
// 添加菜单
export function postMenu (parameter) {
  return axios({
    url: api.basePart+'/menu',
    method: 'post',
    data: parameter
  })
}
// 删除菜单
export function delMenu (id) {
  return axios({
    url: api.basePart+'/menu/'+ id,
    method: 'delete',
  })
}
// 更新菜单
export function putMenu (id,parameter) {
  return axios({
    url: api.basePart+'/menu/'+id,
    method: 'put',
    data: parameter
  })
}
// 查询菜单列表
export function getMenuById (id) {
  return axios({
    url: api.basePart+'/menu/'+id,
    method: 'get',
  })
}
// 菜单列表
export function getMenu () {
  return axios({
    url: api.basePart+'/menu',
    method: 'get',
  })
}

/******************** 角色菜单管理 ********************/


// 给角色绑定菜单
export function postRoleMenu (parameter) {
  return axios({
    url: api.basePart+'/role-menu',
    method: 'post',
    data: parameter
  })
}

// 查询指定角色菜单列表
export function getRoleMenuById (id,parameter) {
  return axios({
    url: api.basePart+'/role-menu/'+id+'/edit',
    method: 'get',
    params: parameter
  })
}

// 更新角色中菜单
export function putRoleMenuById (id,parameter) {
  return axios({
    url: api.basePart+'/role-menu/'+id,
    method: 'put',
    data: parameter
  })
}
// 移除角色中的所有菜单
export function delRoleMenu (id,parameter) {
  return axios({
    url: api.basePart+'/role-menu/'+id,
    method: 'delete',
    params: parameter
  })
}


/******************** 系统日志管理 ********************/

// 目录
export function getLogTextDir (parameter) {
  return axios({
    url: api.basePart+'/log-text/dir',
    method: 'get',
    params: parameter
  })
}

// 详情（列表）
export function getLogTextRead (parameter) {
  return axios({
    url: api.basePart+'/log-text/read',
    method: 'get',
    params: parameter
  })
}

// 搜索
export function getLogTextSearch (parameter) {
  return axios({
    url: api.basePart+'/log-text/search',
    method: 'get',
    params: parameter
  })
}
// 删除
export function delLogTextDel (parameter) {
  return axios({
    url: api.basePart+'/log-text/del',
    method: 'delete',
    params: parameter
  })
}
// 日志类型列表
export function getLogTextList (parameter) {
  return axios({
    url: api.basePart+'/log-text/list',
    method: 'get',
    params: parameter
  })
}

// 全局搜索-当前目录下的所有日志文件
export function getLogTextListSearch (parameter) {
  return axios({
    url: api.basePart+'/log-text/list-search',
    method: 'get',
    params: parameter
  })
}
/******************  特殊接口  *********************/
// 手动扣除推广费
export function postAchiTocost (parameter) {
  return axios({
    url: api.basePart+'/achi/tocost',
    method: 'post',
    data: parameter
  })
}

// 手动扣除推广费
export function getServiceOpenService (id,parameter) {
  return axios({
    url: api.basePart+'/service/open-service/'+id,
    method: 'get',
    params: parameter
  })
}



