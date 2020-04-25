<template>
  <div class="center-box">
    <h4 class="title"
        v-if="seeStatus"><span v-if="visible">新建权限</span><span v-else>编辑权限</span></h4>
    <a-spin :spinning="confirmLoading"
            v-show="visible">
      <a-form class="add-form"
              :form="form"
              autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24"
                 :sm="24"
                 :lg="{span:14,offset:5}">
            <a-row :gutter="24">
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="名称"
                             :colon="false">
                  <a-input placeholder="请输入名称"
                           v-decorator="['rule_name', {rules: [{ validator: checkClassName }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="操作"
                             :colon="false">
                  <a-input placeholder="请输入路径"
                           v-decorator="['operate',]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="注释"
                             :colon="false">
                  <a-input placeholder="请输入名称"
                           v-decorator="['rule_desc',]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="类别"
                             :colon="false">
                  <a-input-number v-decorator="['type',{rules: [{ required: false, message: '请输入数字，0或2' }],validateTrigger: 'change'}]" />
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
                        @click="handleSubmit">新建权限</a-button>
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
            <!-- <a-col :xs="24"
                   :sm="24"
                   :lg="{span:8,offset:0}">

              <a-form-item label="分类搜索"
                           :colon="false">
                <a-input placeholder="请输入分类名称"
                         @change="checkSearch"
                         v-decorator="['class_name']" />
              </a-form-item>
            </a-col>-->
            <a-col :xs="6"
                   :sm="6"
                   :lg="{span:3,offset:0}"
                   class="mybtn">
              <a-button v-if="seeStatus"
                        class="btn-info waves-effect waves-light"
                        @click="close">返回权限组列表</a-button>
              <!-- <a-button class="btn-custom waves-effect waves-light"
                          @click="handleSearch">搜索</a-button> -->
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:9,offset:2}">
              <a-form-item label="状态筛选">
                <a-radio-group name="radioGroup"
                               v-decorator="['class_id']"
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
          <span slot="namebox"
                slot-scope="text, record">
            <template>
              <a-input v-if="record.editable"
                       style="margin: -5px 0"
                       :value="text"
                       @change="e => handleChange(e.target.value, record)" />
              <template v-else>{{text}}</template>
            </template>
          </span>
          <span slot="sortbox"
                slot-scope="text, record">
            <template>
              <a-input :value="text"
                       type="number"
                       :min="0"
                       @pressEnter="e =>sortChangeSave(e,record)"
                       @change="e => sortChange(e, record)"
                       @blur="resortChange(record)" />
            </template>
          </span>
          <span slot="action"
                slot-scope="text, record">
            <template>
              <a-button class="btn-primary"
                        size="small"
                        @click="() => editSClass(record)">修改</a-button>
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
                        :disabled="record.editable"
                        @change="statusSwitch(record)" />
            </template>
          </span>
        </s-table>
      </div>
    </div>
    <esource-class ref="esource"
                   @ok="editSave"
                   @close="editCancel" />
  </div>
</template>

