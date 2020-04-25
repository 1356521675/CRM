<template>
  <div class="center-box">
    <h4 class="title"
        v-if="!seeGroupRules"><span v-if="visible">新建权限组</span><span v-else>编辑权限组</span></h4>
    <a-spin :spinning="confirmLoading"
            v-show="visible">
      <a-form class="add-form"
              :form="form"
              autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:10,offset:7}">
            <a-row :gutter="24">
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="权限组名称"
                             :colon="false">
                  <a-input placeholder="请输入名称"
                           v-decorator="['group_name', {rules: [{ validator: checkSourceName }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="是否开启"
                             :colon="false">
                  <a-switch v-decorator="['status',  { valuePropName: 'checked' }]"
                            checkedChildren="开"
                            unCheckedChildren="关" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>

          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:24,offset:0}"
                 style="margin-top:50px;line-height:39px;text-align:center">
            <a-form-item>
              <a-button type="primary"
                        class="waves-effect waves-light"
                        @click="handleSubmit">新建权限组</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <div class="ant-tabs"
         v-show="visible">
      <div class="top">
        <a-form :form="sform"
                autocomplete="off"
                @submit="handleSearch">
          <a-row :gutter="16">
            <!-- <a-col :xs="18"
                   :sm="18"
                   :lg="{span:8,offset:0}">
              <a-form-item label="来源搜索"
                           :colon="false">
                <a-input placeholder="请输入来源名称"
                         @change="checkSearch"
                         v-decorator="['source_name']" />
              </a-form-item>
            </a-col> -->
            <!-- <a-col :xs="6"
                   :sm="6"
                   :lg="{span:2,offset:0}"
                   class="mybtn">
              <a-button class="btn-custom waves-effect waves-light"
                        @click="handleSearch">搜索</a-button>
            </a-col> -->
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:9,offset:1}">
              <a-form-item label="状态筛选">
                <a-radio-group name="radioGroup"
                               v-decorator="['status']"
                               @change="showStatus">
                  <a-radio :value="99">全部</a-radio>
                  <a-radio :value="1">已开启</a-radio>
                  <a-radio :value="0">已关闭</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="bottom">
        <s-table style="height:100%;background-color:#fff;"
                 ref="table"
                 size="default"
                 rowKey="keyIndex"
                 :columns="columns"
                 :data="loadData"
                 :alert="options.alert"
                 :rowSelection="options.rowSelection">
          <span slot="serial"
                slot-scope="text, record, index">{{ index + 1 }}</span>
          <span slot="action"
                slot-scope="text, record">
            <template>
              <a-button class="btn-primary"
                        size="small"
                        @click="seeRules(record)">查看</a-button>
              <a-button class="btn-primary"
                        size="small"
                        style="margin-left:6px"
                        @click="editSource(record)">修改</a-button>
              <a-button class="btn-inverse"
                        style="margin-left:6px"
                        size="small">删除</a-button>
            </template>
          </span>
          <span slot="status"
                slot-scope="status">
            <template>
              <a-button v-if="status == 1"
                        class="btn-success btn-trans"
                        size="small">已开启</a-button>
              <a-button v-else
                        class="btn-inverse btn-trans"
                        size="small">未开启</a-button>
            </template>
          </span>
          <span slot="openstatus"
                slot-scope="text, record">
            <template>
              <a-switch checkedChildren="开"
                        unCheckedChildren="关"
                        :checked="record.status == 1"
                        @change="statusSwitch(record)" />
            </template>
          </span>
        </s-table>
      </div>
    </div>
    <e-source ref="esource"
              @ok="editSave"
              @close="editCancel" />
    <new-rule ref="newRule"
              @ok="editSave"
              @close="editCancel" />
  </div>
</template>

