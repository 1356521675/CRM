<template>
  <div class="mainbbs" style="padding-top:90px;">
    <div class="singlePage clearfix" v-if="showList">
      <h2 :class="['discussion',{'top-fixed-add':mscrollTop>=26}]">
        <i></i>讨论区
        <div class="bbshead-nav">
         <div class="seaerchbbs">
          <a-form autocomplete="off"
            :form="listform"
            @submit="handleFaSearch">
              <a-input v-model="theme" placeholder="请输入搜索内容" /><a-button class="btn-info" @click="getBbsForumTopicList(true)">搜素</a-button>
          </a-form>
         </div>
        </div>
        <!-- <div class="bbshead-nav"><a :class="{'active': activeNum==1}" @click="changeNav(1)" href="javascript:;">我的帖子</a>
        |<a :class="{'active': activeNum==2}" @click="changeNav(2)" href="javascript:;">全部帖子</a>
        </div> -->
      </h2>
      <a-spin :spinning="confirmLoading">
        <div class="singlePageContainer clearfix">
          <div class="zhanwei" :style="{ height: '40px' }" v-if="mscrollTop>=26"></div>
          <div class="testimonialsList clearfix">
            <div id>
              <ul id="thread_list" class="threadlist_bright j_threadlist_bright">
                <li class="j_thread_list clearfix" v-for="(item,index) in listcontent" :key="index">
                  <div class="t_con cleafix">
                    <div class="col2_left j_threadlist_li_left">
                      <span class="threadlist_rep_num center_text" title="回复">{{item.storey_num}}</span>
                    </div>
                    <div class="col2_right j_threadlist_li_right clearfix">
                      <div class="threadlist_lz clearfix">
                        <div class="threadlist_title pull_left j_th_tit">
                          <a href="javascript:;" @click="showDetail(item)" class="j_th_tit">
                            <span class="btn-zhiding" v-if="item.is_top&&item.is_top.value==1">置顶</span><span  v-html="item.theme" :class="['myredcolor',{'activecolor': item.bbs_id==activeColorNum},{'istopcolor':item.is_top&&item.is_top.value==1}]"></span>
                          </a>
                        </div>
                        <div class="threadlist_author pull_right">
                          <span class="tb_icon_author">
                            <i class="icon_author"></i>
                            <a class="frs-author-name j_user_card">
                              {{item.user_info&&item.user_info.nick_name}}（
                              <span class="roleNo999">{{item.user_info&&item.user_info.department_user.department_name}}</span>）
                            </a>
                            <span class="icon_wrap icon_wrap_theme1 frs_bright_icons"></span>
                          </span>
                          <span
                            class="threadlist_reply_date pull_right j_reply_data"
                            title="发表时间"
                          >{{item.create_time}}</span>
                        </div>
                      </div>
                      <div class="threadlist_detail clearfix">
                        <div class="threadlist_text pull_left" v-if="item.images">
                          <div
                            class="small_wrap j_small_wrap"
                          >
                            <div class="small_list j_small_list cleafix">
                              <div class="small_list_gallery">
                                <ul class="threadlist_media j_threadlist_media clearfix">
                                  <li>
                                    <a class="thumbnail vpic_wrap"  @click="showDetail(item)">
                                      <img
                                        :src="item.images | srcFormat"
                                        class="threadlist_pic j_m_pic"
                                      />
                                    </a>
                                    <div class="threadlist_pic_highlight j_m_pic_light"></div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="threadlist_author pull_right">
                          <!-- <span class="tb_icon_author_rely j_replyer" title="最后回复人: WJ">
                            <i class="icon_replyer"></i>
                            <a class="frs-author-name j_user_card">WJ</a>
                          </span> -->
                          <span
                            class="threadlist_reply_date pull_right j_reply_data"
                            title="阅读量"
                          ><img class="eyepic" src="../../assets/images/seemsg.png" />{{item.read_num}}</span>
                        </div>
                        <div v-show="!item.images&&myListStatus && item.audit_status.value!=2" style="height:50px;" ></div>
                        <div style="position:absolute;right:0;bottom:0;" v-show="myListStatus && item.audit_status.value!=2">
                          <a-button v-if="item.audit_status.value==3" class="btn-danger btn-trans" size="small" style="margin-right:6px;cursor:default">审核未通过</a-button>
                          <a-button v-if="item.audit_status.value==1" class="btn-info" size="small" style="margin-right:6px;" @click="editMyItem(item)">修改</a-button>
                          <a-button class="btn-trans" size="small" @click="delMyItem(item)">删除</a-button>
                        </div>
                      </div>
                      <div v-if="myListStatus && item.audit_status.value==3" style="text-align:right;padding-top:4px;">
                        <span>未通过原因：{{item.audit_reason}}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-show="!listcontent" style="line-height:40px;text-align:center;">
                暂无数据
              </div>
              <div style="padding: 10px 0;text-align:right;">
                <a-pagination style="display:inline-block" v-model="current" :total="total" @change="pageChange" height="200" />
              </div>
            </div>
          </div>
          <div class="testimonialsForm last">
            <a name="positionCommentForm"></a>
            <h2 class="discussionPost">
              <i></i>发表新帖
            </h2>
              <div class="myMsg">
                  <ueditor-wrap ref="ueditor" :formName="'bbs'" :modelStatus="modelStatus" @editSuccess="editSuccess" @success="getBbsForumTopicList"></ueditor-wrap>
              </div>
          </div>
        </div>
      </a-spin>
    </div>
    <bbs-details :mscrollTop="mscrollTop" @scrollToTop="scrollToTop"  @back="showbbsList" ref="BbsDetails" v-show="!showList" />
    <div class="tbui_aside_float_bar" v-show="showList">
      <ul>
        <li class="tbui_aside_fbar_button tbui_fbar_post"><a href="javascript:;" @click="scrollBottom"></a></li>
        <li class="tbui_aside_fbar_button tbui_fbar_refresh"><a href="javascript:;" @click="getBbsForumTopicList"></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api/index';
