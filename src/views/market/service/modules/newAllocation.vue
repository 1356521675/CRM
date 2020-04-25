<template>
  <div class="center-box">
    <h4 class="title">新建并分配</h4>
    <a-form class="add-form"
            :form="form"
            autocomplete="off">
      <a-row :gutter="16">
        <a-col :xs="24"
               :sm="24"
               :lg="{span:13,offset:0}">
          <a-row :gutter="24">
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="QQ号码"
                           :colon="false">
                <a-input v-decorator="[
                'con_qq',
                {rules: [{ required: false,  message: '请输入QQ号码' },{ validator: this.existqq }],validateTrigger: 'blur'}
              ]"
                         placeholder="QQ号码" />
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="QQ答案"
                           :colon="false">
                <a-input v-decorator="[
                'qq_answer',
                 {rules: [{ required: false, message: '请输入QQ答案' }],validateTrigger: 'blur'}
              ]"
                         placeholder="QQ答案" />
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="微信号码"
                           :colon="false">
                <a-input v-decorator="[
                'con_wx',
                {rules: [{ required: false,  message: '请输入微信号码' },{ validator: this.existwx }],validateTrigger: 'blur'}
              ]"
                         placeholder="微信号码" />
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="百度账号"
                           :colon="false">
                <a-input v-decorator="[
                'baidu_account',
              ]"
                         placeholder="百度账号" />
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="手机号码"
                           :colon="false">
                <a-input v-decorator="[
                'con_telephone',
                {rules: [{ required: false,  message: '请输入手机号码' },{ validator: this.existphone }],validateTrigger: 'blur'}
              ]"
                         placeholder="手机号码" />
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
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="所在区域"
                           :colon="false">
                <a-input v-decorator="['con_area',{rules: [{ required: false,  message: '请输入所在区域' },{ validator: this.existArea }],validateTrigger: 'blur'}]"
                         placeholder="所在区域" />
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="客户类型"
                           :colon="false">
                <a-radio-group name="radioGroup"
                               v-decorator="['platform']">
                  <a-radio :value="1">淘宝</a-radio>
                  <a-radio :value="2">拼多多</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="关键词"
                           :colon="false">
                <a-input v-decorator="[
                'keyword',
              ]"
                         placeholder="关键词"
                         :autosize="{ minRows: 2, maxRows: 6 }" />
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="自有产品"
                           :colon="false">
                <a-radio-group name="radioGroup"
                               v-decorator="['has_product']">
                  <a-radio :value="2">没有</a-radio>
                  <a-radio :value="1">有</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                     :sm="24"
                     :lg="12">
              <a-form-item label="二维码" :colon="false" style="margin-bottom:0">
                <div class="qrcode clearfix">
                  <up-img ref="payImg"
                          :upBoxSize="upBoxSize"
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
                  <a-input
                    v-show="qrcodeStatus.url"
                    v-decorator="['ermlj']"
                    placeholder="二维码链接"/>
                </div>
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="12">
              <a-form-item label="备注"
                           :colon="false">
                <a-textarea v-decorator="['remark']"
                            placeholder="备注"
                            :autosize="{ minRows: 1, maxRows: 4 }" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="12">
              <a-form-item label="待分配" :colon="false" style="margin-bottom:0">
                <span style="color:#24a1ff;">{{unassignedNum}}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="24" v-if="cusStatus">
              <a-form-item label="记录" :colon="false">
                <ul class="mylist">
                  <li>
                    <p>
                      分配时间:
                      <span style="color:red;">{{cusInfo.allot_time}}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      销售组别:
                      <span>{{cusInfo.department_id.length>0&&cusInfo.department_id[0].name}}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      销售人员:
                      <span>{{cusInfo.user_id.length>0&&cusInfo.user_id[0].name}}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      添加状态:
                      <span>{{cusInfo.customer_status.length>0&&cusInfo.customer_status[0].name}}</span>
                    </p>
                  </li>
                </ul>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24"
               :sm="24"
               :lg="{span:11,offset:0}">
          <a-row>
            <a-col :xs="24" :sm="24" :lg="{span:23,offset:1}">
              <h5>选择商务通</h5>
              <a-form-item style="padding-left:0;margin-bottom:10px;">
                <a-radio-group name="radioGroup" v-decorator="['swtform']">
                  <a-radio v-for="item in swtList"
                             style="margin-right:20px;"
                             :key="item.id"
                             :value="item.id">{{item.name}}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:23,offset:1}">
              <h5>来源分类</h5>
              <a-form-item style="padding-left:0">
                <a-input v-model="sourceUrl"
                         @change="changeSource"
                         placeholder="搜索来源(输入来源代号，自动匹配来源)" />
                <a-radio v-if="sourceId"
                         :value="sourceId"
                         :checked="true">{{sourceName}}</a-radio>
                <div class="box">
                  <a-radio-group name="radioGroup"
                                  v-model="mclass_id"
                                 @change="sourceClassChange">
                    <div class="dename">
                      <a-radio v-for="item in sourceClassList"
                               style="margin-right:20px;"
                               :key="item.class_id"
                               :value="item.class_id">{{item.class_name}}</a-radio>
                    </div>
                  </a-radio-group>
                </div>
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:23,offset:1}">
              <h5>客户来源</h5>
              <a-form-item style="padding-left:0">
                <div class="box">
                  <a-radio-group name="radioGroup"
                  @change="msourceChange"
                                v-decorator="['source_id',
                {rules: [{ required: true ,message: '请选择来源'}]}]">
                    <a-radio v-for="item in sourceList"
                             :key="item.source_id"
                             :value="item.source_id">{{item.source_name}}</a-radio>
                  </a-radio-group>
                </div>

              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24"
               :sm="24"
               :lg="{span:13,offset:0}">
          <a-row>
            <a-col :xs="24" :sm="24" :lg="{span:24,offset:0}">
              <h5>选择系统</h5>
              <a-form-item style="padding-left:0;margin-bottom:10px;">
                <a-radio-group name="radioGroup" v-decorator="['szxt']" >
                  <a-radio v-for="(item, index) in systemList"
                      :key="index"
                      :value="item.id">{{item.name}}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:24,offset:0}">
              <h5>销售选择</h5>
              <a-form-item style="padding-left:0">
                <a-radio-group name="radioGroup"
                               @change="sellerChange"
                               v-decorator="['department_id',
                {rules: [{ required: true ,message: '请选择销售'}]}]">
                  <div class="dename"
                       v-for="(list,index) in sellerDp"
                       :key="index">
                    <a-radio v-for="item in list"
                             style="margin-right:20px;"
                             :key="item.department_id"
                             :value="item.department_id">{{item.department_name}}</a-radio>
                  </div>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24"
               :sm="24"
               :lg="{span:11,offset:0}"
               v-show="sellerMeb.length>0">
          <a-row class="seller-group">
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:24,offset:0}">
              <h5>
                销售联系方式
                <span v-show="sellerInfo.firm_qq">&nbsp;&nbsp;&nbsp;QQ：{{sellerInfo.firm_qq}}</span><span v-show="sellerInfo.user_wx">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微信：{{sellerInfo.user_wx}}</span>
              </h5>
              <a-form-item style="padding-left:0">
                <a-radio-group name="radioGroup"
                               style="border-top: 1px solid #d9d9d9;border-bottom: 1px solid #d9d9d9;"
                               @change="chooseSeller"
                               v-decorator="['user_id',
                {rules: [{ required: true,message: '请选择销售'}]}]">
                  <a-row>
                    <a-col :xs="16"
                           :sm="16"
                           :lg="loginlabelCol.left.lg"
                           :class="{left: loginSellerMeb.length>unloginSellerMeb.length}">
                      <p>急需分配</p>
                      <div class="listbox">
                        <a-row>
                          <a-col :xs="24"
                                 :sm="24"
                                 :lg="loginlabelCol.left.clg"
                                 v-for="user in loginSellerMeb"
                                 :key="user.user_id">
                            <a-radio :value="user.user_id"><span :class="{green: user.login_status== 1}">{{user.user_name}}</span>（{{user.allot_num}}）<span :class="{red: user.allot_num < user.set_num}">{{user.set_num}}</span><span class="small">(8.22)</span></a-radio>
                          </a-col>
                        </a-row>
                      </div>
                    </a-col>
                    <a-col :xs="8"
                           :sm="8"
                           :lg="loginlabelCol.right.lg"
                           class="right"
                           :class="{rightleft: loginSellerMeb.length<=unloginSellerMeb.length}">
                      <p>无需分配</p>
                      <div class="listbox">
                        <a-row>
                          <a-col :xs="24"
                                 :sm="24"
                                 :lg="loginlabelCol.right.clg"
                                 v-for="user in unloginSellerMeb"
                                 :key="user.user_id">
                            <a-radio :checked="user.checked"
                                     :value="user.user_id"><span :class="{grey: user.login_status== 0, green: user.login_status== 1}">{{user.user_name}}</span>（{{user.allot_num}}）<span class="red">{{user.set_num}}</span><span class="small">(8.22)</span></a-radio>
                          </a-col>
                        </a-row>
                      </div>
                    </a-col>
                  </a-row>
                </a-radio-group>
              </a-form-item>
              <div class="text">
                <p>备注：<span class="green">绿色</span>代表当前在线，<span class="grey">灰色</span>代表不在线</p>
                <p>&nbsp;&nbsp;<span class="green">姓名</span><span class="grey">（已分）</span><span class="red">需分</span></p>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24"
               :sm="24"
               :lg="{span:24,offset:0}"
               style="margin-top:20px;line-height:39px;text-align:center">
          <a-form-item style="padding-left:0">
            <a-button type="primary"
                      html-type="submit"
                      class="waves-effect waves-light"
                      @click="handleSubmit"
                      :loading="saveLoading"
                      style="margin-right:18px">保存</a-button>
            <a-button @click="setForm">取消</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
