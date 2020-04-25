<template>
  <a-modal
    :title="title"
    :visible="visible"
    :width="700"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <p v-if="showInfo" style="text-align:center;color:red">该员工暂未分配部门，请先为其分配部门</p>
      <a-form :form="form" autocomplete="off">
        <a-row :gutter="18">
          <a-col :xs="24" :sm="24" :lg="12">
            <p>
              已选择
              <span>{{idsArr.length}}</span> 条客户信息
            </p>
          </a-col>
        </a-row>
        <a-row :gutter="18">
          <a-col :xs="24" :sm="24" :lg="12">
            <a-form-item label="销售组别">
              <a-select
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                placeholder="请选择销售组别"
                style="width: 100%"
                @change="sellerChange"
                v-decorator="['dpId',{rules: [{ required: true, message: '请选择销售组别!' }]}]"
              >
                <a-select-option
                  v-for="item in dpdata"
                  :key="item.department_id"
                >{{item.department_name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :lg="12">
            <a-form-item label="销售人员(在线)">
              <a-select
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                placeholder="请选择销售人员"
                style="width: 100%"
                v-decorator="['user_id',{rules: [{ required: true, message: '请选择销售人员!' }]}]"
              >
                <a-select-option
                  v-for="item in loginSellerMeb"
                  :key="item.user_id"
                >{{item.user_name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import {
  getCsdSaleDep,
  getCsdSaleDpMember,
  putCsdSelectAllow
} from "@/api/market";
export default {
  name: "moveCus",
  data() {
    return {
      title: "客户转移",
      visible: false,
      confirmLoading: false,
      mdl: {},
      dpdata: {},
      idsArr: [],
      dpDisabled: false,
      showInfo: false,
      loginSellerMeb: [],
      unloginSellerMeb: [],
      cusNames: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.getDplist();
  },
  methods: {
    getDplist() {
      getCsdSaleDep()
        .then(res => {
          if (res.code == 200) {
            this.dpdata = res.data;
          }
        })
        .catch(err => {});
    },
    edit(selectedRows) {
      this.showInfo = false;
      this.form.resetFields();
      this.visible = true;
      this.idsArr = [];
      selectedRows.forEach(item => {
        this.idsArr.push(item.customer_id);
      });
    },
    sellerChange(value) {
      const records = {
        user_id: undefined
      };
      this.form.setFieldsValue({ ...records });
      this.getDpMember(value);
    },
    getDpMember(id) {
      getCsdSaleDpMember(id)
        .then(res => {
          if (res.code == 200) {
            this.sellerMeb = res.data.info;
            this.loginSellerMeb = [];
            this.unloginSellerMeb = [];
            res.data.info.forEach(item => {
              if (item.login_status == 1 && item.set_num > item.allot_num) {
                this.loginSellerMeb.push(item);
              } else {
                if (item.login_status == 1) {
                  this.unloginSellerMeb.unshift(item);
                } else {
                  this.unloginSellerMeb.push(item);
                }
              }
            });
          } else if (res.code == 400) {
            this.loginSellerMeb = [];
            this.unloginSellerMeb = [];
          }
        })
        .catch(err => {});
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
          _this.editStaff(values);
        }
      });
    },
    handleCancel() {
      this.close();
    },
    editStaff(values) {
      const _this = this;
      _this.confirmLoading = true;
      let ids = this.idsArr.join()
      const parameter = {
        ids: ids,
        department_id: values.dpId,
        user_id: values.user_id
      };
      putCsdSelectAllow(parameter)
        .then(res => {
          _this.confirmLoading = false;
          if (res.code == 200) {
            _this.close();
            _this.$message.success("转移成功");
            _this.$emit("ok");
          } else if (res.code == 400) {
            _this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          // Do something
          _this.$error({
            title: "转移失败",
            content: err.response.data.msg
          });
          _this.confirmLoading = false;
        })
        .finally(() => {});
    }
  }
};
</script>
