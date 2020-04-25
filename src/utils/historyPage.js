import Vue from 'vue'

export function showPage(permissionList, status) {
  let storePage = Vue.ls.get("homePage");
  let nowPage = window.location.pathname;
  let mainPage = Vue.ls.get("mainPage");
  let mainPageId = Vue.ls.get("mainPageId") + '';
  if (status) {
    let secondPage = Vue.ls.get("secondPage");
    let secondPageId = Vue.ls.get("secondPageId") + '';
    if (permissionList) {
      if (storePage == nowPage && secondPageId && permissionList.indexOf(secondPageId) != -1) {
        return secondPage ? secondPage + '' : false
      } else {
        return false
      }
    } else {
      if (storePage == nowPage) {
        return secondPage ? secondPage + '' : false
      } else {
        false
      }
    }
  } else {
    if (permissionList) {
      if (storePage == nowPage && mainPageId && permissionList.indexOf(mainPageId) != -1) {
        return mainPage ? mainPage + '' : false
      } else {
        return false
      }
    } else {
      if (storePage == nowPage) {
        return mainPage ? mainPage + '' : false
      } else {
        false
      }
    }
  }
}
export function changeHomePage() {
  let storePage = Vue.ls.get("homePage");
  let nowPage = window.location.pathname;
  if (storePage != nowPage) {
    sethistoryPage('', '')
  }
}
export function sethistoryPage(page, id, status) {
  if (status) {
    Vue.ls.set("secondPage", page);
    Vue.ls.set("secondPageId", id);
  } else {
    Vue.ls.set("mainPage", page);
    Vue.ls.set("mainPageId", id);
    Vue.ls.set("secondPage", '');
    Vue.ls.set("secondPageId", '');
  }
}