<template>
  <div class="myedit" v-if="visible">
    <a-spin :spinning="confirmLoading">
      <a-form class="add-form" :form="form" autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :lg="{span:8,offset:8}">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="商务通名称" :colon="false">
                  <a-input
                    placeholder="请输入名称"
                    v-decorator="['class_name', {rules: [{ validator: checkSourceName }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="排序" :colon="false">
                  <a-input-number
                    v-decorator="['class_sort',{rules: [{ required: false, message: '请输入数字，值越大，排序越靠前!' }],validateTrigger: 'change'}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="是否开启" :colon="false">
                  <a-switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    v-decorator="['class_status', { valuePropName: 'checked' }]"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="是否选中"
                             :colon="false">
                  <a-switch checkedChildren="开"
                        unCheckedChildren="关"
                        v-decorator="['is_checked', { valuePropName: 'checked' }]"
                        />
                </a-form-item>
              </a-col>-->
            </a-row>
          </a-col>

          <a-col
            :xs="24"
            :sm="24"
            :lg="{span:24,offset:0}"
            style="margin-top:50px;line-height:39px;text-align:center"
          >
            <a-form-item>
              <a-button
                type="primary"
                class="waves-effect waves-light"
                @click="handleOk"
                style="margin-right:16px"
              >保存</a-button>
              <a-button class="waves-effect waves-light" @click="close">取消</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { putbscnymJoinClass } from "@/api/businessLink";
export default {
  name: "EditSource",
  data() {
    return {
      visible: false,
      confirmLoading: false,
      mdl: {},
      sourceClassList: [],
      controlmsg: "编辑来源",
      item: {}
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    add(item) {
      this.item = item;
      this.edit({
        class_name: item.name,
        class_sort: item.sort,
        class_status: item.is_open.value == 1 ? true : false
      });
    },
    edit(record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record });
      });
    },
    close() {
      this.$emit("close");
      this.visible = false;
    },
    handleOk() {
      const _this = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          let parameter = {
            name: values.class_name,
            is_open: values.class_status ? 1 : 0,
            // is_checked: values.is_checked? 1: 0,
            sort: values.class_sort,
            default: _this.item.default.value,
            join_class: _this.item.join_class
          };
          _this.confirmLoading = true;
          putbscnymJoinClass(_this.item.bscnym_id, parameter)
            .then(res => {
              if (res.code == 200) {
                _this.$message.success("保存成功");
                _this.item.class_name = parameter.class_name;
                _this.item.class_sort = parameter.class_sort;
                _this.$emit("ok");
              } else if (res.code == 400) {
                _this.$message.warning(res.msg);
                _this.$emit("ok");
              } else {
                _this.$emit("ok");
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    checkSourceId(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请选择来源分类!");
    },
    checkSourceName(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请输入名称!");
    },
    checkSourceUrl(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请输入网址!");
    },
    checkSourceSname(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请输入标识!");
    },
    checkSourceCount(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请输入账户ID!");
    }
  }
};
</script>

<style lang="less" scoped>
.myedit {
  padding-top: 60px;
}
</style>
<style scoped>
.ant-form-item {
  padding-left: 78px;
}
.ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-form-item >>> .ant-form-item-label {
  width: 78px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
}
</style>

