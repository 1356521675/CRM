<template>
<div class="topnav">
      <router-link :class="{'active': target == '/'}" to="/" ><a-icon :component="yd_crm" />客户管理</router-link>
      <router-link v-show="this.roles().permissionList.indexOf('50')!= -1" :class="[{'active': target == '/manager'}]" to="/manager"><a-icon type="appstore" /><a-badge :count="unauditedNum().unauditedNum.total" title="讨论区未审核总数" ><span style="font-size:20px;">系统设置</span></a-badge></router-link>
</div>
</template>
<script>
import api from "@/api/index";
import { mapGetters } from "vuex";
import {yd_crm,forumplace,usinghelp} from "@/core/icons";
export default {
  data () {
    return {
      current: ['ydcrm'],
      yd_crm,forumplace,usinghelp
    }
  },
  
  props: {
    target: {
      type: String,
    },
  },
  mounted(){
   
  },
  methods: {
    ...mapGetters(["loadPath","roles","unauditedNum"]),
    getImportOut() {
      const token = this.$store.getters.token;
      window.open(api.abaseUrl + "/bbs/download-crm-manual?accessToken=" + token);
    }
  }
}
</script>
<style lang="less" scoped>
  .topnav{
    display: inline-block;
    margin-left: 20px;
    .active{
      color: #70b5f9;
    }
  }
  a{
    display: inline-block;
    margin: 0 10px;
    font-size: 20px;
    color: #999;
    text-decoration: none;
    i{
      display: inline-block;
      margin-right: 10px;
    }
  }
</style>
