<template>
  <a-modal :title="controlmsg"
           :width="600"
           :visible="visible"
           :maskClosable="false"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <p>确定将所选人员分配至下面所选角色</p>
      <a-select :getPopupContainer='triggerNode => triggerNode.parentNode'
                optionFilterProp="children"
                showSearch            
                placeholder="请选择角色"
                :value="selectedRoleId"
                @change="handleChange"
                style="width: 100%">
        <a-select-option v-for="item in roleList"
                         :key="item.role_id"
                         :value="item.role_id">
          {{item.role_name}}
        </a-select-option>
      </a-select>
    </a-spin>
  </a-modal>
</template>

<script>
import { addRoleUser, getRoleList} from '@/api/manage'
export default {
  name: 'AddRoleMeb',
  props: {
    roleuser: {
      type: Array,
    }
  },
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
      role_id: '',
      controlmsg: '角色分配',
      selectedItems: [],
      allMembers: [],
      roleList: [],
      selectedRoleId:undefined
    }
  },
  created () {
    // this.userList()
    
  },
  methods: {
    add (selectedRows) {
      this.selectedRoleId= undefined
      this.selectedItems= []
      selectedRows.forEach(item=>{
        this.selectedItems.push(item.user_id)
      })
      this.edit()
    },
    edit () {
      this.getRoles();
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
      if (!_this.selectedRoleId) {
        _this.$confirm({
          title: '提示',
          content: '请选择要分配的角色名称',
          okText: '确定',
          cancelText: '取消',
          onOk () {
          },
          onCancel () {

          }
        })
        return
      }
      const parameter = {
        role_id: _this.selectedRoleId,
        user_id: _this.selectedItems.join()+','
      }
      addRoleUser(parameter).then(res => {
        if(res.code==200){
          _this.selectedItems = []
          _this.$message.success('角色分配成功')
          _this.$emit('ok')
        }else{
          _this.$message.warning(res.msg)
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
    handleChange (selectedRoleId) {
      this.selectedRoleId = selectedRoleId
    },
    getRoles () {
      this.allMembers = []
      getRoleList().then(res => {
        this.roleList = res.data;
      });
    },
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