<script>
import moment from "moment";
import STable from "@/components/table/";
import ESource from "./editSource";
import NewRule from "./new";
import { getRuleGroup, addRuleGroup, editRuleGroup, delRuleGroup } from '@/api/manage'
export default {
  name: "TableEdit",
  components: {
    STable,
    ESource,
    NewRule
  },
  data () {
    return {
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
      confirmLoading: false,
      mdl: {},
      smdl: {},
      sourceClassList: [],
      columns: [
        {
          title: "序号",
          scopedSlots: { customRender: "serial" },
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          dataIndex: "group_name",
          width: 200,
          align: "center"
        },
        {
          title: "开启状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: 100,
          align: "center"
        },
        {
          title: "创建时间",
          dataIndex: "create_time",
          width: 200,
          align: "center"
        },
        {
          title: "修改时间",
          dataIndex: "update_time",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: 200,
          align: "center"
        },
        {
          title: "是否开启",
          scopedSlots: { customRender: "openstatus" },
          width: 100,
          align: "center"
        }
      ],
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRuleGroup(Object.assign(parameter, this.queryParam))
          .then(res => {
            let openArr= []
            let closeArr= []
            if (res.msg == "success" && res.code == 200) {
              res.data.forEach((item, i) => {
                item.keyIndex = i
                if(item.status==1){
                  openArr.push(item)
                }else{
                  closeArr.push(item)
                }
              })
              if(this.openNum==1){
                return { data: openArr };
              }else if(this.openNum==0){
                return { data: closeArr };
              }else{
                return res;
              }
            } else {
              return { data: [] };
            }
          })
          .catch(err => {
            return { data: [] };
          });
      },
      options: {
        alert: false,
        rowSelection: null
      },
      optionAlertShow: false,
      openNum: 99,
      visible: true,
      group_id: '',
      seeGroupRules: false
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
    this.sform = this.$form.createForm(this);
  },
  mounted () {
    this.setForm()
    this.setSForm()
  },
  methods: {
    handleSearch (e) {
      e.preventDefault();
      this.sform.validateFields((err, values) => {
        this.queryParam.source_name = values.source_name
        this.$refs.table.refresh(true)
      });
    },
    checkSearch (e) {
      if (this.queryParam.source_name && !e.target.value) {
        this.queryParam = []
        if (this.openNum < 99) {
          this.queryParam.source_status = this.openNum
        } else {
          this.queryParam.source_status = undefined
        }
        this.$refs.table.refresh(true)
      }
    },
    editSource (item) {
      this.visible = false
      this.$refs.esource.add(item)
    },
    seeRules (item) {
      this.visible = false
      this.seeGroupRules = true
      this.$refs.newRule.loadPage(item.group_id)
    },
    editCancel () {
      this.visible = true
      this.seeGroupRules = false
    },
    editSave () {
      if (this.openNum == 99) {
        // this.$refs.table.refresh();
      } else {
        this.$refs.table.refresh(true);
      }
    },
    handleSubmit () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          let parameter = {
            group_name: values.group_name,
            status: values.status == true ? 1 : 0,
          }
          _this.confirmLoading = true
          addRuleGroup(parameter).then(res => {
            if (res.code == 200) {
              _this.$message.success('保存成功')
              _this.confirmLoading = false
              _this.setForm()
              _this.$refs.table.refresh(true);
            } else {
              _this.confirmLoading = false
              _this.$message.warning(res.msg)
            }
          }).catch((err) => {
            if (err.response.status === 400) {
              _this.confirmLoading = false
              _this.$message.error(err.response.data.msg)
            } else {
              _this.confirmLoading = false
            }
          }).finally(() => {

          })
        }
      })
    },
    delRules (record) {
      delRuleGroup(record.group_id).then(res => {
        if (res.code == 200) {
          _this.$message.success('删除成功')
          _this.$refs.table.refresh(true);
        } else {
          _this.confirmLoading = false
          _this.$message.warning(res.msg)
        }
      }).catch((err) => {
        if (err.response.status === 400) {
          _this.confirmLoading = false
          _this.$message.error(err.response.data.msg)
        } else {
          _this.confirmLoading = false
        }
      }).finally(() => {

      })
    },
    setForm () {
      const record = {
        group_name: undefined,
        status: true,
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      })
    },
    setSForm () {
      const record = {
        status: 99,
      };
      this.smdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.sform.setFieldsValue({ ...record });
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    statusSwitch (record) {
      const _this = this;
      let parameter = {
        group_name: record.group_name,
        status: record.status == 1 ? 0 : 1,
      };
      editRuleGroup(record.group_id, parameter)
        .then(res => {
          if (res.code == 200) {
            _this.$message.success("状态修改成功", 0.5);
            record.status = parameter.status;
            if (_this.openNum == 99) {
              // _this.$refs.table.refresh();
            } else {
              _this.$refs.table.refresh(true);
            }
          } else if (res.code == 400) {
            _this.$message.warning(res.msg, 0.5);
          }
        })
        .catch(err => {
          // Do something
        })
        .finally(() => { });
    },
    seeSource (num) {
      this.openNum = num;
      this.$refs.table.refresh(true);
    },
    showStatus (e) {
      this.openNum = e.target.value;
      this.queryParam={}
      // if (this.openNum < 99) {
      //   this.queryParam.status = this.openNum
      // } else {
      //   this.queryParam.status = undefined
      // }
      this.$refs.table.refresh(true);
    },
    checkSourceId (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请选择来源分类!');
    },
    checkSourceName (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入名称!');
    },
    checkSourceUrl (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback();
    },
    checkSourceSname (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入标识!');
    },
    checkSourceCount (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入账户ID!');
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

.ant-form-item {
  display: flex;
  /deep/.ant-form-item-label {
    width: 90px;
    text-align: left;
  }
  /deep/.ant-form-item-control-wrapper {
    width: 100%;
    .ant-form-item-control {
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
.ant-tabs {
  box-sizing: border-box;
  background-color: #fefefe;
  margin: 20px 20px 0;
  /deep/.ant-table-wrapper {
    background-color: #fff;
  }
  /deep/ .ant-table-thead {
    th {
      padding: 12px 18px;
    }
  }
  /deep/ .ant-table-tbody {
    td {
      padding: 10px 18px;
    }
  }
}
.mybtn {
  padding-top: 4px;
}
</style>


