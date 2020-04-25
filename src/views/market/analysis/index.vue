<template>
  <div class="mainbox">
    <div :class="['tab-content', {'phstyle': isMobile()}]">
      <a-tabs :activeKey="dActiveKey"
              :animated="false"
              @change="clickTab">
        <a-tab-pane key="1" v-if="this.roles().permissionList.indexOf('99')!= -1">
          <span slot="tab">
            <a-icon :component="yd_source" />概览
          </span>
          <over-view ref="basicChart" />
        </a-tab-pane>
        <a-tab-pane key="2" v-if="this.roles().permissionList.indexOf('100')!= -1">
          <span slot="tab">
            <a-icon :component="marketkehu" />客户量
          </span>
          <e-customer ref="sourceChart" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { showPage, sethistoryPage} from '@/utils/historyPage'
import { mapGetters } from "vuex";
import { mixinDevice } from '@/utils/mixin.js'
import { yd_source, marketyeji, marketkehu } from "@/core/icons";
import OverView from "./modules/overview";
import ECustomer from "./modules/customer";
export default {
  name: "service",
  components: {
    OverView,
    ECustomer,
  },
  mixins: [mixinDevice],
  data () {
    return {
      yd_source, marketkehu, marketyeji,
      dActiveKey:'1'
    };
  },
  created () {
    this.setDefaultActiveKey()
  },
  mounted() {
    showPage(this.roles().permissionList)&& (this.dActiveKey= showPage(this.roles().permissionList))
  },
  methods: {
    ...mapGetters(["roles"]),
    setDefaultActiveKey(){
      if(this.roles().permissionList.indexOf('99')!= -1){
        this.dActiveKey= '1'
        return
      }else if(this.roles().permissionList.indexOf('100')!= -1){
        this.dActiveKey= '2'
        return
      }
    },
    clickTab (index) {
      this.dActiveKey=index
      if (index == 1) {
        sethistoryPage(1,99)
        window.setTimeout(() => {
          this.$refs.basicChart.getPageDates()
        }, 1)
      } else if (index == 2) {
        sethistoryPage(2,100)
        window.setTimeout(() => {
          this.$refs.sourceChart.getPageDates()
        }, 1)
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
