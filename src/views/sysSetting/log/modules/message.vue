<template>
  <div class="center-box">
    <div
      :class="['top-fixed',{'top-fixed-add':mscrollTop>=84}]"
      :style="{ paddingLeft: mscrollTop>=84?contentPaddingLeft:0 }"
    >
      <div class="title">
        <span class="myspan"></span>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <a
              href="javascript:;"
              :class="{'selactive': logListShow && logTextShow}"
              @click="returnBack(1)"
            >全部</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="!logListShow">
            <a
              href="javascript:;"
              :class="{'selactive': !logListShow && logTextShow}"
              @click="returnBack(2)"
            >{{seldate}}</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item
            :class="{'selactive': !logListShow && !logTextShow}"
            v-if="!logTextShow"
          >{{showPath}}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <a-row
        v-if="!logListShow && logTextShow"
        style="padding:0 20px;background-color: #fff;min-height:92px;border-bottom:1px solid #eee;min-width:400px;">
        <a-col>
          <a-form
            class="ant-advanced-search-form"
            autocomplete="off"
            :form="listform"
            @submit="handleFaSearch"
            v-if="!logListShow && logTextShow"
          >
            <a-row :gutter="18">
              <a-col :xs="24" :sm="24" :lg="{span:10,offset:4}" :xl="{span:11,offset:4}">
                <a-row :gutter="4">
                  <a-col
                    :xs="8"
                    :sm="8"
                    :lg="{span:8,offset:0}"
                    :xl="{span:8,offset:0}"
                    :xxl="{span:6,offset:0}">
                    <a-form-item :colon="false">
                      <a-select
                        :getPopupContainer="triggerNode => triggerNode.parentNode"
                        v-decorator="['file_type']"
                        style="width:100%"
                        placeholder="请选择"
                      >
                        <a-select-option v-for="(item,index) in logFileType" :value="item" :key="index">{{item}}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col
                    :xs="16"
                    :sm="16"
                    :lg="{span:16,offset:0}"
                    :xl="{span:16,offset:0}"
                    :xxl="{span:18,offset:0}">
                    <a-form-item :colon="false">
                      <a-input
                        v-decorator="['content',{rules: [{ required: false,  message: '请输入搜索内容' }]}]"
                        placeholder="请输入要查询的内容"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="6" :xl="5" :xxl="4" :style="{ textAlign: 'right' }">
                <a-button type="primary" html-type="submit">搜索</a-button>
                <a-button style="margin-left:9px;margin-top:4px;" @click="handleReset">清除</a-button>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-col span="2">
          <span>
            <a-button @click="delPath" size="small" v-show="delPathList.length" :loading="listLoading">删除</a-button>
          </span>
        </a-col>
        <a-col span="12" v-show="!fileTypeSearch">
          <span>文件名</span>
        </a-col>
        <a-col span="5" v-show="!fileTypeSearch">
          <span>文件大小</span>
        </a-col>
        <a-col span="5" v-show="!fileTypeSearch">
          <span>修改时间</span>
        </a-col>
      </a-row>
    </div>
    <div class="show" v-show="visible">
      <div class="zhanwei" :style="{ height: logTextShow?'164px':'66px' }" v-if="mscrollTop>=84"></div>
      <a-spin :spinning="listLoading">
      <div class="data-list">
        <a-form
          class="ant-advanced-search-form"
          autocomplete="off"
          :form="form"
          @submit="handleSearch"
          v-if="!logTextShow"
        >
          <a-row :gutter="18">
            <a-col :xs="24" :sm="24" :lg="{span:10,offset:4}" :xl="{span:8,offset:5}">
              <a-form-item :colon="false">
                <a-input
                  v-decorator="['phone',{rules: [{ required: false,  message: '请输入搜索内容' }]}]"
                  placeholder="请输入要查询的内容"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="6" :xl="6" :xxl="4" :style="{ textAlign: 'right' }">
              <a-button type="primary" html-type="submit">搜索</a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清除</a-button>
            </a-col>
          </a-row>
        </a-form>
        <div class="fatherList" v-if="logListShow">
          <a-row>
            <a-col span="6" v-for="(item, index) in logList" :key="index">
              <a href="javascript:;" @click="logClick(item)">
                <div class="logtop">
                  <a-icon type="book" style="font-size:40px;" />
                </div>
                <div class="bottom">{{item}}</div>
              </a>
            </a-col>
          </a-row>
        </div>
        <div :class="['childList',{'width-400': !logListShow && logTextShow}]" v-else>
          <div class="logtop" v-if="!fileTypeSearch&&logTextShow">
            <a-checkbox-group @change="onChange" style="width:100%">
              <a-list itemLayout="horizontal" :dataSource="logTextList">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-row class="textlog" style="width:100%;">
                    <a-col span="2">
                      <span>
                        <a-checkbox :value="item.path"></a-checkbox>
                      </span>
                    </a-col>
                    <a-col span="12">
                      <a href="javascript:;" :class="{isClick: clickIndex== index}">
                        <span @click="logTextClick(item,index)">
                          <a-icon type="file" />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.file}}
                        </span>
                      </a>
                    </a-col>
                    <a-col span="5">
                      <span>{{item.size}}</span>
                    </a-col>
                    <a-col span="5">
                      <span>{{item.e_time}}</span>
                    </a-col>
                  </a-row>
                </a-list-item>
              </a-list>
            </a-checkbox-group>
          </div>
          <div class="bottom" v-else>
            <a-list itemLayout="horizontal" :dataSource="searchList">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta>
                  <div slot="title" class="textlog">
                    <span style="word-break:break-all;">
                      <a-icon type="file-text" />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}
                    </span>
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <div class="my-pagination" style="text-align:right;margin:10px 20px;">
              <a-pagination
                style="display:inline-block"
                :pageSizeOptions="pageSizeOptions"
                :total="total"
                showSizeChanger
                :pageSize="pageSize"
                v-model="current"
                @showSizeChange="onShowSizeChange"
                @change="pageChange"
              >
                <template slot="buildOptionText" slot-scope="props">
                  <span>{{props.value}}条/页</span>
                </template>
              </a-pagination>
            </div>
          </div>
        </div>
      </div>
      </a-spin>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import { mixin, mixinDevice } from "@/utils/mixin.js";
