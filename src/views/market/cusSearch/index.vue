<template>
  <div class="mainbox">
    <div :class="['tab-content', {'phstyle': isMobile()}]">
      <a-tabs :activeKey="activeKey" :animated="false">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="marketSearch" />客户查询
          </span>
          <inquire-box ref="inquireBox" :systemList="this.$store.getters.systemList" :swtList="swtList" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { showPage, sethistoryPage } from "@/utils/historyPage";
import { mixinDevice } from "@/utils/mixin.js";
import { marketSearch } from "@/core/icons";
import inquireBox from "./modules/inquire";
export default {
  name: "service",
  components: {
    inquireBox
  },
  mixins: [mixinDevice],
  data() {
    return {
      activeKey: "1",
      marketSearch,
      swtList: [
        {
          name: "商务通1",
          id: 1
        },
        {
          name: "商务通2",
          id: 2
        },
        {
          name: "商务通3",
          id: 3
        }
      ]
    };
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
  .phstyle {
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
