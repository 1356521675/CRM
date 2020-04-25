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
                 :lg="{span:8,offset:8}">
            <a-row :gutter="24">
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="名称"
                             :colon="false">
                  <a-input placeholder="请输入名称"
                           v-decorator="['rule_name', {rules: [{ validator: checkSourceName }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="操作"
                             :colon="false">
                  <a-input placeholder="请输入路径"
                           v-decorator="['operate',]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="注释"
                             :colon="false">
                  <a-input placeholder="请输入名称"
                           v-decorator="['rule_desc',]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
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
                  <a-switch checkedChildren="开"
                            unCheckedChildren="关"
                            v-decorator="['status', { valuePropName: 'checked' }]" />
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
import { getSourceClassEdit } from "@/api/market";
import {  getRuleById,  editRule } from '@/api/manage'
export default {
  name: "EditSource",
  data () {
    return {
      visible: false,
      confirmLoading: false,
      mdl: {},
      sourceClassList: [],
      controlmsg: "编辑来源",
      item: {}
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    add (item) {
      this.visible = true;
      this.confirmLoading = true;
      getRuleById(item.rule_id).then(res=>{
        this.confirmLoading = false;
        if(res.code==200){
          this.item = res.data;
          this.edit({
            rule_name: res.data.rule_name,
            rule_desc: res.data.rule_desc,
            operate: res.data.operate,
            type: res.data.type,
            status: res.data.status == 1 ? true : false
          });
        }
      }).catch(err=>{
        this.confirmLoading = false;
      })
      
    },
    edit (record) {
      this.mdl = Object.assign({}, record);
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
          let parameter = {
            rule_name: values.rule_name,
            rule_desc: values.rule_desc,
            operate: values.operate,
            type: values.type,
            class_status: values.class_status ? 1 : 0,
          };
          _this.confirmLoading = true;
          editRule(_this.item.rule_id, parameter)
            .then(res => {
              if (res.code == 200) {
                _this.$message.success("保存成功");
                _this.$emit('ok')
              } else if (res.code == 400) {
                _this.$message.warning(res.msg);
              } else {
                _this.$emit('ok')
              }
            })
            .catch(err => {
              // Do something
            })
            .finally(() => {
              _this.confirmLoading = false;
              _this.close();
            });
        }
      });
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

