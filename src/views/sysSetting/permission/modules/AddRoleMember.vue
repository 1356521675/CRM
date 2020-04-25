<template>
  <a-modal
    :title="controlmsg"
    :width="600"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <h4>
        添加员工到
        <span>{{role_name}}</span>角色
      </h4>
      <a-input style="margin: 4px 0 12px " @change="changeSearch" placeholder="请输入查询内容再选择员工，已添加员工将不再列表中显示" />
      <p>选择员工</p>
      <a-select
        :getPopupContainer="triggerNode => triggerNode.parentNode"
        mode="multiple"
        optionFilterProp="children"
        showSearch
        placeholder="请选择员工"
        :value="selectedItems"
        @change="handleChange"
        style="width: 100%"
      >
        <a-select-option
          v-for="item in filteredOptions"
          :key="item.user_id"
          :value="item.user_id"
        >{{item.user_name}}</a-select-option>
      </a-select>
    </a-spin>
  </a-modal>
</template>

<script>
import { addRoleUser, getUserList, getUserSearch } from "@/api/manage";
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
export default {
  name: "AddRole",
  props: {
    roleuser: {
      type: Array
    }
  },
  data() {
    return {
      openStatus: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      role_id: "",
      controlmsg: "添加员工",
      selectedItems: [],
      allMembers: [],
      role_name: "",
      roleuserId: []
    };
  },
  created() {
    // this.userList()
  },
  computed: {
    filteredOptions() {
      return this.allMembers.filter(
        o => !this.selectedItems.includes(o.user_name)
      );
    }
  },
  methods: {
    add(id, name) {
      this.role_id = id;
      this.role_name = name;
      this.edit();
    },
    edit() {
      this.roleuserId = [];
      this.roleuser.forEach(item => {
        this.roleuserId.push(item.user_id);
      });
      this.allMembers= []
      this.openStatus= false
      // this.userList()
      this.visible = true;
    },
    close() {
      this.$emit("close");
      this.visible = false;
    },
    handleOk() {
      const _this = this;
      let choseMember = "";
      // 触发表单验证
      if (_this.selectedItems.length < 1) {
        _this.$confirm({
          title: "提示",
          content: "您还未添加任何员工",
          okText: "确定",
          cancelText: "取消",
          onOk() {},
          onCancel() {}
        });
        return;
      }
      const parameter = {
        role_id: _this.role_id,
        user_id: _this.selectedItems.join() + ","
      };
      addRoleUser(parameter)
        .then(res => {
          if (res.code == 200) {
            _this.selectedItems = [];
            _this.$message.success("保存成功");
            _this.$emit("ok");
          } else {
            _this.$message.warning(res.msg);
          }
        })
        .catch(err => {
          // Do something
        })
        .finally(() => {
          _this.confirmLoading = false;
          _this.close();
        });
    },
    handleCancel() {
      this.selectedItems = [];
      this.close();
    },
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
    },
    getAlluser(num) {
      getUserList({ page: num }).then(res => {
        res.data.data.forEach(item => {
          if (this.roleuserId.indexOf(item.user_id) == -1) {
            this.allMembers.push(item);
          }
        });
        if (Number(res.data.current_page) < Number(res.data.last_page)) {
          let punm = Number(res.data.current_page);
          punm += 1;
          this.getAlluser(punm);
        }
      });
    },
    userList() {
      this.allMembers = [];
      getUserList().then(res => {
        res.data.data.forEach(item => {
          if (this.roleuserId.indexOf(item.user_id) == -1) {
            this.allMembers.push(item);
          }
        });
        if (Number(res.data.current_page) < Number(res.data.last_page)) {
          let punm = Number(res.data.current_page);
          punm += 1;
          this.getAlluser(punm);
        }
      });
    },
    getAllSearch(value, num) {
      getUserSearch({ page: num, keywords: value }).then(res => {
        if (res.code == 200) {
          res.data.data.forEach(item => {
            if (this.roleuserId.indexOf(item.user_id) == -1) {
              this.allMembers.push(item);
            }
          });
          if (Number(res.data.current_page) < Number(res.data.last_page)) {
            let punm = Number(res.data.current_page);
            punm += 1;
            this.getAllSearch(value, punm);
          }
        }
      });
    },
    changeSearch(e) {
      if (e.target.value) {
        getUserSearch({ page: 1, keywords: e.target.value }).then(res => {
        if (res.code == 200) {
          this.openStatus= true
          this.allMembers = []
          res.data.data.forEach(item => {
            if (this.roleuserId.indexOf(item.user_id) == -1) {
              this.allMembers.push(item);
            }
          });
          if (Number(res.data.current_page) < Number(res.data.last_page)) {
            let punm = Number(res.data.current_page);
            punm += 1;
            this.getAllSearch(e.target.value, punm);
          }
        }
      });
      }
    }
  }
};
</script>

<style lang="less" scoped>
h4 {
  font-size: 16px;
  span {
    color: rgb(243, 67, 67);
  }
}

p {
  color: #000;
}
</style>

