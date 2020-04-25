<template>
  <div class="center-box">
    <div class="top" v-show="visible">
      <h4 class="title">一键分配</h4>
      <a-form class="add-form" :form="form" autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :lg="24">
            <a-form-item>
              <label style="margin-right:6px;color:#333;">选择系统</label>
              <a-radio-group name="radioGroup" v-decorator="['sysform']">
                <a-radio v-for="(item, index) in systemList"
                      :key="index"
                      :value="item.id">{{item.name}}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="{span:12,offset:0}">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item>
                  <span style="display:inline-block;margin-right:100px;color:#333">
                    待分配：
                    <span style="color:#999">{{unassignedNum}}</span>
                  </span>
                  <label style="margin-right:6px;color:#333;">输入分配数量</label>
                  <a-input-number
                    v-decorator="['customer_num',{rules: [{ required: false ,message: '请输入分配数量'}]}]"
                    :min="0"
                    :max="maxassignedNum"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item>
                  <label style="margin-right:6px;color:#333;">客户类型</label>
                  <a-radio-group name="radioGroup" @change="platChange" v-decorator="['platform']">
                    <a-radio :value="0">全部</a-radio>
                    <a-radio :value="1">淘宝</a-radio>
                    <a-radio :value="2">拼多多</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:6,offset:0}"
            style="margin-top:0px;line-height:39px;text-align:left">
            <a-form-item>
              <a-button type="primary" class="waves-effect waves-light" @click="handleSubmit">一键分配</a-button>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="{span:24,offset:0}">
            <a-row>
              <a-col :xs="24" :sm="24" :lg="{span:12,offset:0}">
                <a-row>
                  <a-col :xs="24" :sm="24" :lg="{span:24,offset:0}">
                    <h5>销售选择</h5>
                    <a-form-item>
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
              <a-col :xs="24" :sm="24" :lg="{span:12,offset:0}" v-show="sellerMeb.length>0">
                <a-row class="seller-group">
                  <a-col :xs="24" :sm="24" :lg="{span:24,offset:0}">
                    <a-form-item>
                      <div class="totalNum">
                        <span
                          style="display:inline-block;margin-right:40px;"
                        >设置总量：{{totalNum.total_set_num}}</span>
                        <span>已分总量：{{totalNum.total_allot_num}}</span>
                      </div>
                      <div
                        style="border-top: 1px solid #d9d9d9;border-bottom: 1px solid #d9d9d9;"
                        v-decorator="['user_ids',
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
                              <div :class="{hide: loginSellerMeb.length<1}">
                                <a-checkbox
                                  :indeterminate="indeterminate"
                                  @change="onCheckAllChange"
                                  :checked="checkAll"
                                >全选</a-checkbox>
                                {{checkedList.length?checkedList.length:''}}
                              </div>
                              <a-row>
                                <a-col
                                  :xs="24"
                                  :sm="24"
                                  :lg="loginlabelCol.left.clg"
                                  v-for="user in loginSellerMeb"
                                  :key="user.user_id"
                                >
                                  <a-checkbox
                                    :checked="user.checked"
                                    @change="onChange"
                                    :value="user.user_id"
                                  >
                                    <span class="green">{{user.user_name}}</span>
                                    （{{user.allot_num}}）
                                    <span
                                      :class="{red: user.allot_num < user.set_num}"
                                    >{{user.set_num}}</span>
                                    <span class="small">(8.22)</span>
                                  </a-checkbox>
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
                              <div :class="{hide: unloginSellerMeb.length<1}">
                                <a-checkbox
                                  :indeterminate="indeterminateRight"
                                  @change="onCheckAllRight"
                                  :checked="checkRightAll"
                                >全选</a-checkbox>
                                {{checkedListRight.length?checkedListRight.length:''}}
                              </div>
                              <a-row>
                                <a-col
                                  :xs="24"
                                  :sm="24"
                                  :lg="loginlabelCol.right.clg"
                                  v-for="user in unloginSellerMeb"
                                  :key="user.user_id"
                                >
                                  <a-checkbox
                                    :disabled="user.set_num==0"
                                    :checked="user.checked"
                                    @change="onRightChange"
                                    :value="user.user_id"
                                  >
                                    <span
                                      :class="{grey: user.login_status== 0,green: user.login_status== 1}"
                                    >{{user.user_name}}</span>
                                    （{{user.allot_num}}
                                    <span
                                      class="red"
                                    >{{user.set_num}}</span>
                                    <span class="small">(8.22)</span>
                                  </a-checkbox>
                                </a-col>
                              </a-row>
                            </div>
                          </a-col>
                        </a-row>
                      </div>
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
            </a-row>
          </a-col>
        </a-row>
      </a-form>
      <div class="data-list" v-show="true">
        <h4 class="title">
          <span></span>最近分配
        </h4>
        <div class="result-list">
          <s-table
            ref="table"
            size="default"
            rowKey="keyIndex"
            :columns="columns"
            :data="loadData"
            :customRow="tableDbClick"
            :scroll="{ x: 600}"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a-button class="btn-primary" size="small" @click="edit(record)">修改</a-button>
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
    <edit-customer v-show="!visible" ref="editCusForms" @ok="handleSaveOk" @cancel="cancelEdit" />
  </div>
