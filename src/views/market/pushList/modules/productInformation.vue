<template>
  <div class="center-box">
    <h4 class="title">客户修改</h4>
    <a-form class="add-form" :form="form" autocomplete="off">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :lg="{span:23,offset:1}" :xxl="{span:22,offset:1}"></a-col>
        <a-col
          :xs="{span:24,offset:0}"
          :sm="{span:22,offset:1}"
          :lg="{span:20,offset:2}"
          :xxl="{span:18,offset:2}"
        >
          <a-row :gutter="24">
            <a-row :gutter="16">
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="姓名" :colon="false">
                  <a-input v-model="columns.user_name" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="手机" :colon="false">
                  <a-input v-model="columns.user_phone" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="微信" :colon="false">
                  <a-input v-model="columns.user_wx" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="QQ" :colon="false">
                  <a-input v-model="columns.user_qq" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="推送状态" :colon="false">
                  <a-select v-model="columns.import_status.value" @change="serviceStatusChange">
                    <a-select-option :value="0">未推送</a-select-option>
                    <a-select-option :value="1">已推送</a-select-option>
                    <a-select-option :value="2">重复数据</a-select-option>
                    <a-select-option :value="3">推送失败</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="创建时间" :colon="false">
                  <a-input v-model="columns.add_time" disabled />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                :xs="24"
                :sm="24"
                :lg="{span:24,offset:0}"
                style="margin-top:20px;line-height:39px;text-align:center"
              >
                <a-form-item>
                  <a-button
                    v-if="!checkstatus"
                    type="primary"
                    class="waves-effect waves-light"
                    @click="handleSubmit"
                    style="margin-right:18px"
                  >保存</a-button>
                  <a-button
                    v-if="checkstatus"
                    type="primary"
                    class="waves-effect waves-light"
                    @click="newlyIncreased"
                    style="margin-right:18px"
                  >保存</a-button>
                  <a-button @click="handleGoBack" style="margin-right:108px">取消</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
import {
  getMessageXdetails,
  getUpdateMessage,
  getPddMessageXdetails,
  getPddUpdateMessage
} from "@/api/market";
export default {
  name: "TableEdit",
  data() {
    return {
      columns: {
        import_status: {
          text: "",
          value: ""
        }
      },
      checkstatus: false,
      import_status: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    serviceStatusChange(value) {
      // this.import_status = value; 
      this.columns.import_status.value = value
    },
    handleGoBack() {
      this.$emit("cancel");
    },
    //淘宝进入
    editCus(record) {
      this.checkstatus = false;
      getMessageXdetails(record.id).then(res => {
        if (res.code == 200) {
          this.columns = res.data;
        } else {
          this.$message.info(res.msg);
        }
      });
    },
    //拼多多进入
    addstatus(record) {
      this.checkstatus = true;
      getPddMessageXdetails(record.id).then(res => {
        if (res.code == 200) {
          this.columns = res.data;
        } else {
          this.$message.info(res.msg);
        }
      });
    },
    handleSubmit() {
      let parameter = {};
      parameter.user_name = this.columns.user_name;
      parameter.user_phone = this.columns.user_phone;
      parameter.user_wx = this.columns.user_wx;
      parameter.user_qq = this.columns.user_qq;
      parameter.user_message = this.columns.user_message;
      parameter.import_status = this.columns.import_status.value;
      getUpdateMessage(this.columns.id, parameter).then(res => {
        if (res.code == 200) {
          this.handleGoBack();
          this.$emit("ok");
          this.$message.success("保存成功");
        } else {
          this.$message.info(res.msg);
        }
      });
    },
    newlyIncreased() {
      let parameter = {};
      parameter.user_name = this.columns.user_name;
      parameter.user_phone = this.columns.user_phone;
      parameter.user_wx = this.columns.user_wx;
      parameter.user_qq = this.columns.user_qq;
      parameter.user_message = this.columns.user_message;
      parameter.import_status = this.columns.import_status.value;
      getPddUpdateMessage(this.columns.id, parameter).then(res => {
        if (res.code == 200) {
          this.handleGoBack();
          this.$emit("ok");
          this.$message.success("保存成功");
        } else {
          this.$message.info(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#input-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}

#input {
  outline: none;
  background-color: red;
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}

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
  .col-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 40px;
  }
}

.add-form .ant-form-item {
  display: flex;
  // margin-bottom: 0;
  /deep/.ant-form-item-label {
    label {
      display: inline-block;
      width: 68px;
      text-align: right;
    }
  }
  /deep/ .ant-form-item-control-wrapper {
    width: 100%;
    .ant-form-item-control {
      .myselect {
        box-sizing: border-box;
        padding-left: 60px;
        position: relative;
        .selectlabel {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
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

.add-table {
  box-sizing: border-box;

  .ant-table-wrapper {
    background-color: #fff;
  }
}
.ant-row {
  h5 {
    font-size: 14px;
    font-weight: 400;
  }
}
.seller-group {
  font-size: 14px;
  .ant-form-item {
    margin: 0;
  }
  .ant-radio-group {
    width: 100%;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    .ant-radio-wrapper {
      width: 50%;
      margin-right: 0;
      .red {
        color: #e84e7f;
      }
    }
    .right {
      border-left: 1px solid #d9d9d9;
      padding-left: 18px;
      box-sizing: border-box;
      .ant-radio-wrapper {
        width: 100%;
      }
    }
  }
  .text {
    p {
      display: inline-block;
      .green {
        color: #009688;
      }
      .grey {
        color: #c0c0c0;
      }
      .red {
        color: #e84e7f;
      }
    }
  }
}
</style>


