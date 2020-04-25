<template>
  <div class="center-box">
    <h4 class="title">
      <span v-if="visible">新建来源</span>
      <span v-else>编辑来源</span>
    </h4>
    <a-spin :spinning="confirmLoading" v-show="visible">
      <a-form class="add-form" :form="form" autocomplete="off">
        <a-row :gutter="16">
          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:18,offset:3}"
            :xl="{span:16,offset:4}"
            :xll="{span:14,offset:5}"
          >
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="来源分类" :colon="false">
                  <a-select
                    :getPopupContainer="triggerNode => triggerNode.parentNode"
                    showSearch
                    placeholder="请选择来源分类"
                    style="width: 100%"
                    v-decorator="['source_class_id',{ rules: [{ required: true, message: '请选择来源分类' }] }]"
                    :filterOption="filterOption"
                  >
                    <a-select-option
                      v-for="item in sourceClassList"
                      :key="item.class_id"
                    >{{item.class_name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="来源名称" :colon="false">
                  <a-input
                    placeholder="请输入来源名称"
                    v-decorator="['source_name',{ rules: [{ required: true, message: '请输入来源名称' }] }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="来源网址" :colon="false">
                  <a-input placeholder="请输入网址" v-decorator="['source_url']" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="来源标识" :colon="false">
                  <a-input
                    placeholder="请输入来源标识"
                    v-decorator="['source_short_name',{ rules: [{ required: true, message: '请输入来源标识' }] }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="账户ID" :colon="false">
                  <a-input placeholder="请输入账户ID" v-decorator="['baidu_account']" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="来源排序" :colon="false">
                  <a-input-number
                    placeholder="请输入数字"
                    style="width:100%;"
                    v-decorator="['source_sort',{ rules: [{ required: true, message: '请输入数字' }] }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="分组排序" :colon="false">
                  <a-select
                    :getPopupContainer="triggerNode => triggerNode.parentNode"
                    showSearch
                    placeholder="请选择分组排序"
                    style="width: 100%"
                    v-decorator="['group_sort',]"
                    :filterOption="filterOption"
                  >
                    <a-select-option v-for="item in 10" :key="item">{{item}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12" class="creat-key">
                <a-form-item label="唯一标识" :colon="false">
                  <a-input
                    placeholder="请输入唯一标识"
                    style="width:calc(100% - 74px)"
                    v-decorator="['only_key',{ rules: [{ required: true, message: '请输入唯一标识' }] }]"
                  />
                  <a-button class="btn-info" size="small" @click="unique">一键生成</a-button>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="来源类别" :colon="false">
                  <a-radio-group name="radioGroup" v-decorator="['source_type']">
                    <a-radio :value="1">个人</a-radio>
                    <a-radio :value="2">新零售</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="是否开启" :colon="false">
                  <a-switch
                    v-decorator="['source_status',  { valuePropName: 'checked' }]"
                    checkedChildren="开"
                    unCheckedChildren="关"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>

          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:24,offset:0}"
            style="margin-top:50px;line-height:39px;text-align:center"
          >
            <a-button type="primary" class="waves-effect waves-light" @click="handleSubmit">新建</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <div class="ant-tabs" v-show="visible">
      <div class="top">
        <a-form :form="sform" autocomplete="off" @submit="handleSearch">
          <a-row :gutter="16">
            <a-col :xs="18" :sm="18" :lg="{span:8,offset:0}">
              <a-form-item label="来源搜索" :colon="false">
                <a-input placeholder="请输入来源名称" @change="checkSearch" v-decorator="['source_name']" />
              </a-form-item>
            </a-col>
            <a-col :xs="6" :sm="6" :lg="{span:2,offset:0}" class="mybtn">
              <a-button class="btn-custom waves-effect waves-light" @click="handleSearch">搜索</a-button>
            </a-col>
            <a-col :xs="24" :sm="24" :lg="{span:9,offset:1}">
              <a-form-item label="状态筛选">
                <a-radio-group
                  name="radioGroup"
                  v-decorator="['source_status']"
                  @change="showStatus"
                >
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
        <s-table
          style="height:100%;background-color:#fff;"
          ref="table"
          size="default"
          rowKey="keyIndex"
          :columns="columns"
          :data="loadData"
          :customRow="tableDbClick"
          :scroll="{ x: 1530}"
        >
          <span slot="action" slot-scope="text, record">
            <template>
              <a-button class="btn-primary" size="small" @click="editSource(record)">修改</a-button>
            </template>
          </span>
          <span slot="status" slot-scope="source_status">
            <template>
              <a-button
                v-if="source_status.value == 1"
                class="btn-success btn-trans"
                size="small"
              >已开启</a-button>
              <a-button v-else class="btn-inverse btn-trans" size="small">未开启</a-button>
            </template>
          </span>
          <span slot="openstatus" slot-scope="text, record">
            <template>
              <a-switch
                checkedChildren="开"
                unCheckedChildren="关"
                :checked="record.source_status.value == 1"
                @change="statusSwitch(record)"
              />
            </template>
          </span>
          <span slot="choosestatus" slot-scope="text, record">
            <template>
              <a-switch
                checkedChildren="开"
                unCheckedChildren="关"
                :checked="record.is_checked == 1"
                @change="staticOnStart(record)"
              />
            </template>
          </span>
          <span slot="stype" slot-scope="source_type">
            <template>
              <a-button
                v-if="source_type.value == 1"
                class="btn-custom btn-trans"
                size="small"
              >{{source_type.text}}</a-button>
              <a-button v-else class="btn-info btn-trans" size="small">{{source_type.text}}</a-button>
            </template>
          </span>
          <span slot="sortbox" slot-scope="text, record">
            <template>
              <a-input
                :value="text"
                type="number"
                :min="0"
                @pressEnter="e =>sortChangeSave(e,record)"
                @change="e => sortChange(e, record)"
                @blur="resortChange(record)"
              />
            </template>
          </span>
        </s-table>
      </div>
    </div>
    <e-source ref="esource" @ok="editSave" @close="editCancel" />
  </div>
</template>

<script>
import { tableDbClick } from "@/components/_util/util.js";
import moment from "moment";
import STable from "@/components/table/";
import ESource from "./editSource";
import { getSourceEdit, getSourceCreate } from "@/api/market";
import {
  getSource,
  putSource,
  getUniqueIdentifier,
  postSource,
  getSourceClass
} from "@/api/sourceSet";
export default {
  name: "TableEdit",
  components: {
    STable,
    ESource
  },
  data() {
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
          title: "ID",
          dataIndex: "source_id",
          width: 50,
          align: "center"
        },
        {
          title: "唯一标识",
          dataIndex: "unique_code",
          width: 180,
          align: "center"
        },
        {
          title: "商务通归属",
          dataIndex: "",
          width: 140,
          align: "center"
        },
        {
          title: "来源分类",
          dataIndex: "class_info.class_name",
          width: 180,
          align: "center"
        },
        {
          title: "来源名称",
          dataIndex: "source_name",
          width: 200,
          align: "center"
        },
        {
          title: "来源标识",
          dataIndex: "source_short_name",
          width: 100,
          align: "center"
        },
        {
          title: "来源类别",
          dataIndex: "source_type",
          scopedSlots: { customRender: "stype" },
          width: 100,
          align: "center"
        },
        {
          title: "开启状态",
          dataIndex: "source_status",
          scopedSlots: { customRender: "status" },
          width: 100,
          align: "center"
        },
        {
          title: "排序",
          dataIndex: "source_sort",
          width: 150,
          scopedSlots: { customRender: "sortbox" },
          align: "center"
        },
        {
          title: "创建时间",
          dataIndex: "create_time",
          width: 200,
          align: "center"
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
          scopedSlots: { customRender: "openstatus" },
          width: 100,
          align: "center"
        },
        {
          title: "是否选中",
          scopedSlots: { customRender: "choosestatus" },
          width: 100,
          align: "center"
        }
      ],
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSource(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.msg == "success" && res.code == 200) {
              res.data.data.forEach((item, i) => {
                item.keyIndex = i;
              });
              return res.data;
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
      visible: true
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.sform = this.$form.createForm(this, { name: "two" });
  },
  mounted() {
    this.sourceClass();
    this.setForm();
    this.setSForm();
  },
  methods: {
    tableDbClick,
    cusdblclick(record) {
      this.editSource(record);
    },
    checkClassSort(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请输入数字!");
    },
    handleSearch(e) {
      e.preventDefault();
      this.sform.validateFields((err, values) => {
        this.queryParam.source_name = values.source_name;
        this.$refs.table.refresh(true);
      });
    },
    checkSearch(e) {
      if (this.queryParam.source_name && !e.target.value) {
        this.queryParam = [];
        if (this.openNum < 99) {
          this.queryParam.source_status = this.openNum;
        } else {
          this.queryParam.source_status = undefined;
        }
        this.$refs.table.refresh(true);
      }
    },
    editSource(item) {
      this.visible = false;
      this.$refs.esource.add(item);
    },
    editCancel() {
      this.visible = true;
    },
    editSave() {
      this.$refs.table.refresh(true);
    },
    handleSubmit() {
      const _this = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          let parameter = {
            source_name: values.source_name,
            source_url: values.source_url,
            source_class_id: values.source_class_id,
            source_type: values.source_type,
            source_status: values.source_status == true ? 1 : 0,
            source_short_name: values.source_short_name,
            baidu_account: values.baidu_account,
            source_sort: values.source_sort,
            unique_code: values.only_key,
            group_sort: values.group_sort
          };
          _this.confirmLoading = true;
          postSource(parameter)
            .then(res => {
              if (res.code == 200) {
                _this.$message.success("保存成功");
                _this.confirmLoading = false;
                _this.setForm();
                _this.$refs.table.refresh(true);
              } else {
                _this.confirmLoading = false;
                _this.$message.warning(res.msg);
              }
            })
            .catch(err => {
              if (err.response.status === 400) {
                _this.confirmLoading = false;
                _this.$message.error(err.response.data.msg);
              } else {
                _this.confirmLoading = false;
              }
            })
            .finally(() => {});
        }
      });
    },
    setForm() {
      const record = {
        source_url: undefined,
        source_short_name: undefined,
        source_class_id: undefined,
        source_name: undefined,
        source_type: 1,
        source_status: true,
        baidu_account: undefined,
        source_sort: 1,
        only_key: undefined,
        group_sort: 1
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    setSForm() {
      const record = {
        source_status: 99
      };
      this.smdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.sform.setFieldsValue({ ...record });
      });
    },
    sourceClass() {
      const _this = this;
      getSourceClass()
        .then(res => {
          this.sourceClassList = res.data.data;
        })
        .catch(err => {
          // Do something
        })
        .finally(() => {});
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    statusSwitch(record) {
      const _this = this;
      let parameter = {
        source_name: record.source_name,
        source_url: record.source_url,
        source_class_id: record.source_class_id,
        source_type: record.source_type.value,
        source_status: record.source_status.value == 1 ? 0 : 1,
        source_short_name: record.source_short_name,
        baidu_account: record.baidu_account,
        source_sort: record.source_sort,
        unique_code: record.unique_code,
        group_sort: record.group_sort,
        is_checked: record.is_checked
      };
      putSource(parameter, record.source_id)
        .then(res => {
          if (res.code == 200) {
            _this.$message.success("状态修改成功成功", 0.5);
            record.source_status.value = parameter.source_status;
            if (_this.openNum == 99) {
              // _this.$refs.table.refresh();
            } else {
              _this.$refs.table.refresh(true);
            }
          } else {
            _this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          // Do something
        })
        .finally(() => {});
    },
    staticOnStart(record) {
      const _this = this;
      let parameter = {
        source_name: record.source_name,
        source_url: record.source_url,
        source_class_id: record.source_class_id,
        source_type: record.source_type.value,
        source_status: record.source_status.value,
        source_short_name: record.source_short_name,
        baidu_account: record.baidu_account,
        source_sort: record.source_sort,
        unique_code: record.unique_code,
        group_sort: record.group_sort,
        is_checked: record.is_checked == 1 ? 0 : 1
      };
      putSource(parameter, record.source_id)
        .then(res => {
          if (res.code == 200) {
            _this.$message.success("状态修改成功成功", 0.5);
            record.is_checked = parameter.is_checked;
            if (_this.openNum == 99) {
              // _this.$refs.table.refresh();
            } else {
              _this.$refs.table.refresh(true);
            }
          } else {
            _this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          // Do something
        })
        .finally(() => {});
    },
    seeSource(num) {
      this.openNum = num;
      this.$refs.table.refresh(true);
    },
    showStatus(e) {
      this.openNum = e.target.value;
      if (this.openNum < 99) {
        this.queryParam.source_status = this.openNum;
      } else {
        this.queryParam.source_status = undefined;
      }
      this.$refs.table.refresh(true);
    },
    sortChange(e, record) {
      if (!record.setNum) {
        record.renumber = record.source_sort;
      }
      record.source_sort = e.target.value;
      record.setNum = true;
      record.saveModel = false;
    },
    resortChange(record) {
      !record.saveModel &&
        record.setNum &&
        (record.source_sort = record.renumber);
    },
    sortChangeSave(e, record) {
      const _this = this;
      record.saveModel = true;
      if (record.source_sort != record.renumber) {
        let parameter = {
          source_name: record.source_name,
          source_url: record.source_url,
          source_class_id: record.source_class_id,
          source_type: record.source_type.value,
          source_status: record.source_status.value,
          source_short_name: record.source_short_name,
          baidu_account: record.baidu_account,
          source_sort: record.source_sort,
          unique_code: record.unique_code,
          group_sort: record.group_sort,
          is_checked: record.is_checked
        };
        _this.$confirm({
          title: "提示",
          content: "确认修改排序数值？",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            putSource(parameter,record.source_id)
              .then(res => {
                if (res.code == 200) {
                  e.target.blur();
                  _this.$message.success("保存成功");
                  _this.$refs.table.refresh(true);
                } else if (res.code == 400) {
                  _this.$message.warning(res.msg);
                } else {
                }
              })
              .catch(err => {
                // Do something
              });
          },
          onCancel() {
            record.source_sort = record.renumber;
          }
        });
      } else {
        this.$message.warning("当前排序值未做任何变化", 1);
      }
    },
    unique() {
      getUniqueIdentifier().then(res => {
        if (res.code == 200) {
          this.edit({
            only_key: res.data.code
          });
        } else {
          _this.$message.warning(res.msg);
        }
      });
    },
    edit(record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
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
}
.mybtn {
  padding-top: 4px;
}
.creat-key {
  .btn-info {
    margin-left: 2px;
    height: 32px;
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

.bottom >>> .ant-table-wrapper {
  background-color: #fff;
}

.bottom >>> .ant-table-wrapper .ant-table-thead th {
  padding: 12px 18px;
}

.bottom >>> .ant-table-wrapper .ant-table-tbody td {
  padding: 8px 18px;
}
</style>


