<template>
  <div class="center-box">
    <h4 class="title"><span v-if="visible">新建</span><span v-else>编辑</span></h4>
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

              <!-- <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="来源分类"
                             :colon="false">
                  <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                            showSearch
                            placeholder="请选择来源分类"
                            style="width: 100%"
                            v-decorator="['source_class_id',{rules: [{ validator: checkSourceId }],validateTrigger: 'change'}]"
                            :filterOption="filterOption">
                    <a-select-option v-for="item in sourceClassList"
                                     :key="item.class_id">{{item.class_name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="系统名称"
                             :colon="false">
                  <a-input placeholder="请输入系统名称"
                           v-decorator="['source_name', {rules: [{ validator: checkSourceName }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="IP地址"
                             :colon="false">
                  <a-input placeholder="请输入IP地址"
                           v-decorator="['source_url', {rules: [{ validator: checkSourceUrl }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="密钥"
                             :colon="false">
                  <a-input placeholder="请输入密钥"
                           v-decorator="['source_short_name']" />
                </a-form-item>
              </a-col>
              <!-- <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="账户ID"
                             :colon="false">
                  <a-input placeholder="请输入账户ID"
                           v-decorator="['baidu_account']" />
                </a-form-item>
              </a-col> -->
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="排序"
                             :colon="false">
                  <a-input-number placeholder="请输入数字"
                                  style="width:100%"
                                  v-decorator="['source_sort', {rules: [{ validator: checkClassSort }]}]" />
                </a-form-item>
              </a-col>
              <!-- <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="来源类别"
                             :colon="false">
                  <a-radio-group name="radioGroup"
                                 v-decorator="['source_type']">
                    <a-radio :value="1">个人</a-radio>
                    <a-radio :value="2">新零售</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col> -->

              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="是否开启"
                             :colon="false">
                  <a-switch v-decorator="['source_status',  { valuePropName: 'checked' }]"
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
                        @click="handleSubmit">新建</a-button>
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
            <a-col :xs="18"
                   :sm="18"
                   :lg="{span:8,offset:0}">
              <a-form-item label="搜索"
                           :colon="false">
                <a-input placeholder="请输入系统名称"
                         @change="checkSearch"
                         v-decorator="['source_name']" />
              </a-form-item>
            </a-col>
            <a-col :xs="6"
                   :sm="6"
                   :lg="{span:2,offset:0}"
                   class="mybtn">
              <a-button class="btn-custom waves-effect waves-light"
                        @click="handleSearch">搜索</a-button>
            </a-col>
            <a-col :xs="24"
                   :sm="24"
                   :lg="{span:9,offset:1}">
              <a-form-item label="状态筛选">
                <a-radio-group name="radioGroup"
                               v-decorator="['source_status']"
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
                 :scroll="{ x: 1230}"
                 :rowSelection="options.rowSelection">
          <span slot="action"
                slot-scope="text, record">
            <template>
              <a-button class="btn-primary"
                        size="small"
                        @click="editSource(record)">修改</a-button>
            </template>
          </span>
          <span slot="status"
                slot-scope="source_status">
            <template>
              <a-button v-if="source_status.value == 1"
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
                        :checked="record.source_status.value == 1"
                        @change="statusSwitch(record)" />
            </template>
          </span>
          <span slot="stype"
                slot-scope="source_type">
            <template>
              <a-button v-if="source_type.value == 1"
                        class="btn-custom btn-trans"
                        size="small">{{source_type.text}}</a-button>
              <a-button v-else
                        class="btn-info btn-trans"
                        size="small">{{source_type.text}}</a-button>
            </template>
          </span>
          <span slot="sclass"
                slot-scope="source_class">
            <template>
              <span v-for="item in sourceClassList"
                    :key="item.class_id"
                    v-show="source_class==item.class_id">{{item.class_name}}</span>
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
        </s-table>
      </div>
    </div>
    <e-source ref="esource"
              @ok="editSave"
              @close="editCancel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from "moment";
import STable from "@/components/table/";
import ESource from "./editSource";
import { getSource, getSourceClass, getSourceEdit, getSourceCreate } from '@/api/market'
export default {
  name: "TableEdit",
  components: {
    STable,
    ESource
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
          title: "ID",
          dataIndex: "source_id",
          width: 50,
          align: "center"
        },
        // {
        //   title: "分类",
        //   dataIndex: "class_info.name",
        //   width: 180,
        //   align: "center"
        // },
        {
          title: "系统名称",
          dataIndex: "source_name",
          width: 200,
          align: "center"
        },
        // {
        //   title: "标识",
        //   dataIndex: "source_short_name",
        //   width: 100,
        //   align: "center"
        // },
        // {
        //   title: "类别",
        //   dataIndex: "source_type",
        //   scopedSlots: { customRender: "stype" },
        //   width: 100,
        //   align: "center"
        // },
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
          width: 100,
          scopedSlots: { customRender: "sortbox" },
          align: "center",
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
        }
      ],
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSource(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.msg == "success" && res.code == 200) {
              res.data.data.forEach((item, i) => {
                item.keyIndex = i
              })
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
  beforeCreate () {
    this.form = this.$form.createForm(this);
    this.sform = this.$form.createForm(this,{name:'two'});
  },
  mounted () {
    // this.sourceClass()
    this.setForm()
    this.setSForm()
  },
  methods: {
    ...mapActions(['GetSysList']),
    checkClassSort (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入数字!');
    },
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
            source_name: values.source_name,
            source_url: values.source_url,
            source_short_name: values.source_short_name,
            source_class_id: values.source_class_id,
            source_type: values.source_type,
            source_status: values.source_status == true ? 1 : 0,
            baidu_account: values.baidu_account,
            source_sort: values.source_sort
          }
          _this.confirmLoading = true
          getSourceCreate(parameter).then(res => {
            if (res.code == 200) {
              //新建系统成功后重新获取系统列表
              this.GetSysList();
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
    setForm () {
      const record = {
        source_url: undefined,
        source_short_name: undefined,
        source_class_id: undefined,
        source_name: undefined,
        source_type: 1,
        source_status: true,
        baidu_account: undefined,
        source_sort: 1
      };
      this.mdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      })
    },
    setSForm () {
      const record = {
        source_status: 99,
      };
      this.smdl = Object.assign({}, record);
      this.$nextTick(() => {
        this.sform.setFieldsValue({ ...record });
      })
    },
    // sourceClass () {
    //   const _this = this
    //   getSourceClass()
    //     .then(res => {
    //       this.sourceClassList = res.data.data
    //     })
    //     .catch(err => {
    //       // Do something

    //     })
    //     .finally(() => { })
    // },
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
        source_id: record.source_id,
        source_name: record.source_name,
        source_url: record.source_url,
        source_class_id: record.source_class_id,
        source_type: record.source_type.value,
        source_status: record.source_status.value == 1 ? 0 : 1,
        source_sort: record.source_sort
      };
      getSourceEdit(parameter)
        .then(res => {
          _this.$message.success("状态修改成功成功", 0.5);
          record.source_status.value = parameter.source_status;
          if (_this.openNum == 99) {
            // _this.$refs.table.refresh();
          } else {
            _this.$refs.table.refresh(true);
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
      if (this.openNum < 99) {
        this.queryParam.source_status = this.openNum
      } else {
        this.queryParam.source_status = undefined
      }
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
    },
    sortChange (e, record) {
      if (!record.setNum) {
        record.renumber = record.source_sort
      }
      record.source_sort = e.target.value;
      record.setNum = true
      record.saveModel = false
    },
    resortChange (record) {
      !record.saveModel && record.setNum && (record.source_sort = record.renumber)
    },
    sortChangeSave (e, record) {
      const _this = this
      record.saveModel = true
      if (record.source_sort != record.renumber) {
        let parameter = {
          source_id: record.source_id,
          source_name: record.source_name,
          source_short_name: record.source_short_name,
          source_class_id: record.source_class_id,
          source_type: record.source_type.value,
          source_status: record.source_status.value,
          source_sort: record.source_sort,
          baidu_account: record.baidu_account,
          source_url: record.source_url,
        };
        _this.$confirm({
          title: '提示',
          content: '确认修改排序数值？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            getSourceEdit( parameter)
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
            record.source_sort = record.renumber
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
  margin: 20px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
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


