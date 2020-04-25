<template>
  <div class="center-box">
    <div class="show">
      <div class="tab-content" style="border:none">
        <a-tabs :activeKey="this.jump" :animated="false" @change="localJump">
          <a-tab-pane key="1">
            <span slot="tab">腾讯线索</span>
            <tcmessage-board/>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">百度线索</span>
            <bdmessage-board/>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import tcmessageBoard from './tcmessageBoard';
import bdmessageBoard from './bdmessageBoard';
export default {
  components: {
    tcmessageBoard,
    bdmessageBoard
  },
  data() {
    return {
      jump:'1'
    }
  },
  created() {},
  methods: {
    localJump(value){
      this.jump= value
    }
  }
};
</script>
<style lang="less" scoped>
.topbtn{
  margin-top: 4px;
  float: right;
}
.center-box {
  box-sizing: border-box;
  padding: 0;
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



