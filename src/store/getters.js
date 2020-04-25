const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  msgNum: state => state.user.msgNum,
  unauditedNum: state => state.user,
  refreshMsg: state => state.user.refreshMsg,
  loadPath: state => state.user.loadPath,
  systemList: state => state.user.sysListInfo,
}

export default getters
