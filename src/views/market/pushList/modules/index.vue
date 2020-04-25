<template>
  <div class="center-box">
    <div class="show" v-show="visible">
      <h4 class="title">推送列表</h4>
      <div class="data-list">
        <div class="tab-content" style="border:none">
          <a-form
            class="ant-advanced-search-form"
            autocomplete="off"
            :form="form"
            @submit="handleSearch">
            <a-row :gutter="0">
              <a-col
              :xs="24"
              :sm="24"
              :lg="{span:16,offset:0}"
              :xl="{span:12,offset:0}"
              :xxl="{span:9,offset:0}"
              class="mylabel">
              <a-form-item :colon="false" label="分配时间">
                <a-range-picker
                  style="width:100%"
                  :placeholder="['开始时间', '结束时间']"
                  v-decorator="['my_timer']"
                  :format="dateFormat"
                  :showTime="{
                    hideDisabledOptions: true, 
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                  }"
                  :disabledDate="cusdisabledDate"
                />
              </a-form-item>
            </a-col>
              <a-col
                :xs="24"
                :sm="24"
                :lg="16"
                :xl="12"
                :xxl="8"
                style="margin-top: 10px; margin-left:6px"
              >
                <span style="margin-right:6px; font-weight: 600;">推送状态</span>
                <a-radio-group name="radioGroup" defaultValue @change="onChanges" v-model="values">
                  <a-radio value="0">未推送</a-radio>
                  <a-radio value="1">已推送</a-radio>
                  <a-radio value="2">重复数据</a-radio>
                  <a-radio value>全部</a-radio>
                </a-radio-group>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="8" :xl="2" :xxl="1" :style="{ textAlign: 'left' }">
                <a-button style="margin-left:2px" type="primary" html-type="submit">查询</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="result-list">
          <s-table
            ref="table"
            size="default"
            rowKey="keyIndex"
            :columns="columns"
            :data="loadData"
            :scroll="{ x: 1800}">
            <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
            <span slot="hrefbox" slot-scope="text">
              <template>
                <ellipsis :length="54" tooltip>
                  {{text}}
                </ellipsis>
              </template>
            </span>
            <span slot="msgbox" slot-scope="text">
              <template>
                <ellipsis :length="100" tooltip>
                  {{text}}
                </ellipsis>
              </template>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a-button
                  class="btn-primary"
                  size="small"
                  :disabled="values !=0 ||values == ''"
                  @click="save(record)"
                >保存</a-button>
                <a-button
                  style="margin-left:3px"
                  class="btn-primary"
                  size="small"
                  @click="edit(record)"
                >修改</a-button>
                <a-button
                  style="margin-left:3px"
                  type="danger"
                  size="small"
                  @click="delect(record)"
                >删除</a-button>
              </template>
            </span>
            <span slot="shouji" slot-scope="text, record">
              <template>
                <a-input
                  style="margin: -5px 0"
                  v-if="values =='0'"
                  placeholder="电话号码"
                  :value="text"
                  @change="e => handleChange(e.target.value, record, 'user_phone')"
                />
                <template v-else>{{text}}</template>
              </template>
            </span>
            <span slot="weixin" slot-scope="text, record">
              <template>
                <a-input
                  v-if="values =='0'"
                  style="margin: -5px 0"
                  placeholder="微信号"
                  :value="text"
                  @change="e => handleChange(e.target.value, record, 'user_wx')"
                />
                <template v-else>{{text}}</template>
              </template>
            </span>
            <span slot="qq" slot-scope="text, record">
              <template>
                <a-input
                  v-if="values =='0'"
                  style="margin: -5px 0"
                  placeholder="QQ号码"
                  :value="text"
                  @change="e => handleChange(e.target.value, record, 'user_qq')"
                />
                <template v-else>{{text}}</template>
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
    <product-information
      v-show="!visible"
      ref="editCusForm"
      @ok="handleSaveOk"
      @cancel="cancelEdit"
    />
    <a-modal title="提示" v-model="visible1" @ok="handleOk">
      <p>温馨提示：确定将当前数据删除吗？</p>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import {
  getmessageBoard,
  getPddmessageBoard,
  getLeaveAmessageToImport,
  getPddLeaveAmessageToImport,
  getDeleteTheMessaget,
  getPddDeleteTheMessaget,
  getUpdateMessage,
  getPddUpdateMessage
} from "@/api/market";
import STable from "@/components/table/";
import productInformation from "./productInformation";
import Ellipsis from '@/components/Ellipsis'
export default {
  components: {
    STable,
    productInformation,
    props: "masog",
    Ellipsis
  },
  data() {
    return {
      dateFormat: "YYYY-MM-DD HH:mm:ss",
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {
        status: "0"
      },
      visible: true,
      visible1: false,
      checkTheStatus: false,
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "serial" },
          width: "80px",
          fixed: "left"
        },
        {
          title: "推送状态",
          width: "120px",
          fixed: "left",
          dataIndex: "import_status.text"
        },
        {
          title: "姓名",
          width: "120px",
          align: "center",
          dataIndex: "user_name"
        },
        {
          title: "手机",
          dataIndex: "user_phone",
          width: "200px",
          align: "center",
          scopedSlots: { customRender: "shouji" }
        },
        {
          title: "微信",
          dataIndex: "user_wx",
          width: "200px",
          align: "center",
          scopedSlots: { customRender: "weixin" }
        },
        {
          title: "QQ",
          dataIndex: "user_qq",
          width: "200px",
          align: "center",
          scopedSlots: { customRender: "qq" }
        },
        {
          title: "推送系统",
          dataIndex: "host",
          width: "100px"
        },
        {
          title: "创建时间",
          dataIndex: "add_time",
          width: "200px",
          scopedSlots: { customRender: "openstatus" }
        },
        {
          title: "操作",
          width: "190px",
          align: "center",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      searchNum: "con_name",
      suosou: "",
      toFindTheState: false,
      transferNumber: [],
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = [];
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
          return getmessageBoard(Object.assign(parameter, this.queryParam))
            .then(res => {
              res.data.data.forEach((item, i) => {
                item.keyIndex = i;
              });
              return res.data;
            })
            .catch(err => {
              return { data: [] };
            });
      },
      start_time: "",
      end_time: "",
      values: "0",
      recordData: {}
    };
  },
  created() {},
  methods: {
    moment,
    cusdisabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf("day");
    },
    handleChange(value, record, column) {
      record[column] = value;
    },
    handleOk() {
      this.visible1 = false;
      if (this.jump == 1) {
        getDeleteTheMessaget(this.recordData.id).then(res => {
          if (res.code == 200) {
            this.$refs.table.refresh(true);
            this.$message.success("删除成功");
          } else {
            this.$message.info(res.msg);
          }
        });
      } else if (this.jump == 2) {
        getPddDeleteTheMessaget(this.recordData.id).then(res => {
          if (res.code == 200) {
            this.$refs.table.refresh(true);
            this.$message.success("删除成功");
          } else {
            this.$message.info(res.msg);
          }
        });
      }
    },
    onChanges(e) {
      this.values = e.target.value;
      //   this.zhuangtai = false;
    },
    daoru() {
      this.transferNumber = [];
      this.selectedRows.forEach(item => {
        this.transferNumber.push(item.id);
      });
      let parameter = {};
      parameter.ids = this.transferNumber.join(",");
      if (this.jump == 1) {
        getLeaveAmessageToImport(parameter).then(res => {
          if (res.code == 200) {
            this.$message.success("导入成功");
            this.$refs.table.refresh(true);
          } else {
            this.$message.info(res.msg);
          }
        });
      } else if (this.jump == 2) {
        getPddLeaveAmessageToImport(parameter).then(res => {
          if (res.code == 200) {
            this.$message.success("导入成功");
            this.$refs.table.refresh(true);
          } else {
            this.$message.info(res.msg);
          }
        });
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
      if (this.selectedRowKeys.length > 0) {
        this.showOperate = true;
      } else {
        this.showOperate = false;
      }
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        this.queryParam.start_time = this.start_time;
        this.queryParam.end_time = this.end_time;
        this.queryParam.status = this.values;
        this.queryParam.contact = this.suosou;
        this.$refs.table.refresh(true);
      });
    },
    cusdateChange(date, dateString) {
      this.start_time = dateString[0];
      this.end_time = dateString[1];
    },

    localJump(index) {
      this.jump = index;
      this.queryParam.status = this.values;
      this.$refs.table.refresh(true);
    },
    save(record) {
      
      let parameter = {};
      parameter.user_name = record.user_name;
      parameter.user_phone = record.user_phone;
      parameter.user_wx = record.user_wx;
      parameter.user_qq = record.user_qq;
      parameter.user_message = record.user_message;
      parameter.import_status = record.import_status.value;
      if (this.jump == 1) {
        getUpdateMessage(record.id, parameter).then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
            // this.$refs.table.refresh(true);
          } else {
            this.$message.info(res.msg);
          }
        });
      } else if (this.jump == 2) {
        getPddUpdateMessage(record.id, parameter).then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
            // this.$refs.table.refresh(true);
          } else {
            this.$message.info(res.msg);
          }
        });
      }
    },
    edit(record) {
      this.visible = !this.visible;
      if (this.jump == 1) {
        this.$refs.editCusForm.editCus(record);
      } else if (this.jump == 2) {
        this.$refs.editCusForm.addstatus(record);
      }
    },
    delect(record) {
      this.visible1 = true;
      this.recordData = record;
    },
    cancelEdit() {
      this.visible = !this.visible;
    },
    handleSaveOk() {
      this.$refs.table.refresh(true);
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
  .ant-advanced-search-form {
    padding: 40px 24px;
    background: #fff;
    button {
      margin-top: 4px;
    }

    .ant-form-item-control-wrapper {
      flex: 1;
    }
    .ant-form-item {
      display: flex;
      // margin-bottom: 0;
      .ant-form-item-label {
        label {
          display: inline-block;
          width: 82px;
          text-align: left;
        }
      }
      .ant-form-item-control-wrapper {
        width: 100%;
        .ant-form-item-control {
          .myselect {
            box-sizing: border-box;
            padding-left: 65px;
            position: relative;
            .selectlabel {
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .ant-form-item-children {
            display: inline-block;
            width: 100%;
            .ant-radio-group {
              .ant-radio-wrapper {
                span.ant-radio + * {
                  padding-left: 5px;
                  padding-right: 0;
                }
              }
            }
          }
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
      .ant-table-thead {
        th {
          padding: 12px 18px;
        }
      }
      .ant-table-tbody {
        td {
          padding: 12px 18px;
        }
      }
    }
  }
}
</style>
<style  scoped>
.center-box >>> .tab-content .ant-tabs-top {
  border: 0;
  margin: 0;
  padding: 0;
}
.center-box >>> .tab-content .ant-tabs-bar {
  margin: 0;
}
.center-box >>> .tab-content .ant-tabs-content {
  display: none;
  height: 0px;
  overflow: hidden;
}
.center-box >>> .tab-content .ant-tabs-bar .ant-tabs-nav-container {
  border: 0;
  border-bottom: 1px solid #e1e3e4;
  background: #fff;
}
.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-disabled,
.ant-tabs-nav .ant-tabs-tab-disabled:hover {
  cursor: default;
  color: #000;
}

.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-nav-wrap
  .ant-tabs-nav
  .ant-tabs-tab {
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin: 0;
  width: 100px;
  padding: 0;
}
.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active {
  background-color: #447ed9;
  color: #fff;
}

.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-ink-bar {
  height: 0;
  display: none;
}

.center-box
  >>> .tab-content
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-disabled {
  background-color: #f9f9f9;
  color: #000;
}

.center-box
  >>> .tab-content
  .hideTabActive
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active {
  background-color: #f9f9f9;
  color: #666;
}
.center-box
  >>> .tab-content
  .hideTabActive
  .ant-tabs-bar
  .ant-tabs-nav-container
  .ant-tabs-tab-active:hover {
  color: #447ed9;
}
</style>



