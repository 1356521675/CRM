<template>
  <a-modal :title="controlmsg"
           :width="600"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">

      <h4>员工姓名：<span>{{user_name}}</span></h4>
      <p>选择员工</p>
      <a-select mode="multiple"
                placeholder="请选择员工"
                :value="selectedItems"
                @change="handleChange"
                style="width: 100%">
        <a-select-option v-for="item in filteredOptions"
                         :key="item.user_name"
                         :value="item.user_name">
          {{item.user_name}}
        </a-select-option>
      </a-select>
    </a-spin>
  </a-modal>
</template>

<script>
import { addRoleUser, getUserList } from '@/api/manage'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
export default {
  name: 'AddRole',
  data () {
    return {
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
      user_id: '',
      controlmsg: '编辑员工',
      selectedItems: [],
      allMembers: [],
      user_name: ''
    }
  },
  created () {
    this.userList()
  },
  computed: {
    filteredOptions () {
      return this.allMembers.filter(o => !this.selectedItems.includes(o.user_name));
    }
  },
  methods: {
    edit (item) {
      this.user_name = item.user_name
      this.visible = true
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const _this = this
      let choseMember = ''
      // 触发表单验证
      if (_this.selectedItems.length < 1) {
        _this.$confirm({
          title: '提示',
          content: '您还未添加任何员工',
          okText: '确定',
          cancelText: '取消',
          onOk () {
          },
          onCancel () {

          }
        })
        return
      }
      _this.allMembers.forEach((item) => {
        if (_this.selectedItems.indexOf(item.user_name) != -1) {
          choseMember += item.user_id + ','
        }
      })
      const parameter = {
        role_id: _this.role_id,
        user_id: choseMember
      }
      addRoleUser(parameter).then(res => {
        if (res.code == 200) {
          _this.$message.success('保存成功')
          _this.$emit('ok')
        } else if (res.msg) {
          let errMsg = res.data[0] ? res.data[0] : res.msg
          _this.$message.warning(errMsg)
        }

      }).catch((err) => {
        // Do something

      }).finally(() => {
        _this.confirmLoading = false
        _this.close()
      })
    },
    handleCancel () {
      this.selectedItems = []
      this.close()
    },
    handleChange (selectedItems) {
      this.selectedItems = selectedItems
    },
    userList () {
      getUserList().then(res => {
        this.allMembers = res.data.data
      })
    }
  }
}
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