import {getBbsForumTopicList,getBbsFloor,getBbs,delBbs,getBbsEdit} from '@/api/common';
import UeditorWrap from './modules/ueditorWrap';
import BbsDetails from "./details";
export default {
  data() {
    return {
      listform:this.$form.createForm(this),
      queryParam:{},
      theme: undefined,
      mscrollTop:0,
      showList: true,
      listcontent: null,
      activeNum:1,
      confirmLoading: false,
      myListStatus: true,
      modelStatus: 1,
      current: 1,
      total: 0,
      returnScroll:0,
      activeColorNum: undefined
    };
  },
  components: {
    BbsDetails,
    UeditorWrap
  },
  created() {
    this.getBbsForumTopicList()
  },
  mounted() {
    this.startScroll()
  },
  filters: {
      srcFormat(url) {
          return api.baseUrl+url;
      }
  },
  methods: {
    handleFaSearch(e) {
      this.activeColorNum= undefined;
      e.preventDefault();
      this.getBbsForumTopicList(true)
    },
    pageChange(page, pageSize) {
      this.activeColorNum= undefined;
      this.current = page;
      this.getBbsForumTopicList();
    },
    changeNav(num){
      if(this.activeNum!=num){
        this.$refs.ueditor.cancelEdit()
        this.activeNum= num;
        this.activeNum== 1? this.getBbsForumTopicList() : this.getBbsAllList();
        this.myListStatus= this.activeNum== 1? true : false;
      }
    },
    showDetail(record) {
      this.showList = false;
      this.activeColorNum= record.bbs_id;
      let remainContainer = document.querySelector(".ant-layout");
      this.returnScroll = remainContainer.scrollTop;
      this.$refs.BbsDetails&&this.$refs.BbsDetails.readDetails(record)
    },
    showbbsList() {
      this.scrollToTop(this.returnScroll);
      this.showList = true;
    },
    getBbsForumTopicList(status){
      status&& (this.current=1);
      this.confirmLoading= true;
      let myparms= {};
      this.theme&& (myparms.theme= this.theme);
      this.current&& (myparms.page= this.current);
      getBbsForumTopicList(myparms).then(res=>{
        this.scrollToTop();
        this.total = res.data.total;
        this.current = Number(res.data.current_page);
        this.listcontent= res.data.data;
        this.confirmLoading= false;
      }).catch(err=>{
        this.confirmLoading= false;
      })
    },
    getBbsAllList(){
      this.confirmLoading= true;
      getBbs().then(res=>{
        this.listcontent= res.data;
        this.confirmLoading= false;
      }).catch(err=>{
        this.confirmLoading= false;
      })
    },
    editMyItem(record){
      this.scrollToTop(180,true)
      this.modelStatus= 2;
      let remainContainers = document.querySelector(".ant-layout");
      this.returnScroll = remainContainers.scrollTop;
      getBbsEdit(record.bbs_id).then(res=>{
        if(res.code==200){
          this.$refs.ueditor.edit(res.data)
        }else{
          this.$message.warning(res.msg)
        }
      }).catch(err=>{

      })
    },
    delMyItem(record){
      delBbs(record.bbs_id).then(res=>{
        this.getBbsForumTopicList();
      }).catch(err=>{
        this.confirmLoading= false;
      })
    },
    editSuccess(value){
      this.modelStatus= 1;
      this.scrollToTop(this.returnScroll);
      value && this.getBbsForumTopicList()
    },
    startScroll(){
      let mainContainer = document.querySelector(".ant-layout");
      mainContainer.onscroll = () => {
        this.mscrollTop = mainContainer.scrollTop;
      };
    },
    scrollBottom(){
      this.scrollToTop(180,true)
    },
    scrollToTop(value,status) {
      let smainContainer = document.querySelector(".ant-layout");
      let sheight= document.querySelector(".singlePageContainer");
      if(status){
        window.setTimeout(() => {
            smainContainer.scrollTop = sheight.clientHeight;
          }, 10);
      }else{
        if (value) {
          window.setTimeout(() => {
            smainContainer.scrollTop = value;
          }, 10);
        } else {
          this.mscrollTop = 0;
          window.setTimeout(() => {
            smainContainer.scrollTop = 0;
          }, 10);
        }
      }
    }
  }
};
</script>

