<template>
  <div class="center-box">
    <div class="show" v-show="visible">
      <div class="data-list">
        <div class="result-list">
          <h4 class="title">
            <span></span>线索列表 
            <div class="topbtn">
              <a-button class="btn-info" @click="refData">更新列表</a-button>
            </div>
          </h4>
          <a-row>
            <a-col :xs="24" :sm="24" :lg="24" :xl="5" :xxl="5" :style="{ textAlign: 'left' }">
              <div v-if="!selectedRows.length" style="height:64px;"></div>
              <a-button
              v-else
                style="margin-left:22px; margin:20px 0"
                class="btn-primary"
                size="small"
                @click="daoru"
              >选择导入</a-button>
            </a-col>
          </a-row>
          <s-table
            ref="table"
            size="default"
            rowKey="keyIndex"
            :columns="columns"
            :data="loadData"
            :alert="options.alert"
            :rowSelection="options.rowSelection"
            :scroll="{ x: 1200}"
          >
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
                  @change="e => handleChange(e.target.value, record, 'phone')"
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
                  @change="e => handleChange(e.target.value, record, 'wechat')"
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
                  @change="e => handleChange(e.target.value, record, 'leads_qq')"
                />
                <template v-else>{{text}}</template>
              </template>
            </span>
          </s-table>
        </div>
      </div>
    </div>
    <tc-information
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
import {
  getLeadsBaiduList,
  putLeadsBaidu,
  delLeadsBaidu,
  addLeadsBaidu,
  postLeadsBaiduCus
} from "@/api/market";
import STable from "@/components/table/";
import tcInformation from "./bdInformation";
import Ellipsis from '@/components/Ellipsis'
export default {
  components: {
    STable,
    tcInformation,
    props: "masog",
    Ellipsis
  },
  data() {
    return {
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
        },
        {
          title: "姓名",
          align: "center",
          dataIndex: "con_name"
        },
        {
          title: "电话",
          dataIndex: "phone",
          align: "center",
          width:200,
          scopedSlots: { customRender: "shouji" }
        },
        {
          title: "微信",
          dataIndex: "wechat",
          align: "center",
          width:200,
          scopedSlots: { customRender: "weixin" }
        },
        {
          title: "site_id",
          dataIndex: "site_id",
          align: "center",
        },
        {
          title: "page_id",
          dataIndex: "page_id",
          align: "center",
        },
        {
          title: "留言时间",
          dataIndex: "create_time",
        },
        {
          title: "操作",
          dataIndex: "con_333",
          width: "190px",
          align: "center",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      searchNum: "con_name",
      suosou: "",
      toFindTheState: false,
      jump: "1",
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
        if (this.jump == 1) {
          return getLeadsBaiduList(Object.assign(parameter, this.queryParam))
            .then(res => {
              res.data.data.forEach((item, i) => {
                item.keyIndex = i;
              });
              return res.data;
            })
            .catch(err => {
              return { data: [] };
            });
        }
      },
      start_time: "",
      end_time: "",
      values: "0",
      recordData: {}
    };
  },
  created() {},
  props: ["keys"],
  methods: {
    handleChange(value, record, column) {
      record[column] = value;
    },
    handleOk() {
      this.visible1 = false;
      if (this.jump == 1) {
        delLeadsBaidu(this.recordData.id).then(res => {
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
      parameter.baidu_id = this.transferNumber.join(",");
      postLeadsBaiduCus(parameter).then(res => {
        if (res.code == 200) {
          this.$message.success("导入成功");
          this.$refs.table.refresh(true);
        } else {
          this.$message.info(res.msg);
        }
      }).catch(err=>{
        this.$message.warning(err.response.data.msg);
      });
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
    save(record) {
      let parameter = {};
      parameter.con_name=record.con_name
      parameter.phone=record.phone
      parameter.wechat=record.wechat
      if (this.jump == 1) {
        putLeadsBaidu(record.id, parameter).then(res => {
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
    },
    refData() {
      this.$refs.table.refresh(true);
    },
    localJump(value){
      this.jump= value
    }
  }
};
</script>
<style lang="less" scoped>
.topbtn{
  margin-top: 4px;
  float: right;
}
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
    padding: 90px 24px;
    background: #fff;
    // border-bottom: 1px solid #d9d9d9;
    // -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
    margin-bottom: 30px;
    .title {
      line-height: 50px;
      padding-left: 0;
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