import pick from "lodash.pick";
import UpImg from "@views/market/upImg";
import { getDepartment, getDpUser } from "@/api/manage";
import {
  getSourceList,
  getCsdCreate,
  getContactExist,
  getSourceClassList,
  getAllSource,
  getCsdSaleDep,
  getCsdSaleDpMember,
  getSourceSearch,
  getCsdCreateAllow,
  getMachCity,
  getCsdUnassignedNum
} from "@/api/market";
export default {
  name: "TableEdit",
  components: {
    UpImg
  },
  props: ['systemList','swtList'],
  data () {
    return {
      wechatData:'',
      payPreviewVisible: false,
      payPreviewImage: '',
      payTipText: '二维码',
      saveLoading: false,
      unassignedNum: 0,
      cusInfo: {},
      cusStatus: false,
      showSourceTips: false,
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
      conArea: undefined,
      mclass_id:undefined,
      checkDpId:'',
      checkedClassId:undefined,
      upBoxSize: {
        width: 32,
        height: 32
      },
      qrcodeStatus:{
        img: true,
        url: true
      }
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this,{name:'newAllocation'});
  },
  mounted () {
    this.obSourceClass();
    this.setForm();
    this.getDplist();
    // this.loadSource();
    this.getUnassignedNum(0);
  },
  methods: {
    payHandleSuccess (results) {
      this.wechatData= results;
      let reads = new FileReader();
      reads.readAsDataURL(results);
      let _this= this;
      this.upBoxSize.width= 100;
      this.upBoxSize.height= 100;
      reads.onload = function(e) {
        _this.payPreviewImage=this.result;
        _this.$refs.payImg.showImg(this.result);
        _this.$refs.payImg.setBoxSize();
      };
      this.qrcodeStatus.url= false;
      this.loading = false;
    },
    delImage(){
      this.wechatData= '';
      this.payPreviewImage= '';
      this.qrcodeStatus.url= true;
    },
    payPreview () {
      this.payPreviewVisible = true
    },
    handleCancel () {
      this.payPreviewVisible = false
    },
    getUnassignedNum(num) {
      getCsdUnassignedNum({ platform: num })
        .then(res => {
          if (res.code == 200) {
            this.unassignedNum = res.data.number;
          }
        })
        .catch(err => {
          
        });
    },
    msourceChange(e){
      this.showSourceTips = false
    },
    choseSource () {
      this.showSourceTips = false
    },
    refreshData () {
      this.obSourceClass();
      this.setForm();
      this.getDplist();
      this.getUnassignedNum(0);
    },
    handleGoBack () {
      this.$emit("onGoBack");
    },
    handleSubmit () {
      const _this = this;
      _this.saveLoading= true
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!values.source_id) {
            _this.showSourceTips = true
            _this.saveLoading= false
            return
          } else {
            _this.showSourceTips = false
          }
          if(values.con_qq || values.con_wx || values.con_telephone || _this.payPreviewImage){
            if (values.user_id) {
              _this.conArea&&(values.con_area=_this.conArea)
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
              formData.append("user_id", values.user_id);
              formData.append("department_id", values.department_id);
              formData.append("image", _this.wechatData);
              getCsdCreateAllow(formData)
                .then(res => {
                  _this.saveLoading= false
                  if (res.code == 200) {
                    _this.$message.success("分配成功", 1);
                    _this.setForm()
                    _this.getDpMember(_this.checkDpId);
                    _this.conArea = undefined
                    _this.getUnassignedNum(0);
                    _this.delImage();
                    _this.$refs.payImg.refresh();
                  }else{
                    _this.$message.warning(res.msg);
                  }
                })
                .catch(err => {
                  _this.saveLoading= false
                  _this.getUnassignedNum(0);
                });
            } else {
              _this.saveLoading= false
              _this.getUnassignedNum(0);
              this.$message.warning('请选择具体的销售人员', 2);
            }
          }else{
            _this.saveLoading= false
            _this.$message.warning("请至少添加一种联系方式", 1);
          }
        }else{
          _this.saveLoading= false
        }
      });
    },
    obSourceClass () {
      this.checkedClassId= undefined;
      getSourceClassList()
        .then(res => {
          this.sourceClassList = res.data.data;
          this.sourceClassList.forEach((item)=>{
            if(item.is_checked==1){
              this.mclass_id= item.class_id;
              this.checkedClassId= item.class_id;
            }
          });
          this.loadSource()
        })
        .catch(err => { });
    },
    getDplist () {
      let myDatas = {}
      let myArr = []
      getCsdSaleDep()
        .then(res => {
          if (res.code == 200) {
            res.data.forEach((item, index) => {
              
              if (myArr.indexOf(item.parent_id)) {
                myArr.push(item.parent_id)
              }
            })
            myArr.forEach((item, index) => {
              myDatas[item] = []
            })
            res.data.forEach((item, index) => {
              myDatas[item.parent_id].push(item)
            })
            this.sellerDp = myDatas
          }
        })
        .catch(err => { });
    },
    getDpMember (id) {
      this.sellerInfo = []
      getCsdSaleDpMember(id)
        .then(res => {
          if (res.code == 200) {
            this.sellerMeb = res.data.info
            this.loginSellerMeb = []
            this.unloginSellerMeb = []
            res.data.info.forEach(item => {
              if (item.login_status == 1 && item.set_num > item.allot_num) {
                this.loginSellerMeb.push(item)
              } else {
                if(item.login_status == 1){
                  this.unloginSellerMeb.unshift(item);
                }else{
                  this.unloginSellerMeb.push(item);
                }
              }
            })
            if (
              this.loginSellerMeb.length >=
              this.unloginSellerMeb.length 
            ) {
              this.loginlabelCol = {
                left: {
                  lg: 16,
                  clg: 12
                },
                right: {
                  lg: 8,
                  clg: 24
                }
              }
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
              }
            }
          } else if (res.code == 400) {
            this.sellerMeb = []
            this.loginSellerMeb = []
            this.unloginSellerMeb = []
          }
        })
        .catch(err => { });
    },
    sellerChange (e) {
      const records = {
        user_id: undefined
      };
      this.form.setFieldsValue({ ...records });
      this.getDpMember(e.target.value)
      this.checkDpId = e.target.value
    },
    sourceClassChange (e) {
      this.sourceUrl= undefined
      this.obSourceList({ class_id: e.target.value });
    },
    obSourceList (parameter) {
      getSourceList(parameter)
        .then(res => {
          this.sourceList = res.data.data;
        })
        .catch(err => { });
    },
    obAllSource (parameter) {
      getAllSource(parameter)
        .then(res => {
          this.sourceList = res.data;
        })
        .catch(err => { });
    },
    setForm () {
      this.mclass_id = undefined;
      this.checkedClassId&& (this.mclass_id = this.checkedClassId);
      this.showSourceTips = false
      const record = {
        con_qq: undefined,
        con_name: undefined,
        con_wx: undefined,
        con_telephone: undefined,
        remark: undefined,
        qq_answer: undefined,
        con_area:'中国',
        keyword: undefined,
        baidu_account: undefined,
        has_product: 2,
        platform: 1,
        source_id: undefined,
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
      this.sourceName = undefined;
      this.sourceId = undefined;
      this.sourceUrl = undefined
      this.editStstus = false
      this.sourceList = []
      this.loadSource()
    },
    changeSource () {
      this.mclass_id=undefined
      let isMatch = false
      this.showSourceTips = false
      getSourceSearch({ source_info: this.sourceUrl }).then(res => {
        this.sourceList = res.data;
        if (this.sourceList.length == 1) {
          const record = {
            source_id: this.sourceList[0].source_id
          };
          this.mdl = Object.assign({}, record);
          this.$nextTick(() => {
            this.form.setFieldsValue({ ...record });
          });
        } else {
          const records = {
            source_id: undefined
          };
          this.mdl = Object.assign({}, records);
          this.$nextTick(() => {
            this.form.setFieldsValue({ ...records });
          });
        }
      }).catch(err => {
        
      })
      return
      this.sourceList.forEach(item => {
        if (item.source_url == this.sourceUrl || item.source_short_name == this.sourceUrl || item.source_name == this.sourceUrl) {
          this.sourceName = item.source_name;
          this.sourceId = item.source_id;
          isMatch = true
          const record = {
            source_id: undefined
          };
          this.mdl = Object.assign({}, record);
          this.$nextTick(() => {
            this.form.setFieldsValue({ ...record });
          });
        }
      })
      if (!isMatch) {
        this.sourceName = undefined;
        this.sourceId = undefined;
      }
    },
    loadSource() {
      this.showSourceTips = false;
      let isMatch = false;
      if(this.checkedClassId){
          this.sourceClassChange({target:{value:this.checkedClassId}})
      }else{
        getSourceSearch({ source_info: "" })
        .then(res => {
          this.sourceList = res.data;
          if (this.sourceList.length == 1) {
            const record = {
              source_id: this.sourceList[0].source_id
            };
            this.mdl = Object.assign({}, record);
            this.$nextTick(() => {
              this.form.setFieldsValue({ ...record });
            });
          } else {
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
      }
    },
    editAddList (record) {
      const index = this.addList.indexOf(record);
      const item = this.addList[index];
      this.mdl = Object.assign({}, item);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...item });
      });
    },
    delAddList (record) {
      const index = this.addList.indexOf(record);
      this.addList.splice(index, 1);
    },
    otherSource (rule, value, callback) {
      if (value) {
        this.sourceUrl = undefined
        this.sourceName = undefined;
        this.sourceId = undefined;
        callback();
      } else {
        callback();
      }
    },
    existqq(rule, value, callback) {
      if (value) {
        if (this.editStstus) {
          callback();
          return;
        }
        getContactExist({ con_qq: value })
          .then(res => {
            if (res.code === 400) {
              this.cusInfo = res.data;
              if (res.data.allot_time) {
                this.cusStatus = true;
              } else {
                this.cusStatus = false;
              }
              callback(new Error(res.msg));
            } else if (res.code === 200) {
              this.cusStatus = false;
              callback();
            } else {
              this.cusStatus = false;
              callback();
            }
          })
          .catch(err => {
            this.cusStatus = false;
            callback();
          });
      } else {
        callback();
        this.cusStatus = false;
      }
    },
    existwx(rule, value, callback) {
      if (value) {
        if (this.editStstus) {
          callback();
          return;
        }
        getContactExist({ con_wx: value })
          .then(res => {
            if (res.code === 400) {
              this.cusInfo = res.data;
              if (res.data.allot_time) {
                this.cusStatus = true;
              } else {
                this.cusStatus = false;
              }
              callback(new Error(res.msg));
            } else if (res.code === 200) {
              this.cusStatus = false;
              callback();
            } else {
              this.cusStatus = false;
              callback();
            }
          })
          .catch(err => {
            this.cusStatus = false;
            callback();
          });
      } else {
        this.cusStatus = false;
        callback();
      }
    },
    existphone(rule, value, callback) {
      if (value) {
        if (this.editStstus) {
          callback();
          return;
        }
        getContactExist({ con_telephone: value })
          .then(res => {
            if (res.code === 400) {
              if (res.data.allot_time) {
                this.cusStatus = true;
              } else {
                this.cusStatus = false;
              }
              this.cusInfo = res.data;
              callback(new Error(res.msg));
            } else if (res.code === 200) {
              this.cusStatus = false;
              callback();
            } else {
              this.cusStatus = false;
              callback();
            }
          })
          .catch(err => {
            this.cusStatus = false;
            callback();
          });
      } else {
        callback();
      }
    },
    existArea (rule, value, callback) {
      const _this = this
      if (value) {
        getMachCity({ con_area: value })
          .then(res => {
            if (res.code === 400) {
              callback();
              _this.conArea = undefined
            } else if (res.code === 200) {
              _this.conArea = res.data.city_name
              callback();
            } else {
              _this.conArea = undefined
              callback();
            }
          })
          .catch(err => {
            _this.conArea = undefined
            callback();
          });
      } else {
        _this.conArea = undefined
        callback();
      }
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    chooseSeller (e) {
      this.sellerMeb.forEach(item => {
        if (e.target.value == item.user_id) {
          this.sellerInfo = item
        }
      })
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
      .small {
        display:inline-block;
        font-size: 12px;
        padding-left:2px;
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
.mylist {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    padding: 0;
    margin: 0;
    float: left;
    margin-right: 8px;
    p {
      margin: 0;
    }
  }
}
.qrcode input{
  width:calc(100% - 32px);
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

.box >>> .ant-radio-group .ant-radio-wrapper {
  width: 120px;
}
.seller-group >>> .has-error{
  padding-bottom: 18px;
}
</style>

