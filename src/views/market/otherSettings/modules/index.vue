<template>
  <div class="center-box">
    <h4 class="title">
      <span>去重设置</span>
    </h4>
    <a-spin :spinning="confirmLoading" v-show="visible">
      <a-form class="add-form" :form="form" autocomplete="off">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :lg="{span:14,offset:5}">
            <a-row :gutter="24">
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="是否开启" :colon="false">
                  <a-switch
                    v-decorator="['source_status',  { valuePropName: 'checked' }]"
                    checkedChildren="开"
                    unCheckedChildren="关"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="24">
                <a-form-item label="去重天数" :colon="false">
                  <a-input-number
                    placeholder="请输天数"
                    style="width:100%"
                    v-decorator="['source_sort', {rules: [{ validator: checkClassSort }]}]"
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
            <a-form-item>
              <a-button type="primary" class="waves-effect waves-light" @click="handleSubmit">保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import moment from "moment";
import STable from "@/components/table/";
import {
  getSource,
  getSourceClass,
  getSourceEdit,
  getSourceCreate
} from "@/api/market";
export default {
  name: "TableEdit",
  components: {
    STable
  },
  data() {
    return {
      confirmLoading: false,

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

  methods: {
    checkClassSort(rule, value, callback) {
      if (value) {
        callback();
        return;
      }
      callback("请输入数字!");
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
            source_short_name: values.source_short_name,
            source_class_id: values.source_class_id,
            source_type: values.source_type,
            source_status: values.source_status == true ? 1 : 0,
            baidu_account: values.baidu_account,
            source_sort: values.source_sort
          };
          _this.confirmLoading = true;
          getSourceCreate(parameter)
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