</template>

<script>
import { tableDbClick } from "@/components/_util/util.js";
import moment from "moment";
import STable from "@/components/table/";
import editCustomer from "./editCustomers";
import { getDepartment, getDpUser } from "@/api/manage";
import {
  getSourceList,
  getCsdCreate,
  getContactExistget,
  getSourceClassList,
  getAllSource,
  getCsdSaleDep,
  getCsdSaleDpMember,
  getSourceSearch,
  getCsdUnassignedNum,
  getCsdBatchAllow,
  getMarketIndex
} from "@/api/market";
import { platform } from "os";
export default {
  name: "TableEdit",
  components: {
    STable,
    editCustomer
  },
  props: ['systemList'],
  data() {
    return {
      visible: true,
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
      rightSellerMeb: [],
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
          title: "分配人员",
          dataIndex: "allot_user_id.name"
        },
        {
          title: "销售人员",
          dataIndex: "user_id.name",
          scopedSlots: { customRender: "username" }
        },
        {
          title: "关键词",
          dataIndex: "keyword",
          align: "center"
        },
        {
          title: "所在区域",
          dataIndex: "con_area",
          align: "center"
        },
        {
          title: "客户qq",
          dataIndex: "con_qq",
          align: "center"
        },
        {
          title: "电话",
          dataIndex: "con_telephone",
          align: "center"
        },
        {
          title: "微信",
          dataIndex: "con_wx",
          align: "center"
        },
        {
          title: "来源",
          dataIndex: "source_id.name",
          align: "center"
        },
        {
          title: "推送系统",
          dataIndex: "",
          align: "center"
        },
        {
          title: "分配时间",
          dataIndex: "allot_time",
          align: "center"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      loadData: parameter => {
        return getMarketIndex({ show: "top10" })
          .then(res => {
            res.data.forEach((item, i) => {
              item.keyIndex = i;
            });
            return res;
          })
          .catch(err => {
            return { data: [] };
          });
      },
      qqisExisted: false,
      wxisExisted: false,
      phoneisExisted: false,
      unassignedNum: "",
      maxassignedNum: 10,
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      plainOptions: [],
      checkDpId: "",
      platId: 0,
      totalNum: {
        total_allot_num: "",
        total_set_num: ""
      },
      checkRightAll: false,
      indeterminateRight: false,
      checkedListRight: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this,{name:'unAssigned'});
  },
  mounted() {
    this.obSourceClass();
    this.setForm();
    this.getDplist();
    this.getUnassignedNum(0);
  },
  methods: {
    tableDbClick,
    cusdblclick(record) {
      this.edit(record);
    },
    handleSaveOk() {
      this.visible = !this.visible;
      this.$refs.table.refresh(true);
    },
    edit(record) {
      this.visible = !this.visible;
      this.$refs.editCusForms.editCus(record);
    },
    cancelEdit() {
      this.visible = !this.visible;
    },
    refreshData() {
      this.obSourceClass();
      this.setForm();
      this.getDplist();
      this.getUnassignedNum(0);
      this.$refs.table.refresh(true);
    },
    onChange(e) {
      if (e.target.checked) {
        this.checkedList.push(e.target.value);
        if (this.plainOptions.indexOf(e.target.value) != -1) {
          this.loginSellerMeb.forEach(item => {
            if (e.target.value == item.user_id) {
              item.checked = e.target.checked;
            }
          });
        } else {
          this.unloginSellerMeb.forEach(item => {
            if (e.target.value == item.user_id) {
              item.checked = e.target.checked;
            }
          });
        }
      } else {
        let index = this.checkedList.indexOf(e.target.value);
        this.checkedList.splice(index, 1);
        if (this.plainOptions.indexOf(e.target.value) != -1) {
          this.loginSellerMeb.forEach(item => {
            if (e.target.value == item.user_id) {
              item.checked = e.target.checked;
            }
          });
        } else {
          this.unloginSellerMeb.forEach(item => {
            if (e.target.value == item.user_id) {
              item.checked = e.target.checked;
            }
          });
        }
      }
      if (this.checkedList.length == this.loginSellerMeb.length) {
        this.checkAll = true;
        this.indeterminate = false;
      } else if (this.checkedList.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    onRightChange(e) {
      if (e.target.checked) {
        this.checkedListRight.push(e.target.value);
        this.unloginSellerMeb.forEach(item => {
          if (e.target.value == item.user_id) {
            item.checked = e.target.checked;
          }
        });
      } else {
        let index = this.checkedListRight.indexOf(e.target.value);
        this.checkedListRight.splice(index, 1);
        this.unloginSellerMeb.forEach(item => {
          if (e.target.value == item.user_id) {
            item.checked = e.target.checked;
          }
        });
      }
      if (this.checkedListRight.length == this.rightSellerMeb.length) {
        this.checkRightAll = true;
        this.indeterminateRight = false;
      } else if (this.checkedListRight.length > 0) {
        this.indeterminateRight = true;
        this.checkRightAll = false;
      } else {
        this.indeterminateRight = false;
        this.checkRightAll = false;
      }
    },
    onCheckAllChange(e) {
      const _this = this;
      if (e.target.checked) {
        this.checkAll = true;
        this.checkedList = [];
        this.indeterminate = false;
        this.loginSellerMeb.forEach(item => {
          item.checked = e.target.checked;
          this.checkedList.push(item.user_id);
        });
      } else {
        this.checkAll = false;
        this.indeterminate = false;
        this.loginSellerMeb.forEach(item => {
          item.checked = e.target.checked;
        });
        this.checkedList = [];
      }
    },
    onCheckAllRight(e) {
      const _this = this;
      if (e.target.checked) {
        this.checkedListRight = [];
        this.unloginSellerMeb.forEach(item => {
          if (item.set_num != 0) {
            item.checked = true;
            this.checkedListRight.push(item.user_id);
          } else {
            item.checked = false;
          }
        });
        this.checkRightAll = true;
        this.indeterminateRight = false;
      } else {
        this.checkRightAll = false;
        this.indeterminateRight = false;
        this.unloginSellerMeb.forEach(item => {
          item.checked = e.target.checked;
        });
        this.checkedListRight = [];
      }
    },
    getUnassignedNum(num) {
      getCsdUnassignedNum({ platform: num })
        .then(res => {
          if (res.code == 200) {
            this.unassignedNum = res.data.number;
            this.maxassignedNum = this.unassignedNum;
          }
        })
        .catch(err => {
          
        });
    },
    platChange(e) {
      this.platId = e.target.value;
      this.getUnassignedNum(e.target.value);
      const record = {
        customer_num: undefined
      };
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
    handleSubmit() {
      const _this = this;
      let userIds = "";
      // _this.$message.warning("无法提交，暂无接口", 1);
      _this.checkedList.forEach(item => {
        userIds += item + ",";
      });
      if (_this.checkedList.length > 0) {
        userIds =
          _this.checkedList.join(",") + "," + _this.checkedListRight.join(",");
      } else {
        userIds = _this.checkedListRight.join(",");
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          values.user_ids = userIds;
          if (!values.customer_num) {
            this.$message.warning("请输入分配数", 1);
            return;
          }
          if (userIds) {
            _this.$confirm({
              title: "提示",
              content: "确认执行一键分配吗？",
              okText: "确认",
              cancelText: "取消",
              center: true,
              onOk() {
                getCsdBatchAllow(values)
                  .then(res => {
                    _this.$refs.table.refresh(true);
                    if (res.code == 200) {
                      _this.$message.success("分配成功", 1);
                      _this.checkedList = [];
                      _this.checkAll = false;
                      _this.indeterminate = false;
                      _this.checkedListRight = [];
                      _this.checkRightAll = false;
                      _this.indeterminateRight = false;
                      _this.getDpMember(_this.checkDpId);
                      _this.getUnassignedNum(_this.platId);
                      const record = {
                        customer_num: undefined
                      };
                      _this.$nextTick(() => {
                        _this.form.setFieldsValue({ ...record });
                      });
                    } else if (res.code == 400) {
                      _this.$message.warning(res.msg, 1.5);
                    }
                  })
                  .catch(err => {
                    _this.$refs.table.refresh(true);
                  });
              },
              onCancel() {}
            });
          } else {
            this.$message.warning("请选择具体的销售人员", 1);
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
    clearSelect() {
      this.checkAll = false;
      this.checkRightAll = false;
      this.checkedListRight = [];
      this.checkedList = [];
      this.indeterminate = false;
      this.indeterminateRight = false;
    },
    getDpMember(id) {
      this.sellerInfo = [];
      this.clearSelect();
      getCsdSaleDpMember(id)
        .then(res => {
          if (res.code == 200) {
            this.sellerMeb = res.data.info;
            this.loginSellerMeb = [];
            this.unloginSellerMeb = [];
            this.rightSellerMeb = [];
            this.plainOptions = [];
            this.totalNum.total_allot_num = res.data.total_allot_num;
            this.totalNum.total_set_num = res.data.total_set_num;
            res.data.info.forEach(item => {
              if (item.login_status == 1 && item.set_num > item.allot_num) {
                item.checked = false;
                this.loginSellerMeb.push(item);
                this.plainOptions.push(item.user_id);
              } else {
                item.checked = false;
                if (item.login_status == 1) {
                  this.unloginSellerMeb.unshift(item);
                } else {
                  this.unloginSellerMeb.push(item);
                }
                if (item.set_num != 0) {
                  this.rightSellerMeb.push(item);
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
    sellerChange(e) {
      const record = {
        source_id: undefined
      };
      this.checkDpId = e.target.value;
      // this.mdl = Object.assign({}, record);
      this.form.setFieldsValue({ ...record });
      this.getDpMember(e.target.value);
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
    obAllSource(parameter) {
      getAllSource(parameter)
        .then(res => {
          this.sourceList = res.data;
        })
        .catch(err => {});
    },
    setForm() {
      this.sellerMeb = [];
      const record = {
        platform: 0,
        user_ids: undefined,
        department_id: undefined,
        customer_num: undefined
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    chooseSeller(e) {
      this.sellerMeb.forEach(item => {
        if (e.target.value == item.user_id) {
          this.sellerInfo = item;
        }
      });
      
    }
  }
};
</script>

<style lang="less" scoped>
.center-box {
  box-sizing: border-box;
  padding: 0;
  .top {
    padding-bottom: 30px;
  }
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
  .listbox {
    .ant-checkbox-group-item {
      span:nth-last-of-type(1) {
        color: #009688;
      }
    }
    .hide {
      display: none;
    }
    .green {
      color: #009688;
    }
    .grey {
      color: #c0c0c0;
    }
    .red {
      color: #e84e7f;
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
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
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
.data-list {
  .title {
    line-height: 50px;
    padding-left: 20px;
    background-color: #fff;
    border: 0;
    span {
      display: inline-block;
      vertical-align: middle;
      height: 24px;
      width: 5px;
      background-color: #555;
      margin: 6px;
    }
  }
  .result-list {
    margin: 0 20px;
  }
}
</style>