import {
  getLogTextDir,
  getLogTextRead,
  getLogTextSearch,
  delLogTextDel,
  getLogTextList,
  getLogTextListSearch
} from "@/api/manage";
export default {
  mixins: [mixin, mixinDevice],
  data() {
    return {
      form: this.$form.createForm(this),
      listform: this.$form.createForm(this),
      queryParam: {},
      queryFaParam: {},
      visible: true,
      relogList: {},
      logList: [],
      logTextList: [],
      logListShow: true,
      logTextShow: true,
      pageSizeOptions: ["10", "50", "100", "500", "1000"],
      current: 1,
      pageSize: 10,
      total: 0,
      searchList: [],
      seldate: "",
      path: "",
      clickIndex: -1,
      isSearch: false,
      mscrollTop: "",
      returnScroll: "",
      delPathList: [],
      listLoading: false,
      logFileType:[],
      fileTypeSearch: false
    };
  },
  computed: {
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return "0";
      }
      if (this.sidebarOpened) {
        return "277px";
      }
      return "101px";
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.getLogText();
    this.getLogFileType()
  },
  mounted() {
    let mainContainer = document.querySelector(".content-width-Fixed");
    mainContainer.onscroll = () => {
      this.mscrollTop = mainContainer.scrollTop;
    };
  },
  methods: {
    ...mapActions(["setMsgNum"]),
    onChange(checkedValues) {
      this.delPathList = checkedValues;
    },
    handleSearch(e) {
      e.preventDefault();
      this.queryParam = {};
      this.form.validateFields((error, values) => {
        if (!error) {
          if (values.phone) {
            this.listLoading = true;
            this.isSearch = true;
            this.queryParam = {
              current_page: 1,
              per_page: this.pageSize,
              path: this.path.path,
              content: values.phone
            };
            getLogTextSearch(this.queryParam).then(res => {
              if (res.code == 200) {
                this.logTextShow = false;
                this.total = res.data.total;
                this.current = Number(res.data.current_page);
                this.searchList = res.data.data;
              }
            }).finally(()=>{
              this.listLoading = false;
            });
          } else {
            this.isSearch = false;
            this.loadPage(this.path, false, true);
          }
        }
      });
    },
    handleFaSearch(e) {
      e.preventDefault();
      this.queryFaParam = {};
      this.listform.validateFields((error, values) => {
        if (!error) {
          if (values.content) {
            this.listLoading = true;
            this.fileTypeSearch = true;
            this.queryFaParam = {
              current_page: 1,
              per_page: this.pageSize,
              path: this.seldate,
              content: values.content,
              file_type: values.file_type
            };
            getLogTextListSearch(this.queryFaParam).then(res => {
              if (res.code == 200) {
                this.total = res.data.total;
                this.current = Number(res.data.current_page);
                this.searchList = res.data.data;
              }
            }).finally(()=>{
              this.listLoading = false;
            });
          } else {
            this.fileTypeSearch = false;
            this.getLogText();
          }
        }
      });
    },
    handleReset() {
      this.queryParam = {};
      this.queryFaParam= {};
      this.form.resetFields();
      this.listform.resetFields();
    },
    getLogFileType() {
      getLogTextList().then(res => {
        this.logFileType= res.data
      }).catch(err=>{
        this.logFileType = [];
      });
    },
    getLogText() {
      this.listLoading = true
      getLogTextDir().then(res => {
        this.logList = [];
        this.relogList = res.data;
        for (let akey in this.relogList) {
          if (akey != "note") {
            this.logList.push(akey);
          }
        };
        this.listLoading = false;
      }).finally(()=>{
        this.listLoading = false
      });
    },
    logClick(adate) {
      this.listLoading = true;
      this.logListShow = false;
      this.seldate = adate;
      this.logTextList = []
      getLogTextDir().then(res => {
        this.logList = [];
        this.relogList = res.data;
        for (let akey in this.relogList) {
          if (akey != "note") {
            this.logList.push(akey);
          }
        };
        this.clickIndex = -1;
        this.logTextList = this.relogList[adate]["_txt"];
        this.logTextList.sort(function(v1, v2) {
          return v1.unix <= v2.unix ? 1 : -1;
        });
      }).finally(()=>{
        this.listLoading = false
      });
      return
      this.listLoading = true;
      this.seldate = adate;
      this.clickIndex = -1;
      this.logListShow = false;
      this.logTextList = this.relogList[adate]["_txt"];
      this.logTextList.sort(function(v1, v2) {
        return v1.unix <= v2.unix ? 1 : -1;
      });
      this.listLoading = false;
    },
    logTextClick(atext, index) {
      this.searchList = [];
      this.listLoading = true;
      this.readScroll();
      this.scrollToTop();
      if (index || index == 0) {
        this.clickIndex = index;
        this.current = 1;
        this.pageSize = 10;
      }
      this.showPath = atext.file;
      this.path = atext;
      let sparms = {
        current_page: this.current,
        per_page: this.pageSize,
        path: atext.path
      };
      getLogTextRead(sparms).then(res => {
        if (res.code == 200) {
          this.logTextShow = false;
          this.total = res.data.total;
          this.current = Number(res.data.current_page);
          this.searchList = res.data.data;
        }
      }).finally(()=>{
        this.listLoading = false;
      })
    },
    loadPage(atext, status, page) {
      this.listLoading = true;
      if(this.fileTypeSearch){
        this.fileTypeSearch = true;
        this.queryFaParam.current_page= this.current
        this.queryFaParam.per_page= this.pageSize
        getLogTextListSearch(this.queryFaParam).then(res => {
          if (res.code == 200) {
            if (Number(res.data.current_page) > Number(res.data.last_page)) {
              this.queryFaParam.current_page = Number(res.data.last_page);
              getLogTextListSearch(this.queryFaParam).then(res => {
                if (res.code == 200) {
                  this.total = res.data.total;
                  this.current = Number(res.data.current_page);
                  this.searchList = res.data.data;
                }
              }).finally(()=>{
                this.listLoading = false;
              });
              return false;
            }else{
              this.total = res.data.total;
              this.current = Number(res.data.current_page);
              this.searchList = res.data.data;
            }
            if(this.queryFaParam.per_page>10){
              this.scrollToTop();
            }
          }
        }).finally(()=>{
          this.listLoading = false;
        });
      }else{
        this.showPath = atext.file;
        this.path = atext;
        let sparms = {
          current_page: page ? 1 : this.current,
          per_page: this.pageSize,
          path: atext.path
        };
        getLogTextRead(sparms).then(res => {
          if (res.code == 200) {
            if (Number(res.data.current_page) > Number(res.data.last_page)) {
              this.current = Number(res.data.last_page);
              this.loadPage(this.path);
              return false;
            }
            this.logTextShow = false;
            this.total = res.data.total;
            this.current = Number(res.data.current_page);
            this.searchList = res.data.data;
          }
        }).finally(()=>{
          if (status) {
            this.scrollToTop();
          }
          this.listLoading = false;
        });
      }
    },
    returnBack(value) {
      this.listLoading = false
      if (value == 1) {
        this.fileTypeSearch = false;
        // this.getLogText();
        this.delPathList = []
        this.logListShow = true;
        this.logTextShow = true;
        this.isSearch = false;
      } else if (value == 2) {
        this.delPathList = []
        this.isSearch = false;
        this.scrollToTop(true);
        this.logTextShow = true;
      }
    },
    onShowSizeChange(current, pageSize) {
      this.listLoading = true;
      this.pageSize = pageSize;
      if (this.isSearch) {
        this.queryParam.per_page = pageSize;
        getLogTextSearch(this.queryParam).then(res => {
          if (res.code == 200) {
            if (Number(res.data.current_page) > Number(res.data.last_page)) {
              this.queryParam.current_page = Number(res.data.last_page);
              getLogTextSearch(this.queryParam).then(res => {
                if (res.code == 200) {
                  this.logTextShow = false;
                  this.total = res.data.total;
                  this.current = Number(res.data.current_page);
                  this.searchList = res.data.data;
                }
              }).finally(()=>{
                this.scrollToTop();
                this.listLoading = false;
              });
              return false;
            }
            this.logTextShow = false;
            this.total = res.data.total;
            this.current = Number(res.data.current_page);
            this.searchList = res.data.data;
          }
        }).finally(()=>{
        this.scrollToTop();
        this.listLoading = false;
      });
      } else {
        this.loadPage(this.path, true);
      }
    },
    pageChange(page, pageSize) {
      this.listLoading = true;
      this.current = page;
      if (this.isSearch) {
        this.queryParam.current_page = page;
        getLogTextSearch(this.queryParam).then(res => {
          if (res.code == 200) {
            this.logTextShow = false;
            this.total = res.data.total;
            this.current = Number(res.data.current_page);
            this.searchList = res.data.data;
            this.scrollToTop();
          }
        }).finally(()=>{
          this.listLoading = false;
        });
      } else {
        this.loadPage(this.path, true);
      }
    },
    delPath() {
      this.listLoading = true;
      let mydel = this.delPathList.join(";");
      delLogTextDel({ path: mydel }).then(res => {
        if (res.code == 200) {
          if(res.data.msg&&res.data.msg.length){
            this.$message.warning(res.data.msg[0]);
          }else{
            this.delPathList = [];
            getLogTextDir().then(res => {
              this.logTextList = res.data[this.seldate]["_txt"];
            });
            this.$message.success('删除成功');
          }
        } else {
          this.$message.warning(res.msg);
        }
      }).finally(()=>{
        this.listLoading = false;
      });
    },
    readScroll() {
      let mainContainer = document.querySelector(".content-width-Fixed");
      this.returnScroll = mainContainer.scrollTop;
    },
    scrollToTop(value) {
      let mainContainer = document.querySelector(".content-width-Fixed");
      if (value) {
        window.setTimeout(() => {
          mainContainer.scrollTop = this.returnScroll;
        }, 10);
      } else {
        this.mscrollTop = 0;
        window.setTimeout(() => {
          mainContainer.scrollTop = 0;
        }, 10);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 0 20px;
  .data-list{
    .ant-advanced-search-form {
      padding: 30px 24px 60px;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      button {
        margin-top: 4px;
      }
      .ant-form-item {
        margin-bottom: 0;
      }
      .ant-form-item-control-wrapper {
        flex: 1;
      }
    }
  }
  .top-fixed {
    width: 100%;
    box-sizing: border-box;
    .title {
      width: 100%;
      position: relative;
      box-sizing: border-box;
      line-height: 50px;
      padding-left: 50px;
      padding-bottom: 10px;
      background-color: #fff;
      border: 0;
      span.myspan {
        position: absolute;
        top: 8px;
        left: 20px;
        height: 24px;
        width: 5px;
        background-color: #555555;
        margin: 6px;
      }
      .ant-breadcrumb {
        line-height: 50px;
      }
      .selactive {
        color: #000;
        font-weight: 700;
        &:hover {
          color: #000;
        }
      }
    }
  }
  .top-fixed-add {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 99;
    padding-right: 28px;
  }
  .data-list {
    .fatherList {
      text-align: center;
      a{
        display: inline-block;
      }
      .logtop {
        margin-top: 20px;
        margin-bottom: 8px;
        border: 0 none;
      }
      .bottom {
        width: 100%;
        margin-bottom: 20px;
      }
    }
    .textlog,
    .fatherList {
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 18px;
      a {
        color: #333;
        &:hover {
          color: #1890ff;
        }
      }
      .isClick {
        color: #7bbcf8;
      }
      .returnLog {
        float: right;
        margin-right: 20px;
        color: #555;
        cursor: pointer;
        &:hover {
          color: #66c5c5;
        }
      }
    }
    .childList{
      .ant-list-item:hover{
        background-color: #e6f7ff;
      }
    }
    .width-400{
      min-width: 400px;
    }
  }
}
</style>


