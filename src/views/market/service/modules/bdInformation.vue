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
                <a-form-item label="site_id" :colon="false">
                  <a-input v-model="columns.site_id" disabled />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="page_id" :colon="false">
                  <a-input v-model="columns.page_id" disabled />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="姓名" :colon="false">
                  <a-input v-model="columns.con_name" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="电话" :colon="false">
                  <a-input v-model="columns.phone" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="微信" :colon="false">
                  <a-input v-model="columns.wechat" />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="12">
                <a-form-item label="留言时间" :colon="false">
                  <a-input v-model="columns.create_time" disabled />
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
  putLeadsBaidu,
  getLeadsBaiduEdit
} from "@/api/market";
export default {
  name: "TableEdit",
  data() {
    return {
      columns: {
      },
      checkstatus: false,
      import_status: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleGoBack() {
      this.$emit("cancel");
    },
    addNew(){
      this.columns= {}
    },
    editCus(record) {
      this.checkstatus = false;
      getLeadsBaiduEdit(record.id).then(res => {
        if (res.code == 200) {
          this.columns = res.data;
        } else {
          this.$message.info(res.msg);
        }
      });
    },
    
    handleSubmit() {
      let parameter = {};
      parameter.phone=this.columns.phone
      parameter.wechat=this.columns.wechat
      parameter.con_name=this.columns.con_name
      putLeadsBaidu(this.columns.id, parameter).then(res => {
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
}



.add-table {
  box-sizing: border-box;

  .ant-table-wrapper {
    background-color: #fff;
  }
}

</style>
<style scoped>
.add-form .ant-form-item {
  padding-left: 100px;
}
.ant-form-item >>> .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-form-item >>> .ant-form-item-label {
  width: 100px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: right;
}
</style>


