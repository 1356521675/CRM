<template>
  <div class="mainbox">
    <div class="tab-content">
      <a-tabs defaultActiveKey="1" :animated="false">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="hetonggl"/>日志
          </span>
          <service-new/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import {hetonggl} from "@/core/icons";
import ServiceNew from "./modules/message";
export default {
  name: "service",
  components: {
    ServiceNew,
  },
  data() {
    return {
      hetonggl,
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {}
    };
  },
  methods: {
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
