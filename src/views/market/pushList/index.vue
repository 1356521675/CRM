<template>
  <div class="mainbox">
    <div :class="['tab-content', {'phstyle': isMobile()}]">
      <a-tabs :activeKey="activeKey" :animated="false" @change="clickTab">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="marketxinlaiyuan" />推送列表
          </span>
          <push-index/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { mixinDevice } from '@/utils/mixin.js';
import { marketxinlaiyuan } from "@/core/icons";
import pushIndex from "./modules/index";
export default {
  name: "service",
  components: {
    pushIndex,
  },
  mixins: [mixinDevice],
  data() {
    return {
      marketxinlaiyuan,
      activeKey: '1',
    };
  },
  methods: {
    clickTab(index) {
      this.activeKey = index;
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
  }
  .tab-content {
    margin: 20px;
  }
  .phstyle{
    margin: 20px 0;
  }
}
</style>
<style scoped>
.tab-content >>> .ant-tabs-nav-container {
  background-color: #fff;
  border-top: 1px solid #e1e3e4;
  border-bottom: 1px solid #e1e3e4;
  border-left: 1px solid #e1e3e4;
  border-right: 1px solid #e1e3e4;
}
.tab-content
  >>> .ant-tabs-nav-container
  .ant-tabs-nav-wrap
  .ant-tabs-nav
  .ant-tabs-tab {
  margin: 0;
  padding: 12px 22px;
  border-right: 1px solid #e1e3e4;
  border-bottom: 1px solid #e1e3e4;
}
.tab-content
  >>> .ant-tabs-nav-container
  .ant-tabs-nav-wrap
  .ant-tabs-nav
  .ant-tabs-ink-bar {
  color: #fff;
}

.tab-content >>> .ant-tabs-content {
  background-color: #fff;
  border: 1px solid #e1e3e4;
}
</style>