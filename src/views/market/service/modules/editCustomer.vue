<template>
  <div class="center-box">
    <h4 class="title">客户修改</h4>
    <a-spin :spinning="loadingStatus">
      <a-form class="add-form" :form="form" autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :lg="{span:13,offset:0}">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="QQ号码" :colon="false">
                  <a-input
                    v-decorator="[
                  'con_qq',
                  {rules: [{ required: false, min:3, message: '请输入QQ号码' },{ validator: this.existqq }],validateTrigger: 'blur'}
                ]"
                    placeholder="QQ号码"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="QQ答案" :colon="false">
                  <a-input
                    v-decorator="[
                  'qq_answer',
                  {rules: [{ required: false, message: '请输入QQ答案' }],validateTrigger: 'blur'}
                ]"
                    placeholder="QQ答案"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="微信号码" :colon="false">
                  <a-input
                    v-decorator="[
                  'con_wx',
                  {rules: [{ required: false,  message: '请输入微信号码' },{ validator: this.existwx }],validateTrigger: 'blur'}
                ]"
                    placeholder="微信号码"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="百度账号" :colon="false">
                  <a-input
                    v-decorator="[
                  'baidu_account',
                ]"
                    placeholder="百度账号"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="手机号码" :colon="false">
                  <a-input
                    v-decorator="[
                  'con_telephone',
                  {rules: [{ required: false,  message: '请输入手机号码' },{ validator: this.existphone }],validateTrigger: 'blur'}
                ]"
                    placeholder="手机号码"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="客户姓名" :colon="false">
                  <a-input
                    v-decorator="['con_name']"
                    placeholder="客户姓名"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="所在区域" :colon="false">
                  <a-input
                    v-decorator="[
                  'con_area',
                ]"
                    placeholder="所在区域"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="客户类型" :colon="false">
                  <a-radio-group name="radioGroup" v-decorator="['platform']">
                    <a-radio :value="1">淘宝</a-radio>
                    <a-radio :value="2">拼多多</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="关键词" :colon="false">
                  <a-input
                    v-decorator="[
                  'keyword',
                ]"
                    placeholder="关键词"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="自有产品" :colon="false">
                  <a-radio-group name="radioGroup" v-decorator="['has_product']">
                    <a-radio :value="2">没有</a-radio>
                    <a-radio :value="1">有</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="二维码" :colon="false" style="margin-bottom:0">
                  <div class="clearfix">
                    <up-img ref="payImg"
                            :editMd="true"
                            :src="payPreviewImage"
                            :tipText="payTipText"
                            :on-success="payHandleSuccess"
                            :on-preview="payPreview"
                            :on-del="delImage" />
                    <a-modal :visible="payPreviewVisible"
                              class="my"
                              :footer="null"
                              @cancel="handleCancel">
                      <img alt="example"
                            style="width: 100%"
                            :src="payPreviewImage" />
                    </a-modal>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="备注" :colon="false">
                  <a-textarea
                    v-decorator="[
                  'remark',
                ]"
                    placeholder="备注"
                    :autosize="{ minRows: 1, maxRows: 2 }"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="{span:11,offset:0}">
            <a-row>
              <a-col :xs="24" :sm="24" :lg="{span:23,offset:1}">
                <h5>客户来源</h5>
                <a-form-item style="padding-left:0">
                  <a-input
                    v-model="sourceUrl"
                    @change="changeSource"
                    placeholder="搜索来源(输入来源代号，自动匹配来源)"
                  />
                  <a-radio v-if="sourceId" :value="sourceId" :checked="true">{{sourceName}}</a-radio>
                  <div class="box" v-if="sourceList.length>0">
                    <!-- <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                              showSearch
                              placeholder="请选择来源分类"
                              style="width: 100%"
                              @change="sourceClassChange"
                              :filterOption="filterOption">
                      <a-select-option v-for="item in sourceClassList"
                                      :key="item.class_id">{{item.class_name}}</a-select-option>
                    </a-select>-->
                    <a-radio-group name="radioGroup" v-decorator="['source_id']" v-if="classStatus">
                      <a-radio
                        v-for="item in sourceList"
                        :key="item.id"
                        :value="item.id"
                      >{{item.name}}</a-radio>
                    </a-radio-group>
                    <a-radio-group name="radioGroup" v-decorator="['source_id']" v-else>
                      <a-radio
                        v-for="item in sourceList"
                        :key="item.source_id"
                        :value="item.source_id"
                      >{{item.source_name}}</a-radio>
                    </a-radio-group>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="{span:23,offset:1}">
                <h5>客户邮箱</h5>
                <a-form-item label="邮箱" style="padding-left:0" :colon="false">
                  <a-input v-decorator="['email']" :readOnly="true" placeholder="邮箱" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="{span:13,offset:0}">
            <a-row>
              <a-col :xs="24" :sm="24" :lg="{span:24,offset:0}">
                <h5>销售选择</h5>
                <a-form-item style="padding-left:0">
                  <a-radio-group
                    name="radioGroup"
                    @change="sellerChange"
                    v-decorator="['department_id',
                  {rules: [{ required: true ,message: '请选择销售'}]}]"
                  >
                    <div class="dename" v-for="(list,index) in sellerDp" :key="index">
                      <a-radio
                        v-for="item in list"
                        style="margin-right:20px;"
                        :key="item.department_id"
                        :value="item.department_id"
                      >{{item.department_name}}</a-radio>
                    </div>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="{span:11,offset:0}" v-show="sellerMeb.length>0">
            <a-row class="seller-group">
              <a-col :xs="24" :sm="24" :lg="{span:24,offset:0}">
                <h5>
                  销售联系方式
                  <span v-show="sellerInfo.firm_qq">&nbsp;&nbsp;&nbsp;QQ：{{sellerInfo.firm_qq}}</span>
                  <span
                    v-show="sellerInfo.user_wx"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微信：{{sellerInfo.user_wx}}</span>
                </h5>
                <a-form-item style="padding-left:0">
                  <a-radio-group
                    name="radioGroup"
                    style="border-top: 1px solid #d9d9d9;border-bottom: 1px solid #d9d9d9;"
                    @change="chooseSeller"
                    v-decorator="['user_id',
                  {rules: [{ required: false,message: '请选择销售'}]}]"
                  >
                    <a-row>
                      <a-col
                        :xs="16"
                        :sm="16"
                        :lg="loginlabelCol.left.lg"
                        :class="{left: loginSellerMeb.length>unloginSellerMeb.length}"
                      >
                        <p>急需分配</p>
                        <div class="listbox">
                          <a-row>
                            <a-col
                              :xs="24"
                              :sm="24"
                              :lg="loginlabelCol.left.clg"
                              v-for="user in loginSellerMeb"
                              :key="user.user_id"
                            >
                              <a-radio
                                :value="user.user_id"
                                :disabled="user.allot_num== user.set_num"
                              >
                                <span :class="{green: user.login_status== 1}">{{user.user_name}}</span>
                                （{{user.allot_num}}）
                                <span
                                  class="red"
                                >{{user.set_num}}</span>
                              </a-radio>
                            </a-col>
                          </a-row>
                        </div>
                      </a-col>
                      <a-col
                        :xs="8"
                        :sm="8"
                        :lg="loginlabelCol.right.lg"
                        class="right"
                        :class="{rightleft: loginSellerMeb.length<=unloginSellerMeb.length}"
                      >
                        <p>无需分配</p>
                        <div class="listbox">
                          <a-row>
                            <a-col
                              :xs="24"
                              :sm="24"
                              :lg="loginlabelCol.right.clg"
                              v-for="user in unloginSellerMeb"
                              :key="user.user_id"
                            >
                              <a-radio :checked="user.checked" :value="user.user_id">
                                <span
                                  :class="{grey: user.login_status== 0, green: user.login_status== 1}"
                                >{{user.user_name}}</span>
                                （{{user.allot_num}}）
                                <span
                                  class="red"
                                >{{user.set_num}}</span>
                              </a-radio>
                            </a-col>
                          </a-row>
                        </div>
                      </a-col>
                    </a-row>
                  </a-radio-group>
                </a-form-item>
                <div class="text">
                  <p>
                    备注：
                    <span class="green">绿色</span>代表当前在线，
                    <span class="grey">灰色</span>代表不在线
                  </p>
                  <p>
                    &nbsp;&nbsp;
                    <span class="green">姓名</span>
                    <span class="grey">（已分）</span>
                    <span class="red">需分</span>
                  </p>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:24,offset:0}"
            style="margin-top:20px;line-height:39px;text-align:center"
          >
            <a-form-item>
              <a-button
                type="primary"
                class="waves-effect waves-light"
                @click="handleSubmit"
                style="margin-right:18px"
              >保存</a-button>
              <a-button @click="handleGoBack">返回</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import api from '@/api/index'
