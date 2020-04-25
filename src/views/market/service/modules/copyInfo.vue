<template>
  <div class="mainbox">
    <a-popover trigger="hover" >
      <template slot="content">
        <div :id="myId" style="min-width:110px">
          <div>部门：{{persolInfo.department}}</div>
          <div>姓名：{{persolInfo.name}}</div>
          <div>Q&nbsp;Q：{{persolInfo.firm_qq?persolInfo.firm_qq:'暂无' }}</div>
        </div>
        <div style="margin: 2px 4px;text-align:right">
         <a-button size="small"
                    v-if="!copySuccess"
                    :data-clipboard-target="'#'+myId"
                    class="btn-info copyBtn"
                    @click="copy">点击复制</a-button>
          <a-button size="small"
                    v-else
                    class="btn-success copyBtn">复制成功</a-button>
        </div>
      </template>
      <span @mouseenter="nameHover(user1)"
            v-if="user1.user">{{user1.user.nick_name}}</span>
      <span @mouseenter="nameHover(user2)"
            v-else>{{user2.user.nick_name}}</span>
    </a-popover>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { getServiceUserInfo } from "@/api/common"
export default {
  name: "service",
  components: {

  },
  props:['user1', 'user2', 'num', 'name'],
  data () {
    return {
      persolInfo: {},
      myId: '',
      copySuccess: false,
      getSuccess: false,
      user_id:'',
    }
  },
  created () {
    this.myId= this.name+'_'+this.num
     if(this.user1){
      this.user_id= this.user1.user.user_id
    }else{
      this.user_id= this.user2.user.user_id
    }
  },
  methods: {
    copy () {
      let clipboard = new Clipboard(".copyBtn"); //注意要使用let或者const，不能使用var，否则会出现复制次数叠加的问题，即复制不止一次。
      //因为var是全局变量，let和const是局部
      clipboard.on("success", e => {
         this.copySuccess= true
        let closeTime= window.setTimeout(()=>{
          this.copySuccess= false
          window.clearTimeout(closeTime)
        },2000)
        // this.$message.success("复制成功");
        clipboard.destroy(); //使用destroy可以清楚缓存
      });
      clipboard.on("error", e => {
        // this.$message.info("复制失败");
        clipboard.destroy();
      });
    },
    nameHover (user) {
      if(this.user_id != user.user.user_id){
        this.getSuccess= false
        this.user_id= user.user.user_id
      }
      if (!this.getSuccess) {
        this.persolInfo = {}
        getServiceUserInfo(user.user.user_id).then(res => {
          this.getSuccess = true
          this.persolInfo = res.data
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
