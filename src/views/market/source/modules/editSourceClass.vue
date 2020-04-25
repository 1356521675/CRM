<template>
  <div class="myedit" v-if="visible">
    <a-spin :spinning="confirmLoading">
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
                <a-form-item label="分类名称" :colon="false">
                  <a-input placeholder="请输入名称" v-decorator="['class_name',]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12" class="creat-key">
                <a-form-item label="唯一标识" :colon="false">
                  <a-input
                    placeholder="请输入唯一标识"
                    v-decorator="['only_key',{ rules: [{ required: true, message: '请输入唯一标识' }] }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="分组排序" :colon="false">
                  <a-select
                    placeholder="请选择分组排序"
                    style="width: 100%"
                    v-decorator="['group_sort',]"
                    :filterOption="filterOption"
                  >
                    <a-select-option v-for="item in 10" :key="item">{{item}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="分类排序" :colon="false">
                  <a-input-number
                    style="width:100%;"
                    placeholder="请输入数字"
                    v-decorator="['class_sort']"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="是否开启" :colon="false">
                  <a-switch
                    v-decorator="['class_status',  { valuePropName: 'checked' }]"
                    checkedChildren="开"
                    unCheckedChildren="关"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="是否选中" :colon="false">
                  <a-switch
                    v-decorator="['is_checked',  { valuePropName: 'checked' }]"
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
            <a-button
              type="primary"
              class="waves-effect waves-light"
              @click="handleOk"
              style="margin-right:16px"
            >保存</a-button>
            <a-button class="waves-effect waves-light" @click="close">取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { putClassification } from "@/api/sourceSet";
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
        class_name: item.class_name,
        only_key: item.unique_code,
        class_sort: item.class_sort,
        class_status: item.class_status.value == 1 ? true : false,
        is_checked: item.is_checked == 1 ? true : false,
        group_sort:item.group_sort
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
            class_name: values.class_name,
            class_status: values.class_status ? 1 : 0,
            is_checked: values.is_checked ? 1 : 0,
            class_sort: values.class_sort,
            unique_code:values.only_key,
            group_sort:values.group_sort
          };
          _this.confirmLoading = true;
          putClassification(parameter,_this.item.class_id)
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
  padding-bottom: 60px;
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
</style>

