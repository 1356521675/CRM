<template>
  <div class="myedit"
       v-if="visible">
    <a-spin :spinning="confirmLoading">
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
                        @click="handleOk"
                        style="margin-right:16px">保存</a-button>
              <a-button class="waves-effect waves-light"
                        @click="close">取消</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

    </a-spin>
  </div>
</template>

<script>
import { editRuleGroup } from '@/api/manage'
export default {
  name: "EditSource",
  data () {
    return {
      visible: false,
      confirmLoading: false,
      mdl: {},
      item: {},
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  created () {
  },
  methods: {
    add (item) {
      this.item = item;
      this.edit({
        group_name: item.group_name,
        status: item.status == 1 ? true : false,
      });
    },
    edit (record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    close () {
      this.$emit("close");
      this.visible = false;
    },
    handleOk () {
      const _this = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          _this.confirmLoading = true
          let parameter = {
            group_name: values.group_name,
            status: values.status
          };
          editRuleGroup(this.item.group_id, parameter)
            .then(res => {
              if (res.code == 200) {
                _this.$message.success("修改成功", 0.5);
                _this.$emit('ok')
                _this.close();
                _this.$refs.table.refresh(true);
              } else if (res.code == 400) {
                _this.$message.warning(res.msg, 0.5);
              }
              _this.confirmLoading = false

            })
            .catch(err => {
              // Do something
              _this.confirmLoading = false
            })
            .finally(() => { });
        }
      });
    },
    handleCancel () {
      this.mdl.source_name = "";
      this.mdl.source_url = "";
      this.mdl.source_class = undefined;
      this.mdl.source_type = 1;
      this.mdl.source_status = 1;
      this.close();
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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
      callback('请输入网址!');
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
.myedit {
  padding-top: 60px;
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
}
</style>

