<template>
  <div class="mainbbs scroll-Fixed">
    <div class="singlePage maxWidth minHeight clearfix">
      <div :class="['discussion',{'top-fixed-add':mscrollTop>=26}]">
        <h2 @click="goback" title="点击返回上级">
          <a href="javascript:;">&lt;&lt; 返回上级</a>
        </h2>
      </div>
      <a-spin :spinning="confirmLoading">
      <div class="isinglePageContainer">
        <div class="zhanwei" :style="{ height: '40px' }" v-if="mscrollTop>=26"></div>
        <div class="commentDetail">
          <div class="testimonialsForm" v-for="(item,index) in listcontent" :key="index">
            <div class="myInfo">
              <label>
                <img src="/default-avatar.png" />{{rawData.user_info&&rawData.user_info.nick_name}}
                <span class="memberShip">
                  <span class="roleNo3">{{rawData.user_info&&rawData.user_info.department_user.department_name}}</span>
                </span>
                <span class="regTime">
                  发帖日期：
                  <br />{{item.create_time}}
                </span>
              </label>
            </div>
            <div class="myMsg clearfix">
              <div class="body">
                <p v-html="item.theme.replace(/\r?\n/g, '<br />')"></p>
                <img v-if="item.images" :src="item.images | srcFormat" />
              </div>

              <div class="submitInfo">{{item.create_time}}</div>
            </div>
          </div>
          <div class="testimonialsForm" v-for="(sitem,sindex) in storeyList" :key="sindex+'s'">
            <div class="myInfo">
              <label>{{sitem.user_info&&sitem.user_info.nick_name}}
                <span class="memberShip">
                  <span class="roleNo3">{{sitem.user_info&&sitem.user_info.department_user.department_name}}</span>
                </span>
                <span class="regTime">
                  回复日期：
                  <br />{{sitem.create_time}}
                </span>
              </label>
            </div>
            <div class="myMsg clearfix">
              <div class="body">
                <p v-html="sitem.content.replace(/\r?\n/g, '<br />')"></p>
                <img v-if="sitem.images" :src="sitem.images | srcFormat" />
              </div>
              <div class="submitInfo" style="border:0;">{{sitem.create_time}}</div>
              <div style="text-align:right;border-bottom: 1px dotted #d7d7d7;padding:4px 30px;">
                <a-button v-if="sitem.audit_status.value==3" class="btn-danger btn-trans" style="margin-right:6px;cursor:default">审核未通过</a-button>
                <a-button class="btn-inverse btn-trans" v-show="sitem.audit_status.value!=2" style="margin-right:6px;" @click="delMyFloorItem(sitem)">删除</a-button><a-button @click="replyQue(sitem)">回复</a-button>
                <div v-if="sitem.audit_status.value==3" style="text-align:right;padding-top:4px;">
                  <span>未通过原因：{{sitem.audit_reason}}</span>
                </div>
              </div>
              <div class="easeReply clearfix">
                <ul class="replyList">
                  <li v-for="(list,asindex) in sitem.commit_info" :key="asindex+'s'">
                    <div class="miniList clearfix">
                      <div class="miniFace">
                      </div>
                      <div class="miniMsg">
                        <a>
                          {{list.user_info&&list.user_info.nick_name}}
                          <span class="memberShip">
                            <span class="roleNo999">（{{list.user_info&&list.user_info.department_user.department_name}}）</span>
                          </span> :
                        </a>
                        回复 {{sitem.user_info&&sitem.user_info.nick_name}}：<span>{{list.content}}</span>
                        <div style="text-align:right" v-show="list.audit_status.value!=2">
                          <a-button v-if="list.audit_status.value==3" size="small" class="btn-danger btn-trans" style="margin-right:6px;cursor:default">审核未通过</a-button>
                          <!-- <a-button class="btn-info" size="small" style="margin-right:6px;" @click="editMyItem(item)">修改</a-button> -->
                          <a-button class="btn-inverse btn-trans" size="small" @click="delMyItem(list)">删除</a-button>
                          <div v-if="list.audit_status.value==3" style="text-align:right;padding-top:4px;">
                            <span>未通过原因：{{sitem.audit_reason}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="miniSubmitInfo">{{list.create_time}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style="padding: 16px 10px 10px;text-align:right;">
            <a-pagination style="display:inline-block" v-model="current" :total="total" @change="pageChange" height="200" />
          </div>
          <a name="reply"></a>
          <div class="testimonialsForm last">
            <a name="positionCommentForm"></a>
              <div class="myMsg">
                <ueditor-wrap ref="ueditor" :showImgFile="showImgFile" :floorbbsId="floorbbsId" :modelStatus="modelStatus" @editSuccess="saveSuccess" @success="saveSuccess"></ueditor-wrap>
              </div>
          </div>
        </div>
      </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
import api from '@/api/index';
import UeditorWrap from './modules/ueditorWrap';
import {getBbsFloor,delBbsScomment,delBbsStorey} from '@/api/common';
export default {
  data() {
    return {
      confirmLoading: false,
      listcontent:[],
      storeyList:[],
      rawData:{},
      modelStatus: 3,
      floorbbsId: undefined,
      showImgFile: true,
      current: 1,
      total: 0,
    };
  },
  props:['mscrollTop'],
  mounted() {},
  components: {
    UeditorWrap
  },
  filters: {
      srcFormat(url) {
          return api.baseUrl+url;
      }
  },
  methods: {
    pageChange(page, pageSize) {
      this.current = page;
      this.getDetailsList(this.rawData.bbs_id);
    },
    goback(){
      this.$emit('back')
    },
    readDetails(record){
      this.current = 1;
      this.modelStatus= 3;
      this.showImgFile= true;
      this.floorbbsId= record.bbs_id;
      this.rawData= record;
      this.getDetailsList(record.bbs_id)
    },
    getDetailsList(id){
      this.confirmLoading= true;
      this.showImgFile= true;
      this.listcontent=[];
      this.storeyList= [];
      let myparams= {};
      this.current&& (myparams.page= this.current);
      getBbsFloor(id,myparams).then(res=>{
        this.listcontent.push(res.data.bbs);
        this.storeyList= res.data.storey.data;
        this.total = res.data.storey.total;
        this.current = Number(res.data.storey.current_page);
        this.confirmLoading= false;
      }).catch(err=>{
        this.confirmLoading= false;
      })
    },
    saveSuccess(){
      this.readDetails(this.rawData)
    },
    replyQue(record){
      this.modelStatus= 4;
      this.showImgFile= false;
      this.$refs.ueditor.replyQueEdit(record);
      let sheight= document.querySelector(".isinglePageContainer");
      this.$emit("scrollToTop",sheight.clientHeight)
    },
    delMyItem(record){
      delBbsScomment(record.comment_id).then(res=>{
        if(res.code==200){
          this.$message.success('删除成功');
          getBbsFloor(this.rawData.bbs_id).then(res=>{
            this.listcontent=[];
            this.storeyList= [];
            this.listcontent.push(res.data.bbs);
            this.storeyList= res.data.storey.data;
          }).catch(err=>{
  
          })
        }else{
          this.$message.warning(res.msg);
        }
      }).catch(err=>{
        this.confirmLoading= false;
      })
    },
    delMyFloorItem(record){
      delBbsStorey(record.storey_id).then(res=>{
        if(res.code==200){
          this.$message.success('删除成功');
          getBbsFloor(this.rawData.bbs_id).then(res=>{
            this.listcontent=[];
            this.storeyList= [];
            this.listcontent.push(res.data.bbs);
            this.storeyList= res.data.storey.data;
          }).catch(err=>{
  
          })
        }else{
          this.$message.warning(res.msg);
        }
      }).catch(err=>{
        this.confirmLoading= false;
      })
    },
  }
};
</script>
<style scoped>
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
.singlePage{
  max-width: 1200px;
  margin: 0 auto;
}
.clearfix:after {
    clear: both;
}

.clearfix:before, .clearfix:after {
    content: '';
    display: table;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.singlePage h2 {
    font-size: 22px;
    font-weight: 500;
    margin: 0px 0 10px;
    color: #2c3239;
}

.discussion {
    line-height: 40px !important;
    padding-bottom: 0px !important;
    font-size: 24px !important;
    font-weight: 500;
    height: 40px;
}
.discussion h2{
  width: 100%;
}
.myInfo{
  float: left;
  width: 130px;
  text-align: center;
}

.myInfo a {
  display: block;
  color: #d60608;
  text-decoration: none;
}
.roleNo999 {
    color: #2980b9 !important;
}
.regTime{
  display: block;
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
.myInfo img{
  max-width: 80px;
  max-height: 80px;
  display: block;
  margin: 10px auto;
}
.memberShip{
  display: inline-block;
  width: 100%;
  padding: 6px 0 4px;
}
.miniMsg .memberShip{
  display: inline;
}
.commentDetail .testimonialsForm{
  border-top: 1px solid #e1e4e6;
  border-left: 1px solid #e1e4e6;
  border-right: 1px solid #e1e4e6;
  width: 100%;
  background: #fbfbfd;
}

.commentDetail .testimonialsForm.last{
  border-bottom:  1px solid #e1e4e6;
}

.testimonialsForm p{
  margin: 10px 0 0 0;
  text-indent: 0;
  line-height: 26px;
}

.commentDetail .myInfo{
  text-align: center;
  padding-top: 10px;
}

.commentDetail .myMsg{
  background: #fff;
  padding: 20px;
  margin-left: 130px;
  float: none;
  width: auto;
}

.commentDetail .myMsg .body{
  min-height: 100px;
}

.commentDetail .myMsg .body img{
  max-width: 100%;
}

.commentDetail .easeForm {
  float: right;
  display: none;
}

.commentDetail .easeForm textarea{
  height: 30px;
}

.commentDetail .regTime{
  font-weight: lighter;
  font-size: 12px;
  line-height: 140%;
}

.submitInfo{
  color: #999;
  font-size: 12px;
  font-weight: lighter;
  text-align: right;
  padding-right: 30px;
  border-bottom: 1px dotted #d7d7d7;
  background: #fff;
}



.commentDetail .fastReply{
  cursor: pointer;
}

.commentDetail .easeReply{
  background: #fbfbfd;
  padding: 10px 20px;
}
.commentDetail .replyList img{
  max-width: 30px;
  max-height: 30px;
}
.commentDetail .replyList li{
  border-bottom: 1px #d7d7d7 dotted;
  padding:10px;
}

.commentDetail .miniList{
  position: relative;
}

.commentDetail .miniList .miniFace{
  float: left;
  width: 50px;
}

.commentDetail .miniList .miniMsg{
  margin-left: 50px;
}

.commentDetail .miniSubmitInfo{
  float: right;
  color: #999;
  font-size: 12px;
}


.myMsg{
  float: left;
  margin-left: 20px;
  width: 410px;
}

.myMsg textarea{
  width: 100%;
  min-height: 96px;
}

.myMsg input{
  font-weight: lighter;
}
</style>


