<template>
  <div class="mainbox">
    <div :class="['tab-content', {'phstyle': isMobile()}]">
      <a-tabs :activeKey="activeKey" :animated="false" @change="clickTab">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon :component="marketnew"/>
            新建客户
          </span>
          <server-new ref="serverNew" :swtList="swtList"/>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon :component="marketfenpei"/>
            新建并分配
          </span>
          <new-allocation ref="newAllocation" :swtList="swtList" :systemList="systemList"/>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon :component="marketdaoru" />
            客户导入
          </span>
          <export-box ref="exportBox"  />
        </a-tab-pane> 
        <a-tab-pane key="4">
          <span slot="tab">
            <a-icon :component="liuyan" />
            留言抓取
          </span>
          <message-board ref="messageBoard" />
        </a-tab-pane>
        <a-tab-pane key="5">
          <span slot="tab">
            <a-icon :component="liuyan" />
            线索抓取
          </span>
          <tcmessage-board ref="tcmessageBoard" />
        </a-tab-pane>
        <a-tab-pane key="6">
          <span slot="tab">
            <a-icon :component="marketyijian" />
            一键推送
          </span>
          <one-clickPush ref="oneClickPush" :systemList="systemList"/>
        </a-tab-pane>
        <a-tab-pane key="7">
          <span slot="tab">
            <a-icon :component="marketyijian" />
            一键分配
          </span>
          <un-assigned ref="unAssigned" :systemList="systemList"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { showPage, sethistoryPage} from '@/utils/historyPage'
import { mixinDevice } from '@/utils/mixin.js'
import {yd_source,yd_depament,marketnew,marketfenpei,marketyijian,marketdaoru,liuyan,weifenpei} from "@/core/icons";
import serverNew from "./modules/new";
import newAllocation from "./modules/newAllocation";
import unAssigned from "./modules/unAssigned";
import exportBox from "./modules/export";  
import messageBoard from "./modules/messageBoard";
import tcmessageBoard from "./modules/imessageBoard";
import oneClickPush from "./modules/oneClickPush";
export default {
  name: "service",
  components: {
    serverNew,
    newAllocation,
    unAssigned,
    exportBox,
    messageBoard,
    tcmessageBoard,
    oneClickPush
  },
  mixins: [mixinDevice],
  data() {
    return {
      activeKey: '1',
      yd_source,
      marketnew,marketfenpei,marketyijian,marketdaoru,liuyan,weifenpei,
      systemList:[],
      swtList:[
        {
          name:'商务通1',
          id: 1
        },
        {
          name:'商务通2',
          id: 2
        },
        {
          name:'商务通3',
          id: 3
        },
      ]
    };
  },
  mounted(){
    this.systemList= this.$store.getters.systemList;
    showPage()&& (this.activeKey= showPage());
  },
  methods: {
    clickTab(index) {
      this.activeKey= index
      if(index==1){
        sethistoryPage(1,0)
        this.$refs.serverNew&&this.$refs.serverNew.getUnassignedNum(0)
      }else if(index==2){
        sethistoryPage(2,0)
        this.$refs.newAllocation&&this.$refs.newAllocation.refreshData()
      }else if(index==3){
        sethistoryPage(3,0)
        this.$refs.unAssigned&&this.$refs.unAssigned.refreshData()
      }else if(index==4){
        sethistoryPage(4,0)
      }else if(index==5){
        sethistoryPage(5,0)
      }else if(index==6){
        sethistoryPage(6,0)
      }else if(index==7){
        sethistoryPage(7,0)
      }
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
