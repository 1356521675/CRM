<template>
  <div class="center-box">
    <div class="add-table" v-if="addListShow">
      <h5>已新增列表</h5>
      <a-table
        :columns="columns"
        :dataSource="addList"
        :rowKey="record => record.rowkey"
        :pagination="false"
      >
        <span slot="action" slot-scope="text, record">
          <a-button
            class="btn-primary"
            size="small"
            style="margin-right:4px"
            :disabled="editStstus"
            v-if="!record.saveStatus"
            @click="editAddList(record)"
          >修改</a-button>
          <a-button
            class="btn-secondary btn-trans"
            size="small"
            style="margin-right:4px"
            v-else
            :disabled="record.saveStatus"
          >隐藏</a-button>
          <a-button
            class="btn-secondary"
            size="small"
            @click="delAddList(record)"
            :disabled="editStstus"
          >隐藏</a-button>
        </span>
        <span slot="stype" slot-scope="platform">
          <template>
            <a-button v-if="platform == 1" class="btn-custom btn-trans" size="small">淘宝</a-button>
            <a-button v-else class="btn-info btn-trans" size="small">拼多多</a-button>
          </template>
        </span>
        <span slot="haspro" slot-scope="has_product">
          <template>
            <a-button v-if="has_product == 1" class="btn-custom btn-trans" size="small">有</a-button>
            <a-button v-else class="btn-secondary btn-trans" size="small">无</a-button>
          </template>
        </span>
        <span slot="hassave" slot-scope="saveStatus">
          <template>
            <a-button v-if="saveStatus" class="btn-success btn-trans" size="small">已保存</a-button>
            <a-button v-else class="btn-warning btn-trans" size="small">未保存</a-button>
          </template>
        </span>
      </a-table>
    </div>
    <h4 class="title">
      新建客户
      <span v-show="editStstus">&nbsp;&nbsp;(编辑已添加列表)</span>
    </h4>
    <a-form class="add-form" :form="form" autocomplete="off">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :lg="{span:13,offset:0}">
          <a-row :gutter="24">
            <a-col :xs="24" :sm="24" :lg="12">
              <a-form-item label="QQ号码" :colon="false">
                <a-input
                  v-decorator="[
                'con_qq',
                {rules: [{ required: false,  message: '请输入QQ号码' },{ validator: this.existqq }],validateTrigger: 'blur'}
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
                {rules: [{ required: false,  message: '请输入手机号码' },{ validator: this.existphone }],validateTrigger: 'blur'}]"
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
                'con_area',{rules: [{ required: false,  message: '请输入所在区域' },{ validator: this.existArea }],validateTrigger: 'blur'}]"
                  placeholder="所在区域"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="12">
              <a-form-item label="客户类型" :colon="false">
                <!-- <label style="margin-right:6px;color:#333;"></label> -->
                <a-radio-group name="radioGroup" v-decorator="['platform']">
                  <a-radio :value="1">淘宝</a-radio>
                  <a-radio :value="2">拼多多</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="12">
              <a-form-item label="关键词" :colon="false">
                <a-input
                  v-decorator="['keyword',]"
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
            <a-col :xs="24" :sm="24" :lg="12">
              <a-form-item label="备注" :colon="false">
                <a-textarea
                  v-decorator="['remark',]"
                  placeholder="备注"
                  :autosize="{ minRows: 1, maxRows: 4}"
                />
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
        <a-col :xs="24" :sm="24" :lg="{span:11,offset:0}">
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
            <a-col :xs="24" :sm="24" :lg="{span:23,offset:1}">
              <h5>来源分类</h5>
              <a-form-item style="padding-left:0;margin-bottom:10px;">
                <a-input
                  v-model="sourceUrl"
                  @change="changeSource"
                  placeholder="搜索来源(输入来源代号，自动匹配来源)"
                />
                <a-radio v-if="sourceId" :value="sourceId" :checked="true">{{sourceName}}</a-radio>
                <div class="box">
                  <a-radio-group name="radioGroup" v-model="mclass_id" @change="sourceClassChange">
                    <div class="dename">
                      <a-radio
                        v-for="item in sourceClassList"
                        style="margin-right:20px;"
                        :key="item.class_id"
                        :value="item.class_id"
                      >{{item.class_name}}</a-radio>
                    </div>
                  </a-radio-group>
                </div>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="{span:23,offset:1}">
              <h5>客户来源</h5>
              <a-form-item style="padding-left:0;margin-bottom:10px;">
                <div class="box">
                  <a-radio-group
                    name="radioGroup"
                    @change="msourceChange"
                    v-decorator="['source_id',
                {rules: [{ required: true ,message: '请选择来源'}]}]"
                  >
                    <a-radio
                      v-for="item in sourceList"
                      :key="item.source_id"
                      :value="item.source_id"
                    >{{item.source_name}}</a-radio>
                  </a-radio-group>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :lg="{span:24,offset:0}"
          v-show="!editStstus"
          style="margin-top:20px;line-height:39px;text-align:center"
        >
          <a-button
            type="primary"
            html-type="submit"
            class="waves-effect waves-light"
            @click="addhandleSubmit"
            :loading="addSaveLoading"
          >新增一条</a-button>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :lg="{span:24,offset:0}"
          style="margin-top:50px;line-height:39px;text-align:center"
        >
          <a-button
            type="primary"
            v-if="!editStstus"
            class="waves-effect waves-light"
            @click="handleSubmit(0)"
            style="margin-right:18px"
            :loading="saveLoading"
          >保存</a-button>
          <a-button
            type="primary"
            v-else
            class="waves-effect waves-light"
            @click="editSave"
            style="margin-right:18px"
          >保存</a-button>
          <a-button @click="setForm">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import api from '@/api/index'
