<template>
  <div class="topTipBox">
    <a-popover v-model="visible"
               trigger="click"
               placement="bottomLeft"
               :autoAdjustOverflow="true"
               :arrowPointAtCenter="true"
               overlayClassName="header-notice-wrapper"
               :overlayStyle="{ width: '300px', top: '50px' }">
      <template slot="content">
        <a-spin :spinning="loadding">
          <a-tabs>
            <a-tab-pane tab="通知"
                        key="1">
              <a-list style="max-height:284px;overflow-y: scroll;">
                <div class="ant-list-item"
                     v-for="(item,index) in msgData"
                     :key="index">
                  <div class="ant-list-item-meta">
                    <div class="ant-list-item-meta-avatar"><span class="ant-avatar ant-avatar-circle ant-avatar-image"
                            style="background-color: white;"><img src="../../assets/images/userInfomessage.png"></span></div>
                    <div class="ant-list-item-meta-content">
                      <h4 class="ant-list-item-meta-title">
                        <router-link to="/userCenter/message"><span @click="toMessage">{{item.content}}</span></router-link>
                      </h4>
                      <div class="ant-list-item-meta-description">{{item.create_time}}</div>
                    </div>
                    <a v-if="item.status.value==0"
                       @click="getMsgread(item,index)"
                       title="标为已读"
                       size="small"><img style="width:20px"
                           src="../../assets/images/seemsg.png"></a>
                    <a v-else
                       @click="msgDelete(item,index)"
                       title="删除"
                       size="small"><img style="width:20px"
                           src="../../assets/images/delmsg.png"></a>
                  </div>
                </div>
              </a-list>
              <div class="bottombtn"
                   v-show="this.msgData">
                <a-button class="btn-custom"
                          @click="getMsgreadAll()"
                          size="small">全部已读</a-button>
                <a-button class="btn-econdary btn-trans"
                          @click="msgDeleteAll()"
                          size="small">清除全部</a-button>
              </div>
            </a-tab-pane>
            <!-- <a-tab-pane tab="消息" key="2">
            123
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            123
          </a-tab-pane> -->
          </a-tabs>
        </a-spin>
      </template>
      <span @click="fetchNotice"
            @mouseenter="stopAnimate(false)"
            @mouseleave="stopAnimate(true)"
            :class="{'hasMsg':msgNum()>0 && isAnimate && !visible}"
            class="header-notice">
        <a-badge :count="msgNum()">
          <a-icon style="font-size: 16px; padding: 4px"
                  type="bell" />
        </a-badge>
      </span>
    </a-popover>
  </div>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapGetters } from "vuex";
import { getMsgNewsNum, getMsgIndex, getMsgSetread, getMsgDelete, getBbsUnauditedNum } from '@/api/common'
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false,
      visible: false,
      mycount: 0,
      msgData: '',
      setTimer: null,
      isAnimate: true,
      websock: null,
    }
  },
  created () {
    //页面刚进入时开启长连接
    // this.initWebSocket()
  },
  destroyed: function () {
    //页面销毁时关闭长连接
    // this.websocketclose();
  },
  mounted () {
    // 开启定时器获取消息
    this.getMsgNewsNum()
  },
  methods: {
    ...mapActions(["setMsgNum","setUnauditedNum"]),
    ...mapGetters(["msgNum"]),
    getBbsUnauditedNum(){
      getBbsUnauditedNum().then(res=>{
        if(res.code==200){
          this.setUnauditedNum(res.data)
        }
      }).catch(err=>{

      })
    },
    toMessage () {
      this.visible = false
    },
    stopAnimate (action) {
      this.isAnimate = action
    },
    getMsgNewsNum () {
      // // 获取评论区未审核数
      // this.getBbsUnauditedNum();
      getMsgNewsNum().then(res => {
        window.clearTimeout(this.setTimer)
        if (res.code == 200) {
          this.setMsgNum(res.data.count)
          // this.mycount = res.data.count
          if (res.data.count) {
            this.suportNotify()
          }
        }
        this.setTimer = window.setTimeout(() => {
          this.getMsgNewsNum()
        }, 60000)
      }).catch(err => {
        window.clearTimeout(this.setTimer)
        this.setTimer = window.setTimeout(() => {
          this.getMsgNewsNum()
        }, 60000)
      })
    },
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        getMsgIndex({ status: '0' }).then(res => {
          this.msgData = res.data.data
          this.loadding = false
        }).catch(err => {
          this.loadding = false
        })
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    },
    getMsgread (msgdata, index) {
      getMsgSetread({ id: msgdata.id }).then(res => {
        if (res.code == 200) {
          this.msgData[index].status.value = 1
          this.getMsgNewsNum()
        }
      })
    },
    msgDelete (msgdata, index) {
      let putParameter = {
        ids: msgdata.id + ''
      }
      getMsgDelete('0', putParameter).then(res => {
        if (res.code == 200) {
          this.msgData.splice(index, 1)
          this.getMsgNewsNum()
        }
      })
    },
    getMsgreadAll () {
      getMsgSetread({ type: 'all' }).then(res => {
        if (res.code == 200) {
          this.msgData.forEach((item) => {
            item.status.value = 1
          })
          this.getMsgNewsNum()
        }
      })
    },
    msgDeleteAll () {
      let sCusArr = []
      this.msgData.forEach(item => {
        sCusArr.push(item.id)
      })
      let putParameter = {
        ids: sCusArr.join(',')
      }
      getMsgDelete('1', putParameter).then(res => {
        if (res.code == 200) {
          this.msgData = []
          this.getMsgNewsNum()
        }
      })
    },
    initWebSocket () { //初始化weosocket 
      const wsuri = api.basePart + "/message/get-news";//ws地址
      this.websock = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen () {
      
    },
    websocketonerror (e) { //错误
      
    },
    websocketonmessage (e) { //数据接收 
      const redata = JSON.parse(e.data);
      //注意：长连接我们是后台直接1秒推送一条数据， 
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      
    },

    websocketsend (agentData) {//数据发送 
      this.websock.send(agentData);
    },

    websocketclose (e) { //关闭 
      
    },


    /******新消息弹出提示******/
    suportNotify () {
      if (window.Notification) {
        // 支持
        //如果支持Web Notifications API，再判断浏览器是否支持弹出实例
        this.showMess()
      } else {
        // 不支持
        window.alert('您有新的消息，请注意查收！')
      }
    },
    showMess () {
      if (window.Notification && Notification.permission !== "denied") {
        //Notification.requestPermission这是一个静态方法，作用就是让浏览器出现是否允许通知的提示
        Notification.requestPermission(function (status) {
          //如果状态是同意
          if (status === "granted") {
            var m = new Notification('收到信息', {
              body: '您有新的消息，请注意查收！',　　//消息体内容
              //icon: ""　　//消息图片
            });
            m.onclick = function () {//点击当前消息提示框后，跳转到当前页面
              window.focus();
            }
          } else {
            window.alert('您有新的消息，请注意查收！')
          }
        });
      }else{
        window.alert('您有新的消息，请注意查收！')
      }
    }
  }
}
</script>


<style lang="less" scoped>
.topTipBox {
  position: relative;
}
.header-notice-wrapper {
  top: 50px !important;
}
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
.bottombtn {
  height: 30px;
  .btn-custom {
    width: 48%;
    margin-right: 4%;
  }
  .btn-econdary {
    width: 48%;
  }
}

.layout.ant-layout .header .user-wrapper .hasMsg {
  animation: fadein 1s linear infinite;
  -webkit-animation: fadein 1s linear infinite;
}

@keyframes fadein {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