<script>
import moment from "moment";
import STable from "@/components/table/";
import EsourceClass from "./editSourceClass";
import { getRuleList, getRuleById, addRule, editRule, delRule } from '@/api/manage'
export default {
  name: "TableEdit",
  components: {
    STable,
    EsourceClass
  },
  data () {
    return {
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
          dataIndex: "rule_name",
          // scopedSlots: { customRender: "namebox" },
          width: 180,
          align: "center"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: 100,
          align: "center"
        },
        {
          title: "类别",
          dataIndex: "type",
          width: 100,
          align: "center",
        },
        // {
        //   title: "排序",
        //   dataIndex: "class_sort",
        //   width: 100,
        //   scopedSlots: { customRender: "sortbox" },
        //   align: "center",
        // },
        {
          title: "备注",
          dataIndex: "rule_desc",
          width: 200,
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          width: 100,
          align: "center"
        },
        {
          title: "是否开启",
          // dataIndex: "source_status",
          scopedSlots: { customRender: "openstatus" },
          width: 100,
          align: "center"
        }
      ],
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRuleList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.msg == "success" && res.code == 200) {
              let resData = []
              res.data.forEach((item, i) => {
                item.keyIndex = i
                if (this.group_id == item.group_id) {
                  resData.push(item)
                }
              })
              return { data: resData };
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
      visible: false,
      group_id: '',
      seeStatus: false
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
    close () {
      this.$emit("close");
      this.visible = false;
      this.seeStatus = false
    },
    loadPage (id) {
      this.group_id = id
      this.visible = true
      this.seeStatus = true
      this.$refs.table.refresh(true)
    },
    handleSearch (e) {
      e.preventDefault();
      this.sform.validateFields((err, values) => {
        this.queryParam.class_name = values.class_name
        this.$refs.table.refresh(true)
      });
    },
    checkSearch (e) {
      if (this.queryParam.class_name && !e.target.value) {
        this.openNum = 99
        this.queryParam.class_name = undefined
        this.$refs.table.refresh(true)
      }
    },
    editSClass (item) {
      this.visible = false
      this.$refs.esource.add(item)
    },
    editCancel () {
      this.visible = true
    },
    editSave () {
      this.$refs.table.refresh(true);
    },
    handleSubmit () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          let parameter = {
            rule_name: res.data.rule_name,
            rule_desc: res.data.rule_desc,
            operate: res.data.operate,
            type: res.data.type,
            status: res.data.status == 1 ? true : false,
            group_id: this.group_id,
          }
          _this.confirmLoading = true
          addRule(parameter).then(res => {
            _this.confirmLoading = false
            if (res.code == 400) {
              _this.$message.warning(res.msg)
            } else if (res.code == 200) {
              _this.setForm()
              _this.$message.success('保存成功')
              _this.$refs.table.refresh(true);
            }
          }).catch((err) => {
            // Do something
            
            _this.confirmLoading = false
          })
        }
      })
    },
    setForm () {
      const record = {
        rule_name: undefined,
        type: 0,
        operate: undefined,
        rule_desc: undefined,
        status: true
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      })
    },
    setSForm () {
      const record = {
        class_id: 99,
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
        rule_name: record.rule_name,
        rule_desc: record.rule_desc,
        type: record.type,
        status: record.status == 1 ? 0 : 1,
      };
      editRule(record.rule_id, parameter)
        .then(res => {
          // _this.$refs.table.refresh(true);
          _this.$message.success("状态修改成功成功", 0.5);
          record.status = parameter.status
        })
        .catch(err => {
          // Do something
        })
        .finally(() => {

        });
    },
    seeSource (num) {
      this.openNum = num;
      this.$refs.table.refresh(true);
    },
    showStatus (e) {
      this.openNum = e.target.value;
      if (this.openNum < 99) {
        this.queryParam.class_status = this.openNum
      } else {
        this.queryParam.class_status = undefined
      }
      this.$refs.table.refresh(true);
    },
    checkClassName (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入名称!');
    },
    checkClassSort (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入数字!');
    },
    sortChange (e, record) {
      if (!record.setNum) {
        record.renumber = record.class_sort
      }
      record.class_sort = e.target.value;
      record.setNum = true
      record.saveModel = false
    },
    resortChange (record) {
      !record.saveModel && record.setNum && (record.class_sort = record.renumber)
    },
    sortChangeSave (e, record) {
      const _this = this
      record.saveModel = true
      if (record.class_sort != record.renumber) {
        let parameter = {
          class_name: record.class_name,
          class_status: record.class_status.value,
          class_sort: record.class_sort
        };
        _this.$confirm({
          title: '提示',
          content: '确认修改排序数值？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            editRule(record.rule_id, parameter)
              .then(res => {
                if (res.code == 200) {
                  e.target.blur()
                  _this.$message.success("保存成功");
                  _this.$refs.table.refresh(true)
                } else if (res.code == 400) {
                  _this.$message.warning(res.msg);
                } else {
                }
              })
              .catch(err => {
                // Do something
              })
          },
          onCancel () {
            record.class_sort = record.renumber
          }
        });
      } else {
        this.$message.warning("当前排序值未做任何变化", 1);
      }
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