<style scoped>
.tbui_aside_float_bar{
  position: fixed;
    left: 50%;
    bottom: 200px;
    margin-left: 620px;
    z-index: 1005;
}
.tbui_aside_float_bar li a {
    display: inline-block;
    width: 45px;
    height: 45px;
} 
.tbui_aside_float_bar .tbui_fbar_post a {
    background: url('../../assets/images/icon_fbar_post.png');
}
.tbui_aside_float_bar .tbui_fbar_post a:hover {
    background: url('../../assets/images/icon_fbar_post_hover.png');
}
.tbui_aside_float_bar .tbui_fbar_refresh a {
    background: url('../../assets/images/icon_fbar_refresh.png');
}
.tbui_aside_float_bar .tbui_fbar_refresh a:hover {
    background: url('../../assets/images/icon_fbar_refresh_hover.png');
}
.myredcolor >>> em{
  color: red;
  font-style: normal;
}
.activecolor{
  color: #7ba7e6;
}
.istopcolor{
  color: #2d64b3;
}
.btn-zhiding{
  display: inline-block;
  margin-right: 6px;
  padding: 0 4px;
  background-color: #66a3ff;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
}
.top-fixed-add {
  position: fixed;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  top: 60px;
  z-index: 99;
  background: rgba(255,255,255,.7);
  border-bottom: 1px dashed #ccc;
}
.mainbbs {
  padding-bottom: 80px;
}
.bbshead-nav{
  float: right;
  margin-top: 8px;
}
.bbshead-nav .active{
  color: #1f8dd6;
}
.bbshead-nav .seaerchbbs{
  position: relative;
  padding-right: 72px;
  width: 400px;
}
.bbshead-nav .seaerchbbs .btn-info{
  position: absolute;
  right: 0;
  top: 0;
}
.singlePage {
  max-width: 1200px;
  margin: 0 auto;
}

.clearfix:after {
  clear: both;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.discussion {
  line-height: 46px !important;
  padding-bottom: 0px !important;
  font-size: 24px !important;
  font-weight: 500;
  height: 46px;
}

.discussion a {
  color: #2c3239;
  text-decoration: none;
}

.discussion i {
  background: url("../../assets/images/prag-discuss.png") no-repeat;
  background-size: contain;
  float: left;
  width: 50px;
  height: 40px;
  margin: 0 5px 0 5px;
}

.discussionPost {
  line-height: 40px !important;
  padding-bottom: 0px !important;
  font-size: 24px !important;
  font-weight: 500;
  height: 40px;
  margin-bottom: 10px;
}

.discussionPost i {
  background: url("../../assets/images/discuss.png") no-repeat;
  background-size: contain;
  float: left;
  width: 50px;
  height: 40px;
  margin: 0 5px 0 5px;
}

.disabledBtn {
  cursor: not-allowed;
  border-color: #ccc;
  background-color: #ccc;
  color: #999;
  text-shadow: none;
}

#thread_list {
  margin: 20px 0 20px 0;
}
#thread_list li:hover {
  background-color: #f7f9fc;
}
.testimonialsList {
  float: none;
  width: auto;
  margin-right: 0;
  margin-bottom: 40px;
  background-color: #fff;
  padding: 0 20px 20px;
}

.testimonialsForm {
  margin-right: 20px;
}

.testimonialsForm label {
  display: block;
  font-size: 14px;
  line-height: 200%;
  margin-bottom: 20px;
}

.testimonialsForm label span {
  display: block;
}