import moment from "moment";
import UpImg from "@views/market/upImg";
import {
  getSourceList,
  getCsdCreate,
  getContactExist,
  getSourceClassList,
  getAllSource,
  getMachCity,
  getSourceSearch,
  getMarketIndex,
  getMarketCsdAgainAllowEdit,
  getCsdAgainAllowUpdata,
  getCsdUnassignedNum
} from "@/api/market";
export default {
  name: "TableEdit",
  components: {
    UpImg
  },
  props: ["swtList"],
  data() {
    return {
      wechatData:'',
      payPreviewVisible: false,
      payPreviewImage: '',
      payTipText: '二维码',
      unassignedNum: 0,
      cusInfo: {},
      cusStatus: false,
      queryParam: {},
      formerData: {},
      showSourceTips: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      buttonCol: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12, offset: 5 }
        }
      },
      sourceList: [],
      sourceClassList: [],
      sourceUrl: undefined,
      sourceId: undefined,
      sourceName: undefined,
      mdl: {},
      addList: [],
      addListShow: false,
      columns: [
        {
          title: "客户qq",
          dataIndex: "con_qq",
          width: "18%",
          align: "center"
        },
        {
          title: "电话",
          dataIndex: "con_telephone",
          width: "18%",
          align: "center"
        },
        {
          title: "微信",
          dataIndex: "con_wx",
          width: "18%",
          align: "center"
        },
        {
          title: "自有产品",
          dataIndex: "has_product",
          scopedSlots: { customRender: "haspro" },
          width: "10%",
          align: "center"
        },
        {
          title: "客户类型",
          dataIndex: "platform",
          scopedSlots: { customRender: "stype" },
          width: "10%",
          align: "center"
        },
        // {
        //   title: "状态",
        //   dataIndex: "saveStatus",
        //   scopedSlots: { customRender: "hassave" },
        //   width: "10%",
        //   align: "center"
        // },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: "16%",
          align: "center"
        }
      ],
      editStstus: false,
      editIndex: undefined,
      saveRowkey: 0,
      conArea: undefined,
      mclass_id: undefined,
      saveLoading: false,
      addSaveLoading: false,
      mcustomer_id:'',
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
  beforeCreate() {
    this.form = this.$form.createForm(this,{name:'new'});
  },
  mounted() {
    this.obSourceClass();
    this.setForm(true);
    // this.loadSource();
    this.getUnassignedNum(0);
  },
  methods: {
    payHandleSuccess (results) {
      this.wechatData= results;
      let reads = new FileReader();
      reads.readAsDataURL(results);
      let _this= this
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
    addhandleSubmit(e){
      e.preventDefault();
      this.handleSubmit(1)
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
    msourceChange(e) {
      this.showSourceTips = false;
    },
    choseSource(e) {
      const record = {
        source_id: e.target.value
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
      this.showSourceTips = false;
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
    handleSubmit(val) {
      if(val){
        this.addSaveLoading= true
      }else{
        this.saveLoading= true
      }
      const _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          // values.source_id = _this.sourceId;
          if (values.con_qq || values.con_wx || values.con_telephone || _this.wechatData) {
            if (!values.source_id) {
              _this.showSourceTips = true;
              _this.saveLoading= false
              _this.addSaveLoading= false
              return;
            } else {
              _this.showSourceTips = false;
            }
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
            formData.append("image", _this.wechatData);
            getCsdCreate(formData)
              .then(res => {
                _this.saveLoading= false
                _this.addSaveLoading= false
                _this.getUnassignedNum(0);
                if (res.code == 200) {
                  _this.saveRowkey++;
                  values.rowkey = _this.saveRowkey;
                  values.saveStatus = false;
                  // _this.addList.push(values);
                  _this.addList = [values];
                  _this.addListShow = true;
                  _this.$message.success("保存成功");
                  _this.setForm();
                  _this.conArea = undefined;
                  _this.payPreviewImage= '';
                  _this.$refs.payImg.refresh();
                  _this.mcustomer_id= res.data.customer_id
                } else if (res.code == 400) {
                  values.saveStatus = false;
                  _this.$message.warning(res.msg);
                }
              })
              .catch(err => {
                _this.saveLoading= false
                _this.addSaveLoading= false
                _this.getUnassignedNum(0);
                _this.$message.error("保存失败，请重试");
              });
          } else {
            _this.saveLoading= false
            _this.addSaveLoading= false
            _this.getUnassignedNum(0);
            _this.$message.warning("请至少添加一种联系方式", 1);
          }
        }else{
          _this.saveLoading= false
          _this.addSaveLoading= false
        }
      });
    },
    obSourceClass() {
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
        .catch(err => {});
    },
    sourceClassChange(e) {
      this.sourceUrl = undefined;
      this.obSourceList({ class_id: e.target.value });
    },
    obSourceList(parameter) {
      getSourceList(parameter)
        .then(res => {
          this.sourceList = res.data.data;
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
    setForm(value) {
      this.mclass_id = undefined;
      this.checkedClassId&& (this.mclass_id = this.checkedClassId);
      this.showSourceTips = false;
      this.payPreviewImage= ''
      this.wechatData= ''
      const record = {
        con_name: undefined,
        con_qq: undefined,
        con_wx: undefined,
        con_telephone: undefined,
        remark: undefined,
        qq_answer: undefined,
        keyword: undefined,
        baidu_account: undefined,
        has_product: 2,
        platform: 1,
        source_id: undefined,
        con_area:'中国',
        swtform: 1
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
      this.sourceName = undefined;
      this.sourceId = undefined;
      this.sourceUrl = undefined;
      this.editStstus = false;
      this.sourceList = [];
      this.loadSource();
    },
    changeSource() {
      // this.mclass_id = undefined;
      this.showSourceTips = false;
      let isMatch = false;
      getSourceSearch({ source_info: this.sourceUrl })
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
    addplus() {
      const _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          // if (values.con_qq || values.con_wx || values.con_telephone) {
          if (true) {
            _this.sourceId && (values.source_id = _this.sourceId);
            _this.addList.push(values);
            _this.setForm();
            _this.sourceId = undefined;
            _this.sourceUrl = undefined;
            !_this.addListShow && (_this.addListShow = true);
          } else {
            _this.$message.warning("请至少添加一种联系方式", 1);
          }
        }
      });
    },
    editAddList(record) {
      this.mclass_id= undefined;
      this.payPreviewImage= '';
      this.$refs.payImg.refresh();
      let isMatch = false;
      this.queryParam = {};
      const index = this.addList.indexOf(record);
      this.editIndex = index;
      const item = this.addList[index];
      this.editStstus = true;
      this.sourceUrl = undefined
      this.sourceList = [];
      getMarketCsdAgainAllowEdit({ customer_id: this.mcustomer_id })
            .then(res => {
              this.formerData = res.data;
              this.sourceList = [res.data.m_source];
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
                qq_answer: res.data.qq_answer
              };
              // this.$refs.payImg.showImg(res.data.qr_code_url);
              this.$nextTick(() => {
                this.form.setFieldsValue({ ...sitem });
              });
              // this.getDpMember(res.data.department_id) 显示具体销售人员
            })
            .catch(err => {});
    },
    editSave() {
      const _this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.con_qq || values.con_wx || values.con_telephone || _this.payPreviewImage) {
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
            formData.append("customer_id", this.formerData.customer_id);
            if(!_this.payPreviewImage){
              formData.append("qr_code_url", "");
            }
            if(_this.wechatData){
              formData.append("image", _this.wechatData);
            }
            getCsdAgainAllowUpdata(formData)
              .then(res => {
                if (res.code == 200) {
                  values.saveStatus = false;
                  _this.saveRowkey++;
                  values.rowkey = _this.saveRowkey;
                  _this.addList.splice(this.editIndex, 1, values);
                  _this.addListShow = true;
                  _this.$message.success("保存成功");
                  _this.setForm();
                  _this.payPreviewImage= '';
                  _this.$refs.payImg.refresh();
                  _this.editStstus = false;
                  _this.conArea = undefined;
                } else if (res.code == 400) {
                  _this.$message.warning(res.msg);
                }
              })
              .catch(err => {
                _this.$message.error("保存失败，请重试");
                _this.editStstus = false;
              });
          } else {
            _this.$message.warning("请至少添加一种联系方式", 1);
          }
        }
      });
    },
    delAddList(record) {
      const index = this.addList.indexOf(record);
      this.addList.splice(index, 1);
      this.mcustomer_id= ''
      if (this.addList.length == 0) {
        this.addListShow = false;
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
        this.cusStatus = false;
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
    existArea(rule, value, callback) {
      const _this = this;
      if (value) {
        getMachCity({ con_area: value })
          .then(res => {
            if (res.code === 400) {
              callback();
              _this.conArea = undefined;
            } else if (res.code === 200) {
              _this.conArea = res.data.city_name;
              callback();
            } else {
              _this.conArea = undefined;
              callback();
            }
          })
          .catch(err => {
            _this.conArea = undefined;
            callback();
          });
      } else {
        _this.conArea = undefined;
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
    span {
      font-size: 12px;
      color: #666;
    }
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

.box {
  .ant-radio-group {
    .ant-radio-wrapper {
      width: 120px;
    }
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
  border-bottom: 1px solid #d9d9d9;
  background-color: #fefefe;
  padding-bottom: 20px;
  h5 {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 42px;
    margin: 0;
    color: #333;
  }
}
.ant-row {
  h5 {
    font-size: 14px;
    font-weight: 400;
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
</style>


