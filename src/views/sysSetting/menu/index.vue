<template>
  <div class="mainbox">
    <div :class="['tab-content', {'phstyle': isMobile()}]">
      <a-tabs defaultActiveKey="1" :animated="false" @change="clickTab">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="marketxinlaiyuan" />菜单管理
          </span>
          <server-index ref="semSourcecon"  @setlabels="setLable"/>
        </a-tab-pane>
        <!-- <a-tab-pane key="2">
          <span slot="tab">
            <a-icon :component="marketfenlei"/>新建权限
          </span>
          <server-new/>
        </a-tab-pane> -->
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { mixinDevice } from '@/utils/mixin.js'
import {yd_source,marketfenlei,marketxinlaiyuan} from "@/core/icons";
import serverNew from "./modules/new";
import serverIndex from "./modules/index";
export default {
  name: "service",
  components: {
    serverNew,
    serverIndex,
  },
  mixins: [mixinDevice],
  data() {
    return {
      yd_source,marketxinlaiyuan,marketfenlei,
      activeKey:0,
      // 查询参数
      queryParam: {}
    };
  },
  methods: {
    handleReset() {
      this.form.resetFields();
    },
    setLable(data) {
      this.labels = data;
    },
    clickTab(index) {
      this.activeKey = index-1
    }
  }
};
</script>
<style lang="less" scoped>
.mainbox {
  .ant-advanced-search-form {
    padding: 24px;
    background: #fbfbfb;
    border-bottom: 1px solid #d9d9d9;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    button {
      margin-top: 4px;
    }
    /deep/ .ant-form-item {
      display: flex;
      margin-bottom: 0;
      .ant-form-item-label {
        width: 64px;
        label {
          display: inline-block;
          width: 64px;
        }
      }
    }
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
  .tab-content {
    margin: 20px;
    /deep/ .ant-tabs-nav-container {
      background-color: #fff;
      border-top: 1px solid #e1e3e4;
      border-bottom: 1px solid #e1e3e4;
      border-left: 1px solid #e1e3e4;
      border-right: 1px solid #e1e3e4;
      .ant-tabs-nav-wrap {
        .ant-tabs-nav {
          .ant-tabs-tab {
            margin: 0;
            padding: 12px 22px;
            border-right: 1px solid #e1e3e4;
            border-bottom: 1px solid #e1e3e4;
          }
          .ant-tabs-tab-active {
          }
          .ant-tabs-ink-bar {
            color: #fff;
          }
        }
      }
    }
    /deep/ .ant-tabs-content{
      background-color: #fff;
      border: 1px solid #e1e3e4;
    }
  }
  .phstyle{
    margin: 20px 0;
  }
}
</style>
