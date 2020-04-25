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
                 :lg="{span:14,offset:5}">
            <a-row :gutter="24">

              <a-col :xs="24"
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
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="来源名称"
                             :colon="false">
                  <a-input placeholder="请输入名称"
                           v-decorator="['source_name', {rules: [{ validator: checkSourceName }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="来源网址"
                             :colon="false">
                  <a-input placeholder="请输入网址"
                           v-decorator="['source_url']" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="来源标识"
                             :colon="false">
                  <a-input placeholder="请输入标识"
                           v-decorator="['source_short_name']" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="账户ID"
                             :colon="false">
                  <a-input placeholder="请输入账户ID"
                           v-decorator="['baidu_account']" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="12">
                <a-form-item label="来源排序"
                             :colon="false">
                  <a-input-number placeholder="请输入数字"
                                  style="width:100%"
                                  v-decorator="['source_sort', {rules: [{ validator: checkClassSort }]}]" />
                </a-form-item>
              </a-col>
              <a-col :xs="24"
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
              </a-col>
              <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="是否开启"
                             :colon="false">
                  <a-switch checkedChildren="开"
                        unCheckedChildren="关"
                        v-decorator="['source_status', { valuePropName: 'checked' }]"
                        />
                </a-form-item>
              </a-col>
              <!-- <a-col :xs="24"
                     :sm="24"
                     :lg="24">
                <a-form-item label="来源排序" :colon="false">
                  <a-input-number v-decorator="['source_sort',{rules: [{ required: false, message: '请输入数字，值越大，排序越靠前!' }],validateTrigger: 'change'}]" />
                </a-form-item>
              </a-col> -->
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
import { getSourceClass, getSourceEdit } from "@/api/market";
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
  created () {
    this.sourceClass();
  },
  methods: {
    checkClassSort (rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback('请输入数字!');
    },
    add (item) {
      this.item = item;
      this.edit({
        source_name: item.source_name,
        source_short_name: item.source_short_name,
        source_class_id: item.source_class_id,
        source_type: item.source_type.value,
        source_status: item.source_status.value == 1? true : false,
        source_sort: item.source_sort,
        baidu_account: item.baidu_account,
        source_url: item.source_url
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
          let parameter = {
            source_id: _this.item.source_id,
            source_name: values.source_name,
            source_url: values.source_url,
            source_class_id: values.source_class_id,
            source_type: values.source_type,
            source_status:values.source_status? 1: 0,
            source_sort: values.source_sort,
            source_short_name: values.source_short_name,
            baidu_account: values.baidu_account
          };
          _this.confirmLoading = true;

          getSourceEdit(parameter)
            .then(res => {
              if(res.code==200){
                _this.$message.success("保存成功");
                _this.item.source_name = parameter.source_name;
                _this.item.source_short_name = parameter.source_short_name;
                _this.item.source_class_id = parameter.source_class;
                _this.item.source_sort = parameter.source_sort;
                _this.item.source_type.value = parameter.source_type;
                _this.item.source_type.text = parameter.source_type==1? '个人':'新零售';
                _this.item.source_status.value = parameter.source_status;
                _this.item.baidu_account = parameter.baidu_account;
                _this.$emit('ok')
                _this.close();
              }else{
                __this.$message.warning(res.msg)
              }
            })
            .catch(err => {
              // Do something
            })
            .finally(() => {
              _this.confirmLoading = false;
              
            });
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
    sourceClass () {
      getSourceClass()
        .then(res => {
          this.sourceClassList = res.data.data;
        })
        .catch(err => {
          // Do something
          this.confirmLoading = false;
        })
        .finally(() => { });
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

