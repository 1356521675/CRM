<template>
  <div class="mainbox">
    <div class="tab-content">
      <a-tabs defaultActiveKey="1" :animated="false" @change="clickTab">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="gerenzx"/>在职下属
          </span>
          <service-new ref="servicenew"/>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon :component="usercenterclose"/>已关闭
          </span>
          <close-person ref="closeperson"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import {gerenzx,usercenterclose} from "@/core/icons";
import ServiceNew from "./modules/index";
import ClosePerson from "./modules/closeIndex";
export default {
  name: "service",
  components: {
    ServiceNew,
    ClosePerson
  },
  data() {
    return {
      gerenzx,usercenterclose,
    };
  },
  methods: {
    clickTab (index) {
      this.activeKey = index
      if (index == 1) {
        this.$refs.servicenew && this.$refs.servicenew.loadPage()
      } else if (index == 2) {
        this.$refs.closeperson && this.$refs.closeperson.loadPage()
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mainbox {
  .tab-content {
    margin: 20px;
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