import moment from "moment";
import UpImg from "@views/market/upImg";
import { getDepartment, getDpUser } from "@/api/manage";
import {
  getCsdAgainAllowUpdata,
  getMarketCsdAgainAllowEdit,
  getCsdSaleDep,
  getCsdSaleDpMember
} from "@/api/market";
import {
  getSourceList,
  getCsdCreate,
  getContactExist,
  getSourceClassList,
  getAllSource,
  getSourceSearch
} from "@/api/market";
export default {
  name: "TableEdit",
  components: {
    UpImg
  },
  data() {
    return {
      wechatData:'',
      payPreviewVisible: false,
      payPreviewImage: '',
      payTipText: '二维码',
      loadingStatus: false,
      loginlabelCol: {
        left: {
          lg: 16,
          clg: 12
        },
        right: {
          lg: 8,
          clg: 24
        }
      },
      sourceList: [],
      sourceClassList: [],
      loginSellerMeb: [],
      unloginSellerMeb: [],
      sellerMeb: [],
      singleGroup: [],
      sellerDp: [],
      sellerInfo: {},
      sourceUrl: undefined,
      sourceId: undefined,
      sourceName: undefined,
      mdl: {},
      addList: [],
      columns: [
        {
          title: "客户qq",
          dataIndex: "con_qq",
          width: "25%",
          align: "center"
        },
        {
          title: "电话",
          dataIndex: "con_telephone",
          width: "25%",
          align: "center"
        },
        {
          title: "微信",
          dataIndex: "con_wx",
          width: "25%",
          align: "center"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: "25%",
          align: "center"
        }
      ],
      qqisExisted: false,
      wxisExisted: false,
      phoneisExisted: false,
      formerData: {},
      user_id: "",
      firstStatus: true,
      classStatus: false,
      checkedClassId: undefined
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    // this.obSourceClass();
    this.setForm();
    this.getDplist();
  },
  methods: {
    payHandleSuccess (results) {
      this.wechatData= results;
      let reads = new FileReader();
      reads.readAsDataURL(results);
      let _this= this
      reads.onload = function(e) {
        _this.payPreviewImage=this.result;
        _this.$refs.payImg.showImg(this.result);
      };
      this.loading = false;
    },
    delImage(){
      this.wechatData= ''
      this.payPreviewImage= ''
    },
    payPreview () {
      this.payPreviewVisible = true
    },
    handleCancel () {
      this.payPreviewVisible = false
    },
    handleGoBack() {
      this.$emit("cancel");
    },
    editCus(record,status) {
      this.wechatData=''
      this.payPreviewImage= '';
      this.$refs.payImg.refresh();
      this.form.resetFields();
      this.firstStatus = true;
      this.formerData = record;
      this.sourceList = [];
      this.sellerMeb = [];
      this.loginSellerMeb = [];
      this.unloginSellerMeb = [];
      this.loadingStatus = true;
      this.sourceUrl = undefined;
      if(status){
        this.classStatus= true
        record.source_id && (this.sourceList = [record.source_id]);
      }else{
        this.classStatus= false
        record.m_source && (this.sourceList = [record.m_source]);
      }
      // record.source_id && (this.sourceList = [{source_id:record.m_source}]);
      getMarketCsdAgainAllowEdit({ customer_id: record.customer_id })
        .then(res => {
          this.loadingStatus = false;
          res.data.qr_code_url && (this.payPreviewImage = api.baseUrl + res.data.qr_code_url)
          const sitem = {
            con_name: res.data.con_name,
            con_qq: res.data.con_qq,
            con_wx: res.data.con_wx,
            con_telephone: res.data.con_telephone,
            remark: res.data.remark,
            qq_answer: res.data.qq_answer,
            con_area: res.data.con_area,
            keyword: res.data.keyword,
            baidu_account: res.data.baidu_account,
            has_product: res.data.has_product,
            platform: res.data.platform.value,
            source_id: res.data.source_id,
            qq_answer: res.data.qq_answer,
            department_id: res.data.department_id,
            user_id: res.data.user_id,
            email: res.data.email
          };
          this.$nextTick(() => {
            this.form.setFieldsValue({ ...sitem });
          });
          if (res.data.user_id) {
            this.user_id = res.data.user_id;
            this.getDpMember(res.data.department_id); //显示具体销售人员
          }
        })
        .catch(err => {
          this.loadingStatus = false;
        });
    },
    handleSubmit() {
      const _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          if(values.con_qq || values.con_wx || values.con_telephone || _this.payPreviewImage){
            let formData = new FormData();
            formData.append("con_name", values.con_name?values.con_name:'');
            formData.append("con_wx", values.con_wx?values.con_wx:'');
            formData.append("con_qq", values.con_qq?values.con_qq:'');
            formData.append("con_telephone", values.con_telephone?values.con_telephone:'');
            formData.append("con_area", values.con_area ? values.con_area : "");
            formData.append("keyword", values.keyword ? values.keyword : "");
            formData.append("qq_answer", values.qq_answer ? values.qq_answer : "");
            formData.append("baidu_account", values.baidu_account ? values.baidu_account : "");
            formData.append("platform", values.platform ? values.platform : "");
            formData.append("has_product", values.has_product);
            formData.append("remark", values.remark?values.remark : "");
            formData.append("source_id", values.source_id);
            formData.append("customer_id", _this.formerData.customer_id);
            if(values.user_id){
              formData.append("user_id", values.user_id);
            };
            if(values.department_id){
              formData.append("department_id", values.department_id);
            };
            if(!_this.payPreviewImage){
              formData.append("qr_code_url", "");
            }
            if(_this.wechatData){
              formData.append("image", _this.wechatData);
            }
            getCsdAgainAllowUpdata(formData)
              .then(res => {
                if (res.code == 200) {
                  this.$message.success("修改成功", 1);
                  this.$emit("ok");
                  _this.payPreviewImage= '';
                  _this.$refs.payImg.refresh();
                } else if (res.code == 400) {
                  this.$message.warning(res.msg, 1);
                }
              })
              .catch(err => {
                
              });
          }else{
            _this.$message.warning("请至少添加一种联系方式", 1);
          }
        }
      });
    },
    obSourceClass() {
      getSourceClassList()
        .then(res => {
          this.sourceClassList = res.data.data;
        })
        .catch(err => {});
    },
    obAllSource(parameter) {
      getAllSource(parameter)
        .then(res => {
          this.sourceList = res.data;
        })
        .catch(err => {});
    },
    getDplist() {
      let myDatas = {};
      let myArr = [];
      getCsdSaleDep()
        .then(res => {
          if (res.code == 200) {
            res.data.forEach((item, index) => {
              
              if (myArr.indexOf(item.parent_id)) {
                myArr.push(item.parent_id);
              }
            });
            myArr.forEach((item, index) => {
              myDatas[item] = [];
            });
            res.data.forEach((item, index) => {
              myDatas[item.parent_id].push(item);
            });
            this.sellerDp = myDatas;
          }
        })
        .catch(err => {});
    },
    chooseSeller(e) {
      this.sellerMeb.forEach(item => {
        if (e.target.value == item.user_id) {
          this.sellerInfo = item;
        }
      });
    },
    sellerChange(e) {
      const records = {
        user_id: undefined
      };
      this.form.setFieldsValue({ ...records });
      this.getDpMember(e.target.value);
    },
    getDpMember(id) {
      this.sellerInfo = [];
      getCsdSaleDpMember(id)
        .then(res => {
          if (res.code == 200) {
            this.sellerMeb = res.data.info;
            this.loginSellerMeb = [];
            this.unloginSellerMeb = [];
            res.data.info.forEach(item => {
              if (this.user_id == item.user_id && this.firstStatus) {
                this.sellerInfo = item;
                this.firstStatus = false;
              }
              if (item.login_status == 1 && item.set_num > item.allot_num) {
                this.loginSellerMeb.push(item);
              } else {
                if (item.login_status == 1) {
                  this.unloginSellerMeb.unshift(item);
                } else {
                  this.unloginSellerMeb.push(item);
                }
              }
            });
            if (this.loginSellerMeb.length >= this.unloginSellerMeb.length) {
              this.loginlabelCol = {
                left: {
                  lg: 16,
                  clg: 12
                },
                right: {
                  lg: 8,
                  clg: 24
                }
              };
            } else {
              this.loginlabelCol = {
                left: {
                  lg: 8,
                  clg: 24
                },
                right: {
                  lg: 16,
                  clg: 12
                }
              };
            }
          } else if (res.code == 400) {
            this.sellerMeb = [];
            this.loginSellerMeb = [];
            this.unloginSellerMeb = [];
          }
        })
        .catch(err => {});
    },
    sourceClassChange(value) {
      this.obSourceList({ class_id: value });
    },
    obSourceList(parameter) {
      getSourceList(parameter)
        .then(res => {
          this.sourceList = res.data.data;
        })
        .catch(err => {});
    },
    setForm() {
      this.wechatData=''
      const record = {
        con_name: undefined,
        con_qq: undefined,
        con_wx: undefined,
        con_telephone: undefined,
        remark: undefined,
        qq_answer: undefined,
        con_area: undefined,
        keyword: undefined,
        baidu_account: undefined,
        has_product: "0",
        platform: "1",
        source_id: undefined
      };

      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    changeSource() {
      let isMatch = false;
      getSourceSearch({ source_info: this.sourceUrl })
        .then(res => {
          this.classStatus= false;
          this.sourceList = res.data;
          this.sourceId = "";
          if (this.sourceList.length == 1) {
            const record = {
              source_id: this.sourceList[0].source_id
            };
            this.mdl = Object.assign({}, record);
            this.$nextTick(() => {
              this.form.setFieldsValue({ ...record });
            });
          } else {
            // this.sourceId= this.formerData.m_source.source_id
            const records = {
              source_id: undefined
            };
            this.mdl = Object.assign({}, records);
            this.$nextTick(() => {
              this.form.setFieldsValue({ ...records });
            });
          }
        })
        .catch(err => {
          
        });
      return;
      this.sourceList.forEach(item => {
        if (item.source_short_name == this.sourceUrl) {
          this.sourceName = item.source_name;
          this.sourceId = item.source_id;
          isMatch = true;
          const record = {
            source_id: undefined
          };
          this.mdl = Object.assign({}, record);
          this.$nextTick(() => {
            this.form.setFieldsValue({ ...record });
          });
        }
      });
      if (!isMatch && !this.sourceUrl) {
        this.sourceName = this.formerData.m_source.source_name;
        this.sourceId = this.formerData.m_source.source_id;
      }
    },
    otherSource(rule, value, callback) {
      if (value) {
        this.sourceUrl = undefined;
        this.sourceName = undefined;
        this.sourceId = undefined;
        
        callback();
      } else {
        callback();
      }
    },
    existqq(rule, value, callback) {
      if (value) {
        callback();
      } else {
        callback();
      }
    },
    existwx(rule, value, callback) {
      if (value) {
        callback();
      } else {
        callback();
      }
    },
    existphone(rule, value, callback) {
      if (value) {
        callback();
      } else {
        callback();
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0;
  .title {
    text-align: left;
    font-size: 14px;
    color: #333;
    margin: 0;
    padding-left: 20px;
    line-height: 36px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #f2f2f2;
  }
}
.add-form {
  box-sizing: border-box;
  padding: 24px;
  background: #fff;
  border-top: 1px solid #d9d9d9;
  button {
    margin-top: 4px;
  }
}

.add-form .ant-form-item {
  display: flex;
  // margin-bottom: 0;
}

.add-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 0;
}

.add-table {
  box-sizing: border-box;

  .ant-table-wrapper {
    background-color: #fff;
  }
}
.ant-row {
  h5 {
    font-size: 14px;
    font-weight: 400;
  }
}
.seller-group {
  font-size: 14px;
  .ant-form-item {
    margin: 0;
  }
  .ant-radio-group {
    width: 100%;
    // border-top: 1px solid #d9d9d9;
    // border-bottom: 1px solid #d9d9d9;
    .ant-radio-wrapper {
      width: 50%;
      margin-right: 0;
      .red {
        color: #e84e7f;
      }
      .green {
        color: #009688;
      }
      .grey {
        color: #c0c0c0;
      }
    }
    .left {
      border-right: 1px solid #d9d9d9;
    }
    .right {
      padding-left: 10px;
      box-sizing: border-box;
      .ant-radio-wrapper {
        width: 100%;
      }
    }
    .rightleft {
      border-left: 1px solid #d9d9d9;
    }
  }
  .text {
    p {
      display: inline-block;
      .green {
        color: #009688;
      }
      .grey {
        color: #c0c0c0;
      }
      .red {
        color: #e84e7f;
      }
    }
  }
}
</style>
<style scoped>
.ant-form-item {
  padding-left: 68px;
}
.ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-form-item >>> .ant-form-item-label {
  width: 68px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
}
</style>