.testimonialsForm input[type="text"],
.testimonialsForm textarea {
  color: #1f8dd6;
  border: 1px solid #ccc;
  background: #f6f6f6;
  font-weight: bold;
  padding: 0.3em 0.4em 0.3em 0.4em;
  border-radius: 4px;
  width: 100%;
  min-height: 120px;
  font-size: 14px;
}
.threadlist_bright .t_con {
  padding: 10px;
  border-bottom: 1px dotted #e4e6eb;
}
.btn {
  font-size: 16px;
  cursor: pointer;
  padding: 10px 18px;
  border-width: 1px 2px 4px 1px;
  border-style: solid;
  border-color: #000;
  border-radius: 6px;
  color: #fff;
  display: inline-block;
  margin: 0px 10px 0px 0;
  text-decoration: none;
  background-color: #1e2227;
  text-shadow: 0.0625rem 0.0625rem 0 #1e2227;
}
.t_con .col2_left,
.t_con .col2-left {
  width: 70px;
  float: left;
  min-height: 1px;
}
.col2_right,
.col2-right {
  position: relative;
  min-height: 1px;
}

.threadlist_rep_num {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 26px;
  margin-right: 20px;
  text-align: center;
  background: url("../../assets/images/f_reply_bg_89030dc.png") no-repeat;
  font-size: 12px;
}

.threadlist_bright .threadlist_lz {
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.threadlist_title {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.threadlist_text,
.threadlist_title {
  width: 460px;
}

.pull_left,
.pull-left {
  float: left !important;
}

.threadlist_author {
  width: 300px;
  height: 20px;
  color: #999;
  overflow: hidden;
}

.pull_right,
.pull-right {
  float: right !important;
}

.threadlist_bright .threadlist_lz .tb_icon_author {
  width: 135px;
}
.threadlist_bright .icon_author {
  background-repeat: no-repeat;
}

.threadlist_bright .icon_author,
.threadlist_bright .icon_replyer,
.threadlist_bright .icon_turnleft,
.threadlist_bright .icon_turnright,
.threadlist_bright .icon_ypic,
.threadlist_bright .icon_retract,
.threadlist_bright .icon_pop,
.threadlist_bright .icon_fav {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.threadlist_bright .icon_fav,
.threadlist_bright .icon_pop,
.threadlist_bright .icon_retract,
.threadlist_bright .icon_ypic,
.threadlist_bright .icon_turnright,
.threadlist_bright .icon_turnleft,
.threadlist_bright .icon_replyer,
.threadlist_bright .icon_author,
.game_thread_detail_wrapper .upward,
.game_thread_detail_wrapper .downward {
  background-image: url("../../assets/images/interview_z_eca48fe.png");
}

.threadlist_bright .threadlist_author a {
  color: #999;
  text-decoration: none;
}

.threadlist_bright .threadlist_detail {
  padding-top: 3px;
  position: relative;
}
.threadlist_bright .threadlist_detail .threadlist_pic{
  min-height: 50px;
}
.threadlist_bright .threadlist_detail .eyepic{
  width: 16px;
  margin-right: 8px;
  vertical-align: sub;
}
.threadlist_text,
.threadlist_title {
  width: 60%;
}

.threadlist_text,
.threadlist_title a {
  color: #2c3239;
}

.threadlist_bright .threadlist_abs_onlyline,
.threadlist_bright .threadlist_abs {
  width: 460px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.threadlist_bright .small_wrap {
  position: relative;
  margin-top: 6px;
}

.threadlist_bright .small_btn_pre,
.threadlist_bright .small_btn_next {
  position: absolute;
  top: 50%;
  margin-top: -17px;
  width: 16px;
  height: 34px;
  overflow: hidden;
  background: url("../../assets/images/small_pic_btns_bd06888.png") no-repeat;
}

.threadlist_bright .small_btn_pre {
  background-position: 0 -48px;
  left: -31px;
}

.threadlist_bright .small_list {
  position: relative;
  width: 460px;
  overflow: hidden;
}

.threadlist_bright .icon_author {
  background-position: -30px -60px;
}

.threadlist_bright .icon_replyer {
  background-position: 0px -60px;
}

.threadlist_pic {
  max-width: 80px;
  max-height: 80px;
}
.roleNo999 {
  color: #2980b9 !important;
}
.topPost {
  background: #f9f9f9;
}
.myMsg {
  float: left;
  margin-left: 20px;
  width: 100%;
}
@media screen and (max-width: 1400px) {
    .tbui_aside_float_bar{
      left: auto;
      right: 16px;
    }
}

</style>
