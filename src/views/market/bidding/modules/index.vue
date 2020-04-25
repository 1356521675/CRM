<template>
  <div class="center-box">
    <div class="tab-content">
      <a-tabs :activeKey="activeKey"
              :animated="false"
              @change="clickTab">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="sale_myyeji" />ROI
          </span>
          <a-roi ref="aRoi" :sysInfo="sysInfo"/>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon :component="muprate" />升级占比
          </span>
          <a-upgrade ref="aUpgrade" />
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon :component="mperrate" />个人占比
          </span>
          <a-personal ref="aPersonal" />
        </a-tab-pane>
        <a-tab-pane key="4">
          <span slot="tab">
            <a-icon :component="mdepturn" />部门转化
          </span>
          <a-dpTurn ref="aDpTurn" />
        </a-tab-pane>
        <a-tab-pane key="5">
          <span slot="tab">
            <a-icon :component="mperturn" />个人转化
          </span>
          <a-personTurn ref="aPersonTurn" />
        </a-tab-pane>
        <a-tab-pane key="6">
          <span slot="tab">
            <a-icon :component="financedingdan" />客户信息
          </span>
          <a-customer ref="acustomer" />
        </a-tab-pane>
        <a-tab-pane key="7">
          <span slot="tab">
            <a-icon :component="maddturn" />添加状态
          </span>
          <a-addStatus ref="addStatus" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { showPage, sethistoryPage} from '@/utils/historyPage'
import {  sale_myyeji,muprate,mperrate,mdepturn,mperturn,maddturn,financedingdan } from "@/core/icons";
import aRoi from "./roi";
import AUpgrade from "./upgrade";
import APersonal from "./personal";
import ADpTurn from "./dpTurn";
import APersonTurn from "./personTurn";
import AAddStatus from "./addStatus";
import ACustomer from "./customer";
export default {
  name: "service",
  components: {
    aRoi,
    AUpgrade,
    APersonal,
    ADpTurn,
    APersonTurn,
    AAddStatus,
    ACustomer
  },
  props:['sysInfo'],
  data () {
    return {
      activeKey: '1',
      sale_myyeji,muprate,mperrate,mdepturn,mperturn,maddturn,financedingdan
    };
  },
  mounted(){
    console.log(this.sysInfo)
  },
  methods: {
    clickTab (index) {
      this.activeKey= index
    }
  }
};
</script>
<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0;
  background-color: #fff;
}
</style>
<style  scoped>
.center-box >>> .tab-content .ant-tabs-top {
  border: 0;
  margin: 0;
  padding: 0;
}
.center-box >>> .tab-content .ant-tabs-bar {
  margin: 0;
}
.center-box >>> .tab-content .ant-tabs-content {
  border: 0 none;
}
.center-box >>> .tab-content .ant-tabs-bar .ant-tabs-nav-container {
  border: 0;
  border-bottom: 1px solid #e1e3e4;
  background: #fff;
}
.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-disabled,
.ant-tabs-nav .ant-tabs-tab-disabled:hover {
  cursor: default;
  color: #000;
}

.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-nav-wrap
  .ant-tabs-nav
  .ant-tabs-tab {
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin: 0;
  width: 100px;
  padding: 0;
}
.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active {
  background-color: #447ed9;
  color: #fff;
}

.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-ink-bar {
  height: 0;
  display: none;
}

.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-disabled {
  background-color: #f9f9f9;
  color: #000;
}

.center-box
  >>> .tab-content
  .hideTabActive
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active {
  background-color: #f9f9f9;
  color: #666;
}
.center-box
  >>> .tab-content
  .hideTabActive
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active:hover {
  color: #447ed9;
}
</style>
